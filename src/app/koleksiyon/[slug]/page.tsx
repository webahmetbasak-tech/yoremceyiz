import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Media } from '@/components/media';
import { Arrow } from '@/components/identity';
import { campaignDisclosure, pageMetadata, products } from '@/lib/site';

export function generateStaticParams() {
  return products.map(product => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find(item => item.slug === slug);
  return product
    ? pageMetadata(product.name, product.description, `/koleksiyon/${slug}`)
    : { title: 'Tasarım bulunamadı' };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find(item => item.slug === slug);
  if (!product) notFound();

  const related = products.filter(item => item.slug !== slug).slice(0, 2);

  return <>
    <section className="product-opening gutter">
      <Media name={product.image} alt={`${product.name} bindallı tasarımı, tam boy ön görünüm`} priority sizes="(max-width: 700px) 100vw, 55vw"/>
      <div className="product-copy">
        <Link href="/koleksiyon" className="eyebrow back-link">← KOLEKSİYONA DÖN</Link>
        <p className="eyebrow">{product.index} — BİNDALLI SEÇKİSİ</p>
        <h1>{product.color}<br/><em>/ Altın</em></h1>
        <p>{product.description}</p>
        <dl>
          <div><dt>RENK DÜNYASI</dt><dd>{product.name}</dd></div>
          <div><dt>TASARIM</dt><dd>Kadife & nakış</dd></div>
        </dl>
        <Link href={`/iletisim?tasarim=${product.slug}`} className="text-link">BU TASARIMI KONUŞALIM <Arrow/></Link>
        <p className="product-note">Kumaş içeriği, uygulama tekniği, ölçü ve teslim bilgileri görüşme sırasında belirlenir.</p>
      </div>
    </section>

    <section className="product-detail-section section-space gutter">
      <div className="section-heading"><p className="eyebrow">YAKINDAN BAKIN</p><span className="eyebrow">DOKU / MOTİF / SİLÜET</span></div>
      <div className="product-details-grid">
        <div>
          <Media name={product.image} className="product-crop" alt={`${product.color} tasarımın yaka ve nakış detayına yakın bakış`}/>
          <p className="eyebrow image-caption">01 — NAKIŞIN ÇİZGİSİ</p>
        </div>
        <div>
          <h2>Detayda<br/><em>bir bütün.</em></h2>
          <p>Bir motifin çizgisi, bir rengin derinliği. Tasarıma yakından bakın; kendi seçiminizi atölyeyle birlikte şekillendirin.</p>
          <Media name={product.image} className="hem-crop" alt={`${product.color} tasarımın etek ve kumaş kıvrımları`}/>
          <p className="eyebrow image-caption">02 — KUMAŞIN HAREKETİ</p>
        </div>
      </div>
      <p className="campaign-disclosure">{campaignDisclosure}</p>
    </section>

    <section className="related-section section-space gutter">
      <p className="eyebrow">HİKÂYE DEVAM EDİYOR</p>
      <h2>Diğer <em>tasarımlar.</em></h2>
      <div className="related-grid">{related.map(item => <Link key={item.slug} href={`/koleksiyon/${item.slug}`} data-cursor>
        <Media name={item.image} alt={`${item.name} bindallı tasarımı`}/>
        <h3>{item.name} <Arrow diagonal/></h3>
      </Link>)}</div>
    </section>
  </>;
}
