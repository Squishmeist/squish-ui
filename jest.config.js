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
    'node_modules/(?!(react-native|@react-native|react-native-web)/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: [
    '**/components/mobile/**/*.test.{ts,tsx}',
  ],
  collectCoverageFrom: [
    'components/mobile/**/*.{ts,tsx}',
    '!components/mobile/**/*.stories.{ts,tsx}',
    '!components/mobile/**/index.{ts,tsx}',
  ],
};
