/** @type {import("jest").Config} */
const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        tsconfig: "<rootDir>/tsconfig.jest.json",
      },
    ],
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/src/__mocks__/fileMock.ts",
    "^.+\\.(svg|png|jpg|jpeg|gif|webp)$": "<rootDir>/src/__mocks__/fileMock.ts",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["**/?(*.)+(test).[tj]s?(x)"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coverageReporters: ["text"],
};

module.exports = config;
