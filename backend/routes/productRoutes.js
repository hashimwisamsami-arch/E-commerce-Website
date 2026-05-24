import express from "express";
import formidable from "express-formidable";

import { authorizeAdmin, authenticate } from "../middlewares/authMiddleware.js";

import checkId from "../middlewares/checkId.js";

// controllers
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchPoduct,
  fetchPoductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").post(authenticate, authorizeAdmin, formidable(), addProduct);

router.route("/").get(fetchPoduct);

router.route("/allproducts").get(fetchAllProducts);
router.route("/:id/reviews").post(authenticate, checkId, addProductReview);

router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);

router
  .route("/:id")
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails);

router.route("/:id").delete(authenticate, authorizeAdmin, removeProduct);

router.route("/:id").get(fetchPoductById);

export default router;
