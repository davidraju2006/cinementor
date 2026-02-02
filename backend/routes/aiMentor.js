import express from "express";
import OpenAI from "openai";
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
   GEMINI HELPER
================================ */
async function callGemini(prompt) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY missing");
  }

  const fetch = await getFetch();

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent" +
    `?key=${process.env.GEMINI_API_KEY}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    })
  });

  const data = await response.json();

  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  if (!text) {
    console.error("❌ Gemini raw response:", JSON.stringify(data));
    throw new Error("Empty Gemini response");
  }

  return text;
}

/* ===============================
   AI MENTOR ROUTE
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

    /* 🚫 DEV_MODE should be OFF in production */
    if (process.env.DEV_MODE === "true") {
      return res.json({
        reply: "DEV_MODE is enabled. Disable it in production."
      });
    }

    const provider = (process.env.AI_PROVIDER || "GEMINI").toUpperCase();
    const sysPrompt = systemPrompt(context, projectData);

    let reply = "";

    /* 🤖 GEMINI */
    if (provider === "GEMINI") {
      reply = await callGemini(
        `${sysPrompt}\n\nUser: ${message}`
      );
    }

    /* 🤖 OPENAI (fallback) */
    else {
      if (!process.env.OPENAI_API_KEY) {
        throw new Error("OPENAI_API_KEY missing");
      }

      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.6,
        max_tokens: 400,
        messages: [
          { role: "system", content: sysPrompt },
          { role: "user", content: message }
        ]
      });

      reply = completion?.choices?.[0]?.message?.content?.trim();
    }

    if (!reply) {
      return res.status(500).json({
        error: "AI returned empty response"
      });
    }

    /* 💾 Save conversation (non-blocking) */
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

    const msg = error?.message?.toLowerCase() || "";

    if (
      msg.includes("quota") ||
      msg.includes("billing") ||
      msg.includes("exhaust")
    ) {
      return res.status(402).json({
        error: "AI credits exhausted. Please try again later."
      });
    }

    return res.status(500).json({
      error: "AI Mentor failed. Try again later."
    });
  }
});

export default router;
