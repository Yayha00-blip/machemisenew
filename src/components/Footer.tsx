import Link from 'next/link'

const footerLinks: Record<string, string[]> = {
  'Collections':    ['Classique', 'Lin & Été', 'Cérémonie', 'Casual', 'Soldes'],
  'Service Client': ['Mon compte', 'Suivi de commande', 'Retours & échanges', 'Guide des tailles', 'FAQ'],
  'La Marque':      ['Notre histoire', 'Nos ateliers', 'Engagement durable', 'Presse', 'Contact'],
}

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

function IconYoutube() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
    </svg>
  )
}

const socialIcons = [
  { Icon: IconInstagram, label: 'Instagram' },
  { Icon: IconFacebook,  label: 'Facebook' },
  { Icon: IconYoutube,   label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer style={{ background:'#1a1611', color:'var(--cream)', padding:'clamp(48px,6vw,80px) clamp(24px,5vw,64px) 32px' }}>
      <div style={{ maxWidth:'1280px', margin:'0 auto' }}>

        {/* Top grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'48px', marginBottom:'64px' }}>

          {/* Brand + newsletter */}
          <div>
            <p style={{ fontFamily:'var(--font-serif)', fontSize:'22px', fontWeight:400, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'20px' }}>
              La Chemiserie
            </p>
            <p style={{ fontFamily:'var(--font-alt)', fontSize:'15px', fontWeight:300, color:'var(--brown-light)', lineHeight:1.75, marginBottom:'28px', maxWidth:'280px' }}>
              Des chemises pour homme pensées avec soin, taillées pour durer, et portées avec élégance.
            </p>
            <p style={{ fontSize:'10px', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--tan)', marginBottom:'12px' }}>
              Newsletter
            </p>
            <div style={{ display:'flex' }}>
              <input
                type="email"
                placeholder="Votre adresse email"
                style={{ flex:1, background:'rgba(245,240,232,0.07)', border:'0.5px solid rgba(200,189,168,0.25)', borderRight:'none', color:'var(--cream)', padding:'11px 16px', fontSize:'12px', outline:'none', fontFamily:'var(--font-sans)' }}
              />
              <button style={{ background:'var(--gold)', color:'var(--ink)', border:'none', padding:'11px 20px', fontSize:'10px', fontWeight:500, letterSpacing:'0.15em', textTransform:'uppercase', cursor:'pointer', fontFamily:'var(--font-sans)' }}>
                OK
              </button>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p style={{ fontSize:'10px', fontWeight:500, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--tan)', marginBottom:'20px' }}>
                {title}
              </p>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'10px' }}>
                {links.map(link => (
                  <li key={link}>
                    <Link href="#" style={{ fontSize:'13px', color:'var(--brown-light)', letterSpacing:'0.04em' }}>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div style={{ borderTop:'0.5px solid rgba(200,189,168,0.15)', paddingTop:'28px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'16px' }}>
          <p style={{ fontSize:'11px', color:'var(--brown)', letterSpacing:'0.06em' }}>
            © {new Date().getFullYear()} La Chemiserie. Tous droits réservés.
          </p>

          <div style={{ display:'flex', gap:'16px' }}>
            {socialIcons.map(({ Icon, label }) => (
              <Link key={label} href="#" style={{ color:'var(--brown-light)', display:'flex' }} aria-label={label}>
                <Icon />
              </Link>
            ))}
          </div>

          <div style={{ display:'flex', gap:'20px' }}>
            {['Mentions légales', 'Confidentialité', 'CGV'].map(l => (
              <Link key={l} href="#" style={{ fontSize:'10px', color:'var(--brown)', letterSpacing:'0.1em', textTransform:'uppercase' }}>
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}