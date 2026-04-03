'use client'

import { useEffect } from 'react'

/**
 * Hook to dynamically preconnect to external resources only when needed
 * Prevents unused resource warnings by only preconnecting when component mounts
 */
export const usePreconnect = (urls: string[]) => {
  useEffect(() => {
    urls.forEach(url => {
      // Check if preconnect already exists
      const existingLink = document.querySelector(`link[rel="preconnect"][href="${url}"]`)
      
      if (!existingLink) {
        const link = document.createElement('link')
        link.rel = 'preconnect'
        link.href = url
        
        // Add crossorigin for Google Fonts
        if (url.includes('fonts.gstatic.com')) {
          link.crossOrigin = ''
        }
        
        document.head.appendChild(link)
        
        // Optional: Clean up when component unmounts
        return () => {
          if (document.head.contains(link)) {
            document.head.removeChild(link)
          }
        }
      }
    })
  }, urls)
}

/**
 * Hook to dynamically preload specific resources
 * Use this for critical resources that will be used immediately
 */
export const usePreload = (resources: Array<{ href: string; as: string; type?: string }>) => {
  useEffect(() => {
    resources.forEach(({ href, as, type }) => {
      // Check if preload already exists
      const existingLink = document.querySelector(`link[rel="preload"][href="${href}"]`)
      
      if (!existingLink) {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.href = href
        link.as = as
        
        if (type) {
          link.type = type
        }
        
        document.head.appendChild(link)
      }
    })
  }, resources)
}
