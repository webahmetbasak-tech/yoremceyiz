import Link from 'next/link';
import { Media } from '@/components/media';
import { Arrow } from '@/components/identity';
import { CollectionArchive } from '@/components/collection-archive';
import { campaignDisclosure, pageMetadata, products } from '@/lib/site';
export const metadata = pageMetadata('Koleksiyon', 'Bindallı, kaftan, cepken ve yöresel şalvar takımları. Yörem Çeyiz tasarım seçkisi.', '/koleksiyon');
export default function CollectionPage(){
  return <div className="collection-page">
    <header className="catalogue-opening gutter"><div className="catalogue-title"><p className="eyebrow">YÖREM ÇEYİZ / TASARIM ARŞİVİ</p><h1>Bir yöre.<br/><em>Binbir hikâye.</em></h1><p>Geçmişin izini taşıyan,<br/>sizin hikâyenizle tamamlanan tasarımlar.</p><a href="#tasarimlar" className="text-link">{products.length} TASARIMI KEŞFET <Arrow/></a></div><figure><Media name="editions/collection-portrait" alt="Kırmızı bindallı, pudra şalvar ve mavi işlemeli tasarımlardan oluşan seçki" priority sizes="(max-width:700px) 90vw, 56vw"/><figcaption className="eyebrow">BİNDALLI · CEPKEN · ŞALVAR · KAFTAN</figcaption></figure></header>
    <CollectionArchive/>
    <p className="campaign-disclosure gutter">{campaignDisclosure}</p>
    <div className="collection-closing gutter"><h2>Sizin renginiz.<br/><em>Sizin hikâyeniz.</em></h2><Link href="/iletisim" className="text-link">ATÖLYEYLE KONUŞALIM <Arrow/></Link></div>
  </div>;
}
