import type { File } from 'style-dictionary/types';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mocked format and filter values to replace style-dictionary/enums
export const mockMockedComposeObjectFormat = 'compose/object';
export const mockMockedExcludedTokensFilterName = 'mocked-filter-name';

// Mock constants - only the ones actually used in tests
export const mockFullOutputFilePath = '/path/to/output/tokens-theme';
export const mockDifferentOutputFilePath = '/another/path/custom-output';
export const mockEmptyOutputFilePath = '';
export const mockOutputFilePathWithSpaces = '/path with spaces/tokens theme';
export const mockOutputFilePathWithSpecialChars = '/path/with-special_chars/tokens@theme#test';

// Test scenarios factory functions for ktOutputFileConfig
export const createStandardKtConfigScenario = () => {
	return {
		input: mockFullOutputFilePath,
		expected: [
			{
				destination: `${mockFullOutputFilePath}.kt`,
				format: mockMockedComposeObjectFormat,
				filter: mockMockedExcludedTokensFilterName,
			},
		] as File[],
	};
};

export const createDifferentPathKtConfigScenario = () => {
	return {
		input: mockDifferentOutputFilePath,
		expected: [
			{
				destination: `${mockDifferentOutputFilePath}.kt`,
				format: mockMockedComposeObjectFormat,
				filter: mockMockedExcludedTokensFilterName,
			},
		] as File[],
	};
};

export const createEmptyPathKtConfigScenario = () => {
	return {
		input: mockEmptyOutputFilePath,
		expected: [
			{
				destination: '.kt',
				format: mockMockedComposeObjectFormat,
				filter: mockMockedExcludedTokensFilterName,
			},
		] as File[],
	};
};

export const createSpacesInPathKtConfigScenario = () => {
	return {
		input: mockOutputFilePathWithSpaces,
		expected: [
			{
				destination: `${mockOutputFilePathWithSpaces}.kt`,
				format: mockMockedComposeObjectFormat,
				filter: mockMockedExcludedTokensFilterName,
			},
		] as File[],
	};
};

export const createSpecialCharsInPathKtConfigScenario = () => {
	return {
		input: mockOutputFilePathWithSpecialChars,
		expected: [
			{
				destination: `${mockOutputFilePathWithSpecialChars}.kt`,
				format: mockMockedComposeObjectFormat,
				filter: mockMockedExcludedTokensFilterName,
			},
		] as File[],
	};
};

// Edge case scenarios for ktOutputFileConfig
export const createNullInputKtScenario = () => {
	return {
		input: null as unknown as string,
		expected: {
			destination: 'null.kt',
			format: mockMockedComposeObjectFormat,
			filter: mockMockedExcludedTokensFilterName,
		},
	};
};

export const createUndefinedInputKtScenario = () => {
	return {
		input: undefined as unknown as string,
		expected: {
			destination: 'undefined.kt',
			format: mockMockedComposeObjectFormat,
			filter: mockMockedExcludedTokensFilterName,
		},
	};
};
