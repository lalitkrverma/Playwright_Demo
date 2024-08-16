# Playwright Test Automation Project

This is a test automation project using Playwright. The project is structured into API and UI tests for different features.

## Project Structure

The tests are organized into the following directories:

tests/
│
├── api/
│ └── createProfileApi.spec.js
│
└── ui/
├── login.spec.js
└── profile.spec.js

- **API Tests:** API-related test cases are located in the `tests/api/` folder.
- **UI Tests:** UI-related test cases are located in the `tests/ui/` folder.

## Prerequisites

- Node.js (>= 12.x)

## Installation

1. Clone the repository:
   git clone <repository_url>
   cd <project_directory>

2. Install dependencies:
   npm ci

3. Install Playwright browsers:
   npx playwright install

## Running Tests

You can run tests either in parallel or sequentially. Below are the commands to achieve both.

1. Run All Tests in Parallel
   npx playwright test --workers 2
   npx playwright test --workers 2 --headed (To view the browser)

2. Run Tests Sequentially (Recommended as ChurchCRM has limit to demo instances per minute)
   npx playwright test --workers=1 --headed

3. Running Specific Tests
   npx playwright test tests/ui/login.spec.js

4. Running tests for a specific project:
   npx playwright test --project chromium
   npx playwright test --project Mobile --headed (To view the browser)

## Report

To view the report following command can be used:
npx playwright show-report
