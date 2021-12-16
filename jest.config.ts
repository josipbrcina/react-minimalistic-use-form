import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  rootDir: '.',
  testMatch: [
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  setupFilesAfterEnv: [
    '<rootDir>/src/__tests__/setupTests.ts',
  ],
  coverageReporters: [
    'json-summary',
    'text',
    'text-summary',
    'lcov',
  ],
  maxWorkers: '50%',
};

export default config;
