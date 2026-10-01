import Image from 'next/image';
import Link from 'next/link';
import { Arrow, EmbroiderySeal } from './identity';

export function HeroExperience() {
  return <section className="couture-hero gutter" aria-labelledby="hero-title">
    <EmbroiderySeal className="hero-embroidery"/>
    <div className="couture-intro">
      <p className="eyebrow">YÖREM ÇEYİZ · BİNDALLI ATÖLYESİ</p>
      <h1 id="hero-title">İlmek ilmek,<br/><em>bir miras.</em></h1>
      <p className="couture-description">Kadifenin derinliği. Altın nakışın ışığı.<br/>Kütahya’dan gelen bir giyim kültürü.</p>
      <a href="#selection-title" className="text-link">SEÇKİYİ KEŞFET <Arrow/></a>
      <Link href="/atolye" className="couture-detail"><span className="couture-detail-image"><Image src="/media/hero-for.webp" alt="Altın işlemeli bordo kadife, atölye masasından bir detay" fill sizes="120px" quality={85}/></span><span><span className="eyebrow">KUMAŞTAN HATIRAYA</span><span>Bir iplikle başlar. <Arrow diagonal/></span></span></Link>
    </div>
    <figure className="couture-portrait">
      <Link href="/koleksiyon/bordo-altin" aria-label="Bordo Sarma tasarımını incele" className="couture-product"><Image src="/media/editions/bordo-sarma.webp" alt="Altın sarma nakışlı bordo bindallı, baştan eteğe tam görünüm" fill sizes="(max-width:700px) 90vw, 52vw" quality={85} priority/></Link>
      <figcaption><span><span className="eyebrow">SEÇKİDEN / 01</span><span>Bordo <em>/ Sarma</em></span></span><Link href="/koleksiyon/bordo-altin" aria-label="Bordo Sarma detayları"><Arrow diagonal/></Link></figcaption>
    </figure>
    <div className="couture-footnote eyebrow"><span>KADİFE · NAKIŞ · BİNDALLI</span><a href="#selection-title">ALTI TASARIMI KEŞFEDİN ↓</a><span>KÜTAHYA’DAN NESİLLERE</span></div>
  </section>;
}
