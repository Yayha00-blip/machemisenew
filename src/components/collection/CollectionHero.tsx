interface CollectionInfo {
  name: string
  description: string
  bg: string
  textColor: string
  slug: string
  count: number
}

export default function CollectionHero({ collection }: { collection: CollectionInfo }) {
  const isLight = collection.bg === 'var(--cream-dark)' || collection.bg === 'var(--tan)'

  return (
    <section style={{ background: collection.bg, padding:'clamp(48px,8vw,96px) clamp(24px,5vw,64px)', position:'relative', overflow:'hidden', minHeight:'280px', display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>

      {/* Texture lines */}
      {[0,1,2,3,4,5].map(i => (
        <div key={i} style={{ position:'absolute', top:0, bottom:0, left:`${8+i*18}%`, width:'0.5px', background: isLight ? 'rgba(44,36,22,0.04)' : 'rgba(245,240,232,0.04)' }} />
      ))}

      {/* Breadcrumb */}
      <div style={{ position:'absolute', top:'28px', left:'clamp(24px,5vw,64px)', display:'flex', gap:'8px', fontSize:'10px', letterSpacing:'0.1em', color: isLight ? 'var(--brown)' : 'var(--tan)' }}>
        <a href="/" style={{ color:'inherit', textDecoration:'none' }}>Accueil</a>
        <span>/</span>
        <a href="/collections" style={{ color:'inherit', textDecoration:'none' }}>Collections</a>
        <span>/</span>
        <span style={{ color: isLight ? 'var(--ink)' : 'var(--cream)' }}>{collection.name}</span>
      </div>

      <div style={{ position:'relative', zIndex:1 }}>
        <p style={{ fontFamily:'var(--font-sans)', fontSize:'10px', fontWeight:500, letterSpacing:'0.22em', textTransform:'uppercase', color: isLight ? 'var(--brown)' : 'var(--tan)', marginBottom:'12px' }}>
          {collection.count} pièces
        </p>
        <h1 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(36px,5vw,64px)', fontWeight:400, color: collection.textColor, lineHeight:1.15, marginBottom:'16px' }}>
          {collection.name}
        </h1>
        <p style={{ fontFamily:'var(--font-alt)', fontSize:'17px', fontWeight:300, color: isLight ? 'var(--brown)' : 'var(--brown-light)', maxWidth:'520px', lineHeight:1.7 }}>
          {collection.description}
        </p>
      </div>

      {/* Gold accent */}
      <div style={{ position:'absolute', bottom:0, left:'clamp(24px,5vw,64px)', width:'48px', height:'2px', background:'var(--gold)' }} />
    </section>
  )
}