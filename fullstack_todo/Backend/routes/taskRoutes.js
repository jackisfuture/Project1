// Install: npm install express
import express from 'express';
import Task from '../models/task.js';

const router = express.Router();

/**
 * --- 1. READ (GET) ---
 * Purpose: Fetches all tasks (Happy New Year, etc.) from MongoDB.
 * Path: http://localhost:5000/api/tasks
 */
router.get('/', async (req, res) => {
    try {
        // Task.find() gets all docs. sort({ createdAt: -1 }) puts newest at top.
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server error fetching tasks" });
    }
});

/**
 * --- 2. CREATE (POST) ---
 * Purpose: Validates and saves a new task.
 * Note: We check if req.body exists to prevent "destructure" crashes.
 */
router.post('/', async (req, res) => {
    try {
        // Safety Check: Ensure body exists before destructuring
        if (!req.body || !req.body.text) {
            return res.status(400).json({ message: "Task text is required" });
        }

        const { text } = req.body;

        // Concept 1: No empty spaces
        if (text.trim().length === 0) {
            return res.status(400).json({ message: "Task cannot be empty" });
        }

        // Concept 2: Length limit (Security Shield)
        if (text.length > 100) {
            return res.status(400).json({ message: "Task too long (Max 100 chars)" });
        }

        const newTask = new Task({ text });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: "Server Error creating task" });
    }
});

// --- 3. UPDATE (PUT) ---
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        task.isComplete = !task.isComplete; 
        const updatedTask = await task.save();
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Server error updating task' });
    }
});

// --- 4. DELETE (DELETE) ---
router.delete('/:id', async (req, res) => {
    try {
        const result = await Task.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json({ id: req.params.id, message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error deleting task' });
    }
});

export default router;