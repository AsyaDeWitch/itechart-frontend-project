const timeout = 15000;

beforeAll(async () => {
  await page.goto(URL.toString(), { waitUntil: "domcontentloaded" });

  describe("home.tsx", () => {
    test(
      "page title",
      async () => {
        const title = await page.title();
        expect(title).toBe("Testing");
      },
      timeout
    );
  });
});
