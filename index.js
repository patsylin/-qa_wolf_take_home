// // EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
// const { chromium } = require("playwright");

// async function sortHackerNewsArticles() {
//   // launch browser
//   const browser = await chromium.launch({ headless: false });
//   const context = await browser.newContext();
//   const page = await context.newPage();

//   // go to Hacker News
//   await page.goto("https://news.ycombinator.com/newest");
// }

// (async () => {
//   await sortHackerNewsArticles();
// })();

// import { chromium } from "playwright";

// (async () => {
//   const browser = await chromium.launch(); // Launch browser
//   const page = await browser.newPage(); // Open new page

//   // Navigate to Hacker News' "newest" section
//   await page.goto("https://news.ycombinator.com/newest");

//   // Wait for the articles to load
//   await page.waitForSelector(".itemlist .athing");

//   // Get the first 100 articles
//   const articles = await page.$$eval(".itemlist .athing", (rows) => {
//     return rows.slice(0, 100).map((row) => {
//       const title = row.querySelector(".title .storylink").textContent;
//       const time = row.querySelector(".age").textContent; // Age is used to determine time
//       return { title, time };
//     });
//   });

//   // Now, let's check if the articles are sorted from newest to oldest
//   const sortedCorrectly = articles.every((article, index, arr) => {
//     if (index === 0) return true;
//     return new Date(arr[index - 1].time) >= new Date(article.time);
//   });

//   if (sortedCorrectly) {
//     console.log("The articles are correctly sorted from newest to oldest.");
//   } else {
//     console.log("The articles are NOT correctly sorted.");
//   }

//   await browser.close(); // Close browser
// })();
// import { chromium, firefox, webkit } from "playwright"; // Use import instead of require

// (async () => {
//   // Test Chromium (Desktop Chrome)
//   console.log("Testing Chromium (Desktop Chrome)...");
//   const chromiumBrowser = await chromium.launch({ headless: true });
//   const chromiumPage = await chromiumBrowser.newPage();
//   await chromiumPage.goto("https://news.ycombinator.com/newest");
//   const chromiumArticles = await chromiumPage.$$eval(".storylink", (articles) =>
//     articles.map((article) => article.textContent)
//   );
//   console.log("Chromium articles:", chromiumArticles.slice(0, 100)); // Display the first 100 articles
//   await chromiumBrowser.close();

// // Test Firefox (Desktop Firefox)
// console.log("Testing Firefox (Desktop Firefox)...");
// const firefoxBrowser = await firefox.launch({ headless: true });
// const firefoxPage = await firefoxBrowser.newPage();
// await firefoxPage.goto("https://news.ycombinator.com/newest");
// const firefoxArticles = await firefoxPage.$$eval(".storylink", (articles) =>
//   articles.map((article) => article.textContent)
// );
// console.log("Firefox articles:", firefoxArticles.slice(0, 100)); // Display the first 100 articles
// await firefoxBrowser.close();

// // Test WebKit (Desktop Safari)
// console.log("Testing WebKit (Desktop Safari)...");
// const webkitBrowser = await webkit.launch({ headless: true });
// const webkitPage = await webkitBrowser.newPage();
// await webkitPage.goto("https://news.ycombinator.com/newest");
// const webkitArticles = await webkitPage.$$eval(".storylink", (articles) =>
//   articles.map((article) => article.textContent)
// );
// console.log("WebKit articles:", webkitArticles.slice(0, 100)); // Display the first 100 articles
// await webkitBrowser.close();
//})();

import { chromium, firefox, webkit } from "playwright"; // Use import instead of require

(async () => {
  // Test Chromium (Desktop Chrome)
  console.log("Testing Chromium (Desktop Chrome)...");
  const chromiumBrowser = await chromium.launch({ headless: true });
  const chromiumPage = await chromiumBrowser.newPage();
  await chromiumPage.goto("https://news.ycombinator.com/newest");
  const chromiumArticles = await chromiumPage.$$eval(
    ".titleline a",
    (articles) => articles.map((article) => article.textContent)
  );
  console.log("Chromium articles:", chromiumArticles.slice(0, 100)); // Display the first 100 articles
  await chromiumBrowser.close();

  // Test Firefox (Desktop Firefox)
  console.log("Testing Firefox (Desktop Firefox)...");
  const firefoxBrowser = await firefox.launch({ headless: true });
  const firefoxPage = await firefoxBrowser.newPage();
  await firefoxPage.goto("https://news.ycombinator.com/newest");
  const firefoxArticles = await firefoxPage.$$eval(".titleline a", (articles) =>
    articles.map((article) => article.textContent)
  );
  console.log("Firefox articles:", firefoxArticles.slice(0, 100)); // Display the first 100 articles
  await firefoxBrowser.close();

  // Test WebKit (Desktop Safari)
  console.log("Testing WebKit (Desktop Safari)...");
  const webkitBrowser = await webkit.launch({ headless: true });
  const webkitPage = await webkitBrowser.newPage();
  await webkitPage.goto("https://news.ycombinator.com/newest");
  const webkitArticles = await webkitPage.$$eval(".titleline a", (articles) =>
    articles.map((article) => article.textContent)
  );
  console.log("WebKit articles:", webkitArticles.slice(0, 100)); // Display the first 100 articles
  await webkitBrowser.close();
})();
