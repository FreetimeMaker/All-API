const express = require('express');
const router = express.Router();

// Importiere den v1 Router
const v1Router = require('./v1');

// Route für die API-Übersicht
router.get('/', (req, res) => {
    res.json({
        message: "Welcome to the All-API!",
        version: "v1.0.0",
        versions: {
            v1: "/api/v1"
        },
        "v1 endpoints": {
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

// Mount v1 Router unter /v1
router.use('/v1', v1Router);

// Exportiere den Haupt-Router
module.exports = router;
