import rateLimit from "express-rate-limit";

const emailUpdateReqLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 1,
  standardHeaders: true,
  legacyHeaders: false,

  keyGenerator: (req) => (req.user?.id || req.ip),

  message: {
    success: false,
    message: "Too many email update requests. Please try again in 5 minutes."
  }
});

export default emailUpdateReqLimiter;