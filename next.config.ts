import type { NextConfig } from 'next';
const config: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: '/koleksiyon/zumrut-altin', destination: '/koleksiyon/yesil-lale-altin', permanent: true },
      { source: '/koleksiyon/murdum-altin', destination: '/koleksiyon/bordo-bahar-altin', permanent: true },
      { source: '/koleksiyon/fildisi-altin', destination: '/koleksiyon/mint-salvar', permanent: true },
      { source: '/koleksiyon/petrol-altin', destination: '/koleksiyon/mavi-salvar', permanent: true },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 80, 85],
  },
  async headers() {
    return [{ source: '/:path*', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' }
    ] }];
  }
};
export default config;
