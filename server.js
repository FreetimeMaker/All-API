const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

// Lade Umgebungsvariablen aus .env Datei
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Ersetze dies durch die URL deines Frontends
    credentials: true
}));
app.use(express.json()); // Body-Parser für JSON-Anfragen
app.use(express.urlencoded({ extended: true })); // Body-Parser für URL-encoded Anfragen

// Session-Konfiguration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key', // Starken Secret Key verwenden
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // In Produktion auf true setzen
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 Stunden
    }
}));

// Passport initialisieren
app.use(passport.initialize());
app.use(passport.session());

// Importiere den Haupt-Router aus src/index.js
const mainRouter = require('./src');

// Routen verwenden
app.use('/api', mainRouter); // Alle Routen unter /api mounten

// Basis-Route
app.get('/', (req, res) => {
    res.send('All-API Node.js Backend is running!');
});

// Starte den Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
