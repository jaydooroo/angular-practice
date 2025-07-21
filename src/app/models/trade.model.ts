export interface Trade {
  _id?: string;
  symbol: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  date?: Date;
}
