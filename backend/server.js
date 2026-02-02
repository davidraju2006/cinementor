import dotenv from "dotenv";
dotenv.config(); // MUST be first line

console.log("OPENAI KEY LOADED:", !!process.env.OPENAI_API_KEY);

import express from "express";
import cors from "cors";
import aiMentorRoute from "./routes/aiMentor.js";
import shotListRoute from "./routes/shotList.js";
import shotListExportRoute from "./routes/shotListExport.js";
import { connectDB } from "./utils/db.js";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/ai/mentor", aiMentorRoute);
app.use("/api/ai/shotlist", shotListRoute);
app.use("/api/shotlist/export", shotListExportRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🎬 CineMentor backend running on port ${PORT}`)
);
