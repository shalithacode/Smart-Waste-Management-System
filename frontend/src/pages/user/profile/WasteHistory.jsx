import React, { useEffect, useState } from "react";
import cleanWasteAPI from "../../../api/cleanWasteAPI"; // Import your Axios instance
import { useAuth } from "../../../context/AuthContext"; // Import auth context to get the logged-in user

const WasteHistory = () => {
  const [wasteRequests, setWasteRequests] = useState([]);
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

  return (
    <div className="w-full overflow-x-auto px-4 sm:px-6 py-4">
      <h2 className="text-xl font-semibold text-[#175E5E] mb-6">Your Waste Collection Request History</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg w-full">
        <thead>
          <tr className="bg-[#175E5E] text-white text-left text-xs sm:text-sm md:text-base">
            <th className="py-3 px-2 sm:px-4">Waste Type</th>
            <th className="py-3 px-2 sm:px-4">Location</th>
            <th className="py-3 px-2 sm:px-4">Status</th>
            <th className="py-3 px-2 sm:px-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {wasteRequests.length > 0 ? (
            wasteRequests.map((request) => (
              <tr key={request._id} className="border-t border-gray-200">
                <td className="py-2 px-2 sm:px-4 text-sm">{request.wasteType}</td>
                <td className="py-2 px-2 sm:px-4 text-sm">
                  {request.location.latitude}, {request.location.longitude}
                </td>
                <td
                  className={`py-2 px-2 sm:px-4 text-sm ${
                    request.status === "pending" ? "text-yellow-500" : "text-green-500"
                  }`}
                >
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </td>
                <td className="py-2 px-2 sm:px-4 text-sm">{new Date(request.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-600">
                No waste requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WasteHistory;
