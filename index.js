// import { chromium, firefox, webkit } from "playwright"; // Use import instead of require

// (async () => {
//   // Test Chromium (Desktop Chrome)
//   console.log("Testing Chromium (Desktop Chrome)...");
//   const chromiumBrowser = await chromium.launch({ headless: true });
//   const chromiumPage = await chromiumBrowser.newPage();
//   await chromiumPage.goto("https://news.ycombinator.com/newest");
//   const chromiumArticles = await chromiumPage.$$eval(
//     ".titleline a",
//     (articles) => articles.map((article) => article.textContent)
//   );
//   console.log("Chromium articles:", chromiumArticles.slice(0, 100)); // Display the first 100 articles
//   await chromiumBrowser.close();

//   // Test Firefox (Desktop Firefox)
//   console.log("Testing Firefox (Desktop Firefox)...");
//   const firefoxBrowser = await firefox.launch({ headless: true });
//   const firefoxPage = await firefoxBrowser.newPage();
//   await firefoxPage.goto("https://news.ycombinator.com/newest");
//   const firefoxArticles = await firefoxPage.$$eval(".titleline a", (articles) =>
//     articles.map((article) => article.textContent)
//   );
//   console.log("Firefox articles:", firefoxArticles.slice(0, 100)); // Display the first 100 articles
//   await firefoxBrowser.close();

//   // Test WebKit (Desktop Safari)
//   console.log("Testing WebKit (Desktop Safari)...");
//   const webkitBrowser = await webkit.launch({ headless: true });
//   const webkitPage = await webkitBrowser.newPage();
//   await webkitPage.goto("https://news.ycombinator.com/newest");
//   const webkitArticles = await webkitPage.$$eval(".titleline a", (articles) =>
//     articles.map((article) => article.textContent)
//   );
//   console.log("WebKit articles:", webkitArticles.slice(0, 100)); // Display the first 100 articles
//   await webkitBrowser.close();
// })()
// import { chromium, firefox, webkit } from "playwright";

// (async () => {
//   // Helper function to extract articles
//   async function getArticles(page) {
//     await page.waitForSelector(".athing"); // Wait for articles to appear
//     return page.$$eval(".athing .titleline a", (articles) => {
//       return articles.map((article) => article.textContent).filter(Boolean); // Get text content of articles
//     });
//   }

//   // Test Chromium (Desktop Chrome)
//   console.log("Testing Chromium (Desktop Chrome)...");
//   const chromiumBrowser = await chromium.launch({ headless: true });
//   const chromiumPage = await chromiumBrowser.newPage();
//   await chromiumPage.goto("https://news.ycombinator.com/newest");

//   // Get articles from Chromium
//   const chromiumArticles = await getArticles(chromiumPage);
//   console.log("Chromium articles:", chromiumArticles.slice(0, 100)); // Display the first 100 articles
//   await chromiumBrowser.close();

//   // Test Firefox (Desktop Firefox)
//   console.log("Testing Firefox (Desktop Firefox)...");
//   const firefoxBrowser = await firefox.launch({ headless: true });
//   const firefoxPage = await firefoxBrowser.newPage();
//   await firefoxPage.goto("https://news.ycombinator.com/newest");

//   // Get articles from Firefox
//   const firefoxArticles = await getArticles(firefoxPage);
//   console.log("Firefox articles:", firefoxArticles.slice(0, 100)); // Display the first 100 articles
//   await firefoxBrowser.close();

//   // Test WebKit (Desktop Safari)
//   console.log("Testing WebKit (Desktop Safari)...");
//   const webkitBrowser = await webkit.launch({ headless: true });
//   const webkitPage = await webkitBrowser.newPage();
//   await webkitPage.goto("https://news.ycombinator.com/newest");

//   // Get articles from WebKit
//   const webkitArticles = await getArticles(webkitPage);
//   console.log("WebKit articles:", webkitArticles.slice(0, 100)); // Display the first 100 articles
//   await webkitBrowser.close();
// // }
// import { chromium } from "playwright";
// import * as cheerio from "cheerio";

// // Function to convert relative time to hours for sorting
// function convertTimestampToHours(timestamp) {
//   const match = timestamp.match(/(\d+)\s+(hours?|minutes?|seconds?)\s+ago/);
//   if (!match) return 0; // Default to 0 if no match

