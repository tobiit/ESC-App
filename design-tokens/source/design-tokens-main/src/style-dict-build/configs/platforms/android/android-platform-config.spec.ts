import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { PlatformConfig } from 'style-dictionary';
import { ktOutputFileConfig } from '../../output-files/index.js';
import { TsTransformGroups } from '../../../enums/index.js';
import { allianzFileHeaderName } from '../../../hooks/index.js';
import { Platforms } from '../../../../shared/index.js';
import { platformAndroidConfig } from './android-platform-config.js';
import {
	createDifferentPathAndroidPlatformConfigScenario,
	createEmptyPathAndroidPlatformConfigScenario,
	createExpectedAndroidPlatformConfig,
	createLongPathAndroidPlatformConfigScenario,
	createNullInputAndroidPlatformConfigScenario,
	createSpacesInPathAndroidPlatformConfigScenario,
	createSpecialCharsAndroidPlatformConfigScenario,
	createStandardAndroidPlatformConfigScenario,
	createUndefinedInputAndroidPlatformConfigScenario,
	createUnicodePathAndroidPlatformConfigScenario,
	mockMockedAllianzFileHeaderName,
	mockMockedKtOutputFileConfig,
	mockMockedPlatformsAndroid,
	mockMockedTsTransformGroups,
} from './android-platform-config.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock the output files dependency
jest.mock('../../output-files/index.js', () => {
	return {
		ktOutputFileConfig: jest.fn(),
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
			android: 'android',
		},
	};
});

// Cast mocked functions with proper typing
const mockKtOutputFileConfig = ktOutputFileConfig as jest.MockedFunction<typeof ktOutputFileConfig>;

