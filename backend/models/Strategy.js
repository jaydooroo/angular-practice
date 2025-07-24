const mongoose = require('mongoose');

const StrategySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  riskLevel: { type: String, enum: ['low', 'medium', 'high'], required: true },
  avgProfitPercentage: { type: Number, required: true },
  largestDropPercentage: { type: Number, required: true },
  historicalData: {
    bestYear: Number,
    worstYear: Number,
    yearsActive: Number
  },
  stockWeights: [{
    symbol: String,
    weight: Number
  }]
});

module.exports = mongoose.model('Strategy', StrategySchema);