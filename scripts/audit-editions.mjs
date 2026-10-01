import { chromium } from 'playwright';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import assert from 'node:assert/strict';
const base=process.env.AUDIT_URL || 'http://localhost:3003';
const manifest=JSON.parse(await readFile('public/media/editions/manifest.json','utf8'));
await mkdir('output/qa/editions',{recursive:true});
async function excluded(dir){
  const entries=await readdir(dir,{withFileTypes:true});const found=[];
  for(const e of entries){if(e.isDirectory())found.push(...await excluded(join(dir,e.name)));else if(/^x/i.test(e.name))found.push('/'+join(dir,e.name).replaceAll('\\','/').replace(/^public\//,''));}
  return found;
}
const retired=await excluded('public/media');
const forbidden=retired.flatMap(p=>[p,p.replace(/\/x[-_ ]?/i,'/')]);
const browser=await chromium.launch();
const report=[];
try{
for(const width of [390,1440,768,320]){
  const page=await browser.newPage({viewport:{width,height:960},reducedMotion:'reduce'});
  const failed=[];const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400)failed.push(r.status()+' '+r.url());});
  for(const route of ['/','/koleksiyon','/atolye']){
    await page.goto(base+route,{waitUntil:'networkidle'});
    await page.evaluate(()=>document.fonts.ready);
    for(const img of await page.locator('main img').all()){
      const source=decodeURIComponent(await img.getAttribute('src')||'');
      assert(!forbidden.some(p=>source.includes(p)),source);
      if(!await img.isVisible())continue;
      await img.scrollIntoViewIfNeeded();
      await page.waitForFunction(image=>image.complete&&image.naturalWidth>0,await img.elementHandle(),{timeout:20000}).catch(async error=>{console.log(await img.evaluate(el=>({src:el.currentSrc,complete:el.complete,width:el.naturalWidth,rect:el.getBoundingClientRect().toJSON(),scrollY,viewport:innerHeight})));console.log(failed);throw new Error(`Image failed at ${width}px ${route}: ${source}\n${error.message}`);});
    }
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`Overflow ${width} ${route}`);
    if(route==='/'){
      const imageSources=await page.locator('main img').evaluateAll(imgs=>imgs.map(i=>decodeURIComponent(i.getAttribute('src')||'')).join('\n'));
      for(const asset of manifest.assets)assert(imageSources.includes('/media/editions/'+asset.name+'.webp'),`Missing homepage ${asset.name}`);
      const rail=page.locator('.edition-rail');await rail.scrollIntoViewIfNeeded();
      await rail.evaluate(el=>el.scrollLeft=0);
      await page.getByRole('button',{name:'Sonraki galeri karesi'}).click();
      assert(await rail.evaluate(el=>el.scrollLeft>50),'Gallery did not move');
      await rail.focus();await page.keyboard.press('ArrowRight');
      if(width===1440||width===390){
        await page.addStyleTag({content:'.site-header,.skip-link,nextjs-portal { visibility:hidden!important; }'});
        for(const selector of ['.couture-hero','.edition-showcase','.home-colors','.atelier-journal']){await page.locator(selector).screenshot({path:`output/qa/editions/${width}-${selector.slice(1)}.png`});}
      }
    }
    if(route==='/koleksiyon'){
      assert.equal(await page.locator('.archive-card:visible').count(),17);
      await page.getByRole('button',{name:'Gece elbisesi'}).click();
      assert.equal(await page.locator('.archive-card:visible').count(),1);
      await page.getByRole('button',{name:'Tümü'}).click();
      assert.equal(await page.locator('.archive-card:visible').count(),17);
      if(width===1440||width===390){
        await page.addStyleTag({content:'.site-header,.skip-link,nextjs-portal { visibility:hidden!important; }'});
        await page.locator('.catalogue-opening').screenshot({path:`output/qa/editions/${width}-catalogue.png`});
        await page.locator('.edition-archive').screenshot({path:`output/qa/editions/${width}-archive.png`});
      }
    }
    report.push({width,route,ok:true});console.log(`${width}px ${route}: media, layout and controls passed`);
  }
  assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);
  await page.close();
}
}finally{await browser.close();await writeFile('output/qa/editions/audit.json',JSON.stringify(report,null,2));}
