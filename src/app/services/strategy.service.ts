import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Strategy } from '../models/strategy.model';
import { PortfolioRecommendation } from '../models/portfolio-recommendation.model';

@Injectable({ providedIn: 'root' })
export class StrategyService {
  private apiUrl = 'http://localhost:3000/api/strategies';

  constructor(private http: HttpClient) {}

  getStrategies(): Observable<Strategy[]> {
    return this.http.get<Strategy[]>(this.apiUrl);
  }

  getPortfolioRecommendation(strategyId: string, investmentAmount: number): Observable<PortfolioRecommendation> {
    return this.http.post<PortfolioRecommendation>(`${this.apiUrl}/recommend`, {
      strategyId,
      investmentAmount
    });
  }

  createStrategy (strategy: Strategy): Observable<Strategy> {
    return this.http.post<Strategy>(this.apiUrl, strategy);  
  }

}