import express from "express";
import isValidUser from "../middlewares/auth/auth-middleware.js";
import isUserVerified from "../middlewares/user-verify-checker.js";
import isValidProduct from "../middlewares/admin/product/add-product-validator.js";
import { addProduct } from "../controllers/admin-controller.js";
import upload from "../middlewares/multer/multer.js";

const router = express.Router();


router.post("/product/add", isValidUser, isUserVerified, upload.array('images', 5), isValidProduct, addProduct)


export default router;