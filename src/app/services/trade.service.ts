import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trade } from '../models/trade.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TradeService {
  private apiUrl = 'http://localhost:3000/api/trades';

  constructor(private http: HttpClient) {}

  getTrades(): Observable<Trade[]> {
    return this.http.get<Trade[]>(this.apiUrl);
  }

  createTrade(trade: Trade): Observable<Trade> {
    return this.http.post<Trade>(this.apiUrl, trade);
  }
}
