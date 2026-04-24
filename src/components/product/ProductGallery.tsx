'use client'

import { useState } from 'react'

interface Props {
  images: string[]
  name: string
  badge?: string
}

export default function ProductGallery({ images, name, badge }: Props) {
  const [active, setActive] = useState(0)
  const [zoomed, setZoomed] = useState(false)

  const bgColors = ['var(--cream-dark)', '#D8CEBC', '#C8BDA8', 'var(--espresso)']

  return (
    <div style={{ position:'sticky', top:'112px', height:'fit-content', display:'flex', gap:'12px', padding:'clamp(24px,4vw,48px)' }}>

      {/* Thumbnails */}
      <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width:'72px', height:'88px',
              background: bgColors[i] || 'var(--cream-dark)',
              border: active === i ? '1.5px solid var(--espresso)' : '1px solid var(--tan)',
              cursor:'pointer',
              padding:0,
              position:'relative',
              flexShrink:0,
              transition:'border-color 0.2s',
            }}
          >
            {/* Shirt silhouette mini */}
            <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-55%)', width:'36%', aspectRatio:'1/1.4', background:'rgba(255,255,255,0.15)', borderRadius:'1px' }} />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div style={{ flex:1, position:'relative' }}>
        <div
          onClick={() => setZoomed(!zoomed)}
          style={{
            background: bgColors[active],
            aspectRatio:'3/4',
            width:'100%',
            position:'relative',
            overflow:'hidden',
            cursor:'zoom-in',
            transition:'transform 0.3s ease',
            transform: zoomed ? 'scale(1.02)' : 'scale(1)',
          }}
        >
          {/* Replace with <Image src={images[active]} alt={name} fill style={{objectFit:'cover'}} /> */}
          <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-55%)', width:'42%', aspectRatio:'2/3', background:'rgba(255,255,255,0.12)', borderRadius:'2px' }} />

          {/* Zoom hint */}
          <div style={{ position:'absolute', bottom:'16px', right:'16px', background:'rgba(245,240,232,0.9)', padding:'6px 12px', fontSize:'9px', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--brown)' }}>
            {zoomed ? 'Cliquer pour réduire' : 'Cliquer pour zoomer'}
          </div>
        </div>

        {/* Badge */}
        {badge && (
          <div style={{ position:'absolute', top:'16px', left:'16px', background:'var(--gold)', color:'var(--ink)', fontSize:'9px', fontWeight:500, letterSpacing:'0.12em', textTransform:'uppercase', padding:'5px 12px' }}>
            {badge}
          </div>
        )}

        {/* Arrow nav */}
        <div style={{ position:'absolute', bottom:'16px', left:'50%', transform:'translateX(-50%)', display:'flex', gap:'6px' }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{ width: active === i ? '20px' : '6px', height:'6px', borderRadius:'3px', background: active === i ? 'var(--espresso)' : 'var(--tan)', border:'none', cursor:'pointer', padding:0, transition:'width 0.3s, background 0.3s' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}