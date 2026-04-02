'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  role?: string;
  isDemoAccount?: boolean;
  [key: string]: any;
}

export interface AuthContextType {
  currentUser: User | null;
  userRole: string | null;
  loading: boolean;
  isDemoMode: boolean;
  signup: (email: string, password: string, userData: any) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const DEMO_ACCOUNTS = {
  buyer: {
    email: 'demo.buyer@rangmanch.in',
    password: 'demo123456',
    role: 'buyer',
    displayName: 'Demo Buyer'
  },
  artisan: {
    email: 'demo.artisan@rangmanch.in',
    password: 'demo123456',
    role: 'artisan',
    displayName: 'Demo Artisan'
  },
  ngo: {
    email: 'demo.ngo@rangmanch.in',
    password: 'demo123456',
    role: 'ngo',
    displayName: 'Demo NGO'
  }
};

const demoAuth = {
  async login(email: string, password: string): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const account = Object.values(DEMO_ACCOUNTS).find(acc => acc.email === email);
    if (account && account.password === password) {
      return {
        uid: Math.random().toString(36).substring(7),
        email: account.email,
        displayName: account.displayName,
        role: account.role,
        isDemoAccount: true
      };
    }
    throw new Error('Invalid demo credentials');
  },
  async logout(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300));
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
          const user = JSON.parse(savedUser);
          setCurrentUser(user);
          setUserRole(user.role || 'buyer');
          setIsDemoMode(user.isDemoAccount || true);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signup = async (email: string, password: string, userData: any): Promise<void> => {
    try {
      const response = await authService.signup(email, password, userData);
      if (response.success) {
        const user: User = {
          uid: response.user?.uid || Math.random().toString(36).substring(7),
          email: response.user?.email || email,
          displayName: response.user?.displayName || userData?.name || email.split('@')[0],
          role: response.user?.role || userData?.role || 'buyer',
          isDemoAccount: response.isDemoMode || false
        };
        setCurrentUser(user);
        setUserRole(user.role || 'buyer');
        setIsDemoMode(user.isDemoAccount || false);
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
    } catch (error) {
      throw error;
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await authService.login(email, password);
      if (response.success) {
        const user: User = {
          uid: response.user?.uid || Math.random().toString(36).substring(7),
          email: response.user?.email || email,
          displayName: response.user?.displayName || email.split('@')[0],
          role: response.user?.role || (email.includes('artisan') ? 'artisan' : email.includes('ngo') ? 'ngo' : 'buyer'),
          isDemoAccount: response.isDemoMode || false
        };
        setCurrentUser(user);
        setUserRole(user.role || 'buyer');
        setIsDemoMode(user.isDemoAccount || false);
        localStorage.setItem('currentUser', JSON.stringify(user));
        if (response.session?.access_token) {
          localStorage.setItem('authToken', response.session.access_token);
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
    } catch (error) {
      // Ignore logout errors
    } finally {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authToken');
      setCurrentUser(null);
      setUserRole(null);
      setIsDemoMode(true);
    }
  };

  const value: AuthContextType = {
    currentUser,
    userRole,
    loading,
    isDemoMode,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
