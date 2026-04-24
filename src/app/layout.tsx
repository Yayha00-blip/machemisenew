import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartSidebar from '@/components/cart/CartSidebar'
import { CartProvider } from '@/context/CartContext'

export const metadata: Metadata = {
  title: 'La Chemiserie — Chemises haut de gamme',
  description: 'Collection de chemises élégantes pour homme. Coupe soignée, matières nobles, savoir-faire français.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  )
}