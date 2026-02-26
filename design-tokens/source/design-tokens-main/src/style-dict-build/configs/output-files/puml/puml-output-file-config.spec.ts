import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { File } from 'style-dictionary';
import { excludedTokensFilterName, pumlFormatName } from '../../../hooks/index.js';
import { pumlOutputFileConfig } from './puml-output-file-config.js';
import {
	createDifferentPathPumlConfigScenario,
	createEmptyPathPumlConfigScenario,
	createNullInputPumlScenario,
	createSpacesInPathPumlConfigScenario,
	createSpecialCharsInPathPumlConfigScenario,
	createStandardPumlConfigScenario,
	createUndefinedInputPumlScenario,
	mockMockedExcludedTokensFilterName,
	mockMockedPumlFormatName,
} from './puml-output-file-config.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock the hooks dependency
jest.mock('../../../hooks/index.js', () => {
	return {
		excludedTokensFilterName: 'mocked-filter-name',
		pumlFormatName: 'mocked-puml-format',
	};
});

// Cast mocked values with proper typing
const mockExcludedTokensFilterName = excludedTokensFilterName as string;
const mockPumlFormatName = pumlFormatName as string;

describe('pumlOutputFileConfig', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('successful config generation', () => {
		it('should generate PlantUML output file config with standard file path', () => {
			const scenario = createStandardPumlConfigScenario();

			const result = pumlOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				destination: `${scenario.input}.puml`,
				format: mockMockedPumlFormatName,
				filter: mockMockedExcludedTokensFilterName,
			});
		});

		it('should generate PlantUML output file config with different file path', () => {
			const scenario = createDifferentPathPumlConfigScenario();

			const result = pumlOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				destination: `${scenario.input}.puml`,
				format: mockMockedPumlFormatName,
				filter: mockMockedExcludedTokensFilterName,
			});
		});

		it('should handle empty string input gracefully', () => {
			const scenario = createEmptyPathPumlConfigScenario();

			const result = pumlOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				destination: '.puml',
				format: mockMockedPumlFormatName,
				filter: mockMockedExcludedTokensFilterName,
			});
		});

		it('should handle file paths with spaces', () => {
			const scenario = createSpacesInPathPumlConfigScenario();

			const result = pumlOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				destination: `${scenario.input}.puml`,
				format: mockMockedPumlFormatName,
				filter: mockMockedExcludedTokensFilterName,
			});
		});

		it('should handle file paths with special characters', () => {
			const scenario = createSpecialCharsInPathPumlConfigScenario();

			const result = pumlOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				destination: `${scenario.input}.puml`,
				format: mockMockedPumlFormatName,
				filter: mockMockedExcludedTokensFilterName,
			});
		});
	});

	describe('return value structure validation', () => {
		it('should return array of File objects with correct properties', () => {
			const testPath = '/test/path';
			const result = pumlOutputFileConfig(testPath);

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

		it('should use correct PlantUML format from hooks', () => {
			const testPath = '/test/path';
			const result = pumlOutputFileConfig(testPath);

			expect(result[0].format).toBe(mockMockedPumlFormatName);
		});

		it('should use the correct filter from hooks', () => {
			const testPath = '/test/path';
			const result = pumlOutputFileConfig(testPath);

			expect(result[0].filter).toBe(mockMockedExcludedTokensFilterName);
		});

		it('should append .puml extension to destination', () => {
			const testPath = '/test/output/tokens-theme';
			const result = pumlOutputFileConfig(testPath);

			expect(result[0].destination).toBe(`${testPath}.puml`);
			expect(result[0].destination?.endsWith('.puml')).toBe(true);
		});
	});

	describe('edge cases and error scenarios', () => {
		it('should handle null input by creating "null.puml" destination', () => {
			const scenario = createNullInputPumlScenario();

			const result = pumlOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0].destination).toBe('null.puml');
			expect(result[0].format).toBe(mockPumlFormatName);
			expect(result[0].filter).toBe(mockExcludedTokensFilterName);
		});

		it('should handle undefined input by creating "undefined.puml" destination', () => {
			const scenario = createUndefinedInputPumlScenario();

			const result = pumlOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0].destination).toBe('undefined.puml');
			expect(result[0].format).toBe(mockPumlFormatName);
			expect(result[0].filter).toBe(mockExcludedTokensFilterName);
		});

		it('should handle very long file paths', () => {
			const longPath = '/very/'.repeat(100) + 'long/path/to/tokens';
			const result = pumlOutputFileConfig(longPath);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0].destination).toBe(`${longPath}.puml`);
		});

		it('should handle paths with unicode characters', () => {
			const unicodePath = '/path/with/ünïcödé/characters/тökeиs';
			const result = pumlOutputFileConfig(unicodePath);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0].destination).toBe(`${unicodePath}.puml`);
		});
	});

	describe('dependency integration', () => {
		it('should use the excludedTokensFilterName from hooks module', () => {
			const testPath = '/test/path';
			const result = pumlOutputFileConfig(testPath);

			// The mock value should be used
			expect(result[0].filter).toBe(mockMockedExcludedTokensFilterName);
		});

		it('should use pumlFormatName from hooks module', () => {
			const testPath = '/test/path';
			const result = pumlOutputFileConfig(testPath);

			// Should use the mocked format name
			expect(result[0].format).toBe(mockMockedPumlFormatName);
		});
	});

	describe('function behavior consistency', () => {
		it('should return consistent results for same input', () => {
			const testPath = '/consistent/test/path';

			const result1 = pumlOutputFileConfig(testPath);
			const result2 = pumlOutputFileConfig(testPath);

			expect(result1).toEqual(result2);
			expect(result1).not.toBe(result2); // Should be different objects
		});

		it('should return different destinations for different inputs', () => {
			const path1 = '/path/one';
			const path2 = '/path/two';

			const result1 = pumlOutputFileConfig(path1);
			const result2 = pumlOutputFileConfig(path2);

			expect(result1[0].destination).not.toBe(result2[0].destination);
			expect(result1[0].destination).toBe(`${path1}.puml`);
			expect(result2[0].destination).toBe(`${path2}.puml`);
		});

		it('should always return exactly one file configuration', () => {
			const testPaths = ['/test/path1', '', '/very/long/path/with/many/segments', '/path with spaces', '/path/with-special_chars@#'];

			testPaths.forEach(path => {
				const result = pumlOutputFileConfig(path);
				expect(result).toHaveLength(1);
			});
		});
	});

	describe('PlantUML-specific behavior', () => {
		it('should use PlantUML format specifically for diagram output', () => {
			const testPath = '/diagrams/tokens';
			const result = pumlOutputFileConfig(testPath);

			expect(result[0].format).toBe(mockMockedPumlFormatName);
			expect(result[0].destination).toBe(`${testPath}.puml`);
		});

		it('should include filter for token exclusion in PlantUML output', () => {
			const testPath = '/filtered/tokens';
			const result = pumlOutputFileConfig(testPath);

			expect(result[0].filter).toBe(mockMockedExcludedTokensFilterName);
			expect(result[0].filter).toBeTruthy();
		});

		it('should produce PlantUML file with .puml extension', () => {
			const testPath = '/output/design-tokens';
			const result = pumlOutputFileConfig(testPath);

			// Verify it produces single PlantUML file
			expect(result).toHaveLength(1);
			expect(result[0].destination).toMatch(/\.puml$/);
			expect(result[0].format).toBe(mockMockedPumlFormatName);
		});

		it('should be suitable for documentation and visualization purposes', () => {
			const testPath = '/documentation/visual-tokens';
			const result = pumlOutputFileConfig(testPath);

			// Verify configuration is appropriate for PlantUML documentation
			expect(result).toHaveLength(1);
			expect(result[0].destination).toContain(testPath);
			expect(result[0].destination).toMatch(/\.puml$/);
			expect(result[0].format).toBe(mockMockedPumlFormatName);
			expect(result[0].filter).toBe(mockMockedExcludedTokensFilterName);
		});
	});

	describe('array initialization pattern', () => {
		it('should initialize array with explicit type annotation', () => {
			const testPath = '/test/path';
			const result = pumlOutputFileConfig(testPath);

			// Verify the result is properly typed array
			expect(Array.isArray(result)).toBe(true);
			expect(result.length).toBeGreaterThan(0);
		});

		it('should return new array instance each time', () => {
			const testPath = '/test/path';

			const result1 = pumlOutputFileConfig(testPath);
			const result2 = pumlOutputFileConfig(testPath);

			// Should be equal but not the same reference
			expect(result1).toEqual(result2);
			expect(result1).not.toBe(result2);

			// Modifying one should not affect the other
			result1.push({
				destination: 'extra.puml',
				format: 'extra-format',
				filter: 'extra-filter',
			});

			expect(result1).toHaveLength(2);
			expect(result2).toHaveLength(1);
		});
	});
});
