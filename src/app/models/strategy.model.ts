export type RiskLevel = 'low' | 'medium' | 'high';

export interface Strategy {
  _id: string;
  name: string;
  description: string;
  riskLevel: RiskLevel;
  avgProfitPercentage: number;
  largestDropPercentage: number;
  historicalData?: {
    bestYear: number;
    worstYear: number;
    yearsActive: number;
  };
}