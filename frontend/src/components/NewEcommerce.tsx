'use client'

import React, { useState, useEffect } from "react";
import { Footer } from "../components/Footer";
import IndianNavbarFixed from "../components/IndianNavbarFixed";
import { ProductCardSkeleton, PageLoadingSkeleton } from "../components/SkeletonLoading";
import { apiService, mockProducts, mockArtisans } from "../services/api";
import {
  Sparkles,
  ArrowRight,
  Scissors,
  Gem,
  Hammer,
  Home,
  Search,
  Monitor
} from "lucide-react";

interface CategoryItem {
  name: string;
  price: string;
  img: string;
  history: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  items: CategoryItem[];
}

interface Artisan {
  id: number;
  name: string;
  title: string;
  location: string;
  craft: string;
  experience: string;
  story: string;
  image: string;
  products: number;
  rating: string;
}

interface Colors {
  maroon: string;
  gold: string;
  ivory: string;
  walnut: string;
  sand: string;
  teal: string;
  purple: string;
}

const colors: Colors = {
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
  const [products, setProducts] = useState<any[]>([]);
  const [artisans, setArtisans] = useState<any[]>([]);

  // Fetch real data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Try to fetch real data, fallback to mock data
        let productsData = mockProducts;
        let artisansData = mockArtisans;
        
        try {
          const productsResponse = await apiService.getProducts(1, 20);
          if (productsResponse.success && productsResponse.data) {
            productsData = productsResponse.data;
          }
        } catch (error) {
          // Using mock products data
        }

        try {
          const artisansResponse = await apiService.getArtisans(1, 20);
          if (artisansResponse.success && artisansResponse.data) {
            artisansData = artisansResponse.data;
          }
        } catch (error) {
          // Using mock artisans data
        }

        // Set data
        setProducts(productsData);
        setArtisans(artisansData);
        setArtisanCount(artisansData.length);
        setRevenueCount(840000); // This could be calculated from real orders data
        
      } catch (error) {
        // Unexpected error in data fetching
        // Ensure fallback to mock data
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
    const duration = 1500; // Reduced duration
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
    {
      id: "sarees",
      name: "Sarees & Textiles",
      description: "Handwoven silks, cottons, and traditional weaves",
      icon: <Scissors size={24} />,
      items: [
        { name: "Banarasi Silk", price: "₹8,999", img: "https://tilfi.com/cdn/shop/products/KOH0003Red_Kashi_PureKatanSilkKashiGhatSaree3_1200x.jpg?v=1689252962?w=500&h=500&fit=crop", history: "Originating from Varanasi, these sarees are known for their gold and silver brocade or zari." },
        { name: "Kanjivaram", price: "₹12,499", img: "https://i.pinimg.com/736x/c6/c6/a9/c6c6a97b887cc64b80b51e06ddb571df.jpg?w=500&h=500&fit=crop", history: "Woven in the Kanchipuram region of Tamil Nadu, these are famous for their vibrant colors and temple borders." }
      ]
    },
    {
      id: "jewelry",
      name: "Traditional Jewelry",
      description: "Kundan, Meenakari, and Temple jewelry",
      icon: <Gem size={24} />,
      items: [
        { name: "Kundan Necklace", price: "₹15,999", img: "https://p2.piqsels.com/preview/272/26/538/gold-bahraini-gold-bahrain-jewelry.jpg?w=400&h=400&fit=crop", history: "Kundan is a traditional form of Indian gemstone jewelry involving a gem set with gold foil." },
        { name: "Jhumka Earrings", price: "₹4,499", img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop", history: "Bell-shaped earrings that have been a part of Indian culture since ancient times." }
      ]
    },
    {
      id: "pottery",
      name: "Terracotta & Pottery",
      description: "Handcrafted clay art from ancient traditions",
      icon: <Hammer size={24} />,
      items: [
        { name: "Blue Pottery", price: "₹2,999", img: "https://www.intenseindiatours.com/wp-content/uploads/2018/01/Blue-Pottery.jpg?w=400&h=400&fit=crop", history: "A Turko-Persian art form brought to Jaipur in the 19th century, characterized by eye-catching blue dye." },
        { name: "Terracotta Sculpture", price: "₹3,499", img: "https://images.pexels.com/photos/30584842/pexels-photo-30584842.jpeg?cs=srgb&dl=pexels-alice1-30584842.jpg&fm=jpg?w=400&h=400&fit=crop", history: "Terracotta art dates back to the Indus Valley Civilization, representing India's oldest craft traditions." }
      ]
    },
    {
      id: "home",
      name: "Home Decor",
      description: "Handcrafted furnishings and decor items",
      icon: <Home size={24} />,
      items: [
        { name: "Block Print Cushions", price: "₹1,999", img: "https://5.imimg.com/data5/SELLER/Default/2022/9/YC/XE/XZ/47158951/hand-block-printed-cushion-cover.jpeg?w=400&h=400&fit=crop", history: "Hand block printing is a centuries-old art form from Rajasthan using hand-carved wooden blocks." },
        { name: "Dhokra Art", price: "₹5,999", img: "https://housenama.com/cdn/shop/articles/the-art-of-dhokra-handmadeinindia-housenama.jpg?v=1720862777?w=400&h=400&fit=crop", history: "A non-ferrous metal casting using the lost-wax casting technique, used in India for over 4,000 years." }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-ivory font-body">
      <IndianNavbarFixed />

      <div className="h-[60vh] bg-cover bg-center flex flex-col items-center justify-center text-ivory text-center px-8 relative" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1590073844006-33379778ae09?w=1600&q=80')" }}>
        <h1 className="text-6xl md:text-7xl font-heading mb-8 tracking-tight-editorial">
          India&apos;s Master Artisans,<br />Direct to Your Home
        </h1>
        <p className="text-xl max-w-2xl opacity-80 font-heading italic text-ivory">
          Directly from the hands of master artisans to your home.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-20">
        {/* Impact Metrics Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-heading text-walnut mb-8 tracking-tight-editorial">Making a Real Impact</h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white/50 p-8 rounded-2xl border border-sand/20">
                  <div className="h-8 bg-sand/20 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-sand/20 rounded animate-pulse w-3/4 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/50 p-8 rounded-2xl border border-sand/20 hover:bg-maroon/5 transition-colors duration-300">
                <div className="text-3xl font-heading text-maroon mb-2">
                  <span className="font-bold">{artisanCount}</span> Artisans
                </div>
                <p className="text-sm text-walnut/60 font-ui">Empowered across India</p>
              </div>
              <div className="bg-white/50 p-8 rounded-2xl border border-sand/20 hover:bg-maroon/5 transition-colors duration-300">
                <div className="text-3xl font-heading text-maroon mb-2">
                  ₹{(revenueCount / 1000).toFixed(0)}L+
                </div>
                <p className="text-sm text-walnut/60 font-ui">Generated for artisans</p>
              </div>
              <div className="bg-white/50 p-8 rounded-2xl border border-sand/20 hover:bg-maroon/5 transition-colors duration-300">
                <div className="text-3xl font-heading text-maroon mb-2">
                  1 Item Sold
                </div>
                <p className="text-sm text-walnut/60 font-ui">Every 30 seconds</p>
              </div>
            </div>
          )}
          {!loading && (
            <p className="text-lg text-walnut/70 mt-8 font-ui italic">
              You've helped {artisanCount} artisans earn ₹{(revenueCount / 1000).toFixed(0)}L this month
            </p>
          )}
        </div>
        {/* Social Proof Bar */}
        <div className="bg-maroon/5 py-4 mb-8 border-y border-sand/20">
          <div className="max-w-7xl mx-auto px-8 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-teal rounded-full animate-pulse"></span>
            <p className="text-sm text-teal font-ui">
              14 people purchased this in last 24 hours
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-16 border-b border-sand pb-8">
          <div className="flex gap-8">
            {["all", "sarees", "jewelry", "pottery", "home"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-ui font-bold uppercase tracking-widest pb-2 transition-all relative ${
                  selectedCategory === cat ? "text-maroon" : "text-walnut/40"
                }`}
              >
                {cat}
                {selectedCategory === cat && (
                  <div className="absolute bottom-0 left-0 w-full h-px bg-maroon" />
                )}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search masterworks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-6 py-3 rounded-full border border-sand bg-transparent w-64 text-sm font-ui focus:border-gold outline-none transition-colors"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-walnut/40" size={18} />
          </div>
        </div>

        {/* Filters Section */}
        <div className="flex flex-wrap gap-4 mb-12 p-6 bg-white/50 rounded-2xl border border-sand/20">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-ui font-bold uppercase tracking-widest text-walnut/30">Sort:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg border border-sand bg-white text-sm font-ui focus:border-gold outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-ui font-bold uppercase tracking-widest text-walnut/30">Price:</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="50000"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                className="w-24 px-3 py-2 rounded-lg border border-sand bg-white text-sm font-ui focus:border-gold outline-none"
                placeholder="Min"
              />
              <span className="text-walnut/40">-</span>
              <input
                type="number"
                min="0"
                max="50000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 50000])}
                className="w-24 px-3 py-2 rounded-lg border border-sand bg-white text-sm font-ui focus:border-gold outline-none"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSortBy("newest");
              setPriceRange([0, 50000]);
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="px-4 py-2 rounded-lg border border-sand bg-white text-sm font-ui hover:bg-sand/50 transition-colors"
          >
            Clear All
          </button>
        </div>

        <div className="bg-ivory py-6 text-center">
          <p className="text-xs text-walnut/40 uppercase tracking-widest mb-4">Featured In</p>
          <div className="flex justify-center items-center gap-12 opacity-40">
            <span className="font-heading text-xl text-walnut">The Hindu</span>
            <span className="font-heading text-xl text-walnut">Forbes India</span>
            <span className="font-heading text-xl text-walnut">YourStory</span>
            <span className="font-heading text-xl text-walnut">India Today</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-24">
          {loading ? (
            // Show skeleton loaders while loading
            [...Array(6)].map((_, i) => <ProductCardSkeleton key={i} />)
          ) : (
            // Show actual products when loaded
            categories
              .filter(c => selectedCategory === "all" || c.id === selectedCategory)
              .flatMap(c => c.items)
              .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .filter(item => {
                const price = parseInt(item.price.replace(/[₹,]/g, ''));
                return price >= priceRange[0] && price <= priceRange[1];
              })
              .sort((a, b) => {
                const priceA = parseInt(a.price.replace(/[₹,]/g, ''));
                const priceB = parseInt(b.price.replace(/[₹,]/g, ''));
                
                switch(sortBy) {
                  case 'price-low':
                    return priceA - priceB;
                  case 'price-high':
                    return priceB - priceA;
                  case 'rating':
                    return 0; // Add rating logic when available
                  case 'newest':
                  default:
                    return 0;
                }
              })
              .map((item, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden rounded-lg bg-sand/10 mb-6 relative shadow-card transition-all duration-500 group-hover:shadow-premium-hover">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Price Badge */}
                  <span className="absolute bottom-3 left-3 bg-walnut/90 text-ivory px-3 py-1 rounded-full text-sm font-ui font-bold">
                    {item.price}
                  </span>
                  {/* Scarcity Badge */}
                  <span className="absolute top-3 right-3 bg-gold text-walnut text-xs px-2 py-1 rounded">
                    Only 3 left
                  </span>
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-2xl font-heading text-walnut tracking-tight-editorial">{item.name}</h3>
                    <span className="font-ui font-bold text-maroon">{item.price}</span>
                  </div>
                  <div className="w-10 h-px bg-gold mb-4" />
                  <p className="text-sm text-walnut/60 leading-relaxed font-ui">{item.history}</p>
                  
                  {/* Craft Technique Tooltip */}
                  <div className="mt-4 p-3 bg-sand/10 rounded-lg border border-sand/20 group/tooltip cursor-help">
                    <p className="text-xs text-maroon font-ui font-semibold mb-1">Craft Technique</p>
                    <p className="text-xs text-walnut/70 font-ui leading-relaxed">
                      {item.name.includes("Banarasi") && "A traditional Banarasi technique where each motif is woven separately, creating intricate patterns that take 45+ days to complete."}
                      {item.name.includes("Kanjivaram") && "Pure mulberry silk woven with temple-inspired motifs using a three-ply silk thread for durability and sheen."}
                      {item.name.includes("Kundan") && "Ancient technique where gemstones are set with gold foil, requiring 200+ hours of skilled craftsmanship."}
                      {item.name.includes("Jhumka") && "Bell-shaped earrings crafted using traditional filigree work, a technique passed down through generations."}
                      {item.name.includes("Blue Pottery") && "Turko-Persian art form using natural dyes and quartz, fired at high temperatures for vibrant blue hues."}
                      {item.name.includes("Terracotta") && "4,000-year-old craft using clay from riverbeds, hand-molded and fired in traditional kilns."}
                      {item.name.includes("Block Print") && "Hand-carved wooden blocks dipped in natural dyes, each requiring precise alignment for perfect patterns."}
                      {item.name.includes("Dhokra") && "Lost-wax metal casting technique dating back to the Indus Valley, creating unique pieces each time."}
                      {!item.name.includes("Banarasi") && !item.name.includes("Kanjivaram") && !item.name.includes("Kundan") && !item.name.includes("Jhumka") && !item.name.includes("Blue Pottery") && !item.name.includes("Terracotta") && !item.name.includes("Block Print") && !item.name.includes("Dhokra") && "Handcrafted using traditional techniques passed down through generations of master artisans."}
                    </p>
                  </div>
                </div>
              </div>
            ))
            )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-maroon/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🧵</span>
            </div>
            <h3 className="font-heading text-lg text-walnut mb-2 tracking-tight-editorial">Choose Handcrafted</h3>
            <p className="text-sm text-walnut/60">Browse 15,000+ authentic handcrafted products</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-maroon/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🤝</span>
            </div>
            <h3 className="font-heading text-lg text-walnut mb-2 tracking-tight-editorial">Direct from Artisans</h3>
            <p className="text-sm text-walnut/60">100% goes to maker, no middlemen</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-maroon/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🚚</span>
            </div>
            <h3 className="font-heading text-lg text-walnut mb-2 tracking-tight-editorial">Delivered to Door</h3>
            <p className="text-sm text-walnut/60">Free shipping worldwide, 7-day returns</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-28 items-center">
          <div className="bg-white/70 backdrop-blur-md rounded-3xl p-12 shadow-premium border border-gold/10 text-center">
            <h3 className="text-2xl font-heading text-walnut mb-6">Heritage Craftsmanship</h3>
            <div className="h-[400px] w-full bg-sand/10 rounded-2xl mb-6 border border-sand/20 flex items-center justify-center">
              <div className="text-center">
                <span className="text-6xl mb-4 block">🎨</span>
                <p className="text-walnut/60 font-ui">Experience traditional craftsmanship through our curated collection</p>
              </div>
            </div>
            <p className="text-walnut/60 text-sm font-ui">
              Each piece tells a story of tradition, skill, and cultural heritage passed down through generations.
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl font-heading text-walnut mb-8 leading-tight tracking-tight-editorial">
              The Future of<br />Heritage
            </h2>
            <p className="text-walnut/70 leading-relaxed text-lg mb-10 font-body">
              Experience Indian craftsmanship in its finest form. Our platform connects you directly with master artisans, preserving traditional techniques while embracing modern technology.
            </p>
            <button className="self-start px-12 py-4 bg-maroon text-ivory rounded-full font-ui font-bold shadow-premium hover:bg-walnut transition-all flex items-center gap-3">
              Shop the Collection
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <Footer />
      
      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-ivory border-t border-sand p-4 md:hidden z-50">
        <button 
          onClick={() => window.location.href = '/trade'}
          className="w-full bg-maroon text-ivory py-4 rounded-xl font-bold text-lg"
        >
          Shop Handcrafted Goods →
        </button>
      </div>
    </div>
  );
};

export default TradePage;