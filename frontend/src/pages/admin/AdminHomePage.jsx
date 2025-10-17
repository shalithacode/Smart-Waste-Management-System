import React, { useState, useEffect } from "react";
import wasteAPI from "../../api/wiseWasteAPI";
import { gridBackgroundStyle } from "../../util/customStyles";
import Footer from "../../components/Footer";
import Map from "../../components/Map";
import Button from "../../components/Button";
import AdminNav from "../../components/AdminNav";
import { FaUsers, FaTruck, FaRecycle, FaClock, FaCheckCircle, FaTrashAlt } from "react-icons/fa";

const AdminHomePage = () => {
  const [wasteRequests, setWasteRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState("");

  const [usersCount, setUsersCount] = useState(0);
  const [driversCount, setDriversCount] = useState(0);
  const [wasteRequestsCount, setWasteRequestsCount] = useState(0);
  const [flexibleDate, setFlexibleDate] = useState("");

  // New modal states
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionMessage, setRejectionMessage] = useState("");

  // New filter and table visibility state
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    const fetchWasteRequests = async () => {
      try {
        const response = await wasteAPI.get("/waste-requests/all-waste-requests");
        setWasteRequests(response.data);
        setWasteRequestsCount(response.data.length);
      } catch (error) {
        console.error("Error fetching waste requests:", error);
      }
    };

    const fetchDrivers = async () => {
      try {
        const response = await wasteAPI.get("/users/drivers");
        setDrivers(response.data);
        setDriversCount(response.data.length);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    const fetchUsersCount = async () => {
      try {
        const response = await wasteAPI.get("/users/count");
        setUsersCount(response.data.count);
      } catch (error) {
        console.error("Error fetching users count:", error);
      }
    };

    fetchWasteRequests();
    fetchDrivers();
    fetchUsersCount();
  }, [selectedRequest]);

  const handleAssignDriver = async () => {
    if (!selectedRequest || !selectedDriver) {
      alert("Please select a waste request and driver.");
      return;
    }

    if (selectedRequest.pickupOption === "Flexible Pickup" && !flexibleDate) {
      alert("Please select a date for Flexible Pickup!");
      return;
    }

    try {
      await wasteAPI.post("/waste-requests/assign-driver", {
        requestId: selectedRequest._id,
        driverId: selectedDriver,
        pickupDate:
          selectedRequest.pickupOption === "Flexible Pickup" ? flexibleDate : selectedRequest.pickupDate || Date.now(),
      });

      alert("Driver assigned successfully!");
      setSelectedRequest(null);
      setSelectedDriver("");
      setFlexibleDate("");
    } catch (error) {
      console.error("Error assigning driver:", error);
      alert("Failed to assign driver.");
    }
  };

  const handleRejectRequest = async () => {
    if (!selectedRequest) return;
    if (!rejectionMessage.trim()) {
      alert("Please enter a rejection message.");
      return;
    }

    try {
      await wasteAPI.post("/waste-requests/reject-request", {
        requestId: selectedRequest._id,
        message: rejectionMessage,
      });

      alert("Request rejected successfully!");
      setShowRejectModal(false);
      setRejectionMessage("");
      setSelectedRequest(null);
    } catch (error) {
      console.error("Error rejecting request:", error);
      alert("Failed to reject request.");
    }
  };

  const handleWasteRequestSelect = (request) => {
    setSelectedRequest(request);
    setFlexibleDate("");
  };

  // Filtered waste requests
  const filteredRequests = wasteRequests.filter((req) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "pending") return req.status === "pending";
    if (selectedFilter === "assigned") return req.status === "assigned";
    if (selectedFilter === "picked-up") return req.status === "picked-up";
    if (selectedFilter === "rejected") return req.status === "rejected";
    return true;
  });

  return (
    <div className="flex min-h-screen" style={gridBackgroundStyle}>
      <AdminNav />
      <main className="flex-1">
        <div className="md:ml-64 p-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#175E5E] mb-8 text-center">Admin Dashboard</h1>

          {/* Stats Section */}
          {/* Enhanced Stats Section */}
          {/* Enhanced Stats Section — 6 cards in one row, icons with white background */}
          <div className="flex flex-wrap justify-between gap-4 mb-10">
            {/* Total Users */}
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#175E5E] to-[#1e7a7a] text-white shadow-lg rounded-xl p-3 flex-1 min-w-[150px] transform hover:scale-105 transition-transform duration-300">
              <div className="bg-white bg-opacity-20 p-4 rounded-full mb-3">
                <FaUsers className="text-3xl" />
              </div>
              <h2 className="text-lg font-semibold">Total Users</h2>
              <p className="text-3xl font-bold mt-1">{usersCount}</p>
            </div>

            {/* Total Drivers */}
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg rounded-xl p-3 flex-1 min-w-[150px] transform hover:scale-105 transition-transform duration-300">
              <div className="bg-white bg-opacity-20 p-4 rounded-full mb-3">
                <FaTruck className="text-3xl" />
              </div>
              <h2 className="text-lg font-semibold">Total Drivers</h2>
              <p className="text-3xl font-bold mt-1">{driversCount}</p>
            </div>

            {/* Total Waste Requests */}
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg rounded-xl p-3 flex-1 min-w-[150px] transform hover:scale-105 transition-transform duration-300">
              <div className="bg-white bg-opacity-20 p-4 rounded-full mb-3">
                <FaRecycle className="text-3xl" />
              </div>
              <h2 className="text-lg font-semibold">Total Requests</h2>
              <p className="text-3xl font-bold mt-1">{wasteRequestsCount}</p>
            </div>

            {/* Pending Requests */}
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg rounded-xl p-3 flex-1 min-w-[150px] transform hover:scale-105 transition-transform duration-300">
              <div className="bg-white bg-opacity-20 p-4 rounded-full mb-3">
                <FaClock className="text-3xl" />
              </div>
              <h2 className="text-lg font-semibold">Pending</h2>
              <p className="text-3xl font-bold mt-1">
                {wasteRequests.filter((req) => req.status === "pending").length}
              </p>
            </div>

            {/* Picked-up Requests */}
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg rounded-xl p-3 flex-1 min-w-[150px] transform hover:scale-105 transition-transform duration-300">
              <div className="bg-white bg-opacity-20 p-4 rounded-full mb-3">
                <FaCheckCircle className="text-3xl" />
              </div>
              <h2 className="text-lg font-semibold">Picked-up</h2>
              <p className="text-3xl font-bold mt-1">
                {wasteRequests.filter((req) => req.status === "picked-up").length}
              </p>
            </div>

            {/* Rejected Requests */}
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-red-500 to-red-700 text-white shadow-lg rounded-xl p-3 flex-1 min-w-[150px] transform hover:scale-105 transition-transform duration-300">
              <div className="bg-white bg-opacity-20 p-4 rounded-full mb-3">
                <FaTrashAlt className="text-3xl" />
              </div>
              <h2 className="text-lg font-semibold">Rejected</h2>
              <p className="text-3xl font-bold mt-1">
                {wasteRequests.filter((req) => req.status === "rejected").length}
              </p>
            </div>
          </div>

          {/* Map + Request Details */}
          <div className="flex flex-col items-start lg:flex-row lg:space-x-6 mb-6">
            <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-md mb-6 lg:mb-0">
              <Map
                wasteRequests={wasteRequests.filter((req) => req.status !== "rejected")}
                onRequestSelect={handleWasteRequestSelect}
              />
            </div>

            {selectedRequest && (
              <div className="w-full lg:w-1/3 bg-[#E6F4F1] p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-[#175E5E] mb-4">
                  Waste Collection Request [
                  {selectedRequest.status === "picked-up" ? (
                    <span className="text-green-600">Picked-up</span>
                  ) : selectedRequest.status === "assigned" ? (
                    <span className="text-yellow-600">Assigned</span>
                  ) : (
                    <span className="text-red-600">Pending</span>
                  )}
                  ]
                </h2>

                <p className="mb-4 text-gray-700">
                  Waste Code:
                  <span className="font-bold"> {selectedRequest.wasteCode}</span>
                </p>
                <p className="mb-4 text-gray-700">
                  Location:
                  <span className="font-bold"> {selectedRequest.location.address}</span>
                </p>
                <p className="mb-4 text-gray-700">Waste Types:</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedRequest.wasteItems.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-200 text-green-700 font-medium rounded-full text-sm shadow-sm"
                    >
                      {item.type} — {item.quantity} kg
                    </span>
                  ))}
                </div>
                <p className="mb-4 text-gray-700">
                  Collection Type:
                  <span className="font-bold"> {selectedRequest.pickupOption}</span>
                </p>

                {selectedRequest.pickupOption === "Scheduled Pickup" && (
                  <p className="mb-4 text-gray-700">
                    Scheduled Date:
                    <span className="font-bold">
                      {" "}
                      {selectedRequest.pickupDate ? new Date(selectedRequest.pickupDate).toLocaleDateString() : "N/A"}
                    </span>
                  </p>
                )}

                {selectedRequest.pickupOption === "Flexible Pickup" && selectedRequest.status === "pending" && (
                  <div className="mb-4">
                    <label htmlFor="flexibleDate" className="block mb-1 font-semibold text-gray-700">
                      Select Preferred Pickup Date:
                    </label>
                    <input
                      type="date"
                      id="flexibleDate"
                      value={flexibleDate}
                      onChange={(e) => setFlexibleDate(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                )}

                {selectedRequest.status === "pending" && (
                  <>
                    <div className="mb-4">
                      <label htmlFor="driver" className="block mb-1 font-semibold text-gray-700">
                        Select Driver:
                      </label>
                      <select
                        id="driver"
                        value={selectedDriver}
                        onChange={(e) => setSelectedDriver(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        <option value="">Select a driver</option>
                        {drivers.map((driver) => (
                          <option key={driver._id} value={driver._id}>
                            {driver.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        text="Assign Driver"
                        onClick={handleAssignDriver}
                        className="flex-1 px-4 py-2 bg-[#175E5E] text-white rounded-lg shadow-lg hover:bg-[#134c4c] transition duration-300"
                      />
                      <Button
                        text="Reject"
                        onClick={() => setShowRejectModal(true)}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Buttons for filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {["all", "pending", "assigned", "picked-up", "rejected"].map((status) => (
              <button
                key={status}
                onClick={() => {
                  setSelectedFilter(status);
                }}
                className={`px-5 py-2 rounded-lg shadow-md transition-all duration-300 ${
                  selectedFilter === status
                    ? "bg-[#175E5E] text-white"
                    : "text-[#175E5E] border border-[#175E5E] hover:bg-[#175E5E] hover:text-white"
                }`}
              >
                {status === "all"
                  ? "All"
                  : status === "picked-up"
                  ? "Picked-up"
                  : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Display Table */}

          <div className="overflow-x-auto mb-8 bg-white rounded-lg shadow-md p-4">
            <table className="min-w-full border-collapse rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-[#175E5E] text-white">
                  <th className="px-4 py-2 text-left rounded-tl-lg">Name</th>
                  <th className="px-4 py-2 text-left">Location</th>
                  <th className="px-4 py-2 text-left">Waste Types</th>

                  {(selectedFilter === "all" || selectedFilter === "assigned" || selectedFilter === "picked-up") && (
                    <>
                      <th className="px-4 py-2 text-left">Schedule Date</th>
                      <th className="px-4 py-2 text-left">Driver Name</th>
                    </>
                  )}
                  {selectedFilter === "all" && <th className="px-4 py-2 text-left rounded-tr-lg">Collection Type</th>}
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((req, index) => (
                    <tr
                      key={req._id}
                      className={`border-b hover:bg-gray-100 ${
                        index === filteredRequests.length - 1 ? "rounded-b-lg" : ""
                      }`}
                    >
                      <td className="px-4 py-2">{req.user?.name || "N/A"}</td>
                      <td className="px-4 py-2">{req.location?.address || "N/A"}</td>
                      <td className="px-4 py-2">
                        {req.wasteItems.map((item, i) => (
                          <div key={i}>
                            {item.type} — {item.quantity}kg
                          </div>
                        ))}
                      </td>

                      {(selectedFilter === "all" ||
                        selectedFilter === "assigned" ||
                        selectedFilter === "picked-up") && (
                        <>
                          <td className="px-4 py-2">
                            {req.pickupDate ? new Date(req.pickupDate).toLocaleDateString() : "N/A"}
                          </td>
                          <td className="px-4 py-2">{req.assignedDriver?.name || "Unassigned"}</td>
                        </>
                      )}

                      {selectedFilter === "all" && <td className="px-4 py-2">{req.pickupOption}</td>}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500">
                      No collection requests found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </main>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Reject Waste Request</h2>
            <textarea
              value={rejectionMessage}
              onChange={(e) => setRejectionMessage(e.target.value)}
              placeholder="Enter rejection message..."
              className="w-full h-24 border rounded-md p-2 mb-3"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectRequest}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHomePage;
