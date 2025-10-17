import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserNav from "../../components/UserNav";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import { ClipboardIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline"; // Updated Heroicons imports
import { gridBackgroundStyle } from "../../util/customStyles";

const WasteRequestConfirmation = () => {
  const location = useLocation();
  const { qrCode, wasteCode } = location.state || {};
  const navigate = useNavigate(); // Using useNavigate for programmatic navigation

  // Function to download the QR code
  const handleDownloadQrCode = () => {
    const a = document.createElement("a");
    a.href = qrCode;
    a.download = "waste-request-qr-code.png";
    a.click();
  };

  // Function to copy waste code to clipboard
  const handleCopyWasteCode = () => {
    navigator.clipboard
      .writeText(wasteCode)
      .then(() => alert("Waste code copied to clipboard!"))
      .catch((err) => console.error("Failed to copy: ", err));
  };

  return (
    <div className="flex flex-col min-h-screen" style={gridBackgroundStyle}>
      <UserNav />
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12  md:ml-64">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#175E5E] mb-6 text-center">
          Waste Request Confirmed!
        </h1>

        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 w-full max-w-lg text-center">
          {qrCode && (
            <div className="mb-6">
              <h2 className="text-lg sm:text-xl font-bold mb-4">Your Waste Request QR Code</h2>
              {/* Flex container for QR code and download button */}
              <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-4 sm:space-y-0">
                <img src={qrCode} alt="QR Code" className="w-40 h-auto" /> {/* QR code */}
                <button
                  onClick={handleDownloadQrCode}
                  className="px-4 py-2 bg-[#175E5E] text-white font-semibold rounded-lg flex items-center justify-center hover:bg-[#134c4c] transition duration-300"
                >
                  <ArrowDownTrayIcon className="h-6 w-6 text-white" /> {/* Download icon */}
                </button>
              </div>
            </div>
          )}

          {wasteCode && (
            <div className="mb-6">
              <h2 className="text-lg sm:text-xl font-bold mb-2">Waste Code</h2>
              {/* Flex container for waste code and copy button in the same row */}
              <div className="flex items-center justify-center space-x-2 sm:space-x-4">
                <p className="text-lg text-gray-700">{wasteCode}</p>
                <button
                  onClick={handleCopyWasteCode}
                  className="px-3 py-2 bg-[#175E5E] text-white font-semibold rounded-lg flex items-center hover:bg-[#134c4c] transition duration-300"
                >
                  <ClipboardIcon className="h-6 w-6 text-white" /> {/* Clipboard icon */}
                </button>
              </div>
            </div>
          )}

          <Button
            text="Back to Home"
            onClick={() => navigate("/")} // Use navigate for going back to home
            className="w-full px-4 py-3 bg-[#175E5E] text-white font-semibold rounded-lg shadow-lg hover:bg-[#134c4c] transform hover:scale-105 transition duration-300 mt-4"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WasteRequestConfirmation;
