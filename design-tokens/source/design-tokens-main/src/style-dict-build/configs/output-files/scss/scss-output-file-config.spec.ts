import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { File } from 'style-dictionary';
import { excludedTokensFilterName } from '../../../hooks/index.js';
import { scssOutputFileConfig } from './scss-output-file-config.js';
import {
	createDifferentPathScssConfigScenario,
	createEmptyPathScssConfigScenario,
	createLongPathScssConfigScenario,
	createNullInputScenario,
	createSpacesInPathScssConfigScenario,
	createSpecialCharsInPathScssConfigScenario,
	createStandardScssConfigScenario,
	createUndefinedInputScenario,
	createUnicodePathScssConfigScenario,
	mockMockedExcludedTokensFilterName,
	mockMockedScssVariablesFormat,
} from './scss-output-file-config.mock.spec.js';

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
			scssVariables: 'scss/variables',
			scssMapDeep: 'scss/map-deep',
		},
	};
});

// Cast mocked function with proper typing
const mockExcludedTokensFilterName = excludedTokensFilterName as string;

describe('scssOutputFileConfig', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('successful config generation', () => {
		it('should generate SCSS output file config with standard file path', () => {
			const scenario = createStandardScssConfigScenario();

			const result = scssOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				destination: `${scenario.input}.scss`,
				format: mockMockedScssVariablesFormat,
				filter: mockExcludedTokensFilterName,
			});
		});

		it('should generate SCSS output file config with different file path', () => {
			const scenario = createDifferentPathScssConfigScenario();

			const result = scssOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				destination: `${scenario.input}.scss`,
				format: mockMockedScssVariablesFormat,
				filter: mockExcludedTokensFilterName,
			});
		});

		it('should handle empty string input gracefully', () => {
			const scenario = createEmptyPathScssConfigScenario();

			const result = scssOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				destination: '.scss',
				format: mockMockedScssVariablesFormat,
				filter: mockExcludedTokensFilterName,
			});
		});

		it('should handle file paths with spaces', () => {
			const scenario = createSpacesInPathScssConfigScenario();

			const result = scssOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				destination: `${scenario.input}.scss`,
				format: mockMockedScssVariablesFormat,
				filter: mockExcludedTokensFilterName,
			});
		});

		it('should handle file paths with special characters', () => {
			const scenario = createSpecialCharsInPathScssConfigScenario();

			const result = scssOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				destination: `${scenario.input}.scss`,
				format: mockMockedScssVariablesFormat,
				filter: mockExcludedTokensFilterName,
			});
		});
	});

	describe('return value structure validation', () => {
		it('should return array of File objects with correct properties', () => {
			const testPath = '/test/path';
			const result = scssOutputFileConfig(testPath);

			expect(Array.isArray(result)).toBe(true);
			expect(result).toHaveLength(1);

			const scssFile = result[0] as File;

			// Test SCSS variables file
			expect(scssFile).toHaveProperty('destination');
			expect(scssFile).toHaveProperty('format');
			expect(scssFile).toHaveProperty('filter');
			expect(typeof scssFile.destination).toBe('string');
			expect(typeof scssFile.format).toBe('string');
			expect(typeof scssFile.filter).toBe('string');
		});

		it('should use correct SCSS formats from style-dictionary', () => {
			const testPath = '/test/path';
			const result = scssOutputFileConfig(testPath);

			expect(result[0].format).toBe(mockMockedScssVariablesFormat);
		});

		it('should use the correct filter from hooks', () => {
			const testPath = '/test/path';
			const result = scssOutputFileConfig(testPath);

			expect(result[0].filter).toBe(mockMockedExcludedTokensFilterName);
		});

		it('should append correct extensions to destinations', () => {
			const testPath = '/test/output/tokens-theme';
			const result = scssOutputFileConfig(testPath);

			expect(result[0].destination).toBe(`${testPath}.scss`);
			expect(result[0].destination?.endsWith('.scss')).toBe(true);
		});
	});

	describe('edge cases and error scenarios', () => {
		it('should handle null input by creating "null" destinations', () => {
			const scenario = createNullInputScenario();

			const result = scssOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0].destination).toBe('null.scss');
			expect(result[0].format).toBe(mockMockedScssVariablesFormat);
			expect(result[0].filter).toBe(mockExcludedTokensFilterName);
		});

		it('should handle undefined input by creating "undefined" destinations', () => {
			const scenario = createUndefinedInputScenario();

			const result = scssOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0].destination).toBe('undefined.scss');
			expect(result[0].format).toBe(mockMockedScssVariablesFormat);
			expect(result[0].filter).toBe(mockExcludedTokensFilterName);
		});

		it('should handle very long file paths', () => {
			const scenario = createLongPathScssConfigScenario();
			const result = scssOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0].destination).toBe(`${scenario.input}.scss`);
		});

		it('should handle paths with unicode characters', () => {
			const scenario = createUnicodePathScssConfigScenario();
			const result = scssOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0].destination).toBe(`${scenario.input}.scss`);
		});
	});

	describe('dependency integration', () => {
		it('should use the excludedTokensFilterName from hooks module', () => {
			const testPath = '/test/path';
			const result = scssOutputFileConfig(testPath);

			// The mock value should be used for the file
			expect(result[0].filter).toBe(mockMockedExcludedTokensFilterName);
		});

		it('should use scssVariables format from style-dictionary enums', () => {
			const testPath = '/test/path';
			const result = scssOutputFileConfig(testPath);

			// Should use the actual format from style-dictionary
			expect(result[0].format).toBe(mockMockedScssVariablesFormat);
		});
	});

	describe('function behavior consistency', () => {
		it('should return consistent results for same input', () => {
			const testPath = '/consistent/test/path';

			const result1 = scssOutputFileConfig(testPath);
			const result2 = scssOutputFileConfig(testPath);

			expect(result1).toEqual(result2);
			expect(result1).not.toBe(result2); // Should be different objects
		});

		it('should return different destinations for different inputs', () => {
			const path1 = '/path/one';
			const path2 = '/path/two';

			const result1 = scssOutputFileConfig(path1);
			const result2 = scssOutputFileConfig(path2);

			expect(result1[0].destination).not.toBe(result2[0].destination);
			expect(result1[0].destination).toBe(`${path1}.scss`);
			expect(result2[0].destination).toBe(`${path2}.scss`);
		});

		it('should always return exactly one file configuration', () => {
			const testPaths = ['/test/path1', '', '/very/long/path/with/many/segments', '/path with spaces', '/path/with-special_chars@#'];

			testPaths.forEach(path => {
				const result = scssOutputFileConfig(path);
				expect(result).toHaveLength(1);
			});
		});
	});

	describe('integration with commented code', () => {
		it('should not include commented out map and reference file configurations', () => {
			const testPath = '/test/path';
			const result = scssOutputFileConfig(testPath);

			// Should only have one file (the map and refs files are commented out)
			expect(result).toHaveLength(1);
			expect(result[0].destination).toBe(`${testPath}.scss`);
			expect(result.some(file => file.destination?.includes('-map.scss'))).toBe(false);
			expect(result.some(file => file.destination?.includes('-refs.scss'))).toBe(false);
		});

		it('should not include outputReferences option in current implementation', () => {
			const testPath = '/test/path';
			const result = scssOutputFileConfig(testPath);

			// The file should not have outputReferences option
			expect(result[0]).not.toHaveProperty('options');
		});
	});

	describe('SCSS-specific behavior', () => {
		it('should use SCSS Variables format for the file', () => {
			const testPath = '/test/path';
			const result = scssOutputFileConfig(testPath);

			expect(result[0].format).toBe(mockMockedScssVariablesFormat);
			expect(result[0].destination).toContain('.scss');
			expect(result[0].destination).not.toContain('-map');
		});

		it('should include filter for token exclusion in SCSS output', () => {
			const testPath = '/test/path';
			const result = scssOutputFileConfig(testPath);

			expect(result[0].filter).toBe(mockMockedExcludedTokensFilterName);
		});

		it('should be designed for Allianz SCSS/Sass developers usage', () => {
			const testPath = '/dist/scss/allianz-theme';
			const result = scssOutputFileConfig(testPath);

			// Should generate variables file for SCSS usage
			expect(result).toHaveLength(1);
			expect(result[0].destination).toBe(`${testPath}.scss`);
			expect(result[0].format).toBe(mockMockedScssVariablesFormat);
		});
	});

	describe('format-specific behavior differences', () => {
		it('should create SCSS Variables file with standard extension', () => {
			const testPath = '/test/scss-vars';
			const result = scssOutputFileConfig(testPath);

			const scssFile = result[0];
			expect(scssFile.format).toBe(mockMockedScssVariablesFormat);
			expect(scssFile.destination).toBe(`${testPath}.scss`);
			expect(scssFile.destination).not.toContain('map');
		});
	});
});
