import User from '../models/User.js';
import Notification from '../models/Notification.js';

export const notifyUser = async (userId, message) => {
  try {
    // Create a new notification document
    const notification = new Notification({
      user: userId,
      message,
      status: 'unread',
      date: new Date(),
    });

    // Save the notification
    await notification.save();

    // Optionally, you can also push the notification to the user's notifications array if needed
    const user = await User.findById(userId);
    user.notifications.push({ message, date: notification.date });
    await user.save();
  } catch (error) {
    console.error("Error sending notification:", error.message);
    throw new Error("Notification could not be sent");
  }
};
