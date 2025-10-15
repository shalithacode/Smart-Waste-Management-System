import request from "supertest";
import mongoose from "mongoose";
import { expect } from "chai";
import app from "../app.js";
import User from "../models/User.js";
import WasteRequest from "../models/WasteRequest.js";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/db.js";

// Setup variables for the test
let userToken, adminToken, driverToken;
let userId, adminId, driverId;

before(function (done) {
  this.timeout(10000); // Set timeout to 10 seconds
  // MongoDB connection and setup code
  // Ensure to call done() after the async operations are done
  done();
});

before(async () => {
  // Clear the database
  await User.deleteMany({});
  await WasteRequest.deleteMany({});

  // Create a user, admin, and driver for testing
  const user = await User.create({
    name: "Test User",
    email: "user@example.com",
    password: "password123",
    role: "user",
    address: { street: "Test Street", city: "Colombo", postalCode: "00100" },
  });
  userId = user._id;

  const admin = await User.create({
    name: "Test Admin",
    email: "admin@example.com",
    password: "password123",
    role: "admin",
    address: { street: "Admin Street", city: "Colombo", postalCode: "00100" },
  });
  adminId = admin._id;

  const driver = await User.create({
    name: "Test Driver",
    email: "driver@example.com",
    password: "password123",
    role: "driver",
    address: { street: "Driver Street", city: "Colombo", postalCode: "00100" },
  });
  driverId = driver._id;

  // Generate JWT tokens for authentication
  userToken = jwt.sign({ userId: userId, role: "user" }, jwtSecret, { expiresIn: "4h" });
  adminToken = jwt.sign({ userId: adminId, role: "admin" }, jwtSecret, { expiresIn: "4h" });
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

describe("Waste Request Routes", () => {
  it("should create a new waste request (user)", async () => {
    const res = await request(app)
      .post("/api/waste-requests/create")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        wasteType: ["Organic Waste"],
        location: {
          latitude: 6.9271,
          longitude: 79.8612,
        },
        userId: userId.toString(),
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("wasteCode");
    expect(res.body).to.have.property("qrCode");
  });

  it("should not create a waste request without location", async () => {
    const res = await request(app)
      .post("/api/waste-requests/create")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        wasteType: ["Organic Waste"],
        userId: userId.toString(),
      });

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("message", "Location is required and must include latitude and longitude.");
  });

  it("should assign a driver to a waste request (admin)", async () => {
    // First create a waste request
    const wasteRequest = await WasteRequest.create({
      wasteType: { type: "Organic Waste", quantity: 10 },
      location: {
        latitude: 6.9271,
        longitude: 79.8612,
      },
      user: userId,
      wasteCode: "WASTE-TEST-001",
      status: "pending",
    });

    const res = await request(app)
      .post("/api/waste-requests/assign-driver")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        requestId: wasteRequest._id.toString(),
        driverId: driverId.toString(),
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("status", "assigned");
    expect(res.body).to.have.property("assignedDriver", driverId.toString());
  });

  it("should not allow a non-admin to assign a driver", async () => {
    const wasteRequest = await WasteRequest.create({
      wasteType: { type: "Organic Waste", quantity: 10 },
      location: {
        latitude: 6.9271,
        longitude: 79.8612,
      },
      user: userId,
      wasteCode: "WASTE-TEST-002",
      status: "pending",
    });

    const res = await request(app)
      .post("/api/waste-requests/assign-driver")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        requestId: wasteRequest._id.toString(),
        driverId: driverId.toString(),
      });

    expect(res.status).to.equal(403);
    expect(res.body).to.have.property("message", "Admin access required.");
  });

  it("should get all waste requests (user)", async () => {
    await WasteRequest.create({
      wasteType: { type: "Organic Waste", quantity: 10 },
      location: {
        latitude: 6.9271,
        longitude: 79.8612,
      },
      user: userId,
      wasteCode: "WASTE-TEST-003",
      status: "pending",
    });

    const res = await request(app)
      .get("/api/waste-requests/all-waste-requests")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.be.greaterThan(0);
  });

  it("should mark a waste request as picked up (driver)", async () => {
    const wasteRequest = await WasteRequest.create({
      wasteType: { type: "Organic Waste", quantity: 10 },
      location: {
        latitude: 6.9271,
        longitude: 79.8612,
      },
      user: userId,
      wasteCode: "WASTE-TEST-004",
      status: "assigned",
      assignedDriver: driverId,
    });

    const res = await request(app)
      .post("/api/waste-requests/mark-picked-up")
      .set("Authorization", `Bearer ${driverToken}`)
      .send({
        requestId: wasteRequest._id.toString(),
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("status", "picked-up");
  });

  it("should not allow a non-driver to mark a request as picked up", async () => {
    const wasteRequest = await WasteRequest.create({
      wasteType: { type: "Organic Waste", quantity: 10 },
      location: {
        latitude: 6.9271,
        longitude: 79.8612,
      },
      user: userId,
      wasteCode: "WASTE-TEST-005",
      status: "assigned",
      assignedDriver: driverId,
    });

    const res = await request(app)
      .post("/api/waste-requests/mark-picked-up")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        requestId: wasteRequest._id.toString(),
      });

    expect(res.status).to.equal(403);
    expect(res.body).to.have.property("message", "Driver access required.");
  });

  it("should get waste requests for a specific user", async () => {
    await WasteRequest.create({
      wasteType: { type: "Organic Waste", quantity: 10 },
      location: {
        latitude: 6.9271,
        longitude: 79.8612,
      },
      user: userId,
      wasteCode: "WASTE-TEST-006",
      status: "pending",
    });

    const res = await request(app)
      .get(`/api/waste-requests/user/${userId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body[0]).to.have.property("user", userId.toString());
  });
});
