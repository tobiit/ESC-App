import type { File } from 'style-dictionary/types';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mocked format and filter values to replace style-dictionary/enums
export const mockMockedJsonFormat = 'json';
export const mockMockedExcludedTokensFilterName = 'mocked-filter-name';

// Mock constants - only the ones actually used in tests
export const mockFullOutputFilePath = '/path/to/output/tokens-theme';
export const mockDifferentOutputFilePath = '/another/path/custom-output';
export const mockEmptyOutputFilePath = '';
export const mockOutputFilePathWithSpaces = '/path with spaces/tokens theme';
export const mockOutputFilePathWithSpecialChars = '/path/with-special_chars/tokens@theme#test';

// Test scenarios factory functions for jsonWebOutputFileConfig
export const createStandardJsonWebConfigScenario = () => {
	return {
		input: mockFullOutputFilePath,
		expected: [
			{
				destination: `${mockFullOutputFilePath}.json`,
				format: mockMockedJsonFormat,
				filter: mockMockedExcludedTokensFilterName,
			},
		] as File[],
	};
};

export const createDifferentPathJsonWebConfigScenario = () => {
	return {
		input: mockDifferentOutputFilePath,
		expected: [
			{
				destination: `${mockDifferentOutputFilePath}.json`,
				format: mockMockedJsonFormat,
				filter: mockMockedExcludedTokensFilterName,
			},
		] as File[],
	};
};

export const createEmptyPathJsonWebConfigScenario = () => {
	return {
		input: mockEmptyOutputFilePath,
		expected: [
			{
				destination: '.json',
				format: mockMockedJsonFormat,
				filter: mockMockedExcludedTokensFilterName,
			},
		] as File[],
	};
};

export const createSpacesInPathJsonWebConfigScenario = () => {
	return {
		input: mockOutputFilePathWithSpaces,
		expected: [
			{
				destination: `${mockOutputFilePathWithSpaces}.json`,
				format: mockMockedJsonFormat,
				filter: mockMockedExcludedTokensFilterName,
			},
		] as File[],
	};
};

export const createSpecialCharsInPathJsonWebConfigScenario = () => {
	return {
		input: mockOutputFilePathWithSpecialChars,
		expected: [
			{
				destination: `${mockOutputFilePathWithSpecialChars}.json`,
				format: mockMockedJsonFormat,
				filter: mockMockedExcludedTokensFilterName,
			},
		] as File[],
	};
};

// Edge case scenarios for jsonWebOutputFileConfig
export const createNullInputJsonWebScenario = () => {
	return {
		input: null as unknown as string,
		expected: {
			destination: 'null.json',
			format: mockMockedJsonFormat,
			filter: mockMockedExcludedTokensFilterName,
		},
	};
};

export const createUndefinedInputJsonWebScenario = () => {
	return {
		input: undefined as unknown as string,
		expected: {
			destination: 'undefined.json',
			format: mockMockedJsonFormat,
			filter: mockMockedExcludedTokensFilterName,
		},
	};
};

// Test scenarios factory functions for jsonToolsOutputFileConfig (empty implementation)
export const createStandardJsonToolsConfigScenario = () => {
	return {
		input: mockFullOutputFilePath,
		expected: [] as File[],
	};
};

export const createDifferentPathJsonToolsConfigScenario = () => {
	return {
		input: mockDifferentOutputFilePath,
		expected: [] as File[],
	};
};

export const createEmptyPathJsonToolsConfigScenario = () => {
	return {
		input: mockEmptyOutputFilePath,
		expected: [] as File[],
	};
};

export const createNullInputJsonToolsScenario = () => {
	return {
		input: null as unknown as string,
		expected: [] as File[],
	};
};

export const createUndefinedInputJsonToolsScenario = () => {
	return {
		input: undefined as unknown as string,
		expected: [] as File[],
	};
};
