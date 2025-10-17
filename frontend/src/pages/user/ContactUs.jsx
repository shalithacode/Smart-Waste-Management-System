import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { initalContact } from "../../constants/strings";
import { gridBackgroundStyle } from "../../util/customStyles";

const ContactUs = () => {
  const [formData, setFormData] = useState(initalContact);

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Replace with actual API call to send contact message
    console.log("Contact form submitted:", formData);
    setSuccess(true);

    // Clear form after submission
    setFormData({ name: "", email: "", subject: "", message: "" });

    // Hide success after 3 seconds
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-gray-100" style={gridBackgroundStyle}>
      <div className="flex-1  flex flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-teal-800 mb-6 text-center">Contact Us</h1>
          <p className="text-gray-600 mb-8 text-center max-w-2xl">
            Have questions or feedback? Fill out the form below and we’ll get back to you as soon as possible.
          </p>

          <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 border border-gray-300">
            {success && (
              <div className="mb-4 p-3 text-green-700 bg-green-100 rounded">
                Your message has been sent successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="subject">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
                  placeholder="Message subject"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none"
                  placeholder="Write your message here..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-teal-700 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </main>

        <Footer isHome={true} />
      </div>
    </div>
  );
};

export default ContactUs;
