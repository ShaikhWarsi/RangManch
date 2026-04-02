'use client'

import React, { useState, useEffect } from "react";
import { Footer } from "../components/Footer";
import IndianNavbarFixed from "../components/IndianNavbarFixed";
import {
  CheckCircle,
  XCircle,
  Clock,
  Users,
  TrendingUp,
  ShieldCheck,
  Star,
  MapPin,
  History,
  Mail,
  AlertTriangle
} from "lucide-react";

interface Seller {
  id: number;
  name: string;
  title: string;
  location: string;
  craft: string;
  experience: string;
  story: string;
  image: string;
  rating: number;
  totalProducts: number;
  approvedProducts: number;
  pendingProducts: number;
  contact: {
    email: string;
    phone: string;
    preferredTime: string;
  };
  bankVerified: boolean;
  documentsVerified: boolean;
}

interface Product {
  id: string;
  sellerId: number;
  sellerName: string;
  name: string;
  price: string;
  category: string;
  description: string;
  material: string;
  submittedDate: string;
  status: "pending" | "approved" | "rejected";
  authenticityScore: number;
  estimatedValue: string;
  imageUrl: string;
  approvedDate?: string;
  rejectedDate?: string;
  rejectionReason?: string;
}

interface NGOInfo {
  id: number;
  name: string;
  hindiName: string;
  established: string;
  focus: string;
  region: string;
  verifiedArtisans: number;
  productsApproved: number;
  image: string;
  rating: number;
}

interface Stats {
  totalSellers: number;
  pendingProducts: number;
  approvedProducts: number;
  rejectedProducts: number;
  totalValue: number;
}

