import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const HomePage = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#175E5E] to-[#134c4c] text-white">
        <div className="text-center p-6 max-w-4xl">
          <h1 className="text-6xl font-extrabold tracking-tight">
            Welcome to <span className="text-yellow-400">ClearWaste</span>
          </h1>
          <p className="text-2xl mt-4 leading-relaxed">
            The future of smart waste management, designed to make your life easier and the environment cleaner.
          </p>
          
          {/* Call to Action Buttons */}
          <div className="mt-8 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-6 justify-center">
            <button className="px-8 py-4 bg-yellow-400 text-[#175E5E] font-semibold rounded-lg shadow-lg hover:bg-yellow-300 hover:shadow-xl transition-all duration-300">
              Get Started
            </button>
            <button className="px-8 py-4 bg-transparent text-white border border-white font-semibold rounded-lg hover:bg-white hover:text-[#175E5E] transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-12 px-8 w-full sm:w-3/4 lg:w-1/2 shadow-xl rounded-lg mt-16 text-gray-800">
          <h2 className="text-4xl font-bold text-center text-[#175E5E] mb-8">Why Choose ClearWaste?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
