import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: String,
    pitch: String,
    scenes: [String],
    shotList: [String],
    aiNotes: [String]
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
