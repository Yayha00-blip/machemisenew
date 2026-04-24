import CheckoutForm from '@/components/checkout/CheckoutForm'
import OrderSummary from '@/components/checkout/OrderSummary'

export default function CheckoutPage() {
  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)' }}>

      {/* Header simplifié */}
      <div style={{ borderBottom:'0.5px solid var(--tan)', padding:'20px clamp(24px,5vw,64px)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <a href="/" style={{ fontFamily:'var(--font-serif)', fontSize:'20px', fontWeight:400, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--ink)', textDecoration:'none' }}>
          La Chemiserie
        </a>
        <div style={{ display:'flex', alignItems:'center', gap:'8px', fontSize:'11px', color:'var(--brown)', letterSpacing:'0.08em' }}>
          <a href="/panier" style={{ color:'var(--brown)', textDecoration:'none' }}>Panier</a>
          <span style={{ color:'var(--tan)' }}>›</span>
          <span style={{ color:'var(--ink)', fontWeight:500 }}>Commande</span>
          <span style={{ color:'var(--tan)' }}>›</span>
          <span>Confirmation</span>
        </div>
        <div style={{ width:'120px' }} />
      </div>

      {/* Main layout */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 420px', maxWidth:'1280px', margin:'0 auto', gap:'0' }}>
        <CheckoutForm />
        <OrderSummary />
      </div>
    </div>
  )
}