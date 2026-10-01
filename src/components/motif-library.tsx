import { Media } from './media';
import { motifs } from '@/lib/collection';
export function MotifLibrary() {
  return <section className="motif-library section-space gutter" aria-labelledby="motif-title">
    <header className="edition-heading"><div><p className="eyebrow">NAKIŞ DEFTERİ / 04 YORUM</p><h2 id="motif-title">Her motif,<br/><em>bir hatıra.</em></h2></div><p>Bir kuşun kanadı. Bir dalın kıvrımı.<br/>Kumaşa işlenen, nesilden nesile taşınan bir dil.</p></header>
    <div className="motif-layout"><figure className="motif-lead"><Media name="editions/kus-motif" alt="Bordo üzerinde altın renkli kuş motifinin yakın planı" sizes="(max-width:700px) 88vw, 34vw"/><figcaption><span className="eyebrow">DETAY / KUŞ MOTİFİ</span><p>İlmeklerde saklı.</p></figcaption></figure><div className="motif-grid">{motifs.map((motif,i)=><figure key={motif.image}><Media name={motif.image} alt={`${motif.name}: ${motif.note.toLocaleLowerCase('tr')}`} sizes="(max-width:700px) 44vw, 26vw"/><figcaption><span className="eyebrow">0{i+1} / {motif.note}</span><h3>{motif.name}</h3></figcaption></figure>)}</div></div>
  </section>;
}
