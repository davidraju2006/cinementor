import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

router.post("/:id/ai-note", async (req, res) => {
  const { note } = req.body;

  await Project.findByIdAndUpdate(req.params.id, {
    $push: { aiNotes: note }
  });

  res.json({ success: true });
});

export default router;
