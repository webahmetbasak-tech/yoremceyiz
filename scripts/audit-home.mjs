import { chromium, webkit, expect } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

await mkdir('output/qa/home-revision', { recursive: true });
const report = [];
for (const [engine, browserType, widths] of [['chromium', chromium, [320, 360, 390, 430, 768, 844, 1024, 1440, 1920]], ['webkit', webkit, [390, 430, 768, 844]]]) {
  const browser = await browserType.launch();
  for (const width of widths) {
    const context = await browser.newContext({ viewport: { width, height: width === 844 ? 390 : width < 701 ? 844 : 960 }, isMobile: width < 701 || width === 844, hasTouch: width < 1024, deviceScaleFactor: 1 });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto('http://localhost:3000/', { waitUntil: 'load' });
    expect(response.status()).toBe(200);
    const film = page.locator('.manifesto-film video');
    await expect.poll(() => film.evaluate(video => video.readyState), { timeout: 30000 }).toBeGreaterThanOrEqual(3);
    const earlyFilm = await film.evaluate(video => ({ source: video.currentSrc, bufferedSeconds: video.buffered.length ? video.buffered.end(video.buffered.length - 1) : 0, paused: video.paused, scrollY }));
    expect(earlyFilm.scrollY).toBe(0);
    expect(earlyFilm.paused).toBe(true);
    if (width <= 700 || width === 844) expect(earlyFilm.source).toContain('atelier-film-mobile.mp4');
    await expect(page.locator('.color-story-card')).toHaveCount(4);
    await expect(page.locator('.heritage-section img')).toHaveCount(1);
    const sections = ['.hero-experience', '.manifesto-body', '.manifesto-film', '.edition-showcase', '.home-colors', '.motif-library', '.stitch-section', '.heritage-section', '.final-cta', 'footer'];
    for (const selector of sections) {
      const section = page.locator(selector);
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
      for (const heading of await section.locator('h2').all()) {
        if (selector === '.hero-experience') continue;
        expect(await heading.evaluate(node => getComputedStyle(node).clipPath)).not.toBe('inset(0px 0px 100%)');
      }
      for (const img of await section.locator('img').all()) {
        // Only the horizontal gallery's visible panel needs to decode here.
        if (selector === '.edition-showcase') continue;
        await img.scrollIntoViewIfNeeded();
        await expect.poll(() => img.evaluate(node => node.complete && node.naturalWidth > 0)).toBeTruthy();
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), selector).toBe(true);
      if (selector === '.manifesto-film') {
        await section.scrollIntoViewIfNeeded();
        await expect.poll(() => film.evaluate(video => video.paused)).toBe(false);
        await page.getByRole('button', { name: 'Atölye filmini durdur' }).click();
        await expect(film).toHaveJSProperty('paused', true);
      }
      if (engine === 'chromium' && [390, 1440].includes(width)) {
        await section.screenshot({ path: `output/qa/home-revision/${width}-${selector.replaceAll('.', '').replaceAll(' ', '-')}.png`, style: '.site-header, .skip-link { visibility:hidden !important; }' });
      }
    }
    await expect(film).toHaveJSProperty('paused', true);
    expect(errors).toEqual([]);
    report.push({ engine, width, earlyFilm, sections: sections.length, errors });
    console.log(`${engine} ${width}px: hero → footer passed; film buffered before scrolling: ${earlyFilm.bufferedSeconds.toFixed(1)}s`);
    await context.close();
  }
  await browser.close();
}
// Compact visual boards preserve the whole reading sequence without huge screenshots.
for (const width of [390, 1440]) {
  const names = ['manifesto-body', 'manifesto-film', 'home-colors', 'stitch-section', 'heritage-section', 'final-cta', 'footer'];
  const tiles = await Promise.all(names.map(async name => sharp(`output/qa/home-revision/${width}-${name}.png`).resize({ width: 400 }).png().toBuffer()));
  const heights = await Promise.all(tiles.map(tile => sharp(tile).metadata().then(data => data.height)));
  let top = 0;
  const composite = tiles.map((input, index) => { const item = { input, left: 0, top }; top += heights[index]; return item; });
  await sharp({ create: { width: 400, height: top, channels: 3, background: '#17110d' } }).composite(composite).jpeg({ quality: 82 }).toFile(`output/qa/home-revision/composition-${width}.jpg`);
}
await writeFile('output/qa/home-revision/audit.json', JSON.stringify(report, null, 2));
