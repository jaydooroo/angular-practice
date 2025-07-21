const express = require('express');
const router = express.Router();
const controller = require('../controllers/trade.controller');

router.get('/', controller.getTrades);
router.post('/', controller.createTrade);

module.exports = router;
