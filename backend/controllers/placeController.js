import { addPlace as addPlaceService, getAllPlaces as getAllPlacesService, markAsCollected as markAsCollectedService, reportOverflow as reportOverflowService } from '../services/placeService.js';

// Add a new place
export const addPlace = async (req, res) => {
  const { streetName, binCount } = req.body;
  try {
    const newPlace = await addPlaceService(streetName, binCount);
    res.status(201).json(newPlace);
  } catch (error) {
    res.status(500).json({ message: 'Error adding place' });
  }
};

// Get all places
export const getAllPlaces = async (req, res) => {
  try {
    const places = await getAllPlacesService();
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching places' });
  }
};

// Mark a place as collected
export const markAsCollected = async (req, res) => {
  const { placeId } = req.params;
  try {
    const updatedPlace = await markAsCollectedService(placeId);
    res.status(200).json(updatedPlace);
  } catch (error) {
    res.status(500).json({ message: 'Error marking place as collected' });
  }
};

// Report bin overflow
export const reportOverflow = async (req, res) => {
  const { placeId } = req.params;
  try {
    const updatedPlace = await reportOverflowService(placeId);
    res.status(200).json(updatedPlace);
  } catch (error) {
    res.status(500).json({ message: 'Error reporting overflow' });
  }
};
