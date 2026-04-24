'use client'

import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function CartButton() {
  const { toggleCart, totalItems } = useCart()

  return (
    <button
      onClick={toggleCart}
      style={{ background:'none', border:'none', cursor:'pointer', color:'var(--brown)', display:'flex', position:'relative', padding:0 }}
      aria-label={`Panier — ${totalItems} article${totalItems > 1 ? 's' : ''}`}
    >
      <ShoppingBag size={18} strokeWidth={1.5} />
      {totalItems > 0 && (
        <span style={{
          position:'absolute', top:'-7px', right:'-7px',
          background:'var(--gold)', color:'var(--ink)',
          width:'17px', height:'17px', borderRadius:'50%',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'9px', fontWeight:700,
          transition:'transform 0.2s',
        }}>
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </button>
  )
}