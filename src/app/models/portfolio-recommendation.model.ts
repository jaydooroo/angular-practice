import { StockAllocation } from './stock-allocation.model';

export interface PortfolioRecommendation {
  strategyId: string;
  strategyName: string;
  totalInvestment: number;
  stockAllocations: StockAllocation[];
  strategyStats: {
    avgProfitPercentage: number;
    largestDropPercentage: number;
    riskLevel: string;
  };
}