module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      {
        presets: ['module:@react-native/babel-preset'],
      },
    ],
  },
  transformIgnorePatterns: [
    'node_modules/(?!((\\.pnpm/)?(react-native|@react-native|react-native-web)@?))',
  ],
  moduleNameMapper: {
    '^@squishui/web/(.*)$': '<rootDir>/../../packages/web/$1',
    '^@squishui/mobile/(.*)$': '<rootDir>/../../packages/mobile/$1',
    '^@/(.*)$': '<rootDir>/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  roots: [
    '<rootDir>',
    '<rootDir>/../../packages/mobile',
  ],
  testMatch: [
    '<rootDir>/../../packages/mobile/**/*.test.tsx',
    '<rootDir>/../../packages/mobile/**/*.test.ts',
  ],
  collectCoverageFrom: [
    '../../packages/mobile/**/*.{ts,tsx}',
    '!../../packages/mobile/**/*.stories.{ts,tsx}',
    '!../../packages/mobile/**/index.{ts,tsx}',
  ],
};
