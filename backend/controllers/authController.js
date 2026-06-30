const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function register(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).send({ message: 'Please fill all fields' });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).send({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.send({ token });
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: 'Please fill all fields' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({ message: 'User not found' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(400).send({ message: 'Invalid password' });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.send({ token });
}

async function logout(req, res) {
  res.clearCookie('jwt');
  res.send({ message: 'Logged out successfully' });
}

module.exports = { register, login, logout };