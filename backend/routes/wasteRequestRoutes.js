import express from "express";
import {
  createWasteRequest,
  assignDriver,
  rejectRequest,
  getAllWasteRequests,
  markAsPickedUp,
  getUserWasteRequests,
} from "../controllers/wasteRequestController.js";
import { verifyToken, isAdmin, isDriver } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create a waste request (user-specific)
router.post("/create", verifyToken, createWasteRequest);

// Assign driver to a waste request (admin-specific)
router.post("/assign-driver", verifyToken, isAdmin, assignDriver);

// Assign reject the waste request (admin-specific)
router.post("/reject-request", verifyToken, isAdmin, rejectRequest);

// Get all waste requests (user-specific)
router.get("/all-waste-requests", verifyToken, getAllWasteRequests);

// Mark waste as picked up (driver-specific)
router.post("/mark-picked-up", verifyToken, isDriver, markAsPickedUp);

// Get waste requests for a specific user
router.get("/user/:userId", getUserWasteRequests);

export default router;
