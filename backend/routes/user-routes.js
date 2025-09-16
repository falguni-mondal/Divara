import express from "express";
import { emailChecker } from "../controllers/user-controller.js";

const router = express.Router()

router.post("/check/email", emailChecker);

export default router;