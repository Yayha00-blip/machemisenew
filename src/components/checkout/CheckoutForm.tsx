'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, Lock } from 'lucide-react'

type Step = 'contact' | 'livraison' | 'paiement'

const inputStyle = {
  width: '100%',
  padding: '13px 16px',
  background: 'var(--cream)',
  border: '0.5px solid var(--tan)',
  fontSize: '14px',
  fontFamily: 'var(--font-sans)',
  color: 'var(--ink)',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box' as const,
}

const labelStyle = {
  display: 'block',
  fontSize: '10px',
  fontWeight: 500,
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  color: 'var(--brown)',
  marginBottom: '8px',
}

function Field({ label, type = 'text', placeholder, half = false, required = false }: {
  label: string; type?: string; placeholder?: string; half?: boolean; required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ gridColumn: half ? 'span 1' : 'span 2' }}>
      <label style={labelStyle}>{label}{required && <span style={{ color:'#C0392B' }}> *</span>}</label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ ...inputStyle, borderColor: focused ? 'var(--espresso)' : 'var(--tan)' }}
      />
    </div>
  )
}

function SectionHeader({ number, title, active, done, onClick }: {
  number: number; title: string; active: boolean; done: boolean; onClick?: () => void
}) {
  return (
    <div
      onClick={done && !active ? onClick : undefined}
      style={{ display:'flex', alignItems:'center', gap:'16px', marginBottom: active ? '28px' : '0', cursor: done && !active ? 'pointer' : 'default' }}
    >
      <div style={{
        width:'32px', height:'32px', borderRadius:'50%',
        background: active ? 'var(--espresso)' : done ? 'var(--gold)' : 'var(--cream-dark)',
        color: active ? 'var(--cream)' : done ? 'var(--ink)' : 'var(--brown)',
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:'12px', fontWeight:600, flexShrink:0,
        border: active ? 'none' : done ? 'none' : '0.5px solid var(--tan)',
      }}>
        {done && !active ? '✓' : number}
      </div>
      <h2 style={{
        fontFamily:'var(--font-serif)', fontSize:'20px', fontWeight:400,
        color: active ? 'var(--ink)' : done ? 'var(--brown)' : 'var(--tan)',
      }}>
        {title}
      </h2>
      {done && !active && <span style={{ fontSize:'10px', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--gold)', marginLeft:'auto' }}>Modifier</span>}
    </div>
  )
}

export default function CheckoutForm() {
  const [step, setStep] = useState<Step>('contact')
  const [payMethod, setPayMethod] = useState<'card' | 'paypal'>('card')
  const router = useRouter()

  const steps: Step[] = ['contact', 'livraison', 'paiement']
  const stepIndex = steps.indexOf(step)

  const nextStep = () => {
    if (step === 'contact')   setStep('livraison')
    if (step === 'livraison') setStep('paiement')
    if (step === 'paiement')  router.push('/confirmation')
  }

  return (
    <div style={{ padding:'clamp(32px,4vw,56px)', borderRight:'0.5px solid var(--tan)' }}>

      {/* ── ÉTAPE 1 — Contact ── */}
      <div style={{ marginBottom:'32px', paddingBottom:'32px', borderBottom: step !== 'contact' ? '0.5px solid var(--tan)' : 'none' }}>
        <SectionHeader number={1} title="Informations de contact" active={step === 'contact'} done={stepIndex > 0} onClick={() => setStep('contact')} />
        {step === 'contact' && (
          <>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'20px' }}>
              <Field label="Prénom" placeholder="Jean" half required />
              <Field label="Nom" placeholder="Dupont" half required />
              <Field label="Email" type="email" placeholder="jean@email.com" required />
              <Field label="Téléphone" type="tel" placeholder="+33 6 00 00 00 00" half />
            </div>
            <label style={{ display:'flex', alignItems:'center', gap:'10px', fontSize:'12px', color:'var(--brown)', cursor:'pointer', marginBottom:'24px' }}>
              <input type="checkbox" style={{ accentColor:'var(--espresso)', width:'16px', height:'16px' }} />
              M'inscrire à la newsletter pour recevoir les offres exclusives
            </label>
            <button onClick={nextStep} style={{ width:'100%', padding:'16px', background:'var(--espresso)', color:'var(--cream)', border:'none', cursor:'pointer', fontSize:'10px', fontWeight:500, letterSpacing:'0.2em', textTransform:'uppercase', fontFamily:'var(--font-sans)' }}>
              Continuer vers la livraison →
            </button>
          </>
        )}
      </div>

      {/* ── ÉTAPE 2 — Livraison ── */}
      <div style={{ marginBottom:'32px', paddingBottom:'32px', borderBottom: step === 'paiement' ? '0.5px solid var(--tan)' : 'none', opacity: stepIndex < 1 ? 0.4 : 1, transition:'opacity 0.3s' }}>
        <SectionHeader number={2} title="Adresse de livraison" active={step === 'livraison'} done={stepIndex > 1} onClick={() => setStep('livraison')} />
        {step === 'livraison' && (
          <>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'24px' }}>
              <Field label="Adresse" placeholder="12 rue de la Paix" required />
              <Field label="Complément" placeholder="Apt, étage, bâtiment" half />
              <Field label="Code postal" placeholder="75001" half required />
              <Field label="Ville" placeholder="Paris" half required />
              <div style={{ gridColumn:'span 2' }}>
                <label style={labelStyle}>Pays <span style={{ color:'#C0392B' }}>*</span></label>
                <div style={{ position:'relative' }}>
                  <select style={{ ...inputStyle, appearance:'none', paddingRight:'40px' }}>
                    <option>France</option>
                    <option>Belgique</option>
                    <option>Suisse</option>
                    <option>Luxembourg</option>
                    <option>Maroc</option>
                    <option>Algérie</option>
                    <option>Tunisie</option>
                  </select>
                  <ChevronDown size={14} style={{ position:'absolute', right:'14px', top:'50%', transform:'translateY(-50%)', color:'var(--brown)', pointerEvents:'none' }} />
                </div>
              </div>
            </div>

            {/* Méthode de livraison */}
            <p style={{ fontSize:'10px', fontWeight:500, letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:'12px' }}>
              Mode de livraison
            </p>
            {[
              { id:'standard', label:'Livraison standard', sub:'3-5 jours ouvrés', price:'Gratuite', free:true },
              { id:'express',  label:'Livraison express',  sub:'1-2 jours ouvrés', price:'9,90 €',   free:false },
              { id:'pickup',   label:'Point relais',       sub:'3-5 jours ouvrés', price:'3,90 €',   free:false },
            ].map(opt => (
              <label key={opt.id} style={{ display:'flex', alignItems:'center', gap:'14px', padding:'14px 16px', border:'0.5px solid var(--tan)', marginBottom:'8px', cursor:'pointer' }}>
                <input type="radio" name="shipping" defaultChecked={opt.id === 'standard'} style={{ accentColor:'var(--espresso)', width:'16px', height:'16px' }} />
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:'13px', fontWeight:500, marginBottom:'2px' }}>{opt.label}</p>
                  <p style={{ fontSize:'11px', color:'var(--brown)' }}>{opt.sub}</p>
                </div>
                <p style={{ fontSize:'13px', fontWeight:500, color: opt.free ? '#4A7C59' : 'var(--ink)' }}>{opt.price}</p>
              </label>
            ))}

            <button onClick={nextStep} style={{ width:'100%', padding:'16px', background:'var(--espresso)', color:'var(--cream)', border:'none', cursor:'pointer', fontSize:'10px', fontWeight:500, letterSpacing:'0.2em', textTransform:'uppercase', fontFamily:'var(--font-sans)', marginTop:'20px' }}>
              Continuer vers le paiement →
            </button>
          </>
        )}
      </div>

      {/* ── ÉTAPE 3 — Paiement ── */}
      <div style={{ opacity: stepIndex < 2 ? 0.4 : 1, transition:'opacity 0.3s' }}>
        <SectionHeader number={3} title="Paiement" active={step === 'paiement'} done={false} />
        {step === 'paiement' && (
          <>
            {/* Méthode */}
            <div style={{ display:'flex', gap:'8px', marginBottom:'24px' }}>
              {(['card', 'paypal'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setPayMethod(m)}
                  style={{ flex:1, padding:'12px', background: payMethod === m ? 'var(--espresso)' : 'var(--cream)', color: payMethod === m ? 'var(--cream)' : 'var(--brown)', border: payMethod === m ? '1px solid var(--espresso)' : '0.5px solid var(--tan)', cursor:'pointer', fontSize:'11px', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', fontFamily:'var(--font-sans)', transition:'all 0.2s' }}
                >
                  {m === 'card' ? '💳 Carte bancaire' : '🅿️ PayPal'}
                </button>
              ))}
            </div>

            {payMethod === 'card' && (
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px', marginBottom:'24px' }}>
                <Field label="Nom sur la carte" placeholder="JEAN DUPONT" required />
                <div style={{ gridColumn:'span 2' }}>
                  <label style={labelStyle}>Numéro de carte <span style={{ color:'#C0392B' }}>*</span></label>
                  <input placeholder="1234 5678 9012 3456" style={{ ...inputStyle, letterSpacing:'0.08em' }} />
                </div>
                <Field label="Date d'expiration" placeholder="MM / AA" half required />
                <Field label="CVV" placeholder="123" half required />
              </div>
            )}

            {payMethod === 'paypal' && (
              <div style={{ background:'var(--cream-dark)', border:'0.5px solid var(--tan)', padding:'24px', textAlign:'center', marginBottom:'24px' }}>
                <p style={{ fontSize:'13px', color:'var(--brown)', marginBottom:'8px' }}>Vous serez redirigé vers PayPal pour finaliser votre paiement.</p>
              </div>
            )}

            {/* Code promo */}
            <div style={{ display:'flex', gap:'8px', marginBottom:'24px' }}>
              <input placeholder="Code promo" style={{ ...inputStyle, flex:1 }} />
              <button style={{ padding:'13px 20px', background:'var(--cream-dark)', border:'0.5px solid var(--tan)', cursor:'pointer', fontSize:'10px', fontWeight:500, letterSpacing:'0.15em', textTransform:'uppercase', fontFamily:'var(--font-sans)', color:'var(--brown)', whiteSpace:'nowrap' }}>
                Appliquer
              </button>
            </div>

            {/* CTA final */}
            <button
              onClick={nextStep}
              style={{ width:'100%', padding:'18px', background:'var(--gold)', color:'var(--ink)', border:'none', cursor:'pointer', fontSize:'11px', fontWeight:600, letterSpacing:'0.2em', textTransform:'uppercase', fontFamily:'var(--font-sans)', display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', marginBottom:'12px' }}
            >
              <Lock size={14} strokeWidth={2} />
              Confirmer et payer — 89,00 €
            </button>

            <p style={{ fontSize:'10px', color:'var(--brown-light)', textAlign:'center', letterSpacing:'0.06em', lineHeight:1.6 }}>
              🔒 Paiement 100% sécurisé · SSL · 3D Secure · Vos données ne sont jamais stockées
            </p>
          </>
        )}
      </div>
    </div>
  )
}