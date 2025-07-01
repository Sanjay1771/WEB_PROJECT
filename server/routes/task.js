// routes/tasks.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Task = require('../models/Task');

// Get tasks for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// Add a new task
router.post('/', authMiddleware, async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = await Task.create({
      title,
      description,
      completed: false,
      userId: req.user.id,
      email: req.user.email // ✅ this comes from decoded JWT
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task' });
  }
});

// Update task
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.sendStatus(200);
  } catch {
    res.status(500).json({ message: 'Error updating task' });
  }
});

// Delete task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch {
    res.status(500).json({ message: 'Error deleting task' });
  }
});

module.exports = router;
