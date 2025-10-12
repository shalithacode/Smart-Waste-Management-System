import express from 'express';
import { getAssignedPickups, getWasteRequestsByAssignedStreet, assignPickupToDriver, completeTask } from '../controllers/driverController.js';
import { verifyToken, isDriver, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get assigned pickups for a driver (driver-specific)
router.get(
  "/assigned-pickups",
  verifyToken,
  isDriver,
  getAssignedPickups
);

// Get waste requests for a street assigned to the driver
router.get(
  "/pickup-requests",
  verifyToken,
  isDriver,
  getWasteRequestsByAssignedStreet
);

// Assign a pickup task to a driver (admin only)
router.post(
  "/assign-pickup",
  verifyToken,
  isAdmin,
  assignPickupToDriver
);

// Complete a task
router.post(
  "/complete-task",
  verifyToken,
  isDriver,
  completeTask
);

export default router;
