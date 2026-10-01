import { chromium, webkit } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const base=process.env.AUDIT_URL||'http://localhost:3011';
await mkdir('output/qa/couture',{recursive:true});
const report={profiles:[],performance:{}};
for(const [engine,type] of [['chromium',chromium],['webkit',webkit]]) {
  const browser=await type.launch();
  try {
    for(const viewport of [{width:390,height:844},{width:844,height:390},{width:1440,height:960}]) {
      for(const path of ['/','/koleksiyon','/atolye','/hikayemiz','/iletisim','/koleksiyon/bordo-altin']) {
        const page=await browser.newPage({viewport,reducedMotion:'reduce'});
        const errors=[];page.on('pageerror',e=>errors.push(e.message));
        const response=await page.goto(base+path,{waitUntil:'domcontentloaded'});assert.equal(response.status(),200);
        await page.evaluate(()=>document.fonts.ready);
        assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${engine} ${viewport.width} ${path} overflow`);
        if(path==='/') {
          const hero=page.locator('.couture-product img');await hero.waitFor();
          await page.waitForFunction(()=>{const i=document.querySelector('.couture-product img');return i.complete&&i.naturalWidth>0;});
          if(viewport.width===390) {
            const rect=await hero.boundingBox();assert(rect.y+rect.height<=viewport.height,`Full hero product below first screen: ${rect.y+rect.height}`);
          }
          await page.screenshot({path:`output/qa/couture/${engine}-${viewport.width}-home.png`});
          const rail=page.locator('.edition-rail');await rail.scrollIntoViewIfNeeded();
          await page.getByRole('button',{name:'Sonraki galeri karesi'}).click();
          await page.waitForFunction(()=>document.querySelector('.edition-rail').scrollLeft>100);
        }
        if(path==='/koleksiyon/bordo-altin') {
          await page.getByRole('button',{name:'Bordo / Sarma görselini büyüt'}).click();
          await page.getByRole('dialog').waitFor({state:'visible'});
          await page.keyboard.press('Escape');await page.getByRole('dialog').waitFor({state:'hidden'});
        }
        if(engine==='chromium'&&viewport.width!==844)await page.screenshot({path:`output/qa/couture/${viewport.width}-${path.split('/').filter(Boolean).join('-')||'home-section'}.png`});
        report.profiles.push({engine,width:viewport.width,path,ok:true});
        assert.deepEqual(errors,[],`${engine} ${viewport.width} ${path}`);await page.close();
      }
      console.log(`${engine} ${viewport.width}px: six routes passed`);
    }
  } finally {await browser.close();}
}
const browser=await chromium.launch();
try {
  const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
  const page=await context.newPage();
  await page.addInitScript(()=>{
    window.__metrics={lcp:0,cls:0};
    new PerformanceObserver(list=>{for(const e of list.getEntries())window.__metrics.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});
    new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__metrics.cls+=e.value;}).observe({type:'layout-shift',buffered:true});
  });
  const cdp=await context.newCDPSession(page);
  await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
  await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:1.6*1024*1024/8,uploadThroughput:750*1024/8});
  await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
  await page.goto(base,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>{const img=document.querySelector('.couture-product img');return img.complete&&img.naturalWidth>0;},{},{timeout:60000});
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(3000);
  report.performance=await page.evaluate(()=>({...window.__metrics,hero:document.querySelector('.couture-product img').currentSrc,requests:performance.getEntriesByType('resource').length,transferBytes:performance.getEntriesByType('resource').reduce((sum,e)=>sum+e.transferSize,0)}));
  report.performance.profile='Local production; browser cache disabled; 1.6 Mbps, 150 ms latency, 4x CPU slowdown; single lab run, not a field Core Web Vitals score.';
  console.log(JSON.stringify(report.performance));
} finally {await browser.close();await writeFile('output/qa/couture/report.json',JSON.stringify(report,null,2));}
