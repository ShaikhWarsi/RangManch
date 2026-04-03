'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useCart } from "../context/CartContext";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Sparkles
} from "lucide-react";

interface CartItem {
  id: string | number;
  name?: string;
  title?: string;
  img?: string;
  image?: string;
  price: number;
  quantity?: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id?: string;
  image?: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
}

interface RazorpayResponse {
  razorpay_payment_id?: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

interface RazorpayInstance {
  open: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, checkout } = useCart();
  const router = useRouter();

  const handleCheckout = async (): Promise<void> => {
    const total = getTotalPrice();

    if (total === 0) {
      alert("Cart is empty!");
      return;
    }

    try {
      if (!window.Razorpay) {
        throw new Error("Razorpay not loaded");
      }

      // 1. Create order in backend and get keyId + orderId
      const order = await checkout('razorpay');
      
      if (!order || !(order as any).razorpayKeyId) {
        throw new Error("Razorpay not configured or not loaded");
      }

      const razorpayKey = (order as any).razorpayKeyId;
      const razorpayOrderId = (order as any).razorpayOrderId;

      // 2. Open Razorpay checkout
      const options: RazorpayOptions = {
        key: razorpayKey,
        amount: total * 100,
        currency: "INR",
        name: "Rangmanch",
        description: "Authentic Cultural Heritage Purchase",
        order_id: razorpayOrderId,
        image: "https://example.com/your_logo",
        handler: function (_response: RazorpayResponse) {
          // Payment processed successfully
          onClose();
          router.push("/orders");
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#6B1F2B"
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
      
    } catch (error) {
      console.warn("Switching to manual/COD checkout fallback:", error);
      
      // Graceful fallback UI - Manual/COD Confirmation
      if (typeof window !== 'undefined') {
        const fallbackMessage = `
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          🏺 RANGMANCH HERITAGE MARKETPLACE
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          
          Payment Gateway (Razorpay) is currently unavailable 
          or not configured in this environment.
          
          Would you like to proceed with manual confirmation?
          
          • Order Total: ₹${total.toLocaleString('en-IN')}
          • Artisan Heritage Items: ${cartItems.length}
          
          Your order supports traditional Indian artisans
          and preserves cultural heritage techniques.
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        `;
        
        if (window.confirm(fallbackMessage)) {
          checkout('cod').then(order => {
            if (order) {
              onClose();
              router.push("/orders");
            }
          });
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-walnut/60 backdrop-blur-sm z-[999] animate-in fade-in duration-300"
      />

      <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-premium z-[1000] flex flex-col animate-in slide-in-from-right duration-500">
        <div className="flex justify-between items-center px-8 py-6 border-b border-sand/10 bg-ivory/20">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-maroon" size={20} />
            <h2 className="text-xl font-heading font-bold text-walnut">
              Your Collection <span className="text-sm font-ui text-walnut/40 ml-1">({cartItems.length})</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-sand/10 rounded-full transition-colors text-walnut/40 hover:text-walnut"
          >
            <X size={24} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
            <div className="w-24 h-24 rounded-full bg-sand/5 flex items-center justify-center text-sand mb-6">
              <ShoppingBag size={40} strokeWidth={1} />
            </div>
            <h3 className="text-2xl font-heading text-walnut mb-2">The Archive is Empty</h3>
            <p className="text-walnut/40 font-ui text-sm mb-10">
              Start adding India&apos;s finest crafts to your personal collection.
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-maroon text-ivory rounded-sm font-ui font-bold text-xs uppercase tracking-widest shadow-premium hover:bg-walnut transition-all"
            >
              Discover Crafts
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-8">
              {cartItems.map((item: CartItem) => (
                <div
                  key={item.id}
                  className="flex gap-6 py-8 border-b border-sand/10 group animate-in fade-in slide-in-from-bottom-2"
                >
                  <div className="w-24 h-24 rounded-md overflow-hidden bg-sand/5 border border-sand/10 shrink-0">
                    <img
                      src={item.image || item.img || "https://images.unsplash.com/photo-1518644749705-54458630c263?w=200&h=200&fit=crop"}
                      alt={item.name || item.title || "Product"}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-sm font-heading font-bold text-walnut leading-tight pr-4">
                        {item.name || item.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(String(item.id))}
                        className="text-walnut/20 hover:text-maroon transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <p className="text-maroon font-heading font-bold mb-4">
                      ₹{(item.price || 0).toLocaleString()}
                    </p>

                    <div className="flex items-center gap-4 mt-auto">
                      <div className="flex items-center bg-sand/5 border border-sand/10 rounded-full px-2 py-1">
                        <button
                          onClick={() => updateQuantity(String(item.id), (item.quantity || 1) - 1)}
                          className="p-1 text-walnut/40 hover:text-walnut transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-xs font-ui font-bold text-walnut">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => updateQuantity(String(item.id), (item.quantity || 1) + 1)}
                          className="p-1 text-walnut/40 hover:text-walnut transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 bg-ivory/20 border-t border-sand/10">
              <div className="flex justify-between items-center mb-8">
                <div className="text-xs font-ui font-bold uppercase tracking-widest text-walnut/40">
                  Total Valuation
                </div>
                <div className="text-2xl font-heading font-bold text-maroon">
                  ₹{getTotalPrice().toLocaleString()}
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-maroon text-ivory rounded-sm font-ui font-bold text-sm shadow-premium hover:bg-walnut transition-all flex items-center justify-center gap-3 mb-4"
              >
                Proceed to Acquisition
                <ArrowRight size={18} />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-ui font-bold uppercase tracking-widest text-walnut/30">
                <Sparkles size={12} className="text-gold" />
                Supporting authentic craftsmanship
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;