import express from "express";
import { authChecker, emailChecker, registerUser, loginUser, logoutUser, verificationLinkSender, emailVerifier, accountReseter, googleCallback, codeSender} from "../controllers/auth-controller.js";
import isValidUser from "../middlewares/auth/auth-middleware.js";
import isValidRegisterCreds from "../middlewares/auth/registration-creds-validator.js";
import passport from "../configs/passport.js";
import emailUpdateTokenValidator from "../middlewares/email-update-token-validator.js";
import codeSenderValidator from "../middlewares/auth/code-sender-middleware.js";
import passwordResetCodeLimiter from "../middlewares/limiters/password-reset-code-sending-limiter.js";

const router = express.Router()

router.get("/check", isValidUser, authChecker);
router.post("/check/email", emailChecker);
router.post("/register", isValidRegisterCreds, registerUser);
router.post("/login", loginUser);
router.get("/verify/link", isValidUser, verificationLinkSender);
router.patch("/verify/email", emailUpdateTokenValidator, emailVerifier);
router.get("/logout", logoutUser);
router.get("/account/reset", isValidUser, accountReseter);
router.post("/sendCode", passwordResetCodeLimiter, codeSenderValidator, codeSender);

// Google Signin
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: `${process.env.FRONTEND_URL}/account?error=google_failed`, session: false }),
  googleCallback
);

export default router;