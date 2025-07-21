import { Component, OnInit } from '@angular/core';
import { TradeService } from '../../services/trade.service';
import { Trade } from '../../models/trade.model';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trading-page',
  standalone: true, 
  templateUrl: './trading-page.component.html', 
  styleUrls: ['./trading-page.component.css'], 
  imports: [
    CommonModule,
    FormsModule, 
    DatePipe 
  ]
})
export class TradingPageComponent implements OnInit {
  trades: Trade[] = [];
  newTrade: Trade = { symbol: '', type: 'buy', quantity: 0, price: 0 };

  constructor(private tradeService: TradeService) {}

  ngOnInit() {
    this.loadTrades();
  }

  loadTrades() {
    this.tradeService.getTrades().subscribe(trades => this.trades = trades);
  }

  submitTrade() {
    this.tradeService.createTrade(this.newTrade).subscribe(() => {
      this.loadTrades();
      this.newTrade = { symbol: '', type: 'buy', quantity: 0, price: 0 };
    });
  }
}
