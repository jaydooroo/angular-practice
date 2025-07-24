import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StrategyService } from '../../services/strategy.service';
import { Strategy } from '../../models/strategy.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-strategy-dashboard',
  standalone: true,
  templateUrl: './strategy-dashboard.component.html',
  styleUrls: ['./strategy-dashboard.component.css'],
  imports: [CommonModule, FormsModule]
})
export class StrategyDashboardComponent implements OnInit {
  strategies: Strategy[] = [];
  selectedStrategyId: string = '';
  investmentAmount: number = 10000;
  loading: boolean = false;

  constructor(
    private strategyService: StrategyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadStrategies();
  }

  loadStrategies() {
    this.strategyService.getStrategies().subscribe({
      next: (strategies) => this.strategies = strategies,
      error: (error) => console.error('Error loading strategies:', error)
    });
  }

  getRiskColor(riskLevel: string): string {
    switch (riskLevel) {
      case 'low': return '#28a745';
      case 'medium': return '#ffc107';
      case 'high': return '#dc3545';
      default: return '#6c757d';
    }
  }

  analyzeStrategy() {
    if (!this.selectedStrategyId || this.investmentAmount <= 0) {
      alert('Please select a strategy and enter a valid investment amount');
      return;
    }

    this.loading = true;
    this.strategyService.getPortfolioRecommendation(this.selectedStrategyId, this.investmentAmount)
      .subscribe({
        next: (recommendation) => {
          this.router.navigate(['/portfolio-results'], {
            state: { recommendation }
          });
        },
        error: (error) => {
          console.error('Error getting recommendation:', error);
          this.loading = false;
        }
      });
  }

  navigateToCreateStrategy() {
    this.router.navigate(['/create-strategy']);
  }
}