//   const value = parseInt(match[1], 10);
//   const unit = match[2];

//   // Convert all units to hours for comparison
//   if (unit === "hour" || unit === "hours") return value;
//   if (unit === "minute" || unit === "minutes") return value / 60;
//   if (unit === "second" || unit === "seconds") return value / 3600;

//   return 0; // Default fallback
// }

// async function scrapeData() {
//   const browser = await chromium.launch();
//   const page = await browser.newPage();

//   // Navigate to the HN front page
//   await page.goto("https://news.ycombinator.com/");

//   // Get the HTML content of the page
//   const html = await page.content();
//   const $ = cheerio.load(html);

//   const data = [];

//   // Loop through each item
//   $("tr.athing").each((index, element) => {
//     const title = $(element).find(".storylink").text();
//     const timestampText = $(element).next().find(".age").text();
//     const rank = $(element).find(".rank").text().trim();
//     const site = $(element).find(".sitestr").text();

//     // Extract the URL from the "a" tag within the ".storylink" class
//     const url = $(element).find(".storylink").attr("href");

//     // Store the scraped information in an object
//     data.push({
//       title,
//       timestamp: timestampText || null,
//       rank,
//       site: site || null,
//       html: $.html(element), // Include the HTML for each element
//       url: url ? `https://news.ycombinator.com/${url}` : null, // Ensure a full URL
//     });
//   });

//   // Sort the data array by timestamp from newest to oldest
//   const sortedData = data.sort((a, b) => {
//     const timeA = convertTimestampToHours(a.timestamp);
//     const timeB = convertTimestampToHours(b.timestamp);
//     return timeB - timeA; // For descending order
//   });

//   // Log the sorted data
//   console.log(sortedData);

//   await browser.close();
// }

// // // scrapeData();

// import { chromium } from "playwright";
// import * as cheerio from "cheerio";

// // Function to convert relative time to hours for sorting
// function convertTimestampToHours(timestamp) {
//   const match = timestamp.match(/(\d+)\s+(hours?|minutes?|seconds?)\s+ago/);
//   if (!match) return 0; // Default to 0 if no match

//   const value = parseInt(match[1], 10);
//   const unit = match[2];

//   // Convert all units to hours for comparison
//   if (unit === "hour" || unit === "hours") return value;
//   if (unit === "minute" || unit === "minutes") return value / 60;
//   if (unit === "second" || unit === "seconds") return value / 3600;

//   return 0; // Default fallback
// }

// // Function to extract titles
// function extractTitles(data) {
//   return data.map((item) => item.title);
// }

// async function scrapeData() {
//   const browser = await chromium.launch();
//   const page = await browser.newPage();

//   // Navigate to the HN front page
//   await page.goto("https://news.ycombinator.com/newest");

//   // Get the HTML content of the page
//   const html = await page.content();
//   const $ = cheerio.load(html);

//   const data = [];

//   // Loop through each item
//   $("tr.athing").each((index, element) => {
//     const title = $(element).find(".storylink").text();
//     const timestampText = $(element).next().find(".age").text();
//     const rank = $(element).find(".rank").text().trim();
//     const site = $(element).find(".sitestr").text();

//     // Extract the URL from the "a" tag within the ".storylink" class
//     const url = $(element).find(".storylink").attr("href");

//     // Store the scraped information in an object
//     data.push({
//       title,
//       timestamp: timestampText || null,
//       rank,
//       site: site || null,
//       html: $.html(element), // Include the HTML for each element
//       url: url ? `https://news.ycombinator.com/${url}` : null, // Ensure a full URL
//     });
//   });

//   // Sort the data array by timestamp from newest to oldest
//   const sortedData = data.sort((a, b) => {
//     const timeA = convertTimestampToHours(a.timestamp);
//     const timeB = convertTimestampToHours(b.timestamp);
//     return timeB - timeA; // For descending order
//   });

//   // Extract titles from the sorted data
//   const titles = extractTitles(sortedData);

//   // Log the sorted data and titles
//   console.log("Sorted Data:", sortedData);
//   console.log("Extracted Titles:", titles);

//   await browser.close();
// }

// scrapeData();

// import { chromium } from "playwright";
// import * as cheerio from "cheerio";

