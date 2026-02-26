import { A1TokenTypes, TokenLayers } from '../../../shared/enums';
import type { Config, DesignToken, PlatformConfig, PreprocessedTokens } from 'style-dictionary/types';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Helper function to create mock tokens with proper typing
const createMockToken = ($value: string, $type: string): DesignToken => {
	return {
		$value,
		$type,
	};
};

// Mock configuration objects
export const mockConfig: Config = {
	source: ['tokens/**/*.json'],
	platforms: {},
};

export const mockPlatformConfig: PlatformConfig = {
	transformGroup: 'web',
	buildPath: 'build/',
	files: [
		{
			destination: 'variables.css',
			format: 'css/variables',
		},
	],
};

// Mock token objects for testing
export const mockTokenWithMathFunction = createMockToken(
	'roundTo({semantic.internal.font-size.base} / {semantic.internal.font-size.shrink-ratio.body})',
	A1TokenTypes.fontSizes,
);

export const mockTokenWithoutMathFunction = createMockToken('16px', A1TokenTypes.fontSizes);

export const mockLineHeightTokenWithMath = createMockToken(
	'ceil(({semantic.font-size.body.s} * {semantic.internal.line-height.factor} + {semantic.internal.line-height.cushion.body}) / {semantic.internal.grid.baseline.body}) * {semantic.internal.grid.baseline.body}',
	A1TokenTypes.lineHeights,
);

export const mockSpacingTokenWithMinFunction = createMockToken('min({core.dimension.200}, {core.dimension.300})', A1TokenTypes.spacing);

export const mockSpacingTokenWithFloorFunction = createMockToken('floor({core.dimension.600} / 2)', A1TokenTypes.spacing);

// Mock referenced tokens for resolution
export const mockReferencedTokens = new Map([
	['semantic.internal.font-size.base', createMockToken('16', 'fontSizes')],
	['semantic.internal.font-size.shrink-ratio.body', createMockToken('1.125', 'other')],
	['semantic.internal.font-size.growth-ratio.body', createMockToken('1.25', 'other')],
	['semantic.internal.line-height.factor', createMockToken('1.4', 'other')],
	['semantic.internal.line-height.cushion.body', createMockToken('2', 'other')],
	['semantic.internal.grid.baseline.body', createMockToken('4', 'other')],
	['core.dimension.200', createMockToken('8', 'dimension')],
	['core.dimension.300', createMockToken('12', 'dimension')],
	['core.dimension.600', createMockToken('24', 'dimension')],
	['semantic.font-size.body.m', createMockToken('16', 'fontSizes')],
	['semantic.font-size.body.s', createMockToken('14', 'fontSizes')],
]);

// Mock resolved calculation results
export const mockCalculationResults = new Map([
	['roundTo(16 / 1.125)', '14'],
	['roundTo(16 * 1.25)', '20'],
	['roundTo(16 / 1.2)', '13'],
	['ceil((14 * 1.4 + 2) / 4) * 4', '24'],
	['min(8, 12)', '8'],
	['floor(24 / 2)', '12'],
]);

// Simple mock token data structures for testing
export const mockTokenDataWithMathFunctions: PreprocessedTokens = {
	[TokenLayers.semantic]: {
		fontSize: {
			bodyS: mockTokenWithMathFunction,
		},
		lineHeight: {
			bodyS: mockLineHeightTokenWithMath,
		},
		spacing: {
			dynamicS: mockSpacingTokenWithMinFunction,
			dynamicL: mockSpacingTokenWithFloorFunction,
		},
	},
};

export const mockTokenDataWithoutMathFunctions: PreprocessedTokens = {
	[TokenLayers.semantic]: {
		fontSize: {
			base: mockTokenWithoutMathFunction,
		},
	},
};

export const mockTokenDataWithoutSemanticLayer: PreprocessedTokens = {
	[TokenLayers.core]: {
		dimension: {
			base: createMockToken('16', 'dimension'),
		},
	},
};

// Mock complex token structure with nested properties for comprehensive testing
export const mockComplexTokenStructure: PreprocessedTokens = {};

// Initialize complex structure programmatically to avoid property naming issues
mockComplexTokenStructure[TokenLayers.core] = {
	dimension: {},
};

mockComplexTokenStructure[TokenLayers.semantic] = {
	internal: {
		fontSize: {
			base: createMockToken('16', 'fontSizes'),
		},
	},
	fontSize: {
		body: {},
	},
	lineHeight: {
		body: {},
	},
	spacing: {},
};

// Add dimension tokens
const dimensionTokens = mockComplexTokenStructure[TokenLayers.core]['dimension'] as Record<string, DesignToken>;
dimensionTokens['200'] = createMockToken('8', 'dimension');
dimensionTokens['300'] = createMockToken('12', 'dimension');
dimensionTokens['600'] = createMockToken('24', 'dimension');

// Add font-size tokens with math functions
const bodyFontSizeTokens = (mockComplexTokenStructure[TokenLayers.semantic]['fontSize'] as Record<string, unknown>)['body'] as Record<
	string,
	DesignToken
>;
bodyFontSizeTokens['s'] = createMockToken(
	'roundTo({semantic.internal.font-size.base} / {semantic.internal.font-size.shrink-ratio.body})',
	A1TokenTypes.fontSizes,
);
bodyFontSizeTokens['m'] = createMockToken('{semantic.internal.font-size.base}', A1TokenTypes.fontSizes);

// Add line-height tokens with math functions
const bodyLineHeightTokens = (mockComplexTokenStructure[TokenLayers.semantic]['lineHeight'] as Record<string, unknown>)['body'] as Record<
	string,
	DesignToken
>;
bodyLineHeightTokens['s'] = mockLineHeightTokenWithMath;

// Add spacing tokens with math functions
const spacingTokens = mockComplexTokenStructure[TokenLayers.semantic]['spacing'] as Record<string, DesignToken>;
spacingTokens['dynamic-s'] = mockSpacingTokenWithMinFunction;
spacingTokens['dynamic-l'] = mockSpacingTokenWithFloorFunction;

// Expected results after processing
export const mockExpectedResults = new Map([
	['fontSize.body.s', '14'],
	['fontSize.body.m', '16'],
	['lineHeight.body.s', '24px'],
	['spacing.dynamic-s', '8'],
	['spacing.dynamic-l', '12'],
]);

// Test values for edge cases
export const mockEdgeCase = {
	emptyValue: createMockToken('', A1TokenTypes.fontSizes),
	nonStringValue: { value: 123, type: A1TokenTypes.fontSizes } as DesignToken,
	noMathFunction: createMockToken('simple-value', A1TokenTypes.fontSizes),
	invalidMathFunction: createMockToken('invalidFunction(16)', A1TokenTypes.fontSizes),
	nestedReferences: createMockToken(
		'roundTo({semantic.font-size.body.m} * {semantic.internal.font-size.growth-ratio.body})',
		A1TokenTypes.fontSizes,
	),
};

// Function to get mock token by path for testing
export const getMockTokenByPath = (path: string): DesignToken | undefined => mockReferencedTokens.get(path);

// Function to get expected calculation result
export const getExpectedCalculationResult = (calculation: string): string | undefined => mockCalculationResults.get(calculation);
