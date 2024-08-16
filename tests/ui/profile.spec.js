import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('Create Profile', () => {

test('Create and edit a person in ChurchCRM', async ({ page }) => {

  const loginPage = {
    url: 'https://softaculous.com/demos/churchcrm',
    emailInput: page.getByPlaceholder('Email/Username'),
    passwordInput: page.getByPlaceholder('Password'),
    signInButton: page.getByRole('button', { name: 'Sign In' }),
  };

  const personDetailsPage = {
    addNewPersonButton: page.getByRole('button', { name: 'Add New Person' }),
    genderSelect: page.locator('#Gender'),
    salutationInput: page.getByPlaceholder('Mr., Mrs., Dr., Rev.'),
    firstNameInput: page.getByLabel('First Name:'),
    middleNameInput: page.getByLabel('Middle Name:'),
    lastNameInput: page.getByLabel('Last Name:'),
    suffixInput: page.getByPlaceholder('Jr., Sr., III'),
    birthMonthSelect: page.locator('#BirthMonth'),
    birthDaySelect: page.locator('#BirthDay'),
    birthYearInput: page.getByPlaceholder('yyyy', { exact: true }),
    familyRoleSelect: page.locator('select[name="FamilyRole"]'),
    unassignedFamilyOption: page.getByRole('textbox', { name: 'Unassigned' }),
    createNewFamilyOption: page.getByRole('option', { name: 'Create a new family (using' }),
    homePhoneNumberInput: page.locator('//input[@name="HomePhone"]'),
    cellPhoneNumberInput: page.locator('//input[@name="CellPhone"]'),
    emailInput: page.locator('#Email'),
    saveButton: page.locator('form[name="PersonEditor"] div').filter({ hasText: 'Personal Info Save Gender:' }).getByRole('button'),
    emailInput: page.getByLabel('Email:'),
    classificationSelect: page.locator('#Classification'),
    membershipDateInput: page.locator('input[name="MembershipDate"]'),
    friendDateInput: page.locator('input[name="FriendDate"]'),
    saveAndAddButton: page.getByRole('button', { name: 'Save and Add' }),
    cancelButton: page.getByRole('button', { name: 'Cancel' }),
    personGridCell: page.getByRole('gridcell', { name: 'R3' }),
    signOutLink: page.getByRole('link', { name: 'Sign out' }),
  };

  const personProfilePage = {
    familyTable: page.locator('//*[text()="Family Members"]/ancestor::table/descendant::tbody/tr[1]/td')
  }

  const fakePerson = {
    firstName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    lastName: faker.person.lastName(),
    suffix: faker.person.suffix(),
    gender: faker.person.sex() ? 'Male' : 'Female',
    birthdate: faker.date.past(20),
    phoneNumber: faker.phone.number(),
    email: faker.internet.email(),
    prefix: faker.person.prefix()
  };

  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  await test.step('Navigate to login page', async () => {
    await page.goto(loginPage.url);
  });

  await test.step('Enter login credentials', async () => {
    await loginPage.emailInput.fill('admin');
    await loginPage.passwordInput.fill('password');
  });

  await test.step('Click Sign In button', async () => {
    await loginPage.signInButton.click();
    await expect.soft(page.getByRole('link', { name: 'Church Admin' })).toBeVisible();
  });

  await test.step('Navigate to Add New Person page', async () => {
    await personDetailsPage.addNewPersonButton.click();
  });

  await test.step('Fill in person details', async () => {
    await personDetailsPage.genderSelect.selectOption(fakePerson.gender === 'Male' ? '1' : '2');
    await personDetailsPage.salutationInput.fill(fakePerson.prefix);
    await personDetailsPage.firstNameInput.fill(fakePerson.firstName);
    await personDetailsPage.middleNameInput.fill(fakePerson.middleName);
    await personDetailsPage.lastNameInput.fill(fakePerson.lastName);
    await personDetailsPage.suffixInput.fill(fakePerson.suffix);


    const birthdate = new Date(fakePerson.birthdate);
    const randomMonth = months[birthdate.getMonth()];
    const randomDate = birthdate.getDate();
    const randomYear = birthdate.getFullYear();
    await personDetailsPage.birthMonthSelect.selectOption(randomMonth);
    await personDetailsPage.birthDaySelect.selectOption(`${randomDate}`);
    await personDetailsPage.birthYearInput.fill(`${randomYear}`);
    console.log(birthdate);

    await personDetailsPage.familyRoleSelect.selectOption('2');
    await personDetailsPage.unassignedFamilyOption.click();
    await personDetailsPage.createNewFamilyOption.click();
    await personDetailsPage.homePhoneNumberInput.fill(fakePerson.phoneNumber);
    await personDetailsPage.homePhoneNumberInput.fill(fakePerson.phoneNumber);
    await personDetailsPage.emailInput.fill(fakePerson.email);
  });

  await test.step('Save the person', async () => {
    await personDetailsPage.saveButton.click();
  });


  await test.step('Verify person profile details', async () => {
    const tableData = await personProfilePage.familyTable.allInnerTexts();
    expect.soft(tableData[0].trim()).toBe(`${fakePerson.firstName} ${fakePerson.middleName} ${fakePerson.lastName}`);
    expect.soft(tableData[1].trim()).toBe('Spouse');
    expect.soft(tableData[3].trim()).toBe(fakePerson.email);
  });
});
});
