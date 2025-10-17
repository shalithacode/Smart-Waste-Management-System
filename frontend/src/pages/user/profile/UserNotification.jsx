import React, { useState, useEffect } from "react";
import UserNav from "../../../components/UserNav";
import Footer from "../../../components/Footer";
import cleanWasteAPI from "../../../api/wiseWasteAPI";
import { gridBackgroundStyle } from "../../../util/customStyles";

const UserNotification = () => {
  const [notifications, setNotifications] = useState([]);

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
  }, [notifications]);

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

  return (
    <div className="min-h-screen flex flex-col" style={gridBackgroundStyle}>
      <UserNav key={notifications} />

      <div className="flex flex-1">
        <main className="flex-1 p-4 lg:ml-64 md:ml-64">
          <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Your Notifications</h1>

          {notifications.length > 0 ? (
            <ul className="w-full max-w-4xl mx-auto">
              {notifications.map((notification, index) => {
                const status = notification.status || "unread"; // fallback
                const type = notification.type || "info";
                return (
                  <li
                    key={index}
                    className={`bg-white shadow-md rounded-lg p-6 mb-6 border-l-4 ${
                      type === "info" ? "border-yellow-500" : "border-red-400"
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
          ) : (
            <p className="px-6 py-4 text-center text-gray-500">No notifications were found.</p>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default UserNotification;
