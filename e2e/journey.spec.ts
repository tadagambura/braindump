import { expect, test, type Page } from '@playwright/test';

async function finishIntro(page: Page) {
  await expect(page.getByTestId('intro')).toBeVisible();
  for (let i = 0; i < 3; i++) await page.getByTestId('intro-next').click();
  await expect(page.getByTestId('dump')).toBeVisible();
}

test('dump → sort into Today/Later/Never → tick Today → persists', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await finishIntro(page);
  await page.getByTestId('dump-input').fill('buy milk\n- email Sam back\nlearn the banjo');
  await page.getByTestId('dump-go').click();
  await page.getByTestId('sort-today-buy milk').click();
  await page.getByTestId('sort-later-email Sam back').click();
  await page.getByTestId('sort-never-learn the banjo').click();
  await expect(page.getByTestId('celebrate')).toContainText('All sorted');
  await page.goto('/today');
  await page.getByTestId('today-buy milk').click();
  await expect(page.getByTestId('today-line')).toContainText('All 1 done');
  await page.reload();
  await expect(page.getByTestId('today-buy milk')).toHaveAttribute('aria-checked', 'true');
  await page.goto('/later');
  await expect(page.getByTestId('later-email Sam back')).toBeVisible();
  await page.getByTestId('bin-empty').click();
  await expect(page.getByTestId('toast')).toContainText('1 thoughts gone');
  expect(errors).toEqual([]);
});

test('free has 5 pages, then the paywall; the whiteboard is Premium (test mode)', async ({ page }) => {
  await page.goto('/');
  await finishIntro(page);
  for (const n of ['Ideas', 'Kids']) {
    await page.getByTestId('page-add').click();
    await page.getByTestId('page-name').fill(n);
    await page.getByTestId('page-save').click();
  }
  await page.getByTestId('page-add').click();
  await expect(page.getByTestId('paywall')).toBeVisible();
  await page.getByTestId('paywall-buy').click();
  await page.getByTestId('board-open').click();
  await expect(page.getByTestId('board')).toBeVisible();
  const box = (await page.getByTestId('board-canvas').boundingBox())!;
  await page.mouse.move(box.x + 30, box.y + 30);
  await page.mouse.down();
  await page.mouse.move(box.x + 120, box.y + 90, { steps: 8 });
  await page.mouse.up();
  await expect(page.getByTestId('board-canvas')).toHaveAttribute('aria-label', 'Whiteboard with 1 strokes');
});
