import WasteRequest from "../models/WasteRequest.js";
import { notifyUser } from "./notificationService.js";
import User from "../models/User.js";

export const createWasteRequest = async (requestData) => {
  const wasteRequest = new WasteRequest(requestData);
  await wasteRequest.save();
  return wasteRequest;
};

export const assignDriverToWasteRequest = async (requestId, driverId) => {
  const wasteRequest = await WasteRequest.findById(requestId);

  wasteRequest.assignedDriver = driverId;
  wasteRequest.status = "assigned";

  await wasteRequest.save();
  notifyUser(wasteRequest.user, "Your waste request has been assigned to a driver.");
  return wasteRequest;
};
export const rejectWasteRequest = async (requestId, message) => {
  const wasteRequest = await WasteRequest.findById(requestId);

  wasteRequest.assignedDriver = null;
  wasteRequest.status = "rejected";
  wasteRequest.pickupDate = null;

  await wasteRequest.save();
  notifyUser(wasteRequest.user, "Your waste request has been rejected : " + message, "warn");
  return wasteRequest;
};
export const markWasteAsPickedUp = async (requestId) => {
  const wasteRequest = await WasteRequest.findById(requestId);
  wasteRequest.status = "picked-up";
  await wasteRequest.save();
  notifyUser(wasteRequest.user, "Your waste has been picked up.", "info");
  return wasteRequest;
};

// New function to get all waste requests for admin
export const getAllWasteRequests = async () => {
  return await WasteRequest.find().populate("user assignedDriver"); // Optionally, populate user and driver details
};

export const getWasteRequestsByUserId = async (userId) => {
  return await WasteRequest.find({ user: userId }); // Find all waste requests for the given user
};

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
