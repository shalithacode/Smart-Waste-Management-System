import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const registerDriver = async (driverData) => {
  const hashedPassword = await bcrypt.hash(driverData.password, 10);
  const driver = new User({
    name: driverData.name,
    email: driverData.email,
    password: hashedPassword,
    role: 'driver', // Automatically set the role to "driver"
    address: driverData.address
  });
  await driver.save();
  return driver;
};
