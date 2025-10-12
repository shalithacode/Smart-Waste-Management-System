import express from "express";
import { markNotificationStatus, getNotificationsById } from "../controllers/notificationController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/", verifyToken, getNotificationsById);
router.patch("/:id", verifyToken, verifyToken, markNotificationStatus);

export default router;
