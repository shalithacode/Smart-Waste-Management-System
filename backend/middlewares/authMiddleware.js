import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/db.js";

// Verify JWT and attach decoded user info
export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "No token provided." });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized: Invalid token." });
    }
    req.user = decoded;
    next();
  });
};

// Restrict access to admin users
export const isAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized." });
  if (req.user.role !== "admin") return res.status(403).json({ message: "Admin access required." });
  next();
};

// Restrict access to drivers
export const isDriver = (req, res, next) => {
  if (req.user.role !== "driver") {
    return res.status(403).json({ message: "Driver access required." });
  }
  next();
};
