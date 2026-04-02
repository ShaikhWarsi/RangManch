import React from 'react'
import { notFound } from 'next/navigation'
import IndianNavbarFixed from '@/components/IndianNavbarFixed'
import { Footer } from '@/components/Footer'
import { useCart } from '@/context/CartContext'
import { ProductDetailSkeleton } from '@/components/SkeletonLoading'
import { apiService, mockProducts } from '@/services/api'
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
import { defaultTheme } from '@/types/theme'

interface ProductPageProps {
  params: { id: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  let product = null;
  
  try {
    // Try to fetch from real API first
    const response = await apiService.getProduct(params.id);
    product = response.data;
  } catch (error) {
    // Product not found in API, checking mock data
    product = mockProducts.find(p => p._id === params.id);
  }
  
  if (!product) {
    notFound()
  }

  return <ProductDetailPage product={product} />
}

function ProductDetailPage({ product }: { product: any }) {
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
          <span className="text-walnut">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-sand/10">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                <ZoomIn className="text-walnut" size={20} />
              </button>
              {product.originalPrice > product.price && (
                <div className="absolute top-4 left-4 bg-maroon text-white px-3 py-1 rounded-full text-sm font-bold">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-maroon shadow-lg' 
                      : 'border-transparent hover:border-sand'
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
              <h1 className="text-3xl font-heading text-walnut mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-gold fill-current'
                          : 'text-sand'
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-sm text-walnut/60">({product.reviews})</span>
                </div>
                <span className="text-2xl font-bold text-maroon">₹{product.price.toLocaleString()}</span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-walnut/40 line-through">₹{product.originalPrice.toLocaleString()}</span>
                )}
              </div>
              <p className="text-walnut/70 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-walnut">Quantity:</label>
                <div className="flex items-center border border-sand rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-sand/10 transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-sand/10 transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-maroon text-ivory py-3 px-6 rounded-lg font-medium hover:bg-walnut transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-lg border transition-colors ${
                    isWishlisted
                      ? 'bg-maroon text-ivory border-maroon'
                      : 'border-sand hover:border-maroon'
                  }`}
                >
                  <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
                </button>
                <button className="p-3 rounded-lg border border-sand hover:border-maroon transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-sand/20">
              <div className="text-center">
                <Truck className="w-8 h-8 text-maroon mx-auto mb-2" />
                <p className="text-xs text-walnut font-medium">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-maroon mx-auto mb-2" />
                <p className="text-xs text-walnut font-medium">Secure Payment</p>
              </div>
              <div className="text-center">
                <RefreshCw className="w-8 h-8 text-maroon mx-auto mb-2" />
                <p className="text-xs text-walnut font-medium">Easy Returns</p>
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-lg font-heading text-walnut mb-4">Specifications</h3>
              <dl className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-sand/10">
                    <dt className="text-sm text-walnut/60 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</dt>
                    <dd className="text-sm text-walnut font-medium">{String(value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Artisan Story */}
        <div className="bg-maroon text-ivory rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-heading mb-6">Meet the Artisan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src={product.artisan.photo}
                alt={product.artisan.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-ivory/20"
              />
              <h3 className="text-xl font-heading">{product.artisan.name}</h3>
              <p className="text-ivory/80">{product.artisan.location}</p>
              <p className="text-sm text-ivory/60 mt-1">{product.artisan.experience} experience</p>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-lg font-heading mb-3">The Story Behind the Craft</h4>
              <p className="text-ivory/90 leading-relaxed mb-4">{product.artisan.story}</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-ivory/20 rounded-full text-sm">Master Weaver</span>
                <span className="px-3 py-1 bg-ivory/20 rounded-full text-sm">Traditional Techniques</span>
                <span className="px-3 py-1 bg-ivory/20 rounded-full text-sm">Heritage Craft</span>
              </div>
            </div>
          </div>
        </div>

        {/* Craft Process */}
        <div className="mb-16">
          <h2 className="text-2xl font-heading text-walnut mb-6">Craft Process</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-video rounded-lg overflow-hidden bg-sand/10">
              <div className="w-full h-full flex items-center justify-center">
                <button className="p-4 bg-maroon text-ivory rounded-full hover:bg-walnut transition-colors">
                  <Play size={24} />
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {product.craftProcess.steps.map((step: string, index: number) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-maroon text-ivory rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-walnut/70">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-16">
          <h2 className="text-2xl font-heading text-walnut mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.relatedProducts.map((relatedProduct: any) => (
              <div key={relatedProduct.id} className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden rounded-lg bg-sand/10 mb-4">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-heading text-walnut group-hover:text-maroon transition-colors">{relatedProduct.name}</h3>
                <p className="text-maroon font-bold">₹{relatedProduct.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div>
          <h2 className="text-2xl font-heading text-walnut mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((review) => (
              <div key={review} className="border-b border-sand/20 pb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-sand rounded-full"></div>
                    <div>
                      <p className="font-medium text-walnut">Customer {review}</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < 4 ? 'text-gold fill-current' : 'text-sand'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-walnut/60">2 weeks ago</span>
                </div>
                <p className="text-walnut/70 leading-relaxed">
                  Absolutely beautiful saree! The craftsmanship is exceptional and the quality exceeds expectations. 
                  Worth every penny.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
