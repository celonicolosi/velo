import { test, expect } from '@playwright/test';

test('Check order status', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Check if the webapp is online
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

  await page.getByRole('link', { name: 'Consultar Pedido' }).click();

  // Check if the order lookup page is loaded
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');


  await page.getByTestId('search-order-id').fill('VLO-W4MS41');
  await page.getByTestId('search-order-button').click();

  await expect(page.getByTestId('order-result-id')).toBeVisible();
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-W4MS41');
  
  await expect(page.getByTestId('order-result-status')).toBeVisible();
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
});