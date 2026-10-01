'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Arrow } from './identity';

export function AtelierFilm({ quiet = false }: { quiet?: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    // Native preload="auto" starts buffering from the server-rendered markup.
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio >= .38 && !reduced && !userPaused.current) element.play().catch(() => undefined);
      else element.pause();
    }, { threshold: .38 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function toggle() {
    const element = video.current;
    if (!element) return;
    if (element.paused) { userPaused.current = false; element.play().catch(() => undefined); }
    else { userPaused.current = true; element.pause(); }
  }

  return <figure className={quiet ? 'manifesto-film atelier-film-focus' : 'manifesto-film'}>
    <video ref={video} muted loop playsInline preload="auto" poster="/media/editions/sc-atolye.webp" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onTimeUpdate={event => setProgress(event.currentTarget.duration ? event.currentTarget.currentTime / event.currentTarget.duration : 0)} aria-label="İğneden atölyeye ve tamamlanmış bindallıya uzanan sessiz film">
      <source src="/media/collection/atelier-film-mobile.mp4" type="video/mp4" media="(max-width: 700px), (max-height: 600px)"/>
      <source src="/media/collection/atelier-film.webm" type="video/webm"/>
      <source src="/media/collection/atelier-film.mp4" type="video/mp4"/>
    </video>
    {!quiet && <><div className="manifesto-film-shade"/>
      <div className="manifesto-film-top"><span className="eyebrow">ATÖLYE FİLMİ — 00:10</span><span className="eyebrow">İĞNE · EMEK · BİNDALLI</span></div>
      <div className="manifesto-film-copy"><p className="eyebrow">BİR İPLİĞİN YOLCULUĞU</p><h3>Her ilmek,<br/><em>bir iz bırakır.</em></h3></div></>}
    <div className="manifesto-film-bottom"><button type="button" onClick={toggle} aria-label={playing ? 'Atölye filmini durdur' : 'Atölye filmini oynat'}><span className={playing ? 'pause-symbol' : 'play-symbol'} aria-hidden="true"/>{playing ? 'DURDUR' : 'OYNAT'}</button><div className="film-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }}/></div>{quiet ? <span className="film-label">ATÖLYE FİLMİ / 00:10</span> : <Link href="/atolye">ATÖLYEYE GİR <Arrow/></Link>}</div>
  </figure>;
}
