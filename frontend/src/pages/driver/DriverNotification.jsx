import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cleanWasteAPI from "../../api/cleanWasteAPI";
import DriverNavbar from "../../components/DriverNavbar";
import Footer from "../../components/Footer";

const DriverDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await cleanWasteAPI.get("/drivers/assigned-pickups");
        setTasks(response.data || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskClick = (assignedStreet) => {
    // Navigate to the PickupRequest page with the assignedStreet as a query parameter
    navigate(`/pickup-requests?street=${encodeURIComponent(assignedStreet)}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DriverNavbar />
      <main className="flex-grow flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-center text-[#175E5E] mb-8">
          Driver Dashboard
        </h1>
        <div className="w-full max-w-4xl">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-[#175E5E] mb-4">
              Assigned Tasks
            </h2>
            {tasks.length > 0 ? (
              <ul className="space-y-4">
                {tasks.map((task, index) => (
                  <li
                    key={index}
                    className="bg-white shadow-md rounded-lg p-6 border-l-4 border-green-400 cursor-pointer"
                    onClick={() => handleTaskClick(task.assignedStreet)}
                  >
                    <p className="text-lg font-semibold text-gray-700">
                      Street: {task.assignedStreet}, Pickup Date:{" "}
                      {new Date(task.assignmentDate).toLocaleDateString()}
                    </p>
                    <span
                      className={`text-sm ${
                        task.completed ? "text-green-500" : "text-yellow-500"
                      }`}
                    >
                      Status: {task.completed ? "Completed" : "Pending"}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="bg-white shadow-md rounded-lg p-6 text-center">
                <p className="text-lg font-semibold text-gray-700">
                  No tasks assigned.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DriverDashboard;
