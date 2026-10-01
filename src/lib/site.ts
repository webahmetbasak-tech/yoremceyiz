export const site = {
  name: 'Yörem Çeyiz',
  location: 'Kütahya, Türkiye',
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || null,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '0537 861 05 46',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '') || '905378610546',
  address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || 'Pirler Mahallesi Balıklı Caddesi No 94/A Kütahya/Merkez',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || null,
  mapsUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL || null,
};

export function whatsappLink(productName?: string) {
  if (!site.whatsapp) return null;
  const message = productName
    ? `Merhaba, ${productName} tasarımı hakkında bilgi almak istiyorum.`
    : 'Merhaba, Yörem Çeyiz tasarımları ve atölye görüşmesi hakkında bilgi almak istiyorum.';
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
export const mapSearch = site.address;
export const mapsLink = site.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapSearch)}`;

export const navigation = [
  { href: '/koleksiyon', label: 'Koleksiyon' },
  { href: '/atolye', label: 'Atölye' },
  { href: '/hikayemiz', label: 'Hikâyemiz' },
  { href: '/iletisim', label: 'İletişim' },
];

export { products } from './collection';

// Verified composition, technique, sizing, availability and prices are intentionally unset.
export const productFacts = { composition: null, technique: null, sizing: null, price: null, availability: null };
export const campaignDisclosure = 'Görseller Yörem Çeyiz için hazırlanmış dijital tasarım çalışmalarıdır. Gerçek model, renk ve uygulama detayları atölye görüşmesinde netleştirilir.';

export function pageMetadata(title: string, description: string, path: string) {
  return { title, description, alternates: site.url ? { canonical: `${site.url}${path}` } : undefined, openGraph: { title: `${title} | Yörem Çeyiz`, description, locale: 'tr_TR', siteName: site.name, type: 'website' as const, images: [{ url: '/media/logo/social-preview.png', width: 1200, height: 630, alt: 'Yörem Çeyiz — Kütahya' }], ...(site.url ? { url: `${site.url}${path}` } : {}) } };
}
