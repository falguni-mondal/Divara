import express from "express";
import { authChecker, emailChecker, registerUser, loginUser, logoutUser, verificationLinkSender, emailVerifier, accountReseter, googleCallback} from "../controllers/auth-controller.js";
import isValidUser from "../middlewares/auth-middleware.js";
import isValidRegisterCreds from "../middlewares/registration-creds-validator.js";
import passport from "../configs/passport.js";
import emailUpdateTokenValidator from "../middlewares/email-update-token-validator.js";

const router = express.Router()

router.get("/check", isValidUser, authChecker);
router.post("/check/email", emailChecker);
router.post("/register", isValidRegisterCreds, registerUser);
router.post("/login", loginUser);
router.get("/verify/link", isValidUser, verificationLinkSender);
router.patch("/verify/email", emailUpdateTokenValidator, emailVerifier);
router.get("/logout", logoutUser);
router.get("/account/reset", isValidUser, accountReseter);

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