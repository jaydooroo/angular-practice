const mongoose = require('mongoose');
const TradeSchema = new mongoose.Schema({
  symbol: String,
  type: String, // "buy" or "sell"
  quantity: Number,
  price: Number,
  date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Trade', TradeSchema);
