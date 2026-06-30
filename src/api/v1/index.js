const express = require('express');
const router = express.Router();

// Routen importieren
const weatherRoutes = require('./routes/weatherRoutes');
const todoRoutes = require('./routes/todoRoutes');
const subscribeRoutes = require('./routes/subscribeRoutes');

// Route für die v1 API-Übersicht
router.get('/', (req, res) => {
    res.json({
        message: "Welcome to All-API v1!",
        version: "v1.0.0",
        endpoints: {
            weather: {
                forecast: "/api/v1/weather/forecast?lat={lat}&lon={lon}"
            },
            todos: {
                getAll: "/api/v1/todos",
                create: "POST /api/v1/todos",
                update: "PUT /api/v1/todos/{id}",
                delete: "DELETE /api/v1/todos/{id}"
            },
            subscribe: {
                getPlan: "/api/v1/subscribe/me",
                updatePlan: "POST /api/v1/subscribe"
            }
        }
    });
});

// Routen verwenden
router.use('/weather', weatherRoutes);
router.use('/todos', todoRoutes);
router.use('/subscribe', subscribeRoutes);

module.exports = router;
