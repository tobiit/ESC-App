import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { File } from 'style-dictionary';
import { excludedTokensFilterName } from '../../../hooks/index.js';
import { jsonToolsOutputFileConfig, jsonWebOutputFileConfig } from './json-output-file-config.js';
import {
	createDifferentPathJsonToolsConfigScenario,
	createDifferentPathJsonWebConfigScenario,
	createEmptyPathJsonToolsConfigScenario,
	createEmptyPathJsonWebConfigScenario,
	createNullInputJsonToolsScenario,
	createNullInputJsonWebScenario,
	createSpacesInPathJsonWebConfigScenario,
	createSpecialCharsInPathJsonWebConfigScenario,
	createStandardJsonToolsConfigScenario,
	createStandardJsonWebConfigScenario,
	createUndefinedInputJsonToolsScenario,
	createUndefinedInputJsonWebScenario,
	mockMockedExcludedTokensFilterName,
	mockMockedJsonFormat,
} from './json-output-file-config.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock the hooks dependency
jest.mock('../../../hooks/index.js', () => {
	return {
		excludedTokensFilterName: 'mocked-filter-name',
	};
});

// Mock style-dictionary/enums to avoid ES module issues
jest.mock('style-dictionary/enums', () => {
	return {
		formats: {
			json: 'json',
		},
	};
});

// Cast mocked function with proper typing
const mockExcludedTokensFilterName = excludedTokensFilterName as string;

