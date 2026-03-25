// Add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

global.__fbBatchedBridgeConfig = {
  remoteModuleConfig: [],
  localModulesConfig: [],
};

// Mock react-native modules that don't work in jest
jest.mock('react-native/src/private/animated/NativeAnimatedHelper');
jest.mock(
  'react-native/Libraries/TurboModule/TurboModuleRegistry',
  () => ({
    get: jest.fn(() => ({})),
    getEnforcing: jest.fn((name) => {
      if (name === 'PlatformConstants') {
        return {
          forceTouchAvailable: false,
          isTesting: true,
          osVersion: 'test',
          reactNativeVersion: { major: 0, minor: 84, patch: 1 },
          systemName: 'iOS',
        };
      }
      return {};
    }),
  }),
);
