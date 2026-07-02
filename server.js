const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// CORS
app.use(cors({
    origin: 'https://innovative-gratitude-production-9ac1.up.railway.app',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session (wichtig!)
app.use(session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));

// Router
const mainRouter = require('./src');
app.use('/api', mainRouter);

// Root
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the All-API!",
        version: "v1.0.0",
        versions: {
            v1: {
                message: "Welcome to All-API v1!",
                version: "v1.0.0",
                endpoints: {
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
            }
        }
    });
});

// Start
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
