import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/site';
import { Arrow } from './identity';

const homeFeatureSlugs: readonly string[] = ['mavi-bahar-altin', 'kirmizi-lale-altin', 'bordo-bahar-altin', 'yesil-lale-altin'];
const colors = products.filter(product => homeFeatureSlugs.includes(product.slug));

export function HomeColorStories() {
  return <section className="home-colors section-space gutter" aria-labelledby="home-colors-title">
    <header className="home-colors-heading">
      <div><p className="eyebrow">RENK ATLASI / ÇİÇEK & NAKIŞ</p><h2 id="home-colors-title">Dört renk.<br/><em>Tek bir miras.</em></h2></div>
      <figure className="color-atlas-preview"><Image src="/media/editions/collection-portrait.webp" alt="Yörem Çeyiz yöresel giyim seçkisinin renk dünyası" width={480} height={320} sizes="(max-width:700px) 42vw, 20vw" quality={85}/><figcaption>Mavi, kırmızı, bordo ve yeşil.<br/>Nakışın dört ayrı hâli.</figcaption></figure>
    </header>
    <div className="color-stories-grid">
      {colors.map(product => <Link href={`/koleksiyon/${product.slug}`} className="color-story-card" key={product.slug} aria-label={`${product.name} tasarımını incele`} data-cursor>
        <div className="color-story-media">
          <div className="color-story-frame"><Image src={`/media/${product.image}.webp`} alt={`${product.name} bindallı tasarımı, tam görünüm`} fill sizes="(max-width: 700px) 42vw, 22vw" quality={85} loading="eager" fetchPriority="low"/></div>
        </div>
        <div className="color-story-copy"><div><p className="eyebrow">{product.color} / ALTIN NAKIŞ</p><h3>{product.name}</h3><span>{product.title}</span></div><Arrow diagonal/></div>
      </Link>)}
    </div>
    <Link href="/koleksiyon" className="text-link color-stories-link">TÜM TASARIMLARI İNCELE <Arrow/></Link>
  </section>;
}
