import request from 'supertest';
import mongoose from 'mongoose';
import { expect } from 'chai';
import app from '../app.js';
import User from '../models/User.js';
import DriverAssignment from '../models/Driver.js';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/db.js';

// Test Setup: Variables to store tokens and sample data
let driverToken, adminToken;
let driverId, adminId, userId;

before(function(done) {
    this.timeout(10000);  // Set timeout to 10 seconds
    // MongoDB connection and setup code
    // Ensure to call done() after the async operations are done
    done();
  });

before(async () => {
  // Clear previous data
  await User.deleteMany({});
  await DriverAssignment.deleteMany({});

  // Create a driver, admin, and regular user for testing
  const driver = await User.create({
    name: 'Driver',
    email: 'driver@example.com',
    password: 'password123',
    role: 'driver',
    address: { street: 'Driver Street', city: 'Colombo', postalCode: '00100' },
  });
  driverId = driver._id;

  const admin = await User.create({
    name: 'Admin',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
    address: { street: 'Admin Street', city: 'Colombo', postalCode: '00100' },
  });
  adminId = admin._id;

  // Generate tokens
  driverToken = jwt.sign({ userId: driverId, role: 'driver' }, jwtSecret, { expiresIn: '4h' });
  adminToken = jwt.sign({ userId: adminId, role: 'admin' }, jwtSecret, { expiresIn: '4h' });
});

// Clean up after each test
afterEach(async () => {
  await DriverAssignment.deleteMany({});
});

// Close DB connection after all tests
after(async () => {
  await mongoose.connection.close();
});

describe('Driver Routes', () => {
  
  it('should get assigned pickups for a driver', async () => {
    // Create a sample assignment
    await DriverAssignment.create({
      driver: driverId,
      assignedStreet: 'Driver Street',
      assignmentDate: new Date(),
    });

    const res = await request(app)
      .get('/api/drivers/assigned-pickups')
      .set('Authorization', `Bearer ${driverToken}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0]).to.have.property('assignedStreet', 'Driver Street');
  });

  it('should return no pickups if none are assigned', async () => {
    const res = await request(app)
      .get('/api/drivers/assigned-pickups')
      .set('Authorization', `Bearer ${driverToken}`);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array').that.is.empty;
  });

  // it('should get waste requests for a driver\'s assigned street', async () => {
  //   const res = await request(app)
  //     .get('/api/drivers/pickup-requests?street=Driver Street')
  //     .set('Authorization', `Bearer ${driverToken}`);

  //   expect(res.status).to.equal(200);
  //   expect(res.body).to.be.an('array');
  //   // Simulate a waste request
  // });

  // it('should assign a pickup task to a driver (admin only)', async () => {
  //   const res = await request(app)
  //     .post('/api/drivers/assign-pickup')
  //     .set('Authorization', `Bearer ${adminToken}`)
  //     .send({
  //       driverId: driverId.toString(),
  //       street: 'Driver Street',
  //       pickupDate: new Date(),
  //     });

  //   expect(res.status).to.equal(201);
  //   expect(res.body).to.have.property('message', 'Pickup task assigned successfully, notifications sent.');
  //   expect(res.body).to.have.property('assignment');
  // });

  it('should not allow a driver to assign a task (only admin)', async () => {
    const res = await request(app)
      .post('/api/drivers/assign-pickup')
      .set('Authorization', `Bearer ${driverToken}`)
      .send({
        driverId: driverId.toString(),
        street: 'Driver Street',
        pickupDate: new Date(),
      });

    expect(res.status).to.equal(403);
    expect(res.body).to.have.property('message', 'Admin access required.');
  });

  it('should mark a task as completed by a driver', async () => {
    // First, create an assignment
    await DriverAssignment.create({
      driver: driverId,
      assignedStreet: 'Driver Street',
      assignmentDate: new Date(),
    });

    // Complete the task
    const res = await request(app)
      .post('/api/drivers/complete-task')
      .set('Authorization', `Bearer ${driverToken}`)
      .send({
        street: 'Driver Street',
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message', 'Task marked as completed.');
  });

  it('should not mark a task as completed if the task does not exist', async () => {
    const res = await request(app)
      .post('/api/drivers/complete-task')
      .set('Authorization', `Bearer ${driverToken}`)
      .send({
        street: 'Nonexistent Street',
      });

    expect(res.status).to.equal(500);
    expect(res.body).to.have.property('message', 'Task not found or already completed.');
  });
});
