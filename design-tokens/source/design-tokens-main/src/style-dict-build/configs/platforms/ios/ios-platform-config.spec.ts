import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { PlatformConfig } from 'style-dictionary';
import { swiftOutputFileConfig } from '../../output-files/index.js';
import { TsTransformGroups } from '../../../enums/index.js';
import { allianzFileHeaderName } from '../../../hooks/index.js';
import { Platforms } from '../../../../shared/index.js';
import { platformIosSwiftConfig } from './ios-platform-config.js';
import {
	createDifferentPathIosPlatformConfigScenario,
	createEmptyPathIosPlatformConfigScenario,
	createExpectedIosPlatformConfig,
	createLongPathIosPlatformConfigScenario,
	createNullInputIosPlatformConfigScenario,
	createSpacesInPathIosPlatformConfigScenario,
	createSpecialCharsIosPlatformConfigScenario,
	createStandardIosPlatformConfigScenario,
	createUndefinedInputIosPlatformConfigScenario,
	createUnicodePathIosPlatformConfigScenario,
	mockMockedAllianzFileHeaderName,
	mockMockedPlatformsIos,
	mockMockedSwiftOutputFileConfig,
	mockMockedTsTransformGroups,
} from './ios-platform-config.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock the output files dependency
jest.mock('../../output-files/index.js', () => {
	return {
		swiftOutputFileConfig: jest.fn(),
	};
});

// Mock the enums dependency
jest.mock('../../../enums/index.js', () => {
	return {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		TsTransformGroups: {
			tokensStudio: 'tokens-studio',
		},
	};
});

// Mock the hooks dependency
jest.mock('../../../hooks/index.js', () => {
	return {
		allianzFileHeaderName: 'allianzFileHeader',
	};
});

// Mock the shared dependency
jest.mock('../../../../shared/index.js', () => {
	return {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		Platforms: {
			ios: 'ios',
		},
	};
});

// Cast mocked functions with proper typing
const mockSwiftOutputFileConfig = swiftOutputFileConfig as jest.MockedFunction<typeof swiftOutputFileConfig>;

