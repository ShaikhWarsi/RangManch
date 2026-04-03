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
  customer?: {
    name: string;
    email: string;
    contact: string;
  };
  razorpayOrderId?: string;
}

export interface CartContextType {
  cartItems: CartItem[];
  orders: Order[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  checkout: (paymentMethod: 'razorpay' | 'cod', customerDetails?: any) => Promise<Order | null>;
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
      // Cart load error
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      localStorage.setItem('orders', JSON.stringify(orders));
    } catch (error) {
      // Cart save error
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

  // Checkout - Async function with payment method support
  const checkout = async (paymentMethod: 'razorpay' | 'cod' = 'cod', customerDetails?: any): Promise<Order | null> => {
    if (cartItems.length === 0) return null;

    try {
      const total = getTotalPrice();
      const newOrder: Order = {
        id: `order_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        items: [...cartItems],
        total,
        date: new Date().toISOString(),
        status: paymentMethod === 'cod' ? 'pending' : 'payment_pending',
        paymentMethod,
        shippingAddress: customerDetails?.address || 'Default Address',
        customer: {
          name: customerDetails?.name || 'Guest',
          email: customerDetails?.email || 'guest@example.com',
          contact: customerDetails?.phone || '0000000000'
        }
      };

      // For demo purposes, save to localStorage immediately for COD
      if (paymentMethod === 'cod') {
        const updatedOrders = [...orders, newOrder];
        setOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));

        // Sync with backend
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://yamxxx1-artisan.hf.space/api';
        try {
          await fetch(`${API_BASE}/orders/cod`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              order_id: newOrder.id,
              amount: total,
              currency: 'INR',
              customer_name: newOrder.customer?.name,
              customer_email: newOrder.customer?.email,
              customer_contact: newOrder.customer?.contact,
              products: cartItems.map(item => ({
                id: item.id,
                name: item.name || item.title,
                quantity: item.quantity || 1,
                price: item.price
              })),
              payment_method: 'cod'
            })
          });
        } catch (e) {
          console.log('Backend sync failed, order saved locally');
        }

        // Clear cart after successful order
        setCartItems([]);
        localStorage.setItem('cart', JSON.stringify([]));
        console.log('COD Order created successfully:', newOrder);
        return newOrder;
      }

      // For Razorpay, create order in backend first
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://yamxxx1-artisan.hf.space/api';
      const response = await fetch(`${API_BASE}/orders/create-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          currency: 'INR',
          receipt: newOrder.id,
          customer_name: newOrder.customer?.name,
          customer_email: newOrder.customer?.email,
          products: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
          }))
        })
      });

      if (response.ok) {
        const data = await response.json();
        const razorpayOrder = data.order;
        const keyId = data.keyId;
        
        // Store order locally
        const updatedOrders = [...orders, { ...newOrder, razorpayOrderId: razorpayOrder.id }];
        setOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        
        // Clear cart
        setCartItems([]);
        localStorage.setItem('cart', JSON.stringify([]));
        
        console.log('Razorpay Order created:', razorpayOrder);
        return { ...newOrder, razorpayOrderId: razorpayOrder.id, razorpayKeyId: keyId } as any;
      } else {
        throw new Error('Failed to create Razorpay order');
      }

    } catch (error) {
      console.error('Checkout error:', error);
      return null;
    }
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
