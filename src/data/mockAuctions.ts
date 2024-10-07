import { Auction } from '../types';

export const mockAuctions: Auction[] = [
  {
    id: 1,
    title: "Vintage Camera",
    description: "A rare, fully functional vintage camera from the 1950s.",
    currentBid: 150,
    endTime: new Date(Date.now() + 3600000), // 1 hour from now
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 2,
    title: "Antique Pocket Watch",
    description: "Elegant gold pocket watch from the 19th century.",
    currentBid: 300,
    endTime: new Date(Date.now() + 7200000), // 2 hours from now
    imageUrl: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 3,
    title: "Modern Art Painting",
    description: "Original abstract painting by an up-and-coming artist.",
    currentBid: 500,
    endTime: new Date(Date.now() + 10800000), // 3 hours from now
    imageUrl: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  }
];