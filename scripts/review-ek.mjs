import fs from 'node:fs/promises';
import sharp from 'sharp';
const files = (await fs.readdir('public/media/ek')).filter(f => /\.(png|jpg|webp)$/i.test(f)).sort();
await fs.mkdir('output/qa', { recursive: true });
const tiles = [];
for (const [i, f] of files.entries()) {
  const meta = await sharp(`public/media/ek/${f}`).metadata();
  console.log(`${i}: ${f} (${meta.width}x${meta.height})`);
  const input = await sharp(`public/media/ek/${f}`).resize(260,310,{fit:'contain',background:'#19130e'}).extend({bottom:30,background:'#19130e'}).composite([{input:Buffer.from(`<svg width="260" height="340"><text x="12" y="330" fill="white" font-size="20">${i}</text></svg>`)}]).png().toBuffer();
  tiles.push({input,left:i%5*260,top:Math.floor(i/5)*340});
}
await sharp({create:{width:1300,height:Math.ceil(files.length/5)*340,channels:3,background:'#19130e'}}).composite(tiles).jpeg().toFile('output/qa/ek-contact.jpg');
await fs.writeFile('output/qa/ek-files.json',JSON.stringify(files));
