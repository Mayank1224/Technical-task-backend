const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const secretKey = 'your-secret-key';

exports.register = async (req, res) => {
  const { username, password } = req.body;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user to the database
  await User.create({ username, password: hashedPassword });

  res.json({ message: 'User registered successfully' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Validate username and password
  const user = await User.findOne({ username });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

  res.json({ token });
};


exports.logout = async (req, res) => {
  res.json({ message: 'Logout successful' });
};
