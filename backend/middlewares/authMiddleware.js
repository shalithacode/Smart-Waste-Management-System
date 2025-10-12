import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/db.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "No token provided." });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to authenticate token." });
    }

    req.user = decoded;
    next();
  });
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required." });
  }
  next();
};

export const isDriver = (req, res, next) => {
  if (req.user.role !== "driver") {
    return res.status(403).json({ message: "Driver access required." });
  }
  next();
};
