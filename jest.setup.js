// Add custom jest matchers from jest-dom
import '@testing-library/jest-dom';

// Mock react-native modules that don't work in jest
jest.mock('react-native/src/private/animated/NativeAnimatedHelper');
