import Link from 'next/link';
import { Arrow, Emblem, Motif, Thread } from './identity';
import { Media } from './media';
import { AtelierFilm } from './atelier-film';
export function Manifesto() {
  return <section className="manifesto section-space gutter" id="manifesto"><div className="manifesto-meta"><p className="eyebrow">KUMAŞ. NAKIŞ. USTALIK.</p><Emblem/></div><div className="manifesto-body"><h2>Bir giysiden<br/><em>daha fazlası.</em></h2><div className="manifesto-detail"><p>Her Yörem Çeyiz tasarımı; kumaşın, nakışın ve ustalığın aynı hikâyede buluştuğu bir mirastır.</p><Link className="text-link" href="/hikayemiz">HİKÂYEMİZİ KEŞFET <Arrow/></Link></div></div><AtelierFilm/><Thread/></section>;
}
export function StitchEmbroiderySection() {
  return <section className="stitch-section section-space gutter" aria-labelledby="stitch-title">
    <div className="stitch-heading"><div><p className="eyebrow">02 — DİKİŞ / NAKIŞ</p><h2 id="stitch-title">Dikiş kurar.<br/><em>Nakış imzalar.</em></h2></div><p>Önce biçim kurulur. Ardından motif, kumaşın üzerinde kendi ritmini bulur. Biri yapıyı taşır; diğeri parçaya kimliğini verir.</p></div>
    <div className="stitch-process">
      <article className="stitch-panel stitch-panel-sewing"><div className="stitch-image"><Media name="collection/sewing-construction" alt="Bordo kadifenin kenar dikişini oluşturan mekanik dikiş ayağı ve altın nakış bordürü" sizes="(max-width: 700px) 100vw, 68vw"/><span className="stitch-number">01</span></div><div className="stitch-panel-copy"><span className="eyebrow">YAPI / DİKİŞ</span><h3>Çizgiyi<br/><em>kurmak.</em></h3><p>Kalıbın çizgisi, kumaşın yönü ve milimetrik dikiş; bindallının taşıyacağı silüeti birlikte belirler.</p></div></article>
      <div className="stitch-spine" aria-hidden="true"><span>KALIP</span><i/><span>KESİM</span><i/><span>DİKİŞ</span><i/><span>NAKIŞ</span></div>
      <article className="stitch-panel stitch-panel-embroidery"><div className="stitch-panel-copy"><span className="eyebrow">İMZA / NAKIŞ</span><h3>Motifi<br/><em>işlemek.</em></h3><p>Altın iplik yüzeyde ilerledikçe desen yalnızca görünmez; kadifenin dokusuyla birlikte ışığı da biçimlendirir.</p></div><div className="stitch-image"><Media name="collection/burgundy-stitch" alt="Bordo kadife üzerinde ince altın iplikle işlenen nakış motifi" sizes="(max-width: 700px) 100vw, 64vw"/><span className="stitch-number">02</span></div></article>
    </div>
    <div className="stitch-aphorism"><Emblem/><p>İplikten biçime.<br/><em>Biçimden hatıraya.</em></p><span className="eyebrow">BİR BİNDALLININ İZİNDE</span></div>
    <Thread className="stitch-thread"/>
  </section>;
}
export function CraftSection() {
  return <section className="craft-section section-space gutter"><div className="section-heading"><p className="eyebrow">03 — ATÖLYE</p><span className="eyebrow muted">USTALIĞIN İZİNDE</span></div><div className="craft-grid"><div className="craft-main"><Media name="collection/atelier-workroom" alt="Ceviz dolapları, dikiş makineleri ve kadife kumaşlarıyla bindallı atölyesi"/><p className="eyebrow image-caption">BİR FİKRİN BİÇİM ALDIĞI YER.</p></div><div className="craft-copy"><h2>El emeğinin<br/>izini taşıyan<br/><em>her detay.</em></h2><p>İpliğin yolu, kumaşın yönü, nakışın ritmi. Bir bindallının hikâyesi, küçük kararların bir araya gelmesiyle şekillenir.</p><Link className="text-link" href="/atolye">ATÖLYEYE GİR <Arrow/></Link><Media name="collection/garment-parts" alt="Atölye masasına serilmiş bordo kadife, altın nakış ve bindallı parçaları"/></div></div></section>;
}
export function EmbroideryInterlude() {
  return <section className="embroidery-interlude"><Media name="velvet-macro" alt="Bordo kadifede altın ipliğin yakın planı" sizes="100vw"/><div className="interlude-shade"/><div className="interlude-copy gutter"><p className="eyebrow">BİZİM İMZAMIZ</p><h2>Nakış bir süs değil,<br/><em>imzadır.</em></h2></div><Thread/></section>;
}
export function HeritageSection() {
  return <section className="heritage-section section-space gutter" aria-labelledby="heritage-title">
    <div className="heritage-visual"><Media name="collection/atelier-workroom" alt="Ceviz dolapları ve dikiş makineleriyle sıcak bir bindallı atölyesi" sizes="(max-width: 700px) 90vw, 46vw"/><span className="eyebrow heritage-visual-caption">BİR FİKRİN BİÇİM ALDIĞI YER.</span></div>
    <div className="heritage-copy"><div className="heritage-meta"><p className="eyebrow">03 — ATÖLYE / KÜTAHYA</p><Motif/></div><h2 id="heritage-title">Kütahya’dan<br/><em>nesillere.</em></h2><div className="heritage-description"><p>Bir yere ait olmak, onun izlerini taşımaktır. Bizim dilimiz; kadifenin dokusu, nakışın çizgisi ve Kütahya’da devam eden üretimdir.</p><Link className="text-link" href="/hikayemiz">GELDİĞİMİZ YER <Arrow/></Link></div><span className="heritage-signoff eyebrow">KUMAŞTA BİR HAFIZA / YÖREM ÇEYİZ</span></div>
  </section>;
}
export function BrandSignature() {
  return <figure className="brand-signature"><Media name="collection/embroidered-wordmark" alt="Bordo kadifeye altın iplikle işlenmiş Yörem Çeyiz imzası" sizes="100vw"/><figcaption className="eyebrow">BİR İPLİKLE BAŞLAR.</figcaption></figure>;
}
export function FinalCTA() {
  return <section className="final-cta gutter"><Emblem/><div><p className="eyebrow">SİZİN HİKÂYENİZ</p><h2>Bir günün değil,<br/><em>bir ömrün hatırası.</em></h2><div className="cta-links"><Link href="/koleksiyon" className="text-link">KOLEKSİYONU KEŞFET <Arrow/></Link><Link href="/iletisim" className="quiet-link">BİZE ULAŞIN ↗</Link></div></div><Thread className="closing-thread"/></section>;
}
