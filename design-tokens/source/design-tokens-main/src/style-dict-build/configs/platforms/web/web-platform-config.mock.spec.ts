import { PlatformConfig } from 'style-dictionary';
import { File } from 'style-dictionary';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock values for dependencies
export const mockMockedCssOutputFileConfig = [
	{
		destination: 'web/test-tokens.css',
		format: 'css/variables',
		filter: 'excluded-tokens-filter',
	},
] as Array<File>;

export const mockMockedScssOutputFileConfig = [
	{
		destination: 'web/test-tokens.scss',
		format: 'scss/variables',
		filter: 'excluded-tokens-filter',
	},
] as Array<File>;

export const mockMockedJsOutputFileConfig = [
	{
		destination: 'web/test-tokens.js',
		format: 'javascript/es6',
		filter: 'excluded-tokens-filter',
	},
] as Array<File>;

export const mockMockedJsonWebOutputFileConfig = [
	{
		destination: 'web/test-tokens.json',
		format: 'json',
		filter: 'excluded-tokens-filter',
	},
] as Array<File>;

export const mockMockedTsTransformGroups = 'tokens-studio';
export const mockMockedescappFileHeaderName = 'escappFileHeader';
export const mockMockedPlatformsWeb = 'web';

// Transform names from style-dictionary
export const mockMockedTransformsNameCamel = 'name/camel';
export const mockMockedTransformsNameKebab = 'name/kebab';

// Transform names from hooks
export const mockMockedTransformTo8DigitHexValuesTransformName = 'transformTo8DigitHexValues';
export const mockMockedCubicBezierWrapTransformName = 'cubicBezierWrap';
export const mockMockedLowerCaseLinearGradientTransformName = 'lowerCaseLinearGradient';
export const mockMockedInsetShorthandCalcFixTransformName = 'insetShorthandCalcFix';
export const mockMockedMetaInfoEnrichTransformName = 'a1/meta-info-enrich';

/**
 * Scenario factory for standard web JS platform config generation
 */
export const createStandardWebJsPlatformConfigScenario = () => {
	return {
		outputFilePath: '/dist/web/js',
		outputFileName: 'escapp-web-tokens',
		description: 'Standard web JS platform config with typical paths',
	};
};

/**
 * Scenario factory for standard web style platform config generation
 */
export const createStandardWebStylePlatformConfigScenario = () => {
	return {
		outputFilePath: '/dist/web/styles',
		outputFileName: 'escapp-style-tokens',
		description: 'Standard web style platform config with typical paths',
	};
};

/**
 * Scenario factory for different path web JS platform config generation
 */
export const createDifferentPathWebJsPlatformConfigScenario = () => {
	return {
		outputFilePath: '/build/output/web-js-tokens',
		outputFileName: 'custom-js-theme-tokens',
		description: 'Web JS platform config with different output paths',
	};
};

/**
 * Scenario factory for different path web style platform config generation
 */
export const createDifferentPathWebStylePlatformConfigScenario = () => {
	return {
		outputFilePath: '/build/output/web-style-tokens',
		outputFileName: 'custom-style-theme-tokens',
		description: 'Web style platform config with different output paths',
	};
};

/**
 * Scenario factory for empty path inputs
 */
export const createEmptyPathWebPlatformConfigScenario = () => {
	return {
		outputFilePath: '',
		outputFileName: '',
		description: 'Web platform config with empty path inputs',
	};
};

/**
 * Scenario factory for paths with spaces
 */
export const createSpacesInPathWebPlatformConfigScenario = () => {
	return {
		outputFilePath: '/path with spaces/to web',
		outputFileName: 'web with spaces',
		description: 'Web platform config with spaces in paths',
	};
};

/**
 * Scenario factory for paths with special characters
 */
export const createSpecialCharsWebPlatformConfigScenario = () => {
	return {
		outputFilePath: '/path/with-special_chars@#/web',
		outputFileName: 'web-with_special@chars',
		description: 'Web platform config with special characters in paths',
	};
};

/**
 * Scenario factory for null input
 */
export const createNullInputWebPlatformConfigScenario = () => {
	return {
		outputFilePath: null as unknown as string,
		outputFileName: null as unknown as string,
		description: 'Web platform config with null inputs',
	};
};

/**
 * Scenario factory for undefined input
 */
export const createUndefinedInputWebPlatformConfigScenario = () => {
	return {
		outputFilePath: undefined as unknown as string,
		outputFileName: undefined as unknown as string,
		description: 'Web platform config with undefined inputs',
	};
};

/**
 * Scenario factory for very long file paths
 */
export const createLongPathWebPlatformConfigScenario = () => {
	return {
		outputFilePath: '/very/'.repeat(100) + 'long/path/to/web',
		outputFileName: 'very-long-'.repeat(50) + 'web-filename',
		description: 'Web platform config with very long paths',
	};
};

/**
 * Scenario factory for unicode characters in paths
 */
export const createUnicodePathWebPlatformConfigScenario = () => {
	return {
		outputFilePath: '/path/with/ünïcödé/characters/wëb',
		outputFileName: 'wëb-ünïcödé',
		description: 'Web platform config with unicode characters in paths',
	};
};

/**
 * Expected output structure for standard web JS platform config
 */
export const createExpectedWebJsPlatformConfig = (outputFilePath: string): PlatformConfig => {
	return {
		transformGroup: mockMockedTsTransformGroups,
		transforms: [
			mockMockedTransformsNameCamel,
			mockMockedTransformTo8DigitHexValuesTransformName,
			mockMockedCubicBezierWrapTransformName,
			mockMockedLowerCaseLinearGradientTransformName,
			mockMockedInsetShorthandCalcFixTransformName,
		],
		buildPath: outputFilePath,
		files: mockMockedJsOutputFileConfig,
		options: {
			fileHeader: mockMockedescappFileHeaderName,
		},
	};
};

/**
 * Expected output structure for standard web style platform config
 */
export const createExpectedWebStylePlatformConfig = (outputFilePath: string): PlatformConfig => {
	return {
		transformGroup: mockMockedTsTransformGroups,
		transforms: [
			mockMockedTransformsNameKebab,
			mockMockedTransformTo8DigitHexValuesTransformName,
			mockMockedCubicBezierWrapTransformName,
			mockMockedLowerCaseLinearGradientTransformName,
			mockMockedInsetShorthandCalcFixTransformName,
			mockMockedMetaInfoEnrichTransformName,
		],
		buildPath: outputFilePath,
		files: [...mockMockedCssOutputFileConfig, ...mockMockedScssOutputFileConfig, ...mockMockedJsonWebOutputFileConfig],
		options: {
			fileHeader: mockMockedescappFileHeaderName,
		},
	};
};
