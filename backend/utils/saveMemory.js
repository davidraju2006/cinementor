import AiMemory from "../models/AiMemory.js";

export async function saveMemory(userId, key, value) {
  await AiMemory.findOneAndUpdate(
    { userId, key },
    { value },
    { upsert: true }
  );
}
