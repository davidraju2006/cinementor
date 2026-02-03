// 1️⃣ Load environment variables FIRST
import dotenv from "dotenv";
dotenv.config();

// 2️⃣ Core imports
import express from "express";
import cors from "cors";

// 3️⃣ Route imports
import aiMentorRoute from "./routes/aiMentor.js";
import shotListRoute from "./routes/shotList.js";
import shotListExportRoute from "./routes/shotListExport.js";

// 4️⃣ DB
import { connectDB } from "./utils/db.js";

// 5️⃣ Debug logs (important for Render)
console.log("🚀 Starting CineMentor backend...");
console.log("GEMINI KEY LOADED:", !!process.env.GEMINI_API_KEY);

// 6️⃣ Create Express app
const app = express();

// ✅ REQUIRED for Render + express-rate-limit
app.set("trust proxy", 1);

// 7️⃣ Global middleware
app.use(cors());
app.use(express.json());

// 8️⃣ Health check
app.get("/", (req, res) => {
  res.status(200).send("CineMentor Backend is Running 🚀");
});

// 9️⃣ API routes (IMPORTANT)
app.use("/api/ai/mentor", aiMentorRoute);
app.use("/api/ai/shotlist", shotListRoute);
app.use("/api/shotlist/export", shotListExportRoute);

// 🔟 404 handler (helps debugging)
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl
  });
});

// 1️⃣1️⃣ Port (Render injects automatically)
const PORT = process.env.PORT || 5000;

// 1️⃣2️⃣ Start server AFTER MongoDB connects
async function startServer() {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🎬 CineMentor backend running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

// 1️⃣3️⃣ Boot
startServer();
