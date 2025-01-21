// import { chromium, firefox, webkit } from "playwright"; // Use import instead of require

import { chromium } from "playwright";
import * as cheerio from "cheerio";

// Function to convert relative time to hours for sorting
function convertTimestampToHours(timestamp) {
  const match = timestamp.match(/(\d+)\s+(hours?|minutes?|seconds?)\s+ago/);
  if (!match) return 0;

  const value = parseInt(match[1], 10);
  const unit = match[2];

  if (unit.startsWith("hour")) return value;
  if (unit.startsWith("minute")) return value / 60;
  if (unit.startsWith("second")) return value / 3600;

  return 0;
}

async function scrapeData() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Navigate to the Hacker News 'newest' page
    await page.goto("https://news.ycombinator.com/newest", {
      timeout: 60000,
    });

    // Load the page's HTML content
    const html = await page.content();
    const $ = cheerio.load(html);

    const data = [];

    // Loop through each row of the table
    $("tr.athing").each((index, element) => {
      // Adjusted selector for title and URL
      const title = $(element).find("span.titleline a").text().trim();
      const url = $(element).find("span.titleline a").attr("href");

      // Extract timestamp and site
      const timestampText = $(element).next().find(".age").text().trim();
      const site = $(element).find(".sitestr").text().trim();

      // Check if the URL is relative
      const fullUrl = url?.startsWith("http")
        ? url
        : `https://news.ycombinator.com/${url}`;

      // Debug logs for each row
      console.log({ title, url, timestampText, site });

      data.push({
        title: title || "No title available",
        timestamp: timestampText || "No timestamp",
        site: site || "No site info",
        url: fullUrl || "No URL available",
      });
    });

    // Sort the data by timestamp
    const sortedData = data.sort((a, b) => {
      const timeA = convertTimestampToHours(a.timestamp);
      const timeB = convertTimestampToHours(b.timestamp);
      return timeB - timeA;
    });

    // Log the sorted data
    console.log(sortedData);
  } catch (error) {
    console.error("Error during scraping:", error);
  } finally {
    await browser.close();
  }
}

scrapeData();
