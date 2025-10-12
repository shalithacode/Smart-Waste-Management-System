import React from 'react';

const CreateEvent = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="w-full bg-green-600 p-4 text-white text-center shadow-md">
        <h1 className="text-2xl font-bold">Create Event</h1>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-4">
        <section className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Host a New Event</h2>
          <form className="flex flex-col">
            <label className="mb-2 text-gray-700" htmlFor="eventName">
              Event Name:
            </label>
            <input
              type="text"
              id="eventName"
              className="mb-4 p-2 border border-gray-300 rounded"
              placeholder="Enter event name"
            />

            <label className="mb-2 text-gray-700" htmlFor="eventDate">
              Event Date:
            </label>
            <input
              type="date"
              id="eventDate"
              className="mb-4 p-2 border border-gray-300 rounded"
            />

            <label className="mb-2 text-gray-700" htmlFor="eventLocation">
              Event Location:
            </label>
            <input
              type="text"
              id="eventLocation"
              className="mb-4 p-2 border border-gray-300 rounded"
              placeholder="Enter location"
            />

            <label className="mb-2 text-gray-700" htmlFor="eventDescription">
              Description:
            </label>
            <textarea
              id="eventDescription"
              className="mb-4 p-2 border border-gray-300 rounded"
              placeholder="Event details"
            />

            <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
              Create Event
            </button>
          </form>
        </section>
      </main>

      <footer className="w-full bg-gray-800 text-white text-center p-4">
        <p>© 2024 Event Manager. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CreateEvent;
