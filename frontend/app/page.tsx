'use client'

import { useEffect } from 'react'
import Home from '@/legacy-pages/Home'

export default function HomePage() {
  useEffect(() => {
    // Initialize AOS
    if (typeof window !== 'undefined') {
      const AOS = require('aos')
      AOS.init({
        duration: 1000,
        once: true
      })
    }
  }, [])

  return <Home />
}
