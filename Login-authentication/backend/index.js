import express, { json } from 'express';
import { hash, compare } from 'bcrypt';
import { readFileSync, writeFileSync } from 'fs'; // File system module for working with JSON file
import cors from 'cors'

const app = express();
const port = 3000;


app.use(cors());
// Set up body parsing middleware
app.use(express.json());

// Read user data from JSON file
let users = [];
try {
  const data = readFileSync('users.json');
  users = JSON.parse(data);
} catch (err) {
    if (err.code === 'ENOENT') {
        console.warn('users.json file not found. Creating a new one.');
        // Create an empty list for users
        users = [];
      } else {
        console.error('Error reading user data:', err);
    }
}

// Function to hash password with bcrypt
const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await hash(password, saltRounds);
  return hashedPassword;
};

// Function to register a new user
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create new user object
  const newUser = { username, password: hashedPassword };

  // Add new user to users array
  users.push(newUser);

  // Write updated users data to JSON file
  writeFileSync('users.json', JSON.stringify(users));

  res.status(201).json({ message: 'User created successfully' });
};

// Function to login a user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Compare hashed passwords
  const validPassword = await compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Login successful, send a success message or JWT token
  res.json({ message: 'Login successful' });
};

// Route for user registration
app.post('/register', registerUser);

// Route for user login
app.post('/login', loginUser);

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
