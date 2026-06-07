import express from "express";

import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Customer Routes
router.post(
  "/",
  authMiddleware,
  createOrder
);

router.get(
  "/myorders",
  authMiddleware,
  getMyOrders
);

// Admin Routes
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllOrders
);

router.put(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus
);

export default router;
