'use client'

import React from 'react'
import IndianNavbarFixed from '@/components/IndianNavbarFixed'
import { Footer } from '@/components/Footer'
import { useCart } from '@/context/CartContext'
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Share2, 
  ZoomIn,
  Play,
  Truck,
  Shield,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

export default function ProductDetailClient({ product }: { product: any }) {
  const { addToCart } = useCart()
  const [selectedImage, setSelectedImage] = React.useState(0)
  const [quantity, setQuantity] = React.useState(1)
  const [isWishlisted, setIsWishlisted] = React.useState(false)

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0],
      description: product.description
    })
  }

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
            <div className="aspect-square bg-white rounded-2xl overflow-hidden border border-sand/20">
              <img
                src={product.images?.[selectedImage] || product.image || 'https://images.unsplash.com/photo-1518644749705-54458630c263?w=600&h=600&fit=crop'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex space-x-2 overflow-x-auto">
              {product.images?.slice(0, 4).map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-gold' : 'border-sand/20'
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
              <h1 className="text-4xl font-heading text-walnut mb-2">{product.name}</h1>
              <p className="text-2xl text-maroon font-bold mb-4">₹{product.price?.toLocaleString() || '0'}</p>
              
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
                  <span className="ml-2 text-sm text-walnut/60">
                    {product.rating || 4.5} ({Math.floor(Math.random() * 100 + 20)} reviews)
                  </span>
                </div>
              </div>

              <p className="text-walnut/70 leading-relaxed mb-6">
                {product.description || 'A beautiful handcrafted piece showcasing traditional Indian craftsmanship.'}
              </p>
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
                    className="p-2 text-walnut/60 hover:text-walnut transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-0 focus:outline-none"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-walnut/60 hover:text-walnut transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-maroon text-ivory px-8 py-4 rounded-full font-ui font-bold uppercase tracking-widest hover:bg-walnut transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
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
                  <p className="text-xs text-walnut/60">100% Genuine Craft</p>
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
              <div className="bg-white/50 p-6 rounded-2xl border border-sand/20">
                <h3 className="text-lg font-heading text-walnut mb-4">About the Artisan</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-sand/20 rounded-full overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                      alt="Artisan"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-ui font-bold text-walnut">{product.artisan.name || 'Master Artisan'}</p>
                    <p className="text-sm text-walnut/60">{product.artisan.experience || '25 years'} experience</p>
                    <p className="text-sm text-walnut/60">{product.artisan.location || 'India'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
