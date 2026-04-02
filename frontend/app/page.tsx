'use client'

import { useEffect } from 'react'
import Home from '@/components/Home'

export default function HomePage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const AOS = require('aos')
      AOS.init({
        duration: 1000,
        once: true,
        offset: 0
      })
    }
  }, [])

  return <Home />
}