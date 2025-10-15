import User from "../models/User.js";
import Notification from "../models/Notification.js";

export const notifyUser = async (userId, message, type) => {
  try {
    // Create a new notification document
    const notification = new Notification({
      user: userId,
      message,
      status: "unread",
      type,
      date: new Date(),
    });

    // Save the notification
    await notification.save();

    // Optionally, you can also push the notification to the user's notifications array if needed
    const user = await User.findById(userId);
    if (!user) {
      console.warn(`⚠️ User not found for notification: ${userId}`);
      return; // Don’t throw; just skip gracefully
    }

    // Ensure notifications array exists
    if (!Array.isArray(user.notifications)) {
      user.notifications = [];
    }
    user.notifications.push(notification._id); // push the ObjectId
    await user.save();
  } catch (error) {
    console.error("Error sending notification:", error.message);
    throw new Error("Notification could not be sent");
  }
};
