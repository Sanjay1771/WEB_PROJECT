const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to check token
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'Invalid User' });

    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

// Save task to MongoDB
router.post('/', authenticate, async (req, res) => {
  const { title, description } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      userId: req.user._id,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Error saving task' });
  }
});

// Get all tasks for user
router.get('/', authenticate, async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id });
  res.json(tasks);
});

module.exports = router;
