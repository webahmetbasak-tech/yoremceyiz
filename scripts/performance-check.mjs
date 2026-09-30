import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
const browser = await chromium.launch();
const report = [];
for (const mobile of [false,true]) {
  const context = await browser.newContext({ viewport: mobile ? { width:390,height:844 } : { width:1440,height:960 }, deviceScaleFactor:mobile ? 2 : 1, isMobile:mobile, hasTouch:mobile });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.setCacheDisabled', { cacheDisabled:true });
  if (mobile) {
    await cdp.send('Network.emulateNetworkConditions', { offline:false, latency:150, downloadThroughput:1600000/8, uploadThroughput:750000/8 });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate:4 });
  }
  await page.addInitScript(() => {
    window.__metrics = { lcp:0, cls:0 };
    new PerformanceObserver(list => { for(const entry of list.getEntries()) window.__metrics.lcp = entry.startTime; }).observe({ type:'largest-contentful-paint', buffered:true });
    new PerformanceObserver(list => { for(const entry of list.getEntries()) if(!entry.hadRecentInput) window.__metrics.cls += entry.value; }).observe({ type:'layout-shift', buffered:true });
  });
  await page.goto('http://localhost:3000', { waitUntil:'networkidle' });
  const metrics = await page.evaluate(() => ({ ...window.__metrics, resources:performance.getEntriesByType('resource').map(r => ({ name:r.name.split('/').pop(), bytes:r.transferSize, type:r.initiatorType })), navigation:performance.getEntriesByType('navigation')[0].toJSON() }));
  const scripts = metrics.resources.filter(r => r.type === 'script');
  report.push({ profile:mobile ? '390px, 4x CPU, 1.6Mbps / 150ms, fresh browser cache' : '1440px, unthrottled localhost, fresh browser cache', lcpMs:Math.round(metrics.lcp), cls:metrics.cls, transferredJsBytes:scripts.reduce((sum,r)=>sum+r.bytes,0), totalTransferBytes:metrics.resources.reduce((sum,r)=>sum+r.bytes,0), resources:metrics.resources });
  await context.close();
}
await browser.close();
await mkdir('output/qa', { recursive:true });
await writeFile('output/qa/performance.json',JSON.stringify({ caveat:'Local lab observations, warmed server-side image cache. Not field p75 or an INP measurement.',report },null,2));
console.log(JSON.stringify(report.map(r=>({ profile:r.profile, lcpMs:r.lcpMs, cls:r.cls, transferredJsBytes:r.transferredJsBytes, totalTransferBytes:r.totalTransferBytes })),null,2));
