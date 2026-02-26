import { expect } from '@jest/globals';
import { Config, TransformedToken } from 'style-dictionary/types';
import { A1TokenTypes } from '../../../shared/index.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock values for dependencies
export const mockA1SpecialTokenNameKeyWordsInternal = 'internal';
export const mockA1TokenTypesTextCase = 'textCase';

/**
 * Factory function to create a basic mock TransformedToken
 */
export const createBasicMockTransformedToken = (): TransformedToken => {
	return {
		name: 'test.token.name',
		path: ['test', 'token', 'name'],
		original: {
			value: '#ffffff',
			type: 'color',
		},
		value: '#ffffff',
		$type: A1TokenTypes.color,
		attributes: {},
		filePath: 'tokens/test.json',
		isSource: true,
	};
};

/**
 * Factory function to create a mock TransformedToken with internal keyword
 */
export const createInternalMockTransformedToken = (): TransformedToken => {
	return {
		...createBasicMockTransformedToken(),
		name: 'test.internal.token.name',
		path: ['test', 'internal', 'token', 'name'],
		$type: A1TokenTypes.color,
	};
};

/**
 * Factory function to create a mock TransformedToken with textCase type
 */
export const createTextCaseMockTransformedToken = (): TransformedToken => {
	return {
		...createBasicMockTransformedToken(),
		name: 'test.textcase.token',
		path: ['test', 'textcase', 'token'],
		$type: A1TokenTypes.textCase,
	};
};

/**
 * Factory function to create a mock TransformedToken with both internal and textCase
 */
export const createInternalTextCaseMockTransformedToken = (): TransformedToken => {
	return {
		...createBasicMockTransformedToken(),
		name: 'test.internal.textcase.token',
		path: ['test', 'internal', 'textcase', 'token'],
		$type: A1TokenTypes.textCase,
	};
};

/**
 * Factory function to create a mock TransformedToken with undefined name (creates partial)
 */
export const createUndefinedNameMockTransformedToken = (): Partial<TransformedToken> => {
	const token = createBasicMockTransformedToken();
	return {
		...token,
		name: undefined,
	};
};

/**
 * Factory function to create a mock TransformedToken with empty name
 */
export const createEmptyNameMockTransformedToken = (): TransformedToken => {
	return {
		...createBasicMockTransformedToken(),
		name: '',
	};
};

/**
 * Factory function to create a mock TransformedToken with null name
 */
export const createNullNameMockTransformedToken = (): Partial<TransformedToken> => {
	const token = createBasicMockTransformedToken();
	return {
		...token,
		name: null as unknown as string,
	};
};

/**
 * Factory function to create a mock TransformedToken with internal at the beginning
 */
export const createInternalAtStartMockTransformedToken = (): TransformedToken => {
	return {
		...createBasicMockTransformedToken(),
		name: 'internal.test.token',
		path: ['internal', 'test', 'token'],
		$type: A1TokenTypes.color,
	};
};

/**
 * Factory function to create a mock TransformedToken with internal at the end
 */
export const createInternalAtEndMockTransformedToken = (): TransformedToken => {
	return {
		...createBasicMockTransformedToken(),
		name: 'test.token.internal',
		path: ['test', 'token', 'internal'],
		$type: A1TokenTypes.color,
	};
};

/**
 * Factory function to create a mock TransformedToken with internal as substring (not keyword)
 */
export const createInternalSubstringMockTransformedToken = (): TransformedToken => {
	return {
		...createBasicMockTransformedToken(),
		name: 'test.internalvalue.token',
		path: ['test', 'internalvalue', 'token'],
		$type: A1TokenTypes.color,
	};
};

/**
 * Factory function to create a mock TransformedToken with different token types
 */
export const createDifferentTypeMockTransformedToken = ($type: A1TokenTypes): TransformedToken => {
	return {
		...createBasicMockTransformedToken(),
		name: `test.${$type}.token`,
		path: ['test', $type, 'token'],
		$type,
	};
};

/**
 * Factory function to create a basic mock Config
 */
export const createBasicMockConfig = (): Config => {
	return {
		source: ['tokens/**/*.json'],
		platforms: {
			web: {
				transformGroup: 'web',
				buildPath: 'dist/web/',
				files: [
					{
						destination: 'tokens.css',
						format: 'css/variables',
					},
				],
			},
		},
	};
};

/**
 * Factory function to create an empty mock Config
 */
export const createEmptyMockConfig = (): Config => {
	return {
		source: [],
		platforms: {},
	};
};

/**
 * Factory function to create a comprehensive mock Config
 */
export const createComprehensiveMockConfig = (): Config => {
	return {
		source: ['tokens/**/*.json'],
		platforms: {
			web: {
				transformGroup: 'web',
				buildPath: 'dist/web/',
				files: [
					{
						destination: 'tokens.css',
						format: 'css/variables',
						filter: 'a1/filter/excluded',
					},
				],
			},
			android: {
				transformGroup: 'android',
				buildPath: 'dist/android/',
				files: [
					{
						destination: 'tokens.xml',
						format: 'android/resources',
					},
				],
			},
		},
		include: ['included/**/*.json'],
	};
};

