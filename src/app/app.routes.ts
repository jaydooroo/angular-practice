import { Routes } from '@angular/router';
import { TradingPageComponent } from './pages/trading-page/trading-page.component';
import { StrategyDashboardComponent } from './pages/strategy-dashboard/strategy-dashboard.component';
import { PortfolioResultsComponent } from './pages/portfolio-results/portfolio-results.component';

export const routes: Routes = [
  { path: '', redirectTo: 'strategy-dashboard', pathMatch: 'full' },
  { path: 'home', component: TradingPageComponent },
  { path: 'strategy-dashboard', component: StrategyDashboardComponent },
  { path: 'portfolio-results', component: PortfolioResultsComponent },
];
