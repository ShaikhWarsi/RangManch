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
  let product = null;
  
  try {
    // Try to fetch from real API first
    const response = await apiService.getProduct(params.id);
    product = response.data;
  } catch {
    // Product not found in API, checking mock data
    product = mockProducts.find(p => p._id === params.id);
  }
  
  if (!product) {
    return notFound()
  }

  return (
    <div>
      <IndianNavbarFixed />
      <ProductDetailClient product={product} />
      <Footer />
    </div>
  )
}