/**
 * Test scenario: Token should be included (no internal, no textCase)
 */
export const createIncludedTokenScenario = () => {
	return {
		token: createBasicMockTransformedToken(),
		config: createBasicMockConfig(),
		expectedResult: true,
		description: 'Regular token without internal keyword or textCase type should be included',
	};
};

/**
 * Test scenario: Token should be excluded (has internal keyword)
 */
export const createExcludedInternalTokenScenario = () => {
	return {
		token: createInternalMockTransformedToken(),
		config: createBasicMockConfig(),
		expectedResult: false,
		description: 'Token with internal keyword should be excluded',
	};
};

/**
 * Test scenario: Token should be excluded (has textCase type)
 */
export const createExcludedTextCaseTokenScenario = () => {
	return {
		token: createTextCaseMockTransformedToken(),
		config: createBasicMockConfig(),
		expectedResult: false,
		description: 'Token with textCase type should be excluded',
	};
};

/**
 * Test scenario: Token should be excluded (has both internal and textCase)
 */
export const createExcludedBothTokenScenario = () => {
	return {
		token: createInternalTextCaseMockTransformedToken(),
		config: createBasicMockConfig(),
		expectedResult: false,
		description: 'Token with both internal keyword and textCase type should be excluded',
	};
};

/**
 * Test scenario: Token with undefined name should be handled
 */
export const createUndefinedNameTokenScenario = () => {
	return {
		token: createUndefinedNameMockTransformedToken(),
		config: createBasicMockConfig(),
		expectedResult: false,
		description: 'Token with undefined name should be excluded due to internal check logic',
	};
};

/**
 * Test scenario: Token with empty name should be included
 */
export const createEmptyNameTokenScenario = () => {
	return {
		token: createEmptyNameMockTransformedToken(),
		config: createBasicMockConfig(),
		expectedResult: true,
		description: 'Token with empty name should be included',
	};
};

/**
 * Test scenario: Token with null name should be handled
 */
export const createNullNameTokenScenario = () => {
	return {
		token: createNullNameMockTransformedToken(),
		config: createBasicMockConfig(),
		expectedResult: false,
		description: 'Token with null name should be excluded due to internal check logic',
	};
};

/**
 * Test scenario: Internal keyword at start of name
 */
export const createInternalAtStartTokenScenario = () => {
	return {
		token: createInternalAtStartMockTransformedToken(),
		config: createBasicMockConfig(),
		expectedResult: false,
		description: 'Token with internal keyword at start should be excluded',
	};
};

/**
 * Test scenario: Internal keyword at end of name
 */
export const createInternalAtEndTokenScenario = () => {
	return {
		token: createInternalAtEndMockTransformedToken(),
		config: createBasicMockConfig(),
		expectedResult: false,
		description: 'Token with internal keyword at end should be excluded',
	};
};

/**
 * Test scenario: Internal as substring (not exact keyword)
 */
export const createInternalSubstringTokenScenario = () => {
	return {
		token: createInternalSubstringMockTransformedToken(),
		config: createBasicMockConfig(),
		expectedResult: false,
		description: 'Token with internal as substring should be excluded',
	};
};

/**
 * Collection of various token type scenarios for testing different A1TokenTypes
 */
export const createTokenTypeScenarios = () => {
	const tokenTypes = [
		A1TokenTypes.borderRadius,
		A1TokenTypes.borderWidth,
		A1TokenTypes.boxShadow,
		A1TokenTypes.color,
		A1TokenTypes.composition,
		A1TokenTypes.dimension,
		A1TokenTypes.fontFamilies,
		A1TokenTypes.fontSizes,
		A1TokenTypes.fontWeights,
		A1TokenTypes.letterSpacing,
		A1TokenTypes.lineHeights,
		A1TokenTypes.other,
		A1TokenTypes.sizing,
		A1TokenTypes.spacing,
		A1TokenTypes.textDecoration,
		A1TokenTypes.transition,
		A1TokenTypes.typography,
	];

	return tokenTypes.map(type => {
		return {
			token: createDifferentTypeMockTransformedToken(type),
			config: createBasicMockConfig(),
			expectedResult: true,
			description: `Token with ${type} type should be included`,
			tokenType: type,
		};
	});
};

/**
 * Collection of config scenarios for testing different Config structures
 */
export const createConfigScenarios = () => [
	{
		config: createBasicMockConfig(),
		description: 'Basic config with minimal structure',
	},
	{
		config: createEmptyMockConfig(),
		description: 'Empty config with no platforms',
	},
	{
		config: createComprehensiveMockConfig(),
		description: 'Comprehensive config with multiple platforms',
	},
];

/**
 * Expected filter object structure
 */
export const createExpectedFilterObject = () => {
	return {
		name: 'a1/filter/excluded',
		filter: expect.any(Function),
	};
};
