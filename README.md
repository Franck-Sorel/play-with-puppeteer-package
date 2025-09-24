# play-with-puppeteer-package

## What is Puppeteer?

Puppeteer is a Node.js library that provides a high-level API to control Chrome or Chromium over the DevTools Protocol. It allows you to automate browser tasks such as:

*   Generating screenshots and PDFs of pages.
*   Crawling a SPA (Single-Page Application) and generating pre-rendered content (i.e., "SSR" (Server-Side Rendering)).
*   Automating form submission, UI testing, keyboard input, etc.
*   Creating an automated testing environment.
*   Capturing a timeline trace of your site to help diagnose performance issues.

## How to Use Puppeteer

### Installation

First, you need to install Puppeteer in your project:

```bash
npm i puppeteer
# or "yarn add puppeteer"
```

### Basic Example

Here's a simple example demonstrating how to launch a browser, navigate to a page, and take a screenshot.

[`puppeteer-test/index.js`](puppeteer-test/index.js):
```javascript
const puppeteer = require('puppeteer');

(async () => {
  // Launch a headless browser instance
  const browser = await puppeteer.launch();

  // Open a new page
  const page = await browser.newPage();

  // Navigate to a URL
  await page.goto('https://example.com');

  // Take a screenshot and save it
  await page.screenshot({ path: 'example.png' });

  // Close the browser
  await browser.close();

  console.log('Screenshot taken and browser closed.');
})();
```

### Advanced Example: Interacting with a Page and User Data

This example shows how to launch a non-headless browser, interact with a page, and persist user data. This is useful for debugging or maintaining session information.

[`puppeteer-test/index.js`](puppeteer-test/index.js):
```javascript
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // Set to true for headless mode
    userDataDir: './my-user-data', // Persist user data (cookies, local storage, etc.)
  });
  const page = await browser.newPage();

  // Event listener for requests (optional)
  page.on('request', request => {
    console.log('Request URL:', request.url());
    // console.log('Request Headers:', request.headers()); // Uncomment to see headers
  });

  await page.goto('https://www.google.com'); // Navigate to Google

  // Type something into the search bar
  await page.type('textarea[name="q"]', 'Puppeteer GitHub');

  // Press Enter to search
  await page.keyboard.press('Enter');

  // Wait for navigation to complete
  await page.waitForNavigation();

  // Take a screenshot of the search results
  await page.screenshot({ path: 'google_search_results.png' });

  console.log('Browser is open. You can interact manually now, or the script will close it after a delay.');

  // Keep the browser open for a few seconds for manual interaction
  await new Promise(resolve => setTimeout(resolve, 5000));

  await browser.close();
  console.log('Browser closed.');
})();
```

To run this example, save it as [`puppeteer-test/index.js`](puppeteer-test/index.js) and execute it with Node.js:

```bash
node puppeteer-test/index.js# play-with-puppeteer-package
