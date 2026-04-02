import { Router } from "express";
import {
  getProducts,
  createProduct,
  getProductsByArtisan,
  deleteProduct,
  addProductReview
} from "../controllers/productController";
import {
  getStates,
  deleteAllStates,
  createState,
  getStateByName,
  deleteState,
  updateState
} from "../controllers/stateController";
import {
  validateProduct,
  validateReview,
  validateState,
  validateMongoId,
  validateStateName
} from "../middleware/validation";

const router = Router();

// Product Routes
router.get("/products", getProducts);
router.post("/products", validateProduct, createProduct);
router.get("/products/artisan/:artisanId", validateStateName, getProductsByArtisan);
router.delete("/products/:id", validateMongoId, deleteProduct);
router.post("/products/:id/reviews", validateMongoId, validateReview, addProductReview);

// State Routes
router.get("/states", getStates);
router.delete("/states", deleteAllStates);
router.post("/states", validateState, createState);
router.get("/states/:stateName", validateStateName, getStateByName);
router.delete("/states/:stateName", validateStateName, deleteState);
router.patch("/states/:stateID", validateStateName, updateState);

export default router;
