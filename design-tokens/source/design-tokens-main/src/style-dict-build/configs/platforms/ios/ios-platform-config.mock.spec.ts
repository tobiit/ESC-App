import { PlatformConfig } from 'style-dictionary';
import { File } from 'style-dictionary';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock values for dependencies
export const mockMockedSwiftOutputFileConfig = [
	{
		destination: 'ios/test-tokens.swift',
		format: 'ios-swift/enum.swift',
		filter: 'excluded-tokens-filter',
	},
] as Array<File>;

export const mockMockedTsTransformGroups = 'tokens-studio';
export const mockMockedAllianzFileHeaderName = 'allianzFileHeader';
export const mockMockedPlatformsIos = 'ios';

/**
 * Scenario factory for standard iOS platform config generation
 */
export const createStandardIosPlatformConfigScenario = () => {
	return {
		outputFilePath: '/dist/tokens',
		outputFileName: 'allianz-tokens',
		description: 'Standard iOS platform config with typical paths',
	};
};

/**
 * Scenario factory for different path iOS platform config generation
 */
export const createDifferentPathIosPlatformConfigScenario = () => {
	return {
		outputFilePath: '/build/output/design-tokens',
		outputFileName: 'custom-theme-tokens',
		description: 'iOS platform config with different output paths',
	};
};

/**
 * Scenario factory for empty path inputs
 */
export const createEmptyPathIosPlatformConfigScenario = () => {
	return {
		outputFilePath: '',
		outputFileName: '',
		description: 'iOS platform config with empty path inputs',
	};
};

/**
 * Scenario factory for paths with spaces
 */
export const createSpacesInPathIosPlatformConfigScenario = () => {
	return {
		outputFilePath: '/path with spaces/to tokens',
		outputFileName: 'tokens with spaces',
		description: 'iOS platform config with spaces in paths',
	};
};

/**
 * Scenario factory for paths with special characters
 */
export const createSpecialCharsIosPlatformConfigScenario = () => {
	return {
		outputFilePath: '/path/with-special_chars@#/tokens',
		outputFileName: 'tokens-with_special@chars',
		description: 'iOS platform config with special characters in paths',
	};
};

/**
 * Scenario factory for null input
 */
export const createNullInputIosPlatformConfigScenario = () => {
	return {
		outputFilePath: null as unknown as string,
		outputFileName: null as unknown as string,
		description: 'iOS platform config with null inputs',
	};
};

/**
 * Scenario factory for undefined input
 */
export const createUndefinedInputIosPlatformConfigScenario = () => {
	return {
		outputFilePath: undefined as unknown as string,
		outputFileName: undefined as unknown as string,
		description: 'iOS platform config with undefined inputs',
	};
};

/**
 * Scenario factory for very long file paths
 */
export const createLongPathIosPlatformConfigScenario = () => {
	return {
		outputFilePath: '/very/'.repeat(100) + 'long/path/to/tokens',
		outputFileName: 'very-long-'.repeat(50) + 'filename',
		description: 'iOS platform config with very long paths',
	};
};

/**
 * Scenario factory for unicode characters in paths
 */
export const createUnicodePathIosPlatformConfigScenario = () => {
	return {
		outputFilePath: '/path/with/ünïcödé/characters/тökeиs',
		outputFileName: 'тökeиs-ünïcödé',
		description: 'iOS platform config with unicode characters in paths',
	};
};

/**
 * Expected output structure for standard iOS platform config
 */
export const createExpectedIosPlatformConfig = (outputFilePath: string): PlatformConfig => {
	return {
		transformGroup: mockMockedTsTransformGroups,
		buildPath: outputFilePath,
		files: mockMockedSwiftOutputFileConfig,
		options: {
			fileHeader: mockMockedAllianzFileHeaderName,
		},
	};
};
