import Link from 'next/link';
import { Media } from '@/components/media';
import { Arrow } from '@/components/identity';
import { campaignDisclosure, pageMetadata, products } from '@/lib/site';
export const metadata = pageMetadata('Koleksiyon', 'On iki tasarım, on iki ayrı hikâye. Yörem Çeyiz bindallı seçkisi.', '/koleksiyon');
export default function CollectionPage() {
  return <div className="collection-page"><header className="page-heading gutter"><p className="eyebrow">YÖREM ÇEYİZ — BİNDALLI SEÇKİSİ</p><h1>Geleneğin<br/><em>on iki hâli.</em></h1><div className="heading-bottom"><p>Aynı iplik. Başka bir hikâye.<br/>Kadife ve nakışın buluştuğu tasarımlar.</p><span className="eyebrow">01 — 12</span></div></header><div className="archive-grid gutter">{products.map(p => <Link key={p.slug} href={`/koleksiyon/${p.slug}`} className="archive-card" data-cursor><Media name={p.image} alt={`${p.name} bindallı tasarımı`} priority={p.index === '01'} loading="eager"/><div><span className="eyebrow">{p.index} / BİNDALLI</span><h2>{p.name}</h2><Arrow diagonal/></div><p>{p.title}</p></Link>)}</div><p className="campaign-disclosure gutter">{campaignDisclosure}</p><div className="collection-closing gutter"><h2>Birlikte <em>konuşalım.</em></h2><Link href="/iletisim" className="text-link">ATÖLYEYLE İLETİŞİM <Arrow/></Link></div></div>;
}
