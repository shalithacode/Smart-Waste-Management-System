import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/DriverNavbar";
import Footer from "../../components/Footer";
import { gridBackgroundStyle } from "../../util/customStyles";
const DriverHomePage = () => {
  const navigate = useNavigate();

  // Function to handle navigation when 'View Tasks' is clicked
  const handleViewTasksClick = () => {
    navigate("/driverNotifications"); // Navigate to the driver tasks page
  };

  return (
    <div className="flex flex-col min-h-screen" style={gridBackgroundStyle}>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-grow bg-gradient-to-b from-[#175E5E] to-[#134c4c] text-white px-4 py-8">
        <div className="text-center p-6 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Welcome, <span className="text-yellow-400">Driver</span>
          </h1>
          <p className="text-md sm:text-lg lg:text-2xl mt-4 leading-relaxed">
            Your tasks, schedules, and waste pickups made easy. Let's keep the environment clean!
          </p>

          {/* Call to Action Buttons */}
          <div className="mt-8 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-6 justify-center">
            <button
              className="px-6 py-3 sm:px-8 sm:py-4 bg-yellow-400 text-[#175E5E] font-semibold rounded-lg shadow-lg hover:bg-yellow-300 hover:shadow-xl transition-all duration-300"
              onClick={handleViewTasksClick} // Navigate to '/driver-tasks' when clicked
            >
              View Tasks
            </button>
            <button className="px-6 py-3 sm:px-8 sm:py-4 bg-transparent text-white border border-white font-semibold rounded-lg hover:bg-white hover:text-[#175E5E] transition-all duration-300">
              Report an Issue
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-8 sm:py-12 px-6 w-full sm:w-3/4 lg:w-1/2 shadow-xl rounded-lg mt-12 sm:mt-16 text-gray-800">
          <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-center text-[#175E5E] mb-6 sm:mb-8">
            Why Be a ClearWaste Driver?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            <div className="flex items-start">
              <span className="mr-3 text-[#175E5E]">✔</span>
              Optimize your routes for efficient waste collection.
            </div>
            <div className="flex items-start">
              <span className="mr-3 text-[#175E5E]">✔</span>
              Real-time task updates and navigation assistance.
            </div>
            <div className="flex items-start">
              <span className="mr-3 text-[#175E5E]">✔</span>
              Earn rewards for completed pickups and clean records.
            </div>
            <div className="flex items-start">
              <span className="mr-3 text-[#175E5E]">✔</span>
              Make a difference in keeping the city clean and green.
            </div>
          </div>
        </div>
      </main>

      {/* Banner Section with Updated Content */}
      <section className="bg-[#175E5E] py-6 px-4 text-center">
        <p className="text-md sm:text-lg font-semibold text-white">
          Join the ClearWaste team and contribute to a cleaner world. Take pride in your role as a driver!
        </p>
        <button className="mt-3 px-6 py-2 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#175E5E] transition-all duration-300">
          Join Now
        </button>
      </section>

      {/* Process Section - Improved "How It Works" Design */}
      <section className="py-10 sm:py-16 px-6 sm:px-8 bg-gray-50">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-[#175E5E] mb-10 sm:mb-16">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-center">
          <div className="space-y-4">
            <h3 className="text-3xl sm:text-4xl font-bold text-green-500">01.</h3>
            <h4 className="text-xl sm:text-2xl font-semibold">View Your Tasks</h4>
            <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
              Access your assigned tasks and pickup requests from your dashboard.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl sm:text-4xl font-bold text-green-500">02.</h3>
            <h4 className="text-xl sm:text-2xl font-semibold">Plan Efficient Routes</h4>
            <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
              Get optimized routes to minimize fuel usage and maximize pickups.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl sm:text-4xl font-bold text-green-500">03.</h3>
            <h4 className="text-xl sm:text-2xl font-semibold">Track Your Progress</h4>
            <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
              Stay updated with real-time tracking as you complete each task.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl sm:text-4xl font-bold text-green-500">04.</h3>
            <h4 className="text-xl sm:text-2xl font-semibold">Complete Pickups</h4>
            <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
              Mark your pickups as completed and earn rewards for efficiency.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl sm:text-4xl font-bold text-green-500">05.</h3>
            <h4 className="text-xl sm:text-2xl font-semibold">Get Recognized</h4>
            <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
              Gain recognition for your contribution to a cleaner city.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DriverHomePage;
