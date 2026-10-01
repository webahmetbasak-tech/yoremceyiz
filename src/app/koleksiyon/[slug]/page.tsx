import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Media } from '@/components/media';
import { Arrow } from '@/components/identity';
import { ProductViewer } from '@/components/product-viewer';
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

  const related = products.filter(item => item.slug !== slug && item.category === product.category).slice(0, 2);

  return <>
    <section className="product-opening gutter">
      <ProductViewer image={product.image} name={product.name}/>
      <div className="product-copy">
        <Link href="/koleksiyon" className="eyebrow back-link">← KOLEKSİYONA DÖN</Link>
        <p className="eyebrow">{product.index} — {product.category.toLocaleUpperCase('tr')}</p>
        <h1>{product.color}<br/><em>/ {product.name.split(' / ')[1]}</em></h1>
        <p>{product.description}</p>
        <dl>
          <div><dt>RENK DÜNYASI</dt><dd>{product.name}</dd></div>
          <div><dt>TASARIM</dt><dd>{product.category}</dd></div>
        </dl>
        <Link href={`/iletisim?tasarim=${product.slug}`} className="text-link">BU TASARIMI KONUŞALIM <Arrow/></Link>
        <p className="product-note">Kumaş içeriği, uygulama tekniği, ölçü ve teslim bilgileri görüşme sırasında belirlenir.</p>
        <p className="campaign-disclosure">{campaignDisclosure}</p>
      </div>
    </section>

    {related.length > 0 && <section className="related-section section-space gutter">
      <p className="eyebrow">HİKÂYE DEVAM EDİYOR</p>
      <h2>Diğer <em>tasarımlar.</em></h2>
      <div className="related-grid">{related.map(item => <Link key={item.slug} href={`/koleksiyon/${item.slug}`} data-cursor>
        <Media name={item.image} alt={`${item.name} bindallı tasarımı`}/>
        <h3>{item.name} <Arrow diagonal/></h3>
      </Link>)}</div>
    </section>}
  </>;
}
