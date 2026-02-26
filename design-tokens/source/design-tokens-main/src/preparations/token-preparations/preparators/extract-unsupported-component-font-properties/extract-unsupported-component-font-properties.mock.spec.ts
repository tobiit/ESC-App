import { jest } from '@jest/globals';
import { DesignToken } from 'style-dictionary/types';
import {
	A1TokenTypes,
	getTokenReferencePath,
	isObject,
	isSingleReferenceTokenValue,
	isTokenObject,
	isTypograhpyCompositionalToken,
	isTypograhpyReference,
	logicalTokenSetError,
	readJsonFile,
	resolveObjectPropertyValue,
	unsupportedFontPropertyLetterSpacing,
	unsupportedFontPropertyTextCase,
	unsupportedFontPropertyTextDecoration,
} from '../../../../shared/index.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock functions
export const mockedGetTokenReferencePath = getTokenReferencePath as jest.MockedFunction<typeof getTokenReferencePath>;
export const mockedIsObject = isObject as jest.MockedFunction<typeof isObject>;
export const mockedIsSingleReferenceTokenValue = isSingleReferenceTokenValue as jest.MockedFunction<typeof isSingleReferenceTokenValue>;
export const mockedIsTokenObject = isTokenObject as jest.MockedFunction<typeof isTokenObject>;
export const mockedIsTypograhpyCompositionalToken = isTypograhpyCompositionalToken as jest.MockedFunction<
	typeof isTypograhpyCompositionalToken
>;
export const mockedIsTypograhpyReference = isTypograhpyReference as jest.MockedFunction<typeof isTypograhpyReference>;
export const mockedLogicalTokenSetError = logicalTokenSetError as jest.MockedFunction<typeof logicalTokenSetError>;
export const mockedReadJsonFile = readJsonFile as jest.MockedFunction<typeof readJsonFile>;
export const mockedResolveObjectPropertyValue = resolveObjectPropertyValue as jest.MockedFunction<typeof resolveObjectPropertyValue>;

// Mock compositional typography token with unsupported properties
export const mockTypographyTokenWithUnsupportedProperties: DesignToken = {
	$type: A1TokenTypes.typography,
	$value: {
		fontFamily: 'Arial',
		fontSize: '16px',
		fontWeight: '400',
		lineHeight: '1.5',
		letterSpacing: '0.5px',
		textCase: 'uppercase',
		textDecoration: 'underline',
	},
};

// Mock compositional typography token without unsupported properties
export const mockTypographyTokenWithoutUnsupportedProperties: DesignToken = {
	$type: A1TokenTypes.typography,
	$value: {
		fontFamily: 'Arial',
		fontSize: '16px',
		fontWeight: '400',
		lineHeight: '1.5',
	},
};

// Mock reference token
export const mockTypographyReferenceToken: DesignToken = {
	$type: A1TokenTypes.typography,
	$value: '{semantic.text.body.s}',
};

// Mock non-typography token
export const mockNonTypographyToken: DesignToken = {
	$type: A1TokenTypes.spacing,
	$value: '8px',
};

// Mock compositional token set data
export const mockCompositionalTokenSetData: Record<string, object> = {
	semantic: {
		text: {
			body: {
				s: {
					$type: 'typography',
					$value: {
						fontFamily: '{semantic.font-family.body}',
						fontWeight: '{semantic.font-weight.body}',
						lineHeight: '{semantic.line-height.body.s}',
						fontSize: '{semantic.font-size.body.s}',
						letterSpacing: '{semantic.letter-spacing.body.s}',
						textCase: '{semantic.text-case.body}',
						textDecoration: '{semantic.text-decoration.body}',
					},
				},
			},
		},
	},
};

// Mock resolved token reference
export const mockResolvedTokenReference: DesignToken = {
	$type: A1TokenTypes.typography,
	$value: {
		fontFamily: 'Arial',
		fontSize: '16px',
		fontWeight: '400',
		lineHeight: '1.5',
		letterSpacing: '0.5px',
		textCase: 'uppercase',
		textDecoration: 'underline',
	},
};

// Mock token data with typography tokens
export const mockTokenFileDataWithTypography: Record<string, object> = {
	button: {
		text: {
			primary: mockTypographyTokenWithUnsupportedProperties,
			secondary: mockTypographyReferenceToken,
		},
	},
	spacing: {
		small: mockNonTypographyToken,
	},
};

// Mock token data with nested structure
export const mockTokenFileDataNested: Record<string, object> = {
	component: {
		button: {
			text: {
				primary: mockTypographyTokenWithUnsupportedProperties,
			},
		},
	},
};

