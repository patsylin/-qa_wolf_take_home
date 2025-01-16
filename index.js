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
