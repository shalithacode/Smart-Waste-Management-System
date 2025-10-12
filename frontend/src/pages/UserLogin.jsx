import React, { useState } from "react";
import cleanWasteAPI from "../api/cleanWasteAPI";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputField from "../components/InputField";
import Button from "../components/Button";

const UserLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();  // Context to store the user and token
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please fill out both email and password.");
      return;
    }

    try {
      // Make API call to login
      const response = await cleanWasteAPI.post("/users/login", formData);

      // Log response data to ensure it contains user and token
      console.log("Login Response:", response.data);

      if (response.data.user && response.data.token) {
        const { user, token } = response.data;

        // Store user and token in context (or localStorage as fallback)
        login(user, token);
        localStorage.setItem("role", user.role); // Store user role in localStorage
        localStorage.setItem("token", token);

        // Navigate based on user role
        if (user.role === "admin") {
          navigate("/AdminHomePage");  // Navigate to admin dashboard
        } else if (user.role === "driver") {
          navigate("/driverHomePage");  // Navigate to driver dashboard
        } else {
          navigate("/");  // Navigate to home page for regular users
        }
      } else {
        alert("Invalid login response. Please try again.");
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid email or password. Please try again.");
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Function to auto-fill login details for a specific user
  const autoFillCredentials = (email, password) => {
    setFormData({ email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#175E5E]">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mx-4">
        <h1 className="text-3xl font-bold text-center text-[#175E5E] mb-6">
          Clean Waste Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            name="email"
            className="w-full border border-gray-300 p-2 rounded-md"
          />
          <div className="relative">
            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              name="password"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-10 text-gray-500"
              data-testid="toggle-password"

            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Buttons to auto-fill user credentials with unique colors */}
          <div className="flex flex-col space-y-2">
            <Button
              text="Login as User"
              type="button"
              onClick={() => autoFillCredentials("nawa@gmail.com", "nawa")}
              className="bg-blue-200 text-blue-800 w-full py-2 rounded-md font-semibold hover:bg-blue-300 transition duration-200"
            />
            <Button
              text="Login as Admin"
              type="button"
              onClick={() => autoFillCredentials("admin@gmail.com", "admin")}
              className="bg-green-200 text-green-800 w-full py-2 rounded-md font-semibold hover:bg-green-300 transition duration-200"
            />
            <Button
              text="Login as Driver"
              type="button"
              onClick={() => autoFillCredentials("udara@gmail.com", "udara")}
              className="bg-purple-200 text-purple-800 w-full py-2 rounded-md font-semibold hover:bg-purple-300 transition duration-200"
            />
          </div>

          <Button
            text="Login"
            type="submit"
            className="bg-[#175E5E] text-white w-full py-2 rounded-md font-semibold hover:bg-[#134c4c] transition duration-200"
          />
        </form>
        <div className="text-center mt-4 text-gray-500">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-[#175E5E] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;