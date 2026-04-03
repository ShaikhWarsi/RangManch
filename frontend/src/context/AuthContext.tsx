'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, isDemoMode } from '../firebase/config';

// TypeScript interfaces
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  role?: string;
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

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Demo authentication functions for when Firebase is not configured
const demoAuth = {
  async signup(email: string, password: string, userData: any): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      uid: Math.random().toString(36).substring(7),
      email,
      displayName: userData.name || email,
      role: userData.role || 'buyer',
      ...userData
    };
  },

  async login(email: string, password: string): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      uid: Math.random().toString(36).substring(7),
      email,
      displayName: email.split('@')[0],
      role: email.includes('artisan') ? 'artisan' : email.includes('ngo') ? 'ngo' : 'buyer'
    };
  },

  async logout(): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
  }
};

// AuthProvider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to use real Firebase first
        if (auth && !isDemoMode) {
          // Real Firebase mode
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              const firebaseUser: User = {
                uid: user.uid,
                email: user.email || '',
                displayName: user.displayName || user.email?.split('@')[0],
                role: 'buyer' // Default role, could be stored in Firestore
              };
              setCurrentUser(firebaseUser);
              setUserRole(firebaseUser.role || 'buyer');
            } else {
              setCurrentUser(null);
              setUserRole(null);
            }
            setLoading(false);
          });

          return () => unsubscribe();
        } else {
          // Demo mode - use imported flag
          const savedUser = localStorage.getItem('currentUser');
          if (savedUser) {
            const user = JSON.parse(savedUser);
            setCurrentUser(user);
            setUserRole(user.role || 'buyer');
          }
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Sign up function
  const signup = async (email: string, password: string, userData: any): Promise<void> => {
    try {
      if (isDemoMode) {
        // Demo mode signup
        const user = await demoAuth.signup(email, password, userData);
        setCurrentUser(user);
        setUserRole(user.role || 'buyer');
        localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
        // Real Firebase signup
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser: User = {
          uid: userCredential.user.uid,
          email: userCredential.user.email || '',
          displayName: userData.name || userCredential.user.email?.split('@')[0],
          role: userData.role || 'buyer',
          ...userData
        };
        setCurrentUser(firebaseUser);
        setUserRole(firebaseUser.role || 'buyer');
      }
    } catch (error) {
      // Signup error
      throw error;
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    try {
      if (isDemoMode) {
        // Demo mode login
        const demoUser = await demoAuth.login(email, password);
        setCurrentUser(demoUser);
        setUserRole(demoUser.role || 'buyer');
        localStorage.setItem('currentUser', JSON.stringify(demoUser));
      } else {
        // Real Firebase login
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser: User = {
          uid: userCredential.user.uid,
          email: userCredential.user.email || '',
          displayName: userCredential.user.displayName || userCredential.user.email?.split('@')[0],
          role: 'buyer' // Could be fetched from Firestore
        };
        setCurrentUser(firebaseUser);
        setUserRole(firebaseUser.role || 'buyer');
      }
    } catch (error) {
      // Login error
      throw error;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      if (isDemoMode) {
        // Demo mode logout
        await demoAuth.logout();
        localStorage.removeItem('currentUser');
      } else {
        // Real Firebase logout
        await signOut(auth);
      }
      setCurrentUser(null);
      setUserRole(null);
    } catch (error) {
      // Logout error
      throw error;
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
