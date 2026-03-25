module.exports = {
  preset: "react-native",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        presets: ["module:@react-native/babel-preset"],
      },
    ],
  },
  transformIgnorePatterns: [
    "node_modules/(?!((\\.pnpm/)?(react-native|@react-native|react-native-web)@?))",
  ],
  moduleNameMapper: {
    "^@squishui/mobile/(.*)$": "<rootDir>/$1",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  roots: ["<rootDir>"],
  testMatch: ["<rootDir>/**/*.test.tsx", "<rootDir>/**/*.test.ts"],
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/*.stories.{ts,tsx}",
    "!**/index.{ts,tsx}",
  ],
};
