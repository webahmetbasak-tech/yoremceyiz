import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import { basename, join } from 'node:path';

const source = 'assets/collection';
const output = 'output/qa/collection-review';
await mkdir(output, { recursive: true });
const files = (await readdir(source)).filter(file => /\.jpe?g$/i.test(file));
const width = 360;
const height = 250;
const cells = [];

for (let index = 0; index < files.length; index++) {
  const file = files[index];
  const label = `${String(index + 1).padStart(2, '0')} · ${basename(file).replace(/_20\d+\.jpg$/i, '').slice(0, 34)}`;
  const image = await sharp(join(source, file)).resize(width, height - 42, { fit: 'cover' }).toBuffer();
  const caption = Buffer.from(`<svg width="${width}" height="42" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#17110d"/><text x="12" y="25" font-family="Arial" font-size="12" fill="#f0e8d8">${label.replaceAll('&','&amp;').replaceAll('<','&lt;')}</text></svg>`);
  const cell = await sharp({ create: { width, height, channels: 3, background: '#17110d' } }).composite([{ input: image, top: 0, left: 0 }, { input: caption, top: height - 42, left: 0 }]).jpeg({ quality: 88 }).toBuffer();
  cells.push({ input: cell, left: (index % 4) * width, top: Math.floor(index / 4) * height });
}
const rows = Math.ceil(files.length / 4);
await sharp({ create: { width: width * 4, height: rows * height, channels: 3, background: '#0b0a08' } }).composite(cells).jpeg({ quality: 90 }).toFile(`${output}/contact-sheet.jpg`);
console.log(files.map((file, index) => `${String(index + 1).padStart(2, '0')} ${file}`).join('\n'));
