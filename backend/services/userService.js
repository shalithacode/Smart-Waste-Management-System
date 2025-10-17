import User from "../models/User.js";

// User registration
export const registerUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

// Find user by emai
export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

// Find user by ID and populate their waste requests
export const findUserById = async (userId) => {
  return await User.findById(userId).populate("wasteRequests");
};

// Get users by role (e.g., driver, admin, user)
export const findUsersByRole = async (role) => {
  return await User.find({ role });
};

// Count total users by role
export const getUsersCountByRole = async (role) => {
  return await User.countDocuments({ role });
};

// Find users by street address
export const findUsersByStreet = async (street) => {
  return await User.find({ "address.street": street });
};
