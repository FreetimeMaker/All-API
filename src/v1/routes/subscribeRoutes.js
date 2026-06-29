const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/authMiddleware');
const userService = require('../services/userService');

// Endpunkt zum Abrufen des aktuellen Plans des eingeloggten Benutzers
router.get('/me', ensureAuthenticated, (req, res) => {
    const user = userService.getUserById(req.user.id);
    if (user) {
        return res.json({ email: user.email, plan: user.plan });
    }
    res.status(404).json({ error: "User not found" });
});

// Endpunkt zum Ändern des Plans (simuliert ein Abonnement)
router.post('/', ensureAuthenticated, (req, res) => {
    const { plan } = req.body;
    const userId = req.user.id;

    const normalizedPlan = plan ? plan.toUpperCase() : '';

    if (!['FREE', 'FREEMIUM', 'PREMIUM'].includes(normalizedPlan)) {
        return res.status(400).json({ error: "Invalid plan. Choose FREE, FREEMIUM, or PREMIUM." });
    }

    const updatedUser = userService.upgradeUserPlan(userId, normalizedPlan);

    if (updatedUser) {
        return res.json({ status: "success", newPlan: updatedUser.plan });
    }
    res.status(500).json({ error: "Failed to update plan." });
});

module.exports = router;
