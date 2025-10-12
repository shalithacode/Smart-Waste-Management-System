import React from 'react';

const CommunityPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="w-full bg-blue-600 p-4 text-white text-center shadow-md">
        <h1 className="text-2xl font-bold">Community Page</h1>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-4">
        <section className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Welcome to the Community!</h2>
          <p className="text-gray-600 mb-4">
            Connect with others, share ideas, and grow together.
          </p>
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Join the Discussion
          </button>
        </section>
      </main>

      <footer className="w-full bg-gray-800 text-white text-center p-4">
        <p>© 2024 Community Page. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CommunityPage;
