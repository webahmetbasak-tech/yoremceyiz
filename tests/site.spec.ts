import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { products } from '../src/lib/collection';
const routes = ['/', '/koleksiyon', ...products.map(p => `/koleksiyon/${p.slug}`), '/atolye', '/hikayemiz', '/iletisim'];

for (const width of [1920, 1440, 1366, 1024, 768, 430, 390, 360]) {
  test(`responsive pages at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    for (const route of routes) {
      const response = await page.goto(route,{waitUntil:'domcontentloaded'});
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

test('opening shows a complete product and reaches the collection directly', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.couture-product img')).toHaveCSS('object-fit','contain');
  await expect.poll(()=>page.locator('.couture-product img').evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBeTruthy();
  await page.getByRole('link',{name:'SEÇKİYİ KEŞFET',exact:true}).click();
  await expect(page.locator('#selection-title')).toBeInViewport();
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

test('reduced motion preserves the full composition without hidden content', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.couture-intro')).toHaveCSS('animation-name','none');
  await expect(page.locator('.couture-product')).toBeVisible();
  await expect(page.locator('.custom-cursor')).not.toBeVisible();
});

test('collection controls and product inquiry preserve selection', async ({ page }) => {
  await page.goto('/');
  const next = page.getByRole('button', { name: 'Sonraki galeri karesi' });
  await next.scrollIntoViewIfNeeded();
  await next.click();
  await expect(page.getByRole('button', { name: 'Önceki galeri karesi' })).toBeEnabled();
  await page.goto('/koleksiyon/yesil-lale-altin');
  await page.getByRole('link', { name: 'BU TASARIMI KONUŞALIM' }).click();
  await expect(page.locator('.contact-selected')).toContainText('Yeşil Lale / Altın');
  await expect(page.locator('form')).toHaveCount(0);
  await expect(page.locator('.contact-map iframe')).toHaveAttribute('src',/maps.google.com/);
  const whatsapp = page.locator('a.contact-whatsapp');
  if(await whatsapp.count()) expect(decodeURIComponent(await whatsapp.getAttribute('href')||'')).toContain('Yeşil Lale / Altın');
});

test('collection archive presents all approved designs', async ({ page }) => {
  await page.goto('/koleksiyon');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Binbir hikâye');
  await expect(page.locator('.archive-card')).toHaveCount(products.length);
  const archiveImages = page.locator('.archive-card img');
  for (let index = 0; index < await archiveImages.count(); index++) {
    await expect(archiveImages.nth(index)).toHaveAttribute('loading', 'eager');
  }
  for (const slug of products.map(p => p.slug)) {
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
  await page.goto(process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000');
  await page.getByRole('button', { name:'MENÜ' }).tap();
  await page.getByRole('dialog').getByRole('link', { name:'Koleksiyon' }).tap();
  await page.locator('.archive-card').first().tap();
  await expect(page).toHaveURL(/bordo-altin/);
  await page.getByRole('link', { name:'BU TASARIMI KONUŞALIM' }).tap();
  await expect(page.locator('.contact-selected')).toContainText('Bordo / Sarma');
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
  const track = page.locator('.edition-rail');
  await track.scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Sonraki galeri karesi' }).click();
  await expect.poll(() => track.evaluate(element => element.scrollLeft)).toBeGreaterThan(100);
  await expect(page.locator('.atelier-journal')).toHaveCount(1);
  await expect(page.locator('.journal-motifs img')).toHaveCount(5);
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
  await expect.poll(() => page.locator('.couture-product img').evaluate((img: HTMLImageElement) => img.complete)).toBeTruthy();
  await page.screenshot({ path:'output/qa/home-desktop.png' });
  await page.emulateMedia({ reducedMotion:'reduce' });
  const allImages = page.locator('main img');
  for (let i=0; i < await allImages.count(); i++) {
    await allImages.nth(i).scrollIntoViewIfNeeded();
    await expect.poll(() => allImages.nth(i).evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBeTruthy();
  }
  await page.evaluate(() => { window.scrollTo({ top:0, behavior:'instant' }); document.querySelector('.edition-rail')?.scrollTo({ left:0, behavior:'instant' }); });
  await page.screenshot({ path:'output/qa/home-full.png', fullPage:true });
  await page.setViewportSize({ width:390, height:844 });
  await page.emulateMedia({ reducedMotion:'no-preference' });
  await page.goto('/');
  await expect.poll(() => page.locator('.couture-product img').evaluate((img: HTMLImageElement) => img.complete)).toBeTruthy();
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
