import Link from 'next/link'
import Image from 'next/image'

const collections = [
  { name:'Classique',  description:'Intemporel & soigné',    count:18, slug:'classique',  bg:'var(--espresso)',   textColor:'var(--cream)',     subColor:'var(--tan)', image: '/images/2.jpg' },
  { name:'Lin & Été',  description:'Légèreté & fraîcheur',  count:12, slug:'lin-ete',    bg:'var(--cream-dark)', textColor:'var(--ink)',       subColor:'var(--brown)', image: '/images/3.jpg' },
  { name:'Cérémonie',  description:'Élégance & prestige',    count:9,  slug:'ceremonie',  bg:'var(--tan)',        textColor:'var(--espresso)',  subColor:'var(--brown)', image: '/images/4.jpg' },
  { name:'Casual',     description:'Décontracté & moderne',  count:15, slug:'casual',     bg:'var(--cream-mid)',  textColor:'var(--espresso)',  subColor:'var(--brown)', image: '/images/5.jpg' },
]

export default function Collections() {
  return (
    <section id="collections" style={{ padding:'clamp(48px,6vw,80px) clamp(24px,5vw,64px)' }}>

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'40px' }}>
        <div>
          <p style={{ fontFamily:'var(--font-sans)', fontSize:'10px', fontWeight:500, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--brown-light)', marginBottom:'10px' }}>
            Nos Collections
          </p>
          <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(28px,3vw,40px)', fontWeight:400, lineHeight:1.2 }}>
            Chaque style, <em style={{ fontStyle:'italic' }}>une histoire</em>
          </h2>
        </div>
        <Link href="/collections" style={{ fontSize:'10px', fontWeight:500, letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--brown)', borderBottom:'0.5px solid var(--brown)', paddingBottom:'2px', textDecoration:'none' }}>
          Tout voir →
        </Link>
      </div>

      {/* Grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px' }}>
        {collections.map(col => (
          <Link key={col.slug} href={`/collections/${col.slug}`} style={{ display:'block', background:col.bg, aspectRatio:'3/4', position:'relative', overflow:'hidden', textDecoration:'none' }}>

            {/* Photo du produit (remplace la silhouette grise) */}
            <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-60%)', width:'45%', aspectRatio:'1/1.5', overflow:'hidden' }}>
              <Image 
                src={col.image}
                alt={col.name}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Info */}
            <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'20px' }}>
              <p style={{ fontSize:'10px', letterSpacing:'0.15em', textTransform:'uppercase', color:col.subColor, marginBottom:'6px' }}>
                {col.count} pièces
              </p>
              <h3 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(18px,2vw,24px)', fontWeight:400, color:col.textColor, marginBottom:'4px' }}>
                {col.name}
              </h3>
              <p style={{ fontFamily:'var(--font-alt)', fontSize:'13px', fontWeight:300, color:col.subColor }}>
                {col.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}