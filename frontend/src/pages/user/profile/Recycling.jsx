import React, { useEffect, useState } from "react";
import UserNav from "../../../components/UserNav"; // Adjust the path as needed
import Footer from "../../../components/Footer"; // Adjust the path as needed
import { gridBackgroundStyle } from "../../../util/customStyles";
import { Pie } from "react-chartjs-2"; // Import Pie chart from react-chartjs-2
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Import necessary elements from Chart.js

// Register the elements needed for Pie Chart
ChartJS.register(ArcElement, Tooltip, Legend);

const Recycling = () => {
  // Hardcoded data for waste and recycling statistics
  const wastePercentage = 60; // Percentage of waste
  const recyclingPercentage = 40; // Percentage of recycled waste
  const finalRevenue = 12654; // Example final revenue from recycling (in Rs.)

  // State to animate revenue count
  const [revenue, setRevenue] = useState(0);

  // Data for the Pie Chart
  const chartData = {
    labels: ["Waste", "Recycled"],
    datasets: [
      {
        data: [wastePercentage, recyclingPercentage],
        backgroundColor: ["#FF6384", "#36A2EB"], // Red for waste, Blue for recycling
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  // Options for Pie Chart (limit size)
  const chartOptions = {
    maintainAspectRatio: false, // Allows us to set a custom height
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom", // Adjusts legend to the bottom
      },
    },
  };

  // Effect to animate the revenue count
  useEffect(() => {
    let start = 0;
    const duration = 2000; // Total time for the animation (2 seconds)
    const stepTime = Math.abs(Math.floor(duration / finalRevenue)); // Calculate the time per increment

    const interval = setInterval(() => {
      start += 100; // Increment revenue in steps of 100 (can be adjusted)
      setRevenue(start);
      if (start >= finalRevenue) {
        clearInterval(interval);
      }
    }, stepTime);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [finalRevenue]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100" style={gridBackgroundStyle}>
      {/* Navbar remains on top */}
      <UserNav />

      <div className="flex flex-1 flex-col lg:flex-row ">
        {/* Main content */}
        <main className="flex-1 p-4 lg:ml-56 sm:py-12 md:ml-64">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-4">Recycling Overview</h1>
          <p className="text-gray-600 text-center mb-6">
            Here is your waste and recycling data along with your revenue from recycling activities.
          </p>

          {/* Recycling and Waste Data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Waste Percentage */}
            <div className="bg-gray-100 shadow-md rounded-lg p-6 border border-gray-300">
              <h2 className="text-gray-600 text-sm font-bold uppercase mb-2">Waste Generated</h2>
              <p className="text-4xl font-extrabold text-red-600 mb-4">{wastePercentage}%</p>
              <p className="text-gray-700 mb-4">This represents the percentage of waste you generated.</p>
            </div>

            {/* Recycled Percentage */}
            <div className="bg-gray-100 shadow-md rounded-lg p-6 border border-gray-300">
              <h2 className="text-gray-600 text-sm font-bold uppercase mb-2">Waste Recycled</h2>
              <p className="text-4xl font-extrabold text-green-600 mb-4">{recyclingPercentage}%</p>
              <p className="text-gray-700 mb-4">
                This represents the percentage of waste you have successfully recycled.
              </p>
            </div>

            {/* Revenue from Recycling */}
            <div className="bg-yellow-100 shadow-md rounded-lg p-6 border border-yellow-400">
              <h2 className="text-yellow-700 text-sm font-bold uppercase mb-2">Revenue from Recycling</h2>
              <p className="text-4xl font-extrabold text-yellow-600 mb-4">Rs. {revenue}</p>{" "}
              {/* Animated Revenue Count */}
              <p className="text-gray-700 mb-4">This is the revenue you have generated through recycling activities.</p>
            </div>
          </div>

          {/* Waste and Recycling Chart */}
          <div className="max-w-4xl mx-auto mt-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Waste vs Recycling Breakdown</h2>
            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
              <div className="relative" style={{ height: "300px" }}>
                {" "}
                {/* Reduced height for mobile responsiveness */}
                <Pie data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Recycling;
