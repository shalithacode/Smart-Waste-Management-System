import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import backgroundImage from "../../assets/images/background.jpg";

const HomePage = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Function to handle navigation when 'Get Started' is clicked
  const handleGetStartedClick = () => {
    navigate("/register"); // Navigate to '/selection' when clicked
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main
        className="relative flex flex-col items-center justify-center flex-grow text-white px-4 py-8 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(hsla(0, 0.00%, 0.00%, 0.50), rgba(0,0,0,0.5)), url(${backgroundImage})`,
        }}
      >
        <div className="text-center p-6 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Welcome to{" "}
            <span className="text-yellow-400">
              {" "}
              <span className="text-yellow-400 font-serif">W</span>ise
              <span className="text-yellow-400 font-serif">W</span>aste
            </span>
          </h1>
          <p className="text-md sm:text-lg lg:text-2xl mt-4 leading-relaxed">
            The future of smart waste management, designed to make your life easier and the environment cleaner.
          </p>

          {/* Call to Action Buttons */}
          <div className="mt-8 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-6 justify-center">
            <button
              className="px-6 py-3 sm:px-8 sm:py-4 bg-yellow-400 text-[#175E5E] font-semibold rounded-lg shadow-lg hover:bg-yellow-300 hover:shadow-xl transition-all duration-300"
              onClick={handleGetStartedClick} // Navigate to '/selection' when clicked
            >
              Get Started
            </button>
            <button className="px-6 py-3 sm:px-8 sm:py-4 bg-transparent text-white border border-white font-semibold rounded-lg hover:bg-white hover:text-[#175E5E] transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Features Section */}
      </main>

      {/* Banner Section with Updated Content */}
      <section className="bg-[#175E5E] py-6 px-4 text-center">
        <p className="text-md sm:text-lg font-semibold text-white">
          Join us today in making the world cleaner. Take action now by recycling your waste!
        </p>
      </section>

      {/* Footer */}
      <Footer isHome={true} />
    </div>
  );
};

export default HomePage;
