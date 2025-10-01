import express from "express";
import { emailChecker, registerUser, loginUser, logoutUser, verificationLinkSender, } from "../controllers/auth-controller.js";
import isValidUser from "../middlewares/auth-middleware.js";

const router = express.Router()

router.post("/check/email", emailChecker);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/verify/send", isValidUser, verificationLinkSender);

export default router;