// // Function to convert relative time to hours for sorting
// function convertTimestampToHours(timestamp) {
//   const match = timestamp.match(/(\d+)\s+(hours?|minutes?|seconds?)\s+ago/);
//   if (!match) return 0; // Default to 0 if no match

//   const value = parseInt(match[1], 10);
//   const unit = match[2];

//   // Convert all units to hours for comparison
//   if (unit === "hour" || unit === "hours") return value;
//   if (unit === "minute" || unit === "minutes") return value / 60;
//   if (unit === "second" || unit === "seconds") return value / 3600;

//   return 0; // Default fallback
// }

// async function scrapeData() {
//   const browser = await chromium.launch();
//   const page = await browser.newPage();

//   try {
//     // Step 1: Navigate to the Hacker News 'newest' page and wait for the page to load
//     await page.goto("https://news.ycombinator.com/newest", {
//       timeout: 60000,
//     });

//     // Get the HTML content of the page after it's loaded
//     const html = await page.content();
//     const $ = cheerio.load(html);

//     const data = [];

//     // Step 2: Loop through each item and scrape the data
//     $("tr.athing").each((index, element) => {
//       const title = $(element).find(".storylink").text();
//       const timestampText = $(element).next().find(".age").text();
//       const site = $(element).find(".sitestr").text();

//       // Extract the URL from the "a" tag within the ".storylink" class
//       const url = $(element).find(".storylink").attr("href");

//       // Store the scraped information in an object
//       data.push({
//         title,
//         timestamp: timestampText || null,
//         site: site || null,
//         url: url ? `https://news.ycombinator.com/${url}` : null, // Ensure a full URL
//       });
//     });

//     // Step 3: Sort the data array by timestamp from newest to oldest
//     const sortedData = data.sort((a, b) => {
//       const timeA = convertTimestampToHours(a.timestamp);
//       const timeB = convertTimestampToHours(b.timestamp);
//       return timeB - timeA; // For descending order
//     });

//     // Log the sorted data
//     console.log(sortedData);
//   } catch (error) {
//     console.error("Error during scraping:", error);
//   } finally {
//     // Ensure the browser is closed, even if there's an error
//     await browser.close();
//   }
// }

// scrapeData();

import { chromium } from "playwright";
import * as cheerio from "cheerio";

// Function to convert relative time to hours for sorting
function convertTimestampToHours(timestamp) {
  const match = timestamp.match(/(\d+)\s+(hours?|minutes?|seconds?)\s+ago/);
  if (!match) return 0; // Default to 0 if no match

  const value = parseInt(match[1], 10);
  const unit = match[2];

  // Convert all units to hours for comparison
  if (unit === "hour" || unit === "hours") return value;
  if (unit === "minute" || unit === "minutes") return value / 60;
  if (unit === "second" || unit === "seconds") return value / 3600;

  return 0; // Default fallback
}

async function scrapeData() {
  const browser = await chromium.launch(); // Await browser launch
  const page = await browser.newPage(); // Await new page creation

  try {
    // Step 1: Navigate to the Hacker News 'newest' page and wait for the page to load
    await page.goto("https://news.ycombinator.com/newest", {
      timeout: 60000,
    });

    // Get the HTML content of the page after it's loaded
    const html = await page.content(); // Await page content retrieval
    const $ = cheerio.load(html);

    const data = [];

    // Step 2: Loop through each item and scrape the data
    $("tr.athing").each((index, element) => {
      const title = $(element).find(".storylink").text();
      const timestampText = $(element).next().find(".age").text();
      const site = $(element).find(".sitestr").text();

      // Extract the URL from the "a" tag within the ".storylink" class
      const url = $(element).find(".storylink").attr("href");

      // Store the scraped information in an object
      data.push({
        title,
        timestamp: timestampText || null,
        site: site || null,
        url: url ? `https://news.ycombinator.com/${url}` : null, // Ensure a full URL
      });
    });

    // Step 3: Sort the data array by timestamp from newest to oldest
    const sortedData = data.sort((a, b) => {
      const timeA = convertTimestampToHours(a.timestamp);
      const timeB = convertTimestampToHours(b.timestamp);
      return timeB - timeA; // For descending order
    });

    // Log the sorted data
    console.log(sortedData);
  } catch (error) {
    console.error("Error during scraping:", error);
  } finally {
    // Ensure the browser is closed, even if there's an error
    await browser.close(); // Await browser close
  }
}

scrapeData();
