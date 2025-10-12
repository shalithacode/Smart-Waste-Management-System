import User from "../models/User.js";

export const registerUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const findUserById = async (userId) => {
  return await User.findById(userId).populate("wasteRequests");
};

export const findUsersByRole = async (role) => {
  return await User.find({ role });
};
export const getUsersCountByRole = async (role) => {
  return await User.countDocuments({ role });
};
export const findUsersByStreet = async (street) => {
  return await User.find({ "address.street": street });
};
