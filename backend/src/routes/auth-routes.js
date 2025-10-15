import express from "express";
import { authChecker, emailChecker, registerUser, loginUser, logoutUser, verificationLinkSender, emailVerifier, accountReseter} from "../controllers/auth-controller.js";
import isValidUser from "../middlewares/auth-middleware.js";
import isValidRegisterCreds from "../middlewares/registration-creds-validator.js";

const router = express.Router()

router.get("/check", isValidUser, authChecker);
router.post("/check/email", emailChecker);
router.post("/register", isValidRegisterCreds, registerUser);
router.post("/login", loginUser);
router.post("/verify/send", isValidUser, verificationLinkSender);
router.get("/verify/:token", isValidUser, emailVerifier);
router.get("/logout", logoutUser);
router.get("/account/reset", isValidUser, accountReseter);

export default router;