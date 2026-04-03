'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import IndianNavbarFixed from '@/components/IndianNavbarFixed'
import { Footer } from '@/components/Footer'
import { Home, ArrowLeft, Search, ShoppingBag } from 'lucide-react'

export default function NotFound() {
  useEffect(() => {
    // Add subtle entrance animation
    document.body.classList.add('animate-in')
  }, [])

  return (
    <div className="min-h-screen bg-ivory font-body text-walnut">
      <IndianNavbarFixed />

      <div className="flex flex-col items-center justify-center px-8 py-20 min-h-[calc(100vh-200px)]">
        {/* 404 Icon */}
        <div className="w-32 h-32 rounded-full bg-maroon/10 flex items-center justify-center mb-8 animate-pulse">
          <div className="text-6xl font-heading text-maroon font-bold">404</div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-walnut mb-4 text-center">
          Lost in the Heritage?
        </h1>
        
        <p className="text-lg text-walnut/60 font-ui text-center mb-12 max-w-md">
          The artisan craft you&apos;re looking for seems to have wandered off. 
          Let us guide you back to our cultural marketplace.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="flex items-center gap-3 px-8 py-4 bg-maroon text-ivory rounded-full font-ui font-bold text-sm uppercase tracking-widest shadow-premium hover:bg-walnut transition-all duration-300 hover:scale-105"
          >
            <Home size={20} strokeWidth={1.5} />
            Return Home
          </Link>
          
          <Link
            href="/trade"
            className="flex items-center gap-3 px-8 py-4 bg-white text-walnut rounded-full font-ui font-bold text-sm uppercase tracking-widest border-2 border-walnut/20 shadow-premium hover:border-gold hover:shadow-premium-hover transition-all duration-300 hover:scale-105"
          >
            <Search size={20} strokeWidth={1.5} />
            Browse Marketplace
          </Link>
        </div>

        {/* Quick Links */}
        <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 max-w-2xl w-full border border-sand/20">
          <h2 className="text-xl font-heading font-bold text-walnut mb-6 text-center">
            Discover Our Heritage Collections
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/artisans"
              className="group flex flex-col items-center p-6 bg-ivory rounded-2xl border border-sand/20 hover:border-gold/30 transition-all duration-300 hover:shadow-premium-hover"
            >
              <div className="w-16 h-16 rounded-full bg-maroon/10 flex items-center justify-center mb-4 group-hover:bg-maroon/20 transition-colors">
                <ShoppingBag size={24} className="text-maroon" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-heading font-bold text-walnut mb-2">Artisans</h3>
              <p className="text-sm text-walnut/60 text-center">Meet our master craftspeople</p>
            </Link>

            <Link
              href="/trade"
              className="group flex flex-col items-center p-6 bg-ivory rounded-2xl border border-sand/20 hover:border-gold/30 transition-all duration-300 hover:shadow-premium-hover"
            >
              <div className="w-16 h-16 rounded-full bg-maroon/10 flex items-center justify-center mb-4 group-hover:bg-maroon/20 transition-colors">
                <Search size={24} className="text-maroon" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-heading font-bold text-walnut mb-2">Marketplace</h3>
              <p className="text-sm text-walnut/60 text-center">Browse authentic crafts</p>
            </Link>

            <Link
              href="/map"
              className="group flex flex-col items-center p-6 bg-ivory rounded-2xl border border-sand/20 hover:border-gold/30 transition-all duration-300 hover:shadow-premium-hover"
            >
              <div className="w-16 h-16 rounded-full bg-maroon/10 flex items-center justify-center mb-4 group-hover:bg-maroon/20 transition-colors">
                <Home size={24} className="text-maroon" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-heading font-bold text-walnut mb-2">Cultural Map</h3>
              <p className="text-sm text-walnut/60 text-center">Explore regional crafts</p>
            </Link>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-walnut/60 hover:text-walnut transition-colors font-ui text-sm"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            Go Back
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
