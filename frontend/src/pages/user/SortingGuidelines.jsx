import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserNav from "../../components/UserNav";
import Footer from "../../components/Footer";
import Button from "../../components/Button";

const guidelinesData = {
  "Organic Waste": [
    "Separate organic waste from recyclables.",
    "Do not mix with hazardous or electronic waste.",
    "Compost organic waste if possible.",
  ],
  "Paper Waste": [
    "Make sure the paper is clean and dry.",
    "Remove any non-paper materials like plastic or staples.",
    "Recyclable paper includes newspapers, magazines, and office paper.",
  ],
  "E-Waste": [
    "Dispose of e-waste at designated recycling centers.",
    "Do not throw electronic devices into regular bins.",
    "Ensure data is wiped from devices before disposal.",
  ],
  "Hazardous Waste": [
    "Handle hazardous waste with care and use protective gear.",
    "Dispose of hazardous waste at specialized centers.",
    "Do not mix hazardous waste with regular waste.",
  ],
  "Plastic Waste": [
    "Separate plastics by type (e.g., PET, HDPE).",
    "Remove any labels or caps from bottles.",
    "Rinse plastics before recycling.",
  ],
  "Recycle Waste": [
    "Separate materials based on their recyclability.",
    "Clean all materials before placing them in the bin.",
    "Do not include contaminated or non-recyclable items.",
  ],
};

const SortingGuidelines = () => {
  const location = useLocation();
  const { wasteQuantity } = location.state;
  const [currentWasteIndex, setCurrentWasteIndex] = useState(0);
  const navigate = useNavigate();

  const currentWasteType = wasteQuantity[currentWasteIndex].type;
  const sortingGuidelines = guidelinesData[currentWasteType] || [];

  // Handle "Next" button
  const handleNext = () => {
    if (currentWasteIndex < wasteQuantity.length - 1) {
      setCurrentWasteIndex(currentWasteIndex + 1);
    } else {
      // Navigate to CreateWasteRequest and pass selectedWasteTypes
      navigate("/create-waste-request", { state: location.state });
    }
  };

  // Handle "Back" button
  const handleBack = () => {
    if (currentWasteIndex > 0) {
      setCurrentWasteIndex(currentWasteIndex - 1);
    }
  };

  // Inline style for even lighter grey grid background
  const gridBackgroundStyle = {
    backgroundImage: `
      linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
      linear-gradient(180deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
    `,
    backgroundSize: "10px 10px", // Smaller grid size
    width: "100%",
    height: "100vh", // Full-screen grid background
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 transition-colors duration-300" style={gridBackgroundStyle}>
      <UserNav />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-6 sm:py-12 sm:ml-64  md:ml-64">
        {/* Step Indicator */}
        <div className="w-full max-w-lg sm:max-w-xl mb-6">
          <div className="relative w-full h-2 bg-gray-300 rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-[#175E5E]"
              style={{ width: `${((currentWasteIndex + 1) / wasteQuantity.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-[#175E5E] text-center mt-2">Step 2 of 2: Sorting Guidelines</p>
        </div>

        <h1 className="text-4xl font-extrabold text-[#175E5E] mb-6 text-center leading-snug">
          Sorting Guidelines for {currentWasteType}
        </h1>

        {/* Display Sorting Guidelines */}
        <div className="mt-8 bg-gray-200 p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <ul className="list-disc pl-5 text-gray-700 space-y-3 text-lg">
            {sortingGuidelines.map((guideline, index) => (
              <li key={index}>{guideline}</li>
            ))}
          </ul>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex space-x-4">
          <Button
            text="Back"
            onClick={handleBack}
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
