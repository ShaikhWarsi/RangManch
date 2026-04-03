'use client'

import { useEffect } from 'react'
import Home from '@/components/Home'

export default function HomePage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('aos').then((AOS) => {
        AOS.default.init({
          duration: 1000,
          once: true,
          offset: 0
        })
      })
    }
  }, [])

  return <Home />
}