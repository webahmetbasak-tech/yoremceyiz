'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Arrow, Thread } from './identity';
const scenes = [
  { name: 'thread-macro', label: 'İPLİK', title: <>Bir iplikle<br/><em>başlar.</em></>, copy: 'BİR BİNDALLININ HİKÂYESİ', alt: 'Karanlık zemin üzerinde kıvrılan metalik altın nakış ipliği' },
  { name: 'needle-embroidery', label: 'İLMEK', title: <>İlmek<br/><em>ilmek.</em></>, copy: 'HER MOTİF, SABIRLA ŞEKİLLENİR.', alt: 'Bordo kadifeye altın rengi nakış işleyen makine iğnesi' },
  { name: 'velvet-macro', label: 'NAKIŞ', title: <>Nakışa<br/><em>dönüşür.</em></>, copy: 'KADİFEDE BİR İZ.', alt: 'Bordo kadife üzerindeki altın rengi motiflerin yakın planı' },
  { name: 'hero-for', label: 'USTALIK', title: <>Detayda<br/><em>ustalık.</em></>, copy: 'KESİMDEN SON İLMEĞE.', alt: 'Ceviz masa üzerinde bordo kadife ve yoğun altın nakışın yakın planı' },
  { name: 'bindalli-burgundy', label: 'BİNDALLI', title: <>Gelenekten<br/>gelen <em>zarafet.</em></>, copy: 'KÜTAHYA’DAN NESİLLERE.', alt: 'Ahşap askıda, altın nakışlı bordo bindallı tasarımı' },
];
export function HeroExperience() {
  const root = useRef<HTMLElement>(null);
  const [loadedThrough, setLoadedThrough] = useState(1);
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: reduce)', () => {
        const frame = requestAnimationFrame(() => setLoadedThrough(4));
        return () => cancelAnimationFrame(frame);
      });
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const ctx = gsap.context(() => {
          const layers = gsap.utils.toArray<HTMLElement>('.hero-scene');
          gsap.set(layers.slice(1), { autoAlpha: 0 });
          const timeline = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: .6, onUpdate: self => { const stage = Math.min(4, Math.floor(self.progress * 5)); setLoadedThrough(previous => Math.max(previous, Math.min(4, stage + 1))); root.current?.querySelectorAll('.scene-step').forEach((el, i) => { el.classList.toggle('active', i === stage); if (i === stage) el.setAttribute('aria-current', 'step'); else el.removeAttribute('aria-current'); }); } } });
          timeline.to('.hero-progress-fill', { scaleX: 1, duration: 5, ease: 'none' }, 0);
          layers.forEach((layer, i) => {
            if (i > 0) { timeline.to(layers[i-1], { autoAlpha: 0, duration: .45 }, i - .1); timeline.to(layer, { autoAlpha: 1, duration: .55 }, i - .1); }
            timeline.fromTo(layer.querySelector('.hero-image'), { scale: i === 4 ? 1.12 : 1.05 }, { scale: 1, duration: 1.3, ease: 'none' }, i);
          });
          timeline.to('.cinema-frame', { clipPath: 'inset(3% 3% 3% 3%)', duration: .35 }, 4.65);
        }, root);
        return () => ctx.revert();
      });
      cleanup = () => media.revert();
    });
    return () => { disposed = true; cleanup?.(); };
  }, []);
  return <section className="hero-experience" ref={root} aria-label="Bir bindallının hikâyesi">
    <div className="cinema-frame"><div className="hero-stage">
      {scenes.map((scene, i) => <article key={scene.name} id={`sahne-${i}`} className={`hero-scene scene-${i}`}>
        <div className="hero-image">{i <= loadedThrough && <Image src={`/media/${scene.name}.webp`} alt={scene.alt} fill sizes={i === 4 ? '(max-width: 700px) 100vw, 60vw' : '100vw'} priority={i === 0} quality={85}/>}</div><div className="hero-shade"/>
        <div className="hero-copy"><p className="eyebrow">{scene.copy}</p>{i === 0 ? <h1>{scene.title}</h1> : <h2>{scene.title}</h2>}<p className="hero-description">{i === 0 ? <>İplikten nakışa, kadifeden mirasa.<br/>Yörem Çeyiz’in dünyasına hoş geldiniz.</> : i === 4 ? <>Kütahya’da ilmek ilmek şekillenen<br/>bir zanaatın izinde.</> : 'Bir giysiden daha fazlası.'}</p>{i === 4 && <div className="hero-actions"><Link className="text-link" href="/koleksiyon">KOLEKSİYONU KEŞFET <Arrow/></Link><Link href="/atolye" className="quiet-link">ATÖLYEYE GİR ↗</Link></div>}</div>
        <span className="scene-caption">0{i + 1} / 05 <span>{scene.label}</span></span>
      </article>)}
      <Thread className="hero-thread"/>
      <div className="hero-bottom"><a href="#manifesto" className="scroll-note"><span className="scroll-stroke"/>HİKÂYEYİ KEŞFET</a><div className="scene-steps" aria-label="Hikâye aşamaları">{scenes.map((s, i) => <span key={s.label} className={`scene-step ${i === 0 ? 'active' : ''}`}>{s.label}</span>)}</div><span className="hero-origin">KÜTAHYA · TÜRKİYE</span></div>
      <div className="hero-progress"><span className="hero-progress-fill"/></div>
    </div></div>
  </section>;
}
