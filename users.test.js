const request = require('supertest');
const app = require('../app'); // Adjust the path if necessary
const mongoose = require('mongoose');
const User = require('../models/user'); // Adjust the path if necessary

beforeAll(async () => {
  // Connect to the test database
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  // Clean up the database and close the connection
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('User  API', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        email: 'test@example.com',
        name: 'John Doe',
        mobile: '1234567890'
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  it('should get all users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});