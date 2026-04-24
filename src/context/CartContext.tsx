'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export interface CartItem {
  id: string        // unique: slug + size + color
  slug: string
  name: string
  collection: string
  price: number
  size: string
  color: string
  colorValue: string
  qty: number
  bg: string
}

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  addItem: (item: Omit<CartItem, 'id' | 'qty'>) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([
    // Données de démo — retirer en prod
    { id:'chemise-oxford-premium-M-Blanc', slug:'chemise-oxford-premium', name:'Chemise Oxford Premium', collection:'Classique', price:89, size:'M', color:'Blanc', colorValue:'#F5F0E8', qty:1, bg:'var(--cream-dark)' },
    { id:'chemise-lin-blanc-L-Naturel',    slug:'chemise-lin-blanc',      name:'Chemise Lin Blanc',      collection:'Lin & Été',  price:95, size:'L', color:'Naturel', colorValue:'#D8CEBC', qty:2, bg:'#D8CEBC' },
  ])
  const [isOpen, setIsOpen] = useState(false)

  const openCart  = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])
  const toggleCart = useCallback(() => setIsOpen(o => !o), [])

  const addItem = useCallback((newItem: Omit<CartItem, 'id' | 'qty'>) => {
    const id = `${newItem.slug}-${newItem.size}-${newItem.color}`
    setItems(prev => {
      const existing = prev.find(i => i.id === id)
      if (existing) return prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...newItem, id, qty: 1 }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty < 1) return
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((s, i) => s + i.qty, 0)
  const totalPrice = items.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ items, isOpen, openCart, closeCart, toggleCart, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}