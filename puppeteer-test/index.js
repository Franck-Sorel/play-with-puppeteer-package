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
