import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { File } from 'style-dictionary';
import { excludedTokensFilterName } from '../../../hooks/index.js';
import { ktOutputFileConfig } from './kt-output-file-config.js';
import {
	createDifferentPathKtConfigScenario,
	createEmptyPathKtConfigScenario,
	createNullInputKtScenario,
	createSpacesInPathKtConfigScenario,
	createSpecialCharsInPathKtConfigScenario,
	createStandardKtConfigScenario,
	createUndefinedInputKtScenario,
	mockMockedComposeObjectFormat,
	mockMockedExcludedTokensFilterName,
} from './kt-output-file-config.mock.spec.js';

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
			composeObject: 'compose/object',
		},
	};
});

// Cast mocked function with proper typing
const mockExcludedTokensFilterName = excludedTokensFilterName as string;

describe('ktOutputFileConfig', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('successful config generation', () => {
		it('should generate Kotlin output file config with standard file path', () => {
			const scenario = createStandardKtConfigScenario();

			const result = ktOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				destination: `${scenario.input}.kt`,
				format: mockMockedComposeObjectFormat,
				filter: mockExcludedTokensFilterName,
			});
		});

		it('should generate Kotlin output file config with different file path', () => {
			const scenario = createDifferentPathKtConfigScenario();

			const result = ktOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				destination: `${scenario.input}.kt`,
				format: mockMockedComposeObjectFormat,
				filter: mockExcludedTokensFilterName,
			});
		});

		it('should handle empty string input gracefully', () => {
			const scenario = createEmptyPathKtConfigScenario();

			const result = ktOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				destination: '.kt',
				format: mockMockedComposeObjectFormat,
				filter: mockExcludedTokensFilterName,
			});
		});

		it('should handle file paths with spaces', () => {
			const scenario = createSpacesInPathKtConfigScenario();

			const result = ktOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				destination: `${scenario.input}.kt`,
				format: mockMockedComposeObjectFormat,
				filter: mockExcludedTokensFilterName,
			});
		});

		it('should handle file paths with special characters', () => {
			const scenario = createSpecialCharsInPathKtConfigScenario();

			const result = ktOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				destination: `${scenario.input}.kt`,
				format: mockMockedComposeObjectFormat,
				filter: mockExcludedTokensFilterName,
			});
		});
	});

	describe('return value structure validation', () => {
		it('should return array of File objects with correct properties', () => {
			const testPath = '/test/path';
			const result = ktOutputFileConfig(testPath);

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

		it('should use correct Kotlin Compose Object format from style-dictionary', () => {
			const testPath = '/test/path';
			const result = ktOutputFileConfig(testPath);

			expect(result[0].format).toBe(mockMockedComposeObjectFormat);
		});

		it('should use the correct filter from hooks', () => {
			const testPath = '/test/path';
			const result = ktOutputFileConfig(testPath);

			expect(result[0].filter).toBe(mockMockedExcludedTokensFilterName);
		});

		it('should append .kt extension to destination', () => {
			const testPath = '/test/output/tokens-theme';
			const result = ktOutputFileConfig(testPath);

			expect(result[0].destination).toBe(`${testPath}.kt`);
			expect(result[0].destination?.endsWith('.kt')).toBe(true);
		});
	});

	describe('edge cases and error scenarios', () => {
		it('should handle null input by creating "null.kt" destination', () => {
			const scenario = createNullInputKtScenario();

			const result = ktOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0].destination).toBe('null.kt');
			expect(result[0].format).toBe(mockMockedComposeObjectFormat);
			expect(result[0].filter).toBe(mockExcludedTokensFilterName);
		});

		it('should handle undefined input by creating "undefined.kt" destination', () => {
			const scenario = createUndefinedInputKtScenario();

			const result = ktOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0].destination).toBe('undefined.kt');
			expect(result[0].format).toBe(mockMockedComposeObjectFormat);
			expect(result[0].filter).toBe(mockExcludedTokensFilterName);
		});

		it('should handle very long file paths', () => {
			const longPath = '/very/'.repeat(100) + 'long/path/to/tokens';
			const result = ktOutputFileConfig(longPath);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0].destination).toBe(`${longPath}.kt`);
		});

		it('should handle paths with unicode characters', () => {
			const unicodePath = '/path/with/ünïcödé/characters/тökeиs';
			const result = ktOutputFileConfig(unicodePath);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0].destination).toBe(`${unicodePath}.kt`);
		});
	});

	describe('dependency integration', () => {
		it('should use the excludedTokensFilterName from hooks module', () => {
			const testPath = '/test/path';
			const result = ktOutputFileConfig(testPath);

			// The mock value should be used
			expect(result[0].filter).toBe(mockMockedExcludedTokensFilterName);
		});

		it('should use composeObject format from style-dictionary enums', () => {
			const testPath = '/test/path';
			const result = ktOutputFileConfig(testPath);

			// Should use the actual format from style-dictionary
			expect(result[0].format).toBe(mockMockedComposeObjectFormat);
		});
	});

	describe('function behavior consistency', () => {
		it('should return consistent results for same input', () => {
			const testPath = '/consistent/test/path';

			const result1 = ktOutputFileConfig(testPath);
			const result2 = ktOutputFileConfig(testPath);

			expect(result1).toEqual(result2);
			expect(result1).not.toBe(result2); // Should be different objects
		});

		it('should return different destinations for different inputs', () => {
			const path1 = '/path/one';
			const path2 = '/path/two';

			const result1 = ktOutputFileConfig(path1);
			const result2 = ktOutputFileConfig(path2);

			expect(result1[0].destination).not.toBe(result2[0].destination);
			expect(result1[0].destination).toBe(`${path1}.kt`);
			expect(result2[0].destination).toBe(`${path2}.kt`);
		});

		it('should always return exactly one file configuration', () => {
			const testPaths = ['/test/path1', '', '/very/long/path/with/many/segments', '/path with spaces', '/path/with-special_chars@#'];

			testPaths.forEach(path => {
				const result = ktOutputFileConfig(path);
				expect(result).toHaveLength(1);
			});
		});
	});

	describe('integration with commented code', () => {
		it('should not include commented out reference file configuration', () => {
			const testPath = '/test/path';
			const result = ktOutputFileConfig(testPath);

			// Should only have one file, not two (the commented out refs file should not be included)
			expect(result).toHaveLength(1);
			expect(result[0].destination).toBe(`${testPath}.kt`);
			expect(result[0].destination).not.toContain('-refs.kt');
		});

		it('should not include outputReferences option in current implementation', () => {
			const testPath = '/test/path';
			const result = ktOutputFileConfig(testPath);

			expect(result).toHaveLength(1);
			expect(result[0]).not.toHaveProperty('options');
		});
	});

	describe('format-specific behavior', () => {
		it('should use Compose Object format specifically for Android Kotlin output', () => {
			const testPath = '/android/compose/tokens';
			const result = ktOutputFileConfig(testPath);

			expect(result[0].format).toBe(mockMockedComposeObjectFormat);
			expect(result[0].destination).toBe(`${testPath}.kt`);
		});

		it('should include filter for token exclusion in Kotlin output', () => {
			const testPath = '/filtered/tokens';
			const result = ktOutputFileConfig(testPath);

			expect(result[0].filter).toBe(mockMockedExcludedTokensFilterName);
			expect(result[0].filter).toBeTruthy();
		});

		it('should be designed for escapp Android developers usage', () => {
			const testPath = '/escapp/android/tokens';
			const result = ktOutputFileConfig(testPath);

			// Verify it produces single Kotlin file with compose format
			expect(result).toHaveLength(1);
			expect(result[0].destination).toMatch(/\.kt$/);
			expect(result[0].format).toBe(mockMockedComposeObjectFormat);
		});
	});
});
