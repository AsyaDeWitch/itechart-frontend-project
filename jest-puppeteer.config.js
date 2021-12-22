module.exports = {
  launch: {
    headless: false,
    slowMo: 30,
    timeout: 30000,
    devtools: true,
  },
  /* server: {
    command: "npm start",
    port: 3000,
    launchTimeout: 20000,
    debug: true,
  },*/
  browser: "chromium",
  browserContext: "default",
};