describe('JSON Output File Config', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('jsonWebOutputFileConfig', () => {
		describe('successful config generation', () => {
			it('should generate JSON output file config with standard file path', () => {
				const scenario = createStandardJsonWebConfigScenario();

				const result = jsonWebOutputFileConfig(scenario.input);

				expect(result).toBeInstanceOf(Array);
				expect(result).toHaveLength(1);
				expect(result[0]).toEqual({
					destination: `${scenario.input}.json`,
					format: mockMockedJsonFormat,
					filter: mockExcludedTokensFilterName,
				});
			});

			it('should generate JSON output file config with different file path', () => {
				const scenario = createDifferentPathJsonWebConfigScenario();

				const result = jsonWebOutputFileConfig(scenario.input);

				expect(result).toBeInstanceOf(Array);
				expect(result).toHaveLength(1);
				expect(result[0]).toEqual({
					destination: `${scenario.input}.json`,
					format: mockMockedJsonFormat,
					filter: mockExcludedTokensFilterName,
				});
			});

			it('should handle empty string input gracefully', () => {
				const scenario = createEmptyPathJsonWebConfigScenario();

				const result = jsonWebOutputFileConfig(scenario.input);

				expect(result).toBeInstanceOf(Array);
				expect(result).toHaveLength(1);
				expect(result[0]).toEqual({
					destination: '.json',
					format: mockMockedJsonFormat,
					filter: mockExcludedTokensFilterName,
				});
			});

			it('should handle file paths with spaces', () => {
				const scenario = createSpacesInPathJsonWebConfigScenario();

				const result = jsonWebOutputFileConfig(scenario.input);

				expect(result).toBeInstanceOf(Array);
				expect(result).toHaveLength(1);
				expect(result[0]).toEqual({
					destination: `${scenario.input}.json`,
					format: mockMockedJsonFormat,
					filter: mockExcludedTokensFilterName,
				});
			});

			it('should handle file paths with special characters', () => {
				const scenario = createSpecialCharsInPathJsonWebConfigScenario();

				const result = jsonWebOutputFileConfig(scenario.input);

				expect(result).toBeInstanceOf(Array);
				expect(result).toHaveLength(1);
				expect(result[0]).toEqual({
					destination: `${scenario.input}.json`,
					format: mockMockedJsonFormat,
					filter: mockExcludedTokensFilterName,
				});
			});
		});

		describe('return value structure validation', () => {
			it('should return array of File objects with correct properties', () => {
				const testPath = '/test/path';
				const result = jsonWebOutputFileConfig(testPath);

				expect(Array.isArray(result)).toBe(true);
				expect(result).toHaveLength(1);

				const file = result[0] as File;
				expect(file).toHaveProperty('destination');
				expect(file).toHaveProperty('format');
				expect(file).toHaveProperty('filter');

				expect(typeof file.destination).toBe('string');
				expect(typeof file.format).toBe('string');
				expect(typeof file.filter).toBe('string');
			});

			it('should use correct JSON format from style-dictionary', () => {
				const testPath = '/test/path';
				const result = jsonWebOutputFileConfig(testPath);

				expect(result[0].format).toBe(mockMockedJsonFormat);
			});

			it('should use the correct filter from hooks', () => {
				const testPath = '/test/path';
				const result = jsonWebOutputFileConfig(testPath);

				expect(result[0].filter).toBe(mockMockedExcludedTokensFilterName);
			});

			it('should append .json extension to destination', () => {
				const testPath = '/test/output/tokens-theme';
				const result = jsonWebOutputFileConfig(testPath);

				expect(result[0].destination).toBe(`${testPath}.json`);
				expect(result[0].destination?.endsWith('.json')).toBe(true);
			});
		});

		describe('edge cases and error scenarios', () => {
			it('should handle null input by creating "null.json" destination', () => {
				const scenario = createNullInputJsonWebScenario();

				const result = jsonWebOutputFileConfig(scenario.input);

				expect(result).toBeInstanceOf(Array);
				expect(result).toHaveLength(1);
				expect(result[0].destination).toBe('null.json');
				expect(result[0].format).toBe(mockMockedJsonFormat);
				expect(result[0].filter).toBe(mockExcludedTokensFilterName);
			});

			it('should handle undefined input by creating "undefined.json" destination', () => {
				const scenario = createUndefinedInputJsonWebScenario();

				const result = jsonWebOutputFileConfig(scenario.input);

				expect(result).toBeInstanceOf(Array);
				expect(result).toHaveLength(1);
				expect(result[0].destination).toBe('undefined.json');
				expect(result[0].format).toBe(mockMockedJsonFormat);
				expect(result[0].filter).toBe(mockExcludedTokensFilterName);
			});

			it('should handle very long file paths', () => {
				const longPath = '/very/'.repeat(100) + 'long/path/to/tokens';
				const result = jsonWebOutputFileConfig(longPath);

				expect(result).toBeInstanceOf(Array);
				expect(result).toHaveLength(1);
				expect(result[0].destination).toBe(`${longPath}.json`);
			});

			it('should handle paths with unicode characters', () => {
				const unicodePath = '/path/with/ünïcödé/characters/тökeиs';
				const result = jsonWebOutputFileConfig(unicodePath);

				expect(result).toBeInstanceOf(Array);
				expect(result).toHaveLength(1);
				expect(result[0].destination).toBe(`${unicodePath}.json`);
			});
		});

		describe('dependency integration', () => {
			it('should use the excludedTokensFilterName from hooks module', () => {
				const testPath = '/test/path';
				const result = jsonWebOutputFileConfig(testPath);

				// The mock value should be used
				expect(result[0].filter).toBe(mockMockedExcludedTokensFilterName);
			});

			it('should use json format from style-dictionary enums', () => {
				const testPath = '/test/path';
				const result = jsonWebOutputFileConfig(testPath);

				// Should use the actual format from style-dictionary
				expect(result[0].format).toBe(mockMockedJsonFormat);
			});
		});

		describe('function behavior consistency', () => {
			it('should return consistent results for same input', () => {
				const testPath = '/consistent/test/path';

				const result1 = jsonWebOutputFileConfig(testPath);
				const result2 = jsonWebOutputFileConfig(testPath);

				expect(result1).toEqual(result2);
				expect(result1).not.toBe(result2); // Should be different objects
			});

			it('should return different destinations for different inputs', () => {
				const path1 = '/path/one';
				const path2 = '/path/two';

				const result1 = jsonWebOutputFileConfig(path1);
				const result2 = jsonWebOutputFileConfig(path2);

				expect(result1[0].destination).not.toBe(result2[0].destination);
				expect(result1[0].destination).toBe(`${path1}.json`);
				expect(result2[0].destination).toBe(`${path2}.json`);
			});

			it('should always return exactly one file configuration', () => {
				const testPaths = ['/test/path1', '', '/very/long/path/with/many/segments', '/path with spaces', '/path/with-special_chars@#'];

				testPaths.forEach(path => {
					const result = jsonWebOutputFileConfig(path);
					expect(result).toHaveLength(1);
				});
			});
		});

		describe('format-specific behavior', () => {
			it('should use JSON format specifically for web platform output', () => {
				const testPath = '/web/platform/tokens';
				const result = jsonWebOutputFileConfig(testPath);

				expect(result[0].format).toBe(mockMockedJsonFormat);
				expect(result[0].destination).toBe(`${testPath}.json`);
			});

			it('should include filter for token exclusion in JSON output', () => {
				const testPath = '/filtered/tokens';
				const result = jsonWebOutputFileConfig(testPath);

				expect(result[0].filter).toBe(mockMockedExcludedTokensFilterName);
				expect(result[0].filter).toBeTruthy();
			});
		});
	});

	describe('jsonToolsOutputFileConfig', () => {
		describe('currently unused implementation behavior', () => {
			it('should return empty array for standard file path (currently unused implementation)', () => {
				const scenario = createStandardJsonToolsConfigScenario();

				const result = jsonToolsOutputFileConfig(scenario.input);

				expect(result).toBeInstanceOf(Array);
				expect(result).toHaveLength(0);
				expect(result).toEqual([]);
			});

			it('should return empty array for different file path (currently unused implementation)', () => {
				const scenario = createDifferentPathJsonToolsConfigScenario();

				const result = jsonToolsOutputFileConfig(scenario.input);

				expect(result).toBeInstanceOf(Array);
				expect(result).toHaveLength(0);
				expect(result).toEqual([]);
			});

			it('should return empty array for empty string input (currently unused implementation)', () => {
				const scenario = createEmptyPathJsonToolsConfigScenario();

				const result = jsonToolsOutputFileConfig(scenario.input);

				expect(result).toBeInstanceOf(Array);
				expect(result).toHaveLength(0);
				expect(result).toEqual([]);
			});
		});

		describe('edge cases with currently unused implementation', () => {
			it('should handle null input by returning empty array (currently unused implementation)', () => {
				const scenario = createNullInputJsonToolsScenario();

				const result = jsonToolsOutputFileConfig(scenario.input);

				expect(result).toBeInstanceOf(Array);
				expect(result).toHaveLength(0);
				expect(result).toEqual([]);
			});

			it('should handle undefined input by returning empty array (currently unused implementation)', () => {
				const scenario = createUndefinedInputJsonToolsScenario();

				const result = jsonToolsOutputFileConfig(scenario.input);

				expect(result).toBeInstanceOf(Array);
				expect(result).toHaveLength(0);
				expect(result).toEqual([]);
			});

			it('should handle very long file paths by returning empty array (currently unused implementation)', () => {
				const longPath = '/very/'.repeat(100) + 'long/path/to/tokens';
				const result = jsonToolsOutputFileConfig(longPath);

				expect(result).toBeInstanceOf(Array);
				expect(result).toHaveLength(0);
				expect(result).toEqual([]);
			});

			it('should handle paths with unicode characters by returning empty array (currently unused implementation)', () => {
				const unicodePath = '/path/with/ünïcödé/characters/тökeиs';
				const result = jsonToolsOutputFileConfig(unicodePath);

				expect(result).toBeInstanceOf(Array);
				expect(result).toHaveLength(0);
				expect(result).toEqual([]);
			});
		});

		describe('return value structure validation', () => {
			it('should return array type consistently (currently unused implementation)', () => {
				const testPath = '/test/path';
				const result = jsonToolsOutputFileConfig(testPath);

				expect(Array.isArray(result)).toBe(true);
				expect(result).toHaveLength(0);
			});
		});

		describe('function behavior consistency for currently unused implementation', () => {
			it('should return consistent empty results for same input', () => {
				const testPath = '/consistent/test/path';

				const result1 = jsonToolsOutputFileConfig(testPath);
				const result2 = jsonToolsOutputFileConfig(testPath);

				expect(result1).toEqual(result2);
				expect(result1).toEqual([]);
				expect(result2).toEqual([]);
			});

			it('should return empty arrays for different inputs', () => {
				const path1 = '/path/one';
				const path2 = '/path/two';

				const result1 = jsonToolsOutputFileConfig(path1);
				const result2 = jsonToolsOutputFileConfig(path2);

				expect(result1).toEqual([]);
				expect(result2).toEqual([]);
				expect(result1).toEqual(result2);
			});

			it('should always return empty array regardless of input', () => {
				const testPaths = ['/test/path1', '', '/very/long/path/with/many/segments', '/path with spaces', '/path/with-special_chars@#'];

				testPaths.forEach(path => {
					const result = jsonToolsOutputFileConfig(path);
					expect(result).toHaveLength(0);
					expect(result).toEqual([]);
				});
			});
		});
	});
});
