import rateLimit from "express-rate-limit";

const passwordResetCodeLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 1,
  standardHeaders: true,
  legacyHeaders: false,

  keyGenerator: (req) => (req.user?.id || req.ip),

  message: {
    success: false,
    message: "Please try again after sometime."
  }
});

export default passwordResetCodeLimiter;