import express from "express";
import isValidUser from "../middlewares/auth-middleware.js";
import isUserVerified from "../middlewares/user-verify-checker.js";
import isValidProfileUpdateReq from "../middlewares/profile/profile-update-req-validator.js";
import { profileUpdater, emailUpdater } from "../controllers/profile-controller.js";
import emailUpdateTokenValidator from "../middlewares/profile/email-update-token-validator.js";

const router = express.Router();


router.put("/update", isValidUser, isUserVerified, isValidProfileUpdateReq, profileUpdater);
router.patch("/verify", isValidUser, isUserVerified, emailUpdateTokenValidator, emailUpdater);

export default router;