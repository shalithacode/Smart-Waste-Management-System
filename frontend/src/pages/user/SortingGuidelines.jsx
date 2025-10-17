import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserNav from "../../components/UserNav";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import { guidelinesData } from "../../constants/strings";
import { gridBackgroundStyle } from "../../util/customStyles";

const SortingGuidelines = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Safely extract state and provide fallback
  const { wasteQuantity = [] } = location.state || {};
  const [currentWasteIndex, setCurrentWasteIndex] = useState(0);

  // Redirect if accessed without data
  useEffect(() => {
    if (!wasteQuantity.length) {
      navigate("/select-waste", { replace: true });
    }
  }, [wasteQuantity, navigate]);

  if (!wasteQuantity.length) {
    return null; // Prevent render while redirecting
  }

  const currentWasteType = wasteQuantity[currentWasteIndex]?.type || "Unknown";
  const sortingGuidelines = guidelinesData[currentWasteType] || [];

  // Handle "Next" button
  const handleNext = () => {
    if (currentWasteIndex < wasteQuantity.length - 1) {
      setCurrentWasteIndex((prev) => prev + 1);
    } else {
      // Navigate to CreateWasteRequest and pass state
      navigate("/create-waste-request", { state: location.state });
    }
  };

  // Handle "Back" button
  const handleBack = () => {
    if (currentWasteIndex > 0) {
      setCurrentWasteIndex((prev) => prev - 1);
    }
  };

  const progress = wasteQuantity.length > 0 ? ((currentWasteIndex + 1) / wasteQuantity.length) * 100 : 0;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 transition-colors duration-300" style={gridBackgroundStyle}>
      <UserNav />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-6 sm:py-12 sm:ml-64 md:ml-64">
        {/* Step Indicator */}
        <div className="w-full max-w-lg sm:max-w-xl mb-6">
          <div className="relative w-full h-2 bg-gray-300 rounded-full">
            <div className="absolute top-0 left-0 h-full bg-[#175E5E]" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="text-sm text-[#175E5E] text-center mt-2">Step 2 of 2: Sorting Guidelines</p>
        </div>

        <h1 className="text-4xl font-extrabold text-[#175E5E] mb-6 text-center leading-snug">
          Sorting Guidelines for {currentWasteType}
        </h1>

        {/* Display Sorting Guidelines */}
        <div className="mt-8 bg-gray-200 p-6 rounded-lg shadow-lg w-full max-w-2xl">
          {sortingGuidelines.length > 0 ? (
            <ul className="list-disc pl-5 text-gray-700 space-y-3 text-lg">
              {sortingGuidelines.map((guideline, index) => (
                <li key={index}>{guideline}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 italic">No guidelines available for this waste type.</p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex space-x-4">
          <Button
            text="Back"
            onClick={handleBack}
            aria-disabled={currentWasteIndex === 0}
            className={`px-6 sm:px-8 py-3 sm:py-4 bg-gray-400 text-white font-semibold rounded-full shadow-lg hover:bg-gray-500 transition duration-300 ease-in-out ${
              currentWasteIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentWasteIndex === 0}
          />
          <Button
            text={currentWasteIndex < wasteQuantity.length - 1 ? "Next" : "Finish"}
            onClick={handleNext}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-[#175E5E] text-white font-semibold rounded-full shadow-lg hover:bg-[#134c4c] hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SortingGuidelines;
