import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../app.js";
import request from "supertest";
import { expect } from "chai";

dotenv.config();

before(async () => {
  try {
    const uri = process.env.MONGO_URI_TEST || process.env.MONGO_URI;
    if (!uri) throw new Error("❌ No Mongo URI found in .env");
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB for testing");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
});

after(async () => {
  try {
    await mongoose.connection.close();
    console.log("🧹 MongoDB connection closed after tests");
  } catch (err) {
    console.error("Error closing MongoDB:", err.message);
  }
});
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

export const api = request(app);
export const expectResponse = expect;
