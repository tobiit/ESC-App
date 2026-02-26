import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { PlatformConfig } from 'style-dictionary';
import { jsonToolsOutputFileConfig, pumlOutputFileConfig } from '../../output-files/index.js';
import { TsTransformGroups } from '../../../enums/index.js';
import { escappFileHeaderName } from '../../../hooks/index.js';
import { Platforms } from '../../../../shared/index.js';
import { platformPumlConfig, platformToolsConfig } from './tools-platform-config.js';
import {
	createDifferentPathToolsPlatformConfigScenario,
	createEmptyPathToolsPlatformConfigScenario,
	createExpectedToolsPlatformConfig,
	createLongPathToolsPlatformConfigScenario,
	createNullInputToolsPlatformConfigScenario,
	createSpacesInPathToolsPlatformConfigScenario,
	createSpecialCharsToolsPlatformConfigScenario,
	createStandardToolsPlatformConfigScenario,
	createUndefinedInputToolsPlatformConfigScenario,
	createUnicodePathToolsPlatformConfigScenario,
	mockMockedescappFileHeaderName,
	mockMockedJsonToolsOutputFileConfig,
	mockMockedPlatformsTools,
	mockMockedTsTransformGroups,
} from './tools-platform-config.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock style-dictionary enums
jest.mock('style-dictionary/enums', () => {
	return {
		transforms: {
			attributeCti: 'attribute/cti',
			sizePx: 'size/px',
		},
	};
});

// Mock the output files dependency
jest.mock('../../output-files/index.js', () => {
	return {
		jsonToolsOutputFileConfig: jest.fn(),
		pumlOutputFileConfig: jest.fn(),
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
		escappFileHeaderName: 'escappFileHeader',
		pumlColorTransformName: 'name/puml/color',
		pumlNameTransformName: 'name/puml/constant',
	};
});

// Mock the shared dependency
jest.mock('../../../../shared/index.js', () => {
	return {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		Platforms: {
			tools: 'tools',
		},
	};
});

// Cast mocked functions with proper typing
const mockJsonToolsOutputFileConfig = jsonToolsOutputFileConfig as jest.MockedFunction<typeof jsonToolsOutputFileConfig>;
const mockPumlOutputFileConfig = pumlOutputFileConfig as jest.MockedFunction<typeof pumlOutputFileConfig>;

