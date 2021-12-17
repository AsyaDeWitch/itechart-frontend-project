/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: "./preset",
  testEnvironment: "jsdom",
  verbose: true,
  globals: { URL: "http://localhost:3000" },
  testMatch: ["**/?(*.)+(spec|test).[t]s[x]"],
  testPathIgnorePatterns: ["/node_modules/", "dist"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/fileTransformer.js",
  },
  moduleNameMapper: {
    "\\.(scss)$": "identity-obj-proxy",
  },
  moduleDirectories: ["node_modules", "src"],

  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node", "css", "scss"],
};
