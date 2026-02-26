import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { File } from 'style-dictionary';
import { excludedTokensFilterName } from '../../../hooks/index.js';
import { jsOutputFileConfig } from './js-output-file-config.js';
import {
	createDifferentPathJsConfigScenario,
	createEmptyPathJsConfigScenario,
	createNullInputScenario,
	createSpacesInPathJsConfigScenario,
	createSpecialCharsInPathJsConfigScenario,
	createStandardJsConfigScenario,
	createUndefinedInputScenario,
	mockMockedExcludedTokensFilterName,
	mockMockedJavascriptEs6Format,
} from './js-output-file-config.mock.spec.js';

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
			javascriptEs6: 'javascript/es6',
		},
	};
});

// Cast mocked function with proper typing
const mockExcludedTokensFilterName = excludedTokensFilterName as string;

describe('jsOutputFileConfig', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('successful config generation', () => {
		it('should generate JavaScript output file config with standard file path', () => {
			const scenario = createStandardJsConfigScenario();

			const result = jsOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				destination: `${scenario.input}.js`,
				format: mockMockedJavascriptEs6Format,
				filter: mockExcludedTokensFilterName,
			});
		});

		it('should generate JavaScript output file config with different file path', () => {
			const scenario = createDifferentPathJsConfigScenario();

			const result = jsOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				destination: `${scenario.input}.js`,
				format: mockMockedJavascriptEs6Format,
				filter: mockExcludedTokensFilterName,
			});
		});

		it('should handle empty string input gracefully', () => {
			const scenario = createEmptyPathJsConfigScenario();

			const result = jsOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				destination: '.js',
				format: mockMockedJavascriptEs6Format,
				filter: mockExcludedTokensFilterName,
			});
		});

		it('should handle file paths with spaces', () => {
			const scenario = createSpacesInPathJsConfigScenario();

			const result = jsOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				destination: `${scenario.input}.js`,
				format: mockMockedJavascriptEs6Format,
				filter: mockExcludedTokensFilterName,
			});
		});

		it('should handle file paths with special characters', () => {
			const scenario = createSpecialCharsInPathJsConfigScenario();

			const result = jsOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				destination: `${scenario.input}.js`,
				format: mockMockedJavascriptEs6Format,
				filter: mockExcludedTokensFilterName,
			});
		});
	});

	describe('return value structure validation', () => {
		it('should return array of File objects with correct properties', () => {
			const testPath = '/test/path';
			const result = jsOutputFileConfig(testPath);

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

		it('should use correct JavaScript ES6 format from style-dictionary', () => {
			const testPath = '/test/path';
			const result = jsOutputFileConfig(testPath);

			expect(result[0].format).toBe(mockMockedJavascriptEs6Format);
		});

		it('should use the correct filter from hooks', () => {
			const testPath = '/test/path';
			const result = jsOutputFileConfig(testPath);

			expect(result[0].filter).toBe(mockMockedExcludedTokensFilterName);
		});

		it('should append .js extension to destination', () => {
			const testPath = '/test/output/tokens-theme';
			const result = jsOutputFileConfig(testPath);

			expect(result[0].destination).toBe(`${testPath}.js`);
			expect(result[0].destination?.endsWith('.js')).toBe(true);
		});
	});

	describe('edge cases and error scenarios', () => {
		it('should handle null input by creating "null.js" destination', () => {
			const scenario = createNullInputScenario();

			const result = jsOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0].destination).toBe('null.js');
			expect(result[0].format).toBe(mockMockedJavascriptEs6Format);
			expect(result[0].filter).toBe(mockExcludedTokensFilterName);
		});

		it('should handle undefined input by creating "undefined.js" destination', () => {
			const scenario = createUndefinedInputScenario();

			const result = jsOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0].destination).toBe('undefined.js');
			expect(result[0].format).toBe(mockMockedJavascriptEs6Format);
			expect(result[0].filter).toBe(mockExcludedTokensFilterName);
		});

		it('should handle very long file paths', () => {
			const longPath = '/very/'.repeat(100) + 'long/path/to/tokens';
			const result = jsOutputFileConfig(longPath);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0].destination).toBe(`${longPath}.js`);
		});

		it('should handle paths with unicode characters', () => {
			const unicodePath = '/path/with/ünïcödé/characters/тökeиs';
			const result = jsOutputFileConfig(unicodePath);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0].destination).toBe(`${unicodePath}.js`);
		});
	});

	describe('dependency integration', () => {
		it('should use the excludedTokensFilterName from hooks module', () => {
			const testPath = '/test/path';
			const result = jsOutputFileConfig(testPath);

			// The mock value should be used
			expect(result[0].filter).toBe(mockMockedExcludedTokensFilterName);
		});

		it('should use javascriptEs6 format from style-dictionary enums', () => {
			const testPath = '/test/path';
			const result = jsOutputFileConfig(testPath);

			// Should use the actual format from style-dictionary
			expect(result[0].format).toBe(mockMockedJavascriptEs6Format);
		});
	});

	describe('function behavior consistency', () => {
		it('should return consistent results for same input', () => {
			const testPath = '/consistent/test/path';

			const result1 = jsOutputFileConfig(testPath);
			const result2 = jsOutputFileConfig(testPath);

			expect(result1).toEqual(result2);
			expect(result1).not.toBe(result2); // Should be different objects
		});

		it('should return different destinations for different inputs', () => {
			const path1 = '/path/one';
			const path2 = '/path/two';

			const result1 = jsOutputFileConfig(path1);
			const result2 = jsOutputFileConfig(path2);

			expect(result1[0].destination).not.toBe(result2[0].destination);
			expect(result1[0].destination).toBe(`${path1}.js`);
			expect(result2[0].destination).toBe(`${path2}.js`);
		});

		it('should always return exactly one file configuration', () => {
			const testPaths = ['/test/path1', '', '/very/long/path/with/many/segments', '/path with spaces', '/path/with-special_chars@#'];

			testPaths.forEach(path => {
				const result = jsOutputFileConfig(path);
				expect(result).toHaveLength(1);
			});
		});
	});

	describe('integration with commented code', () => {
		it('should not include commented out JavaScript object format configuration', () => {
			const testPath = '/test/path';
			const result = jsOutputFileConfig(testPath);

			// Should only have one file, not multiple (the commented out formats should not be included)
			expect(result).toHaveLength(1);
			expect(result[0].destination).toBe(`${testPath}.js`);
			expect(result[0].destination).not.toContain('-obj.js');
			expect(result[0].destination).not.toContain('-umd.js');
		});

		it('should only use javascriptEs6 format, not object or UMD formats', () => {
			const testPath = '/test/path';
			const result = jsOutputFileConfig(testPath);

			expect(result).toHaveLength(1);
			expect(result[0].format).toBe(mockMockedJavascriptEs6Format);
		});
	});

	describe('format-specific behavior', () => {
		it('should use ES6 format specifically for modern JavaScript output', () => {
			const testPath = '/modern/es6/tokens';
			const result = jsOutputFileConfig(testPath);

			expect(result[0].format).toBe(mockMockedJavascriptEs6Format);
			expect(result[0].destination).toBe(`${testPath}.js`);
		});

		it('should include filter for token exclusion in JavaScript output', () => {
			const testPath = '/filtered/tokens';
			const result = jsOutputFileConfig(testPath);

			expect(result[0].filter).toBe(mockMockedExcludedTokensFilterName);
			expect(result[0].filter).toBeTruthy();
		});
	});
});
