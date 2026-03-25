import "@testing-library/jest-dom";

global.__fbBatchedBridgeConfig = {
  remoteModuleConfig: [],
  localModulesConfig: [],
};

jest.mock("react-native/src/private/animated/NativeAnimatedHelper");
