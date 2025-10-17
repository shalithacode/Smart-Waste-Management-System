import User from "../models/User.js";
import bcrypt from "bcrypt";

// Create a driver account with hashed password
export const registerDriver = async (driverData) => {
  const hashedPassword = await bcrypt.hash(driverData.password, 10);
  const driver = new User({
    name: driverData.name,
    email: driverData.email,
    password: hashedPassword,
    role: "driver",
    address: driverData.address,
  });
  await driver.save();
  return driver;
};
