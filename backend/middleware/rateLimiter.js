import rateLimit from "express-rate-limit";

export const aiRateLimiter = rateLimit({
  // ⏱️ 15 minutes window
  windowMs: 15 * 60 * 1000,

  // 🔢 Max requests per IP
  max: 30,

  // ✅ REQUIRED when behind Render / Vercel / proxies
  trustProxy: true,

  // 📦 Standard headers
  standardHeaders: true,
  legacyHeaders: false,

  // ❌ Custom error message
  message: {
    error: "Too many AI requests. Please try again later."
  }
});
