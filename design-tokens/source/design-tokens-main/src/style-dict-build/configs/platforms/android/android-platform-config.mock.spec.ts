import { PlatformConfig } from 'style-dictionary';
import { File } from 'style-dictionary';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock values for dependencies
export const mockMockedKtOutputFileConfig = [
	{
		destination: 'android/test-tokens.kt',
		format: 'compose/object',
		filter: 'excluded-tokens-filter',
	},
] as Array<File>;

export const mockMockedTsTransformGroups = 'tokens-studio';
export const mockMockedescappFileHeaderName = 'escappFileHeader';
export const mockMockedPlatformsAndroid = 'android';

/**
 * Scenario factory for standard Android platform config generation
 */
export const createStandardAndroidPlatformConfigScenario = () => {
	return {
		outputFilePath: '/dist/tokens',
		outputFileName: 'escapp-tokens',
		description: 'Standard Android platform config with typical paths',
	};
};

/**
 * Scenario factory for different path Android platform config generation
 */
export const createDifferentPathAndroidPlatformConfigScenario = () => {
	return {
		outputFilePath: '/build/output/design-tokens',
		outputFileName: 'custom-theme-tokens',
		description: 'Android platform config with different output paths',
	};
};

/**
 * Scenario factory for empty path inputs
 */
export const createEmptyPathAndroidPlatformConfigScenario = () => {
	return {
		outputFilePath: '',
		outputFileName: '',
		description: 'Android platform config with empty path inputs',
	};
};

/**
 * Scenario factory for paths with spaces
 */
export const createSpacesInPathAndroidPlatformConfigScenario = () => {
	return {
		outputFilePath: '/path with spaces/to tokens',
		outputFileName: 'tokens with spaces',
		description: 'Android platform config with spaces in paths',
	};
};

/**
 * Scenario factory for paths with special characters
 */
export const createSpecialCharsAndroidPlatformConfigScenario = () => {
	return {
		outputFilePath: '/path/with-special_chars@#/tokens',
		outputFileName: 'tokens-with_special@chars',
		description: 'Android platform config with special characters in paths',
	};
};

/**
 * Scenario factory for null input
 */
export const createNullInputAndroidPlatformConfigScenario = () => {
	return {
		outputFilePath: null as unknown as string,
		outputFileName: null as unknown as string,
		description: 'Android platform config with null inputs',
	};
};

/**
 * Scenario factory for undefined input
 */
export const createUndefinedInputAndroidPlatformConfigScenario = () => {
	return {
		outputFilePath: undefined as unknown as string,
		outputFileName: undefined as unknown as string,
		description: 'Android platform config with undefined inputs',
	};
};

/**
 * Scenario factory for very long file paths
 */
export const createLongPathAndroidPlatformConfigScenario = () => {
	return {
		outputFilePath: '/very/'.repeat(100) + 'long/path/to/tokens',
		outputFileName: 'very-long-'.repeat(50) + 'filename',
		description: 'Android platform config with very long paths',
	};
};

/**
 * Scenario factory for unicode characters in paths
 */
export const createUnicodePathAndroidPlatformConfigScenario = () => {
	return {
		outputFilePath: '/path/with/ünïcödé/characters/тökeиs',
		outputFileName: 'тökeиs-ünïcödé',
		description: 'Android platform config with unicode characters in paths',
	};
};

/**
 * Expected output structure for standard Android platform config
 */
export const createExpectedAndroidPlatformConfig = (outputFilePath: string): PlatformConfig => {
	return {
		transformGroup: mockMockedTsTransformGroups,
		buildPath: outputFilePath,
		files: mockMockedKtOutputFileConfig,
		options: {
			fileHeader: mockMockedescappFileHeaderName,
		},
	};
};
