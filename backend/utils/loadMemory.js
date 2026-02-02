import AiMemory from "../models/AiMemory.js";

export async function loadMemory(userId) {
  const memory = await AiMemory.find({ userId });
  return memory.map(m => `${m.key}: ${m.value}`).join("\n");
}
