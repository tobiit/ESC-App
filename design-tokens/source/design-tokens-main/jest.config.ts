/* eslint-disable @typescript-eslint/naming-convention */
import type { JestConfigWithTsJest } from 'ts-jest/dist/types';

const config: JestConfigWithTsJest = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	// testMatch: ['**/*.spec.ts'],
	testRegex: '(?<!\\.mock)\\.spec\\.ts$', // matches all .spec.ts files except those that end with .mock.spec.ts
	setupFilesAfterEnv: ['<rootDir>/src/shared/testing/general-test-setups.mock.spec.ts'],
	collectCoverage: true,
	coverageDirectory: './build/coverage',
	coverageReporters: ['text', 'html'],
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		},
	},
	moduleFileExtensions: ['ts', 'js', 'json'],
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1',
		'@/(.*)': ['<rootDir>/src/$1'],
	},
	transform: {
		'^.+\\.ts?$': [
			'ts-jest',
			{
				useESM: true,
			},
		],
	},
};

export default config;
