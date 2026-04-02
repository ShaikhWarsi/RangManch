const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3001/api/auth';

export interface AuthUser {
  email: string;
  role: 'buyer' | 'artisan' | 'ngo';
  displayName?: string;
  isDemoAccount?: boolean;
  uid?: string;
}

export interface DemoAccountInfo {
  role: string;
  email: string;
  displayName: string;
}

class AuthService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${AUTH_API_URL}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Authentication failed');
    }

    return data;
  }

  async signup(email: string, password: string, userData: { name?: string; role?: string }): Promise<any> {
    return this.request('/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, userData }),
    });
  }

  async login(email: string, password: string): Promise<any> {
    return this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async logout(): Promise<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    return this.request('/logout', {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  async getSession(): Promise<any> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (!token) {
      throw new Error('No session token');
    }
    return this.request('/session', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getDemoAccounts(): Promise<{ success: boolean; demoAccounts: DemoAccountInfo[] }> {
    return this.request('/demo-accounts');
  }
}

export const authService = new AuthService();
export default authService;
