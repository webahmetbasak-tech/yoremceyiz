import Link from 'next/link';
import { AtelierFilm } from './atelier-film';
import { Arrow } from './identity';
import { ThreadAlchemy } from './thread-alchemy';

export function HomeAtelier() {
  return <section className="atelier-journal section-space gutter" aria-labelledby="journal-title">
    <header className="journal-heading"><p className="eyebrow">02 / ATÖLYE</p><h2 id="journal-title">İlmek ilmek, <em>ustalık.</em></h2></header>
    <AtelierFilm quiet/>
    <div className="journal-film-note"><p>Kumaştan nakışa, bir bindallının yolculuğu.</p><Link href="/atolye" className="text-link">ATÖLYEYİ KEŞFET <Arrow/></Link></div>
    <ThreadAlchemy/>
  </section>;
}
