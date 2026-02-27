import { test, expect } from '@playwright/test';

// AAA - Arrange, Act, Assert

test('Check order status', async ({ page }) => {
  // Arrange
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  // Act
  await page.getByTestId('search-order-id').fill('VLO-W4MS41');
  await page.getByTestId('search-order-button').click();

  // Assert
  
  // Keeping the original assertions for reference
  // await expect(page.getByTestId('order-result-id')).toBeVisible();
  // await expect(page.getByTestId('order-result-id')).toContainText('VLO-W4MS41');

  // await expect(page.getByTestId('order-result-status')).toBeVisible();
  // await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');

  // Asserting scoping by the result card data-testid
  const orderResult = page.getByTestId('order-result-VLO-W4MS41');

  await expect(orderResult).toContainText('VLO-W4MS41');
  await expect(orderResult).toContainText('APROVADO');
});