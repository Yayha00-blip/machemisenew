'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

interface Product {
  description: string
  details: string[]
  care: string[]
  rating: number
  reviewCount: number
}

const tabs = ['Description', 'Entretien', 'Avis clients']

const reviews = [
  { name:'Thomas M.', date:'Mars 2026', rating:5, text:"Qualité exceptionnelle, la coupe est parfaite. Je l'ai commandée en M et la taille correspond exactement au guide. Le tissu est doux et respirant, parfait pour le bureau." },
  { name:'Antoine L.', date:'Février 2026', rating:5, text:"Ma troisième chemise de cette marque. Toujours aussi satisfait. L'Oxford est d'une qualité remarquable, les boutonnières en nacre sont un vrai plus." },
  { name:'Julien R.', date:'Janvier 2026', rating:4, text:"Très belle chemise, le rendu est élégant. Légèrement plus ajustée que je ne pensais mais reste très confortable. Je recommande vivement." },
]

export default function ProductTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div style={{ borderTop:'0.5px solid var(--tan)', margin:'0 clamp(24px,5vw,64px) clamp(48px,6vw,80px)' }}>

      {/* Tab buttons */}
      <div style={{ display:'flex', borderBottom:'0.5px solid var(--tan)' }}>
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            style={{
              padding:'18px 32px',
              background:'none', border:'none', cursor:'pointer',
              fontSize:'10px', fontWeight:500, letterSpacing:'0.18em', textTransform:'uppercase',
              color: activeTab === i ? 'var(--ink)' : 'var(--brown)',
              borderBottom: activeTab === i ? '2px solid var(--espresso)' : '2px solid transparent',
              marginBottom:'-0.5px',
              fontFamily:'var(--font-sans)',
              transition:'color 0.2s',
            }}
          >
            {tab}
            {tab === 'Avis clients' && <span style={{ marginLeft:'6px', background:'var(--gold)', color:'var(--ink)', fontSize:'9px', padding:'2px 6px', borderRadius:'10px' }}>{product.reviewCount}</span>}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ padding:'40px 0', maxWidth:'800px' }}>

        {/* Description */}
        {activeTab === 0 && (
          <div>
            <p style={{ fontFamily:'var(--font-alt)', fontSize:'17px', fontWeight:300, color:'var(--brown)', lineHeight:1.8, marginBottom:'32px' }}>
              {product.description}
            </p>
            <h3 style={{ fontFamily:'var(--font-sans)', fontSize:'10px', fontWeight:500, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'16px' }}>
              Composition & Détails
            </h3>
            <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'10px' }}>
              {product.details.map(d => (
                <li key={d} style={{ display:'flex', gap:'12px', fontSize:'14px', color:'var(--brown)', letterSpacing:'0.04em', alignItems:'flex-start' }}>
                  <span style={{ width:'4px', height:'4px', borderRadius:'50%', background:'var(--gold)', flexShrink:0, marginTop:'8px' }} />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Care */}
        {activeTab === 1 && (
          <div>
            <h3 style={{ fontFamily:'var(--font-sans)', fontSize:'10px', fontWeight:500, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'16px' }}>
              Conseils d&apos;entretien
            </h3>
            <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'12px' }}>
              {product.care.map(c => (
                <li key={c} style={{ display:'flex', gap:'12px', fontSize:'14px', color:'var(--brown)', letterSpacing:'0.04em', alignItems:'flex-start' }}>
                  <span style={{ width:'4px', height:'4px', borderRadius:'50%', background:'var(--gold)', flexShrink:0, marginTop:'8px' }} />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Reviews */}
        {activeTab === 2 && (
          <div>
            {/* Summary */}
            <div style={{ display:'flex', alignItems:'center', gap:'24px', marginBottom:'40px', paddingBottom:'32px', borderBottom:'0.5px solid var(--tan)' }}>
              <div style={{ textAlign:'center' }}>
                <p style={{ fontFamily:'var(--font-serif)', fontSize:'56px', fontWeight:400, lineHeight:1 }}>{product.rating}</p>
                <div style={{ display:'flex', gap:'3px', justifyContent:'center', margin:'8px 0' }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} strokeWidth={0} fill={s <= Math.round(product.rating) ? 'var(--gold)' : 'var(--tan)'} />)}
                </div>
                <p style={{ fontSize:'11px', color:'var(--brown)' }}>{product.reviewCount} avis</p>
              </div>
              <div style={{ flex:1 }}>
                {[5,4,3,2,1].map(s => (
                  <div key={s} style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'6px' }}>
                    <span style={{ fontSize:'11px', color:'var(--brown)', width:'8px' }}>{s}</span>
                    <Star size={10} strokeWidth={0} fill="var(--gold)" />
                    <div style={{ flex:1, height:'4px', background:'var(--cream-dark)', borderRadius:'2px', overflow:'hidden' }}>
                      <div style={{ height:'100%', background:'var(--gold)', width: s === 5 ? '72%' : s === 4 ? '20%' : s === 3 ? '6%' : '1%', borderRadius:'2px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual reviews */}
            <div style={{ display:'flex', flexDirection:'column', gap:'28px' }}>
              {reviews.map(r => (
                <div key={r.name} style={{ paddingBottom:'28px', borderBottom:'0.5px solid var(--tan)' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'8px' }}>
                    <div>
                      <p style={{ fontSize:'13px', fontWeight:500, letterSpacing:'0.06em', marginBottom:'4px' }}>{r.name}</p>
                      <div style={{ display:'flex', gap:'3px' }}>
                        {[1,2,3,4,5].map(s => <Star key={s} size={11} strokeWidth={0} fill={s <= r.rating ? 'var(--gold)' : 'var(--tan)'} />)}
                      </div>
                    </div>
                    <p style={{ fontSize:'11px', color:'var(--brown-light)', letterSpacing:'0.06em' }}>{r.date}</p>
                  </div>
                  <p style={{ fontFamily:'var(--font-alt)', fontSize:'15px', fontWeight:300, color:'var(--brown)', lineHeight:1.7 }}>{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}