import type { File } from 'style-dictionary/types';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mocked format and filter values to replace style-dictionary/enums
export const mockMockedCssVariablesFormat = 'css/variables';
export const mockMockedExcludedTokensFilterName = 'mocked-filter-name';

// Type helper for mock output file configs

// Mock constants
export const mockFullOutputFilePath = '/path/to/output/tokens-theme';
export const mockDifferentOutputFilePath = '/another/path/custom-output';
export const mockEmptyOutputFilePath = '';
export const mockOutputFilePathWithSpaces = '/path with spaces/tokens theme';
export const mockOutputFilePathWithSpecialChars = '/path/with-special_chars/tokens@theme#test';

// Mock excludedTokensFilterName - matches the actual value from the implementation
export const mockExcludedTokensFilterName = 'a1/filter/excluded';

// Mock CSS format from style-dictionary (used in tests when mocked)
export const mockCssVariablesFormat = 'css/variables';

// Mock expected File array results for different scenarios
export const mockExpectedCssFileConfigStandard: File[] = [
	{
		destination: `${mockFullOutputFilePath}.css`,
		format: mockCssVariablesFormat,
		filter: mockExcludedTokensFilterName,
	},
];

export const mockExpectedCssFileConfigDifferentPath: File[] = [
	{
		destination: `${mockDifferentOutputFilePath}.css`,
		format: mockCssVariablesFormat,
		filter: mockExcludedTokensFilterName,
	},
];

export const mockExpectedCssFileConfigEmptyPath: File[] = [
	{
		destination: '.css',
		format: mockCssVariablesFormat,
		filter: mockExcludedTokensFilterName,
	},
];

export const mockExpectedCssFileConfigWithSpaces: File[] = [
	{
		destination: `${mockOutputFilePathWithSpaces}.css`,
		format: mockCssVariablesFormat,
		filter: mockExcludedTokensFilterName,
	},
];

export const mockExpectedCssFileConfigWithSpecialChars: File[] = [
	{
		destination: `${mockOutputFilePathWithSpecialChars}.css`,
		format: mockCssVariablesFormat,
		filter: mockExcludedTokensFilterName,
	},
];

// Test scenarios factory functions
export const createStandardCssConfigScenario = () => {
	return {
		input: mockFullOutputFilePath,
		expected: mockExpectedCssFileConfigStandard,
	};
};

export const createDifferentPathCssConfigScenario = () => {
	return {
		input: mockDifferentOutputFilePath,
		expected: mockExpectedCssFileConfigDifferentPath,
	};
};

export const createEmptyPathCssConfigScenario = () => {
	return {
		input: mockEmptyOutputFilePath,
		expected: mockExpectedCssFileConfigEmptyPath,
	};
};

export const createSpacesInPathCssConfigScenario = () => {
	return {
		input: mockOutputFilePathWithSpaces,
		expected: mockExpectedCssFileConfigWithSpaces,
	};
};

export const createSpecialCharsInPathCssConfigScenario = () => {
	return {
		input: mockOutputFilePathWithSpecialChars,
		expected: mockExpectedCssFileConfigWithSpecialChars,
	};
};

// Edge case scenarios
export const createNullInputScenario = () => {
	return {
		input: null as unknown as string,
		expected: {
			destination: 'null.css',
			format: mockMockedCssVariablesFormat,
			filter: mockMockedExcludedTokensFilterName,
		},
	};
};

export const createUndefinedInputScenario = () => {
	return {
		input: undefined as unknown as string,
		expected: {
			destination: 'undefined.css',
			format: mockMockedCssVariablesFormat,
			filter: mockMockedExcludedTokensFilterName,
		},
	};
};
