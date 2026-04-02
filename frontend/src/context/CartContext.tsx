'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';

// TypeScript interfaces
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
  artisan?: string;
  [key: string]: any;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: string;
  shippingAddress?: string;
  paymentMethod?: string;
}

export interface CartContextType {
  cartItems: CartItem[];
  orders: Order[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  checkout: () => Order | null;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// CartProvider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      const savedCart = localStorage.getItem('cart');
      const savedOrders = localStorage.getItem('orders');
      
      if (savedCart) setCartItems(JSON.parse(savedCart));
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    } catch (error) {
      console.error('Error loading cart data:', error);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      localStorage.setItem('orders', JSON.stringify(orders));
    } catch (error) {
      console.error('Error saving cart data:', error);
    }
  }, [cartItems, orders]);

  // Add item to cart
  const addToCart = (item: CartItem): void => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (id: string): void => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Update item quantity
  const updateQuantity = (id: string, quantity: number): void => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = (): void => {
    setCartItems([]);
  };

  // Checkout
  const checkout = (): Order | null => {
    if (cartItems.length === 0) return null;

    const newOrder: Order = {
      id: `order_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      items: [...cartItems],
      total: getTotalPrice(),
      date: new Date().toISOString(),
      status: 'pending',
      shippingAddress: 'Default Address',
      paymentMethod: 'COD'
    };

    setOrders(prevOrders => [...prevOrders, newOrder]);
    clearCart();
    
    return newOrder;
  };

  // Get total price
  const getTotalPrice = (): number => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Get total items
  const getTotalItems = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value: CartContextType = {
    cartItems,
    orders,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    checkout,
    getTotalPrice,
    getTotalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
