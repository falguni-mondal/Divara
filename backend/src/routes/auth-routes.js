import express from "express";
import { emailChecker, registerUser, loginUser, logoutUser, } from "../controllers/auth-controller.js";

const router = express.Router()

router.post("/check/email", emailChecker);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

export default router;