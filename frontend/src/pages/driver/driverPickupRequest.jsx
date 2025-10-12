import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import cleanWasteAPI from "../../api/cleanWasteAPI";

import MapComponent from "../../components/MapComponent";
import DriverNavbar from "../../components/DriverNavbar";
import Footer from "../../components/Footer";
import { FaTasks, FaChevronDown, FaCheckCircle } from "react-icons/fa";
import { Menu, Dropdown, Button } from "antd";

const PickupRequests = () => {
  const [searchParams] = useSearchParams();
  const [wasteRequests, setWasteRequests] = useState([]);
  const [driverTasks, setDriverTasks] = useState([]);
  const [pickedUpRequestId, setPickedUpRequestId] = useState(null);
  const [wasteIdInput, setWasteIdInput] = useState("");
  const [expandedRequestId, setExpandedRequestId] = useState(null);
  const street = searchParams.get("street");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWasteRequests = async () => {
      try {
        const response = await cleanWasteAPI.get(
          `/drivers/pickup-requests?street=${street}`
        );
        setWasteRequests(response.data || []);
      } catch (error) {
        console.error("Error fetching waste requests:", error);
      }
    };

    const fetchDriverTasks = async () => {
      try {
        const response = await cleanWasteAPI.get(`/drivers/assigned-pickups`);
        setDriverTasks(response.data || []);
      } catch (error) {
        console.error("Error fetching driver tasks:", error);
      }
    };

    if (street) {
      fetchWasteRequests();
    }

    fetchDriverTasks();
  }, [street]);

  // Define taskMenu for the dropdown
  const taskMenu = (
    <Menu className="shadow-lg rounded-md bg-white">
      {driverTasks.length > 0 ? (
        driverTasks.map((task) => (
          <Menu.Item key={task._id}>
            <Link
              className="text-gray-700 block px-4 py-2 hover:bg-gray-100"
              to={`/pickup-requests?street=${task.assignedStreet}`}
            >
              {task.assignedStreet} -{" "}
              {new Date(task.assignmentDate).toLocaleDateString()}
            </Link>
          </Menu.Item>
        ))
      ) : (
        <Menu.Item>
          <span className="text-gray-500 px-4 py-2 block">
            No tasks assigned.
          </span>
        </Menu.Item>
      )}
    </Menu>
  );

  // Handle "Picked Up" button click
  const handlePickedUpClick = (requestId) => {
    setPickedUpRequestId(requestId);
  };

  const handleConfirmPickup = async (requestId) => {
    if (!wasteIdInput) {
      alert("Please enter a valid Waste ID.");
      return;
    }

    try {
      const response = await cleanWasteAPI.post(
        `/waste-requests/mark-picked-up`,
        {
          requestId,
          wasteId: wasteIdInput,
        }
      );

      if (response.status === 200) {
        alert("Pickup confirmed successfully!");

        setWasteRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === requestId
              ? { ...request, status: "picked-up" }
              : request
          )
        );

        setPickedUpRequestId(null);
        setWasteIdInput("");
      }
    } catch (error) {
      console.error("Error confirming pickup:", error);
      alert("Failed to confirm pickup.");
    }
  };

  const handleDismissPickup = () => {
    alert("Pickup dismissed!");
    setPickedUpRequestId(null);
  };

  const handleReportIssue = () => {
    alert("Issue reported successfully!");
  };

  const toggleMap = (requestId) => {
    setExpandedRequestId(expandedRequestId === requestId ? null : requestId);
  };

  const allPickedUp = wasteRequests.every(
    (request) => request.status === "picked-up"
  );

  const handleTaskComplete = async () => {
    try {
      const response = await cleanWasteAPI.post(`/drivers/complete-task`, {
        street,
      });

      if (response.status === 200) {
        alert("Task marked as completed!");
        navigate("/driverNotifications");
      }
    } catch (error) {
      console.error("Error completing task:", error);
      alert("Failed to complete the task.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <DriverNavbar />

      {/* Task Panel */}
      <div className="flex justify-end items-center bg-white shadow p-4 z-10 sticky top-0 w-full">
        <Dropdown overlay={taskMenu} trigger={["click"]}>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center space-x-2">
            <FaTasks />
            <span>View My Tasks</span>
            <FaChevronDown />
          </Button>
        </Dropdown>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-[#175E5E] mb-8">
          Waste Requests for {street}
        </h1>
        <div className="w-full max-w-4xl mx-auto">
          {wasteRequests.length > 0 ? (
            <ul className="space-y-4">
              {wasteRequests.map((request) => (
                <li
                  key={request._id}
                  className="bg-white shadow-md rounded-lg p-4 md:p-6 border-l-4 border-blue-400"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="w-full md:w-[65%] mb-4 md:mb-0">
                      <p className="text-lg font-semibold text-gray-800 truncate">
                        Waste Type: {request.wasteType.join(", ")}
                      </p>
                      <p className="text-sm text-gray-600">
                        Requested Date:{" "}
                        {new Date(request.createdAt).toLocaleDateString()}
                      </p>
                      <p
                        className={`text-sm font-semibold ${
                          request.status === "picked-up"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        Status: {request.status}
                      </p>
                    </div>

                    <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0 w-full md:w-auto justify-end">
                      {request.status !== "picked-up" ? (
                        <>
                          <button
                            className="w-full md:w-auto px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-200"
                            onClick={() => toggleMap(request._id)}
                          >
                            {expandedRequestId === request._id
                              ? "Hide Location"
                              : "View Location"}
                          </button>

                          <button
                            className="w-full md:w-auto px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200"
                            onClick={() => handlePickedUpClick(request._id)}
                          >
                            Picked Up
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center space-x-2 text-green-600">
                          <FaCheckCircle size={20} />
                          <span className="font-semibold">
                            Waste Pickup Completed
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {expandedRequestId === request._id && (
                    <div className="mt-4">
                      <MapComponent
                        latitude={request.location.latitude}
                        longitude={request.location.longitude}
                      />
                    </div>
                  )}

                  {pickedUpRequestId === request._id && (
                    <div className="mt-4 space-y-2">
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-md"
                        placeholder="Enter Waste ID"
                        value={wasteIdInput}
                        onChange={(e) => setWasteIdInput(e.target.value)}
                      />
                      <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
                        <button
                          className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                          onClick={() => handleConfirmPickup(request._id)}
                        >
                          Confirm Pickup
                        </button>
                        <button
                          className="w-full md:w-auto px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-200"
                          onClick={handleDismissPickup}
                        >
                          Dismiss
                        </button>
                        <button
                          className="w-full md:w-auto px-4 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition duration-200"
                          onClick={handleReportIssue}
                        >
                          Report
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <p className="text-lg font-semibold text-gray-700">
                No waste requests found for this street.
              </p>
            </div>
          )}

          {allPickedUp && (
            <div className="mt-8 flex justify-center">
              <button
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200"
                onClick={handleTaskComplete}
              >
                Task Complete
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PickupRequests;
