export interface Product {
  id: string;
  name: string;
  category: 'tops' | 'bottoms' | 'outerwear' | 'accessories';
  price: number;
  image: string;
  materials: string[];
  sustainabilityBadge: string;
  description: string;
  styleTags: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Organic Hemp Utility Overshirt',
    category: 'outerwear',
    price: 89,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=80',
    materials: ['100% Organic Hemp', 'Corozo Nut Buttons'],
    sustainabilityBadge: 'Zero Pesticides • Low Water',
    description: 'Durable, breathable field shirt crafted from pesticide-free European hemp.',
    styleTags: ['minimalist', 'workwear', 'earthy', 'casual']
  },
  {
    id: 'prod-2',
    name: 'Recycled Wool Knit Crewneck',
    category: 'tops',
    price: 110,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80',
    materials: ['70% Recycled Post-Consumer Wool', '30% Organic Cotton'],
    sustainabilityBadge: 'Circular Economy Certified',
    description: 'Warm, chunky knit made from salvaged post-consumer knitwear.',
    styleTags: ['cozy', 'winter', 'classic', 'smart-casual']
  },
  {
    id: 'prod-3',
    name: 'Tencel Lyocell Wide-Leg Trousers',
    category: 'bottoms',
    price: 95,
    image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=600&auto=format&fit=crop&q=80',
    materials: ['100% TENCEL™ Lyocell'],
    sustainabilityBadge: 'Closed-Loop Production',
    description: 'Silky, drape-heavy tailored trousers created with closed-loop eucalyptus pulp.',
    styleTags: ['chic', 'office', 'minimalist', 'relaxed']
  },
  {
    id: 'prod-4',
    name: 'Upcycled Denim Relaxed Jeans',
    category: 'bottoms',
    price: 120,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop&q=80',
    materials: ['100% Upcycled Deadstock Cotton Denim'],
    sustainabilityBadge: 'Zero Virgin Cotton',
    description: 'Crafted from vintage deadstock denim roll ends, cutting water footprint by 80%.',
    styleTags: ['streetwear', 'vintage', 'everyday']
  },
  {
    id: 'prod-5',
    name: 'Organic Linen Camp Collar Shirt',
    category: 'tops',
    price: 75,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80',
    materials: ['100% GOTS Certified French Linen'],
    sustainabilityBadge: 'Biodegradable',
    description: 'Breathable, relaxed camp collar shirt woven with rainwater-fed flax.',
    styleTags: ['summer', 'vacation', 'smart-casual', 'minimalist']
  },
  {
    id: 'prod-6',
    name: 'Piñatex Pineapple Leather Crossbody',
    category: 'accessories',
    price: 85,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80',
    materials: ['Piñatex® (Pineapple Leaf Fiber)', 'Organic Cotton Lining'],
    sustainabilityBadge: 'Cruelty-Free Vegan',
    description: 'Plant-based leather alternative made from upcycled agricultural pineapple leaves.',
    styleTags: ['accessories', 'modern', 'statement']
  }
];