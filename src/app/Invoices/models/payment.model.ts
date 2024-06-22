export interface CurrencyExchange {
    changeInUSD: number;
    changeInCurrency: number;
    denominations: Denomination[];
    currency: string;
  }

  export interface Denomination {
    value: number;
    count: number;
    available: number;
  }