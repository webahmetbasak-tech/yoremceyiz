import { ContactForm } from '@/components/contact-form';
import { Emblem, Arrow } from '@/components/identity';
import { Media } from '@/components/media';
import { pageMetadata, products, site } from '@/lib/site';
export const metadata = pageMetadata('İletişim', 'Yörem Çeyiz ile bindallı, dikiş ve nakış üzerine konuşun. Kütahya, Türkiye.', '/iletisim');
export default async function ContactPage({ searchParams }: { searchParams: Promise<{ tasarim?: string }> }) {
  const { tasarim } = await searchParams;
  const product = products.find(p => p.slug === tasarim);
  return <><header className="page-heading gutter"><p className="eyebrow">04 — İLETİŞİM</p><h1>Her hikâye,<br/><em>bir sohbetle.</em></h1></header><section className="contact-grid gutter"><div className="contact-info"><Emblem/><p>Bir renk, bir motif, bir fikir.<br/>Bindallı, dikiş ve nakış üzerine konuşalım.</p><div className="contact-address"><p className="eyebrow">YÖREM ÇEYİZ</p><h2>Kütahya,<br/><em>Türkiye.</em></h2>{site.address && <p>{site.address}</p>}</div><div className="contact-channels">{site.phone && <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`} className="text-link">{site.phone} <Arrow/></a>}{site.email && <a href={`mailto:${site.email}`} className="text-link">{site.email} <Arrow/></a>}{site.whatsapp && <a target="_blank" rel="noreferrer" href={`https://wa.me/${site.whatsapp}`} className="text-link">WHATSAPP <Arrow/></a>}{site.instagram && <a target="_blank" rel="noreferrer" href={site.instagram} className="text-link">INSTAGRAM <Arrow/></a>}</div><Media name="craft-details" alt="Atölye masasındaki nakış ve kalıp detayları"/></div><ContactForm email={site.email} whatsapp={site.whatsapp} initialProduct={product?.slug || ''}/></section></>;
}
