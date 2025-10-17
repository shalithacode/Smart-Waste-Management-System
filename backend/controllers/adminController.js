import { registerDriver as registerDriverService } from "../services/adminService.js";

// Register a new driver (admin action)
export const registerDriver = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    const driver = await registerDriverService({ name, email, password, address });
    res.status(201).json({ message: "Driver registered successfully", driver });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
