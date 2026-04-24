import Link from 'next/link'

export default function ConfirmationPage() {
  const orderNumber = 'LC-2026-08472'

  return (
    <div style={{ minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'clamp(32px,5vw,64px)' }}>
      <div style={{ maxWidth:'560px', width:'100%', textAlign:'center' }}>

        {/* Checkmark */}
        <div style={{ width:'72px', height:'72px', borderRadius:'50%', background:'#4A7C59', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 28px', fontSize:'32px' }}>
          ✓
        </div>

        <p style={{ fontFamily:'var(--font-sans)', fontSize:'10px', fontWeight:500, letterSpacing:'0.22em', textTransform:'uppercase', color:'var(--brown-light)', marginBottom:'12px' }}>
          Commande confirmée
        </p>
        <h1 style={{ fontFamily:'var(--font-serif)', fontSize:'clamp(28px,4vw,42px)', fontWeight:400, lineHeight:1.2, marginBottom:'16px' }}>
          Merci pour votre <em style={{ fontStyle:'italic', color:'var(--gold)' }}>commande</em>
        </h1>
        <p style={{ fontFamily:'var(--font-alt)', fontSize:'17px', fontWeight:300, color:'var(--brown)', lineHeight:1.7, marginBottom:'32px' }}>
          Votre commande <strong>{orderNumber}</strong> a bien été enregistrée. Vous recevrez un email de confirmation avec les détails d'expédition.
        </p>

        {/* Order recap */}
        <div style={{ background:'var(--cream-dark)', border:'0.5px solid var(--tan)', padding:'24px', marginBottom:'32px', textAlign:'left' }}>
          {[
            { label:'Numéro de commande', value: orderNumber },
            { label:'Livraison estimée',  value: '3-5 jours ouvrés' },
            { label:'Mode de livraison',  value: 'Standard — Gratuite' },
            { label:'Paiement',           value: 'Carte bancaire ···· 3456' },
          ].map(({ label, value }) => (
            <div key={label} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'0.5px solid var(--tan)', fontSize:'13px' }}>
              <span style={{ color:'var(--brown)', letterSpacing:'0.04em' }}>{label}</span>
              <span style={{ fontWeight:500 }}>{value}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
          <Link href="/" style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'13px 28px', background:'var(--espresso)', color:'var(--cream)', fontFamily:'var(--font-sans)', fontSize:'10px', fontWeight:500, letterSpacing:'0.2em', textTransform:'uppercase', textDecoration:'none' }}>
            Continuer mes achats
          </Link>
          <Link href="/compte/commandes" style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'13px 28px', background:'transparent', color:'var(--espresso)', fontFamily:'var(--font-sans)', fontSize:'10px', fontWeight:500, letterSpacing:'0.2em', textTransform:'uppercase', textDecoration:'none', border:'0.5px solid var(--espresso)' }}>
            Suivre ma commande
          </Link>
        </div>
      </div>
    </div>
  )
}