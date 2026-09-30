import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

await mkdir('output/qa/revision', { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 960 }, deviceScaleFactor: 1 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const manifestoTop = await page.locator('.manifesto').evaluate(element => element.getBoundingClientRect().top + scrollY);
await page.evaluate(top => scrollTo({ top, behavior: 'instant' }), manifestoTop);
await page.waitForTimeout(500);
await page.screenshot({ path: 'output/qa/revision/manifesto-desktop.png' });
await page.locator('.manifesto-film').scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
await page.screenshot({ path: 'output/qa/revision/film-desktop.png' });
const collection = await page.locator('.collection-section').evaluate(element => ({ top: element.getBoundingClientRect().top + scrollY, height: element.getBoundingClientRect().height }));
for (const [name, progress] of [['collection-start', .02], ['collection-middle', .46], ['collection-end', .92]]) {
  await page.evaluate(({ top, height, progress }) => scrollTo({ top: top + (height - innerHeight) * progress, behavior: 'instant' }), { ...collection, progress });
  await page.waitForTimeout(700);
  await page.screenshot({ path: `output/qa/revision/${name}.png` });
}
const stitchTop = await page.locator('.stitch-section').evaluate(element => element.getBoundingClientRect().top + scrollY);
await page.evaluate(top => scrollTo({ top, behavior: 'instant' }), stitchTop);
await page.waitForTimeout(500);
await page.screenshot({ path: 'output/qa/revision/stitch-desktop.png' });

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
await mobile.goto('http://localhost:3000', { waitUntil: 'networkidle' });
const mobileManifestoTop = await mobile.locator('.manifesto').evaluate(element => element.getBoundingClientRect().top + scrollY);
await mobile.evaluate(top => scrollTo({ top, behavior: 'instant' }), mobileManifestoTop);
await mobile.waitForTimeout(400);
await mobile.screenshot({ path: 'output/qa/revision/manifesto-mobile.png' });
await mobile.locator('.collection-section').scrollIntoViewIfNeeded();
await mobile.waitForTimeout(400);
await mobile.screenshot({ path: 'output/qa/revision/collection-mobile.png' });
const mobileStitchTop = await mobile.locator('.stitch-section').evaluate(element => element.getBoundingClientRect().top + scrollY);
await mobile.evaluate(top => scrollTo({ top, behavior: 'instant' }), mobileStitchTop);
await mobile.waitForTimeout(400);
await mobile.screenshot({ path: 'output/qa/revision/stitch-mobile.png' });
await browser.close();
