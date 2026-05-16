import express from "express";
import formidable from "express-formidable";
import { authorizeAdmin, authenticate } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
//controllers
import { addProduct } from "../controllers/productController.js";

const router = express.Router();
router.route("/").post(authenticate, authorizeAdmin, formidable(), addProduct);

export default router;
