import { test, expect } from '@playwright/test';

// AAA - Arrange, Act, Assert

test('Check order status', async ({ page }) => {
// Test Data
const order = 'VLO-W4MS41'


  // Arrange
  await page.goto('http://localhost:5173/');
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');

  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  // Act
  await page.getByTestId('search-order-id').fill(order);
  await page.getByTestId('search-order-button').click();

  // Assert
  
  // Keeping the original assertions for reference
  // await expect(page.getByTestId('order-result-id')).toBeVisible();
  // await expect(page.getByTestId('order-result-id')).toContainText('VLO-W4MS41');

  // await expect(page.getByTestId('order-result-status')).toBeVisible();
  // await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');

  // My solution for the first challenge
  // const orderResult = page.getByTestId('order-result-VLO-W4MS41');

  // await expect(orderResult).toContainText('VLO-W4MS41');
  // await expect(orderResult).toContainText('APROVADO');

  // Solution taught by the instructor

  // First option by xpath
  // const orderCode = page.locator('//p[text()="Pedido"]/../p[text()="VLO-W4MS41"]')
  // await expect(orderCode).toBeVisible();

  // Second option by getByRole. + filter + locator
  const containerPedido = page.getByRole('paragraph')
    .filter({ hasText: /^Pedido$/ })
    .locator('..') //Go up to the parent elemtn (the div that wrap both paragraphs)

  await expect(containerPedido).toContainText('VLO-W4MS41');
  
  await expect(page.getByText('APROVADO')). toBeVisible();
});