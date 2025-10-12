import React, { useState } from "react";
import UserNav from "../../../components/UserNav"; // Adjust the path as needed
import Footer from "../../../components/Footer"; // Adjust the path as needed
import Sidebar from "./Sidebar"; // Import Sidebar component

const Membership = () => {
  const [billingCycle, setBillingCycle] = useState("monthly"); // State to track billing cycle

  // Inline style for light grey grid background
  const gridBackgroundStyle = {
    backgroundImage: `
      linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
      linear-gradient(180deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
    `,
    backgroundSize: "10px 10px", // Smaller grid size
    width: "100%",
    minHeight: "100vh", // Full-screen grid background
  };

  return (
    <div className="min-h-screen flex flex-col" style={gridBackgroundStyle}>
      {/* UserNav remains on top */}
      <UserNav />

      <div className="flex flex-1">
        {/* Main content */}
        <main className="flex-1 p-4 sm:ml-64">
          {" "}
          {/* Margin adjusted to align with sidebar */}
          <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-4">Upgrade Your Subscription</h1>
          <p className="text-gray-600 text-center mb-6">
            Choose a subscription plan that suits your waste management needs and enjoy exclusive services.
          </p>
          {/* Billing Cycle Toggle */}
          <div className="flex justify-center mb-8">
            <button
              className={`px-6 py-2 border ${
                billingCycle === "monthly" ? "bg-green-600 text-white" : "text-gray-800"
              } rounded-l-lg`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 border ${
                billingCycle === "annually" ? "bg-green-600 text-white" : "text-gray-800"
              } rounded-r-lg`}
              onClick={() => setBillingCycle("annually")}
            >
              Annually
            </button>
          </div>
          {/* Membership Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
              <h2 className="text-gray-500 text-sm font-bold uppercase mb-2">Basic Plan</h2>
              <p className="text-4xl font-extrabold text-gray-900 mb-4">
                Rs. {billingCycle === "monthly" ? "490/mo" : "4,900/yr"}
              </p>
              <ul className="text-gray-700 space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="mr-2">✔</span> Bi-weekly waste collection
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✔</span> Free waste bags
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✔</span> Email and phone support
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✔</span> Recycling options
                </li>
              </ul>
              <button className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition">
                Subscribe to Basic
              </button>
              <p className="text-gray-500 text-sm mt-4 text-center">Upgrade to enjoy hassle-free waste management.</p>
            </div>

            {/* Premium Plan */}
            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 relative">
              <div className="absolute top-0 right-0 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                POPULAR
              </div>
              <h2 className="text-gray-500 text-sm font-bold uppercase mb-2">Premium Plan</h2>
              <p className="text-4xl font-extrabold text-gray-900 mb-4">
                Rs. {billingCycle === "monthly" ? "790/mo" : "7,900/yr"}
              </p>
              <ul className="text-gray-700 space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="mr-2">✔</span> Weekly waste collection
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✔</span> Free premium waste bags
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✔</span> Priority customer support
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✔</span> On-demand pickup scheduling
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✔</span> Enhanced recycling services
                </li>
              </ul>
              <button className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition">
                Subscribe to Premium
              </button>
              <p className="text-gray-500 text-sm mt-4 text-center">
                Get the most out of your waste management service.
              </p>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Membership;
