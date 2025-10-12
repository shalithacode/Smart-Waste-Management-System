import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const connectDB = async () => {
  try {
    const dbUri =
      process.env.NODE_ENV === "test"
        ? process.env.MONGO_URI_TEST // Use test DB in test environment
        : process.env.MONGO_URI;

    const conn = await mongoose.connect(dbUri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export const jwtSecret = process.env.JWT_SECRET; // Export the JWT secret
