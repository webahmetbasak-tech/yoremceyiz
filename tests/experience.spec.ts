import { test, expect } from '@playwright/test';

test('wheel moves products both ways and releases page scroll at the end', async ({page})=>{
  await page.setViewportSize({width:1440,height:960});
  await page.goto('/');
  const rail=page.locator('.edition-rail');
  await rail.scrollIntoViewIfNeeded();
  await rail.hover();
  await page.mouse.wheel(0,550);
  await expect.poll(()=>rail.evaluate(el=>el.scrollLeft)).toBeGreaterThan(400);
  await page.mouse.wheel(0,-350);
  await expect.poll(()=>rail.evaluate(el=>el.scrollLeft)).toBeLessThan(400);
  await rail.focus();await page.keyboard.press('End');
  await expect(page.getByRole('button',{name:'Sonraki galeri karesi'})).toBeDisabled();
  const before=await page.evaluate(()=>scrollY);
  await rail.hover();await page.mouse.wheel(0,400);
  await expect.poll(()=>page.evaluate(()=>scrollY)).toBeGreaterThan(before+100);
});

test('dragging the product rail does not follow a product link', async ({page})=>{
  await page.goto('/');
  const rail=page.locator('.edition-rail');await rail.scrollIntoViewIfNeeded();
  const box=await rail.boundingBox();if(!box)throw new Error('Missing rail');
  await page.mouse.move(box.x+box.width*.6,box.y+140);await page.mouse.down();
  await page.mouse.move(box.x+box.width*.25,box.y+140,{steps:12});await page.mouse.up();
  await expect(page).toHaveURL('/');
  await expect.poll(()=>rail.evaluate(el=>el.scrollLeft)).toBeGreaterThan(200);
});

test('product viewer zooms, traps focus and restores it on Escape', async ({page})=>{
  await page.goto('/koleksiyon/bordo-altin');
  const opener=page.getByRole('button',{name:'Bordo / Sarma görselini büyüt'});
  await opener.click();
  const dialog=page.getByRole('dialog');await expect(dialog).toBeVisible();
  await page.getByRole('button',{name:'YAKINLAŞTIR'}).click();
  await expect(page.locator('.lightbox-canvas')).toHaveClass(/is-zoomed/);
  for(let i=0;i<5;i++){await page.keyboard.press('Tab');expect(await page.evaluate(()=>document.querySelector('.product-lightbox')?.contains(document.activeElement))).toBeTruthy();}
  await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(opener).toBeFocused();
  await expect(page.locator('.product-detail-section')).toHaveCount(0);
});

test('home has distinct sections and all product imagery is uncropped', async ({page})=>{
  await page.goto('/');
  const titles=await page.locator('main h2').allTextContents();
  expect(new Set(titles).size).toBe(titles.length);
  await expect(page.locator('.hero-experience,.manifesto,.stitch-section,.heritage-section')).toHaveCount(0);
  for(const image of await page.locator('.couture-product img,.edition-media img,.color-story-frame img').all())await expect(image).toHaveCSS('object-fit','contain');
});
