export interface Auction {
  id: number;
  roundNumber: number;
  roundPrice: number;
  timeRemaining: number;
}

export interface TraderHistory {
  round: number;
  price: number;
  quantity: number;
  activity: 'Low' | 'Medium' | 'High';
}

export interface RoundData {
  price: number;
  quantity: number;
  activity: 'H' | 'M' | 'L';
  traders: {
    [traderId: string]: number;
  };
}