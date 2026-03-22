import { test, expect } from '@playwright/test';
import { generateRandomOrderCode } from '../support/helpers/generate_random_order_code';

// AAA - Arrange, Act, Assert

test.describe('Check order status', ()=>{

  // test.beforeAll(async ({ page }) => {
  //   // Before all runs once before ALL tests
  // });

  test.beforeEach(async ({ page })=>{
    // Before each runs once before EACH test
      // Arrange
      await page.goto('http://localhost:5173/');
      await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint');
    
      await page.getByRole('link', { name: 'Consultar Pedido' }).click();
      await expect(page.getByRole('heading')).toContainText('Consultar Pedido');
  });

  // test.afterAll(async ({ page })=>{
  //   // After all runs once after ALL tests
  // });

  // test.afterEach(async ({ page })=>{
  //   // After each runs once after EACH test
  // });

  test('Should return an Approved order when searching by order id', async ({ page }) => {
    // Test Data
    // const order = 'VLO-W4MS41';
    const order = {
      id: 'VLO-W4MS41',
      status: 'APROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Marcelo Nicolosi',
        email: 'marceleza@velo.dev'
      },
      payment: 'À Vista'
    }
    
      // Act
      await page.getByTestId('search-order-id').fill(order.id);
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
      // const containerPedido = page.getByRole('paragraph')
      //   .filter({ hasText: /^Pedido$/ })
      //   .locator('..') //Go up to the parent elemtn (the div that wrap both paragraphs)
    
      // await expect(containerPedido).toContainText('VLO-W4MS41');
      
      // await expect(page.getByText('APROVADO')). toBeVisible();

      // Approach using toMatchAriaSnapshot
      await expect(page.getByTestId(`order-result-${order.id}`)).toMatchAriaSnapshot(`
        - img
        - paragraph: Pedido
        - paragraph: ${order.id}
        - img
        - text: ${order.status}
        - img "Velô Sprint"
        - paragraph: Modelo
        - paragraph: Velô Sprint
        - paragraph: Cor
        - paragraph: ${order.color}
        - paragraph: Interior
        - paragraph: cream
        - paragraph: Rodas
        - paragraph: ${order.wheels}
        - heading "Dados do Cliente" [level=4]
        - paragraph: Nome
        - paragraph: ${order.customer.name}
        - paragraph: Email
        - paragraph: ${order.customer.email}
        - paragraph: Loja de Retirada
        - paragraph
        - paragraph: Data do Pedido
        - paragraph: /\\d+\\/\\d+\\/\\d+/
        - heading "Pagamento" [level=4]
        - paragraph: ${order.payment}
        - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
        `);
    });

    test('Should return a Reproved order when searching by order id', async ({ page }) => {
      // Test Data
      // const order = 'VLO-3K4V1O';
      const order = {
        id: 'VLO-3K4V1O',
        status: 'REPROVADO',
        color: 'Lunar White',
        wheels: 'aero Wheels',
        customer: {
          name: 'Diogo Porto',
          email: 'diogo-porto85@nogueiramoura.adv.br'
        },
        payment: 'À Vista'
      }

      
        // Act
        await page.getByTestId('search-order-id').fill(order.id);
        await page.getByTestId('search-order-button').click();
      
        // Assert

        // Approach using toMatchAriaSnapshot
        await expect(page.getByTestId(`order-result-${order.id}`)).toMatchAriaSnapshot(`
          - img
          - paragraph: Pedido
          - paragraph: ${order.id}
          - img
          - text: ${order.status}
          - img "Velô Sprint"
          - paragraph: Modelo
          - paragraph: Velô Sprint
          - paragraph: Cor
          - paragraph: ${order.color}
          - paragraph: Interior
          - paragraph: cream
          - paragraph: Rodas
          - paragraph: ${order.wheels}
          - heading "Dados do Cliente" [level=4]
          - paragraph: Nome
          - paragraph: ${order.customer.name}
          - paragraph: Email
          - paragraph: ${order.customer.email}
          - paragraph: Loja de Retirada
          - paragraph
          - paragraph: Data do Pedido
          - paragraph: /\\d+\\/\\d+\\/\\d+/
          - heading "Pagamento" [level=4]
          - paragraph: ${order.payment}
          - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
        `);
      });

      test('Should return a Em Analise when searching by order id', async ({ page }) => {
        // Test Data
        const order = {
          id: 'VLO-7IW1YM',
          status: 'EM_ANALISE',
          color: 'Lunar White',
          wheels: 'aero Wheels',
          customer: {
            name: 'Lorena Sara Marlene Moreira',
            email: 'lorena_sara_moreira@capua.com.br'
          },
          payment: 'À Vista'
        }
  
        
          // Act
          await page.getByTestId('search-order-id').fill(order.id);
          await page.getByTestId('search-order-button').click();
        
          // Assert
  
          // Approach using toMatchAriaSnapshot
          await expect(page.getByTestId(`order-result-${order.id}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.id}
            - img
            - text: ${order.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${order.payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
          `);
        });
    
    test('Should show a negative feedback when order is not found', async({page}) => {
    
      const wrongOrderNumber = generateRandomOrderCode();
    
      await page.getByRole('textbox', { name: 'Número do Pedido' }).fill(wrongOrderNumber);
      await page.getByRole('button', { name: 'Buscar Pedido'}).click();
    
    
      // examples of how to get the elements, before learning toMatchSnapshot
    
      // await expect(page.getByRole('heading', { name: 'Pedido não encontrado', level: 3 })).toBeVisible();
      // await expect(page.getByText('Verifique o número do pedido e tente novamente')).toBeVisible();
      // await expect(page.locator('//p[text()="Verifique o número do pedido e tente novamente"]')).toBeVisible();
      // await expect(page.locator('p', { hasText: 'Verifique o número do pedido e tente novamente'})).toBeVisible();
    
      await expect(page.locator('#root')).toMatchAriaSnapshot(`
        - img
        - heading "Pedido não encontrado" [level=3]
        - paragraph: Verifique o número do pedido e tente novamente
        `);
    
    });
});

