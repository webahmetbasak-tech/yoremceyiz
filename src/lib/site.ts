export const site = {
  name: 'Yörem Çeyiz',
  location: 'Kütahya, Türkiye',
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || null,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || null,
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || null,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '') || null,
  address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || null,
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || null,
};

export const navigation = [
  { href: '/koleksiyon', label: 'Koleksiyon' },
  { href: '/atolye', label: 'Atölye' },
  { href: '/hikayemiz', label: 'Hikâyemiz' },
  { href: '/iletisim', label: 'İletişim' },
];

export const products = [
  { slug: 'bordo-altin', name: 'Bordo / Altın', title: 'Bir mirasın rengi.', color: 'Bordo', image: 'bindalli-burgundy', index: '01', tone: '#5A101D', description: 'Derin bordo ile altın renginin buluşması. Kadifenin dingin yüzeyinde, ışıkla birlikte değişen bir nakış ritmi.' },
  { slug: 'siyah-altin', name: 'Siyah / Altın', title: 'Geceye işlenen iz.', color: 'Siyah', image: 'bindalli-black', index: '02', tone: '#17110D', description: 'Siyahın sessizliği, altın renginin ince çizgisi. Motiflerin ve silüetin öne çıktığı yalın bir karşılaşma.' },
  { slug: 'zumrut-altin', name: 'Zümrüt / Altın', title: 'Derinlikte saklı.', color: 'Zümrüt', image: 'bindalli-emerald', index: '03', tone: '#123B30', description: 'Zümrüt tonlarının derinliğinde iz bırakan altın rengi motifler. Her kıvrımda ışığın başka bir hâli.' },
  { slug: 'safir-altin', name: 'Safir / Altın', title: 'Gecenin mavi ışığı.', color: 'Safir', image: 'bindalli-sapphire', index: '04', tone: '#123C88', description: 'Safir mavisi kadife üzerinde yükselen kıvrımlı altın motifler. Güçlü rengini, dengeli ve zarif bir silüetle tamamlar.' },
  { slug: 'yakut-altin', name: 'Yakut / Altın', title: 'Işığa açılan renk.', color: 'Yakut', image: 'bindalli-ruby', index: '05', tone: '#A51222', description: 'Yakut kırmızısının canlılığı, lale ve ince dal izleriyle buluşur. Geleneksel çizgiye parlak ve kararlı bir yorum.' },
  { slug: 'murdum-altin', name: 'Mürdüm / Altın', title: 'Sessiz bir ihtişam.', color: 'Mürdüm', image: 'bindalli-mulberry', index: '06', tone: '#56113E', description: 'Mürdüm kadifenin derin tonu, nar çiçeğini anımsatan altın işlemelerle katmanlanır. Sakin, yoğun ve zamansız.' },
  { slug: 'fildisi-altin', name: 'Fildişi / Altın', title: 'Işığın en zarif hâli.', color: 'Fildişi', image: 'bindalli-ivory', index: '07', tone: '#D9C29A', description: 'Fildişi kadife ve şampanya tonlu nakışlar, daha hafif bir ritimde ilerler. Ayrıntıları ışıkla belirginleşen dingin bir tasarım.' },
  { slug: 'petrol-altin', name: 'Petrol / Altın', title: 'Derin suda bir iz.', color: 'Petrol', image: 'bindalli-petrol', index: '08', tone: '#07505C', description: 'Maviye yaklaşan petrol kadife, karanfil ve kıvrımlı yaprak motifleriyle işlenir. Zümrütten ayrılan serin ve seçkin bir renk dünyası.' },
  { slug: 'mavi-bahar-altin', name: 'Mavi Bahar / Altın', title: 'Çiçeklerle açılan mavi.', color: 'Mavi Bahar', image: 'yorem-ceyiz-mavi-web', index: '09', tone: '#17499A', description: 'Canlı mavi kadife ceket, kıvrımlı altın işlemeler ve çiçek desenli açık renk etekle buluşur. Geleneksel biçime ferah bir yorum.' },
  { slug: 'kirmizi-lale-altin', name: 'Kırmızı Lale / Altın', title: 'Kırmızının güçlü çizgisi.', color: 'Kırmızı Lale', image: 'yorem-ceyiz-kirmizi-web', index: '10', tone: '#B5162D', description: 'Kırmızı kadife üzerinde simetrik altın motifler ve katmanlı bel detayı. Işığı belirgin, güçlü ve törensel bir silüet.' },
  { slug: 'bordo-bahar-altin', name: 'Bordo Bahar / Altın', title: 'Kadifede bahar izi.', color: 'Bordo Bahar', image: 'yorem-ceyiz-bordo-web', index: '11', tone: '#661044', description: 'Derin bordo kadife ceket, yoğun altın kıvrımlar ve çiçek desenli etekle tamamlanır. Renk ile motif arasında canlı bir denge.' },
  { slug: 'yesil-lale-altin', name: 'Yeşil Lale / Altın', title: 'Yeşilde yükselen motif.', color: 'Yeşil Lale', image: 'yorem-ceyiz-yesil-web', index: '12', tone: '#075B3A', description: 'Doygun yeşil kadife üzerinde lale çağrışımlı altın nakışlar ve katmanlı bel formu. Geleneksel çizginin belirgin bir yorumu.' },
] as const;

// Verified composition, technique, sizing, availability and prices are intentionally unset.
export const productFacts = { composition: null, technique: null, sizing: null, price: null, availability: null };
export const campaignDisclosure = 'Görseller Yörem Çeyiz için hazırlanmış dijital tasarım çalışmalarıdır. Gerçek model, renk ve uygulama detayları atölye görüşmesinde netleştirilir.';

export function pageMetadata(title: string, description: string, path: string) {
  return { title, description, alternates: site.url ? { canonical: `${site.url}${path}` } : undefined, openGraph: { title: `${title} | Yörem Çeyiz`, description, locale: 'tr_TR', siteName: site.name, type: 'website' as const, images: [{ url: '/media/logo/social-preview.png', width: 1200, height: 630, alt: 'Yörem Çeyiz — Kütahya' }], ...(site.url ? { url: `${site.url}${path}` } : {}) } };
}
