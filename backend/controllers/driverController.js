import { getAssignedPickups as getAssignedPickupsService, assignPickupToDriver as assignPickupToDriverService, completeTask as completeTaskService } from '../services/driverService.js';
import { findUsersByStreet } from '../services/userService.js';
import { notifyUser } from '../services/notificationService.js';
import { getWasteRequestsByStreet } from '../services/wasteRequestService.js';

// Get pickups assigned to a driver
export const getAssignedPickups = async (req, res) => {
  try {
    const driverId = req.user.userId; // Extracted from JWT
    const pickups = await getAssignedPickupsService(driverId);
    res.json(pickups);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get waste requests for the driver's assigned street
export const getWasteRequestsByAssignedStreet = async (req, res) => {
  try {
    const { street } = req.query;

    if (!street) {
      return res.status(400).json({ message: "Street query parameter is required" });
    }

    const wasteRequests = await getWasteRequestsByStreet(street);

    if (!wasteRequests || wasteRequests.length === 0) {
      return res.status(404).json({ message: "No waste requests found for this street." });
    }

    res.json(wasteRequests);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Assign a pickup task to a driver
export const assignPickupToDriver = async (req, res) => {
  try {
    const { driverId, street, pickupDate } = req.body;

    const assignment = await assignPickupToDriverService(driverId, street, pickupDate);

    const driverMessage = `You have been assigned a new task for ${street} on ${new Date(pickupDate).toLocaleDateString()}.`;
    await notifyUser(driverId, driverMessage);

    const usersOnStreet = await findUsersByStreet(street);
    const userMessage = `Your pickup driver is coming to ${street} on ${new Date(pickupDate).toLocaleDateString()}.`;

    for (const user of usersOnStreet) {
      await notifyUser(user._id, userMessage);
    }

    res.status(201).json({
      message: "Pickup task assigned successfully, notifications sent.",
      assignment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Complete a task
export const completeTask = async (req, res) => {
  const { street } = req.body;

  try {
    const assignment = await completeTaskService(street);

    res.status(200).json({ message: "Task marked as completed.", assignment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
