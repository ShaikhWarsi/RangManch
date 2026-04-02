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

class DatabaseService {
  private mongoUri: string;
  private client: any = null;
  private db: any = null;

  constructor() {
    this.mongoUri = process.env.MONGODB_URL || 'mongodb://localhost:27017/rangmanch';
  }

  async connect() {
    if (this.client) return this.db;
    
    try {
      // For browser compatibility, use fetch-based approach
      const response = await fetch('/api/mongodb-connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      this.db = data.db;
      console.log('✅ Connected to MongoDB');
      return this.db;
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      throw error;
    }
  }

  // Order Operations
  async createOrder(order: Order): Promise<Order> {
    const db = await this.connect();
    const newOrder = {
      ...order,
      _id: order._id || new Date().getTime().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // For browser compatibility, use API endpoint
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    });
    
    const result = await response.json();
    return result;
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    const db = await this.connect();
    
    // For browser compatibility, use API endpoint
    const response = await fetch(`/api/orders/user/${userId}`);
    const orders = await response.json();
    return orders;
  }

  async updateOrderStatus(orderId: string, status: string): Promise<Order | null> {
    const db = await this.connect();
    
    // For browser compatibility, use API endpoint
    const response = await fetch(`/api/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, updatedAt: new Date() })
    });
    
    const result = await response.json();
    return result;
  }

  // Product Operations
  async getProducts(filters: {
    category?: string;
    craft?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    artisanId?: string;
    verified?: boolean;
  } = {}): Promise<Product[]> {
    const db = await this.connect();
    const query: any = {};
    
    if (filters.category) query.category = filters.category;
    if (filters.craft) query.craft = filters.craft;
    if (filters.minPrice) query.price = { $gte: filters.minPrice };
    if (filters.maxPrice) query.price = { $lte: filters.maxPrice };
    if (filters.search) query.$text = { $search: filters.search };
    if (filters.artisanId) query.artisanId = filters.artisanId;
    if (filters.verified !== undefined) query.verified = filters.verified;
    
    // For browser compatibility, use API endpoint
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filters })
    });
    
    const products = await response.json();
    return products;
  }

  async getProductById(id: string): Promise<Product | null> {
    const db = await this.connect();
    
    // For browser compatibility, use API endpoint
    const response = await fetch(`/api/products/${id}`);
    const product = await response.json();
    return product;
  }

  // Artisan Operations
  async getArtisans(filters: {
    craft?: string;
    location?: string;
    verified?: boolean;
    search?: string;
  } = {}): Promise<Artisan[]> {
    const db = await this.connect();
    const query: any = {};
    
    if (filters.craft) query.craft = filters.craft;
    if (filters.location) query.location = filters.location;
    if (filters.verified !== undefined) query.verified = filters.verified;
    if (filters.search) query.$text = { $search: filters.search };
    
    // For browser compatibility, use API endpoint
    const response = await fetch('/api/artisans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filters })
    });
    
    const artisans = await response.json();
    return artisans;
  }

  async getArtisanById(id: string): Promise<Artisan | null> {
    const db = await this.connect();
    
    // For browser compatibility, use API endpoint
    const response = await fetch(`/api/artisans/${id}`);
    const artisan = await response.json();
    return artisan;
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
