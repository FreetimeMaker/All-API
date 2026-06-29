const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google OAuth Login
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth Callback
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login/failed' }),
    (req, res) => {
        // Erfolgreiche Authentifizierung, leite zur Frontend-App weiter
        res.redirect('http://localhost:3000/dashboard'); // Ersetze dies durch die URL deines Frontends
    }
);

// Logout
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: "Logout failed", message: err.message });
        }
        req.session.destroy(() => {
            res.clearCookie('connect.sid'); // Session-Cookie löschen
            res.json({ message: "Logged out successfully" });
        });
    });
});

// Login Status prüfen
router.get('/current_user', (req, res) => {
    if (req.user) {
        res.json(req.user);
    } else {
        res.status(401).json({ user: null, message: "Not authenticated" });
    }
});

router.get('/login/failed', (req, res) => {
    res.status(401).json({ error: "Login failed" });
});

module.exports = router;
