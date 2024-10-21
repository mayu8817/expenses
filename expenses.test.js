const request = require('supertest');
const app = require('../app'); // Adjust the path if necessary
const mongoose = require('mongoose');
const Expense = require('../models/expense'); // Adjust the path if necessary

beforeAll(async () => {
  // Connect to the test database
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  // Clean up the database and close the connection
  await Expense.deleteMany({});
  await mongoose.connection.close();
});

describe('Expense API', () => {
  it('should create a new expense', async () => {
    const response = await request(app)
      .post('/api/expenses')
      .send({
        description: 'Dinner',
        amount: 50,
        participants: [] // Adjust as necessary
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
  });

  it('should get all expenses', async () => {
    const response = await request(app).get('/api/expenses');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});