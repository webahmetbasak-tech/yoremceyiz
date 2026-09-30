import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 960 }, deviceScaleFactor: 1 });
await page.goto('http://localhost:3000/koleksiyon', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const cards = page.locator('.archive-card');
for (let index = 0; index < await cards.count(); index++) {
  await cards.nth(index).scrollIntoViewIfNeeded();
  await cards.nth(index).locator('img').waitFor({ state: 'visible' });
}
await page.screenshot({ path: 'output/qa/revision/collection-twelve-desktop.png', fullPage: true });
await cards.nth(8).scrollIntoViewIfNeeded();
await page.screenshot({ path: 'output/qa/revision/collection-new-colors-desktop.png' });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:3000/koleksiyon', { waitUntil: 'networkidle' });
await page.locator('.archive-card').nth(8).scrollIntoViewIfNeeded();
await page.screenshot({ path: 'output/qa/revision/collection-new-colors-mobile.png' });

await page.setViewportSize({ width: 1440, height: 960 });
await page.goto('http://localhost:3000/atolye', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'output/qa/revision/atolye-atalia-desktop.png' });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:3000/atolye', { waitUntil: 'networkidle' });
await page.screenshot({ path: 'output/qa/revision/atolye-atalia-mobile.png' });

await page.setViewportSize({ width: 1440, height: 960 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
const hero = await page.locator('.hero-experience').evaluate(element => ({
  top: element.getBoundingClientRect().top + scrollY,
  height: element.getBoundingClientRect().height,
}));
await page.evaluate(({ top, height }) => scrollTo({ top: top + (height - innerHeight) * .68, behavior: 'instant' }), hero);
await page.waitForTimeout(900);
await page.screenshot({ path: 'output/qa/revision/hero-for-desktop.png' });
await browser.close();
