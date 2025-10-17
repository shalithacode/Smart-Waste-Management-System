// General-purpose helper utilities

// Generate a unique waste code (used in wasteRequestController)
export const generateWasteCode = () => {
  const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
  const timestamp = Date.now().toString().slice(-6);
  return `WASTE-${randomString}-${timestamp}`;
};

// Validate required location object
export const validateLocation = (location) => {
  return location && typeof location.latitude === "number" && typeof location.longitude === "number";
};