// Note: Logger mocking (suppressLoggerOutput/restoreLoggerMocks) is automatically handled by src/shared/testing/test-helpers.mock.spec.ts via jest.config.ts setupFilesAfterEnv
describe('platformIosSwiftConfig', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		// Setup default mock return value
		mockSwiftOutputFileConfig.mockReturnValue(mockMockedSwiftOutputFileConfig);
	});

	describe('successful config generation', () => {
		it('should generate iOS platform config with standard paths', () => {
			const scenario = createStandardIosPlatformConfigScenario();

			const result = platformIosSwiftConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result).toEqual({
				transformGroup: mockMockedTsTransformGroups,
				buildPath: scenario.outputFilePath,
				files: mockMockedSwiftOutputFileConfig,
				options: {
					fileHeader: mockMockedAllianzFileHeaderName,
				},
			});

			// Verify swiftOutputFileConfig was called with correct path
			expect(mockSwiftOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsIos}/${scenario.outputFileName}`);
			expect(mockSwiftOutputFileConfig).toHaveBeenCalledTimes(1);
		});

		it('should generate iOS platform config with different paths', () => {
			const scenario = createDifferentPathIosPlatformConfigScenario();

			const result = platformIosSwiftConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result).toEqual({
				transformGroup: mockMockedTsTransformGroups,
				buildPath: scenario.outputFilePath,
				files: mockMockedSwiftOutputFileConfig,
				options: {
					fileHeader: mockMockedAllianzFileHeaderName,
				},
			});

			expect(mockSwiftOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsIos}/${scenario.outputFileName}`);
		});

		it('should handle empty path inputs gracefully', () => {
			const scenario = createEmptyPathIosPlatformConfigScenario();

			const result = platformIosSwiftConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result.buildPath).toBe('');
			expect(result.transformGroup).toBe(mockMockedTsTransformGroups);
			expect(result.files).toBe(mockMockedSwiftOutputFileConfig);
			expect(result.options?.fileHeader).toBe(mockMockedAllianzFileHeaderName);

			expect(mockSwiftOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsIos}/`);
		});

		it('should handle file paths with spaces', () => {
			const scenario = createSpacesInPathIosPlatformConfigScenario();

			const result = platformIosSwiftConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result.buildPath).toBe(scenario.outputFilePath);
			expect(result.transformGroup).toBe(mockMockedTsTransformGroups);

			expect(mockSwiftOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsIos}/${scenario.outputFileName}`);
		});

		it('should handle file paths with special characters', () => {
			const scenario = createSpecialCharsIosPlatformConfigScenario();

			const result = platformIosSwiftConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result.buildPath).toBe(scenario.outputFilePath);
			expect(result.transformGroup).toBe(mockMockedTsTransformGroups);

			expect(mockSwiftOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsIos}/${scenario.outputFileName}`);
		});
	});

	describe('return value structure validation', () => {
		it('should return PlatformConfig object with correct properties', () => {
			const testOutputPath = '/test/path';
			const testFileName = 'test-tokens';
			const result = platformIosSwiftConfig(testOutputPath, testFileName);

			expect(result).toHaveProperty('transformGroup');
			expect(result).toHaveProperty('buildPath');
			expect(result).toHaveProperty('files');
			expect(result).toHaveProperty('options');

			expect(typeof result.transformGroup).toBe('string');
			expect(typeof result.buildPath).toBe('string');
			expect(Array.isArray(result.files)).toBe(true);
			expect(typeof result.options).toBe('object');
		});

		it('should use correct transform group from enums', () => {
			const testOutputPath = '/test/path';
			const testFileName = 'test-tokens';
			const result = platformIosSwiftConfig(testOutputPath, testFileName);

			expect(result.transformGroup).toBe(mockMockedTsTransformGroups);
		});

		it('should use the correct file header from hooks', () => {
			const testOutputPath = '/test/path';
			const testFileName = 'test-tokens';
			const result = platformIosSwiftConfig(testOutputPath, testFileName);

			expect(result.options?.fileHeader).toBe(mockMockedAllianzFileHeaderName);
		});

		it('should set buildPath to the provided outputFilePath', () => {
			const testOutputPath = '/custom/build/path';
			const testFileName = 'test-tokens';
			const result = platformIosSwiftConfig(testOutputPath, testFileName);

			expect(result.buildPath).toBe(testOutputPath);
		});

		it('should use files from swiftOutputFileConfig', () => {
			const testOutputPath = '/test/path';
			const testFileName = 'test-tokens';
			const result = platformIosSwiftConfig(testOutputPath, testFileName);

			expect(result.files).toBe(mockMockedSwiftOutputFileConfig);
		});
	});

	describe('edge cases and error scenarios', () => {
		it('should handle null input by creating config with null values', () => {
			const scenario = createNullInputIosPlatformConfigScenario();

			const result = platformIosSwiftConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result.buildPath).toBe(null);
			expect(result.transformGroup).toBe(mockMockedTsTransformGroups);
			expect(result.files).toBe(mockMockedSwiftOutputFileConfig);

			expect(mockSwiftOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsIos}/null`);
		});

		it('should handle undefined input by creating config with undefined values', () => {
			const scenario = createUndefinedInputIosPlatformConfigScenario();

			const result = platformIosSwiftConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result.buildPath).toBe(undefined);
			expect(result.transformGroup).toBe(mockMockedTsTransformGroups);
			expect(result.files).toBe(mockMockedSwiftOutputFileConfig);

			expect(mockSwiftOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsIos}/undefined`);
		});

		it('should handle very long file paths', () => {
			const scenario = createLongPathIosPlatformConfigScenario();
			const result = platformIosSwiftConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result.buildPath).toBe(scenario.outputFilePath);
			expect(mockSwiftOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsIos}/${scenario.outputFileName}`);
		});

		it('should handle paths with unicode characters', () => {
			const scenario = createUnicodePathIosPlatformConfigScenario();
			const result = platformIosSwiftConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result.buildPath).toBe(scenario.outputFilePath);
			expect(mockSwiftOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsIos}/${scenario.outputFileName}`);
		});
	});

	describe('dependency integration', () => {
		it('should call swiftOutputFileConfig with correct fullOutputFilePath', () => {
			const outputPath = '/test/build';
			const fileName = 'design-tokens';

			platformIosSwiftConfig(outputPath, fileName);

			expect(mockSwiftOutputFileConfig).toHaveBeenCalledWith('ios/design-tokens');
			expect(mockSwiftOutputFileConfig).toHaveBeenCalledTimes(1);
		});

		it('should use TsTransformGroups.tokensStudio from enums', () => {
			const outputPath = '/test/build';
			const fileName = 'design-tokens';

			const result = platformIosSwiftConfig(outputPath, fileName);

			expect(result.transformGroup).toBe(TsTransformGroups.tokensStudio);
		});

		it('should use allianzFileHeaderName from hooks', () => {
			const outputPath = '/test/build';
			const fileName = 'design-tokens';

			const result = platformIosSwiftConfig(outputPath, fileName);

			expect(result.options?.fileHeader).toBe(allianzFileHeaderName);
		});

		it('should use Platforms.ios from shared enums', () => {
			const outputPath = '/test/build';
			const fileName = 'design-tokens';

			platformIosSwiftConfig(outputPath, fileName);

			// Verify that the ios platform prefix is used in the path
			expect(mockSwiftOutputFileConfig).toHaveBeenCalledWith(`${Platforms.ios}/${fileName}`);
		});
	});

	describe('function behavior consistency', () => {
		it('should return consistent results for same input', () => {
			const outputPath = '/consistent/test/path';
			const fileName = 'consistent-tokens';

			const result1 = platformIosSwiftConfig(outputPath, fileName);
			const result2 = platformIosSwiftConfig(outputPath, fileName);

			expect(result1).toEqual(result2);
			expect(result1).not.toBe(result2); // Should be different objects
		});

		it('should return different buildPaths for different inputs', () => {
			const path1 = '/path/one';
			const path2 = '/path/two';
			const fileName = 'tokens';

			const result1 = platformIosSwiftConfig(path1, fileName);
			const result2 = platformIosSwiftConfig(path2, fileName);

			expect(result1.buildPath).not.toBe(result2.buildPath);
			expect(result1.buildPath).toBe(path1);
			expect(result2.buildPath).toBe(path2);
		});

		it('should call swiftOutputFileConfig with different paths for different fileNames', () => {
			mockSwiftOutputFileConfig.mockClear();
			const outputPath = '/test/path';
			const fileName1 = 'tokens-theme1';
			const fileName2 = 'tokens-theme2';

			platformIosSwiftConfig(outputPath, fileName1);
			platformIosSwiftConfig(outputPath, fileName2);

			expect(mockSwiftOutputFileConfig).toHaveBeenCalledTimes(2);
			expect(mockSwiftOutputFileConfig).toHaveBeenNthCalledWith(1, `ios/${fileName1}`);
			expect(mockSwiftOutputFileConfig).toHaveBeenNthCalledWith(2, `ios/${fileName2}`);
		});
	});

	describe('iOS-specific behavior', () => {
		it('should always use "ios" platform prefix in fullOutputFilePath', () => {
			const testCases = [
				{ outputPath: '/dist', fileName: 'tokens' },
				{ outputPath: '/build/ios', fileName: 'theme-tokens' },
				{ outputPath: '', fileName: 'empty-path-tokens' },
			];

			mockSwiftOutputFileConfig.mockClear();

			testCases.forEach(({ outputPath, fileName }, index) => {
				platformIosSwiftConfig(outputPath, fileName);
				expect(mockSwiftOutputFileConfig).toHaveBeenNthCalledWith(index + 1, `ios/${fileName}`);
			});
		});

		it('should be designed for iOS/Swift token generation', () => {
			const outputPath = '/ios/tokens';
			const fileName = 'allianz-tokens';

			const result = platformIosSwiftConfig(outputPath, fileName);

			// Verify it's configured for iOS development
			expect(result.transformGroup).toBe('tokens-studio');
			expect(result.files).toBe(mockMockedSwiftOutputFileConfig);
			expect(mockSwiftOutputFileConfig).toHaveBeenCalledWith('ios/allianz-tokens');
		});

		it('should use tokens-studio transform group for iOS compatibility', () => {
			const outputPath = '/test/path';
			const fileName = 'test-tokens';

			const result = platformIosSwiftConfig(outputPath, fileName);

			expect(result.transformGroup).toBe(TsTransformGroups.tokensStudio);
		});
	});

	describe('platform config structure validation', () => {
		it('should have all required PlatformConfig properties', () => {
			const outputPath = '/test/path';
			const fileName = 'test-tokens';

			const result = platformIosSwiftConfig(outputPath, fileName);

			// Validate structure matches PlatformConfig interface
			expect(result).toMatchObject({
				transformGroup: expect.any(String),
				buildPath: expect.any(String),
				files: expect.any(Array),
				options: expect.objectContaining({
					fileHeader: expect.any(String),
				}),
			});
		});

		it('should return valid PlatformConfig that can be used by StyleDictionary', () => {
			const outputPath = '/valid/path';
			const fileName = 'valid-tokens';

			const result = platformIosSwiftConfig(outputPath, fileName) as PlatformConfig;

			// Verify the result satisfies PlatformConfig interface requirements
			expect(typeof result.transformGroup).toBe('string');
			expect(typeof result.buildPath).toBe('string');
			expect(Array.isArray(result.files)).toBe(true);
			expect(typeof result.options).toBe('object');
			expect(result.options?.fileHeader).toBeDefined();
		});

		it('should match expected config structure from mock helper', () => {
			const outputPath = '/expected/path';
			const fileName = 'expected-tokens';
			const result = platformIosSwiftConfig(outputPath, fileName);
			const expected = createExpectedIosPlatformConfig(outputPath);

			expect(result).toEqual(expected);
		});
	});
});
