import React from 'react'

// Skeleton component for loading states
interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  lines?: number
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  variant = 'text',
  width,
  height,
  lines = 1
}) => {
  const baseClasses = 'animate-pulse bg-sand/20'
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg'
  }

  const style = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'text' ? '1rem' : undefined)
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {[...Array(lines)].map((_, i) => (
          <div
            key={i}
            className={`${baseClasses} ${variantClasses[variant]}`}
            style={{
              width: i === lines - 1 ? '70%' : '100%',
              height: height || '1rem'
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  )
}

// Product Card Skeleton
export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="group cursor-pointer">
      <div className="aspect-[3/4] overflow-hidden rounded-lg bg-sand/10 mb-6">
        <Skeleton variant="rectangular" className="w-full h-full" />
      </div>
      <div>
        <div className="flex justify-between items-baseline mb-2">
          <Skeleton width="60%" height="24px" />
          <Skeleton width="80px" height="20px" />
        </div>
        <div className="w-10 h-px bg-sand mb-4" />
        <Skeleton lines={2} />
      </div>
    </div>
  )
}

// Product Detail Page Skeleton
export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm mb-8">
          <Skeleton width="60px" />
          <Skeleton width="4px" height="4px" variant="circular" />
          <Skeleton width="100px" />
          <Skeleton width="4px" height="4px" variant="circular" />
          <Skeleton width="120px" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-sand/10">
              <Skeleton variant="rectangular" className="w-full h-full" />
            </div>
            <div className="flex space-x-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} width="80px" height="80px" variant="rounded" />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Skeleton width="80%" height="36px" className="mb-2" />
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} width="16px" height="16px" variant="circular" />
                  ))}
                  <Skeleton width="60px" height="16px" />
                </div>
                <Skeleton width="100px" height="24px" />
              </div>
              <Skeleton lines={3} />
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Skeleton width="80px" height="20px" />
                <div className="flex items-center border border-sand rounded-lg">
                  <Skeleton width="40px" height="40px" />
                  <Skeleton width="60px" height="24px" />
                  <Skeleton width="40px" height="40px" />
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Skeleton width="200px" height="48px" />
                <Skeleton width="48px" height="48px" variant="circular" />
                <Skeleton width="48px" height="48px" variant="circular" />
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-sand/20">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="text-center">
                  <Skeleton width="32px" height="32px" variant="circular" className="mx-auto mb-2" />
                  <Skeleton width="100px" height="16px" className="mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Artisan Card Skeleton
export const ArtisanCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-card p-6 text-center group-hover:shadow-premium-hover transition-all duration-300">
      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-sand/20">
        <Skeleton variant="circular" className="w-full h-full" />
      </div>
      <Skeleton width="80%" height="24px" className="mx-auto mb-2" />
      <Skeleton width="60%" height="16px" className="mx-auto mb-4" />
      <Skeleton lines={2} />
    </div>
  )
}

// Loading Spinner (for cases where skeleton isn't appropriate)
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className="flex items-center justify-center">
      <div 
        className={`${sizeClasses[size]} border-2 border-sand border-t-maroon rounded-full animate-spin`}
      />
    </div>
  )
}

// Page Loading Skeleton
export const PageLoadingSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Skeleton width="40%" height="48px" />
          <Skeleton width="60%" height="20px" />
        </div>
        
        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton variant="rounded" height="200px" />
              <Skeleton width="80%" height="24px" />
              <Skeleton lines={2} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
