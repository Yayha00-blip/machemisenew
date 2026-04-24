'use client'

import { useState } from 'react'
import { Heart, ShoppingBag, Star, ChevronDown, Ruler } from 'lucide-react'

interface Product {
  name: string
  collection: string
  price: number
  originalPrice: number | null
  description: string
  sizes: string[]
  colors: { name: string; value: string; available: boolean }[]
  rating: number
  reviewCount: number
  sku: string
  details: string[]
}

export default function ProductInfo({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize]   = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState(0)
  const [qty, setQty]                     = useState(1)
  const [wished, setWished]               = useState(false)
  const [added, setAdded]                 = useState(false)
  const [sizeError, setSizeError]         = useState(false)

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return }
    setSizeError(false)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div style={{ padding:'clamp(24px,4vw,48px)', borderLeft:'0.5px solid var(--tan)' }}>

      {/* Collection + rating */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px' }}>
        <p style={{ fontSize:'10px', fontWeight:500, letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--brown)' }}>
          {product.collection}
        </p>
        <div style={{ display:'flex', alignItems:'center', gap:'6px' }}>
          <div style={{ display:'flex', gap:'2px' }}>
            {[1,2,3,4,5].map(s => (
              <Star key={s} size={11} strokeWidth={0} fill={s <= Math.round(product.rating) ? 'var(--gold)' : 'var(--tan)'} />
            ))}
          </div>
          <span style={{ fontSize:'11px', color:'var(--brown)' }}>{product.rating} ({product.reviewCount} avis)</span>
        </div>
      </div>

      {/* Name */}
      <h1 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(28px,3vw,40px)', fontWeight:400, lineHeight:1.2, marginBottom:'16px' }}>
        {product.name}
      </h1>

      {/* Price */}
      <div style={{ display:'flex', alignItems:'baseline', gap:'12px', marginBottom:'24px' }}>
        <span style={{ fontFamily:'var(--font-serif)', fontSize:'28px', fontWeight:400 }}>{product.price} €</span>
        {product.originalPrice && (
          <span style={{ fontSize:'18px', color:'var(--brown-light)', textDecoration:'line-through' }}>{product.originalPrice} €</span>
        )}
        <span style={{ fontSize:'11px', color:'var(--brown)', letterSpacing:'0.08em' }}>TTC · Livraison offerte</span>
      </div>

      {/* Description */}
      <p style={{ fontFamily:'var(--font-alt)', fontSize:'16px', fontWeight:300, color:'var(--brown)', lineHeight:1.75, marginBottom:'32px', borderBottom:'0.5px solid var(--tan)', paddingBottom:'32px' }}>
        {product.description}
      </p>

      {/* Color selector */}
      <div style={{ marginBottom:'28px' }}>
        <p style={{ fontSize:'10px', fontWeight:500, letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:'12px' }}>
          Couleur — <span style={{ color:'var(--brown)', fontWeight:400 }}>{product.colors[selectedColor].name}</span>
        </p>
        <div style={{ display:'flex', gap:'10px' }}>
          {product.colors.map((color, i) => (
            <button
              key={color.name}
              onClick={() => color.available && setSelectedColor(i)}
              title={color.name}
              style={{
                width:'32px', height:'32px',
                borderRadius:'50%',
                background: color.value,
                border: selectedColor === i ? '2px solid var(--espresso)' : '1px solid var(--tan)',
                cursor: color.available ? 'pointer' : 'not-allowed',
                outline: selectedColor === i ? '2px solid var(--cream)' : 'none',
                outlineOffset:'-4px',
                opacity: color.available ? 1 : 0.35,
                position:'relative',
                transition:'border 0.2s, transform 0.2s',
                transform: selectedColor === i ? 'scale(1.1)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Size selector */}
      <div style={{ marginBottom:'28px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px' }}>
          <p style={{ fontSize:'10px', fontWeight:500, letterSpacing:'0.18em', textTransform:'uppercase' }}>
            Taille {selectedSize && <span style={{ color:'var(--brown)', fontWeight:400 }}>— {selectedSize}</span>}
          </p>
          <button style={{ display:'flex', alignItems:'center', gap:'4px', background:'none', border:'none', cursor:'pointer', fontSize:'10px', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--brown)' }}>
            <Ruler size={12} strokeWidth={1.5} /> Guide des tailles
          </button>
        </div>

        <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
          {product.sizes.map(size => (
            <button
              key={size}
              onClick={() => { setSelectedSize(size); setSizeError(false) }}
              style={{
                width:'52px', height:'52px',
                background: selectedSize === size ? 'var(--espresso)' : 'var(--cream)',
                color: selectedSize === size ? 'var(--cream)' : 'var(--ink)',
                border: sizeError ? '1px solid #C0392B' : selectedSize === size ? '1px solid var(--espresso)' : '0.5px solid var(--tan)',
                fontSize:'12px',
                fontWeight: selectedSize === size ? 500 : 400,
                letterSpacing:'0.08em',
                cursor:'pointer',
                transition:'all 0.2s',
                fontFamily:'var(--font-sans)',
              }}
            >
              {size}
            </button>
          ))}
        </div>
        {sizeError && (
          <p style={{ fontSize:'11px', color:'#C0392B', marginTop:'8px', letterSpacing:'0.06em' }}>
            Veuillez sélectionner une taille
          </p>
        )}
      </div>

      {/* Quantity + Add to cart */}
      <div style={{ display:'flex', gap:'12px', marginBottom:'16px' }}>
        {/* Qty */}
        <div style={{ display:'flex', border:'0.5px solid var(--tan)', height:'52px' }}>
          <button onClick={() => qty > 1 && setQty(q => q - 1)} style={{ width:'44px', background:'none', border:'none', cursor:'pointer', fontSize:'18px', color:'var(--brown)' }}>−</button>
          <span style={{ width:'40px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'14px', borderLeft:'0.5px solid var(--tan)', borderRight:'0.5px solid var(--tan)' }}>{qty}</span>
          <button onClick={() => setQty(q => q + 1)} style={{ width:'44px', background:'none', border:'none', cursor:'pointer', fontSize:'18px', color:'var(--brown)' }}>+</button>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          style={{
            flex:1, height:'52px',
            background: added ? '#4A7C59' : 'var(--espresso)',
            color: 'var(--cream)',
            border:'none', cursor:'pointer',
            fontSize:'10px', fontWeight:500, letterSpacing:'0.2em', textTransform:'uppercase',
            fontFamily:'var(--font-sans)',
            display:'flex', alignItems:'center', justifyContent:'center', gap:'10px',
            transition:'background 0.3s',
          }}
        >
          <ShoppingBag size={15} strokeWidth={1.5} />
          {added ? 'Ajouté au panier ✓' : 'Ajouter au panier'}
        </button>

        {/* Wishlist */}
        <button
          onClick={() => setWished(!wished)}
          style={{ width:'52px', height:'52px', background:'none', border:'0.5px solid var(--tan)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color: wished ? 'var(--gold)' : 'var(--brown)', transition:'color 0.2s, border-color 0.2s' }}
          aria-label="Favoris"
        >
          <Heart size={16} strokeWidth={1.5} fill={wished ? 'var(--gold)' : 'none'} />
        </button>
      </div>

      {/* Trust badges */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px', marginTop:'24px', paddingTop:'24px', borderTop:'0.5px solid var(--tan)' }}>
        {[
          { icon:'🚚', text:'Livraison offerte dès 150 €' },
          { icon:'↩️', text:'Retours gratuits 30 jours' },
          { icon:'🔒', text:'Paiement 100% sécurisé' },
          { icon:'✂️', text:'Coupe soignée, taille vrai' },
        ].map(({ icon, text }) => (
          <div key={text} style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'11px', color:'var(--brown)', letterSpacing:'0.04em' }}>
            <span style={{ fontSize:'14px' }}>{icon}</span> {text}
          </div>
        ))}
      </div>

      {/* SKU */}
      <p style={{ fontSize:'10px', color:'var(--brown-light)', letterSpacing:'0.1em', marginTop:'20px' }}>
        Réf. {product.sku}
      </p>
    </div>
  )
}