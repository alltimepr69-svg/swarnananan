
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  hoverImage: string;
  gallery: string[]; // Added gallery field for multi-image support
  category: 'Rings' | 'Earrings' | 'Necklaces' | 'Bangles' | 'Chains' | 'Bracelets' | 'Others';
  metal: 'Gold' | 'Platinum' | 'Rose Gold' | 'Silver';
  purity: string;
  weight: string;
  description: string;
  occasion: 'Wedding' | 'Daily Wear' | 'Party';
  isDiamond?: boolean;
  collection?: string;
}

export interface QuizState {
  occasion: string;
  budget: string;
  style: string;
}

export enum Page {
  Home = 'home',
  PLP = 'plp',
  PDP = 'pdp',
  Quiz = 'quiz',
  Gold = 'gold',
  Diamond = 'diamond',
  Silver = 'silver',
  Collections = 'collections',
  Wishlist = 'wishlist'
}
