import Place from '../models/Place.js';

// Add a new place
export const addPlace = async (streetName, binCount) => {
  const place = new Place({
    streetName,
    binCount
  });
  return await place.save();
};

// Get all places
export const getAllPlaces = async () => {
  return await Place.find();
};

// Mark a place as collected
export const markAsCollected = async (placeId) => {
  return await Place.findByIdAndUpdate(placeId, { isCollected: true });
};

// Report bin overflow
export const reportOverflow = async (placeId) => {
  return await Place.findByIdAndUpdate(placeId, { overflowReported: true });
};
