import rateLimit from "express-rate-limit";

export const aiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // 30 AI requests per user/IP
  message: {
    error: "Too many AI requests. Please try again later."
  }
});
