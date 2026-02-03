import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { systemPrompt } from "../utils/systemPrompt.js";
import { aiRateLimiter } from "../middleware/rateLimiter.js";
import AiConversation from "../models/AiConversation.js";

const router = express.Router();

/* ===============================
   GEMINI CLIENT
================================ */
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is missing in environment variables");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/* ===============================
   HELPER: NON-STREAM RESPONSE
================================ */
async function generateWithFallback(prompt) {
  const models = ["gemini-1.5-pro", "gemini-1.0-pro"];

  for (const modelName of models) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const text = result?.response?.text();

      if (text) return text;
    } catch (err) {
      console.warn(`⚠️ Model failed: ${modelName}`);
    }
  }

  throw new Error("All Gemini models failed");
}

/* ===============================
   HELPER: STREAM RESPONSE
================================ */
async function streamWithFallback(prompt, res) {
  const models = ["gemini-1.5-pro", "gemini-1.0-pro"];

  for (const modelName of models) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContentStream(prompt);

      let fullReply = "";

      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) {
          fullReply += text;
          res.write(text);
        }
      }

      return fullReply;
    } catch (err) {
      console.warn(`⚠️ Streaming failed for ${modelName}`);
    }
  }

  throw new Error("All Gemini streaming models failed");
}

/* ===============================
   AI MENTOR (NORMAL)
================================ */
router.post("/", aiRateLimiter, async (req, res) => {
  try {
    const {
      message,
      context = "general",
      projectData = {},
      userId = null
    } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required" });
    }

    const prompt = `
${systemPrompt(context, projectData)}

User: ${message}
    `.trim();

    const reply = await generateWithFallback(prompt);

    // Save conversation (non-blocking)
    AiConversation.create({
      userId,
      context,
      userMessage: message,
      aiReply: reply,
      projectData
    }).catch(() => {});

    return res.json({ reply });

  } catch (error) {
    console.error("❌ AI Mentor error:", error.message);
    return res.status(503).json({
      error: "AI is currently unavailable. Please try again."
    });
  }
});

/* ===============================
   AI MENTOR (STREAMING)
================================ */
router.post("/stream", aiRateLimiter, async (req, res) => {
  try {
    const {
      message,
      context = "general",
      projectData = {},
      userId = null
    } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).end("Message is required");
    }

    const prompt = `
${systemPrompt(context, projectData)}

User: ${message}
    `.trim();

    /* ---------- Streaming Headers ---------- */
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const fullReply = await streamWithFallback(prompt, res);
    res.end();

    // Save conversation (non-blocking)
    AiConversation.create({
      userId,
      context,
      userMessage: message,
      aiReply: fullReply,
      projectData
    }).catch(() => {});

  } catch (error) {
    console.error("❌ AI Mentor stream error:", error.message);
    if (!res.headersSent) {
      res.status(503).end("AI is currently unavailable. Please try again.");
    }
  }
});

export default router;
