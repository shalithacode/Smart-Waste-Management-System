import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cleanWasteAPI from "../../api/cleanWasteAPI";
import { gridBackgroundStyle } from "../../util/customStyles";
import Footer from "../../components/Footer";
import Map from "../../components/Map";
import Button from "../../components/Button";
import AdminNav from "../../components/AdminNav";
import { getLocationName } from "../../util/location";

const AdminHomePage = () => {
  const [wasteRequests, setWasteRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState("");
  const [streetName, setStreetName] = useState("");
  const [usersCount, setUsersCount] = useState(0);
  const [driversCount, setDriversCount] = useState(0);
  const [wasteRequestsCount, setWasteRequestsCount] = useState(0);

  const [flexibleDate, setFlexibleDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchWasteRequests = async () => {
      try {
        const response = await cleanWasteAPI.get("/waste-requests/all-waste-requests");
        setWasteRequests(response.data);
        setWasteRequestsCount(response.data.length);
      } catch (error) {
        console.error("Error fetching waste requests:", error);
      }
    };

    const fetchDrivers = async () => {
      try {
        const response = await cleanWasteAPI.get("/users/drivers");
        setDrivers(response.data);
        setDriversCount(response.data.length);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    const fetchUsersCount = async () => {
      try {
        const response = await cleanWasteAPI.get("/users/count");
        setUsersCount(response.data.count);
      } catch (error) {
        console.error("Error fetching users count:", error);
      }
    };

    fetchWasteRequests();
    fetchDrivers();
    fetchUsersCount();
  }, [selectedRequest]);

  useEffect(() => {
    const fetchLocation = async () => {
      if (selectedRequest) {
        const { latitude, longitude } = selectedRequest.location;
        const name = await getLocationName(latitude, longitude);
        setStreetName(name || "N/A");
      } else {
        setStreetName("");
      }
    };
    fetchLocation();
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
      await cleanWasteAPI.post("/waste-requests/assign-driver", {
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

  const handleWasteRequestSelect = (request) => {
    setSelectedRequest(request);
    setFlexibleDate(""); // Reset flexible date when selecting a new request
  };

  return (
    <div className="flex min-h-screen" style={gridBackgroundStyle}>
      <AdminNav />
      <main className="flex-1">
        <div className="md:ml-64 p-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#175E5E] mb-8 text-center">Admin Dashboard</h1>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-[#175E5E]">
              <h2 className="text-xl font-semibold text-[#175E5E]">Total Customers</h2>
              <p className="text-4xl font-bold text-[#175E5E] mt-4">{usersCount}</p>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-yellow-500">
              <h2 className="text-xl font-semibold text-[#175E5E]">Total Drivers</h2>
              <p className="text-4xl font-bold text-yellow-500 mt-4">{driversCount}</p>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 border-l-4 border-green-500">
              <h2 className="text-xl font-semibold text-[#175E5E]">Total Waste Requests</h2>
              <p className="text-4xl font-bold text-green-500 mt-4">{wasteRequestsCount}</p>
            </div>
          </div>

          {/* Map and Request Details Section */}
          <div className="flex flex-col lg:flex-row lg:items-start md:items-center md:justify-center-safe  lg:space-x-6">
            {/* Map Container */}
            <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-md mb-6 md:mb-3">
              <Map wasteRequests={wasteRequests} onRequestSelect={handleWasteRequestSelect} />
            </div>

            {/* Request Details Container */}
            {selectedRequest && (
              <div className="w-full lg:w-1/3 bg-white p-4 rounded-lg shadow-md">
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
                  <span className="font-bold"> {streetName}</span>
                </p>
                <p className="mb-4 text-gray-700">Waste Types:</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedRequest.wasteItems.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-700 font-medium rounded-full text-sm shadow-sm"
                    >
                      {item.type} — {item.quantity} kg
                    </span>
                  ))}
                </div>
                <p className="mb-4 text-gray-700">
                  Collection Type:
                  <span className="font-bold"> {selectedRequest.pickupOption}</span>
                </p>

                {/* Scheduled Pickup Date */}
                {selectedRequest.pickupOption === "Scheduled Pickup" && (
                  <p className="mb-4 text-gray-700">
                    Scheduled Date:
                    <span className="font-bold">
                      {" "}
                      {selectedRequest.pickupDate ? new Date(selectedRequest.pickupDate).toLocaleDateString() : "N/A"}
                    </span>
                  </p>
                )}

                {/* Flexible Pickup Date Input */}
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

                {/* Driver Selection */}
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
                    <Button
                      text="Assign Driver"
                      onClick={handleAssignDriver}
                      className="px-4 py-2 bg-[#175E5E] text-white rounded-lg shadow-lg hover:bg-[#134c4c] transition duration-300"
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default AdminHomePage;
