import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  roots: [
    '<rootDir>/src',
  ],
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
};

export default config;
