'use client'

import { useEffect, useState } from 'react'

/**
 * Performance monitoring component to track resource loading issues
 * and provide insights into preload warnings
 */
export const PerformanceMonitor = () => {
  const [warnings, setWarnings] = useState<string[]>([])

  useEffect(() => {
    // Monitor resource timing and unused preloads
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      
      entries.forEach((entry) => {
        if (entry.entryType === 'resource') {
          const resource = entry as PerformanceResourceTiming
          
          // Check for resources that were preloaded but not used quickly
          if (resource.startTime < 1000 && resource.responseEnd > 3000) {
            const warning = `Resource ${resource.name} took too long to load after preload`
            setWarnings(prev => [...prev, warning])
          }
        }
      })
    })

    try {
      observer.observe({ entryTypes: ['resource'] })
    } catch (e) {
      // PerformanceObserver might not be available in all browsers
      console.log('Performance monitoring not available')
    }

    return () => observer.disconnect()
  }, [])

  // Log warnings in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && warnings.length > 0) {
      console.warn('Performance warnings:', warnings)
    }
  }, [warnings])

  return null // This component doesn't render anything
}

/**
 * Hook to optimize resource loading based on user interaction
 */
export const useOptimizedResourceLoad = () => {
  useEffect(() => {
    // Add prefetch for critical resources on user interaction
    const handleUserInteraction = () => {
      // Prefetch resources that might be needed soon
      const criticalResources = [
        '/api/products',
        '/api/artisans'
      ]

      criticalResources.forEach(url => {
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.href = url
        document.head.appendChild(link)
      })

      // Remove listener after first interaction
      document.removeEventListener('mouseover', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
    }

    // Add listeners for user interaction
    document.addEventListener('mouseover', handleUserInteraction)
    document.addEventListener('touchstart', handleUserInteraction)

    return () => {
      document.removeEventListener('mouseover', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
    }
  }, [])
}
