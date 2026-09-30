import { test, expect } from '@playwright/test';

test('mobile film buffers from page opening and follows visibility and pause controls', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const film = page.locator('.manifesto-film video');
  await expect(film).toHaveAttribute('preload', 'auto');
  await expect.poll(() => film.evaluate((element: HTMLVideoElement) => element.buffered.length ? element.buffered.end(element.buffered.length - 1) : 0)).toBeGreaterThan(9);
  expect(await page.evaluate(() => scrollY)).toBe(0);
  await expect(film).toHaveJSProperty('paused', true);
  expect(await film.evaluate((element: HTMLVideoElement) => element.currentSrc)).toContain('atelier-film-mobile.mp4');
  await film.scrollIntoViewIfNeeded();
  await expect(film).toHaveJSProperty('paused', false);
  await page.locator('.home-colors').scrollIntoViewIfNeeded();
  await expect(film).toHaveJSProperty('paused', true);
  await film.scrollIntoViewIfNeeded();
  await expect(film).toHaveJSProperty('paused', false);
  await page.getByRole('button', { name: 'Atölye filmini durdur' }).click();
  await page.locator('.home-colors').scrollIntoViewIfNeeded();
  await film.scrollIntoViewIfNeeded();
  await expect(film).toHaveJSProperty('paused', true);
});

test('four supplied colors are visible outside the horizontal gallery and gallery media loads eagerly', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('.color-story-card');
  await expect(cards).toHaveCount(4);
  const galleryImages = page.locator('.collection-track .collection-media img');
  await expect(galleryImages).toHaveCount(6);
  for (let index = 0; index < await galleryImages.count(); index++) {
    await expect(galleryImages.nth(index)).toHaveAttribute('loading', 'eager');
    await expect.poll(() => galleryImages.nth(index).evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBeTruthy();
  }
  await page.locator('.home-colors').scrollIntoViewIfNeeded();
  for (const [index, slug] of ['mavi-bahar', 'kirmizi-lale', 'bordo-bahar', 'yesil-lale'].entries()) {
    await expect(cards.nth(index)).toHaveAttribute('href', `/koleksiyon/${slug}-altin`);
    await expect.poll(() => cards.nth(index).locator('img').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBeTruthy();
  }
  await page.locator('.heritage-section').scrollIntoViewIfNeeded();
  await expect(page.locator('#heritage-title')).toBeVisible();
  await expect(page.locator('#heritage-title')).toHaveCSS('clip-path', 'none');
  await expect(page.locator('.heritage-section img')).toHaveCount(1);
});

test('reduced motion keeps the film still until played deliberately', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const film = page.locator('.manifesto-film video');
  await film.scrollIntoViewIfNeeded();
  await expect(film).toHaveJSProperty('paused', true);
  await page.getByRole('button', { name: 'Atölye filmini oynat' }).click();
  await expect(film).toHaveJSProperty('paused', false);
});

test('landscape phone gallery uses a controllable horizontal track', async ({ page }) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto('/');
  await page.locator('.collection-sticky').scrollIntoViewIfNeeded();
  await expect(page.locator('.collection-sticky')).toHaveCSS('position', 'relative');
  await page.getByRole('button', { name: 'Sonraki galeri karesi' }).click();
  await expect.poll(() => page.locator('.collection-track').evaluate(element => element.scrollLeft)).toBeGreaterThan(100);
  await expect(page.getByRole('button', { name: 'Önceki galeri karesi' })).toBeEnabled();
});
