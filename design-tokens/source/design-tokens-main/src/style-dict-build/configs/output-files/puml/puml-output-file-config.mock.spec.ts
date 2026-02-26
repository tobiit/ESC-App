import type { File } from 'style-dictionary/types';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mocked format and filter values
export const mockMockedPumlFormatName = 'mocked-puml-format';
export const mockMockedExcludedTokensFilterName = 'mocked-filter-name';

// Mock constants - only the ones actually used in tests
export const mockFullOutputFilePath = '/path/to/output/tokens-theme';
export const mockDifferentOutputFilePath = '/another/path/custom-output';
export const mockEmptyOutputFilePath = '';
export const mockOutputFilePathWithSpaces = '/path with spaces/tokens theme';
export const mockOutputFilePathWithSpecialChars = '/path/with-special_chars/tokens@theme#test';

// Test scenarios factory functions for pumlOutputFileConfig
export const createStandardPumlConfigScenario = () => {
	return {
		input: mockFullOutputFilePath,
		expected: [
			{
				destination: `${mockFullOutputFilePath}.puml`,
				format: mockMockedPumlFormatName,
				filter: mockMockedExcludedTokensFilterName,
			},
		] as File[],
	};
};

export const createDifferentPathPumlConfigScenario = () => {
	return {
		input: mockDifferentOutputFilePath,
		expected: [
			{
				destination: `${mockDifferentOutputFilePath}.puml`,
				format: mockMockedPumlFormatName,
				filter: mockMockedExcludedTokensFilterName,
			},
		] as File[],
	};
};

export const createEmptyPathPumlConfigScenario = () => {
	return {
		input: mockEmptyOutputFilePath,
		expected: [
			{
				destination: '.puml',
				format: mockMockedPumlFormatName,
				filter: mockMockedExcludedTokensFilterName,
			},
		] as File[],
	};
};

export const createSpacesInPathPumlConfigScenario = () => {
	return {
		input: mockOutputFilePathWithSpaces,
		expected: [
			{
				destination: `${mockOutputFilePathWithSpaces}.puml`,
				format: mockMockedPumlFormatName,
				filter: mockMockedExcludedTokensFilterName,
			},
		] as File[],
	};
};

export const createSpecialCharsInPathPumlConfigScenario = () => {
	return {
		input: mockOutputFilePathWithSpecialChars,
		expected: [
			{
				destination: `${mockOutputFilePathWithSpecialChars}.puml`,
				format: mockMockedPumlFormatName,
				filter: mockMockedExcludedTokensFilterName,
			},
		] as File[],
	};
};

// Edge case scenarios for pumlOutputFileConfig
export const createNullInputPumlScenario = () => {
	return {
		input: null as unknown as string,
		expected: {
			destination: 'null.puml',
			format: mockMockedPumlFormatName,
			filter: mockMockedExcludedTokensFilterName,
		},
	};
};

export const createUndefinedInputPumlScenario = () => {
	return {
		input: undefined as unknown as string,
		expected: {
			destination: 'undefined.puml',
			format: mockMockedPumlFormatName,
			filter: mockMockedExcludedTokensFilterName,
		},
	};
};
