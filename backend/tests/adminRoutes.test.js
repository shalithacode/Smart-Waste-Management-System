import request from "supertest";
import mongoose from "mongoose";
import { expect } from "chai";
import app from "../app.js";
import User from "../models/User.js";
import WasteRequest from "../models/WasteRequest.js";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/db.js";

// Variables for holding tokens and IDs
let adminToken, userToken, driverToken;
let adminId, userId, driverId;

before(function (done) {
  this.timeout(10000); // Set timeout to 10 seconds
  // MongoDB connection and setup code
  // Ensure to call done() after the async operations are done
  done();
});

before(async () => {
  // Clear previous data
  await User.deleteMany({});
  await WasteRequest.deleteMany({});

  // Create an admin user, a regular user, and a driver
  const admin = await User.create({
    name: "Admin",
    email: "admin@example.com",
    password: "password123",
    role: "admin",
    address: { street: "Admin Street", city: "Colombo", postalCode: "00100" },
  });
  adminId = admin._id;

  const user = await User.create({
    name: "User",
    email: "user@example.com",
    password: "password123",
    role: "user",
    address: { street: "User Street", city: "Colombo", postalCode: "00100" },
  });
  userId = user._id;

  const driver = await User.create({
    name: "Driver",
    email: "driver@example.com",
    password: "password123",
    role: "driver",
    address: { street: "Driver Street", city: "Colombo", postalCode: "00100" },
  });
  driverId = driver._id;

  // Generate JWT tokens for authentication
  adminToken = jwt.sign({ userId: adminId, role: "admin" }, jwtSecret, { expiresIn: "4h" });
  userToken = jwt.sign({ userId: userId, role: "user" }, jwtSecret, { expiresIn: "4h" });
  driverToken = jwt.sign({ userId: driverId, role: "driver" }, jwtSecret, { expiresIn: "4h" });
});

// Clean up after each test
afterEach(async () => {
  await WasteRequest.deleteMany({});
});

// Close the database connection after all tests
after(async () => {
  await mongoose.connection.close();
});

describe("Admin Routes", () => {
  it("should allow an admin to view all waste requests", async () => {
    // Create a sample waste request
    await WasteRequest.create({
      wasteType: ["Plastic Waste"],
      location: {
        latitude: 6.9271,
        longitude: 79.8612,
      },
      user: userId,
      wasteCode: "WASTE-TEST-001",
      status: "pending",
    });

    const res = await request(app).get("/api/admin/all-waste-requests").set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.greaterThan(0);
  });

  it("should not allow a regular user to view all waste requests", async () => {
    const res = await request(app).get("/api/admin/all-waste-requests").set("Authorization", `Bearer ${userToken}`);

    expect(res.status).to.equal(403);
    expect(res.body).to.have.property("message", "Admin access required.");
  });

  it("should not allow a driver to view all waste requests", async () => {
    const res = await request(app).get("/api/admin/all-waste-requests").set("Authorization", `Bearer ${driverToken}`);

    expect(res.status).to.equal(403);
    expect(res.body).to.have.property("message", "Admin access required.");
  });
});
