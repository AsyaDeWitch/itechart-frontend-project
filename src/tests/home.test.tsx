import puppeteer from "puppeteer";

const url = "http://localhost:8080";
let browser: puppeteer.Browser;
let page: puppeteer.Page;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });
});

afterAll(() => {
  browser.close();
});

describe("Home page e2e test", () => {
  test("Search bar should be loaded", async () => {
    await page.waitForSelector(".searchBar");
  });

  test("Categories cards should be loaded", async () => {
    await page.waitForSelector(".category__cards-container");
    const title = await page.$eval(".home__chapter", (e) => e.innerHTML);
    const linkCards = await page.$$(".category-card");

    expect(title).toContain("Categories");
    expect(linkCards.length).toBe(3);
  });

  test("New games cards should be loaded", async () => {
    await page.waitForSelector(".game__cards-container");

    const titles = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".home__chapter"), (element) => element.textContent)
    );
    const cards = await page.$$(".game-card");

    expect(titles[1]).toContain("New games");
    expect(cards.length).toBe(3);
  });
});
