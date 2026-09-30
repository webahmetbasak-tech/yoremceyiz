'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Arrow } from './identity';

type GalleryItem = { name: string; eyebrow: string; title: string; note: string; width: string; href?: string; position?: string };

const gallery: readonly GalleryItem[] = [
  { name: 'burgundy-hanger', eyebrow: '01 / BORDO', title: 'Gelenekten gelen zarafet', note: 'Bordo kadife · altın nakış', href: '/koleksiyon/bordo-altin', width: '52vw', position: '50% 42%' },
  { name: 'black-stitch', eyebrow: '02 / SİYAH', title: 'Gecenin üzerine işlenen', note: 'Siyah kadife · altın nakış', href: '/koleksiyon/siyah-altin', width: '52vw', position: 'center' },
  { name: 'atelier-lineup', eyebrow: 'ATÖLYE / SEÇKİ', title: 'Aynı zanaat, başka hikâyeler', note: 'Bordo · siyah · zümrüt', href: '/koleksiyon', width: '72vw', position: 'center' },
  { name: 'green-stitch', eyebrow: '03 / ZÜMRÜT', title: 'Rengin derinliğinde', note: 'Zümrüt kadife · altın nakış', href: '/koleksiyon/zumrut-altin', width: '52vw', position: 'center' },
  { name: 'garment-parts', eyebrow: 'DETAY / NAKIŞ', title: 'Motiften bütüne', note: 'Her çizgi, bir sonraki ilmeğe bağlanır.', href: '/atolye', width: '67vw', position: 'center' },
  { name: 'collection-lineup', eyebrow: 'SEÇKİ / BÜTÜN', title: 'Renkler değişir, imza kalır.', note: 'On iki tasarımlı koleksiyonun tamamını keşfedin.', href: '/koleksiyon', width: '72vw', position: 'center' },
];

export function CollectionShowcase() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let disposed = false;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed || !section.current || !track.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add('(min-width: 701px) and (min-height: 601px) and (prefers-reduced-motion: no-preference)', () => {
        const context = gsap.context(() => {
          gsap.to(track.current, {
            x: () => -Math.max(0, (track.current?.scrollWidth ?? 0) - window.innerWidth),
            ease: 'none',
            scrollTrigger: {
              trigger: section.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: .65,
              invalidateOnRefresh: true,
              onUpdate: self => setActive(Math.min(gallery.length - 1, Math.round(self.progress * (gallery.length - 1)))),
            },
          });
        }, section);
        return () => context.revert();
      });
      cleanup = () => media.revert();
    });
    return () => { disposed = true; cleanup?.(); };
  }, []);

  function go(index: number) {
    const next = Math.max(0, Math.min(gallery.length - 1, index));
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (innerWidth > 700 && innerHeight > 600 && !reduced && section.current) {
      const range = section.current.offsetHeight - innerHeight;
      scrollTo({ top: section.current.offsetTop + range * (next / (gallery.length - 1)), behavior: 'smooth' });
    } else {
      const card = track.current?.children[next] as HTMLElement | undefined;
      track.current?.scrollTo({ left: card?.offsetLeft ?? 0, behavior: reduced ? 'auto' : 'smooth' });
    }
  }

  return <section className="collection-section" ref={section} aria-labelledby="selection-title">
    <div className="collection-sticky">
      <div className="collection-heading gutter">
        <div><p className="eyebrow">01 — KOLEKSİYON</p><h2 id="selection-title">Zamansız <em>bir seçki.</em></h2></div>
        <div className="collection-heading-side"><p>Her kare, bindallının başka bir anını taşır.</p><Link className="text-link" href="/koleksiyon">TÜM KOLEKSİYON <Arrow/></Link></div>
      </div>
      <div className="collection-window">
        <div className="collection-track" ref={track} onScroll={() => {
          if (!track.current || matchMedia('(min-width: 701px) and (min-height: 601px) and (prefers-reduced-motion: no-preference)').matches) return;
          const center = track.current.scrollLeft + innerWidth / 2;
          const cards = Array.from(track.current.children) as HTMLElement[];
          const closest = cards.reduce((best, card, index) => Math.abs(card.offsetLeft + card.offsetWidth / 2 - center) < best.distance ? { index, distance: Math.abs(card.offsetLeft + card.offsetWidth / 2 - center) } : best, { index: 0, distance: Infinity });
          setActive(closest.index);
        }}>
          {gallery.map((item, index) => {
            const content = <>
              <div className="collection-media" data-cursor>
                <Image src={`/media/collection/${item.name}.webp`} alt={`${item.title}. ${item.note}`} fill sizes={`(max-width: 700px) 86vw, ${item.width}`} quality={80} loading="eager" style={{ objectPosition: item.position }}/>
                <span className="collection-index">{String(index + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span>
              </div>
              <div className="collection-card-info"><span className="eyebrow">{item.eyebrow}</span><h3>{item.title}</h3><p>{item.note}</p>{item.href && <Arrow diagonal/>}</div>
            </>;
            return item.href ? <Link href={item.href} key={item.name} className="collection-card" style={{ '--panel-width': item.width } as React.CSSProperties}>{content}</Link> : <article key={item.name} className="collection-card" style={{ '--panel-width': item.width } as React.CSSProperties}>{content}</article>;
          })}
        </div>
      </div>
      <div className="collection-controls gutter">
        <span className="eyebrow">{String(active + 1).padStart(2, '0')} <span className="muted">/ {String(gallery.length).padStart(2, '0')}</span></span>
        <div className="collection-rule"><span style={{ transform: `scaleX(${(active + 1) / gallery.length})` }}/></div>
        <div className="collection-arrows"><button aria-label="Önceki galeri karesi" disabled={active === 0} onClick={() => go(active - 1)}><span className="reverse"><Arrow/></span></button><button aria-label="Sonraki galeri karesi" disabled={active === gallery.length - 1} onClick={() => go(active + 1)}><Arrow/></button></div>
      </div>
    </div>
  </section>;
}
