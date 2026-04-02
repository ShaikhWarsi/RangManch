export interface Review {
  user: string;
  comment: string;
  rating: number;
  date?: string;
}

export interface Product {
  _id?: string;
  id?: string; // fallback for mock data
  name: string;
  price: string | number;
  category: string;
  description: string;
  material?: string;
  craftsmanship?: string;
  imageUrl: string;
  inStock: boolean;
  quantity: number;
  artisanId?: string;
  dateAdded?: string;
  salesCount?: number;
  reviews?: Review[];
}

export interface ArtisanInfo {
  id: number | string;
  name: string;
  title: string;
  location: string;
  craft: string;
  experience: string;
  story: string;
  image: string;
  rating: string | number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
}
