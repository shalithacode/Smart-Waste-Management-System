import DriverAssignment from '../models/Driver.js';
import WasteRequest from '../models/WasteRequest.js';

export const getAssignedPickups = async (driverId) => {
  return await DriverAssignment.find({ driver: driverId, completed: false });
};

export const assignPickupToDriver = async (driverId, street, pickupDate) => {
  const existingAssignment = await DriverAssignment.findOne({
    driver: driverId,
    assignedStreet: street,
    completed: false,
  });

  if (existingAssignment) {
    throw new Error("This driver already has an uncompleted assignment for this street.");
  }

  const assignment = new DriverAssignment({
    driver: driverId,
    assignedStreet: street,
    assignmentDate: pickupDate,
  });

  await assignment.save();
  return assignment;
};

// Service to mark a driver assignment as complete
export const completeTask = async (street) => {
  try {
    const assignment = await DriverAssignment.findOneAndUpdate(
      { assignedStreet: street, completed: false },
      { completed: true },
      { new: true }
    );

    if (!assignment) {
      throw new Error('Task not found or already completed.');
    }

    return assignment;
  } catch (error) {
    throw new Error(error.message);
  }
};
