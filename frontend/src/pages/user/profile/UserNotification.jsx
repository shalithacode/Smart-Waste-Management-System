import React, { useState, useEffect } from "react";
import UserNav from "../../../components/UserNav";
import Footer from "../../../components/Footer";
import Sidebar from "./Sidebar";
import cleanWasteAPI from "../../../api/cleanWasteAPI";

const UserNotification = () => {
  const [notifications, setNotifications] = useState([]);
  console.log(notifications);
  useEffect(() => {
    // Fetch user notifications from the backend
    const fetchNotifications = async () => {
      try {
        const response = await cleanWasteAPI.get("/notifications/");
        // Assuming user's notifications are in profile data

        setNotifications(response.data.notifications || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await cleanWasteAPI.patch(`/notifications/${notificationId}`, {
        status: "read", // must be a JS object, not a string
      });

      // Update UI instantly
      setNotifications((prev) => prev.map((n) => (n._id === notificationId ? { ...n, status: "read" } : n)));
    } catch (error) {
      console.error("Error marking notification as read:", error.response?.data || error.message);
    }
  };

  // Inline style for the light grey grid background
  const gridBackgroundStyle = {
    backgroundImage: `
      linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
      linear-gradient(180deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
    `,
    backgroundSize: "10px 10px",
    width: "100%",
    minHeight: "100vh",
  };

  return (
    <div className="min-h-screen flex flex-col" style={gridBackgroundStyle}>
      <UserNav key={notifications} />

      <div className="flex flex-1">
        <main className="flex-1 p-4 lg:ml-56">
          <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Your Notifications</h1>

          <ul className="w-full max-w-4xl mx-auto">
            {notifications.map((notification, index) => {
              const status = notification.status || "unread"; // fallback
              return (
                <li
                  key={index}
                  className={`bg-white shadow-md rounded-lg p-6 border-l-4 ${
                    status === "read" ? "border-green-500" : "border-yellow-400"
                  }`}
                >
                  <p className={`text-lg font-semibold text-gray-700`}>{notification.message}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">{new Date(notification.date).toLocaleDateString()}</span>

                    <button
                      onClick={() => handleMarkAsRead(notification._id)}
                      disabled={status === "read"} // disables button if read
                      className={`px-3 py-1 text-sm text-white rounded transition duration-300 ${
                        status === "read" ? "bg-gray-300  cursor-not-allowed" : "bg-[#175E5E]  hover:bg-[#134c4c]"
                      }`}
                    >
                      {status === "read" ? "Read" : "Mark as Read"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default UserNotification;
