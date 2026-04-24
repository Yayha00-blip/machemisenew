'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart } from 'lucide-react'

const products = [
  { id:1, name:'Chemise Oxford Premium', collection:'Classique',  price:89,  slug:'chemise-oxford-premium', badge:'Bestseller', badgeBg:'var(--gold)',     badgeColor:'var(--ink)',   bg:'var(--cream-dark)', colors:['#2C2416','#C8BDA8','#F5F0E8'] },
  { id:2, name:'Chemise Lin Blanc',      collection:'Lin & Été',  price:95,  slug:'chemise-lin-blanc',      badge:null,         badgeBg:'',                badgeColor:'',             bg:'#D8CEBC',           colors:['#F5F0E8','#2C2416'] },
  { id:3, name:'Rayures Fines Navy',     collection:'Classique',  price:110, slug:'rayures-fines-navy',     badge:'Nouveau',    badgeBg:'var(--espresso)', badgeColor:'var(--gold)',  bg:'#B8C4D4',           colors:['#2C3E5C','#F5F0E8'] },
  { id:4, name:'Smoking Noir',           collection:'Cérémonie',  price:135, slug:'chemise-smoking-noir',   badge:'Exclusif',   badgeBg:'var(--gold)',     badgeColor:'var(--ink)',   bg:'var(--espresso)',   colors:['#1a1611','#D4A853'] },
  { id:5, name:'Popeline Blanche',       collection:'Classique',  price:79,  slug:'popeline-blanche',       badge:null,         badgeBg:'',                badgeColor:'',             bg:'#EDE7DC',           colors:['#F5F0E8','#2C2416'] },
  { id:6, name:'Vichy Terracotta',       collection:'Casual',     price:92,  slug:'vichy-terracotta',       badge:'Nouveau',    badgeBg:'var(--espresso)', badgeColor:'var(--gold)',  bg:'#D4906A',           colors:['#D4906A','#F5F0E8'] },
  { id:7, name:'Lin Sable',              collection:'Lin & Été',  price:98,  slug:'lin-sable',              badge:null,         badgeBg:'',                badgeColor:'',             bg:'#C8B898',           colors:['#C8B898','#F5F0E8'] },
  { id:8, name:'Flanelle Bleu Nuit',     collection:'Classique',  price:118, slug:'flanelle-bleu-nuit',     badge:null,         badgeBg:'',                badgeColor:'',             bg:'#3A4A5C',           colors:['#3A4A5C','#F5F0E8','#D4A853'] },
]

function ProductCard({ product }: { product: typeof products[0] }) {
  const [wished, setWished] = useState(false)

  return (
    <div style={{ position:'relative' }} className="product-card">
      <Link href={`/produits/${product.slug}`} style={{ display:'block', textDecoration:'none' }}>
        <div style={{ background:product.bg, aspectRatio:'3/4', position:'relative', overflow:'hidden', marginBottom:'12px' }}>
          {/* Shirt placeholder */}
          <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-55%)', width:'42%', aspectRatio:'1/1.4', background:'rgba(255,255,255,0.12)', borderRadius:'1px' }} />

          {/* Badge */}
          {product.badge && (
            <div style={{ position:'absolute', top:'12px', left:'12px', background:product.badgeBg, color:product.badgeColor, fontSize:'9px', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', padding:'4px 10px' }}>
              {product.badge}
            </div>
          )}

          {/* Quick add — shown via CSS hover on parent */}
          <div className="quick-add" style={{ position:'absolute', bottom:0, left:0, right:0, background:'var(--espresso)', color:'var(--cream)', textAlign:'center', fontSize:'10px', fontWeight:500, letterSpacing:'0.16em', textTransform:'uppercase', padding:'14px', transform:'translateY(100%)', transition:'transform 0.3s ease' }}>
            Choisir ma taille
          </div>
        </div>
      </Link>

      {/* Wishlist */}
      <button onClick={() => setWished(!wished)} style={{ position:'absolute', top:'12px', right:'12px', background:'var(--cream)', border:'none', width:'32px', height:'32px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color: wished ? 'var(--gold)' : 'var(--brown)' }} aria-label="Favoris">
        <Heart size={14} strokeWidth={1.5} fill={wished ? 'var(--gold)' : 'none'} />
      </button>

      {/* Info */}
      <div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'2px' }}>
          <Link href={`/produits/${product.slug}`} style={{ fontFamily:'var(--font-alt)', fontSize:'15px', fontWeight:400, color:'var(--ink)', letterSpacing:'0.02em', textDecoration:'none' }}>
            {product.name}
          </Link>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px' }}>
          <p style={{ fontSize:'11px', color:'var(--brown)', letterSpacing:'0.08em' }}>{product.collection}</p>
          <p style={{ fontSize:'13px', fontWeight:500 }}>{product.price} €</p>
        </div>
        <div style={{ display:'flex', gap:'5px' }}>
          {product.colors.map(c => (
            <div key={c} style={{ width:'12px', height:'12px', borderRadius:'50%', background:c, border:'0.5px solid var(--tan)' }} />
          ))}
        </div>
      </div>

      <style>{`.product-card:hover .quick-add { transform: translateY(0) !important; }`}</style>
    </div>
  )
}

export default function Bestsellers() {
  return (
    <section id="bestsellers" style={{ padding:'0 clamp(24px,5vw,64px) clamp(48px,6vw,80px)' }}>
      <div style={{ height:'0.5px', background:'var(--tan)', marginBottom:'clamp(48px,6vw,80px)' }} />

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'40px' }}>
        <div>
          <p style={{ fontFamily:'var(--font-sans)', fontSize:'10px', fontWeight:500, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--brown-light)', marginBottom:'10px' }}>
            Meilleures Ventes
          </p>
          <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(28px,3vw,40px)', fontWeight:400, lineHeight:1.2 }}>
            Les incontournables <em style={{ fontStyle:'italic' }}>de la saison</em>
          </h2>
        </div>
        <Link href="/produits" style={{ fontSize:'10px', fontWeight:500, letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--brown)', borderBottom:'0.5px solid var(--brown)', paddingBottom:'2px', textDecoration:'none' }}>
          Tout voir →
        </Link>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'24px 16px' }}>
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  )
}