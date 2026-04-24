'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Heart, Menu, X, ChevronDown } from 'lucide-react'
import CartButton from '@/components/cart/CartButton'

const navLinks = [
  { label: 'Collections', href: '#collections', sub: ['Classique', 'Lin & Été', 'Cérémonie', 'Casual'] },
  { label: 'Nouveautés',  href: '#nouveautes' },
  { label: 'Soldes',      href: '#soldes' },
  { label: 'Notre Histoire', href: '#histoire' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header style={{ position:'sticky', top:0, zIndex:50 }}>
      {/* Announcement bar */}
      <div style={{ background:'var(--espresso)', color:'var(--tan)', textAlign:'center', padding:'8px 16px', fontSize:'10px', letterSpacing:'0.18em', textTransform:'uppercase' }}>
        Livraison offerte dès 150 € · Retours gratuits 30 jours
      </div>

      {/* Main nav */}
      <nav style={{ background:'var(--cream)', borderBottom: scrolled ? '0.5px solid var(--tan)' : '0.5px solid transparent', transition:'border-color 0.3s, box-shadow 0.3s', boxShadow: scrolled ? '0 2px 20px rgba(44,36,22,0.08)' : 'none', padding:'0 32px', height:'72px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'24px' }}>

        {/* Left links */}
        <div style={{ display:'flex', gap:'32px', flex:1 }}>
          {navLinks.map(link => (
            <div key={link.label} style={{ position:'relative' }}
              onMouseEnter={() => link.sub && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}>
              <Link href={link.href} style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'10px', fontWeight:500, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--brown)', padding:'8px 0', textDecoration:'none' }}>
                {link.label}
                {link.sub && <ChevronDown size={11} />}
              </Link>
              {link.sub && activeDropdown === link.label && (
                <div style={{ position:'absolute', top:'100%', left:'-16px', background:'var(--cream)', border:'0.5px solid var(--tan)', minWidth:'160px', padding:'8px 0', zIndex:100 }}>
                  {link.sub.map(s => (
                    <Link key={s} href="#" style={{ display:'block', padding:'10px 20px', fontSize:'11px', letterSpacing:'0.1em', color:'var(--brown)', textDecoration:'none' }}>{s}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Logo */}
        <Link href="/" style={{ fontFamily:'var(--font-serif)', fontSize:'22px', fontWeight:400, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--ink)', whiteSpace:'nowrap', flex:'none', textDecoration:'none' }}>
          La Chemiserie
        </Link>

        {/* Icons */}
        <div style={{ display:'flex', alignItems:'center', gap:'20px', flex:1, justifyContent:'flex-end' }}>
          <button style={{ background:'none', border:'none', cursor:'pointer', color:'var(--brown)', display:'flex', padding:0 }} aria-label="Rechercher">
            <Search size={18} strokeWidth={1.5} />
          </button>
          <button style={{ background:'none', border:'none', cursor:'pointer', color:'var(--brown)', display:'flex', padding:0 }} aria-label="Favoris">
            <Heart size={18} strokeWidth={1.5} />
          </button>

          {/* CartButton branché sur le contexte */}
          <CartButton />

          <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--brown)', display:'none', padding:0 }} aria-label="Menu">
            {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ background:'var(--cream)', borderTop:'0.5px solid var(--tan)', padding:'24px 32px 32px' }}>
          {navLinks.map(link => (
            <Link key={link.label} href={link.href} style={{ display:'block', padding:'14px 0', fontSize:'13px', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--brown)', borderBottom:'0.5px solid var(--cream-dark)', textDecoration:'none' }} onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}