export const NGODashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("pending");
  const [products, setProducts] = useState<Product[]>([]);

  const ngoInfo: NGOInfo = {
    id: 1,
    name: "Virasat Sanrakshan Samiti",
    hindiName: "विरासत संरक्षण समिति",
    established: "1985",
    focus: "Handloom & Handicraft Preservation",
    region: "Pan India",
    verifiedArtisans: 4,
    productsApproved: 843,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop",
    rating: 4.8
  };

  const sellers: Seller[] = [
    {
      id: 1,
      name: "Monika Das",
      title: "Master Weaver",
      location: "Varanasi, UP",
      craft: "Banarasi Silk",
      experience: "35 years",
      story: "8th generation weaver preserving ancient Jamdani techniques",
      image: "https://static.wixstatic.com/media/4594f8_7057921b8d494498a115f1cab32a633f~mv2.jpg/v1/fill/w_568,h_482,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/4594f8_7057921b8d494498a115f1cab32a633f~mv2.jpg",
      rating: 4.9,
      totalProducts: 42,
      approvedProducts: 38,
      pendingProducts: 4,
      contact: { email: "monika.das@example.com", phone: "+91 98765 43210", preferredTime: "10 AM - 6 PM" },
      bankVerified: true,
      documentsVerified: true
    },
    {
      id: 2,
      name: "Lakshmi Ammal",
      title: "Kanjivaram Weaver",
      location: "Kanchipuram, TN",
      craft: "Silk Sarees",
      experience: "28 years",
      story: "Specializes in temple-inspired motifs using pure mulberry silk",
      image: "https://static.fibre2fashion.com//articleresources/images/105/10481/Cover-s_Small.jpg",
      rating: 4.8,
      totalProducts: 38,
      approvedProducts: 35,
      pendingProducts: 3,
      contact: { email: "lakshmi.ammal@example.com", phone: "+91 98765 43211", preferredTime: "9 AM - 5 PM" },
      bankVerified: true,
      documentsVerified: true
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      title: "Pottery Artist",
      location: "Jaipur, RJ",
      craft: "Blue Pottery",
      experience: "22 years",
      story: "Reviving Persian-influenced ceramic art with natural pigments",
      image: "https://media.assettype.com/homegrown/2024-10-24/qbq15gxz/WhatsApp-Image-2024-10-24-at-5.15.52-PM.jpeg",
      rating: 4.7,
      totalProducts: 56,
      approvedProducts: 48,
      pendingProducts: 8,
      contact: { email: "rajesh.kumar@example.com", phone: "+91 98765 43212", preferredTime: "11 AM - 7 PM" },
      bankVerified: false,
      documentsVerified: true
    },
    {
      id: 4,
      name: "Meena Devi",
      title: "Madhubani Artist",
      location: "Madhubani, BR",
      craft: "Madhubani Painting",
      experience: "18 years",
      story: "Preserving the ancient Mithila art form through natural dyes",
      image: "https://www.okhin.com/cdn/shop/articles/madhubani-painting-or-mithila-painting.jpg?v=1700467737",
      rating: 4.6,
      totalProducts: 28,
      approvedProducts: 22,
      pendingProducts: 6,
      contact: { email: "meena.devi@example.com", phone: "+91 98765 43213", preferredTime: "10 AM - 4 PM" },
      bankVerified: true,
      documentsVerified: false
    }
  ];

  const productsData: Product[] = [
    { id: "p1", sellerId: 1, sellerName: "Monika Das", name: "Kadhwa Banarasi Silk Saree", price: "12,999", category: "sarees", description: "Handwoven pure silk saree with intricate Kadhwa technique.", material: "Pure Katan Silk with Zari", submittedDate: "2024-03-15", status: "pending", authenticityScore: 94, estimatedValue: "15,000", imageUrl: "https://tilfi.com/cdn/shop/products/KOH0003Red_Kashi_PureKatanSilkKashiGhatSaree3_1200x.jpg" },
    { id: "p4", sellerId: 1, sellerName: "Monika Das", name: "Tanchoi Brocade Saree", price: "15,999", category: "sarees", description: "Exquisite Tanchoi weave saree with peacock motifs.", material: "Mulberry Silk", submittedDate: "2024-03-10", approvedDate: "2024-03-12", status: "approved", authenticityScore: 96, estimatedValue: "18,000", imageUrl: "https://www.unnatisilks.com/cdn/shop/articles/how-to-identify-a-tanchoi-saree.jpg" },
    { id: "p6", sellerId: 4, sellerName: "Meena Devi", name: "Madhubani Painting", price: "5,999", category: "handicrafts", description: "Traditional Madhubani painting on handmade paper.", material: "Natural dyes", submittedDate: "2024-03-05", rejectedDate: "2024-03-07", status: "rejected", rejectionReason: "Incomplete documentation", authenticityScore: 65, estimatedValue: "4,000", imageUrl: "https://www.okhin.com/cdn/shop/articles/madhubani-painting-or-mithila-painting.jpg" }
  ];

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const stats: Stats = {
    totalSellers: sellers.length,
    pendingProducts: products.filter(p => p.status === "pending").length,
    approvedProducts: products.filter(p => p.status === "approved").length,
    rejectedProducts: products.filter(p => p.status === "rejected").length,
    totalValue: products.reduce((sum, p) => sum + parseInt(p.price.replace(/,/g, '')), 0)
  };

  const handleApprove = (productId: string): void => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, status: "approved", approvedDate: new Date().toISOString().split('T')[0] } : p));
  };

  const handleReject = (productId: string): void => {
    const reason = prompt("Reason for rejection:");
    if (reason) {
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, status: "rejected", rejectedDate: new Date().toISOString().split('T')[0], rejectionReason: reason } : p));
    }
  };

  const handleVerifySeller = (sellerId: number, _field: string): void => {
    // In real app, this would update the backend
  };

  const formatPrice = (price: string | number): string => {
    const numPrice = typeof price === 'string' ? parseFloat(price.replace(/,/g, '')) : price;
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0, style: 'currency', currency: 'INR' }).format(numPrice);
  };

  return (
    <div className="min-h-screen bg-ivory font-body text-walnut">
      <IndianNavbarFixed />

      <div className="relative pt-32 pb-16 bg-walnut text-ivory overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1589578527966-04d7c15ad48a?w=1600&h=400&fit=crop" alt="Heritage" className="w-full h-full object-cover grayscale" />
        </div>

        <div className="max-w-7xl mx-auto px-8 relative flex flex-col md:flex-row items-center gap-12">
          <div className="w-40 h-40 rounded-full bg-gold/20 flex items-center justify-center text-6xl border-4 border-gold shadow-premium">
            🪔
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-[10px] font-ui font-bold text-gold uppercase tracking-widest">Heritage Guardian</span>
            </div>

            <h1 className="text-5xl font-heading mb-2 tracking-tight-editorial">{ngoInfo.name}</h1>
            <p className="text-lg text-ivory/60 italic font-heading mb-6">"{ngoInfo.hindiName} · Preserving the soul of Indian craft"</p>

            <div className="flex flex-wrap justify-center md:justify-start gap-8">
              <div className="flex items-center gap-2 text-xs font-ui font-semibold text-ivory/40 uppercase tracking-widest">
                <History className="text-gold" size={16} /> Est. {ngoInfo.established}
              </div>
              <div className="flex items-center gap-2 text-xs font-ui font-semibold text-ivory/40 uppercase tracking-widest">
                <MapPin className="text-gold" size={16} /> {ngoInfo.region}
              </div>
              <div className="flex items-center gap-2 text-xs font-ui font-semibold text-ivory/40 uppercase tracking-widest">
                <Star className="text-gold" size={16} /> {ngoInfo.rating} Rating
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="px-8 py-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 text-center">
              <div className="text-3xl font-heading text-gold">{ngoInfo.verifiedArtisans}</div>
              <div className="text-[10px] font-ui font-bold uppercase tracking-widest text-ivory/30">Artisans</div>
            </div>
            <div className="px-8 py-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 text-center">
              <div className="text-3xl font-heading text-gold">{ngoInfo.productsApproved}</div>
              <div className="text-[10px] font-ui font-bold uppercase tracking-widest text-ivory/30">Approvals</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 -translate-y-1/2">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Artisans", value: stats.totalSellers, color: "gold", icon: Users },
            { label: "Pending", value: stats.pendingProducts, color: "maroon", icon: Clock },
            { label: "Approved", value: stats.approvedProducts, color: "teal", icon: CheckCircle },
            { label: "Rejected", value: stats.rejectedProducts, color: "walnut", icon: XCircle },
            { label: "Total Value", value: formatPrice(stats.totalValue), color: "gold", icon: TrendingUp }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl shadow-premium border border-sand/20 text-center group hover:-translate-y-1 transition-all duration-300">
              <stat.icon className={`mx-auto mb-3 text-${stat.color}`} size={24} strokeWidth={1} />
              <div className="text-2xl font-heading text-walnut mb-1">{stat.value}</div>
              <div className="text-[10px] font-ui font-bold uppercase tracking-widest text-walnut/30">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mb-12">
        <div className="flex gap-2 overflow-x-auto pb-4">
          {[
            { id: "pending", label: "Pending Review", icon: Clock, count: stats.pendingProducts },
            { id: "approved", label: "Collection Archive", icon: CheckCircle, count: stats.approvedProducts },
            { id: "rejected", label: "Rejected Submissions", icon: AlertTriangle, count: stats.rejectedProducts },
            { id: "sellers", label: "Artisan Registry", icon: Users, count: stats.totalSellers }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-8 py-4 rounded-full font-ui font-bold text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-maroon text-ivory shadow-premium"
                  : "bg-white text-walnut/40 hover:text-walnut border border-sand/20"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
              {tab.count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === tab.id ? "bg-gold text-maroon" : "bg-sand/20 text-walnut/40"}`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 pb-24">
        {activeTab !== "sellers" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.filter(p => p.status === activeTab).map(product => (
              <div key={product.id} className="group bg-white rounded-3xl overflow-hidden border border-sand/10 hover:border-gold/20 transition-all duration-500 hover:shadow-premium-hover flex flex-col">
                <div className="aspect-[4/3] relative overflow-hidden bg-sand/5">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />

                  <div className={`absolute top-6 left-6 px-4 py-1.5 rounded-full text-[10px] font-ui font-bold uppercase tracking-widest backdrop-blur-md shadow-sm border ${
                    product.status === "pending" ? "bg-gold/80 text-walnut border-gold/10" :
                    product.status === "approved" ? "bg-teal/80 text-white border-teal/10" :
                    "bg-maroon/80 text-white border-maroon/10"
                  }`}>
                    {product.status}
                  </div>

                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-ui font-bold uppercase tracking-widest border border-sand/30">
                    <span className="text-gold mr-1">★</span> {product.authenticityScore}% Authentic
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className="mb-6">
                    <div className="text-[10px] font-ui font-bold uppercase tracking-widest text-gold mb-1">{product.category}</div>
                    <h3 className="text-2xl font-heading text-walnut mb-2 tracking-tight">{product.name}</h3>
                    <div className="text-xs font-ui font-bold text-walnut/30 uppercase tracking-widest">by {product.sellerName}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-ivory/30 rounded-2xl border border-sand/10">
                    <div>
                      <div className="text-[8px] font-ui font-bold uppercase tracking-widest text-walnut/30 mb-1">Listed Value</div>
                      <div className="text-sm font-heading text-maroon">{formatPrice(product.price)}</div>
                    </div>
                    <div>
                      <div className="text-[8px] font-ui font-bold uppercase tracking-widest text-walnut/30 mb-1">Est. Appraisal</div>
                      <div className="text-sm font-heading text-teal">{formatPrice(product.estimatedValue)}</div>
                    </div>
                  </div>

                  {product.status === "rejected" && product.rejectionReason && (
                    <div className="mb-8 p-4 bg-maroon/5 rounded-2xl border border-maroon/10">
                      <div className="text-[8px] font-ui font-bold uppercase tracking-widest text-maroon/40 mb-1">Rejection Reason</div>
                      <p className="text-xs text-maroon/70 italic leading-relaxed">"{product.rejectionReason}"</p>
                    </div>
                  )}

                  {activeTab === "pending" && (
                    <div className="mt-auto pt-8 border-t border-sand/10 flex gap-4">
                      <button onClick={() => handleReject(product.id)} className="flex-1 py-3 border border-maroon text-maroon rounded-full font-ui font-bold text-[10px] uppercase tracking-widest hover:bg-maroon hover:text-white transition-all">
                        Reject
                      </button>
                      <button onClick={() => handleApprove(product.id)} className="flex-1 py-3 bg-teal text-white rounded-full font-ui font-bold text-[10px] uppercase tracking-widest hover:bg-walnut shadow-premium transition-all">
                        Approve
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "sellers" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {sellers.map(seller => (
              <div key={seller.id} className="group bg-white rounded-[40px] overflow-hidden border border-sand/10 hover:border-gold/20 transition-all duration-500 hover:shadow-premium-hover">
                <div className="relative h-48 bg-walnut overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_40%,#C6A75E_0%,transparent_50%)]" />

                  <div className="absolute top-8 right-8 flex gap-3 z-10">
                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-ui font-bold uppercase tracking-widest backdrop-blur-md border ${seller.bankVerified ? "bg-teal/80 text-white border-teal/10" : "bg-maroon/80 text-white border-maroon/10"}`}>
                      {seller.bankVerified ? "Bank Verified" : "Bank Pending"}
                    </div>
                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-ui font-bold uppercase tracking-widest backdrop-blur-md border ${seller.documentsVerified ? "bg-teal/80 text-white border-teal/10" : "bg-gold/80 text-walnut border-gold/10"}`}>
                      {seller.documentsVerified ? "KYC Verified" : "KYC Pending"}
                    </div>
                  </div>

                  <div className="absolute -bottom-10 left-10 w-32 h-32 rounded-[32px] border-4 border-white shadow-premium overflow-hidden z-20">
                    <img src={seller.image} alt={seller.name} className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="p-12 pt-16">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-3xl font-heading text-walnut mb-1 tracking-tight">{seller.name}</h3>
                      <div className="text-[10px] font-ui font-bold uppercase tracking-widest text-gold mb-4">{seller.craft}</div>
                      <div className="flex items-center gap-4 text-walnut/40 text-xs font-ui">
                        <span className="flex items-center gap-1"><MapPin size={14} /> {seller.location}</span>
                        <span className="flex items-center gap-1"><History size={14} /> {seller.experience}</span>
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-gold/10 rounded-xl flex items-center gap-2 border border-gold/20">
                      <Star className="text-gold" size={16} strokeWidth={1} />
                      <span className="font-heading font-bold text-gold">{seller.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-walnut/60 leading-relaxed italic font-heading mb-10">"{seller.story}"</p>

                  <div className="grid grid-cols-3 gap-4 mb-10">
                    <div className="p-4 bg-ivory/30 rounded-2xl border border-sand/10 text-center">
                      <div className="text-xl font-heading text-maroon">{seller.totalProducts}</div>
                      <div className="text-[8px] font-ui font-bold uppercase tracking-widest text-walnut/30">Total</div>
                    </div>
                    <div className="p-4 bg-ivory/30 rounded-2xl border border-sand/10 text-center">
                      <div className="text-xl font-heading text-teal">{seller.approvedProducts}</div>
                      <div className="text-[8px] font-ui font-bold uppercase tracking-widest text-walnut/30">Approved</div>
                    </div>
                    <div className="p-4 bg-ivory/30 rounded-2xl border border-sand/10 text-center">
                      <div className="text-xl font-heading text-gold">{seller.pendingProducts}</div>
                      <div className="text-[8px] font-ui font-bold uppercase tracking-widest text-walnut/30">Pending</div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-10 border-t border-sand/10">
                    <button className="flex-1 py-4 bg-maroon text-ivory rounded-full font-ui font-bold text-xs uppercase tracking-widest shadow-premium hover:bg-walnut transition-all flex items-center justify-center gap-3">
                      <Mail size={16} /> Contact
                    </button>
                    {!seller.bankVerified && (
                      <button onClick={() => handleVerifySeller(seller.id, "bankVerified")} className="flex-1 py-4 border border-teal text-teal rounded-full font-ui font-bold text-xs uppercase tracking-widest hover:bg-teal hover:text-white transition-all flex items-center justify-center gap-3">
                        <ShieldCheck size={16} /> Verify Bank
                      </button>
                    )}
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

export default NGODashboard;