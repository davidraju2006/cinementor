import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { systemPrompt } from "../utils/systemPrompt.js";
import { aiRateLimiter } from "../middleware/rateLimiter.js";
import AiConversation from "../models/AiConversation.js";

const router = express.Router();

/* ===============================
   GEMINI CLIENT (OFFICIAL SDK)
================================ */
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/* ===============================
   AI MENTOR ROUTE
================================ */
router.post("/", aiRateLimiter, async (req, res) => {
  try {
    const { message, context = "general", projectData = {}, userId = null } =
      req.body || {};

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Gemini API key missing" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const prompt = `${systemPrompt(context, projectData)}\n\nUser: ${message}`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    if (!reply) {
      throw new Error("Empty Gemini response");
    }

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
    console.error("❌ AI Mentor error:", error);
    return res.status(500).json({
      error: "AI Mentor failed. Try again later."
    });
  }
});

export default router;
