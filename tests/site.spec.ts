import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const routes = ['/', '/koleksiyon', '/koleksiyon/bordo-altin', '/koleksiyon/siyah-altin', '/koleksiyon/zumrut-altin', '/koleksiyon/safir-altin', '/koleksiyon/yakut-altin', '/koleksiyon/murdum-altin', '/koleksiyon/fildisi-altin', '/koleksiyon/petrol-altin', '/koleksiyon/mavi-bahar-altin', '/koleksiyon/kirmizi-lale-altin', '/koleksiyon/bordo-bahar-altin', '/koleksiyon/yesil-lale-altin', '/atolye', '/hikayemiz', '/iletisim'];

for (const width of [1920, 1440, 1366, 1024, 768, 430, 390, 360]) {
  test(`responsive pages at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute('content', /social-preview.png/);
      await page.evaluate(() => document.fonts.ready);
      const size = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, viewport: innerWidth }));
      expect(size.scroll, route).toBeLessThanOrEqual(size.viewport + 1);
    }
    expect(errors).toEqual([]);
  });
}

test('hero is reversible and leaves the viewport naturally', async ({ page }) => {
  await page.goto('/');
  await page.waitForFunction(() => document.querySelector('.scene-1')?.getAttribute('style'));
  const distance = await page.locator('.hero-experience').evaluate(el => el.getBoundingClientRect().height - innerHeight);
  for (const [fraction, scene] of [[.30, 1], [.50, 2], [.70, 3], [.94, 4], [0, 0]]) {
    await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), distance * fraction);
    await expect(page.locator(`.scene-${scene}`)).toBeVisible();
    await expect(page.locator(`.scene-${scene}`)).toHaveCSS('opacity', '1');
  }
  await page.locator('.scroll-note').click();
  await expect(page.locator('#manifesto')).toBeInViewport();
});

test('mobile menu traps focus, closes on Escape and restores focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'MENÜ' });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => document.querySelector('dialog')?.contains(document.activeElement))).toBeTruthy();
  }
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole('link', { name: 'Koleksiyon' }).click();
  await expect(page).toHaveURL('/koleksiyon');
  await expect(dialog).not.toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
});

test('reduced motion preserves every story scene and navigation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.cinema-frame')).toHaveCSS('position', 'relative');
  for (let i = 0; i < 5; i++) await expect(page.locator(`.scene-${i}`)).toBeVisible();
  await expect(page.locator('.custom-cursor')).not.toBeVisible();
});

test('collection controls and product inquiry preserve selection', async ({ page }) => {
  await page.goto('/');
  const next = page.getByRole('button', { name: 'Sonraki galeri karesi' });
  await next.scrollIntoViewIfNeeded();
  await next.click();
  await expect(page.getByRole('button', { name: 'Önceki galeri karesi' })).toBeEnabled();
  await page.goto('/koleksiyon/zumrut-altin');
  await page.getByRole('link', { name: 'BU TASARIMI KONUŞALIM' }).click();
  await expect(page.getByLabel('İlginizi çeken')).toHaveValue('zumrut-altin');
  await page.getByLabel('Adınız').fill('Deneme');
  await page.getByLabel('Bize anlatmak istedikleriniz').fill('Zümrüt renk ve altın motifler üzerine görüşmek istiyorum.');
  await page.getByRole('button', { name: 'GÖRÜŞME NOTUNU HAZIRLA' }).click();
  await expect(page.getByText('Notunuz hazır.')).toBeVisible();
  await expect(page.locator('.contact-result pre')).toContainText('Zümrüt / Altın');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'NOTU İNDİR' }).click();
  expect((await downloadPromise).suggestedFilename()).toBe('yorem-ceyiz-gorusme-notu.txt');
});

test('collection archive presents all twelve color stories', async ({ page }) => {
  await page.goto('/koleksiyon');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('on iki hâli');
  await expect(page.locator('.archive-card')).toHaveCount(12);
  const archiveImages = page.locator('.archive-card img');
  for (let index = 0; index < await archiveImages.count(); index++) {
    await expect(archiveImages.nth(index)).toHaveAttribute('loading', 'eager');
  }
  for (const slug of ['safir-altin', 'yakut-altin', 'murdum-altin', 'fildisi-altin', 'petrol-altin', 'mavi-bahar-altin', 'kirmizi-lale-altin', 'bordo-bahar-altin', 'yesil-lale-altin']) {
    const card = page.locator(`.archive-card[href="/koleksiyon/${slug}"]`);
    await card.scrollIntoViewIfNeeded();
    await expect(card).toBeVisible();
    await expect.poll(() => card.locator('img').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBeTruthy();
  }
});

test('all pages meet automated WCAG 2.2 AA checks', async ({ page }) => {
  const violations: object[] = [];
  for (const route of routes) {
    await page.goto(route);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const results = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
    violations.push(...results.violations.map(v => ({ route, id:v.id, nodes:v.nodes.map(n => ({ target:n.target, summary:n.failureSummary })) })));
  }
  expect(violations).toEqual([]);
});

test('touch navigation and mobile inquiry work', async ({ browser }) => {
  const context = await browser.newContext({ viewport:{ width:390,height:844 }, isMobile:true, hasTouch:true, deviceScaleFactor:2 });
  const page = await context.newPage();
  await page.goto('http://localhost:3000');
  await page.getByRole('button', { name:'MENÜ' }).tap();
  await page.getByRole('dialog').getByRole('link', { name:'Koleksiyon' }).tap();
  await page.locator('.archive-card').first().tap();
  await expect(page).toHaveURL(/bordo-altin/);
  await page.getByRole('link', { name:'BU TASARIMI KONUŞALIM' }).tap();
  await expect(page.getByLabel('İlginizi çeken')).toHaveValue('bordo-altin');
  await context.close();
});

test('horizontal collection travels, stays controllable and keeps film silent', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 960 });
  await page.goto('/');
  const film = page.locator('.manifesto-film video');
  await page.locator('.manifesto-film').scrollIntoViewIfNeeded();
  await expect(film).toHaveJSProperty('muted', true);
  await expect.poll(() => film.evaluate((node: HTMLVideoElement) => !node.paused)).toBeTruthy();
  await page.getByRole('button', { name: 'Atölye filmini durdur' }).click();
  await expect(page.getByRole('button', { name: 'Atölye filmini oynat' })).toBeVisible();
  const section = page.locator('.collection-section');
  const track = page.locator('.collection-track');
  const geometry = await section.evaluate(element => ({ top: element.getBoundingClientRect().top + scrollY, range: element.getBoundingClientRect().height - innerHeight }));
  await page.evaluate(({ top, range }) => scrollTo({ top: top + range * .52, behavior: 'instant' }), geometry);
  await expect.poll(() => track.evaluate(element => getComputedStyle(element).transform)).not.toBe('none');
  await expect(page.locator('.collection-controls').getByText(/0[3-5] \/ 06/)).toBeVisible();
  await expect(page.locator('.stitch-section h2')).toContainText('Dikiş kurar.');
  await page.locator('.stitch-section').scrollIntoViewIfNeeded();
  await expect(page.locator('.stitch-section h2')).toBeVisible();
  for (const image of await page.locator('.stitch-section img').all()) await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBeTruthy();
});

test('media, metadata, 404 and identity assets resolve', async ({ page, request }) => {
  await page.goto('/');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const images = page.locator('main img');
  for (let i=0; i < await images.count(); i++) {
    await images.nth(i).scrollIntoViewIfNeeded();
    await expect.poll(() => images.nth(i).evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBeTruthy();
  }
  await expect(page.locator('html')).toHaveAttribute('lang','tr');
  await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute('content', /social-preview.png/);
  for (const url of ['/icon.svg','/media/logo/app-icon.png','/media/logo/primary.svg','/media/logo/social-preview.png','/robots.txt','/sitemap.xml','/manifest.webmanifest']) expect((await request.get(url)).status()).toBe(200);
  expect((await page.goto('/koleksiyon/bilinmeyen'))?.status()).toBe(404);
});

test('capture desktop and mobile compositions', async ({ page }) => {
  await page.setViewportSize({ width:1440, height:960 });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect.poll(() => page.locator('.scene-0 img').evaluate((img: HTMLImageElement) => img.complete)).toBeTruthy();
  await page.screenshot({ path:'output/qa/home-desktop.png' });
  await page.emulateMedia({ reducedMotion:'reduce' });
  await expect(page.locator('.hero-scene img')).toHaveCount(5);
  const allImages = page.locator('main img');
  for (let i=0; i < await allImages.count(); i++) {
    await allImages.nth(i).scrollIntoViewIfNeeded();
    await expect.poll(() => allImages.nth(i).evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBeTruthy();
  }
  await page.evaluate(() => { window.scrollTo({ top:0, behavior:'instant' }); document.querySelector('.collection-track')?.scrollTo({ left:0, behavior:'instant' }); });
  await page.screenshot({ path:'output/qa/home-full.png', fullPage:true });
  await page.setViewportSize({ width:390, height:844 });
  await page.emulateMedia({ reducedMotion:'no-preference' });
  await page.goto('/');
  await expect.poll(() => page.locator('.scene-0 img').evaluate((img: HTMLImageElement) => img.complete)).toBeTruthy();
  await page.screenshot({ path:'output/qa/home-mobile.png' });
  await page.goto('/koleksiyon/bordo-altin');
  const productImages = page.locator('main img');
  for (let i=0; i < await productImages.count(); i++) {
    await productImages.nth(i).scrollIntoViewIfNeeded();
    await expect.poll(() => productImages.nth(i).evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBeTruthy();
  }
  await page.evaluate(() => window.scrollTo({ top:0, behavior:'instant' }));
  await page.screenshot({ path:'output/qa/product-mobile.png', fullPage:true });
});
