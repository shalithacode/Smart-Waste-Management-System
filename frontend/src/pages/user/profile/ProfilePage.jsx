import React, { useEffect, useState } from "react";
import UserNav from "../../../components/UserNav"; // Adjust the path as needed
import Footer from "../../../components/Footer"; // Adjust the path as needed
import { getStatusColor } from "../../../util/customStyles";
import cleanWasteAPI from "../../../api/wiseWasteAPI"; // Import your Axios instance
import { useAuth } from "../../../context/AuthContext"; // Import auth context to get the logged-in user
import { getLocationName } from "../../../util/location";
import { gridBackgroundStyle } from "../../../util/customStyles";

const ProfilePage = () => {
  const [wasteRequests, setWasteRequests] = useState([]);
  const [locationNames, setLocationNames] = useState({});
  const { auth } = useAuth(); // Get authenticated user info from the context

  useEffect(() => {
    const fetchWasteRequests = async () => {
      try {
        // Using the user ID from the auth context to fetch waste requests for that user
        const response = await cleanWasteAPI.get(`/waste-requests/user/${auth.user._id}`);

        setWasteRequests(response.data); // Save the waste requests to state
      } catch (error) {
        console.error("Error fetching waste request history:", error);
      }
    };

    // Fetch waste requests when the component mounts
    if (auth?.user?._id) {
      fetchWasteRequests();
    }
  }, [auth]);
  useEffect(() => {
    const fetchLocationNames = async () => {
      const names = {};
      for (const request of wasteRequests) {
        const name = await getLocationName(request.location.latitude, request.location.longitude);
        names[request._id] = name || `${request.location.latitude}, ${request.location.longitude}`;
      }
      setLocationNames(names);
    };

    if (wasteRequests.length > 0) {
      fetchLocationNames();
    }
  }, [wasteRequests]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100" style={gridBackgroundStyle}>
      {/* UserNav remains on top */}
      <UserNav />

      <div className="flex flex-1 flex-col lg:flex-row ">
        {/* Main content */}
        <main className="flex-1 p-4 lg:ml-64 md:ml-64">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-4">
            Waste Collection Request History
          </h1>
          <p className="text-gray-600 text-center mb-6">Here is the list of your waste requests.</p>

          {/* Waste Request History Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-teal-700 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Waste Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Location</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Created At</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {wasteRequests.length > 0 ? (
                  wasteRequests.map((request) => (
                    <tr key={request._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {request.wasteItems.map((item) => item.type).join(", ")}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {locationNames[request._id] || `${request.location.latitude}, ${request.location.longitude}`}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {request.pickupDate ? new Date(request.pickupDate).toLocaleDateString() : "-"}
                      </td>

                      <td className={`px-6 py-4 text-sm font-bold text-${getStatusColor(request.status)}-500 `}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                      No waste requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default ProfilePage;
