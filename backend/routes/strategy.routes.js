const express = require('express');
const router = express.Router();
const controller = require('../controllers/strategy.controller');

router.get('/', controller.getStrategies);
router.post('/recommend', controller.getPortfolioRecommendation);
router.post('/', controller.postStrategy );
module.exports = router;