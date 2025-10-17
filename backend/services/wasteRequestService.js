import WasteRequest from "../models/WasteRequest.js";
import { notifyUser } from "./notificationService.js";
import User from "../models/User.js";

// Create a new waste request record
export const createWasteRequest = async (requestData) => {
  try {
    const wasteRequest = new WasteRequest(requestData);
    const createdWsteRequest = await wasteRequest.save();
    return createdWsteRequest;
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Assign driver to a request and notify the user
export const assignDriverToWasteRequest = async (requestId, driverId, pickupDate) => {
  const wasteRequest = await WasteRequest.findById(requestId);

  wasteRequest.assignedDriver = driverId;
  wasteRequest.status = "assigned";
  wasteRequest.pickupDate = pickupDate;

  await wasteRequest.save();
  notifyUser(wasteRequest.user, "Your waste request has been assigned to a driver.", "info");
  return wasteRequest;
};

// Reject request and notify the user
export const rejectWasteRequest = async (requestId, message) => {
  const wasteRequest = await WasteRequest.findById(requestId);

  wasteRequest.assignedDriver = null;
  wasteRequest.status = "rejected";
  wasteRequest.pickupDate = null;

  await wasteRequest.save();
  notifyUser(wasteRequest.user, "Your waste request has been rejected : " + message, "warn");
  return wasteRequest;
};

// Mark as picked-up and notify user
export const markWasteAsPickedUp = async (requestId) => {
  const wasteRequest = await WasteRequest.findById(requestId);
  wasteRequest.status = "picked-up";
  await wasteRequest.save();
  notifyUser(wasteRequest.user, "Your waste has been picked up.", "info");
  return wasteRequest;
};

// Fetch all requests (admin view)
export const getAllWasteRequests = async () => {
  return await WasteRequest.find().populate("user assignedDriver"); // Optionally, populate user and driver details
};

// Fetch all requests for a user
export const getWasteRequestsByUserId = async (userId) => {
  return await WasteRequest.find({ user: userId }); // Find all waste requests for the given user
};

// Fetch all requests in a specific street (optional feature)
export const getWasteRequestsByStreet = async (street) => {
  try {
    const users = await User.find({ "address.street": street.trim() });
    const userIds = users.map((user) => user._id);
    const wasteRequests = await WasteRequest.find({ user: { $in: userIds } });
    return wasteRequests;
  } catch (error) {
    console.error("Error in getWasteRequestsByStreet:", error);
    throw new Error("Error fetching waste requests by street");
  }
};
