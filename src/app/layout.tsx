import type { Metadata } from 'next';
import '@fontsource-variable/cormorant-garamond';
import '@fontsource-variable/cormorant-garamond/wght-italic.css';
import '@fontsource-variable/manrope';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Enhancements } from '@/components/enhancements';
import { site } from '@/lib/site';

const description = 'Kütahya’da bindallı, dikiş ve nakış. Yörem Çeyiz’in iplikten kadifeye uzanan dünyasını ve bindallı seçkisini keşfedin.';
export const metadata: Metadata = {
  metadataBase: new URL(site.url || 'http://localhost:3000'),
  title: { default: 'Yörem Çeyiz | Bindallı & Nakış Atölyesi — Kütahya', template: '%s | Yörem Çeyiz' },
  description,
  applicationName: site.name,
  robots: { index: !!site.url, follow: true },
  openGraph: { title: 'Yörem Çeyiz — Bir İplikle Başlar', description, type: 'website', locale: 'tr_TR', siteName: site.name, images: [{ url: '/media/logo/social-preview.png', width: 1200, height: 630, alt: 'Yörem Çeyiz — Kütahya' }] },
  twitter: { card: 'summary_large_image', title: 'Yörem Çeyiz — Bir İplikle Başlar', description, images: ['/media/logo/social-preview.png'] },
  icons: { icon: '/icon.svg', apple: '/media/logo/app-icon.png' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const data = { '@context': 'https://schema.org', '@type': 'Organization', name: site.name, ...(site.url ? { url: site.url, logo: `${site.url}/media/logo/primary.svg` } : {}), ...(site.email ? { email: site.email } : {}), ...(site.phone ? { telephone: site.phone } : {}), ...(site.instagram ? { sameAs: [site.instagram] } : {}) };
  return <html lang="tr"><body id="top"><a href="#main" className="skip-link">İçeriğe geç</a><SiteHeader/><main id="main" tabIndex={-1}>{children}</main><SiteFooter/><Enhancements/><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}/></body></html>;
}
