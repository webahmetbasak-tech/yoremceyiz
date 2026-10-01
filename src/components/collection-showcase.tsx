import Image from 'next/image';
import Link from 'next/link';
import { Arrow, EmbroiderySeal } from './identity';
import { featuredProducts, products } from '@/lib/collection';

export function CollectionShowcase() {
  return <section className="edition-showcase section-space heirloom-selection gutter" aria-labelledby="selection-title">
    <header className="selection-heading">
      <div><p className="eyebrow">01 / BİNDALLI SEÇKİSİ</p><h2 id="selection-title">Altının izi.<br/><em>Kadifenin ruhu.</em></h2></div>
      <EmbroiderySeal className="selection-seal"/>
      <div className="selection-intro"><span className="eyebrow">ALTI TASARIM · BİR MİRAS</span><p>Sarma dallar, ışığı tutan iplikler,<br/>eteğe uzanan ince bir işçilik.<br/>Bindallının bütün zarafeti, bir arada.</p></div>
    </header>
    <div className="heirloom-grid">
      {featuredProducts.map((product,index)=><Link href={`/koleksiyon/${product.slug}`} key={product.slug} className="heirloom-card" data-couture-card>
        <div className="heirloom-card-meta"><span className="eyebrow">{String(index+1).padStart(2,'0')} / SEÇKİ</span><span className="eyebrow">{product.category}</span></div>
        <div className="collection-media heirloom-media"><Image src={`/media/${product.image}.webp`} alt={`${product.name}, baştan eteğe tam görünüm`} fill sizes="(max-width:540px) 88vw, (max-width:900px) 43vw, 28vw" quality={85} loading="eager" fetchPriority="low"/><span className="heirloom-corner corner-top" aria-hidden="true"/><span className="heirloom-corner corner-bottom" aria-hidden="true"/></div>
        <div className="heirloom-card-copy"><div><h3>{product.name}</h3><p>{product.title}</p></div><span className="heirloom-card-arrow"><Arrow diagonal/></span></div>
      </Link>)}
    </div>
    <div className="selection-footer"><p><span className="eyebrow">SEÇKİNİN DEVAMI</span><span>Her rengin başka bir hikâyesi var.</span></p><Link href="/koleksiyon" className="selection-all-link"><span>TÜM KOLEKSİYONU KEŞFET<small>{products.length} TASARIM</small></span><Arrow/></Link></div>
  </section>;
}
