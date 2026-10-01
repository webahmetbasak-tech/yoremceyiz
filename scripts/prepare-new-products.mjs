import sharp from 'sharp';
import { isExcluded } from './media-policy.mjs';
import { mkdir, stat } from 'node:fs/promises';

const products = [
  'bindalli-sapphire',
  'bindalli-ruby',
  'bindalli-mulberry',
  'bindalli-ivory',
  'bindalli-petrol',
];

await mkdir('public/media', { recursive: true });

for (const name of products) {
  if (await isExcluded(`public/media/${name}.webp`)) continue;
  const source = `assets/masters/${name}.png`;
  const desktop = `public/media/${name}.webp`;
  const mobile = `public/media/${name}-mobile.webp`;

  const info = await sharp(source)
    .resize({ width: 1200, height: 1800, fit: 'cover', position: 'centre', withoutEnlargement: true })
    .webp({ quality: 88, effort: 6 })
    .toFile(desktop);

  await sharp(source)
    .resize({ width: 750, height: 1125, fit: 'cover', position: 'centre', withoutEnlargement: true })
    .webp({ quality: 84, effort: 6 })
    .toFile(mobile);

  const bytes = (await stat(desktop)).size;
  console.log(`${name}: ${info.width}x${info.height}, ${Math.round(bytes / 1024)} KB`);
}
