import express from "express";
import { getAllWasteRequests } from "../controllers/wasteRequestController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin-only route to fetch all waste requests
router.get("/all-waste-requests", verifyToken, isAdmin, getAllWasteRequests);

export default router;
