import User from "../models/User.js";
import Notification from "../models/Notification.js";

// Update a notification's read/unread status
export const markNotificationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["read", "unread"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const notification = await Notification.findByIdAndUpdate(id, { status });

    if (!notification) {
      return res.status(404).json({ message: "Notification not found." });
    }

    res.status(200).json({
      message: `Notification marked as ${status}.`,
      notification,
    });
  } catch (error) {
    console.error("Error updating notification status:", error);
    res.status(500).json({
      message: "Server error while updating notification.",
      error: error.message,
    });
  }
};

// Fetch notifications for the logged-in user
export const getNotificationsById = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId).populate("notifications");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ notifications: user.notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
