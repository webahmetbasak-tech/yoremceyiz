import Link from 'next/link';
import { Arrow } from '@/components/identity';
import { Media } from '@/components/media';
import { pageMetadata, products, site, whatsappLink, mapsLink, mapSearch } from '@/lib/site';
export const metadata = pageMetadata('İletişim', 'WhatsApp üzerinden Yörem Çeyiz ile konuşun, Kütahya atölyesini haritada keşfedin.', '/iletisim');
export default async function ContactPage({ searchParams }: { searchParams: Promise<{ tasarim?: string }> }) {
  const { tasarim } = await searchParams;
  const product = products.find(p => p.slug === tasarim);
  const whatsapp = whatsappLink(product?.name);
  return <div className="contact-page">
    <header className="contact-opening gutter"><div><p className="eyebrow">04 / İLETİŞİM</p><h1>Bir fikirle<br/><em>gelin.</em></h1></div><p>Bir renk, bir motif, özel bir gün.<br/>Aklınızdakini konuşalım;<br/>size ait bir hikâye şekillendirelim.</p></header>
    <section className="contact-destination gutter" aria-label="İletişim ve konum">
      <div className="contact-direct"><p className="eyebrow">DOĞRUDAN ATÖLYEYE</p><h2>Bir mesajla <em>başlar.</em></h2><p>Beğendiğiniz tasarımı paylaşın. Renk, ölçü ve hazırlık sürecini birlikte konuşalım.</p>
        {whatsapp ? <a className="contact-whatsapp" href={whatsapp} target="_blank" rel="noreferrer">WHATSAPP’TAN YAZIN <Arrow diagonal/></a> : <><span className="contact-whatsapp" aria-disabled="true">WHATSAPP İLETİŞİMİ <Arrow diagonal/></span><p className="contact-unavailable">WhatsApp iletişim bilgisi henüz paylaşılmadı.</p></>}
        <div className="contact-support">{site.phone && <a href={`tel:${site.phone.replace(/[^+\d]/g,'').replace(/^0(?=\d{10}$)/,'+90')}`}>{site.phone} ↗</a>}{site.email && <a href={`mailto:${site.email}`}>{site.email} ↗</a>}{site.instagram && <a href={site.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>}</div>
        {product && <Link href={`/koleksiyon/${product.slug}`} className="contact-selected"><Media name={product.image} alt={product.name} sizes="100px"/><div><p className="eyebrow">KONUŞMAK İSTEDİĞİNİZ TASARIM</p><h3>{product.name}</h3></div></Link>}
      </div>
      <figure className="contact-map" id="konum"><iframe src={`https://maps.google.com/maps?q=${encodeURIComponent(mapSearch)}&z=${site.address?'16':'12'}&output=embed`} title={site.address?'Yörem Çeyiz atölyesinin Google Haritalar konumu':'Kütahya merkez — bölge haritası'} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/><figcaption><div><p className="eyebrow">KÜTAHYA / TÜRKİYE</p><h2>Geldiğimiz <em>yer.</em></h2><p>{site.address || 'Kütahya merkez — bölge haritası. Atölyenin açık adresi henüz paylaşılmadı.'}</p></div><a href={mapsLink} className="text-link" target="_blank" rel="noreferrer">GOOGLE HARİTALAR <Arrow diagonal/></a></figcaption></figure>
    </section>
  </div>;
}
