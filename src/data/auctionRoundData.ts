import { RoundData } from '../types';

export const auctionRoundData: Record<number, RoundData> = {
  1: { price: 100, quantity: 50, activity: 'H', traders: { 'A': 20, 'B': 15, 'C': 15 } },
  2: { price: 110, quantity: 45, activity: 'M', traders: { 'A': 18, 'B': 12, 'C': 15 } },
  3: { price: 120, quantity: 30, activity: 'L', traders: { 'A': 10, 'B': 10, 'C': 10 } },
  4: { price: 130, quantity: 35, activity: 'M', traders: { 'A': 15, 'B': 10, 'C': 10 } },
  5: { price: 140, quantity: 40, activity: 'H', traders: { 'A': 18, 'B': 12, 'C': 10 } },
};