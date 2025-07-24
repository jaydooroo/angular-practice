import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PortfolioRecommendation } from '../../models/portfolio-recommendation.model';
import { StockAllocation } from '../../models/stock-allocation.model';

@Component({
  selector: 'app-portfolio-results',
  standalone: true,
  templateUrl: './portfolio-results.component.html',
  styleUrls: ['./portfolio-results.component.css'],
  imports: [CommonModule]
})
export class PortfolioResultsComponent implements OnInit {
  recommendation: PortfolioRecommendation | null = null;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.recommendation = navigation.extras.state['recommendation'];
    }
  }

  ngOnInit() {
    if (!this.recommendation) {
      this.router.navigate(['/strategy-dashboard']);
    }
  }

  getRiskColor(riskLevel: string): string {
    switch (riskLevel) {
      case 'low': return '#28a745';
      case 'medium': return '#ffc107';
      case 'high': return '#dc3545';
      default: return '#6c757d';
    }
  }

  getTotalShares(): number {
    return this.recommendation?.stockAllocations.reduce((total, stock) => total + stock.sharesCount, 0) || 0;
  }

  backToStrategies() {
    this.router.navigate(['/strategy-dashboard']);
  }

  executePortfolio() {
    alert('Portfolio execution would be implemented here');
  }
}