describe('platformToolsConfig', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		// Setup default mock return value
		mockJsonToolsOutputFileConfig.mockReturnValue(mockMockedJsonToolsOutputFileConfig);
	});

	describe('successful config generation', () => {
		it('should generate tools platform config with standard paths', () => {
			const scenario = createStandardToolsPlatformConfigScenario();

			const result = platformToolsConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result).toEqual({
				transformGroup: mockMockedTsTransformGroups,
				buildPath: scenario.outputFilePath,
				files: [mockMockedJsonToolsOutputFileConfig],
				options: {
					fileHeader: mockMockedescappFileHeaderName,
				},
			});

			// Verify jsonToolsOutputFileConfig was called with correct path
			expect(mockJsonToolsOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsTools}/${scenario.outputFileName}`);
			expect(mockJsonToolsOutputFileConfig).toHaveBeenCalledTimes(1);
		});

		it('should generate tools platform config with different paths', () => {
			const scenario = createDifferentPathToolsPlatformConfigScenario();

			const result = platformToolsConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result).toEqual({
				transformGroup: mockMockedTsTransformGroups,
				buildPath: scenario.outputFilePath,
				files: [mockMockedJsonToolsOutputFileConfig],
				options: {
					fileHeader: mockMockedescappFileHeaderName,
				},
			});

			expect(mockJsonToolsOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsTools}/${scenario.outputFileName}`);
		});

		it('should handle empty path inputs gracefully', () => {
			const scenario = createEmptyPathToolsPlatformConfigScenario();

			const result = platformToolsConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result.buildPath).toBe('');
			expect(result.transformGroup).toBe(mockMockedTsTransformGroups);
			expect(result.files).toEqual([mockMockedJsonToolsOutputFileConfig]);
			expect(result.options?.fileHeader).toBe(mockMockedescappFileHeaderName);

			expect(mockJsonToolsOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsTools}/`);
		});

		it('should handle file paths with spaces', () => {
			const scenario = createSpacesInPathToolsPlatformConfigScenario();

			const result = platformToolsConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result.buildPath).toBe(scenario.outputFilePath);
			expect(result.transformGroup).toBe(mockMockedTsTransformGroups);

			expect(mockJsonToolsOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsTools}/${scenario.outputFileName}`);
		});

		it('should handle file paths with special characters', () => {
			const scenario = createSpecialCharsToolsPlatformConfigScenario();

			const result = platformToolsConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result.buildPath).toBe(scenario.outputFilePath);
			expect(result.transformGroup).toBe(mockMockedTsTransformGroups);

			expect(mockJsonToolsOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsTools}/${scenario.outputFileName}`);
		});
	});

	describe('return value structure validation', () => {
		it('should return PlatformConfig object with correct properties', () => {
			const testOutputPath = '/test/path';
			const testFileName = 'test-tools-tokens';
			const result = platformToolsConfig(testOutputPath, testFileName);

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
			const testFileName = 'test-tools-tokens';
			const result = platformToolsConfig(testOutputPath, testFileName);

			expect(result.transformGroup).toBe(mockMockedTsTransformGroups);
		});

		it('should use the correct file header from hooks', () => {
			const testOutputPath = '/test/path';
			const testFileName = 'test-tools-tokens';
			const result = platformToolsConfig(testOutputPath, testFileName);

			expect(result.options?.fileHeader).toBe(mockMockedescappFileHeaderName);
		});

		it('should set buildPath to the provided outputFilePath', () => {
			const testOutputPath = '/custom/build/path';
			const testFileName = 'test-tools-tokens';
			const result = platformToolsConfig(testOutputPath, testFileName);

			expect(result.buildPath).toBe(testOutputPath);
		});

		it('should use files from jsonToolsOutputFileConfig wrapped in array', () => {
			const testOutputPath = '/test/path';
			const testFileName = 'test-tools-tokens';
			const result = platformToolsConfig(testOutputPath, testFileName);

			expect(result.files).toEqual([mockMockedJsonToolsOutputFileConfig]);
		});
	});

	describe('edge cases and error scenarios', () => {
		it('should handle null input by creating config with null values', () => {
			const scenario = createNullInputToolsPlatformConfigScenario();

			const result = platformToolsConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result.buildPath).toBe(null);
			expect(result.transformGroup).toBe(mockMockedTsTransformGroups);
			expect(result.files).toEqual([mockMockedJsonToolsOutputFileConfig]);

			expect(mockJsonToolsOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsTools}/null`);
		});

		it('should handle undefined input by creating config with undefined values', () => {
			const scenario = createUndefinedInputToolsPlatformConfigScenario();

			const result = platformToolsConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result.buildPath).toBe(undefined);
			expect(result.transformGroup).toBe(mockMockedTsTransformGroups);
			expect(result.files).toEqual([mockMockedJsonToolsOutputFileConfig]);

			expect(mockJsonToolsOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsTools}/undefined`);
		});

		it('should handle very long file paths', () => {
			const scenario = createLongPathToolsPlatformConfigScenario();
			const result = platformToolsConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result.buildPath).toBe(scenario.outputFilePath);
			expect(mockJsonToolsOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsTools}/${scenario.outputFileName}`);
		});

		it('should handle paths with unicode characters', () => {
			const scenario = createUnicodePathToolsPlatformConfigScenario();
			const result = platformToolsConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result.buildPath).toBe(scenario.outputFilePath);
			expect(mockJsonToolsOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsTools}/${scenario.outputFileName}`);
		});
	});

	describe('dependency integration', () => {
		it('should call jsonToolsOutputFileConfig with correct fullOutputFilePath', () => {
			const outputPath = '/test/build';
			const fileName = 'design-tools-tokens';

			platformToolsConfig(outputPath, fileName);

			expect(mockJsonToolsOutputFileConfig).toHaveBeenCalledWith('tools/design-tools-tokens');
			expect(mockJsonToolsOutputFileConfig).toHaveBeenCalledTimes(1);
		});

		it('should use TsTransformGroups.tokensStudio from enums', () => {
			const outputPath = '/test/build';
			const fileName = 'design-tools-tokens';

			const result = platformToolsConfig(outputPath, fileName);

			expect(result.transformGroup).toBe(TsTransformGroups.tokensStudio);
		});

		it('should use escappFileHeaderName from hooks', () => {
			const outputPath = '/test/build';
			const fileName = 'design-tools-tokens';

			const result = platformToolsConfig(outputPath, fileName);

			expect(result.options?.fileHeader).toBe(escappFileHeaderName);
		});

		it('should use Platforms.tools from shared enums', () => {
			const outputPath = '/test/build';
			const fileName = 'design-tools-tokens';

			platformToolsConfig(outputPath, fileName);

			// Verify that the tools platform prefix is used in the path
			expect(mockJsonToolsOutputFileConfig).toHaveBeenCalledWith(`${Platforms.tools}/${fileName}`);
		});
	});

	describe('function behavior consistency', () => {
		it('should return consistent results for same input', () => {
			const outputPath = '/consistent/test/path';
			const fileName = 'consistent-tools-tokens';

			const result1 = platformToolsConfig(outputPath, fileName);
			const result2 = platformToolsConfig(outputPath, fileName);

			expect(result1).toEqual(result2);
			expect(result1).not.toBe(result2); // Should be different objects
		});

		it('should return different buildPaths for different inputs', () => {
			const path1 = '/path/one';
			const path2 = '/path/two';
			const fileName = 'tools-tokens';

			const result1 = platformToolsConfig(path1, fileName);
			const result2 = platformToolsConfig(path2, fileName);

			expect(result1.buildPath).not.toBe(result2.buildPath);
			expect(result1.buildPath).toBe(path1);
			expect(result2.buildPath).toBe(path2);
		});

		it('should call jsonToolsOutputFileConfig with different paths for different fileNames', () => {
			mockJsonToolsOutputFileConfig.mockClear();
			const outputPath = '/test/path';
			const fileName1 = 'tools-theme1';
			const fileName2 = 'tools-theme2';

			platformToolsConfig(outputPath, fileName1);
			platformToolsConfig(outputPath, fileName2);

			expect(mockJsonToolsOutputFileConfig).toHaveBeenCalledTimes(2);
			expect(mockJsonToolsOutputFileConfig).toHaveBeenNthCalledWith(1, `tools/${fileName1}`);
			expect(mockJsonToolsOutputFileConfig).toHaveBeenNthCalledWith(2, `tools/${fileName2}`);
		});
	});

	describe('tools-specific behavior', () => {
		it('should always use "tools" platform prefix in fullOutputFilePath', () => {
			const testCases = [
				{ outputPath: '/dist', fileName: 'tokens' },
				{ outputPath: '/build/tools', fileName: 'theme-tokens' },
				{ outputPath: '', fileName: 'empty-path-tokens' },
			];

			mockJsonToolsOutputFileConfig.mockClear();

			testCases.forEach(({ outputPath, fileName }, index) => {
				platformToolsConfig(outputPath, fileName);
				expect(mockJsonToolsOutputFileConfig).toHaveBeenNthCalledWith(index + 1, `tools/${fileName}`);
			});
		});

		it('should be designed for tools token generation', () => {
			const outputPath = '/tools/tokens';
			const fileName = 'escapp-tools-tokens';

			const result = platformToolsConfig(outputPath, fileName);

			// Verify it's configured for tools development
			expect(result.transformGroup).toBe('tokens-studio');
			expect(result.files).toEqual([mockMockedJsonToolsOutputFileConfig]);
			expect(mockJsonToolsOutputFileConfig).toHaveBeenCalledWith('tools/escapp-tools-tokens');
		});

		it('should use tokens-studio transform group for tools compatibility', () => {
			const outputPath = '/test/path';
			const fileName = 'test-tools-tokens';

			const result = platformToolsConfig(outputPath, fileName);

			expect(result.transformGroup).toBe(TsTransformGroups.tokensStudio);
		});

		it('should wrap jsonToolsOutputFileConfig result in array', () => {
			const outputPath = '/test/path';
			const fileName = 'test-tools-tokens';

			const result = platformToolsConfig(outputPath, fileName);

			// Verify that the result is wrapped in an array
			expect(Array.isArray(result.files)).toBe(true);
			expect(result.files).toHaveLength(1);
			expect(result.files?.[0]).toBe(mockMockedJsonToolsOutputFileConfig);
		});
	});

	describe('platform config structure validation', () => {
		it('should have all required PlatformConfig properties', () => {
			const outputPath = '/test/path';
			const fileName = 'test-tools-tokens';

			const result = platformToolsConfig(outputPath, fileName);

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
			const fileName = 'valid-tools-tokens';

			const result = platformToolsConfig(outputPath, fileName) as PlatformConfig;

			// Verify the result satisfies PlatformConfig interface requirements
			expect(typeof result.transformGroup).toBe('string');
			expect(typeof result.buildPath).toBe('string');
			expect(Array.isArray(result.files)).toBe(true);
			expect(typeof result.options).toBe('object');
			expect(result.options?.fileHeader).toBeDefined();
		});

		it('should match expected config structure from mock helper', () => {
			const outputPath = '/expected/path';
			const fileName = 'expected-tools-tokens';
			const result = platformToolsConfig(outputPath, fileName);
			const expected = createExpectedToolsPlatformConfig(outputPath);

			expect(result).toEqual(expected);
		});
	});
});

describe('platformPumlConfig', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockPumlOutputFileConfig.mockReturnValue([]);
	});

	describe('successful config generation', () => {
		it('should generate puml platform config with standard paths', () => {
			const outputFilePath = '/dist/tools';
			const outputFileName = 'tokens';

			const result = platformPumlConfig(outputFilePath, outputFileName);

			expect(result).toBeInstanceOf(Object);
			expect(result).toHaveProperty('transformGroup', TsTransformGroups.tokensStudio);
			expect(result).toHaveProperty('transforms');
			expect(result).toHaveProperty('buildPath', outputFilePath);
			expect(result).toHaveProperty('files');
			expect(result).toHaveProperty('options');
		});

		it('should include correct transforms in order', () => {
			const result = platformPumlConfig('/dist', 'tokens');

			expect(result.transforms).toBeDefined();
			expect(Array.isArray(result.transforms)).toBe(true);
			expect(result.transforms).toHaveLength(4);
			expect(result.transforms?.[0]).toBe('attribute/cti');
			expect(result.transforms?.[1]).toBe('name/puml/constant');
			expect(result.transforms?.[2]).toBe('name/puml/color');
			expect(result.transforms?.[3]).toBe('size/px');
		});

		it('should call pumlOutputFileConfig with correct full path', () => {
			const outputFilePath = '/build/output';
			const outputFileName = 'design-tokens';

			platformPumlConfig(outputFilePath, outputFileName);

			expect(mockPumlOutputFileConfig).toHaveBeenCalledTimes(1);
			expect(mockPumlOutputFileConfig).toHaveBeenCalledWith('tools/design-tokens');
		});

		it('should set fileHeader option to escapp', () => {
			const result = platformPumlConfig('/dist', 'tokens');

			expect(result.options).toBeDefined();
			expect(result.options?.fileHeader).toBe(escappFileHeaderName);
		});

		it('should work with empty strings', () => {
			const result = platformPumlConfig('', '');

			expect(result).toBeInstanceOf(Object);
			expect(result.buildPath).toBe('');
			expect(mockPumlOutputFileConfig).toHaveBeenCalledWith('tools/');
		});

		it('should handle paths with special characters', () => {
			const outputFilePath = '/dist/@special/path-123';
			const outputFileName = 'tokens_v1.0';

			const result = platformPumlConfig(outputFilePath, outputFileName);

			expect(result.buildPath).toBe(outputFilePath);
			expect(mockPumlOutputFileConfig).toHaveBeenCalledWith('tools/tokens_v1.0');
		});
	});
});
