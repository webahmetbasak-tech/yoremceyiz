import sharp from 'sharp';
import { isExcluded } from './media-policy.mjs';
import { mkdir, readdir, copyFile } from 'node:fs/promises';
import { join } from 'node:path';

const source = 'assets/collection';
const target = 'public/media/collection';
await mkdir(target, { recursive: true });
const files = await readdir(source);
const selections = [
  ['atelier-lineup', 'Bindallı_garments_displayed'],
  ['atelier-workroom', 'Tailoring_atelier_interior'],
  ['burgundy-hanger', 'Velvet_garment_hanging'],
  ['burgundy-table', 'Crimson_velvet_fabric'],
  ['black-stitch', 'Gold_needle_piercing_black'],
  ['burgundy-stitch', 'Tailor_stitching_gold'],
  ['garment-parts', 'Traditional_garment_parts'],
  ['collection-lineup', 'Traditional_Turkish_bindallı'],
  ['embroidered-wordmark', 'Embroidered_logo_concept'],
  ['green-stitch', 'Applying_gold_wire_embroidery'],
];

for (const [name, prefix] of selections) {
  if (await isExcluded(join(target, `${name}.webp`))) continue;
  const file = files.find(candidate => candidate.startsWith(prefix));
  if (!file) throw new Error(`Missing collection asset: ${prefix}`);
  const input = join(source, file);
  await sharp(input).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 86, effort: 6 }).toFile(join(target, `${name}.webp`));
  await sharp(input).rotate().resize({ width: 720, withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toFile(join(target, `${name}-mobile.webp`));
}

await sharp('assets/masters/sewing-construction.png').resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 86, effort: 6 }).toFile(join(target, 'sewing-construction.webp'));
await sharp('assets/masters/sewing-construction.png').resize({ width: 720, withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toFile(join(target, 'sewing-construction-mobile.webp'));
await copyFile(join(source, 'videos.mp4'), join(target, 'collection-source.mp4'));
console.log('Collection stills prepared.');
