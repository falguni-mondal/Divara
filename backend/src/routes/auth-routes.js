import express from "express";
import { authChecker, emailChecker, registerUser, loginUser, logoutUser, verificationLinkSender, emailVerifier, } from "../controllers/auth-controller.js";
import isValidUser from "../middlewares/auth-middleware.js";

const router = express.Router()

router.get("/check", isValidUser, authChecker);
router.post("/check/email", emailChecker);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify/send", isValidUser, verificationLinkSender);
router.get("/verify/:token", isValidUser, emailVerifier);
router.get("/logout", logoutUser);

export default router;