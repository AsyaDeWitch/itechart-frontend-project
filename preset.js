/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/no-extraneous-dependencies
const tsPreset = require("ts-jest/presets/js-with-babel/jest-preset");
const puppeteerPreset = require("jest-puppeteer/jest-preset");

module.exports = Object.assign(tsPreset, puppeteerPreset);
