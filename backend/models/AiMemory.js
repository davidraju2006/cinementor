import mongoose from "mongoose";

const aiMemorySchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    key: String,
    value: String
  },
  { timestamps: true }
);

export default mongoose.model("AiMemory", aiMemorySchema);
