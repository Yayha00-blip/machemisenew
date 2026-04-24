import Link from 'next/link'
import { Truck, RotateCcw, Shield, Star } from 'lucide-react'

const perks = [
  { Icon: Truck,      label:'Livraison offerte',  sub:"Dès 150 € d'achat" },
  { Icon: RotateCcw,  label:'Retours gratuits',   sub:'30 jours pour changer d\'avis' },
  { Icon: Shield,     label:'Paiement sécurisé',  sub:'SSL & 3D Secure' },
  { Icon: Star,       label:'Qualité garantie',   sub:'Matières sélectionnées' },
]

const stats = [
  { n:'12+', label:"Années d'expertise" },
  { n:'40+', label:'Matières disponibles' },
  { n:'98%', label:'Clients satisfaits' },
  { n:'15',  label:'Pays livrés' },
]

export default function Banner() {
  return (
    <>
      {/* Perks strip */}
      <section style={{ background:'var(--cream-dark)', borderTop:'0.5px solid var(--tan)', borderBottom:'0.5px solid var(--tan)', padding:'32px clamp(24px,5vw,64px)' }}>
        <div style={{ maxWidth:'1280px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'24px' }}>
          {perks.map(({ Icon, label, sub }) => (
            <div key={label} style={{ display:'flex', alignItems:'flex-start', gap:'16px' }}>
              <div style={{ width:'40px', height:'40px', background:'var(--cream)', border:'0.5px solid var(--tan)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, color:'var(--espresso)' }}>
                <Icon size={16} strokeWidth={1.5} />
              </div>
              <div>
                <p style={{ fontSize:'12px', fontWeight:500, letterSpacing:'0.08em', marginBottom:'3px' }}>{label}</p>
                <p style={{ fontSize:'11px', color:'var(--brown)', letterSpacing:'0.04em' }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promo banner */}
      <section style={{ background:'var(--espresso)', padding:'clamp(48px,6vw,80px) clamp(24px,5vw,64px)', display:'flex', flexWrap:'wrap', gap:'48px', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ maxWidth:'520px' }}>
          <p style={{ fontFamily:'var(--font-sans)', fontSize:'10px', fontWeight:500, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--gold)', marginBottom:'16px' }}>
            L'exception française
          </p>
          <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(28px,3vw,44px)', fontWeight:400, color:'var(--cream)', lineHeight:1.2, marginBottom:'16px' }}>
            Chaque chemise est{' '}
            <em style={{ color:'var(--gold)', fontStyle:'italic' }}>pensée pour durer</em>
          </h2>
          <p style={{ fontFamily:'var(--font-alt)', fontSize:'17px', fontWeight:300, color:'var(--brown-light)', lineHeight:1.7, marginBottom:'32px' }}>
            Nous sélectionnons les meilleures matières — popeline égyptienne, lin irlandais, flanelle mérinos — et les confions à des ateliers européens qui partagent notre exigence.
          </p>
          <Link href="/notre-histoire" style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'13px 30px', background:'transparent', color:'var(--gold)', fontFamily:'var(--font-sans)', fontSize:'10px', fontWeight:500, letterSpacing:'0.2em', textTransform:'uppercase', textDecoration:'none', border:'0.5px solid var(--gold)' }}>
            Notre histoire
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2px' }}>
          {stats.map(({ n, label }) => (
            <div key={label} style={{ background:'rgba(245,240,232,0.05)', border:'0.5px solid rgba(200,189,168,0.15)', padding:'28px 32px', minWidth:'140px' }}>
              <p style={{ fontFamily:'var(--font-serif)', fontSize:'36px', fontWeight:400, color:'var(--gold)', lineHeight:1, marginBottom:'6px' }}>{n}</p>
              <p style={{ fontSize:'10px', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--tan)' }}>{label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}