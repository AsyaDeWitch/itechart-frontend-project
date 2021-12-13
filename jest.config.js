/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: "./preset",
  testEnvironment: "jsdom",
  verbose: true,
  testMatch: ["**/?(*.)+(spec|test).[t]s"],
  testPathIgnorePatterns: ["/node_modules/", "dist"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
};
