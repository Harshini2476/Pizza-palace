import express from "express";

import {
  getPizzas,
  getPizzaById,
  addPizza,
  updatePizza,
  deletePizza,
} from "../controllers/pizzaController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getPizzas);
router.get("/:id", getPizzaById);

// Admin Routes
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  addPizza
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updatePizza
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deletePizza
);

export default router;
