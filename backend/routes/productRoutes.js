import express from "express";
import formidable from "express-formidable";
import { authorizeAdmin, authenticate } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
//controllers
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchPoduct,
} from "../controllers/productController.js";

const router = express.Router();
router.route("/").post(authenticate, authorizeAdmin, formidable(), addProduct);
router
  .route("/:id")
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails);
router.route("/:id").delete(authenticate, authorizeAdmin, removeProduct);
router.route("/").get(fetchPoduct);

export default router;
