import React, { useState } from "react";
import UserNav from "../../components/UserNav"; // Import UserNav
import Footer from "../../components/Footer"; // Import Footer
import Button from "../../components/Button"; // Import Button
import { useNavigate } from "react-router-dom";

const wasteTypes = [
  { type: "Plastic Waste", icon: "♻️" },
  { type: "Metal Waste", icon: "🛠️" },
  { type: "Organic Waste", icon: "🍂" },
  { type: "Paper Waste", icon: "🧾" },
  { type: "E-Waste", icon: "💻" },
  { type: "Hazardous Waste", icon: "☠️" },
];

const pickupOptions = [
  { option: "Immediate Pickup", icon: "🚛" },
  { option: "Scheduled Pickup", icon: "🕒" },
  { option: "Flexible Pickup", icon: "🔄" },
];

const BulkWaste = () => {
  const [selectedWasteTypes, setSelectedWasteTypes] = useState([]); // Array of selected waste types
  const [wasteQuantity, setWasteQuantity] = useState([]);
  const [selectedPickupOption, setSelectedPickupOption] = useState("");
  const navigate = useNavigate();

  // Toggle waste type selection
  const handleWasteTypeSelection = (wasteType) => {
    setSelectedWasteTypes(
      (prevSelected) =>
        prevSelected.includes(wasteType)
          ? prevSelected.filter((type) => type !== wasteType) // Remove if already selected
          : [...prevSelected, wasteType] // Add to selected list
    );
  };
  // handleWasteQty updates or adds a new waste type entry
  function handleWasteQty(type, quantity) {
    setWasteQuantity((prevQty) => {
      const existingIndex = prevQty.findIndex((item) => item.type === type);

      if (existingIndex !== -1) {
        // Update existing type
        const updated = [...prevQty];
        updated[existingIndex] = { type, quantity: Number(quantity) };
        return updated;
      } else {
        // Add new type
        return [...prevQty, { type, quantity: Number(quantity) }];
      }
    });
  }

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (wasteQuantity.length === 0 || wasteQuantity <= 0 || !selectedPickupOption) {
      alert("Please complete all steps!");
      return;
    }

    // Navigate to the WasteTypeSelection page with selected waste types
    navigate("/sorting-guidelines", { state: { wasteQuantity, selectedPickupOption } });
  };

  // Inline style for light grey grid background
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
    <div className="min-h-screen flex flex-col bg-gray-100" style={gridBackgroundStyle}>
      <UserNav /> {/* Add UserNav */}
      <main className="flex-grow flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 md:ml-64">
        <h1 className="text-4xl font-extrabold text-teal-800 mb-8 text-center">Bulk Waste Pickup Request</h1>

        {/* Step 1: Select Waste Type */}
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mb-8 border border-gray-300">
          {" "}
          {/* Increased max width */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Step 1: Select Waste Type</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {wasteTypes.map((waste) => (
              <div
                key={waste.type}
                className={`p-4 border rounded-lg shadow-lg text-center cursor-pointer transition-transform duration-200 hover:scale-105 ${
                  selectedWasteTypes.includes(waste.type) ? "bg-teal-600 text-white" : "bg-white text-gray-700"
                }`}
                onClick={() => handleWasteTypeSelection(waste.type)}
              >
                <div className="text-5xl mb-2">{waste.icon}</div>
                <p className="font-semibold">{waste.type}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mb-8 border border-gray-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Step 2: Enter Waste Quantity</h2>

          {selectedWasteTypes.map((selectedType) => {
            const current = wasteQuantity.find((item) => item.type === selectedType);
            const qtyValue = current ? current.quantity : 0;

            return (
              <div key={selectedType} className="mb-6 border-b border-gray-200 pb-4 last:border-b-0">
                {/* Waste Type Title */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-teal-700">{selectedType}</h3>
                  <span className="text-sm font-bold">{qtyValue} kg</span>
                </div>

                {/* Quantity Slider */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={qtyValue}
                  onChange={(e) => handleWasteQty(selectedType, e.target.value)}
                  className="w-full h-2 bg-teal-500 rounded-lg accent-teal-600"
                />
              </div>
            );
          })}
        </div>

        {/* Step 3: Choose Pickup Option */}
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 mb-8 border border-gray-300">
          {" "}
          {/* Increased max width */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Step 3: Choose Pickup Option</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {pickupOptions.map((pickup) => (
              <div
                key={pickup.option}
                className={`p-4 border rounded-lg shadow-lg text-center cursor-pointer transition-transform duration-200 hover:scale-105 ${
                  selectedPickupOption === pickup.option ? "bg-teal-600 text-white" : "bg-white text-gray-700"
                }`}
                onClick={() => setSelectedPickupOption(pickup.option)}
              >
                <div className="text-5xl mb-2">{pickup.icon}</div>
                <p className="font-semibold">{pickup.option}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          text="Submit Request"
          className="w-full max-w-4xl px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-700 transition duration-300"
          onClick={handleSubmit}
        />
      </main>
      <Footer /> {/* Add Footer */}
    </div>
  );
};

export default BulkWaste;
