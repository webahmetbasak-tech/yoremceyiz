import Link from 'next/link';
import { navigation, site } from '@/lib/site';
import { Arrow, Emblem } from './identity';
export function SiteFooter() {
  return <footer className="site-footer"><div className="footer-top"><Link href="/" aria-label="Yörem Çeyiz ana sayfa"><Emblem/></Link><p>Bir iplikle başlayan,<br/>nesillere uzanan.</p><nav aria-label="Alt gezinme">{navigation.map(x => <Link key={x.href} href={x.href}>{x.label}</Link>)}{site.instagram && <a href={site.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>}</nav></div><Link className="footer-name" href="/" aria-label="Yörem Çeyiz">Yörem Çeyiz</Link><div className="footer-bottom"><span>© {new Date().getFullYear()} YÖREM ÇEYİZ</span><span>KÜTAHYA, TÜRKİYE</span><a href="#top">BAŞA DÖN <Arrow/></a></div></footer>;
}
