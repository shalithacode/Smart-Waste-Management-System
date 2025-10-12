import User from "../models/User.js";
import Notification from "../models/Notification.js";
// ✅ Mark a single notification as read or unread
export const markNotificationStatus = async (req, res) => {
  try {
    const { id } = req.params; // notification ID
    const { status } = req.body; // expected value: "read" or "unread"

    // Validate status
    if (!["read", "unread"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    // Find and update notification
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
export const getNotificationsById = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find the user and populate notifications
    const user = await User.findById(userId).populate("notifications");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the notifications array
    res.status(200).json({ notifications: user.notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
