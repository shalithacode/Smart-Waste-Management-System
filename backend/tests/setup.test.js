/**
 * Global test setup for MongoDB and supertest
 * Connects to MongoDB before running tests and provides common utilities.
 */

import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../app.js";
import request from "supertest";
import { expect } from "chai";

dotenv.config();
// Connect to test database before running any test suite
before(async () => {
  try {
    const uri = process.env.MONGO_URI_TEST || process.env.MONGO_URI;
    if (!uri) throw new Error("No Mongo URI found in .env");
    await mongoose.connect(uri);
    console.log("Connected to MongoDB for testing");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
});

// Clean up database after each test suite
after(async () => {
  try {
    await mongoose.connection.close();
    console.log("🧹 MongoDB connection closed after tests");
  } catch (err) {
    console.error("Error closing MongoDB:", err.message);
  }
});

// Close DB connection after all test suites
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});
// Export common test utilities
export const api = request(app);
export const expectResponse = expect;
