import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import cleanWasteAPI from "../../api/cleanWasteAPI";
import UserNav from "../../components/UserNav";
import Footer from "../../components/Footer";
import { gridBackgroundStyle } from "../../util/customStyles";
import Button from "../../components/Button";
import Map from "../../components/userMap";
import { useAuth } from "../../context/AuthContext";

const CreateWasteRequest = () => {
  const location = useLocation();
  const { selectedPickupOption, wasteQuantity, pickupDate } = location.state || {};
  const [pickupLocation, setPickupLocation] = useState(null);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [qrCode, setQrCode] = useState(null);
  const [wasteCode, setWasteCode] = useState(null); // State to store the Waste Code
  const [loading, setLoading] = useState(false);

  // Handle creating the waste request
  const handleCreateRequest = async () => {
    if (!pickupLocation) {
      alert("Please select a location for waste pickup.");
      return;
    }

    try {
      const response = await cleanWasteAPI.post("/waste-requests/create", {
        waste: wasteQuantity,
        pickupOption: selectedPickupOption,
        location: pickupLocation,
        pickupDate: pickupDate,
        userId: auth.user._id,
      });

      alert("Waste request created successfully!");

      // Set the QR code and waste code from the response to state
      setQrCode(response.data.qrCode);
      setWasteCode(response.data.wasteCode); // Assuming the response contains a wasteCode

      // Navigate to the confirmation page
      navigate("/confirmation", { state: { qrCode: response.data.qrCode, wasteCode: response.data.wasteCode } });
    } catch (error) {
      console.error("Error creating waste request:", error);
      alert("Failed to create waste request. Please try again.");
    }
  };

  // Fallback if no selectedWasteTypes are passed
  if (!wasteQuantity) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <h1 className="text-2xl font-semibold text-red-500">Error: No waste types selected.</h1>
        <Button
          text="Go Back"
          onClick={() => navigate("/")}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-lg transition duration-200"
        />
      </div>
    );
  }

  // Function to download the QR code
  const handleDownloadQrCode = () => {
    const a = document.createElement("a");
    a.href = qrCode;
    a.download = "waste-request-qr-code.png";
    a.click();
  };

  return (
    <div className="flex flex-col min-h-screen" style={gridBackgroundStyle}>
      <UserNav />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-6 sm:py-12  md:ml-64">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#175E5E] mb-8 text-center">
          Confirm Your Waste Request
        </h1>

        {/* Instruction for selecting location */}
        <p className="text-lg text-gray-700 mb-4 text-center">
          Please click on the map to select the location where you disposed of the waste.
        </p>

        {/* Map Component for Selecting Pickup Location */}
        <div className="w-full max-w-4xl mx-auto mb-4">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#175E5E]"></div>
            </div>
          ) : (
            <Map onLocationSelect={setPickupLocation} setLoading={setLoading} />
          )}
        </div>

        {/* Buttons Container */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
          <Button
            text="Back"
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg shadow-lg transition duration-300"
          />
          <Button
            text="Confirm Waste Request"
            onClick={handleCreateRequest}
            className="px-8 py-3 bg-[#175E5E] text-white font-semibold rounded-lg shadow-lg hover:bg-[#134c4c] transform hover:scale-105 transition duration-300"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateWasteRequest;
