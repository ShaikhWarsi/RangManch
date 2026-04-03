'use client'

import React, { useState, useEffect } from "react";
import { Footer } from "../components/Footer";
import IndianNavbarFixed from "../components/IndianNavbarFixed";
import { ProductCardSkeleton, PageLoadingSkeleton } from "../components/SkeletonLoading";
import { apiService, mockProducts, mockArtisans, Product, Artisan } from "../services/api";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Scissors,
  Gem,
  Hammer,
  Home,
  Search,
  Monitor,
  ShoppingCart,
  User,
  ExternalLink,
  MapPin,
  Star,
  Award
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const colors = {
  maroon: "#6B1F2B",
  gold: "#C6A75E",
  ivory: "#F5EFE6",
  walnut: "#3E2F26",
  sand: "#D8CFC4",
  teal: "#2D4B4B",
  purple: "#4A2C40"
};

const TradePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [artisanCount, setArtisanCount] = useState<number>(0);
  const [revenueCount, setRevenueCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  
  const { addToCart } = useCart();
  const [addedToCartId, setAddedToCartId] = useState<string | null>(null);

  const handleAddToCart = (product: Product, artisanName: string) => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      artisan: artisanName
    });
    
    setAddedToCartId(product._id);
    setTimeout(() => setAddedToCartId(null), 2000);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [productsResponse, artisansResponse] = await Promise.all([
          apiService.getProducts(1, 50),
          apiService.getArtisans(1, 50)
        ]);

        if (productsResponse.success && productsResponse.data && productsResponse.data.length > 0) {
          setProducts(productsResponse.data);
        } else {
          // Fallback to mock data if API returns empty or fails
          setProducts(mockProducts);
        }

        if (artisansResponse.success && artisansResponse.data && artisansResponse.data.length > 0) {
          setArtisans(artisansResponse.data);
          setArtisanCount(artisansResponse.data.length);
        } else {
          // Fallback to mock data
          setArtisans(mockArtisans);
          setArtisanCount(mockArtisans.length);
        }

        setRevenueCount(840000);
        
      } catch (error) {
        console.error("Data fetching error:", error);
        setProducts(mockProducts);
        setArtisans(mockArtisans);
        setArtisanCount(mockArtisans.length);
        setRevenueCount(840000);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Animated counter effect
  useEffect(() => {
    if (loading) return;
    
    const artisanTarget = artisanCount;
    const revenueTarget = revenueCount;
    const duration = 1500;
    const steps = 40;
    const stepTime = duration / steps;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setArtisanCount(Math.floor(artisanTarget * progress));
      setRevenueCount(Math.floor(revenueTarget * progress));
      
      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, stepTime);
    
    return () => clearInterval(interval);
  }, [loading, artisanCount, revenueCount]);

  const categories: Category[] = [
    { id: "all", name: "All Masterpieces", description: "Everything handcrafted", icon: <Sparkles size={24} /> },
    { id: "textiles", name: "Sarees & Textiles", description: "Handwoven silks & cottons", icon: <Scissors size={24} /> },
    { id: "jewelry", name: "Traditional Jewelry", description: "Kundan & Meenakari", icon: <Gem size={24} /> },
    { id: "pottery", name: "Terracotta & Pottery", description: "Handcrafted clay art", icon: <Hammer size={24} /> },
    { id: "home", name: "Home Decor", description: "Handcrafted furnishings", icon: <Home size={24} /> }
  ];

  const getArtisanForProduct = (artisanId: string) => {
    return artisans.find(a => a._id === artisanId) || mockArtisans[0];
  };

  const filteredProducts = products
    .filter(p => {
      if (selectedCategory === "all") return true;
      const categoryMatch = p.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const categoryMatchReverse = selectedCategory.toLowerCase().includes(p.category.toLowerCase());
      return categoryMatch || categoryMatchReverse;
    })
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    .sort((a, b) => {
      switch(sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return (b.rating || 0) - (a.rating || 0);
        default: return 0;
      }
    });

  return (
    <div className="min-h-screen bg-ivory font-body">
      <IndianNavbarFixed />

      <div className="h-[50vh] bg-cover bg-center flex flex-col items-center justify-center text-ivory text-center px-8 relative" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1590073844006-33379778ae09?w=1600&q=80')" }}>
        <h1 className="text-5xl md:text-6xl font-heading mb-6 tracking-tight-editorial">
          The Marketplace of<br />Indian Heritage
        </h1>
        <p className="text-xl max-w-2xl opacity-90 font-heading italic">
          Directly from the hands of master artisans to your home.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Impact Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl border border-sand/30 shadow-sm hover:shadow-md transition-all text-center">
            <div className="w-12 h-12 bg-maroon/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="text-maroon" size={24} />
            </div>
            <div className="text-2xl font-heading text-maroon font-bold mb-1">{artisanCount} Master Artisans</div>
            <p className="text-xs text-walnut/60 font-ui uppercase tracking-widest">Empowered across 28 states</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-sand/30 shadow-sm hover:shadow-md transition-all text-center">
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="text-gold" size={24} />
            </div>
            <div className="text-2xl font-heading text-maroon font-bold mb-1">4.9/5 Average Rating</div>
            <p className="text-xs text-walnut/60 font-ui uppercase tracking-widest">From over 10,000 collectors</p>
          </div>
          <div className="bg-white p-8 rounded-2xl border border-sand/30 shadow-sm hover:shadow-md transition-all text-center">
            <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="text-teal" size={24} />
            </div>
            <div className="text-2xl font-heading text-maroon font-bold mb-1">100% Direct Trade</div>
            <p className="text-xs text-walnut/60 font-ui uppercase tracking-widest">No middlemen, fair pay for all</p>
          </div>
        </div>

        {/* Search and Categories */}
        <div className="bg-white p-8 rounded-3xl shadow-premium border border-sand/20 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-2.5 rounded-full text-xs font-ui font-bold uppercase tracking-widest transition-all border ${
                    selectedCategory === cat.id 
                      ? "bg-maroon text-ivory border-maroon shadow-md" 
                      : "bg-transparent text-walnut/40 border-sand hover:border-maroon/30"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search by craft, state, or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-3.5 rounded-2xl border border-sand bg-sand/5 text-sm font-ui focus:border-gold outline-none transition-all shadow-inner"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-walnut/40" size={18} />
            </div>
          </div>

          <div className="flex flex-wrap gap-6 items-center border-t border-sand/20 pt-8">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-ui font-bold uppercase tracking-widest text-walnut/40">Sort By:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-xl border border-sand bg-white text-xs font-ui font-bold text-walnut/70 focus:border-gold outline-none"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-ui font-bold uppercase tracking-widest text-walnut/40">Price Range:</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                  className="w-20 px-3 py-2 rounded-xl border border-sand bg-white text-xs font-ui text-walnut/70 outline-none"
                  placeholder="Min"
                />
                <span className="text-walnut/30">-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 50000])}
                  className="w-24 px-3 py-2 rounded-xl border border-sand bg-white text-xs font-ui text-walnut/70 outline-none"
                  placeholder="Max"
                />
              </div>
            </div>
            
            <button
              onClick={() => {
                setSortBy("newest");
                setPriceRange([0, 50000]);
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="ml-auto text-[10px] font-ui font-bold uppercase tracking-widest text-maroon hover:underline"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {loading ? (
            [...Array(6)].map((_, i) => <ProductCardSkeleton key={i} />)
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const artisan = getArtisanForProduct(product.artisanId);
              return (
                <div key={product._id} className="group bg-white rounded-3xl overflow-hidden border border-sand/30 shadow-sm hover:shadow-premium-hover transition-all duration-500 flex flex-col">
                  {/* Image Container */}
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img
                      src={product.images[0] || "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=500&h=600&fit=crop"}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-gold text-walnut text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                      {product.category}
                    </div>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-walnut/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      <Link 
                        href={`/product/${product._id}`}
                        className="p-3 bg-ivory text-walnut rounded-full hover:bg-gold hover:text-white transition-all shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-500"
                        title="View Details"
                      >
                        <ExternalLink size={20} />
                      </Link>
                      <button 
                        onClick={() => handleAddToCart(product, artisan.name)}
                        className={`p-3 rounded-full transition-all shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-500 delay-75 ${
                          addedToCartId === product._id ? 'bg-green-500 text-white' : 'bg-maroon text-ivory hover:bg-walnut'
                        }`}
                        title="Add to Cart"
                      >
                        {addedToCartId === product._id ? <Sparkles size={20} /> : <ShoppingCart size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-heading text-walnut mb-1 group-hover:text-maroon transition-colors">{product.name}</h3>
                        <p className="text-xs text-walnut/50 font-ui uppercase tracking-wider">{product.craft || "Traditional Craft"}</p>
                      </div>
                      <p className="text-xl font-heading text-maroon font-bold">₹{product.price.toLocaleString('en-IN')}</p>
                    </div>
                    
                    <p className="text-xs text-walnut/70 leading-relaxed font-ui mb-6 line-clamp-2 italic">
                      {product.description}
                    </p>

                    {/* Artisan Section */}
                    <div className="mt-auto pt-6 border-t border-sand/20 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gold/30">
                          <img src={artisan.image} alt={artisan.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-[10px] text-walnut/40 font-ui uppercase tracking-widest">Master Artisan</p>
                          <h4 className="text-sm font-heading text-walnut font-bold">{artisan.name}</h4>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-gold mb-0.5 justify-end">
                          <Star size={10} fill="currentColor" />
                          <span className="text-[10px] font-bold text-walnut">{artisan.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-walnut/40">
                          <MapPin size={10} />
                          <span className="text-[10px] font-ui">{artisan.location.split(',')[0]}</span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleAddToCart(product, artisan.name)}
                      className={`mt-6 w-full py-3 border rounded-xl font-ui font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                        addedToCartId === product._id 
                          ? 'bg-green-500 text-white border-green-500' 
                          : 'bg-maroon/5 text-maroon border-maroon/20 hover:bg-maroon hover:text-ivory'
                      }`}
                    >
                      {addedToCartId === product._id ? (
                        <>Added to Collection!</>
                      ) : (
                        <><ShoppingCart size={16} /> Add to Cart</>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="text-4xl mb-4">🏮</div>
              <h3 className="text-2xl font-heading text-walnut mb-2">No masterpieces found</h3>
              <p className="text-walnut/60 font-ui">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>

        {/* Brand Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 py-16 border-y border-sand/30">
          <div className="text-center group">
            <div className="w-16 h-16 bg-maroon/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-maroon group-hover:text-ivory transition-all duration-500 rotate-3 group-hover:rotate-0 shadow-sm">
              <Award size={32} />
            </div>
            <h3 className="font-heading text-xl text-walnut mb-3 tracking-tight-editorial">Authenticity Guaranteed</h3>
            <p className="text-sm text-walnut/60 leading-relaxed">Every item comes with a certificate of authenticity and the story of the artisan who made it.</p>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-gold/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gold group-hover:text-walnut transition-all duration-500 -rotate-3 group-hover:rotate-0 shadow-sm">
              <User size={32} />
            </div>
            <h3 className="font-heading text-xl text-walnut mb-3 tracking-tight-editorial">Direct Artisan Support</h3>
            <p className="text-sm text-walnut/60 leading-relaxed">We eliminate middlemen to ensure that artisans receive the full value of their incredible craftsmanship.</p>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 bg-teal/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-teal group-hover:text-ivory transition-all duration-500 rotate-6 group-hover:rotate-0 shadow-sm">
              <MapPin size={32} />
            </div>
            <h3 className="font-heading text-xl text-walnut mb-3 tracking-tight-editorial">Heritage Preservation</h3>
            <p className="text-sm text-walnut/60 leading-relaxed">Your purchase helps preserve centuries-old techniques that are at risk of being lost to time.</p>
          </div>
        </div>

        {/* Newsletter / CTA */}
        <div className="bg-walnut rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-maroon/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-gold font-ui font-bold uppercase tracking-[0.3em] text-xs mb-6 block">Join the Circle</span>
            <h2 className="text-4xl md:text-5xl font-heading text-ivory mb-8 leading-tight">Bring India's Finest Traditions to Your Home</h2>
            <p className="text-ivory/60 mb-10 text-lg font-ui italic">Get early access to limited edition drops and stories from our master artisans.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-8 py-4 text-ivory outline-none focus:border-gold transition-all"
              />
              <button className="px-10 py-4 bg-gold text-walnut rounded-2xl font-ui font-bold hover:bg-ivory transition-all shadow-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TradePage;