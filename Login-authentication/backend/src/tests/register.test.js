import request from 'supertest';
import app from './index'; // Replace with path to your app

describe('Register Route Tests', () => {
  test('should return 400 for existing username', async () => {
    const existingUser = { username: 'Cool', password: 'cool123' };
    // ... register the user ...  // Assuming you have a way to register a user beforehand (replace with your logic)

    const response = await request(app)
      .post('/register')
      .send(existingUser);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Username already exists');
  });

  test('should return 201 for successful registration', async () => {
    const newUser = { username: 'new_user', password: 'new_password' };

    const response = await request(app)
      .post('/register')
      .send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'User created successfully');
  });
});
