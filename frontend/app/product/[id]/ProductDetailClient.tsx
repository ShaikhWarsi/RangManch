'use client'

import React from 'react'
import IndianNavbarFixed from '@/components/IndianNavbarFixed'
import { Footer } from '@/components/Footer'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Share2, 
  Truck,
  Shield,
  RefreshCw,
  ChevronDown,
  Clock,
  MapPin,
  Award,
  ExternalLink
} from 'lucide-react'

export default function ProductDetailClient({ product }: { product: any }) {
  const { addToCart } = useCart()
  const [selectedImage, setSelectedImage] = React.useState(0)
  const [quantity, setQuantity] = React.useState(1)
  const [isWishlisted, setIsWishlisted] = React.useState(false)
  const [expandedSection, setExpandedSection] = React.useState<string | null>(null)
  const [isAdded, setIsAdded] = React.useState(false)

  const handleAddToCart = () => {
    addToCart({
      id: product._id || product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images?.[0] || product.image,
      description: product.description,
      artisan: product.artisan?.name
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const craftStory = product.craftStory || {
    origin: product.artisan?.location || 'India',
    timeToCreate: '15-45 Days',
    technique: 'Traditional Handloom Weaving',
    materials: 'Pure Silk, Zari Thread (Silver coated in Gold)',
    heritage: 'This craft form has been practiced for over 400 years in the region.'
  }

  const sections = [
    { id: 'craft', label: 'The Craft', icon: Award },
    { id: 'materials', label: 'Materials & Sourcing', icon: MapPin },
    { id: 'care', label: 'Care Instructions', icon: Heart }
  ]

  return (
    <div className="min-h-screen bg-ivory">
      <IndianNavbarFixed />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm mb-8">
          <a href="/" className="text-walnut/60 hover:text-walnut">Home</a>
          <span className="text-walnut/40">/</span>
          <a href="/trade" className="text-walnut/60 hover:text-walnut">Marketplace</a>
          <span className="text-walnut/40">/</span>
          <span className="text-walnut font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden border border-sand/20 relative group">
              <img
                src={product.images?.[selectedImage] || product.image || 'https://images.unsplash.com/photo-1518644749705-54458630c263?w=600&h=600&fit=crop'}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-walnut/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex space-x-2 overflow-x-auto">
              {product.images?.slice(0, 4).map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-gold' : 'border-sand/20 hover:border-gold/50'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gold/80 tracking-[0.2em] uppercase">{product.category || 'Handcrafted'}</span>
                <span className="w-1 h-1 rounded-full bg-gold/40" />
                <span className="text-xs text-walnut/50">{product.craft || 'Artisan Craft'}</span>
              </div>
              <h1 className="text-4xl font-heading text-walnut mb-3">{product.name}</h1>
              <p className="text-3xl text-maroon font-bold mb-4">₹{product.price?.toLocaleString() || '0'}</p>
              
              {/* Rating */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < (product.rating || 4)
                          ? 'text-gold fill-current'
                          : 'text-sand'
                      }`}
                      strokeWidth={1}
                    />
                  ))}
                </div>
                <span className="text-sm text-walnut/60">
                  {product.rating || '4.5'} rating
                </span>
              </div>

              <p className="text-walnut/70 leading-relaxed mb-6">
                {product.description || 'A beautiful handcrafted piece showcasing traditional Indian craftsmanship.'}
              </p>
            </div>

            {/* Quick Craft Info */}
            <div className="bg-sand/10 rounded-xl p-4 border border-sand/20">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Clock className="w-5 h-5 text-maroon mx-auto mb-1" />
                  <p className="text-[10px] text-walnut/60 uppercase tracking-wider">Time</p>
                  <p className="text-xs font-bold text-walnut">{craftStory.timeToCreate}</p>
                </div>
                <div className="text-center border-x border-sand/20">
                  <MapPin className="w-5 h-5 text-maroon mx-auto mb-1" />
                  <p className="text-[10px] text-walnut/60 uppercase tracking-wider">Origin</p>
                  <p className="text-xs font-bold text-walnut">{craftStory.origin}</p>
                </div>
                <div className="text-center">
                  <Award className="w-5 h-5 text-maroon mx-auto mb-1" />
                  <p className="text-[10px] text-walnut/60 uppercase tracking-wider">Heritage</p>
                  <p className="text-xs font-bold text-walnut">400+ Years</p>
                </div>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-ui font-bold text-walnut/70 uppercase tracking-widest">
                  Quantity
                </label>
                <div className="flex items-center border border-sand/20 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-walnut/60 hover:text-walnut transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-0 focus:outline-none bg-transparent"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-walnut/60 hover:text-walnut transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 px-8 py-4 rounded-full font-ui font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-2 shadow-premium ${
                    isAdded 
                      ? 'bg-green-500 text-white' 
                      : 'bg-maroon text-ivory hover:bg-walnut'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Sparkles size={20} />
                      <span>Added to Archive!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} />
                      <span>Add to Collection</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-4 rounded-full border transition-all ${
                    isWishlisted
                      ? 'border-maroon text-maroon'
                      : 'border-sand/20 text-walnut/60 hover:border-gold hover:text-walnut'
                  }`}
                >
                  <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-2 gap-4 py-6 border-y border-sand/20">
              <div className="flex items-center space-x-3">
                <Truck className="text-gold" size={20} strokeWidth={1} />
                <div>
                  <p className="text-sm font-ui font-bold text-walnut">Free Shipping</p>
                  <p className="text-xs text-walnut/60">On orders above ₹2000</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="text-gold" size={20} strokeWidth={1} />
                <div>
                  <p className="text-sm font-ui font-bold text-walnut">Authentic</p>
                  <p className="text-xs text-walnut/60">Verified Artisan Craft</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RefreshCw className="text-gold" size={20} strokeWidth={1} />
                <div>
                  <p className="text-sm font-ui font-bold text-walnut">Easy Returns</p>
                  <p className="text-xs text-walnut/60">7-day return policy</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Share2 className="text-gold" size={20} strokeWidth={1} />
                <div>
                  <p className="text-sm font-ui font-bold text-walnut">Share</p>
                  <p className="text-xs text-walnut/60">With friends & family</p>
                </div>
              </div>
            </div>

            {/* Artisan Info */}
            {product.artisan && (
              <div className="bg-white p-8 rounded-3xl border border-sand/30 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-heading text-walnut">The Hands Behind the Craft</h3>
                  <Link href={`/artisans`} className="text-xs font-ui font-bold text-maroon uppercase tracking-widest hover:underline flex items-center gap-1">
                    Meet All Artisans <ExternalLink size={12} />
                  </Link>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gold/20 shadow-lg shrink-0">
                    <img
                      src={product.artisan.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'}
                      alt={product.artisan.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                      <p className="font-heading text-xl text-walnut font-bold">{product.artisan.name}</p>
                      {product.artisan.verified && (
                        <Award size={16} className="text-teal" fill="currentColor" />
                      )}
                    </div>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-4 mb-4">
                      <div className="flex items-center gap-1.5 text-xs text-walnut/60">
                        <MapPin size={14} className="text-maroon" />
                        <span>{product.artisan.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-walnut/60">
                        <Star size={14} className="text-gold" fill="currentColor" />
                        <span className="font-bold text-walnut">{product.artisan.rating} Rating</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-walnut/60">
                        <Award size={14} className="text-maroon" />
                        <span>{product.artisan.experience} experience</span>
                      </div>
                    </div>
                    <p className="text-sm text-walnut/70 leading-relaxed font-ui italic">
                      "{product.artisan.story || "Dedicated to preserving our traditional craft forms and sharing them with the world."}"
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Expandable Craft Story Sections */}
            <div className="space-y-2">
              {sections.map((section) => (
                <div key={section.id} className="border border-sand/20 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                    className="w-full flex items-center justify-between p-4 bg-white/50 hover:bg-sand/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <section.icon className="w-5 h-5 text-maroon" />
                      <span className="font-ui text-sm font-bold text-walnut">{section.label}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-walnut/40 transition-transform duration-300 ${expandedSection === section.id ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${expandedSection === section.id ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="p-4 pt-0 bg-white/30 text-walnut/70 text-sm leading-relaxed">
                      {section.id === 'craft' && (
                        <p>{craftStory.technique}. {craftStory.heritage}</p>
                      )}
                      {section.id === 'materials' && (
                        <p>{craftStory.materials}. Sourced directly from artisan cooperatives to ensure quality and authenticity.</p>
                      )}
                      {section.id === 'care' && (
                        <p>Dry clean only. Store in a cool, dry place. Avoid direct sunlight to preserve colors. Handle with care to maintain the integrity of the handcrafted details.</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
