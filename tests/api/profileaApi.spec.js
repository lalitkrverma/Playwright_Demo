import { test, expect } from '@playwright/test';
import exp from 'constants';

test.describe('Login Test', () => {

 test('Verify Profile Creation with API request', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    let baseUrl;

    const loginPage = {
      url: 'https://softaculous.com/demos/churchcrm',
      emailInput: page.getByPlaceholder('Email/Username'),
      passwordInput: page.getByPlaceholder('Password'),
      signInButton: page.getByRole('button', { name: 'Sign In' }),
    };

    const personDetails = {
      PersonSubmit: 'Save',
      Gender: '1',
      Title: 'Ms.',
      FirstName: 'Estella',
      MiddleName: 'August',
      LastName: 'Weissnat',
      Suffix: 'DVM',
      BirthMonth: '04',
      BirthDay: '02',
      BirthYear: '2005',
      FamilyRole: '2',
      Family: '-1',
      Address1: '',
      Address2: '',
      City: '',
      State: '',
      StateTextbox: '',
      Zip: '',
      Country: '',
      HomePhone: '(550) 392-6744',
      WorkPhone: '',
      CellPhone: '',
      Email: 'Wyatt25@gmail.com',
      WorkEmail: '',
      Facebook: '',
      Twitter: '',
      LinkedIn: '',
      Classification: '0',
      MembershipDate: '',
      FriendDate: '2024-08-16',
    };

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
      const currentURL = await page.url();
      const url = new URL(currentURL);
      const pathname = url.pathname.split('/').slice(0, 2).join('/');
      baseUrl = `${url.origin}${pathname}`
      console.log(baseUrl);
      await page.waitForTimeout(3000);
    });

    await test.step('Create a person profile with  api request', async () => {
      const response = await page.request.post(`${baseUrl}/PersonEditor.php?PersonID=0`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: personDetails
      });
      expect.soft(await response.status()).toBe(200);
    });

    await test.step('Verify the profile is created with api request', async () => {
      const response = await page.request.get(`${baseUrl}/v2/people`, {
        headers: {
          'Content-Type': 'text/html; charset=UTF-8',
        }
      });
      expect.soft(await response.status()).toBe(200);
      const responseHtml = await response.text();
      expect.soft(responseHtml).toContain(personDetails.FirstName);
      expect.soft(responseHtml).toContain(personDetails.LastName);
    });

    await context.close();
  });
});
