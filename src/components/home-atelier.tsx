import Link from 'next/link';
import { AtelierFilm } from './atelier-film';
import { Arrow } from './identity';
import { ThreadAlchemy } from './thread-alchemy';

export function HomeAtelier() {
  return <section className="atelier-journal section-space gutter" aria-labelledby="journal-title">
    <header className="journal-heading"><p className="eyebrow">02 / ATÖLYE</p><h2 id="journal-title">İlmek ilmek, <em>ustalık.</em></h2></header>
    <div className="journal-film-layout">
      <AtelierFilm quiet/>
      <div className="journal-film-copy">
        <p className="eyebrow">KUMAŞIN HAFIZASI</p>
        <h3>Kumaşa işlenen<br/><em>bir hikâye.</em></h3>
        <p className="journal-film-description">Bir dalın kıvrımı, bir lalenin izi. Her motif, bindallının hikâyesini ilmek ilmek tamamlar.</p>
        <Link href="/atolye" className="text-link">ATÖLYEYİ KEŞFET <Arrow/></Link>
      </div>
    </div>
    <ThreadAlchemy/>
  </section>;
}
