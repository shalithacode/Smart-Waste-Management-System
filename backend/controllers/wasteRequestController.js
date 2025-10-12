import {
  createWasteRequest as createWasteRequestService,
  assignDriverToWasteRequest,
  markWasteAsPickedUp as markWasteAsPickedUpService,
  getAllWasteRequests as getAllWasteRequestsService,
  getWasteRequestsByUserId,
} from "../services/wasteRequestService.js";
import qrcode from "qrcode"; // Import QR code library

// Helper function to generate a unique waste code
const generateWasteCode = () => {
  const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
  const timestamp = Date.now().toString().slice(-6); // Take last 6 digits of timestamp
  return `WASTE-${randomString}-${timestamp}`;
};

export const createWasteRequest = async (req, res) => {
  try {
    const { waste, location, userId, pickupOption } = req.body;

    if (!location || !location.latitude || !location.longitude) {
      return res.status(400).json({
        message: "Location is required and must include latitude and longitude.",
      });
    }

    const wasteCode = generateWasteCode(); // Generate a unique waste code

    // Create waste request without QR code first
    let wasteRequest = await createWasteRequestService({
      wasteItems: waste,
      pickupOption,
      location,
      user: userId,
      wasteCode,
      status: "pending",
    });

    // Generate QR code using waste code or any other relevant info
    const qrCodeData = `Waste Code: ${wasteCode}\nUser: ${userId}\nLocation: (${location.latitude}, ${location.longitude})`;
    const qrCode = await qrcode.toDataURL(qrCodeData); // Generate base64 encoded QR code

    // Update the waste request with the generated QR code
    wasteRequest.qrCode = qrCode;
    await wasteRequest.save();

    res.status(201).json(wasteRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const assignDriver = async (req, res) => {
  try {
    const { requestId, driverId } = req.body;

    const updatedRequest = await assignDriverToWasteRequest(requestId, driverId);

    res.json(updatedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const markAsPickedUp = async (req, res) => {
  try {
    const { requestId } = req.body;
    const updatedRequest = await markWasteAsPickedUpService(requestId);
    res.json(updatedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserWasteRequests = async (req, res) => {
  try {
    const { userId } = req.params;
    const wasteRequests = await getWasteRequestsByUserId(userId);
    res.json(wasteRequests);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllWasteRequests = async (req, res) => {
  try {
    const wasteRequests = await getAllWasteRequestsService();
    res.json(wasteRequests);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
