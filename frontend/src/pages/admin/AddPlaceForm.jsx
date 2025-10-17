import React, { useState } from "react";
import wasteAPI from "../../api/wiseWasteAPI";
import AdminNav from "../../components/AdminNav"; // Import the Navbar
import Footer from "../../components/Footer"; // Import the Footer
import { gridBackgroundStyle } from "../../util/customStyles";

const AddPlaceForm = () => {
  const [streetName, setStreetName] = useState("");
  const [binCount, setBinCount] = useState(1);
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  const streetNames = ["Vihara Road", "Waliwita Road", "E.A. Jayasinghe Road", "Gamunu Pura", "Samanala Pedesa"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPlace = { streetName, binCount };

    try {
      await wasteAPI.post("/addPlace", newPlace);
      setStreetName(""); // Reset the form after adding
      setBinCount(1); // Reset the form after adding
      setSuccessMessage("Place added successfully!"); // Show success message
    } catch (error) {
      console.error("Error adding place:", error);
      setSuccessMessage("Error adding place. Please try again."); // Show error message
    }

    // Clear the success message after 3 seconds
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen" style={gridBackgroundStyle}>
      <AdminNav /> {/* Navbar included here */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 md:ml-64">
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 max-w-lg w-full">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#175E5E] mb-6">Add New Place</h1>

          {/* Success message */}
          {successMessage && <div className="text-center text-green-600 mb-4">{successMessage}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Street Name Dropdown */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="street">
                Street Name:
              </label>
              <select
                id="street"
                value={streetName}
                onChange={(e) => setStreetName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#175E5E] focus:border-[#175E5E]"
                required
              >
                <option value="">Select Street</option>
                {streetNames.map((street) => (
                  <option key={street} value={street}>
                    {street}
                  </option>
                ))}
              </select>
            </div>

            {/* Bin Count Input */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="binCount">
                Bin Count:
              </label>
              <input
                id="binCount"
                type="number"
                value={binCount}
                onChange={(e) => setBinCount(e.target.value)}
                min="1"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-[#175E5E] focus:border-[#175E5E]"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#175E5E] text-white font-semibold rounded-lg shadow-md hover:bg-[#134c4c] transition duration-300"
            >
              Add Place
            </button>
          </form>
        </div>
      </main>
      <Footer /> {/* Footer included here */}
    </div>
  );
};

export default AddPlaceForm;
