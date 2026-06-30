const express = require('express');
const router = express.Router();

const weatherRoutes = require('./weatherRoutes');
const todoRoutes = require('./todoRoutes');
const subscribeRoutes = require('./subscribeRoutes');

router.use('/weather', weatherRoutes);
router.use('/todos', todoRoutes);
router.use('/subscribe', subscribeRoutes);

module.exports = router;
