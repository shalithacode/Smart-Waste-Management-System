// src/components/PlaceList.js
import React, { useEffect, useState } from 'react';
import cleanWasteAPI from '../../api/cleanWasteAPI';  // Import the axios instance
import DriverNavbar from '../../components/DriverNavbar';  // Import Navbar
import Footer from '../../components/Footer';  // Import Footer

const PlaceList = () => {
  const [places, setPlaces] = useState([]);

  // Fetch places from the backend
  const fetchPlaces = async () => {
    try {
      const response = await cleanWasteAPI.get('/places');
      setPlaces(response.data);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  // Mark a place as collected
  const handleCollect = async (placeId) => {
    try {
      await cleanWasteAPI.post(`/collect/${placeId}`);
      fetchPlaces(); // Refresh the list after marking as collected
    } catch (error) {
      console.error('Error marking place as collected:', error);
    }
  };

  // Report bin overflow
  const handleOverflow = async (placeId) => {
    try {
      await cleanWasteAPI.post(`/overflow/${placeId}`);
      fetchPlaces(); // Refresh the list after reporting overflow
    } catch (error) {
      console.error('Error reporting overflow:', error);
    }
  };

  // Use useEffect to fetch places on component mount
  useEffect(() => {
    fetchPlaces();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <DriverNavbar /> {/* Navbar at the top */}

      <main className="flex-grow bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-[#175E5E] mb-8">
            List of Waste Collection Places
          </h1>

          <ul className="space-y-6">
            {places.map((place) => (
              <li key={place._id} className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md border-l-4 border-[#175E5E]">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {place.streetName}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Bin Count: {place.binCount}
                  </p>
                  <p className={`text-sm ${place.isCollected ? 'text-green-500' : 'text-red-500'}`}>
                    Collected: {place.isCollected ? 'Yes' : 'No'}
                  </p>
                  <p className={`text-sm ${place.overflowReported ? 'text-orange-500' : 'text-gray-500'}`}>
                    Overflow Reported: {place.overflowReported ? 'Yes' : 'No'}
                  </p>
                </div>

                <div className="mt-4 sm:mt-0 sm:ml-6 flex space-x-4">
                  <button
                    onClick={() => handleCollect(place._id)}
                    className={`px-4 py-2 text-white font-semibold rounded-lg shadow-lg ${place.isCollected ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 transition duration-300'}`}
                    disabled={place.isCollected}
                  >
                    Mark as Collected
                  </button>

                  <button
                    onClick={() => handleOverflow(place._id)}
                    className={`px-4 py-2 text-white font-semibold rounded-lg shadow-lg ${place.overflowReported ? 'bg-gray-300 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600 transition duration-300'}`}
                    disabled={place.overflowReported}
                  >
                    Report Overflow
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {places.length === 0 && (
            <p className="text-center text-lg text-gray-700 mt-8">
              No places found. Please add new places for collection.
            </p>
          )}
        </div>
      </main>

      <Footer /> {/* Footer at the bottom */}
    </div>
  );
};

export default PlaceList;
