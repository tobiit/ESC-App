import { PlatformConfig } from 'style-dictionary';
import { File } from 'style-dictionary';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock values for dependencies
export const mockMockedJsonToolsOutputFileConfig = [] as Array<File>;

export const mockMockedTsTransformGroups = 'tokens-studio';
export const mockMockedescappFileHeaderName = 'escappFileHeader';
export const mockMockedPlatformsTools = 'tools';

/**
 * Scenario factory for standard tools platform config generation
 */
export const createStandardToolsPlatformConfigScenario = () => {
	return {
		outputFilePath: '/dist/tools',
		outputFileName: 'escapp-tools-tokens',
		description: 'Standard tools platform config with typical paths',
	};
};

/**
 * Scenario factory for different path tools platform config generation
 */
export const createDifferentPathToolsPlatformConfigScenario = () => {
	return {
		outputFilePath: '/build/output/tools-tokens',
		outputFileName: 'custom-tools-theme-tokens',
		description: 'Tools platform config with different output paths',
	};
};

/**
 * Scenario factory for empty path inputs
 */
export const createEmptyPathToolsPlatformConfigScenario = () => {
	return {
		outputFilePath: '',
		outputFileName: '',
		description: 'Tools platform config with empty path inputs',
	};
};

/**
 * Scenario factory for paths with spaces
 */
export const createSpacesInPathToolsPlatformConfigScenario = () => {
	return {
		outputFilePath: '/path with spaces/to tools',
		outputFileName: 'tools with spaces',
		description: 'Tools platform config with spaces in paths',
	};
};

/**
 * Scenario factory for paths with special characters
 */
export const createSpecialCharsToolsPlatformConfigScenario = () => {
	return {
		outputFilePath: '/path/with-special_chars@#/tools',
		outputFileName: 'tools-with_special@chars',
		description: 'Tools platform config with special characters in paths',
	};
};

/**
 * Scenario factory for null input
 */
export const createNullInputToolsPlatformConfigScenario = () => {
	return {
		outputFilePath: null as unknown as string,
		outputFileName: null as unknown as string,
		description: 'Tools platform config with null inputs',
	};
};

/**
 * Scenario factory for undefined input
 */
export const createUndefinedInputToolsPlatformConfigScenario = () => {
	return {
		outputFilePath: undefined as unknown as string,
		outputFileName: undefined as unknown as string,
		description: 'Tools platform config with undefined inputs',
	};
};

/**
 * Scenario factory for very long file paths
 */
export const createLongPathToolsPlatformConfigScenario = () => {
	return {
		outputFilePath: '/very/'.repeat(100) + 'long/path/to/tools',
		outputFileName: 'very-long-'.repeat(50) + 'tools-filename',
		description: 'Tools platform config with very long paths',
	};
};

/**
 * Scenario factory for unicode characters in paths
 */
export const createUnicodePathToolsPlatformConfigScenario = () => {
	return {
		outputFilePath: '/path/with/ünïcödé/characters/tööls',
		outputFileName: 'tööls-ünïcödé',
		description: 'Tools platform config with unicode characters in paths',
	};
};

/**
 * Expected output structure for standard tools platform config
 */
export const createExpectedToolsPlatformConfig = (outputFilePath: string): PlatformConfig => {
	return {
		transformGroup: mockMockedTsTransformGroups,
		buildPath: outputFilePath,
		files: [mockMockedJsonToolsOutputFileConfig],
		options: {
			fileHeader: mockMockedescappFileHeaderName,
		},
	};
};
