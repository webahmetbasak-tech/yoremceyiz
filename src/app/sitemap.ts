import type { MetadataRoute } from 'next';
import { products, site } from '@/lib/site';
export default function sitemap(): MetadataRoute.Sitemap { return site.url ? ['', '/koleksiyon', '/atolye', '/hikayemiz', '/iletisim', ...products.map(p => `/koleksiyon/${p.slug}`)].map(path => ({ url: `${site.url}${path}`, changeFrequency: 'monthly', priority: path === '' ? 1 : .7 })) : []; }
