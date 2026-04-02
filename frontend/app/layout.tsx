import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import RoleSwitcher from '@/components/RoleSwitcher'
import ConnectionStatus from '@/components/ConnectionStatus'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AC-DC - Innovation Team',
  description: 'Cultural Heritage Platform',
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
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            {children}
            <ConnectionStatus />
            <RoleSwitcher />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
