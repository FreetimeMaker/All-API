const express = require('express');
const router = express.Router();
const todoModel = require('../models/todoModel');
const userService = require('../services/userService');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

// Alle To-Dos eines Benutzers abrufen
router.get('/', ensureAuthenticated, (req, res) => {
    const userId = req.user.id;
    const todos = todoModel.findByOwnerId(userId);
    res.json(todos);
});

// Neues To-Do erstellen
router.post('/', ensureAuthenticated, (req, res) => {
    const userId = req.user.id;
    const { title, completed } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Title is required." });
    }

    const user = userService.getUserById(userId);
    const existingTodos = todoModel.findByOwnerId(userId);

    // SaaS Limits
    if (user.plan === "FREE" && existingTodos.length >= 5) {
        return res.status(403).json({ error: "FREE limit reached (5 tasks). Upgrade to FREEMIUM for 50 or PREMIUM for unlimited." });
    }
    if (user.plan === "FREEMIUM" && existingTodos.length >= 50) {
        return res.status(403).json({ error: "FREEMIUM limit reached (50 tasks). Upgrade to PREMIUM for unlimited." });
    }

    const newTodo = todoModel.save({ title, completed, ownerId: userId });
    res.status(201).json(newTodo);
});

// To-Do aktualisieren
router.put('/:id', ensureAuthenticated, (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    const { title, completed } = req.body;

    let todo = todoModel.findById(id);

    if (!todo || todo.ownerId !== userId) {
        return res.status(404).json({ error: "Todo not found or not authorized." });
    }

    todo.title = title !== undefined ? title : todo.title;
    todo.completed = completed !== undefined ? completed : todo.completed;

    const updatedTodo = todoModel.save(todo);
    res.json(updatedTodo);
});

// To-Do löschen
router.delete('/:id', ensureAuthenticated, (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    const todo = todoModel.findById(id);

    if (!todo || todo.ownerId !== userId) {
        return res.status(404).json({ error: "Todo not found or not authorized." });
    }

    todoModel.deleteById(id);
    res.status(204).send(); // No Content
});

module.exports = router;
