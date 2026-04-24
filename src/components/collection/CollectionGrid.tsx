'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Heart, SlidersHorizontal, X, ChevronDown } from 'lucide-react'

interface Product {
  id: number
  name: string
  collection: string
  price: number
  slug: string
  badge: string | null
  bg: string
  colors: string[]
  available: boolean
}

type SortOption = 'pertinence' | 'prix-asc' | 'prix-desc' | 'nouveautes'

const sortLabels: Record<SortOption, string> = {
  pertinence:  'Pertinence',
  'prix-asc':  'Prix croissant',
  'prix-desc': 'Prix décroissant',
  nouveautes:  'Nouveautés',
}

const priceRanges = [
  { label:'Moins de 90 €',  min:0,   max:90  },
  { label:'90 € — 110 €',   min:90,  max:110 },
  { label:'Plus de 110 €',  min:110, max:9999 },
]

export default function CollectionGrid({ products, collectionName }: { products: Product[]; collectionName: string }) {
  const [sort, setSort]               = useState<SortOption>('pertinence')
  const [showFilters, setShowFilters] = useState(false)
  const [priceFilter, setPriceFilter] = useState<number | null>(null)
  const [availOnly, setAvailOnly]     = useState(false)
  const [wished, setWished]           = useState<Set<number>>(new Set())
  const [sortOpen, setSortOpen]       = useState(false)
  const [view, setView]               = useState<'grid' | 'large'>('grid')

  const filtered = useMemo(() => {
    let list = [...products]
    if (availOnly) list = list.filter(p => p.available)
    if (priceFilter !== null) {
      const range = priceRanges[priceFilter]
      list = list.filter(p => p.price >= range.min && p.price < range.max)
    }
    switch (sort) {
      case 'prix-asc':  list.sort((a,b) => a.price - b.price); break
      case 'prix-desc': list.sort((a,b) => b.price - a.price); break
      case 'nouveautes': list.sort((a,b) => (a.badge === 'Nouveau' ? -1 : 1)); break
    }
    return list
  }, [products, sort, priceFilter, availOnly])

  const activeFiltersCount = (priceFilter !== null ? 1 : 0) + (availOnly ? 1 : 0)

  const toggleWish = (id: number) => {
    setWished(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div style={{ padding:'0 clamp(24px,5vw,64px) clamp(48px,6vw,80px)' }}>

      {/* ── Toolbar ── */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'20px 0', borderBottom:'0.5px solid var(--tan)', marginBottom:'32px', gap:'12px', flexWrap:'wrap' }}>

        {/* Left — filter toggle + active count */}
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          <button
            onClick={() => setShowFilters(f => !f)}
            style={{ display:'flex', alignItems:'center', gap:'8px', background:'none', border:'0.5px solid var(--tan)', padding:'10px 18px', cursor:'pointer', fontSize:'10px', fontWeight:500, letterSpacing:'0.15em', textTransform:'uppercase', fontFamily:'var(--font-sans)', color:'var(--brown)', transition:'background 0.2s, color 0.2s', background: showFilters ? 'var(--espresso)' : 'none', color: showFilters ? 'var(--cream)' : 'var(--brown)' } as React.CSSProperties}
          >
            <SlidersHorizontal size={13} strokeWidth={1.5} />
            Filtres
            {activeFiltersCount > 0 && (
              <span style={{ background:'var(--gold)', color:'var(--ink)', width:'18px', height:'18px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'9px', fontWeight:700 }}>
                {activeFiltersCount}
              </span>
            )}
          </button>

          <p style={{ fontSize:'12px', color:'var(--brown-light)', letterSpacing:'0.06em' }}>
            {filtered.length} résultat{filtered.length > 1 ? 's' : ''}
          </p>

          {/* Active filter tags */}
          {priceFilter !== null && (
            <button onClick={() => setPriceFilter(null)} style={{ display:'flex', alignItems:'center', gap:'5px', background:'var(--cream-dark)', border:'0.5px solid var(--tan)', padding:'5px 10px', cursor:'pointer', fontSize:'10px', color:'var(--brown)', fontFamily:'var(--font-sans)' }}>
              {priceRanges[priceFilter].label} <X size={10} strokeWidth={2} />
            </button>
          )}
          {availOnly && (
            <button onClick={() => setAvailOnly(false)} style={{ display:'flex', alignItems:'center', gap:'5px', background:'var(--cream-dark)', border:'0.5px solid var(--tan)', padding:'5px 10px', cursor:'pointer', fontSize:'10px', color:'var(--brown)', fontFamily:'var(--font-sans)' }}>
              En stock <X size={10} strokeWidth={2} />
            </button>
          )}
        </div>

        {/* Right — sort + view */}
        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
          {/* View toggle */}
          <div style={{ display:'flex', border:'0.5px solid var(--tan)' }}>
            {(['grid', 'large'] as const).map(v => (
              <button key={v} onClick={() => setView(v)} style={{ width:'36px', height:'36px', background: view === v ? 'var(--espresso)' : 'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color: view === v ? 'var(--cream)' : 'var(--brown)', transition:'background 0.2s' }}>
                {v === 'grid'
                  ? <svg width="13" height="13" viewBox="0 0 12 12" fill="currentColor"><rect x="0" y="0" width="5" height="5"/><rect x="7" y="0" width="5" height="5"/><rect x="0" y="7" width="5" height="5"/><rect x="7" y="7" width="5" height="5"/></svg>
                  : <svg width="13" height="13" viewBox="0 0 12 12" fill="currentColor"><rect x="0" y="0" width="5" height="12"/><rect x="7" y="0" width="5" height="12"/></svg>
                }
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div style={{ position:'relative' }}>
            <button onClick={() => setSortOpen(o => !o)} style={{ display:'flex', alignItems:'center', gap:'8px', background:'none', border:'0.5px solid var(--tan)', padding:'10px 16px', cursor:'pointer', fontSize:'10px', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', fontFamily:'var(--font-sans)', color:'var(--brown)' }}>
              {sortLabels[sort]} <ChevronDown size={12} strokeWidth={1.5} style={{ transform: sortOpen ? 'rotate(180deg)' : 'none', transition:'transform 0.2s' }} />
            </button>
            {sortOpen && (
              <div style={{ position:'absolute', top:'calc(100% + 4px)', right:0, background:'var(--cream)', border:'0.5px solid var(--tan)', minWidth:'180px', zIndex:20, padding:'4px 0' }}>
                {(Object.keys(sortLabels) as SortOption[]).map(s => (
                  <button key={s} onClick={() => { setSort(s); setSortOpen(false) }} style={{ display:'block', width:'100%', padding:'11px 18px', background: sort === s ? 'var(--cream-dark)' : 'none', border:'none', cursor:'pointer', textAlign:'left', fontSize:'12px', letterSpacing:'0.06em', color: sort === s ? 'var(--ink)' : 'var(--brown)', fontFamily:'var(--font-sans)', fontWeight: sort === s ? 500 : 400 }}>
                    {sortLabels[s]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ display:'flex', gap:'32px', alignItems:'flex-start' }}>

        {/* ── Filters sidebar ── */}
        {showFilters && (
          <div style={{ width:'220px', flexShrink:0, position:'sticky', top:'112px' }}>

            <div style={{ marginBottom:'28px' }}>
              <p style={{ fontSize:'10px', fontWeight:500, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'14px', color:'var(--ink)' }}>Prix</p>
              {priceRanges.map((range, i) => (
                <label key={range.label} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'8px 0', cursor:'pointer', fontSize:'13px', color: priceFilter === i ? 'var(--ink)' : 'var(--brown)', borderBottom:'0.5px solid var(--cream-dark)' }}>
                  <input type="radio" name="price" checked={priceFilter === i} onChange={() => setPriceFilter(priceFilter === i ? null : i)} style={{ accentColor:'var(--espresso)', width:'14px', height:'14px' }} />
                  {range.label}
                </label>
              ))}
            </div>

            <div style={{ marginBottom:'28px' }}>
              <p style={{ fontSize:'10px', fontWeight:500, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:'14px', color:'var(--ink)' }}>Disponibilité</p>
              <label style={{ display:'flex', alignItems:'center', gap:'10px', cursor:'pointer', fontSize:'13px', color:'var(--brown)' }}>
                <input type="checkbox" checked={availOnly} onChange={e => setAvailOnly(e.target.checked)} style={{ accentColor:'var(--espresso)', width:'14px', height:'14px' }} />
                En stock uniquement
              </label>
            </div>

            {activeFiltersCount > 0 && (
              <button onClick={() => { setPriceFilter(null); setAvailOnly(false) }} style={{ fontSize:'10px', letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--brown)', background:'none', border:'none', cursor:'pointer', padding:0, textDecoration:'underline', fontFamily:'var(--font-sans)' }}>
                Réinitialiser les filtres
              </button>
            )}
          </div>
        )}

        {/* ── Product grid ── */}
        <div style={{ flex:1 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign:'center', padding:'64px 0' }}>
              <p style={{ fontFamily:'var(--font-serif)', fontSize:'22px', fontWeight:400, marginBottom:'12px' }}>Aucun résultat</p>
              <p style={{ fontSize:'13px', color:'var(--brown)' }}>Essayez de modifier vos filtres.</p>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns: view === 'large' ? 'repeat(2,1fr)' : 'repeat(auto-fill,minmax(220px,1fr))', gap: view === 'large' ? '24px' : '20px 14px' }}>
              {filtered.map(product => (
                <div key={product.id} style={{ position:'relative' }} className="col-product-card">

                  <Link href={`/produits/${product.slug}`} style={{ display:'block', textDecoration:'none', color:'inherit' }}>
                    <div style={{ background:product.bg, aspectRatio:'3/4', position:'relative', overflow:'hidden', marginBottom:'12px', opacity: product.available ? 1 : 0.6 }}>
                      <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-55%)', width:'42%', aspectRatio:'1/1.4', background:'rgba(255,255,255,0.12)', borderRadius:'1px' }} />

                      {/* Badge */}
                      {product.badge && (
                        <div style={{ position:'absolute', top:'12px', left:'12px', background: product.badge === 'Bestseller' ? 'var(--gold)' : product.badge === 'Exclusif' ? 'var(--gold)' : 'var(--espresso)', color: product.badge === 'Bestseller' || product.badge === 'Exclusif' ? 'var(--ink)' : 'var(--gold)', fontSize:'9px', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', padding:'4px 10px' }}>
                          {product.badge}
                        </div>
                      )}

                      {/* Out of stock */}
                      {!product.available && (
                        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(245,240,232,0.5)' }}>
                          <span style={{ fontSize:'10px', fontWeight:500, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--brown)', background:'var(--cream)', padding:'8px 16px' }}>Épuisé</span>
                        </div>
                      )}

                      {/* Quick add on hover */}
                      {product.available && (
                        <div className="col-quick-add" style={{ position:'absolute', bottom:0, left:0, right:0, background:'var(--espresso)', color:'var(--cream)', textAlign:'center', fontSize:'10px', fontWeight:500, letterSpacing:'0.16em', textTransform:'uppercase', padding:'14px', transform:'translateY(100%)', transition:'transform 0.3s ease' }}>
                          Choisir ma taille
                        </div>
                      )}
                    </div>

                    <p style={{ fontFamily:'var(--font-alt)', fontSize:'15px', fontWeight:400, marginBottom:'3px' }}>{product.name}</p>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'8px' }}>
                      <p style={{ fontSize:'11px', color:'var(--brown)', letterSpacing:'0.06em' }}>{collectionName}</p>
                      <p style={{ fontSize:'13px', fontWeight:500 }}>{product.price} €</p>
                    </div>
                  </Link>

                  {/* Color dots */}
                  <div style={{ display:'flex', gap:'5px', marginBottom:'4px' }}>
                    {product.colors.map(c => (
                      <div key={c} style={{ width:'11px', height:'11px', borderRadius:'50%', background:c, border:'0.5px solid var(--tan)' }} />
                    ))}
                  </div>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWish(product.id)}
                    style={{ position:'absolute', top:'12px', right:'12px', background:'var(--cream)', border:'none', width:'32px', height:'32px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color: wished.has(product.id) ? 'var(--gold)' : 'var(--brown)' }}
                    aria-label="Favoris"
                  >
                    <Heart size={13} strokeWidth={1.5} fill={wished.has(product.id) ? 'var(--gold)' : 'none'} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <style>{`.col-product-card:hover .col-quick-add { transform: translateY(0) !important; }`}</style>
        </div>
      </div>
    </div>
  )
}