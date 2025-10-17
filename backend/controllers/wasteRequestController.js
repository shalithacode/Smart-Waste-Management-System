import {
  createWasteRequest as createWasteRequestService,
  assignDriverToWasteRequest,
  markWasteAsPickedUp as markWasteAsPickedUpService,
  getAllWasteRequests as getAllWasteRequestsService,
  rejectWasteRequest,
  getWasteRequestsByUserId,
} from "../services/wasteRequestService.js";
import qrcode from "qrcode";

// Helper function to generate a unique waste code
const generateWasteCode = () => {
  const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
  const timestamp = Date.now().toString().slice(-6); // Take last 6 digits of timestamp
  return `WASTE-${randomString}-${timestamp}`;
};

// Create new waste pickup request
export const createWasteRequest = async (req, res) => {
  try {
    const { waste, location, userId, pickupOption, pickupDate } = req.body;

    if (!location || !location.latitude || !location.longitude) {
      return res.status(400).json({
        message: "Location is required and must include latitude and longitude.",
      });
    }

    const wasteCode = generateWasteCode();

    let wasteRequest = await createWasteRequestService({
      wasteItems: waste,
      pickupOption,
      pickupDate,
      location,
      user: userId,
      wasteCode,
      status: "pending",
    });

    const qrCodeData = `Waste Code: ${wasteCode}\nUser: ${userId}\nLocation: (${location.latitude}, ${location.longitude})`;
    const qrCode = await qrcode.toDataURL(qrCodeData); // Generate base64 encoded QR code

    wasteRequest.qrCode = qrCode;
    await wasteRequest.save();

    res.status(201).json(wasteRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Admin: assign driver to request
export const assignDriver = async (req, res) => {
  try {
    const { requestId, driverId, pickupDate } = req.body;

    const updatedRequest = await assignDriverToWasteRequest(requestId, driverId, pickupDate);

    res.json(updatedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Admin: reject waste request
export const rejectRequest = async (req, res) => {
  try {
    const { requestId, message } = req.body;

    const updatedRequest = await rejectWasteRequest(requestId, message);

    res.json(updatedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Driver: mark request as picked up
export const markAsPickedUp = async (req, res) => {
  try {
    const { requestId } = req.body;
    const updatedRequest = await markWasteAsPickedUpService(requestId);
    res.json(updatedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// User: get their own waste requests
export const getUserWasteRequests = async (req, res) => {
  try {
    const { userId } = req.params;
    const wasteRequests = await getWasteRequestsByUserId(userId);
    res.json(wasteRequests);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Admin/User: get all waste requests
export const getAllWasteRequests = async (req, res) => {
  try {
    const wasteRequests = await getAllWasteRequestsService();
    res.json(wasteRequests);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
