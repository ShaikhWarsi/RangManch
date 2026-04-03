import React from 'react'
import { notFound } from 'next/navigation'
import IndianNavbarFixed from '@/components/IndianNavbarFixed'
import { Footer } from '@/components/Footer'
import ProductDetailClient from './ProductDetailClient'
import { apiService, mockProducts } from '@/services/api'

interface ProductPageProps {
  params: { id: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  let product: any = null;
  let artisan: any = null;
  
  try {
    // Try to fetch from real API first
    const response = await apiService.getProduct(params.id);
    product = response.data;
    
    if (product && product.artisanId) {
      const artisanResponse = await apiService.getArtisan(product.artisanId);
      artisan = artisanResponse.data;
    }
  } catch {
    // Product not found in API, checking mock data
    product = mockProducts.find(p => p._id === params.id);
    if (product) {
      artisan = mockArtisans.find(a => a._id === product.artisanId) || mockArtisans[0];
    }
  }
  
  if (!product) {
    return notFound()
  }

  // Inject artisan into product for the client component
  const productWithArtisan = { ...product, artisan };

  return (
    <div>
      <ProductDetailClient product={productWithArtisan} />
    </div>
  )
}
