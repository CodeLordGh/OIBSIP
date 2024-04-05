import request from 'supertest';
import app from './index'; // Replace with path to your app

describe('Login Route Tests', () => {
  test('should return 401 for invalid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'Mentalist', password: 'mentalist123' });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid username or password');
  });

  test('should return 200 for valid credentials', async () => {
    // Assuming you have a way to register a user beforehand (replace with your logic)
    const registeredUser = { username: 'johndoe', password: 'johndoe123' };
    // ... register the user ...

    const response = await request(app)
      .post('/login')
      .send({ username: registeredUser.username, password: '$2b$10$oUmGdmuDR/kiKH5JXeIYqeqUnEOTw7i2Oz/BH.w8.Mteo.kHswwAO' }); // Replace with actual password

    expect(response.statusCode).toBe(200);
    // You might not want to expose the entire response in production, adjust based on your needs
    expect(response.body).toHaveProperty('message'); 
  });
});
