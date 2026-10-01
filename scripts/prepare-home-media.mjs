import sharp from 'sharp';
import { isExcluded } from './media-policy.mjs';
import { mkdir, writeFile } from 'node:fs/promises';

await mkdir('public/media/home', { recursive: true });
const assets = [];
const portraits = [
  ['bindalli-sapphire', 'assets/masters/bindalli-sapphire.png'],
  ['bindalli-ruby', 'assets/masters/bindalli-ruby.png'],
  ['bindalli-mulberry', 'assets/masters/bindalli-mulberry.png'],
  ['bindalli-ivory', 'assets/masters/bindalli-ivory.png'],
  ['bindalli-petrol', 'assets/masters/bindalli-petrol.png'],
  ['yorem-ceyiz-mavi-web', 'assets/yorem-ceyiz-mavi-web.webp'],
  ['yorem-ceyiz-kirmizi-web', 'assets/yorem-ceyiz-kirmizi-web.webp'],
  ['yorem-ceyiz-bordo-web', 'assets/yorem-ceyiz-bordo-web.png'],
  ['yorem-ceyiz-yesil-web', 'assets/yorem-ceyiz-yesil-web.png'],
];
for (const [file, source] of portraits) {
  if (await isExcluded(`public/media/home/${file}.webp`)) continue;
  const result = await sharp(source).resize({ width: 720, withoutEnlargement: true }).webp({ quality: 80, effort: 6 }).toFile(`public/media/home/${file}.webp`);
  assets.push({ file: `/media/home/${file}.webp`, width: result.width, height: result.height, bytes: result.size });
}
const detail = await sharp('assets/masters/bindalli-sapphire.png').extract({ left: 225, top: 200, width: 400, height: 510 }).resize({ width: 480 }).webp({ quality: 83, effort: 6 }).toFile('public/media/home/sapphire-detail.webp');
assets.push({ file: '/media/home/sapphire-detail.webp', width: detail.width, height: detail.height, bytes: detail.size });
await writeFile('public/media/home/manifest.json', JSON.stringify({ purpose: 'Homepage-only optimized derivatives; original collection assets remain unchanged.', assets }, null, 2));
console.log(assets);
