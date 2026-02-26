import { Config, TransformedToken } from 'style-dictionary/types';
import { A1TokenTypes, extensionPropertyName, tokenStudioTokenExtensionPropertyName } from '../../../../shared/index.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

/**
 * Factory function to create a basic mock Config
 */
export const createBasicMockConfig = (): Config =>
	({
		platforms: {},
		hooks: {},
		parsers: [],
		preprocessors: [],
		transform: {},
		transformGroup: {},
		format: {},
		fileHeader: {},
		filter: {},
		action: {},
	}) as Config;

/**
 * Factory function to create a basic TransformedToken
 */
export const createBasicTransformedToken = (name: string, $type: A1TokenTypes, $value: unknown = '16px'): TransformedToken => {
	return {
		name,
		path: name.split('-'),
		original: {
			value: $value,
			type: $type,
		},
		$value,
		$type,
		attributes: {},
		filePath: 'tokens/test.json',
		isSource: true,
	};
};

/**
 * Factory function to create a token without a name
 */
export const createTokenWithoutName = (): TransformedToken => {
	const token = createBasicTransformedToken('test-token', A1TokenTypes.dimension);
	delete (token as Partial<TransformedToken>).name;
	return token;
};

/**
 * Factory function to create a token with $extensions already set
 */
export const createTokenWithExtensions = (): TransformedToken => {
	const token = createBasicTransformedToken('component-inset-all', A1TokenTypes.dimension);
	token[extensionPropertyName] = {
		[tokenStudioTokenExtensionPropertyName]: {
			originalType: A1TokenTypes.spacing,
		},
		existingProperty: 'existingValue',
	};
	return token;
};

/**
 * Factory function to create a token with custom type different from conventional type
 */
export const createTokenWithDifferentCustomType = (): TransformedToken => {
	const token = createBasicTransformedToken('component-inset-all', A1TokenTypes.spacing);
	token[extensionPropertyName] = {
		[tokenStudioTokenExtensionPropertyName]: {
			originalType: A1TokenTypes.spacing,
		},
	};
	return token;
};

/**
 * Factory function to create a token with custom type same as conventional type
 */
export const createTokenWithSameCustomType = (): TransformedToken => {
	const token = createBasicTransformedToken('component-color-primary', A1TokenTypes.color);
	token[extensionPropertyName] = {
		[tokenStudioTokenExtensionPropertyName]: {
			originalType: A1TokenTypes.color,
		},
	};
	return token;
};

/**
 * Factory function to create a token without studio.tokens extension
 */
export const createTokenWithoutStudioTokensExtension = (): TransformedToken => {
	const token = createBasicTransformedToken('component-inset-all', A1TokenTypes.dimension);
	return token;
};

// Test scenarios for filter function
export const filterTestScenarios = [
	{
		description: 'should return true for token with name',
		token: createBasicTransformedToken('test-token', A1TokenTypes.dimension),
		expected: true,
	},
	{
		description: 'should return false for token without name',
		token: createTokenWithoutName(),
		expected: false,
	},
];

// Test scenarios for transform function
export const transformTestScenarios = [
	{
		description: 'should return token $value',
		token: createBasicTransformedToken('test-token', A1TokenTypes.dimension, '24px'),
		expectedValue: '24px',
	},
	{
		description: 'should add a1Customs extension when custom type differs from conventional type',
		token: createTokenWithDifferentCustomType(),
		expectedValue: '16px',
		shouldHaveA1Customs: true,
		expectedCustomType: A1TokenTypes.inset,
	},
	{
		description: 'should not add a1Customs extension when custom type is same as conventional type',
		token: createTokenWithSameCustomType(),
		expectedValue: '16px',
		shouldHaveA1Customs: false,
	},
	{
		description: 'should preserve existing $extensions properties',
		token: createTokenWithExtensions(),
		expectedValue: '16px',
		shouldHaveA1Customs: true,
		shouldPreserveExisting: true,
	},
	{
		description: 'should handle token without studio.tokens extension using $type',
		token: createTokenWithoutStudioTokensExtension(),
		expectedValue: '16px',
		shouldHaveA1Customs: true,
		expectedCustomType: A1TokenTypes.inset,
	},
];

export const mockConfig = createBasicMockConfig();
