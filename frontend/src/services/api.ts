// API service for connecting to the backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  artisanId: string;
  images: string[];
  inStock: boolean;
  rating?: number;
  reviews?: Array<{
    userId: string;
    rating: number;
    comment: string;
    createdAt: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface Artisan {
  _id: string;
  name: string;
  email: string;
  craft: string;
  location: string;
  experience: string;
  story: string;
  image: string;
  rating: number;
  products: number;
  verified: boolean;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  error?: string;
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit, retries = 2): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        signal: controller.signal,
        ...options,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      // Don't log to console for expected network errors
      if (error instanceof Error && 
          (error.name === 'AbortError' || 
           error.message.includes('fetch') || 
           error.message.includes('Failed to fetch') ||
           error.message.includes('NetworkError'))) {
        // Silent fail for network errors - will fall back to mock data
        throw new Error('Network error - using mock data');
      }
      
      // Silent fail for expected errors
      throw error;
    }
  }

  // Product endpoints
  async getProducts(page = 1, limit = 10): Promise<ApiResponse<Product[]>> {
    try {
      return await this.request<Product[]>(`/products?page=${page}&limit=${limit}`);
    } catch (error) {
      // Using mock data fallback
      return {
        success: true,
        data: mockProducts,
        error: 'Using mock data due to API failure'
      };
    }
  }

  async getProduct(id: string): Promise<ApiResponse<Product>> {
    try {
      return await this.request<Product>(`/products/${id}`);
    } catch (error) {
      // Using mock data fallback
      const product = mockProducts.find(p => p._id === id);
      if (!product) {
        throw new Error('Product not found');
      }
      return {
        success: true,
        data: product,
        error: 'Using mock data due to API failure'
      };
    }
  }

  async getProductsByArtisan(artisanId: string, page = 1, limit = 10): Promise<ApiResponse<Product[]>> {
    try {
      return await this.request<Product[]>(`/products/artisan/${artisanId}?page=${page}&limit=${limit}`);
    } catch (error) {
      // Using mock data fallback
      return {
        success: true,
        data: mockProducts.filter(p => p.artisanId === artisanId),
        error: 'Using mock data due to API failure'
      };
    }
  }

  async createProduct(productData: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Product>> {
    try {
      return await this.request<Product>('/products', {
        method: 'POST',
        body: JSON.stringify(productData),
      });
    } catch (error) {
      // Failed to create product
      throw error;
    }
  }

  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    try {
      return await this.request<void>(`/products/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      // Failed to delete product
      throw error;
    }
  }

  async addProductReview(id: string, review: { rating: number; comment: string }): Promise<ApiResponse<Product>> {
    try {
      return await this.request<Product>(`/products/${id}/reviews`, {
        method: 'POST',
        body: JSON.stringify(review),
      });
    } catch (error) {
      // Failed to add product review
      throw error;
    }
  }

  // Artisan endpoints (using states endpoint for now since it exists)
  async getArtisans(page = 1, limit = 10): Promise<ApiResponse<any[]>> {
    try {
      return await this.request<any[]>(`/states?page=${page}&limit=${limit}`);
    } catch (error) {
      // Using mock data fallback
      return {
        success: true,
        data: mockArtisans,
        error: 'Using mock data due to API failure'
      };
    }
  }

  async getArtisan(id: string): Promise<ApiResponse<any>> {
    try {
      return await this.request<any>(`/states/${id}`);
    } catch (error) {
      // Using mock data fallback
      const artisan = mockArtisans.find(a => a._id === id);
      if (!artisan) {
        throw new Error('Artisan not found');
      }
      return {
        success: true,
        data: artisan,
        error: 'Using mock data due to API failure'
      };
    }
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return await response.json();
    } catch (error) {
      // Health check failed
      // Return fallback health status
      return {
        status: 'degraded',
        timestamp: new Date().toISOString()
      };
    }
  }
}

export const apiService = new ApiService();

// Mock data fallback for development
export const mockProducts: Product[] = [
  {
    _id: '1',
    name: 'Handwoven Silk Saree',
    description: 'Traditional Banarasi silk saree with intricate gold zari work',
    price: 15000,
    category: 'Textiles',
    artisanId: 'artisan1',
    images: ['https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=400&h=600&fit=crop'],
    inStock: true,
    rating: 4.5,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    _id: '2',
    name: 'Brass Diya Set',
    description: 'Handcrafted brass diyas with traditional engravings',
    price: 1200,
    category: 'Home Decor',
    artisanId: 'artisan2',
    images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop'],
    inStock: true,
    rating: 4.8,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

export const mockArtisans: Artisan[] = [
  {
    _id: 'artisan1',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    craft: 'Banarasi Weaving',
    location: 'Varanasi, Uttar Pradesh',
    experience: '25 years',
    story: 'Learned from my father, who learned from his. This craft runs in our blood.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    rating: 4.7,
    products: 45,
    verified: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    _id: 'artisan2',
    name: 'Meera Patel',
    email: 'meera@example.com',
    craft: 'Brass Crafting',
    location: 'Jaipur, Rajasthan',
    experience: '15 years',
    story: 'Preserving the traditional art of brass crafting for future generations.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
    rating: 4.9,
    products: 32,
    verified: true,
    createdAt: '2024-01-01T00:00:00Z',
  },
];
