import User from "../models/User.js";
import Notification from "../models/Notification.js";

// Create and send notification to a user
export const notifyUser = async (userId, message, type) => {
  try {
    const notification = new Notification({
      user: userId,
      message,
      status: "unread",
      type,
      date: new Date(),
    });

    await notification.save();

    // Add notification reference to the user
    const user = await User.findById(userId);
    if (!user) {
      console.warn(`User not found for notification: ${userId}`);
      return;
    }

    if (!Array.isArray(user.notifications)) {
      user.notifications = [];
    }
    user.notifications.push(notification._id);
    await user.save();
  } catch (error) {
    console.error("Error sending notification:", error.message);
    throw new Error("Notification could not be sent");
  }
};
