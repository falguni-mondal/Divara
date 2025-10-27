import express from "express";
import isValidUser from "../middlewares/auth-middleware.js";
import isUserVerified from "../middlewares/user-verify-checker.js";
import isValidProfileUpdateReq from "../middlewares/profile/profile-update-req-validator.js";
import { profileUpdater } from "../controllers/profile-controller.js";

const router = express.Router();


router.put("/update", isValidUser, isUserVerified, isValidProfileUpdateReq, profileUpdater);

export default router;