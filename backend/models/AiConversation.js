import mongoose from "mongoose";

const aiConversationSchema = new mongoose.Schema(
  {
    userId: { type: String }, // optional for now
    context: { type: String },
    userMessage: { type: String, required: true },
    aiReply: { type: String, required: true },
    projectData: { type: Object }
  },
  { timestamps: true }
);

export default mongoose.model("AiConversation", aiConversationSchema);
