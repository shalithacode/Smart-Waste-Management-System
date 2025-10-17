import React, { useState, useEffect } from "react";
import wasteAPI from "../../api/wiseWasteAPI"; // Ensure your API setup is correct
import AdminNav from "../../components/AdminNav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "../../components/Footer"; // Import the Footer component
import { gridBackgroundStyle } from "../../util/customStyles";

const DriverAssignPage = () => {
  const [drivers, setDrivers] = useState([]); // List of drivers
  const [selectedStreet, setSelectedStreet] = useState(""); // Selected street name
  const [selectedDriver, setSelectedDriver] = useState(""); // Selected driver
  const [pickupDate, setPickupDate] = useState(new Date()); // Selected pickup date

  // Hardcoded list of street names
  const streetNames = ["Vihara Road", "Waliwita Road", "E.A. Jayasinghe Road", "Gamunu Pura", "Samanala Pedesa"];

  // Fetch drivers from the backend
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await wasteAPI.get("/users/drivers"); // Fetch users and drivers
        const driverList = response.data.filter((user) => user.role === "driver"); // Filter only drivers
        setDrivers(driverList);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchDrivers();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStreet || !selectedDriver || !pickupDate) {
      alert("Please select a street, driver, and pickup date.");
      return;
    }

    try {
      // API call to assign the driver
      const response = await wasteAPI.post("/drivers/assign-pickup", {
        driverId: selectedDriver,
        street: selectedStreet,
        pickupDate: pickupDate,
      });

      if (response.status === 201) {
        alert("Driver assigned successfully!");
      }
    } catch (error) {
      console.error("Error assigning driver:", error);
      alert(error.response?.data?.message || "Failed to assign driver. Please try again."); // Show specific error message
    }
  };

  return (
    <div className="min-h-screen" style={gridBackgroundStyle}>
      <AdminNav />
      <div className="flex flex-col items-center justify-center px-4 py-8 sm:py-12 md:ml-64">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#175E5E] mb-8 text-center">
          Assign Driver for Pickup
        </h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
          {/* Street Dropdown */}
          <div className="mb-6">
            <label htmlFor="street" className="block text-gray-800 font-bold mb-2">
              Select Street:
            </label>
            <select
              id="street"
              value={selectedStreet}
              onChange={(e) => setSelectedStreet(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#175E5E] transition"
            >
              <option value="">Choose a street</option>
              {streetNames.map((street, index) => (
                <option key={index} value={street}>
                  {street}
                </option>
              ))}
            </select>
          </div>

          {/* Driver Dropdown */}
          <div className="mb-6">
            <label htmlFor="driver" className="block text-gray-800 font-bold mb-2">
              Select Driver:
            </label>
            <select
              id="driver"
              value={selectedDriver}
              onChange={(e) => setSelectedDriver(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#175E5E] transition"
            >
              <option value="">Choose a driver</option>
              {drivers.map((driver) => (
                <option key={driver._id} value={driver._id}>
                  {driver.name}
                </option>
              ))}
            </select>
          </div>

          {/* Pickup Date */}
          <div className="mb-6">
            <label htmlFor="pickupDate" className="block text-gray-800 font-bold mb-2">
              Select Pickup Date:
            </label>
            <DatePicker
              id="pickupDate"
              selected={pickupDate}
              onChange={(date) => setPickupDate(date)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#175E5E] transition"
              dateFormat="yyyy/MM/dd"
              minDate={new Date()} // Prevent selecting past dates
              placeholderText="Select a pickup date"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-3 bg-[#175E5E] text-white font-semibold rounded-lg hover:bg-[#134c4c] transition duration-300"
          >
            Assign Driver
          </button>
        </form>
      </div>
      <Footer /> {/* Add Footer */}
    </div>
  );
};

export default DriverAssignPage;
