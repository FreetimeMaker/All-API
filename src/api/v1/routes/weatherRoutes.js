const express = require('express');
const router = express.Router();
const weatherService = require('../services/weatherService');
const userService = require('../services/userService');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

router.get('/forecast', ensureAuthenticated, async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ error: "Please provide latitude (lat) and longitude (lon)." });
    }

    try {
        const user = await userService.getUserById(req.user.id); // Echten User aus dem Service laden
        
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        switch (user.plan) {
            case "PREMIUM":
                const premiumData = await weatherService.getWeatherData(lat, lon);
                return res.json(premiumData);
            case "FREEMIUM":
                const freemiumData = await weatherService.getFreemiumWeatherData(lat, lon);
                return res.json(freemiumData);
            case "FREE":
            default:
                const freeData = await weatherService.getFreeWeatherData(lat, lon);
                return res.json({
                    current: freeData,
                    upsell: "Upgrade to FREEMIUM for 7-day forecast or PREMIUM for air quality and hourly details."
                });
        }
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        return res.status(500).json({ error: "Failed to fetch weather data", message: error.message });
    }
});

module.exports = router;
