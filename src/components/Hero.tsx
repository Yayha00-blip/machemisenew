import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section style={{ display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:'88vh' }}>

      {/* Left — dark editorial */}
      <div style={{ background:'var(--espresso)', padding:'clamp(48px,8vw,96px)', display:'flex', flexDirection:'column', justifyContent:'center', position:'relative', overflow:'hidden' }}>
        {/* Subtle vertical lines */}
        {[0,1,2,3,4].map(i => (
          <div key={i} style={{ position:'absolute', top:0, bottom:0, left:`${10+i*22}%`, width:'0.5px', background:'rgba(200,189,168,0.05)' }} />
        ))}

        <div style={{ position:'relative', zIndex:1 }}>
          <p style={{ fontFamily:'var(--font-sans)', fontSize:'10px', fontWeight:500, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--tan)', marginBottom:'24px' }}>
            Nouvelle Collection — Printemps 2026
          </p>

          <h1 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(36px,5vw,64px)', fontWeight:400, lineHeight:1.15, color:'var(--cream)', marginBottom:'24px' }}>
            {"L'Art de la "}
            <em style={{ color:'var(--gold)', fontStyle:'italic' }}>Chemise</em>
            <br />Bien Taillée
          </h1>

          <p style={{ fontFamily:'var(--font-alt)', fontSize:'18px', fontWeight:300, color:'var(--brown-light)', lineHeight:1.7, maxWidth:'380px', marginBottom:'40px' }}>
            Des chemises pensées pour l&apos;homme d&apos;aujourd&apos;hui — coupe soignée, matières nobles, élégance discrète.
          </p>

          <div style={{ display:'flex', gap:'16px', flexWrap:'wrap' }}>
            <Link href="#collections" style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'14px 32px', background:'var(--gold)', color:'var(--ink)', fontFamily:'var(--font-sans)', fontSize:'10px', fontWeight:500, letterSpacing:'0.2em', textTransform:'uppercase', textDecoration:'none' }}>
              Découvrir la collection →
            </Link>
            <Link href="#bestsellers" style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'13px 30px', background:'transparent', color:'var(--gold)', fontFamily:'var(--font-sans)', fontSize:'10px', fontWeight:500, letterSpacing:'0.2em', textTransform:'uppercase', textDecoration:'none', border:'0.5px solid var(--gold)' }}>
              Meilleures ventes
            </Link>
          </div>
        </div>

        {/* Gold accent bar */}
        <div style={{ position:'absolute', bottom:0, left:'clamp(48px,8vw,96px)', width:'60px', height:'2px', background:'var(--gold)' }} />
      </div>

      {/* Right — image section */}
      <div style={{ background:'var(--cream-dark)', position:'relative', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        
        {/* Intégration de l'image à la place du placeholder gris */}
        <div style={{ width:'55%', aspectRatio:'2/3', position:'relative' }}>
          <Image 
            src="/images/1.jpg" 
            alt="Hero Image" 
            fill 
            style={{ objectFit: 'cover' }} 
          />
        </div>

        {/* Floating badge */}
        <div style={{ position:'absolute', top:'32px', right:'32px', background:'var(--espresso)', color:'var(--gold)', fontSize:'9px', fontWeight:500, letterSpacing:'0.15em', textTransform:'uppercase', padding:'8px 16px' }}>
          Nouveauté
        </div>

        {/* Floating info card */}
        <div style={{ position:'absolute', bottom:'32px', left:'32px', background:'var(--cream)', padding:'16px 20px' }}>
          <p style={{ fontFamily:'var(--font-serif)', fontSize:'14px', color:'var(--ink)', marginBottom:'4px' }}>Chemise Oxford Premium</p>
          <p style={{ fontSize:'11px', color:'var(--brown)', letterSpacing:'0.08em' }}>À partir de 89 €</p>
        </div>

        {/* Vertical label */}
        <div style={{ position:'absolute', top:'50%', right:'-32px', transform:'translateY(-50%) rotate(90deg)', fontSize:'9px', letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--brown-light)', whiteSpace:'nowrap' }}>
          Printemps — Été 2026
        </div>
      </div>
    </section>
  )
}