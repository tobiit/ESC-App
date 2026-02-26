import { jest } from '@jest/globals';
import { DesignToken } from 'style-dictionary/types';
import { A1TokenTypes, isObject, isTokenObject, isTypograhpyCompositionalToken } from '../../../../shared/index.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock functions
export const mockedIsObject = isObject as jest.MockedFunction<typeof isObject>;
export const mockedIsTokenObject = isTokenObject as jest.MockedFunction<typeof isTokenObject>;
export const mockedIsTypograhpyCompositionalToken = isTypograhpyCompositionalToken as jest.MockedFunction<
	typeof isTypograhpyCompositionalToken
>;

// Mock compositional typography token with all unsupported properties
export const mockTypographyTokenWithAllUnsupportedProperties: DesignToken = {
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

// Mock compositional typography token with only letterSpacing
export const mockTypographyTokenWithLetterSpacing: DesignToken = {
	$type: A1TokenTypes.typography,
	$value: {
		fontFamily: 'Arial',
		fontSize: '16px',
		fontWeight: '400',
		lineHeight: '1.5',
		letterSpacing: '0.5px',
	},
};

// Mock compositional typography token with only textCase
export const mockTypographyTokenWithTextCase: DesignToken = {
	$type: A1TokenTypes.typography,
	$value: {
		fontFamily: 'Arial',
		fontSize: '16px',
		fontWeight: '400',
		lineHeight: '1.5',
		textCase: 'uppercase',
	},
};

// Mock compositional typography token with only textDecoration
export const mockTypographyTokenWithTextDecoration: DesignToken = {
	$type: A1TokenTypes.typography,
	$value: {
		fontFamily: 'Arial',
		fontSize: '16px',
		fontWeight: '400',
		lineHeight: '1.5',
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

// Mock reference typography token (not compositional)
export const mockTypographyReferenceToken: DesignToken = {
	$type: A1TokenTypes.typography,
	$value: '{semantic.text.body.s}',
};

// Mock non-typography token
export const mockNonTypographyToken: DesignToken = {
	$type: A1TokenTypes.spacing,
	$value: '8px',
};

// Mock non-token object
export const mockNonTokenObject: Record<string, unknown> = {
	someProperty: 'value',
	anotherProperty: {
		nestedValue: 'test',
	},
};

// Mock empty object
export const mockEmptyObject: Record<string, object> = {};

// Mock token set with mixed content
export const mockTokenSetWithMixedContent: Record<string, unknown> = {
	typography: {
		body: {
			primary: mockTypographyTokenWithAllUnsupportedProperties,
			secondary: mockTypographyTokenWithLetterSpacing,
		},
		heading: {
			h1: mockTypographyTokenWithTextCase,
			h2: mockTypographyTokenWithTextDecoration,
			h3: mockTypographyTokenWithoutUnsupportedProperties,
			h4: mockTypographyReferenceToken,
		},
	},
	spacing: {
		small: mockNonTypographyToken,
		medium: {
			$type: A1TokenTypes.spacing,
			$value: '16px',
		},
	},
	nonTokenContent: mockNonTokenObject,
	primitiveValue: 'some string',
	numberValue: 42,
	booleanValue: true,
	nullValue: null,
	undefinedValue: undefined,
};

// Mock deeply nested token set
export const mockDeeplyNestedTokenSet: Record<string, object> = {
	level1: {
		level2: {
			level3: {
				level4: {
					typography: mockTypographyTokenWithAllUnsupportedProperties,
					spacing: mockNonTypographyToken,
					nested: {
						typography: mockTypographyTokenWithLetterSpacing,
					},
				},
			},
		},
	},
};

// Mock token set with only compositional typography tokens
export const mockTokenSetWithOnlyCompositionalTypography: Record<string, object> = {
	heading: {
		h1: mockTypographyTokenWithAllUnsupportedProperties,
		h2: mockTypographyTokenWithLetterSpacing,
	},
	body: {
		primary: mockTypographyTokenWithTextCase,
		secondary: mockTypographyTokenWithTextDecoration,
	},
};

// Mock token set with only non-typography tokens
export const mockTokenSetWithoutTypography: Record<string, object> = {
	spacing: {
		small: mockNonTypographyToken,
		medium: {
			$type: A1TokenTypes.spacing,
			$value: '16px',
		},
	},
	colors: {
		primary: {
			$type: A1TokenTypes.color,
			$value: '#ff0000',
		},
	},
};

// Mock token set with only reference typography tokens
export const mockTokenSetWithOnlyReferenceTypography: Record<string, object> = {
	typography: {
		body: mockTypographyReferenceToken,
		heading: {
			$type: A1TokenTypes.typography,
			$value: '{semantic.text.heading.l}',
		},
	},
};

// Expected results after removing unsupported properties
export const expectedTypographyTokenWithoutUnsupportedPropertiesResult: DesignToken = {
	$type: A1TokenTypes.typography,
	$value: {
		fontFamily: 'Arial',
		fontSize: '16px',
		fontWeight: '400',
		lineHeight: '1.5',
	},
};

export const expectedTokenSetWithMixedContentResult: Record<string, unknown> = {
	typography: {
		body: {
			primary: expectedTypographyTokenWithoutUnsupportedPropertiesResult,
			secondary: {
				$type: A1TokenTypes.typography,
				$value: {
					fontFamily: 'Arial',
					fontSize: '16px',
					fontWeight: '400',
					lineHeight: '1.5',
				},
			},
		},
		heading: {
			h1: {
				$type: A1TokenTypes.typography,
				$value: {
					fontFamily: 'Arial',
					fontSize: '16px',
					fontWeight: '400',
					lineHeight: '1.5',
				},
			},
			h2: {
				$type: A1TokenTypes.typography,
				$value: {
					fontFamily: 'Arial',
					fontSize: '16px',
					fontWeight: '400',
					lineHeight: '1.5',
				},
			},
			h3: mockTypographyTokenWithoutUnsupportedProperties,
			h4: mockTypographyReferenceToken,
		},
	},
	spacing: {
		small: mockNonTypographyToken,
		medium: {
			$type: A1TokenTypes.spacing,
			$value: '16px',
		},
	},
	nonTokenContent: mockNonTokenObject,
	primitiveValue: 'some string',
	numberValue: 42,
	booleanValue: true,
	nullValue: null,
	undefinedValue: undefined,
};

// Helper function to create a token set with a specific typography token
export const createTokenSetWithTypography = (typographyToken: DesignToken, tokenPath = 'button.text.primary'): Record<string, object> => {
	const pathParts = tokenPath.split('.');
	let result: Record<string, object> = { [pathParts[pathParts.length - 1]]: typographyToken };

	for (let i = pathParts.length - 2; i >= 0; i--) {
		result = { [pathParts[i]]: result };
	}

	return result;
};

// Helper function to create a deep copy of a token for mutation testing
export const createDeepCopyOfToken = (token: DesignToken): DesignToken => JSON.parse(JSON.stringify(token));

// Reset all mocks helper
export const resetAllMocks = (): void => {
	mockedIsObject.mockReset();
	mockedIsTokenObject.mockReset();
	mockedIsTypograhpyCompositionalToken.mockReset();
};

// Setup default mock implementations
export const setupDefaultMocks = (): void => {
	mockedIsObject.mockImplementation(
		(value: unknown): value is object => typeof value === 'object' && value !== null && !Array.isArray(value),
	);

	mockedIsTokenObject.mockImplementation(
		(value: unknown): value is DesignToken => typeof value === 'object' && value !== null && '$value' in value && '$type' in value,
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
};

// Mock implementation for testing error paths
export const setupMockImplementationsForErrorPaths = (): void => {
	// Mock that causes isObject to return false for specific test cases
	mockedIsObject.mockImplementation((value: unknown): value is object => {
		if (value === 'trigger-false-path') {
			return false;
		}
		return typeof value === 'object' && value !== null && !Array.isArray(value);
	});

	// Mock that causes isTokenObject to return false for specific test cases
	mockedIsTokenObject.mockImplementation((value: unknown): value is DesignToken => {
		if (value === 'trigger-non-token-path') {
			return false;
		}
		return typeof value === 'object' && value !== null && '$value' in value && '$type' in value;
	});

	// Mock that causes isTypograhpyCompositionalToken to return false for specific test cases
	mockedIsTypograhpyCompositionalToken.mockImplementation((token: DesignToken): boolean => {
		if ((token as unknown) === 'trigger-non-compositional-path') {
			return false;
		}
		return (
			token.$type === A1TokenTypes.typography &&
			typeof token.$value === 'object' &&
			token.$value !== null &&
			'fontFamily' in token.$value &&
			'fontSize' in token.$value &&
			'fontWeight' in token.$value &&
			'lineHeight' in token.$value
		);
	});
};
