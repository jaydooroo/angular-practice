const Trade = require('../models/Trade');

exports.getTrades = async (req, res) => {
  const trades = await Trade.find();
  res.json(trades);
};

exports.createTrade = async (req, res) => {
  const trade = new Trade(req.body);
  await trade.save();
  res.status(201).json(trade);
};
