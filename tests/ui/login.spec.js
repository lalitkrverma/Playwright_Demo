import { test, expect } from '@playwright/test';

test.describe('Login Test', () => {

  test('Verify Successful Login Functionality', async ({ page }) => {

    const loginPage = {
      url: 'https://softaculous.com/demos/churchcrm',
      emailInput: page.getByPlaceholder('Email/Username'),
      passwordInput: page.getByPlaceholder('Password'),
      signInButton: page.getByRole('button', { name: 'Sign In' }),
    };;

    await test.step('Navigate to login page', async () => {
      await page.goto(loginPage.url);
    });

    await test.step('Enter login credentials', async () => {
      await loginPage.emailInput.fill('admin', {timeout: 70000});
      await loginPage.passwordInput.fill('password');
    });

    await test.step('Click Sign In button', async () => {
      await loginPage.signInButton.click();
      await expect.soft(page.getByRole('link', { name: 'Church Admin' })).toBeVisible();
    });
  });

  test('Verify Login Negative Scenario', async ({ page }) => {

    const errorMessage = page.getByRole('heading', { name: 'Slim Application Error' });

    const loginPage = {
      url: 'https://softaculous.com/demos/churchcrm',
      emailInput: page.getByPlaceholder('Email/Username'),
      passwordInput: page.getByPlaceholder('Password'),
      signInButton: page.getByRole('button', { name: 'Sign In' }),
    };;

    await test.step('Navigate to login page', async () => {
      await page.goto(loginPage.url);
    });

    await test.step('Enter login credentials with wrong password', async () => {
      await loginPage.emailInput.fill('admin', {timeout: 70000});
      await loginPage.passwordInput.fill('password2');
    });

    await test.step('Click Sign In button and verify error message', async () => {
      await loginPage.signInButton.click();
      await expect.soft(errorMessage).toBeVisible();
    });
  });
});
