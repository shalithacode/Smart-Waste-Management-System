import React, { useState, useEffect } from "react";
import UserNav from "../../../components/UserNav"; // Adjust the path as needed
import Footer from "../../../components/Footer"; // Adjust the path as needed
import Sidebar from "./Sidebar"; // Import Sidebar component
import cleanWasteAPI from "../../../api/cleanWasteAPI"; // Ensure the API setup is correct

const UserNotification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch user notifications from the backend
    const fetchNotifications = async () => {
      try {
        const response = await cleanWasteAPI.get("/users/profile"); // Assuming the user's notifications are part of the profile data
        setNotifications(response.data.notifications || []); // Handle empty response
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  // Inline style for the light grey grid background
  const gridBackgroundStyle = {
    backgroundImage: `
      linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
      linear-gradient(180deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
    `,
    backgroundSize: "10px 10px", // Smaller grid size
    width: "100%",
    minHeight: "100vh", // Full-screen grid background
  };

  return (
    <div className="min-h-screen flex flex-col" style={gridBackgroundStyle}>
      {/* UserNav remains on top */}
      <UserNav />

      <div className="flex flex-1">
        {/* Main content */}
        <main className="flex-1 p-4 lg:ml-56">
          {" "}
          {/* Adjusted margin for the sidebar */}
          <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Your Notifications</h1>
          <div className="w-full max-w-4xl mx-auto">
            {notifications.length > 0 ? (
              <ul className="space-y-4">
                {notifications.map((notification, index) => (
                  <li key={index} className="bg-white shadow-md rounded-lg p-6 border-l-4 border-yellow-400">
                    <p className="text-lg font-semibold text-gray-700">{notification.message}</p>
                    <span className="text-sm text-gray-500 mt-2 block">
                      {new Date(notification.date).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="bg-white shadow-md rounded-lg p-6 text-center">
                <p className="text-lg font-semibold text-gray-700">No notifications available.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default UserNotification;
