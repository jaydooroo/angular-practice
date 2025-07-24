const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/practice_trading');

const tradeRoutes = require('./routes/trade.routes');
const strategyRoutes = require('./routes/strategy.routes');

app.use('/api/trades', tradeRoutes);
app.use('/api/strategies', strategyRoutes);

module.exports = app;
