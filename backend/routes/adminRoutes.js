import express from 'express';
import { getAllWasteRequests } from '../controllers/wasteRequestController.js';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Admin view all waste requests on the map
router.get('/all-waste-requests', verifyToken, isAdmin, getAllWasteRequests);

export default router;
