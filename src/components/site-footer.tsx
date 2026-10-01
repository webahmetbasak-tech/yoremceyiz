import Link from 'next/link';
import { navigation, site, whatsappLink, mapsLink } from '@/lib/site';
import { Arrow, Emblem, EmbroiderySeal } from './identity';
export function SiteFooter() {
  const whatsapp = whatsappLink();
  return <footer className="site-footer">
    <div className="footer-top"><Link href="/" aria-label="Yörem Çeyiz ana sayfa"><Emblem/></Link><p>Bir iplikle başlayan,<br/>nesillere uzanan.</p><nav aria-label="Alt gezinme">{navigation.map(x => <Link key={x.href} href={x.href}>{x.label}</Link>)}{whatsapp && <a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp ↗</a>}<a href={mapsLink} target="_blank" rel="noreferrer">Google Haritalar ↗</a>{site.instagram && <a href={site.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>}</nav></div>
    <div className="footer-signature">
      <div className="footer-signature-ornament" aria-hidden="true"><span/><EmbroiderySeal/><span/></div>
      <Link className="footer-name" href="/" aria-label="Yörem Çeyiz ana sayfa">Yörem <em>Çeyiz</em></Link>
      <p className="footer-signature-note">KÜTAHYA <span aria-hidden="true">✧</span> BİNDALLI & NAKIŞ ATÖLYESİ</p>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} YÖREM ÇEYİZ</span><span>KÜTAHYA, TÜRKİYE</span><a href="#top">BAŞA DÖN <Arrow/></a></div>
  </footer>;
}
