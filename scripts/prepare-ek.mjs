import { readFile, mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

// Explicit mapping prevents new files from shifting existing product identities.
const sources = JSON.parse(await readFile(new URL('./ek-sources.json',import.meta.url),'utf8'));
await mkdir('public/media/editions', { recursive: true });
const assets = [];
for (const {name,source} of sources) {
  if (/\/x[^/]*$/i.test(source)) throw new Error(`Excluded asset: ${source}`);
  const input = source;
  const output = `public/media/editions/${name}`;
  const desktop = await sharp(input).rotate().resize({width:1600,withoutEnlargement:true}).webp({quality:90,effort:6,smartSubsample:true}).toFile(`${output}.webp`);
  const mobile = await sharp(input).rotate().resize({width:800,withoutEnlargement:true}).webp({quality:85,effort:6,smartSubsample:true}).toFile(`${output}-mobile.webp`);
  assets.push({name,source:input,file:`/media/editions/${name}.webp`,width:desktop.width,height:desktop.height,bytes:desktop.size,mobileBytes:mobile.size});
}
await writeFile('public/media/editions/manifest.json',JSON.stringify({purpose:'Approved ek assets; x-prefixed artwork excluded.',assets},null,2));
console.log(`${assets.length} images optimized. Desktop: ${assets.reduce((n,a)=>n+a.bytes,0)} bytes; mobile: ${assets.reduce((n,a)=>n+a.mobileBytes,0)} bytes.`);
