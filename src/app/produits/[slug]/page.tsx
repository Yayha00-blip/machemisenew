import ProductGallery from '@/components/product/ProductGallery'
import ProductInfo from '@/components/product/ProductInfo'
import ProductTabs from '@/components/product/ProductTabs'
import RelatedProducts from '@/components/product/RelatedProducts'

// Données mock — à remplacer par un appel API/CMS
const getProduct = (slug: string) => ({
  id: 1,
  slug,
  name: 'Chemise Oxford Premium',
  collection: 'Classique',
  price: 89,
  originalPrice: null,
  description: "Taillée dans une popeline Oxford 100% coton égyptien, cette chemise incarne l'élégance décontractée. Sa coupe légèrement ajustée flatte la silhouette sans contraindre le mouvement.",
  details: [
    '100% coton Oxford égyptien',
    'Coupe ajustée (slim fit)',
    'Col semi-étalé avec baleine amovible',
    'Boutonnière en nacre véritable',
    'Poignets à simple bouton',
    'Finitions soignées main',
  ],
  care: [
    'Lavage machine 30°C',
    'Repassage fer chaud (coton)',
    'Ne pas mettre en sèche-linge',
    'Nettoyage à sec possible',
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  colors: [
    { name: 'Blanc',      value: '#F5F0E8', available: true },
    { name: 'Bleu ciel',  value: '#A8C4D8', available: true },
    { name: 'Bleu nuit',  value: '#2C3E5C', available: true },
    { name: 'Gris perle', value: '#C8C8C8', available: false },
  ],
  images: ['', '', '', ''], // 4 images placeholder
  badge: 'Bestseller',
  rating: 4.8,
  reviewCount: 124,
  sku: 'CHM-OXF-001',
})

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug)

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ padding:'16px clamp(24px,5vw,64px)', borderBottom:'0.5px solid var(--tan)', display:'flex', gap:'8px', fontSize:'11px', color:'var(--brown)', letterSpacing:'0.08em' }}>
        <a href="/" style={{ color:'var(--brown)', textDecoration:'none' }}>Accueil</a>
        <span>/</span>
        <a href="/collections/classique" style={{ color:'var(--brown)', textDecoration:'none' }}>Classique</a>
        <span>/</span>
        <span style={{ color:'var(--ink)' }}>{product.name}</span>
      </div>

      {/* Main product layout */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0', maxWidth:'1400px', margin:'0 auto' }}>
        <ProductGallery images={product.images} name={product.name} badge={product.badge} />
        <ProductInfo product={product} />
      </div>

      {/* Tabs — description, entretien, avis */}
      <ProductTabs product={product} />

      {/* Related products */}
      <RelatedProducts currentSlug={product.slug} />
    </>
  )
}