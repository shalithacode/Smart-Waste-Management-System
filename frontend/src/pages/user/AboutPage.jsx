import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const AboutPage = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Function to handle navigation when 'Get Started' is clicked
  const handleGetStartedClick = () => {
    navigate("/selection"); // Navigate to '/selection' when clicked
  };

  // Inline style for light white grid background
  const gridBackgroundStyle = {
    backgroundImage: `
      linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
      linear-gradient(180deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
    `,
    backgroundSize: "10px 10px", // Smaller grid size
    width: "100%",
    minHeight: "100vh", // Full-screen grid background
  };

  return (
    <div className="flex flex-col min-h-screen" style={gridBackgroundStyle}>
      {/* Hero Section */}
      <header className="h-screen bg-gradient-to-b from-[#175E5E] to-[#134c4c] flex flex-col justify-between">
        {/* Navbar */}
        <Navbar />
        <main className=" flex flex-col items-center justify-center flex-grow text-white px-4 py-8">
          {/* Features Section */}
          <div className="bg-white py-8 sm:py-12 px-6 w-full sm:w-3/4 lg:w-1/2 shadow-xl rounded-lg mt-12 sm:mt-16 text-gray-800">
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold text-center text-[#175E5E] mb-6 sm:mb-8">
              Why Choose WiseWaste?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
              <div className="flex items-start">
                <span className="mr-3 text-[#175E5E]">✔</span>
                AI-powered waste collection scheduling for ultimate convenience.
              </div>
              <div className="flex items-start">
                <span className="mr-3 text-[#175E5E]">✔</span>
                Real-time waste tracking with instant notifications.
              </div>
              <div className="flex items-start">
                <span className="mr-3 text-[#175E5E]">✔</span>
                Environmentally friendly, reducing your carbon footprint.
              </div>
              <div className="flex items-start">
                <span className="mr-3 text-[#175E5E]">✔</span>
                User-friendly platform accessible to everyone.
              </div>
            </div>
          </div>
        </main>

        {/* Banner Section with Updated Content */}
        <section className="bg-[#175E5E] py-6 px-4 text-center">
          <p className="text-md sm:text-lg font-semibold text-white">
            Join us today in making the world cleaner. Take action now by recycling your waste!
          </p>
          <button className="mt-3 px-6 py-2 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#175E5E] transition-all duration-300">
            Get Involved
          </button>
        </section>
      </header>
      {/* Process Section - Improved "How It Works" Design */}
      <section className="py-10 sm:py-16 px-6 sm:px-8 bg-gray-50">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-[#175E5E] mb-10 sm:mb-16">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-center">
          <div className="space-y-4">
            <h3 className="text-3xl sm:text-4xl font-bold text-green-500">01.</h3>
            <h4 className="text-xl sm:text-2xl font-semibold">Select Waste Type</h4>
            <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
              Choose the type of waste you are disposing of from our easy-to-use options.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl sm:text-4xl font-bold text-green-500">02.</h3>
            <h4 className="text-xl sm:text-2xl font-semibold">Schedule Pickup</h4>
            <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
              Schedule a pickup at your convenience with real-time tracking options available.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl sm:text-4xl font-bold text-green-500">03.</h3>
            <h4 className="text-xl sm:text-2xl font-semibold">Track Your Waste</h4>
            <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
              Get real-time updates as your waste is collected and processed for recycling.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl sm:text-4xl font-bold text-green-500">04.</h3>
            <h4 className="text-xl sm:text-2xl font-semibold">Earn Rewards</h4>
            <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
              Earn rewards for every pickup as part of our eco-friendly incentive program.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl sm:text-4xl font-bold text-green-500">05.</h3>
            <h4 className="text-xl sm:text-2xl font-semibold">Make a Difference</h4>
            <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
              Join the movement for a cleaner planet by participating in our smart waste management system.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer isHome={true} />
    </div>
  );
};

export default AboutPage;
