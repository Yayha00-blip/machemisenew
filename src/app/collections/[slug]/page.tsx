import CollectionHero from '@/components/collection/CollectionHero'
import CollectionGrid from '@/components/collection/CollectionGrid'

const collections: Record<string, { name: string; description: string; bg: string; textColor: string }> = {
  'classique':  { name:'Classique',  description:"L'élégance intemporelle au quotidien. Des chemises qui traversent les saisons sans jamais se démoder.", bg:'var(--espresso)', textColor:'var(--cream)' },
  'lin-ete':    { name:'Lin & Été',  description:'Légèreté et fraîcheur pour les beaux jours. Le lin irlandais sélectionné pour sa tenue et son confort.', bg:'var(--cream-dark)', textColor:'var(--ink)' },
  'ceremonie':  { name:'Cérémonie',  description:'Pour les grandes occasions. Des chemises d\'exception qui font la différence.', bg:'#2C3E5C', textColor:'var(--cream)' },
  'casual':     { name:'Casual',     description:'Le style décontracté revisité avec exigence. Confort et allure au quotidien.', bg:'var(--tan)', textColor:'var(--espresso)' },
}

const allProducts = [
  { id:1,  name:'Chemise Oxford Premium',  collection:'classique',  price:89,  slug:'chemise-oxford-premium', badge:'Bestseller', bg:'var(--cream-dark)', colors:['#F5F0E8','#2C3E5C','#C8BDA8'], available:true },
  { id:2,  name:'Popeline Blanche',         collection:'classique',  price:79,  slug:'popeline-blanche',       badge:null,         bg:'#EDE7DC',           colors:['#F5F0E8','#2C2416'],           available:true },
  { id:3,  name:'Rayures Fines Navy',       collection:'classique',  price:110, slug:'rayures-fines-navy',     badge:'Nouveau',    bg:'#B8C4D4',           colors:['#2C3E5C','#F5F0E8'],           available:true },
  { id:4,  name:'Flanelle Bleu Nuit',       collection:'classique',  price:118, slug:'flanelle-bleu-nuit',     badge:null,         bg:'#3A4A5C',           colors:['#3A4A5C','#F5F0E8','#D4A853'], available:true },
  { id:5,  name:'Oxford Bleu Ciel',         collection:'classique',  price:89,  slug:'oxford-bleu-ciel',       badge:null,         bg:'#A8C4D8',           colors:['#A8C4D8','#F5F0E8'],           available:true },
  { id:6,  name:'Popeline Rayée',           collection:'classique',  price:95,  slug:'popeline-rayee',         badge:null,         bg:'#D0D8E4',           colors:['#D0D8E4','#2C2416'],           available:false },
  { id:7,  name:'Chemise Lin Blanc',        collection:'lin-ete',    price:95,  slug:'chemise-lin-blanc',      badge:null,         bg:'#D8CEBC',           colors:['#F5F0E8','#2C2416'],           available:true },
  { id:8,  name:'Lin Sable',               collection:'lin-ete',    price:98,  slug:'lin-sable',              badge:null,         bg:'#C8B898',           colors:['#C8B898','#F5F0E8'],           available:true },
  { id:9,  name:'Lin Terracotta',          collection:'lin-ete',    price:102, slug:'lin-terracotta',         badge:'Nouveau',    bg:'#D4906A',           colors:['#D4906A','#F5F0E8'],           available:true },
  { id:10, name:'Lin Sauge',               collection:'lin-ete',    price:98,  slug:'lin-sauge',              badge:null,         bg:'#8FA68A',           colors:['#8FA68A','#F5F0E8'],           available:true },
  { id:11, name:'Smoking Blanc',           collection:'ceremonie',  price:145, slug:'smoking-blanc',          badge:'Exclusif',   bg:'#EDE7DC',           colors:['#F5F0E8'],                     available:true },
  { id:12, name:'Smoking Noir',            collection:'ceremonie',  price:135, slug:'chemise-smoking-noir',   badge:'Exclusif',   bg:'var(--espresso)',   colors:['#1a1611','#D4A853'],           available:true },
  { id:13, name:'Plastron Ivoire',         collection:'ceremonie',  price:160, slug:'plastron-ivoire',        badge:null,         bg:'#F0EAE0',           colors:['#F5F0E8'],                     available:true },
  { id:14, name:'Vichy Terracotta',        collection:'casual',     price:92,  slug:'vichy-terracotta',       badge:'Nouveau',    bg:'#D4906A',           colors:['#D4906A','#F5F0E8'],           available:true },
  { id:15, name:'Chambray Indigo',         collection:'casual',     price:88,  slug:'chambray-indigo',        badge:null,         bg:'#4A6080',           colors:['#4A6080','#F5F0E8'],           available:true },
  { id:16, name:'Flanelle Carreaux',       collection:'casual',     price:105, slug:'flanelle-carreaux',      badge:null,         bg:'#8B6F5E',           colors:['#8B6F5E','#2C2416'],           available:true },
]

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const col = collections[params.slug] || collections['classique']
  const products = allProducts.filter(p => p.collection === params.slug)

  return (
    <>
      <CollectionHero collection={{ ...col, slug: params.slug, count: products.length }} />
      <CollectionGrid products={products} collectionName={col.name} />
    </>
  )
}