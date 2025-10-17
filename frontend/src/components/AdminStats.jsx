import React, { useState, useEffect } from "react";
import { FaUsers, FaTruck, FaRecycle, FaClock, FaCheckCircle, FaTrashAlt } from "react-icons/fa";
import wasteAPI from "../api/wiseWasteAPI";

function AdminStats({ driversCount, wasteRequestsCount, pedningCount, pickedUpCount, rejectCount }) {
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    const fetchUsersCount = async () => {
      try {
        const response = await wasteAPI.get("/users/count");
        setUsersCount(response.data.count);
      } catch (error) {
        console.error("Error fetching users count:", error);
      }
    };

    fetchUsersCount();
  }, []);

  return (
    <div className="flex flex-wrap justify-between gap-4 mb-10">
      {/* Total Users */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#175E5E] to-[#1e7a7a] text-white shadow-lg rounded-xl p-3 flex-1 min-w-[150px] transform hover:scale-105 transition-transform duration-300">
        <div className="bg-white bg-opacity-20 p-4 rounded-full mb-3">
          <FaUsers className="text-3xl" />
        </div>
        <h2 className="text-lg font-semibold">Total Users</h2>
        <p className="text-3xl font-bold mt-1">{usersCount}</p>
      </div>

      {/* Total Drivers */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg rounded-xl p-3 flex-1 min-w-[150px] transform hover:scale-105 transition-transform duration-300">
        <div className="bg-white bg-opacity-20 p-4 rounded-full mb-3">
          <FaTruck className="text-3xl" />
        </div>
        <h2 className="text-lg font-semibold">Total Drivers</h2>
        <p className="text-3xl font-bold mt-1">{driversCount}</p>
      </div>

      {/* Total Waste Requests */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg rounded-xl p-3 flex-1 min-w-[150px] transform hover:scale-105 transition-transform duration-300">
        <div className="bg-white bg-opacity-20 p-4 rounded-full mb-3">
          <FaRecycle className="text-3xl" />
        </div>
        <h2 className="text-lg font-semibold">Total Requests</h2>
        <p className="text-3xl font-bold mt-1">{wasteRequestsCount}</p>
      </div>

      {/* Pending Requests */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-lg rounded-xl p-3 flex-1 min-w-[150px] transform hover:scale-105 transition-transform duration-300">
        <div className="bg-white bg-opacity-20 p-4 rounded-full mb-3">
          <FaClock className="text-3xl" />
        </div>
        <h2 className="text-lg font-semibold">Pending</h2>
        <p className="text-3xl font-bold mt-1">{pedningCount}</p>
      </div>

      {/* Picked-up Requests */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg rounded-xl p-3 flex-1 min-w-[150px] transform hover:scale-105 transition-transform duration-300">
        <div className="bg-white bg-opacity-20 p-4 rounded-full mb-3">
          <FaCheckCircle className="text-3xl" />
        </div>
        <h2 className="text-lg font-semibold">Picked-up</h2>
        <p className="text-3xl font-bold mt-1">{pickedUpCount}</p>
      </div>

      {/* Rejected Requests */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-red-500 to-red-700 text-white shadow-lg rounded-xl p-3 flex-1 min-w-[150px] transform hover:scale-105 transition-transform duration-300">
        <div className="bg-white bg-opacity-20 p-4 rounded-full mb-3">
          <FaTrashAlt className="text-3xl" />
        </div>
        <h2 className="text-lg font-semibold">Rejected</h2>
        <p className="text-3xl font-bold mt-1">{rejectCount}</p>
      </div>
    </div>
  );
}

export default AdminStats;