// Mock token data without typography
export const mockTokenFileDataWithoutTypography: Record<string, object> = {
	spacing: {
		small: mockNonTypographyToken,
		medium: {
			$type: A1TokenTypes.spacing,
			$value: '16px',
		},
	},
};

// Mock empty token data
export const mockEmptyTokenFileData: Record<string, object> = {};

// Mock file path parts for different token layers
export const mockFilePathPartsComponents: string[] = ['tokens', 'components', 'default'];
export const mockFilePathPartsPartials: string[] = ['tokens', 'partials', 'default'];
export const mockFilePathPartsSemantic: string[] = ['tokens', 'semantic', 'color-schemes'];
export const mockFilePathPartsCore: string[] = ['tokens', 'core'];

// Mock file names
export const mockFileName = 'button.json';
export const mockFileNamePartials = 'input-field.json';

// Expected results for extracted unsupported properties
export const expectedTypographyTokenWithExtractedProperties = {
	shorthand: mockTypographyTokenWithUnsupportedProperties,
	[unsupportedFontPropertyLetterSpacing]: {
		$type: A1TokenTypes.letterSpacing,
		$value: '0.5px',
	},
	[unsupportedFontPropertyTextCase]: {
		$type: A1TokenTypes.textCase,
		$value: 'uppercase',
	},
	[unsupportedFontPropertyTextDecoration]: {
		$type: A1TokenTypes.textDecoration,
		$value: 'underline',
	},
};

// Expected results for reference token processing
export const expectedReferenceTokenResult = {
	shorthand: mockTypographyReferenceToken,
	[unsupportedFontPropertyLetterSpacing]: {
		$type: A1TokenTypes.letterSpacing,
		$value: '0.5px',
	},
	[unsupportedFontPropertyTextCase]: {
		$type: A1TokenTypes.textCase,
		$value: 'uppercase',
	},
	[unsupportedFontPropertyTextDecoration]: {
		$type: A1TokenTypes.textDecoration,
		$value: 'underline',
	},
};

// Helper functions for test scenarios
export const createTokenFileDataWithTypography = (
	typographyToken: DesignToken,
	tokenPath = 'button.text.primary',
): Record<string, object> => {
	const pathParts = tokenPath.split('.');
	let result: Record<string, object> = { [pathParts[pathParts.length - 1]]: typographyToken };

	for (let i = pathParts.length - 2; i >= 0; i--) {
		result = { [pathParts[i]]: result };
	}

	return result;
};

// Reset all mocks helper
export const resetAllMocks = (): void => {
	mockedGetTokenReferencePath.mockReset();
	mockedIsObject.mockReset();
	mockedIsSingleReferenceTokenValue.mockReset();
	mockedIsTokenObject.mockReset();
	mockedIsTypograhpyCompositionalToken.mockReset();
	mockedIsTypograhpyReference.mockReset();
	mockedLogicalTokenSetError.mockReset();
	mockedReadJsonFile.mockReset();
	mockedResolveObjectPropertyValue.mockReset();
};

// Setup default mock implementations
export const setupDefaultMocks = (): void => {
	mockedIsObject.mockImplementation(
		(value: unknown): value is object => typeof value === 'object' && value !== null && !Array.isArray(value),
	);

	mockedIsTokenObject.mockImplementation(
		(value: unknown): value is DesignToken => typeof value === 'object' && value !== null && '$value' in value && '$type' in value,
	);

	mockedIsSingleReferenceTokenValue.mockImplementation(
		($value: unknown): $value is string => typeof $value === 'string' && $value.startsWith('{') && $value.endsWith('}'),
	);

	mockedIsTypograhpyCompositionalToken.mockImplementation(
		(token: DesignToken): boolean =>
			token.$type === A1TokenTypes.typography &&
			typeof token.$value === 'object' &&
			token.$value !== null &&
			'fontFamily' in token.$value &&
			'fontSize' in token.$value &&
			'fontWeight' in token.$value &&
			'lineHeight' in token.$value,
	);

	mockedIsTypograhpyReference.mockImplementation(
		(token: DesignToken): boolean =>
			token.$type === A1TokenTypes.typography &&
			typeof token.$value === 'string' &&
			token.$value.startsWith('{') &&
			token.$value.endsWith('}'),
	);

	mockedGetTokenReferencePath.mockImplementation((tokenValue: string): string => tokenValue.replace(/[{}]/g, ''));

	mockedReadJsonFile.mockReturnValue(mockCompositionalTokenSetData);

	mockedResolveObjectPropertyValue.mockReturnValue(mockResolvedTokenReference);

	mockedLogicalTokenSetError.mockImplementation((message: string) => {
		throw new Error(message);
	});
};
