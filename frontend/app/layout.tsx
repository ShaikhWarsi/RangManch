import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import RoleSwitcher from '@/components/RoleSwitcher'
import ConnectionStatus from '@/components/ConnectionStatus'
import AICraftRecommender from '@/components/AICraftRecommender'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RangManch - Cultural Heritage Platform',
  description: 'Connecting artisans and collectors to preserve India\'s timeless heritage',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://modelviewer.dev" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            {children}
            <ConnectionStatus />
            <RoleSwitcher />
            <AICraftRecommender />
          </CartProvider>
        </AuthProvider>
        <Script
          id="razorpay-checkout"
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
