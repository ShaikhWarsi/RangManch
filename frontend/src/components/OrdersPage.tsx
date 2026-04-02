'use client'

import React from "react";
import { useCart } from "../context/CartContext";
import { Footer } from "../components/Footer";
import IndianNavbarFixed from "../components/IndianNavbarFixed";
import { useRouter } from 'next/navigation';
import {
  Package,
  ShoppingBag,
  CheckCircle,
  ArrowLeft,
  Sparkles
} from "lucide-react";

interface OrderItem {
  id?: string;
  name?: string;
  title?: string;
  img?: string;
  image?: string;
  price: number;
  quantity?: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  date: string;
  status: string;
}

export const OrdersPage: React.FC = () => {
  const { orders } = useCart();
  const router = useRouter();

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
      style: "currency",
      currency: "INR"
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-ivory font-body text-walnut">
      <IndianNavbarFixed />

      <div className="relative pt-32 pb-16 bg-walnut text-ivory overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1589578527966-04d7c15ad48a?w=1600&h=400&fit=crop"
            alt="Heritage"
            className="w-full h-full object-cover grayscale loading=lazy"
          />
        </div>

        <div className="max-w-7xl mx-auto px-8 relative flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h1 className="text-5xl md:text-6xl font-heading mb-4 tracking-tight-editorial">
              Your Collection
            </h1>
            <p className="text-lg text-ivory/60 italic font-heading">
              Archiving your journey through Indian craftsmanship.
            </p>
          </div>

          <button
            onClick={() => router.push("/trade")}
            className="group flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all text-sm font-ui font-bold uppercase tracking-widest"
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            Continue Discovering
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-20">
        {orders.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[40px] border border-sand/10 shadow-premium">
            <div className="w-24 h-24 rounded-full bg-sand/5 flex items-center justify-center text-sand mx-auto mb-8">
              <Package size={48} strokeWidth={1} />
            </div>
            <h2 className="text-3xl font-heading text-walnut mb-4">No Orders Yet</h2>
            <p className="text-walnut/40 font-ui text-sm mb-12 max-w-md mx-auto">
              Your personal archive of authentic Indian heritage is waiting to be started.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => router.push("/trade")}
                className="px-12 py-4 bg-maroon text-ivory rounded-full font-ui font-bold text-sm shadow-premium hover:bg-walnut transition-all uppercase tracking-widest"
              >
                Browse Artisans
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            {orders.map((order: Order) => (
              <div
                key={order.id}
                className="bg-white rounded-[32px] overflow-hidden border border-sand/10 shadow-premium group animate-in fade-in slide-in-from-bottom-4"
              >
                <div className="px-10 py-8 bg-ivory/20 border-b border-sand/10 flex flex-wrap justify-between items-center gap-6">
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-ui font-bold uppercase tracking-widest text-walnut/30 mb-1">
                        Acquisition ID
                      </span>
                      <span className="font-ui font-bold text-sm text-walnut">
                        #{order.id.slice(-8).toUpperCase()}
                      </span>
                    </div>
                    <div className="w-px h-8 bg-sand/20" />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-ui font-bold uppercase tracking-widest text-walnut/30 mb-1">
                        Date Archived
                      </span>
                      <span className="font-ui font-bold text-sm text-walnut">
                        {new Date(order.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-teal/5 text-teal rounded-full border border-teal/10">
                      <CheckCircle size={14} />
                      <span className="text-[10px] font-ui font-bold uppercase tracking-widest">
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-10 py-4">
                  {order.items.map((item: OrderItem, idx: number) => (
                    <div key={idx} className="flex gap-8 py-8 border-b last:border-0 border-sand/10">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden bg-sand/5 border border-sand/10 flex-shrink-0">
                        <img
                          src={item.img || item.image}
                          alt={item.name || item.title || "Product"}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 loading=lazy"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-xl font-heading text-walnut">
                            {item.name || item.title}
                          </h4>
                          <span className="text-lg font-heading text-maroon">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-ui text-walnut/40 uppercase tracking-widest">
                          <span>Quantity: {item.quantity || 1}</span>
                          <span className="w-1 h-1 rounded-full bg-sand" />
                          <span className="flex items-center gap-1 text-gold">
                            <Sparkles size={12} /> Authentic Piece
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-10 py-8 bg-ivory/10 border-t border-sand/10 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-[10px] font-ui font-bold uppercase tracking-widest text-walnut/30">
                    <ShoppingBag size={14} className="text-gold" />
                    Total Acquisition Value
                  </div>
                  <div className="text-3xl font-heading font-bold text-walnut">
                    {formatPrice(order.total)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default OrdersPage;