// Note: Logger mocking (suppressLoggerOutput/restoreLoggerMocks) is automatically handled by src/shared/testing/test-helpers.mock.spec.ts via jest.config.ts setupFilesAfterEnv
describe('platformAndroidConfig', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		// Setup default mock return value
		mockKtOutputFileConfig.mockReturnValue(mockMockedKtOutputFileConfig);
	});

	describe('successful config generation', () => {
		it('should generate Android platform config with standard paths', () => {
			const scenario = createStandardAndroidPlatformConfigScenario();

			const result = platformAndroidConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result).toEqual({
				transformGroup: mockMockedTsTransformGroups,
				buildPath: scenario.outputFilePath,
				files: mockMockedKtOutputFileConfig,
				options: {
					fileHeader: mockMockedAllianzFileHeaderName,
				},
			});

			// Verify ktOutputFileConfig was called with correct path
			expect(mockKtOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsAndroid}/${scenario.outputFileName}`);
			expect(mockKtOutputFileConfig).toHaveBeenCalledTimes(1);
		});

		it('should generate Android platform config with different paths', () => {
			const scenario = createDifferentPathAndroidPlatformConfigScenario();

			const result = platformAndroidConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result).toEqual({
				transformGroup: mockMockedTsTransformGroups,
				buildPath: scenario.outputFilePath,
				files: mockMockedKtOutputFileConfig,
				options: {
					fileHeader: mockMockedAllianzFileHeaderName,
				},
			});

			expect(mockKtOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsAndroid}/${scenario.outputFileName}`);
		});

		it('should handle empty path inputs gracefully', () => {
			const scenario = createEmptyPathAndroidPlatformConfigScenario();

			const result = platformAndroidConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result.buildPath).toBe('');
			expect(result.transformGroup).toBe(mockMockedTsTransformGroups);
			expect(result.files).toBe(mockMockedKtOutputFileConfig);
			expect(result.options?.fileHeader).toBe(mockMockedAllianzFileHeaderName);

			expect(mockKtOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsAndroid}/`);
		});

		it('should handle file paths with spaces', () => {
			const scenario = createSpacesInPathAndroidPlatformConfigScenario();

			const result = platformAndroidConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result.buildPath).toBe(scenario.outputFilePath);
			expect(result.transformGroup).toBe(mockMockedTsTransformGroups);

			expect(mockKtOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsAndroid}/${scenario.outputFileName}`);
		});

		it('should handle file paths with special characters', () => {
			const scenario = createSpecialCharsAndroidPlatformConfigScenario();

			const result = platformAndroidConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result.buildPath).toBe(scenario.outputFilePath);
			expect(result.transformGroup).toBe(mockMockedTsTransformGroups);

			expect(mockKtOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsAndroid}/${scenario.outputFileName}`);
		});
	});

	describe('return value structure validation', () => {
		it('should return PlatformConfig object with correct properties', () => {
			const testOutputPath = '/test/path';
			const testFileName = 'test-tokens';
			const result = platformAndroidConfig(testOutputPath, testFileName);

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
			const result = platformAndroidConfig(testOutputPath, testFileName);

			expect(result.transformGroup).toBe(mockMockedTsTransformGroups);
		});

		it('should use the correct file header from hooks', () => {
			const testOutputPath = '/test/path';
			const testFileName = 'test-tokens';
			const result = platformAndroidConfig(testOutputPath, testFileName);

			expect(result.options?.fileHeader).toBe(mockMockedAllianzFileHeaderName);
		});

		it('should set buildPath to the provided outputFilePath', () => {
			const testOutputPath = '/custom/build/path';
			const testFileName = 'test-tokens';
			const result = platformAndroidConfig(testOutputPath, testFileName);

			expect(result.buildPath).toBe(testOutputPath);
		});

		it('should use files from ktOutputFileConfig', () => {
			const testOutputPath = '/test/path';
			const testFileName = 'test-tokens';
			const result = platformAndroidConfig(testOutputPath, testFileName);

			expect(result.files).toBe(mockMockedKtOutputFileConfig);
		});
	});

	describe('edge cases and error scenarios', () => {
		it('should handle null input by creating config with null values', () => {
			const scenario = createNullInputAndroidPlatformConfigScenario();

			const result = platformAndroidConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result.buildPath).toBe(null);
			expect(result.transformGroup).toBe(mockMockedTsTransformGroups);
			expect(result.files).toBe(mockMockedKtOutputFileConfig);

			expect(mockKtOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsAndroid}/null`);
		});

		it('should handle undefined input by creating config with undefined values', () => {
			const scenario = createUndefinedInputAndroidPlatformConfigScenario();

			const result = platformAndroidConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result.buildPath).toBe(undefined);
			expect(result.transformGroup).toBe(mockMockedTsTransformGroups);
			expect(result.files).toBe(mockMockedKtOutputFileConfig);

			expect(mockKtOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsAndroid}/undefined`);
		});

		it('should handle very long file paths', () => {
			const scenario = createLongPathAndroidPlatformConfigScenario();
			const result = platformAndroidConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result.buildPath).toBe(scenario.outputFilePath);
			expect(mockKtOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsAndroid}/${scenario.outputFileName}`);
		});

		it('should handle paths with unicode characters', () => {
			const scenario = createUnicodePathAndroidPlatformConfigScenario();
			const result = platformAndroidConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result.buildPath).toBe(scenario.outputFilePath);
			expect(mockKtOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsAndroid}/${scenario.outputFileName}`);
		});
	});

	describe('dependency integration', () => {
		it('should call ktOutputFileConfig with correct fullOutputFilePath', () => {
			const outputPath = '/test/build';
			const fileName = 'design-tokens';

			platformAndroidConfig(outputPath, fileName);

			expect(mockKtOutputFileConfig).toHaveBeenCalledWith('android/design-tokens');
			expect(mockKtOutputFileConfig).toHaveBeenCalledTimes(1);
		});

		it('should use TsTransformGroups.tokensStudio from enums', () => {
			const outputPath = '/test/build';
			const fileName = 'design-tokens';

			const result = platformAndroidConfig(outputPath, fileName);

			expect(result.transformGroup).toBe(TsTransformGroups.tokensStudio);
		});

		it('should use allianzFileHeaderName from hooks', () => {
			const outputPath = '/test/build';
			const fileName = 'design-tokens';

			const result = platformAndroidConfig(outputPath, fileName);

			expect(result.options?.fileHeader).toBe(allianzFileHeaderName);
		});

		it('should use Platforms.android from shared enums', () => {
			const outputPath = '/test/build';
			const fileName = 'design-tokens';

			platformAndroidConfig(outputPath, fileName);

			// Verify that the android platform prefix is used in the path
			expect(mockKtOutputFileConfig).toHaveBeenCalledWith(`${Platforms.android}/${fileName}`);
		});
	});

	describe('function behavior consistency', () => {
		it('should return consistent results for same input', () => {
			const outputPath = '/consistent/test/path';
			const fileName = 'consistent-tokens';

			const result1 = platformAndroidConfig(outputPath, fileName);
			const result2 = platformAndroidConfig(outputPath, fileName);

			expect(result1).toEqual(result2);
			expect(result1).not.toBe(result2); // Should be different objects
		});

		it('should return different buildPaths for different inputs', () => {
			const path1 = '/path/one';
			const path2 = '/path/two';
			const fileName = 'tokens';

			const result1 = platformAndroidConfig(path1, fileName);
			const result2 = platformAndroidConfig(path2, fileName);

			expect(result1.buildPath).not.toBe(result2.buildPath);
			expect(result1.buildPath).toBe(path1);
			expect(result2.buildPath).toBe(path2);
		});

		it('should call ktOutputFileConfig with different paths for different fileNames', () => {
			mockKtOutputFileConfig.mockClear();
			const outputPath = '/test/path';
			const fileName1 = 'tokens-theme1';
			const fileName2 = 'tokens-theme2';

			platformAndroidConfig(outputPath, fileName1);
			platformAndroidConfig(outputPath, fileName2);

			expect(mockKtOutputFileConfig).toHaveBeenCalledTimes(2);
			expect(mockKtOutputFileConfig).toHaveBeenNthCalledWith(1, `android/${fileName1}`);
			expect(mockKtOutputFileConfig).toHaveBeenNthCalledWith(2, `android/${fileName2}`);
		});
	});

	describe('Android-specific behavior', () => {
		it('should always use "android" platform prefix in fullOutputFilePath', () => {
			const testCases = [
				{ outputPath: '/dist', fileName: 'tokens' },
				{ outputPath: '/build/android', fileName: 'theme-tokens' },
				{ outputPath: '', fileName: 'empty-path-tokens' },
			];

			mockKtOutputFileConfig.mockClear();

			testCases.forEach(({ outputPath, fileName }, index) => {
				platformAndroidConfig(outputPath, fileName);
				expect(mockKtOutputFileConfig).toHaveBeenNthCalledWith(index + 1, `android/${fileName}`);
			});
		});

		it('should be designed for Android/Kotlin token generation', () => {
			const outputPath = '/android/tokens';
			const fileName = 'allianz-tokens';

			const result = platformAndroidConfig(outputPath, fileName);

			// Verify it's configured for Android development
			expect(result.transformGroup).toBe('tokens-studio');
			expect(result.files).toBe(mockMockedKtOutputFileConfig);
			expect(mockKtOutputFileConfig).toHaveBeenCalledWith('android/allianz-tokens');
		});

		it('should use tokens-studio transform group for Android compatibility', () => {
			const outputPath = '/test/path';
			const fileName = 'test-tokens';

			const result = platformAndroidConfig(outputPath, fileName);

			expect(result.transformGroup).toBe(TsTransformGroups.tokensStudio);
		});
	});

	describe('platform config structure validation', () => {
		it('should have all required PlatformConfig properties', () => {
			const outputPath = '/test/path';
			const fileName = 'test-tokens';

			const result = platformAndroidConfig(outputPath, fileName);

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

			const result = platformAndroidConfig(outputPath, fileName) as PlatformConfig;

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
			const result = platformAndroidConfig(outputPath, fileName);
			const expected = createExpectedAndroidPlatformConfig(outputPath);

			expect(result).toEqual(expected);
		});
	});
});
