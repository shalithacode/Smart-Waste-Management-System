import express from 'express';
import { addPlace, getAllPlaces, markAsCollected, reportOverflow } from '../controllers/placeController.js';

const router = express.Router();

// Add a new place (Admin adds)
router.post('/addPlace', addPlace);

// Get all places (Collector views the list)
router.get('/places', getAllPlaces);

// Mark a place as collected
router.post('/collect/:placeId', markAsCollected);

// Report bin overflow
router.post('/overflow/:placeId', reportOverflow);

export default router;
