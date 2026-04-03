// API service for connecting to the backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://yamxxx1-artisan.hf.space/api/v1';

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
        showNetworkErrorToast('Network error - using offline mode');
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

  // Subscribe to newsletter
  async subscribe(email: string): Promise<ApiResponse<{ email: string; subscribed: boolean }>> {
    try {
      return await this.request<{ email: string; subscribed: boolean }>('/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
    } catch (error) {
      throw error;
    }
  }
}

export const apiService = new ApiService();

// Network error toast function
let toastContainer: HTMLDivElement | null = null;

const showNetworkErrorToast = (message: string) => {
  if (typeof window === 'undefined') return;
  
  // Remove existing toast
  if (toastContainer) {
    toastContainer.remove();
  }
  
  // Create new toast
  toastContainer = document.createElement('div');
  toastContainer.className = 'fixed top-4 right-4 z-[2000] bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg animate-in fade-in slide-in-from-right-2';
  toastContainer.innerHTML = `
    <div class="flex items-center gap-3">
      <div class="flex-1">
        <p class="font-ui text-sm font-medium">${message}</p>
      </div>
      <button onclick="this.parentElement.parentElement.remove()" class="p-1 hover:bg-white/20 rounded-full transition-colors" aria-label="Close notification">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
  `;
  
  document.body.appendChild(toastContainer);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    if (toastContainer && toastContainer.parentNode) {
      toastContainer.remove();
      toastContainer = null;
    }
  }, 3000);
};

// Mock data fallback for development
export const mockProducts: Product[] = [
  {
    _id: '1',
    name: 'Banarasi Silk Kashi Ghat Saree',
    description: 'Traditional Banarasi silk saree with intricate gold and silver zari work, featuring the iconic Kashi Ghat motifs. Each saree takes 45+ days to complete.',
    price: 15000,
    category: 'Textiles',
    craft: 'Banarasi Weaving',
    artisanId: 'artisan1',
    images: ['https://tilfi.com/cdn/shop/products/KOH0003Red_Kashi_PureKatanSilkKashiGhatSaree3_1200x.jpg?v=1689252962?w=500&h=500&fit=crop'],
    inStock: true,
    rating: 4.9,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    _id: '2',
    name: 'Kundan Meena Necklace Set',
    description: 'Ancient form of Indian gemstone jewelry involving a gem set with gold foil between the stones and its mount. This set features traditional Meenakari work on the reverse.',
    price: 12500,
    category: 'Jewelry',
    craft: 'Kundan Meenakari',
    artisanId: 'artisan2',
    images: ['https://p2.piqsels.com/preview/272/26/538/gold-bahraini-gold-bahrain-jewelry.jpg?w=400&h=400&fit=crop'],
    inStock: true,
    rating: 4.8,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    _id: '3',
    name: 'Jaipur Blue Pottery Vase',
    description: 'Traditional blue pottery from Jaipur, made using a unique dough consisting of quartz stone powder, powdered glass, and multani mitti. Characterized by vibrant blue and green dyes.',
    price: 2800,
    category: 'Pottery',
    craft: 'Blue Pottery',
    artisanId: 'artisan1',
    images: ['https://www.intenseindiatours.com/wp-content/uploads/2018/01/Blue-Pottery.jpg?w=400&h=400&fit=crop'],
    inStock: true,
    rating: 4.7,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    _id: '4',
    name: 'Dhokra Metal Art Sculpture',
    description: 'Non-ferrous metal casting using the lost-wax casting technique, used in India for over 4,000 years. This piece represents a tribal harvest festival.',
    price: 5900,
    category: 'Home Decor',
    craft: 'Dhokra Art',
    artisanId: 'artisan2',
    images: ['https://housenama.com/cdn/shop/articles/the-art-of-dhokra-handmadeinindia-housenama.jpg?v=1720862777?w=400&h=400&fit=crop'],
    inStock: true,
    rating: 4.9,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    _id: '5',
    name: 'Hand-Block Printed Silk Cushion',
    description: 'Luxurious silk cushion covers featuring intricate hand-block printing from the Bagru region of Rajasthan. Uses natural vegetable dyes.',
    price: 1800,
    category: 'Home Decor',
    craft: 'Block Print',
    artisanId: 'artisan1',
    images: ['https://5.imimg.com/data5/SELLER/Default/2022/9/YC/XE/XZ/47158951/hand-block-printed-cushion-cover.jpeg?w=400&h=400&fit=crop'],
    inStock: true,
    rating: 4.6,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    _id: '6',
    name: 'Kanjivaram Pure Silk Saree',
    description: 'Woven in the Kanchipuram region of Tamil Nadu, these are famous for their vibrant colors and heavy temple borders with pure mulberry silk.',
    price: 18500,
    category: 'Textiles',
    craft: 'Kanjivaram Weaving',
    artisanId: 'artisan2',
    images: ['https://i.pinimg.com/736x/c6/c6/a9/c6c6a97b887cc64b80b51e06ddb571df.jpg?w=500&h=500&fit=crop'],
    inStock: true,
    rating: 4.9,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  }
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
