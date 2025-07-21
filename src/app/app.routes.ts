import { Routes } from '@angular/router';
import { TradingPageComponent } from './pages/trading-page/trading-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '/home', component: TradingPageComponent },
];
