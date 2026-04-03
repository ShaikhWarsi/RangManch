// Browser-compatible MongoDB import
// import { MongoClient } from 'mongodb';

interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  craft: string;
  artisanId?: string;
  images?: string[];
  tags?: string[];
  stock?: number;
  rating?: number;
  reviews?: number;
  verified?: boolean;
}

interface Artisan {
  _id?: string;
  name: string;
  craft: string;
  experience: string;
  story: string;
  image: string;
  rating: number;
  totalProducts: number;
  approvedProducts: number;
  contact: {
    email: string;
    phone: string;
    preferredTime: string;
  };
  specialties: string[];
  languages: string[];
  verified: boolean;
  location: string;
}

interface Order {
  _id?: string;
  amount: number;
  currency: string;
  receipt: string;
  notes: string;
  customer: {
    name: string;
    email: string;
    contact: string;
  };
  products: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt?: Date;
  updatedAt?: Date;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class DatabaseService {
  private static instance: DatabaseService;
  private apiUrl: string;

  private constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://yamxxx1-artisan.hf.space/api/v1';
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  // Browser-compatible database operations using fetch API
  async getProducts(filters: {
    category?: string;
    craft?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    artisanId?: string;
    verified?: boolean;
  } = {}): Promise<Product[]> {
    try {
      const response = await fetch(`${this.apiUrl}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filters })
      });
      
      const result: ApiResponse<Product[]> = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Get products error:', error);
      return [];
    }
  }

  async getProductById(id: string): Promise<Product | null> {
    try {
      const response = await fetch(`${this.apiUrl}/products/${id}`);
      const result: ApiResponse<Product> = await response.json();
      return result.data || null;
    } catch (error) {
      console.error('Get product error:', error);
      return null;
    }
  }

  async getArtisans(filters: {
    craft?: string;
    location?: string;
    verified?: boolean;
    search?: string;
  } = {}): Promise<Artisan[]> {
    try {
      const response = await fetch(`${this.apiUrl}/artisans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filters })
      });
      
      const result: ApiResponse<Artisan[]> = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Get artisans error:', error);
      return [];
    }
  }

  async getArtisanById(id: string): Promise<Artisan | null> {
    try {
      const response = await fetch(`${this.apiUrl}/artisans/${id}`);
      const result: ApiResponse<Artisan> = await response.json();
      return result.data || null;
    } catch (error) {
      console.error('Get artisan error:', error);
      return null;
    }
  }

  async createOrder(order: Order): Promise<Order | null> {
    try {
      const response = await fetch(`${this.apiUrl}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      
      const result: ApiResponse<Order> = await response.json();
      return result.data || null;
    } catch (error) {
      console.error('Create order error:', error);
      return null;
    }
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    try {
      const response = await fetch(`${this.apiUrl}/orders/user/${userId}`);
      const result: ApiResponse<Order[]> = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Get user orders error:', error);
      return [];
    }
  }

  async updateOrderStatus(orderId: string, status: string): Promise<Order | null> {
    try {
      const response = await fetch(`${this.apiUrl}/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, updatedAt: new Date() })
      });
      
      const result: ApiResponse<Order> = await response.json();
      return result.data || null;
    } catch (error) {
      console.error('Update order error:', error);
      return null;
    }
  }

  async searchProductsAndArtisans(query: string): Promise<{
    products: Product[];
    artisans: Artisan[];
  }> {
    const [products, artisans] = await Promise.all([
      this.getProducts({ search: query }),
      this.getArtisans({ search: query })
    ]);
    
    return { products, artisans };
  }
}

export default DatabaseService;
