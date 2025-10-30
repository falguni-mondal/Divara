import express from "express";
import isValidUser from "../middlewares/auth-middleware.js";
import isUserVerified from "../middlewares/user-verify-checker.js";
import isValidProfileUpdateReq from "../middlewares/profile/profile-update-req-validator.js";
import { profileUpdater, emailUpdater } from "../controllers/profile-controller.js";
import emailUpdateTokenValidator from "../middlewares/email-update-token-validator.js";
import emailUpdateReqLimiter from "../middlewares/limiters/email-update-req-limiter.js";

const router = express.Router();


router.put("/update", isValidUser, isUserVerified, emailUpdateReqLimiter, isValidProfileUpdateReq, profileUpdater);
router.patch("/email/verify", emailUpdateTokenValidator, emailUpdater);

export default router;