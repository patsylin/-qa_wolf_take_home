// @ts-check
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

// Load environment variables from a `.env` file
dotenv.config();

// Shared settings for all projects
const sharedSettings = {
  baseURL: "http://localhost:3000",
  trace: "on-first-retry",
};
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  projects: [
    {
      name: "chromium",
      use: {
        baseURL: "http://localhost:3000",
        trace: "on-first-retry",
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "firefox",
      use: {
        baseURL: "http://localhost:3000",
        trace: "on-first-retry",
        ...devices["Desktop Firefox"],
      },
    },
    {
      name: "webkit",
      use: {
        baseURL: "http://localhost:3000",
        trace: "on-first-retry",
        ...devices["Desktop Safari"],
      },
    },
    {
      name: "Mobile Chrome",
      use: {
        baseURL: "http://localhost:3000",
        trace: "on-first-retry",
        ...devices["Pixel 5"],
      },
    },
    {
      name: "Mobile Safari",
      use: {
        baseURL: "http://localhost:3000",
        trace: "on-first-retry",
        ...devices["iPhone 12"],
      },
    },
    {
      name: "Microsoft Edge",
      use: {
        baseURL: "http://localhost:3000",
        trace: "on-first-retry",
        ...devices["Desktop Edge"],
        channel: "msedge",
      },
    },
    {
      name: "Google Chrome",
      use: {
        baseURL: "http://localhost:3000",
        trace: "on-first-retry",
        ...devices["Desktop Chrome"],
        channel: "chrome",
      },
    },
  ],

  webServer: {
    command: "npm start",
    port: 4000,
    timeout: 300000,
    reuseExistingServer: !process.env.CI,
  },
});
