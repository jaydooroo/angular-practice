export interface StockAllocation {
  symbol: string;
  companyName: string;
  sector?: string;
  investmentAmount: number;
  sharesCount: number;
  currentPrice: number;
  allocationPercentage: number;
}