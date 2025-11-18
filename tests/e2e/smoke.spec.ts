import { test, expect } from '@playwright/test';

test('landing muestra header y footer', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Planes' })).toBeVisible();
  await expect(page.getByText('Suscripciones y códigos digitales listos para producción')).toBeVisible();
  await page.getByRole('link', { name: 'Ver planes' }).click();
  await expect(page).toHaveURL(/.*planes/);
});
