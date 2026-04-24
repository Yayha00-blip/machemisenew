'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const cartItems = [
  { id:1, name:'Chemise Oxford Premium', collection:'Classique', size:'M', color:'Blanc', price:89, qty:1, bg:'var(--cream-dark)' },
  { id:2, name:'Chemise Lin Blanc',       collection:'Lin & Été',  size:'L', color:'Naturel', price:95, qty:2, bg:'#D8CEBC' },
]

export default function OrderSummary() {
  const [open, setOpen] = useState(true)

  const subtotal  = cartItems.reduce((s, i) => s + i.price * i.qty, 0)
  const shipping  = subtotal >= 150 ? 0 : 9.9
  const total     = subtotal + shipping

  return (
    <div style={{ background:'var(--cream-dark)', borderLeft:'0.5px solid var(--tan)', padding:'clamp(32px,4vw,56px)', position:'sticky', top:'0', maxHeight:'100vh', overflowY:'auto' }}>

      {/* Toggle header (mobile) */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', background:'none', border:'none', cursor:'pointer', marginBottom:'28px', padding:0 }}
      >
        <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
          <span style={{ fontSize:'18px' }}>🛍</span>
          <span style={{ fontFamily:'var(--font-serif)', fontSize:'18px', fontWeight:400 }}>Votre commande</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
          <span style={{ fontFamily:'var(--font-serif)', fontSize:'18px', fontWeight:400, color:'var(--gold)' }}>{total.toFixed(2)} €</span>
          <ChevronDown size={16} style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition:'transform 0.2s', color:'var(--brown)' }} />
        </div>
      </button>

      {open && (
        <>
          {/* Items */}
          <div style={{ display:'flex', flexDirection:'column', gap:'20px', marginBottom:'28px', paddingBottom:'28px', borderBottom:'0.5px solid var(--tan)' }}>
            {cartItems.map(item => (
              <div key={item.id} style={{ display:'flex', gap:'14px' }}>
                {/* Product image */}
                <div style={{ width:'72px', height:'88px', background:item.bg, flexShrink:0, position:'relative' }}>
                  <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-55%)', width:'40%', aspectRatio:'1/1.4', background:'rgba(255,255,255,0.15)', borderRadius:'1px' }} />
                  {/* Qty badge */}
                  <div style={{ position:'absolute', top:'-8px', right:'-8px', width:'20px', height:'20px', borderRadius:'50%', background:'var(--espresso)', color:'var(--cream)', fontSize:'10px', fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    {item.qty}
                  </div>
                </div>

                {/* Info */}
                <div style={{ flex:1 }}>
                  <p style={{ fontFamily:'var(--font-alt)', fontSize:'15px', fontWeight:400, marginBottom:'4px' }}>{item.name}</p>
                  <p style={{ fontSize:'11px', color:'var(--brown)', letterSpacing:'0.06em', marginBottom:'2px' }}>{item.collection}</p>
                  <p style={{ fontSize:'11px', color:'var(--brown-light)', letterSpacing:'0.04em' }}>
                    Taille {item.size} · {item.color}
                  </p>
                </div>

                <div style={{ textAlign:'right' }}>
                  <p style={{ fontSize:'14px', fontWeight:500 }}>{(item.price * item.qty).toFixed(2)} €</p>
                  {item.qty > 1 && <p style={{ fontSize:'10px', color:'var(--brown-light)' }}>{item.price} € / pièce</p>}
                </div>
              </div>
            ))}
          </div>

          {/* Totaux */}
          <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginBottom:'28px', paddingBottom:'28px', borderBottom:'0.5px solid var(--tan)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:'13px', color:'var(--brown)' }}>
              <span>Sous-total</span>
              <span>{subtotal.toFixed(2)} €</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:'13px', color:'var(--brown)' }}>
              <span>Livraison</span>
              <span style={{ color: shipping === 0 ? '#4A7C59' : 'var(--ink)' }}>
                {shipping === 0 ? 'Gratuite 🎉' : `${shipping.toFixed(2)} €`}
              </span>
            </div>
            {shipping > 0 && (
              <p style={{ fontSize:'11px', color:'var(--brown-light)', letterSpacing:'0.04em' }}>
                Plus que {(150 - subtotal).toFixed(2)} € pour la livraison gratuite
              </p>
            )}
          </div>

          {/* Total */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'28px' }}>
            <span style={{ fontFamily:'var(--font-sans)', fontSize:'11px', fontWeight:500, letterSpacing:'0.16em', textTransform:'uppercase' }}>Total TTC</span>
            <span style={{ fontFamily:'var(--font-serif)', fontSize:'28px', fontWeight:400 }}>{total.toFixed(2)} €</span>
          </div>

          {/* Garanties */}
          <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
            {[
              { icon:'🔒', text:'Paiement 100% sécurisé' },
              { icon:'↩️', text:'Retours gratuits sous 30 jours' },
              { icon:'🚚', text:'Expédition sous 24-48h' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display:'flex', alignItems:'center', gap:'10px', fontSize:'12px', color:'var(--brown)', letterSpacing:'0.04em' }}>
                <span style={{ fontSize:'14px' }}>{icon}</span> {text}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}