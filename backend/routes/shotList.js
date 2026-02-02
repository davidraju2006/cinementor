import express from "express";
import { aiRateLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/", aiRateLimiter, async (req, res) => {
  const { sceneText } = req.body;

  if (!sceneText || sceneText.length < 10) {
    return res.status(400).json({
      error: "Scene description is too short"
    });
  }

  // 🧪 DEV MODE (NO AI COST)
  if (process.env.DEV_MODE === "true") {
    return res.json({
      shots: [
        {
          title: "WIDE SHOT – Establishing",
          camera: "Static",
          description: "Empty rainy street at night with city lights.",
          purpose: "Establish mood and loneliness"
        },
        {
          title: "MEDIUM TRACKING SHOT",
          camera: "Handheld follow",
          description: "Man walking alone, shoulders tense.",
          purpose: "Build emotional connection"
        },
        {
          title: "CLOSE-UP",
          camera: "Slow push-in",
          description: "Water dripping down his face.",
          purpose: "Emphasize inner struggle"
        }
      ]
    });
  }

  return res.status(402).json({
    error: "AI credits exhausted"
  });
});

export default router;
