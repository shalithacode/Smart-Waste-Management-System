import request from 'supertest';
import mongoose from 'mongoose';
import { expect } from 'chai';
import app from '../app.js';
import User from '../models/User.js';

// Clear database after each test
beforeEach(async () => {
  await User.deleteMany({});
});

// Close database connection after all tests
after(async () => {
  await mongoose.connection.close();
});

describe('User Routes', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user',
        address: {
          street: '123 Main St',
          city: 'Colombo',
          postalCode: '00100',
        },
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('user');
    expect(res.body.user.email).to.equal('john@example.com');
  });

  it('should not register a user with an existing email', async () => {
    // Create a user
    await request(app)
      .post('/api/users/register')
      .send({
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
        role: 'user',
        address: {
          street: '123 Main St',
          city: 'Colombo',
          postalCode: '00100',
        },
      });

    // Try to register with the same email
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'John Doe',
        email: 'jane@example.com', // Duplicate email
        password: 'password123',
        role: 'user',
        address: {
          street: '123 Main St',
          city: 'Colombo',
          postalCode: '00100',
        },
      });

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property('message');
  });

  it('should login a user', async () => {
    // First register a user
    await request(app)
      .post('/api/users/register')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user',
        address: {
          street: '123 Main St',
          city: 'Colombo',
          postalCode: '00100',
        },
      });

    // Attempt to login
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'john@example.com',
        password: 'password123',
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
    expect(res.body.user.email).to.equal('john@example.com');
  });

  it('should fail login with incorrect credentials', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'wrongpassword',
      });

    expect(res.status).to.equal(401);
    expect(res.body).to.have.property('message');
  });
});
