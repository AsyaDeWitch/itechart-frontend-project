const tsPreset = require("ts-jest/presets/js-with-babel/jest-preset");
const puppeteerPreset = require("jest-puppeteer/jest-preset");

module.exports = Object.assign(tsPreset, puppeteerPreset);
