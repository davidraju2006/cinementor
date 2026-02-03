import express from "express";
import { systemPrompt } from "../utils/systemPrompt.js";
import { aiRateLimiter } from "../middleware/rateLimiter.js";
import AiConversation from "../models/AiConversation.js";

const router = express.Router();

/* ===============================
   SAFE FETCH (Render compatible)
================================ */
async function getFetch() {
  const mod = await import("node-fetch");
  return mod.default;
}

/* ===============================
   GEMINI ONLY (NO OPENAI)
================================ */
async function callGemini(prompt) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY missing");
  }

  const fetch = await getFetch();

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent" +
    `?key=${process.env.GEMINI_API_KEY}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await response.json();

  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  if (!text) {
    console.error("❌ Gemini raw response:", data);
    throw new Error("Gemini returned empty response");
  }

  return text;
}

/* ===============================
   AI MENTOR ROUTE (GEMINI ONLY)
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

    // 🚫 DEV_MODE OFF IN PROD
    if (process.env.DEV_MODE === "true") {
      return res.json({
        reply: "DEV_MODE is enabled. Disable it in production."
      });
    }

    const sysPrompt = systemPrompt(context, projectData);

    const reply = await callGemini(
      `${sysPrompt}\n\nUser: ${message}`
    );

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
    console.error("❌ AI Mentor crash:", error);

    return res.status(500).json({
      error: "Gemini AI failed. Check API key & Google AI settings."
    });
  }
});

export default router;
