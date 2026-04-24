import Link from 'next/link'

const related = [
  { id:2, name:'Chemise Lin Blanc',   collection:'Lin & Été',  price:95,  slug:'chemise-lin-blanc',    bg:'#D8CEBC' },
  { id:3, name:'Rayures Fines Navy',  collection:'Classique',  price:110, slug:'rayures-fines-navy',   bg:'#B8C4D4' },
  { id:5, name:'Popeline Blanche',    collection:'Classique',  price:79,  slug:'popeline-blanche',     bg:'#EDE7DC' },
  { id:8, name:'Flanelle Bleu Nuit',  collection:'Classique',  price:118, slug:'flanelle-bleu-nuit',   bg:'#3A4A5C' },
]

export default function RelatedProducts({ currentSlug }: { currentSlug: string }) {
  const products = related.filter(p => p.slug !== currentSlug)

  return (
    <section style={{ padding:'0 clamp(24px,5vw,64px) clamp(48px,6vw,80px)', borderTop:'0.5px solid var(--tan)' }}>
      <div style={{ paddingTop:'clamp(48px,6vw,80px)', marginBottom:'40px', display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
        <div>
          <p style={{ fontFamily:'var(--font-sans)', fontSize:'10px', fontWeight:500, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--brown-light)', marginBottom:'10px' }}>
            Vous aimerez aussi
          </p>
          <h2 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(24px,2.5vw,36px)', fontWeight:400 }}>
            Dans la même <em style={{ fontStyle:'italic' }}>collection</em>
          </h2>
        </div>
        <Link href="/collections/classique" style={{ fontSize:'10px', fontWeight:500, letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--brown)', borderBottom:'0.5px solid var(--brown)', paddingBottom:'2px', textDecoration:'none' }}>
          Voir tout →
        </Link>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px' }}>
        {products.map(p => (
          <Link key={p.id} href={`/produits/${p.slug}`} style={{ textDecoration:'none', color:'inherit' }}>
            <div style={{ background:p.bg, aspectRatio:'3/4', position:'relative', marginBottom:'12px', overflow:'hidden' }}>
              <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-55%)', width:'42%', aspectRatio:'1/1.4', background:'rgba(255,255,255,0.12)', borderRadius:'1px' }} />
            </div>
            <p style={{ fontFamily:'var(--font-alt)', fontSize:'15px', fontWeight:400, marginBottom:'3px' }}>{p.name}</p>
            <div style={{ display:'flex', justifyContent:'space-between' }}>
              <p style={{ fontSize:'11px', color:'var(--brown)', letterSpacing:'0.06em' }}>{p.collection}</p>
              <p style={{ fontSize:'13px', fontWeight:500 }}>{p.price} €</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}