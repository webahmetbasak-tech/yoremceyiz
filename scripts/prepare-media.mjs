import sharp from 'sharp';
import { isExcluded } from './media-policy.mjs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
const assets = JSON.parse(await readFile(new URL('./asset-sources.json', import.meta.url), 'utf8'));
await mkdir('public/media', { recursive: true });
await mkdir('output/qa', { recursive: true });
const manifest = [];
for (const asset of assets) {
  if (await isExcluded(`public/media/${asset.name}.webp`)) continue;
  const info = await sharp(asset.source).resize({ width: 1680, withoutEnlargement: true }).webp({ quality: 86, effort: 6 }).toFile(`public/media/${asset.name}.webp`);
  await sharp(asset.source).resize({ width: 750, withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toFile(`public/media/${asset.name}-mobile.webp`);
  manifest.push({ name: asset.name, file: `/media/${asset.name}.webp`, width: info.width, height: info.height, bytes: info.size, provenance: 'Original AI-generated campaign artwork; not documentary product photography.', prompt: asset.prompt });
}
await writeFile('public/media/manifest.json', JSON.stringify(manifest, null, 2));
const columns = 3;
const rows = Math.ceil(assets.length / columns);
const thumbs = await Promise.all(assets.map(async(asset, i) => ({ input: await sharp(asset.source).resize(400, 300, { fit: 'contain', background: '#17110d' }).png().toBuffer(), left: (i % columns) * 400, top: Math.floor(i / columns) * 300 })));
await sharp({ create: { width: columns * 400, height: rows * 300, channels: 3, background: '#17110d' } }).composite(thumbs).jpeg({ quality: 88 }).toFile('output/qa/campaign-contact-sheet.jpg');
console.log(manifest.map(({name,bytes})=>`${name}: ${Math.round(bytes / 1024)} KB`).join('\n'));
