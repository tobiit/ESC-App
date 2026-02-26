import type { File } from 'style-dictionary/types';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mocked format and filter values to replace style-dictionary/enums
export const mockMockedJavascriptEs6Format = 'javascript/es6';
export const mockMockedExcludedTokensFilterName = 'mocked-filter-name';

// Mock constants - only the ones actually used in tests
export const mockFullOutputFilePath = '/path/to/output/tokens-theme';
export const mockDifferentOutputFilePath = '/another/path/custom-output';
export const mockEmptyOutputFilePath = '';
export const mockOutputFilePathWithSpaces = '/path with spaces/tokens theme';
export const mockOutputFilePathWithSpecialChars = '/path/with-special_chars/tokens@theme#test';

// Test scenarios factory functions - only used ones
export const createStandardJsConfigScenario = () => {
	return {
		input: mockFullOutputFilePath,
		expected: [
			{
				destination: `${mockFullOutputFilePath}.js`,
				format: mockMockedJavascriptEs6Format,
				filter: mockMockedExcludedTokensFilterName,
			},
		] as File[],
	};
};

export const createDifferentPathJsConfigScenario = () => {
	return {
		input: mockDifferentOutputFilePath,
		expected: [
			{
				destination: `${mockDifferentOutputFilePath}.js`,
				format: mockMockedJavascriptEs6Format,
				filter: mockMockedExcludedTokensFilterName,
			},
		] as File[],
	};
};

export const createEmptyPathJsConfigScenario = () => {
	return {
		input: mockEmptyOutputFilePath,
		expected: [
			{
				destination: '.js',
				format: mockMockedJavascriptEs6Format,
				filter: mockMockedExcludedTokensFilterName,
			},
		] as File[],
	};
};

export const createSpacesInPathJsConfigScenario = () => {
	return {
		input: mockOutputFilePathWithSpaces,
		expected: [
			{
				destination: `${mockOutputFilePathWithSpaces}.js`,
				format: mockMockedJavascriptEs6Format,
				filter: mockMockedExcludedTokensFilterName,
			},
		] as File[],
	};
};

export const createSpecialCharsInPathJsConfigScenario = () => {
	return {
		input: mockOutputFilePathWithSpecialChars,
		expected: [
			{
				destination: `${mockOutputFilePathWithSpecialChars}.js`,
				format: mockMockedJavascriptEs6Format,
				filter: mockMockedExcludedTokensFilterName,
			},
		] as File[],
	};
};

// Edge case scenarios
export const createNullInputScenario = () => {
	return {
		input: null as unknown as string,
		expected: {
			destination: 'null.js',
			format: mockMockedJavascriptEs6Format,
			filter: mockMockedExcludedTokensFilterName,
		},
	};
};

export const createUndefinedInputScenario = () => {
	return {
		input: undefined as unknown as string,
		expected: {
			destination: 'undefined.js',
			format: mockMockedJavascriptEs6Format,
			filter: mockMockedExcludedTokensFilterName,
		},
	};
};
