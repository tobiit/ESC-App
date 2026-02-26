// Mock data and scenario factories for Swift output file config tests
// This file contains all mock data, return values, and type helpers used in the test suite

/**
 * Mock values for style-dictionary format enums
 */
export const mockMockedIosSwiftEnumSwiftFormat = 'ios-swift/enum.swift';

/**
 * Mock value for excluded tokens filter name from hooks
 */
export const mockMockedExcludedTokensFilterName = 'mocked-filter-name';

/**
 * Scenario factory for standard Swift config generation
 */
export const createStandardSwiftConfigScenario = () => {
	return {
		input: '/dist/ios/escapp-theme',
		description: 'Standard Swift config with typical output path',
	};
};

/**
 * Scenario factory for different path Swift config generation
 */
export const createDifferentPathSwiftConfigScenario = () => {
	return {
		input: '/output/tokens/custom-theme',
		description: 'Swift config with different output path structure',
	};
};

/**
 * Scenario factory for empty path Swift config generation
 */
export const createEmptyPathSwiftConfigScenario = () => {
	return {
		input: '',
		description: 'Swift config with empty string input',
	};
};

/**
 * Scenario factory for paths with spaces
 */
export const createSpacesInPathSwiftConfigScenario = () => {
	return {
		input: '/path with spaces/in name/tokens',
		description: 'Swift config with spaces in file path',
	};
};

/**
 * Scenario factory for paths with special characters
 */
export const createSpecialCharsInPathSwiftConfigScenario = () => {
	return {
		input: '/path/with-special_chars@#/tokens',
		description: 'Swift config with special characters in file path',
	};
};

/**
 * Scenario factory for null input
 */
export const createNullInputSwiftScenario = () => {
	return {
		input: null as unknown as string,
		description: 'Swift config with null input',
	};
};

/**
 * Scenario factory for undefined input
 */
export const createUndefinedInputSwiftScenario = () => {
	return {
		input: undefined as unknown as string,
		description: 'Swift config with undefined input',
	};
};

/**
 * Scenario factory for very long file paths
 */
export const createLongPathSwiftConfigScenario = () => {
	return {
		input: '/very/'.repeat(100) + 'long/path/to/tokens',
		description: 'Swift config with very long file path',
	};
};

/**
 * Scenario factory for unicode characters in paths
 */
export const createUnicodePathSwiftConfigScenario = () => {
	return {
		input: '/path/with/ünïcödé/characters/тökeиs',
		description: 'Swift config with unicode characters in file path',
	};
};
