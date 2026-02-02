import express from "express";
import OpenAI from "openai";
import { systemPrompt } from "../utils/systemPrompt.js";
import { aiRateLimiter } from "../middleware/rateLimiter.js";
import AiConversation from "../models/AiConversation.js";

const router = express.Router();

// -------- Gemini helper (native fetch) ----------
async function callGemini(prompt) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY missing");
  }

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent" +
    `?key=${process.env.GEMINI_API_KEY}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await res.json();
  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  if (!text) throw new Error("Empty Gemini response");
  return text;
}

// -------- Route ----------
router.post("/", aiRateLimiter, async (req, res) => {
  try {
    const {
      message,
      context = "general",
      projectData = {},
      userId = null
    } = req.body || {};

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // 🧪 DEV MODE (NO API COST)
    if (process.env.DEV_MODE === "true") {
      return res.json({
        reply: `🎬 Mentor Insight
This is a DEV_MODE response.

🎯 Suggestions
• Use angles to show power dynamics
• Push-in during emotional peaks

🚀 Next Steps
• Apply to Shot List
• Refine blocking

❓ Quick Question
Is this scene verbal or physical?`
      });
    }

    const provider = (process.env.AI_PROVIDER || "GEMINI").toUpperCase();
    const sysPrompt = systemPrompt(context, projectData);

    let reply = "";

    if (provider === "GEMINI") {
      reply = await callGemini(`${sysPrompt}\n\nUser: ${message}`);
    } else {
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
      return res.status(500).json({ error: "AI returned empty response" });
    }

    // Save non-blocking
    AiConversation.create({
      userId,
      context,
      userMessage: message,
      aiReply: reply,
      projectData
    }).catch(() => {});

    return res.json({ reply });

  } catch (error) {
    const msg = error?.message?.toLowerCase() || "";

    if (msg.includes("quota") || msg.includes("billing")) {
      return res.status(402).json({
        error: "AI credits exhausted. Please add billing or switch provider."
      });
    }

    return res.status(500).json({
      error: "AI Mentor failed. Try again later."
    });
  }
});

export default router;
