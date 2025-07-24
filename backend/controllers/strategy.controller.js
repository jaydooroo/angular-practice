const Strategy = require('../models/Strategy');

const mockStockData = {
  'AAPL': { name: 'Apple Inc.', price: 200, sector: 'Technology' },
  'MSFT': { name: 'Microsoft Corporation', price: 350, sector: 'Technology' },
  'VOO': { name: 'Vanguard S&P 500 ETF', price: 420, sector: 'ETF' },
  'JNJ': { name: 'Johnson & Johnson', price: 165, sector: 'Healthcare' },
  'BRK.B': { name: 'Berkshire Hathaway', price: 430, sector: 'Financial' }
};

exports.getStrategies = async (req, res) => {
  try {
    let strategies = await Strategy.find();
    
    if (strategies.length === 0) {
      strategies = await createDefaultStrategies();
    }
    
    res.json(strategies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPortfolioRecommendation = async (req, res) => {
  try {
    const { strategyId, investmentAmount } = req.body;
    
    const strategy = await Strategy.findById(strategyId);
    if (!strategy) {
      return res.status(404).json({ error: 'Strategy not found' });
    }

    const stockAllocations = strategy.stockWeights.map(stock => {
      const stockInfo = mockStockData[stock.symbol];
      const investmentForStock = investmentAmount * stock.weight;
      const sharesCount = Math.floor(investmentForStock / stockInfo.price * 100) / 100;
      
      return {
        symbol: stock.symbol,
        companyName: stockInfo.name,
        sector: stockInfo.sector,
        investmentAmount: Math.round(investmentForStock),
        sharesCount: sharesCount,
        currentPrice: stockInfo.price,
        allocationPercentage: Math.round(stock.weight * 100)
      };
    });

    const recommendation = {
      strategyId: strategy._id,
      strategyName: strategy.name,
      totalInvestment: investmentAmount,
      stockAllocations: stockAllocations,
      strategyStats: {
        avgProfitPercentage: strategy.avgProfitPercentage,
        largestDropPercentage: strategy.largestDropPercentage,
        riskLevel: strategy.riskLevel
      }
    };

    res.json(recommendation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.postStrategy = async (req, res) => {

  try { 
    const { 
      name, 
      description, 
      riskLevel, 
      avgProfitPercentage,
      largestDropPercentage,
      historicalData,
      stockWeights
    } = req.body; 

  // For strings - checking existence is usually fine,  For numbers - check for undefined specifically
    if (!name || !description || avgProfitPercentage === undefined || largestDropPercentage === undefined ||avgProfitPercentage == null || largestDropPercentage == null) {
      // Empty strings are usually not valid for names/descriptions
      return res.status(400).json({
        error: 'Missing required fields '
      })
    }

    // Most robust - use typeof:
    if (typeof avgProfitPercentage !== 'number' || typeof largestDropPercentage !== 'number') {
      // Ensures they are actually numbers
      return res.status(400).json({
        error: 'avgProfitPercentage and largestDropPercentage must be numbers'
      })
    }

    const newStrategy = new Strategy({
      name, 
      description, 
      riskLevel, 
      avgProfitPercentage, 
      largestDropPercentage, 
      historicalData: historicalData || undefined, 
      stockWeights: stockWeights || [] 
    });

    const savedStrategy = await newStrategy.save(); 


    return res.status(201).json(savedStrategy); 
  }
  catch (error) {
    // Handle Validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Valiation Error', 
        details: error.message
      }); 
    }
    
    //Handle duplicate key errors (if you have unique constraints)
    if (error.code === 11000) {
      return res.status(400).json({
        error: 'Duplicate entry', 
        details: 'A strategy with this name alreay exists'
      }); 
    }
    res.status(500).json({error: error.message});
  }
};
async function createDefaultStrategies() {
  const defaultStrategies = [
    {
      name: 'Conservative Growth',
      description: 'Low-risk portfolio focusing on stable, dividend-paying stocks',
      riskLevel: 'low',
      avgProfitPercentage: 7.2,
      largestDropPercentage: -5.8,
      historicalData: { bestYear: 12.5, worstYear: 2.1, yearsActive: 10 },
      stockWeights: [
        { symbol: 'VOO', weight: 0.40 },
        { symbol: 'JNJ', weight: 0.30 },
        { symbol: 'BRK.B', weight: 0.30 }
      ]
    },
    {
      name: 'Balanced Portfolio',
      description: 'Moderate risk with balanced exposure to growth and value stocks',
      riskLevel: 'medium',
      avgProfitPercentage: 10.5,
      largestDropPercentage: -12.3,
      historicalData: { bestYear: 18.7, worstYear: -3.2, yearsActive: 8 },
      stockWeights: [
        { symbol: 'VOO', weight: 0.30 },
        { symbol: 'AAPL', weight: 0.25 },
        { symbol: 'MSFT', weight: 0.25 },
        { symbol: 'JNJ', weight: 0.20 }
      ]
    },
    {
      name: 'Growth Focused',
      description: 'Higher risk portfolio targeting high-growth technology stocks',
      riskLevel: 'high',
      avgProfitPercentage: 15.8,
      largestDropPercentage: -25.4,
      historicalData: { bestYear: 35.2, worstYear: -8.9, yearsActive: 5 },
      stockWeights: [
        { symbol: 'AAPL', weight: 0.40 },
        { symbol: 'MSFT', weight: 0.35 },
        { symbol: 'VOO', weight: 0.25 }
      ]
    }
  ];

  return await Strategy.insertMany(defaultStrategies);
}