// 1️⃣ Load environment variables FIRST
import dotenv from "dotenv";
dotenv.config();

// 2️⃣ Imports
import express from "express";
import cors from "cors";

import aiMentorRoute from "./routes/aiMentor.js";
import shotListRoute from "./routes/shotList.js";
import shotListExportRoute from "./routes/shotListExport.js";
import { connectDB } from "./utils/db.js";

// 3️⃣ Debug logs (Render visibility)
console.log("Starting CineMentor backend...");
console.log("OPENAI KEY LOADED:", !!process.env.OPENAI_API_KEY);

// 4️⃣ Create Express app
const app = express();

// ✅ REQUIRED for Render + express-rate-limit
app.set("trust proxy", 1);

// 5️⃣ Middleware
app.use(cors());
app.use(express.json());

// 6️⃣ Health check / root route
app.get("/", (req, res) => {
  res.status(200).send("CineMentor Backend is Running 🚀");
});

// 7️⃣ API routes
app.use("/api/ai/mentor", aiMentorRoute);
app.use("/api/ai/shotlist", shotListRoute);
app.use("/api/shotlist/export", shotListExportRoute);

// 8️⃣ Port (Render injects PORT automatically)
const PORT = process.env.PORT || 5000;

// 9️⃣ Start server AFTER MongoDB connects
async function startServer() {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🎬 CineMentor backend running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1); // Render understands this as a crash
  }
}

// 🔟 Boot
startServer();
