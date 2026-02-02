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

// 3️⃣ Debug logs (helps on Render)
console.log("Starting CineMentor backend...");
console.log("OPENAI KEY LOADED:", !!process.env.OPENAI_API_KEY);

// 4️⃣ Create app
const app = express();

// 5️⃣ Middleware
app.use(cors());
app.use(express.json());

// 6️⃣ ROOT ROUTE (fixes: Cannot GET /)
app.get("/", (req, res) => {
  res.status(200).send("CineMentor Backend is Running 🚀");
});

// 7️⃣ API ROUTES
app.use("/api/ai/mentor", aiMentorRoute);
app.use("/api/ai/shotlist", shotListRoute);
app.use("/api/shotlist/export", shotListExportRoute);

// 8️⃣ PORT (Render provides this automatically)
const PORT = process.env.PORT || 5000;

// 9️⃣ Start server AFTER DB connects
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🎬 CineMentor backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1); // tells Render something went wrong
  }
};

// 🔟 Start everything
startServer();
