// Mock data and scenario factories for SCSS output file config tests
// This file contains all mock data, return values, and type helpers used in the test suite

/**
 * Mock values for style-dictionary format enums
 */
export const mockMockedScssVariablesFormat = 'scss/variables';
export const mockMockedScssMapDeepFormat = 'scss/map-deep';

/**
 * Mock value for excluded tokens filter name from hooks
 */
export const mockMockedExcludedTokensFilterName = 'mocked-filter-name';

/**
 * Scenario factory for standard SCSS config generation
 */
export const createStandardScssConfigScenario = () => {
	return {
		input: '/dist/scss/escapp-theme',
		description: 'Standard SCSS config with typical output path',
	};
};

/**
 * Scenario factory for different path SCSS config generation
 */
export const createDifferentPathScssConfigScenario = () => {
	return {
		input: '/output/tokens/custom-theme',
		description: 'SCSS config with different output path structure',
	};
};

/**
 * Scenario factory for empty path SCSS config generation
 */
export const createEmptyPathScssConfigScenario = () => {
	return {
		input: '',
		description: 'SCSS config with empty string input',
	};
};

/**
 * Scenario factory for paths with spaces
 */
export const createSpacesInPathScssConfigScenario = () => {
	return {
		input: '/path with spaces/in name/tokens',
		description: 'SCSS config with spaces in file path',
	};
};

/**
 * Scenario factory for paths with special characters
 */
export const createSpecialCharsInPathScssConfigScenario = () => {
	return {
		input: '/path/with-special_chars@#/tokens',
		description: 'SCSS config with special characters in file path',
	};
};

/**
 * Scenario factory for null input
 */
export const createNullInputScenario = () => {
	return {
		input: null as unknown as string,
		description: 'SCSS config with null input',
	};
};

/**
 * Scenario factory for undefined input
 */
export const createUndefinedInputScenario = () => {
	return {
		input: undefined as unknown as string,
		description: 'SCSS config with undefined input',
	};
};

/**
 * Scenario factory for very long file paths
 */
export const createLongPathScssConfigScenario = () => {
	return {
		input: '/very/'.repeat(100) + 'long/path/to/tokens',
		description: 'SCSS config with very long file path',
	};
};

/**
 * Scenario factory for unicode characters in paths
 */
export const createUnicodePathScssConfigScenario = () => {
	return {
		input: '/path/with/ünïcödé/characters/тökeиs',
		description: 'SCSS config with unicode characters in file path',
	};
};
