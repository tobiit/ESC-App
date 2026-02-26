import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { File } from 'style-dictionary';
import { excludedTokensFilterName } from '../../../hooks/index.js';
import { swiftOutputFileConfig } from './swift-output-file-config.js';
import {
	createDifferentPathSwiftConfigScenario,
	createEmptyPathSwiftConfigScenario,
	createLongPathSwiftConfigScenario,
	createNullInputSwiftScenario,
	createSpacesInPathSwiftConfigScenario,
	createSpecialCharsInPathSwiftConfigScenario,
	createStandardSwiftConfigScenario,
	createUndefinedInputSwiftScenario,
	createUnicodePathSwiftConfigScenario,
	mockMockedExcludedTokensFilterName,
	mockMockedIosSwiftEnumSwiftFormat,
} from './swift-output-file-config.mock.spec.js';

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
			iosSwiftEnumSwift: 'ios-swift/enum.swift',
		},
	};
});

// Cast mocked function with proper typing
const mockExcludedTokensFilterName = excludedTokensFilterName as string;

// Note: Logger mocking (suppressLoggerOutput/restoreLoggerMocks) is automatically handled by src/shared/testing/test-helpers.mock.spec.ts via jest.config.ts setupFilesAfterEnv
describe('swiftOutputFileConfig', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('successful config generation', () => {
		it('should generate Swift output file config with standard file path', () => {
			const scenario = createStandardSwiftConfigScenario();

			const result = swiftOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				destination: `${scenario.input}.swift`,
				format: mockMockedIosSwiftEnumSwiftFormat,
				filter: mockExcludedTokensFilterName,
			});
		});

		it('should generate Swift output file config with different file path', () => {
			const scenario = createDifferentPathSwiftConfigScenario();

			const result = swiftOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				destination: `${scenario.input}.swift`,
				format: mockMockedIosSwiftEnumSwiftFormat,
				filter: mockExcludedTokensFilterName,
			});
		});

		it('should handle empty string input gracefully', () => {
			const scenario = createEmptyPathSwiftConfigScenario();

			const result = swiftOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				destination: '.swift',
				format: mockMockedIosSwiftEnumSwiftFormat,
				filter: mockExcludedTokensFilterName,
			});
		});

		it('should handle file paths with spaces', () => {
			const scenario = createSpacesInPathSwiftConfigScenario();

			const result = swiftOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				destination: `${scenario.input}.swift`,
				format: mockMockedIosSwiftEnumSwiftFormat,
				filter: mockExcludedTokensFilterName,
			});
		});

		it('should handle file paths with special characters', () => {
			const scenario = createSpecialCharsInPathSwiftConfigScenario();

			const result = swiftOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0]).toEqual({
				destination: `${scenario.input}.swift`,
				format: mockMockedIosSwiftEnumSwiftFormat,
				filter: mockExcludedTokensFilterName,
			});
		});
	});

	describe('return value structure validation', () => {
		it('should return array of File objects with correct properties', () => {
			const testPath = '/test/path';
			const result = swiftOutputFileConfig(testPath);

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

		it('should use correct iOS Swift Enum format from style-dictionary', () => {
			const testPath = '/test/path';
			const result = swiftOutputFileConfig(testPath);

			expect(result[0].format).toBe(mockMockedIosSwiftEnumSwiftFormat);
		});

		it('should use the correct filter from hooks', () => {
			const testPath = '/test/path';
			const result = swiftOutputFileConfig(testPath);

			expect(result[0].filter).toBe(mockMockedExcludedTokensFilterName);
		});

		it('should append .swift extension to destination', () => {
			const testPath = '/test/output/tokens-theme';
			const result = swiftOutputFileConfig(testPath);

			expect(result[0].destination).toBe(`${testPath}.swift`);
			expect(result[0].destination?.endsWith('.swift')).toBe(true);
		});
	});

	describe('edge cases and error scenarios', () => {
		it('should handle null input by creating "null.swift" destination', () => {
			const scenario = createNullInputSwiftScenario();

			const result = swiftOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0].destination).toBe('null.swift');
			expect(result[0].format).toBe(mockMockedIosSwiftEnumSwiftFormat);
			expect(result[0].filter).toBe(mockExcludedTokensFilterName);
		});

		it('should handle undefined input by creating "undefined.swift" destination', () => {
			const scenario = createUndefinedInputSwiftScenario();

			const result = swiftOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0].destination).toBe('undefined.swift');
			expect(result[0].format).toBe(mockMockedIosSwiftEnumSwiftFormat);
			expect(result[0].filter).toBe(mockExcludedTokensFilterName);
		});

		it('should handle very long file paths', () => {
			const scenario = createLongPathSwiftConfigScenario();
			const result = swiftOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0].destination).toBe(`${scenario.input}.swift`);
		});

		it('should handle paths with unicode characters', () => {
			const scenario = createUnicodePathSwiftConfigScenario();
			const result = swiftOutputFileConfig(scenario.input);

			expect(result).toBeInstanceOf(Array);
			expect(result).toHaveLength(1);
			expect(result[0].destination).toBe(`${scenario.input}.swift`);
		});
	});

	describe('dependency integration', () => {
		it('should use the excludedTokensFilterName from hooks module', () => {
			const testPath = '/test/path';
			const result = swiftOutputFileConfig(testPath);

			// The mock value should be used
			expect(result[0].filter).toBe(mockMockedExcludedTokensFilterName);
		});

		it('should use iosSwiftEnumSwift format from style-dictionary enums', () => {
			const testPath = '/test/path';
			const result = swiftOutputFileConfig(testPath);

			// Should use the actual format from style-dictionary
			expect(result[0].format).toBe(mockMockedIosSwiftEnumSwiftFormat);
		});
	});

	describe('function behavior consistency', () => {
		it('should return consistent results for same input', () => {
			const testPath = '/consistent/test/path';

			const result1 = swiftOutputFileConfig(testPath);
			const result2 = swiftOutputFileConfig(testPath);

			expect(result1).toEqual(result2);
			expect(result1).not.toBe(result2); // Should be different objects
		});

		it('should return different destinations for different inputs', () => {
			const path1 = '/path/one';
			const path2 = '/path/two';

			const result1 = swiftOutputFileConfig(path1);
			const result2 = swiftOutputFileConfig(path2);

			expect(result1[0].destination).not.toBe(result2[0].destination);
			expect(result1[0].destination).toBe(`${path1}.swift`);
			expect(result2[0].destination).toBe(`${path2}.swift`);
		});

		it('should always return exactly one file configuration', () => {
			const testPaths = ['/test/path1', '', '/very/long/path/with/many/segments', '/path with spaces', '/path/with-special_chars@#'];

			testPaths.forEach(path => {
				const result = swiftOutputFileConfig(path);
				expect(result).toHaveLength(1);
			});
		});
	});

	describe('integration with commented code', () => {
		it('should not include commented out reference file configuration', () => {
			const testPath = '/test/path';
			const result = swiftOutputFileConfig(testPath);

			// Should only have one file, not two (the commented out refs file should not be included)
			expect(result).toHaveLength(1);
			expect(result[0].destination).toBe(`${testPath}.swift`);
			expect(result[0].destination).not.toContain('-refs.swift');
		});

		it('should not include outputReferences option in current implementation', () => {
			const testPath = '/test/path';
			const result = swiftOutputFileConfig(testPath);

			expect(result).toHaveLength(1);
			expect(result[0]).not.toHaveProperty('options');
		});
	});

	describe('format-specific behavior', () => {
		it('should use iOS Swift Enum format specifically for iOS Swift output', () => {
			const testPath = '/ios/swift/tokens';
			const result = swiftOutputFileConfig(testPath);

			expect(result[0].format).toBe(mockMockedIosSwiftEnumSwiftFormat);
			expect(result[0].destination).toBe(`${testPath}.swift`);
		});

		it('should include filter for token exclusion in Swift output', () => {
			const testPath = '/filtered/tokens';
			const result = swiftOutputFileConfig(testPath);

			expect(result[0].filter).toBe(mockMockedExcludedTokensFilterName);
			expect(result[0].filter).toBeTruthy();
		});

		it('should be designed for escapp iOS developers usage', () => {
			const testPath = '/escapp/ios/tokens';
			const result = swiftOutputFileConfig(testPath);

			// Verify it produces single Swift file with enum format
			expect(result).toHaveLength(1);
			expect(result[0].destination).toMatch(/\.swift$/);
			expect(result[0].format).toBe(mockMockedIosSwiftEnumSwiftFormat);
		});
	});

	describe('Swift-specific behavior', () => {
		it('should use iOS Swift Enum Swift format for the file', () => {
			const testPath = '/test/path';
			const result = swiftOutputFileConfig(testPath);

			expect(result[0].format).toBe(mockMockedIosSwiftEnumSwiftFormat);
			expect(result[0].destination).toContain('.swift');
		});

		it('should include filter for token exclusion in Swift output', () => {
			const testPath = '/test/path';
			const result = swiftOutputFileConfig(testPath);

			expect(result[0].filter).toBe(mockMockedExcludedTokensFilterName);
		});

		it('should be designed for iOS development with Swift enum structure', () => {
			const testPath = '/dist/ios/escapp-theme';
			const result = swiftOutputFileConfig(testPath);

			// Should generate Swift enum file for iOS usage
			expect(result).toHaveLength(1);
			expect(result[0].destination).toBe(`${testPath}.swift`);
			expect(result[0].format).toBe(mockMockedIosSwiftEnumSwiftFormat);
		});
	});
});
