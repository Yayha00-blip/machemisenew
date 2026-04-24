'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalItems, totalPrice } = useCart()
  const sidebarRef = useRef<HTMLDivElement>(null)

  const shipping  = totalPrice >= 150 ? 0 : 9.9
  const total     = totalPrice + shipping

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeCart() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [closeCart])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        style={{
          position: 'fixed', inset: 0, zIndex: 98,
          background: 'rgba(26,22,17,0.5)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'all' : 'none',
          transition: 'opacity 0.35s ease',
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Sidebar panel */}
      <div
        ref={sidebarRef}
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 99,
          width: '100%', maxWidth: '460px',
          background: 'var(--cream)',
          display: 'flex', flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          boxShadow: isOpen ? '-8px 0 40px rgba(26,22,17,0.15)' : 'none',
        }}
      >
        {/* ── Header ── */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'24px 28px', borderBottom:'0.5px solid var(--tan)', flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <ShoppingBag size={18} strokeWidth={1.5} color="var(--espresso)" />
            <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'20px', fontWeight:400 }}>
              Mon Panier
            </h2>
            {totalItems > 0 && (
              <span style={{ background:'var(--espresso)', color:'var(--cream)', fontSize:'10px', fontWeight:600, padding:'3px 8px', borderRadius:'12px' }}>
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            style={{ background:'none', border:'none', cursor:'pointer', color:'var(--brown)', display:'flex', padding:'4px', transition:'color 0.2s' }}
            aria-label="Fermer le panier"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* ── Items ── */}
        <div style={{ flex:1, overflowY:'auto', padding:'24px 28px' }}>
          {items.length === 0 ? (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:'20px', paddingBottom:'64px' }}>
              <ShoppingBag size={48} strokeWidth={1} color="var(--tan)" />
              <div style={{ textAlign:'center' }}>
                <p style={{ fontFamily:'var(--font-serif)', fontSize:'20px', fontWeight:400, marginBottom:'8px' }}>Votre panier est vide</p>
                <p style={{ fontSize:'13px', color:'var(--brown)', letterSpacing:'0.04em', lineHeight:1.6 }}>
                  Découvrez nos chemises et commencez votre sélection.
                </p>
              </div>
              <button
                onClick={closeCart}
                style={{ padding:'13px 28px', background:'var(--espresso)', color:'var(--cream)', border:'none', cursor:'pointer', fontSize:'10px', fontWeight:500, letterSpacing:'0.18em', textTransform:'uppercase', fontFamily:'var(--font-sans)' }}
              >
                Voir les collections
              </button>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:'0' }}>
              {items.map((item, i) => (
                <div
                  key={item.id}
                  style={{ display:'flex', gap:'16px', padding:'20px 0', borderBottom:'0.5px solid var(--cream-dark)' }}
                >
                  {/* Product image */}
                  <Link href={`/produits/${item.slug}`} onClick={closeCart} style={{ textDecoration:'none', flexShrink:0 }}>
                    <div style={{ width:'80px', height:'100px', background:item.bg, position:'relative', overflow:'hidden' }}>
                      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-55%)', width:'42%', aspectRatio:'1/1.4', background:'rgba(255,255,255,0.15)', borderRadius:'1px' }} />
                    </div>
                  </Link>

                  {/* Info */}
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'4px' }}>
                      <Link href={`/produits/${item.slug}`} onClick={closeCart} style={{ textDecoration:'none' }}>
                        <p style={{ fontFamily:'var(--font-alt)', fontSize:'15px', fontWeight:400, color:'var(--ink)', lineHeight:1.3 }}>{item.name}</p>
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        style={{ background:'none', border:'none', cursor:'pointer', color:'var(--brown-light)', display:'flex', padding:'2px', marginLeft:'8px', flexShrink:0, transition:'color 0.2s' }}
                        aria-label="Supprimer"
                      >
                        <Trash2 size={14} strokeWidth={1.5} />
                      </button>
                    </div>

                    <p style={{ fontSize:'11px', color:'var(--brown)', letterSpacing:'0.06em', marginBottom:'2px' }}>{item.collection}</p>

                    <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'12px' }}>
                      <div style={{ width:'12px', height:'12px', borderRadius:'50%', background:item.colorValue, border:'0.5px solid var(--tan)', flexShrink:0 }} />
                      <span style={{ fontSize:'11px', color:'var(--brown-light)', letterSpacing:'0.04em' }}>
                        {item.color} · Taille {item.size}
                      </span>
                    </div>

                    {/* Qty + price */}
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <div style={{ display:'flex', alignItems:'center', border:'0.5px solid var(--tan)', height:'32px' }}>
                        <button
                          onClick={() => item.qty > 1 ? updateQty(item.id, item.qty - 1) : removeItem(item.id)}
                          style={{ width:'32px', height:'100%', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--brown)' }}
                        >
                          <Minus size={12} strokeWidth={1.5} />
                        </button>
                        <span style={{ width:'28px', textAlign:'center', fontSize:'13px', borderLeft:'0.5px solid var(--tan)', borderRight:'0.5px solid var(--tan)', lineHeight:'32px' }}>
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          style={{ width:'32px', height:'100%', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--brown)' }}
                        >
                          <Plus size={12} strokeWidth={1.5} />
                        </button>
                      </div>
                      <p style={{ fontSize:'15px', fontWeight:500 }}>{(item.price * item.qty).toFixed(2)} €</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        {items.length > 0 && (
          <div style={{ padding:'24px 28px', borderTop:'0.5px solid var(--tan)', flexShrink:0, background:'var(--cream)' }}>

            {/* Progress bar livraison gratuite */}
            {shipping > 0 && (
              <div style={{ marginBottom:'16px' }}>
                <p style={{ fontSize:'11px', color:'var(--brown)', letterSpacing:'0.04em', marginBottom:'8px' }}>
                  Plus que <strong>{(150 - totalPrice).toFixed(2)} €</strong> pour la livraison gratuite 🚚
                </p>
                <div style={{ height:'3px', background:'var(--cream-dark)', borderRadius:'2px', overflow:'hidden' }}>
                  <div style={{ height:'100%', background:'var(--gold)', width:`${Math.min((totalPrice / 150) * 100, 100)}%`, borderRadius:'2px', transition:'width 0.4s ease' }} />
                </div>
              </div>
            )}
            {shipping === 0 && (
              <p style={{ fontSize:'11px', color:'#4A7C59', letterSpacing:'0.04em', marginBottom:'16px', fontWeight:500 }}>
                🎉 Livraison offerte !
              </p>
            )}

            {/* Totaux */}
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'8px', fontSize:'13px', color:'var(--brown)' }}>
              <span>Sous-total</span><span>{totalPrice.toFixed(2)} €</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'16px', fontSize:'13px', color:'var(--brown)' }}>
              <span>Livraison</span>
              <span style={{ color: shipping === 0 ? '#4A7C59' : 'var(--ink)' }}>
                {shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)} €`}
              </span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'20px', paddingTop:'16px', borderTop:'0.5px solid var(--tan)' }}>
              <span style={{ fontFamily:'var(--font-sans)', fontSize:'11px', fontWeight:500, letterSpacing:'0.16em', textTransform:'uppercase' }}>Total TTC</span>
              <span style={{ fontFamily:'var(--font-serif)', fontSize:'22px', fontWeight:400 }}>{total.toFixed(2)} €</span>
            </div>

            {/* CTA */}
            <Link
              href="/checkout"
              onClick={closeCart}
              style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', width:'100%', padding:'16px', background:'var(--espresso)', color:'var(--cream)', fontFamily:'var(--font-sans)', fontSize:'10px', fontWeight:500, letterSpacing:'0.2em', textTransform:'uppercase', textDecoration:'none', marginBottom:'10px', boxSizing:'border-box' }}
            >
              Commander — {total.toFixed(2)} €
            </Link>
            <button
              onClick={closeCart}
              style={{ width:'100%', padding:'13px', background:'transparent', color:'var(--brown)', border:'0.5px solid var(--tan)', cursor:'pointer', fontFamily:'var(--font-sans)', fontSize:'10px', fontWeight:500, letterSpacing:'0.18em', textTransform:'uppercase' }}
            >
              Continuer mes achats
            </button>
          </div>
        )}
      </div>
    </>
  )
}