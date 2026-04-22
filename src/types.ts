export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'boosting' | 'coaching';
  features: string[];
}

export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  date: string; // ISO string
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: number;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  role: 'user' | 'admin';
  discordId?: string;
  rocketLeagueRank?: string;
}

export interface Review {
  id: string;
  authorName: string;
  rating: number;
  content: string;
  date: string;
  rank: string;
}
