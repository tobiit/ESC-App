import { Config, PlatformConfig, TransformedToken, ValueTransform } from 'style-dictionary/types';
import { A1TokenTypes } from '../../../../shared/index.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock data helpers for creating tokens
export const createBasicFadeColorDesignToken = (): TransformedToken =>
	({
		name: 'core.color.brand.fade.primary',
		$type: A1TokenTypes.color,
		$value: 'LINEAR-GRADIENT(90deg, #007bff 0%, transparent 100%)',
		path: ['core', 'color', 'brand', 'fade', 'primary'],
		original: {
			$type: A1TokenTypes.color,
			$value: 'LINEAR-GRADIENT(90deg, #007bff 0%, transparent 100%)',
		},
		filePath: 'tokens/core/colors.json',
		isSource: true,
	}) as TransformedToken;

export const createNonFadeColorDesignToken = (): TransformedToken =>
	({
		name: 'core.color.brand.primary',
		$type: A1TokenTypes.color,
		$value: '#007bff',
		path: ['core', 'color', 'brand', 'primary'],
		original: {
			$type: A1TokenTypes.color,
			$value: '#007bff',
		},
		filePath: 'tokens/core/colors.json',
		isSource: true,
	}) as TransformedToken;

export const createNonColorDesignToken = (): TransformedToken =>
	({
		name: 'core.dimensions.space.16',
		$type: A1TokenTypes.dimension,
		$value: '16px',
		path: ['core', 'dimensions', 'space', '16'],
		original: {
			$type: A1TokenTypes.dimension,
			$value: '16px',
		},
		filePath: 'tokens/core/dimensions.json',
		isSource: true,
	}) as TransformedToken;

export const createFadeTokenWithUppercaseLinearGradient = ($value: string): TransformedToken =>
	({
		...createBasicFadeColorDesignToken(),
		$value,
		original: {
			...createBasicFadeColorDesignToken().original,
			$value,
		},
	}) as TransformedToken;

export const createFadeTokenWithLowercaseLinearGradient = ($value: string): TransformedToken =>
	({
		...createBasicFadeColorDesignToken(),
		$value,
		original: {
			...createBasicFadeColorDesignToken().original,
			$value,
		},
	}) as TransformedToken;

export const createNonStringValueDesignToken = ($value: unknown): TransformedToken =>
	({
		...createBasicFadeColorDesignToken(),
		$value,
		original: {
			...createBasicFadeColorDesignToken().original,
			$value,
		},
	}) as TransformedToken;

export const createColorTokenWithoutFade = (): TransformedToken =>
	({
		name: 'core.color.red.500',
		$type: A1TokenTypes.color,
		$value: 'LINEAR-GRADIENT(45deg, red, blue)',
		path: ['core', 'color', 'red', '500'],
		original: {
			$type: A1TokenTypes.color,
			$value: 'LINEAR-GRADIENT(45deg, red, blue)',
		},
		filePath: 'tokens/core/colors.json',
		isSource: true,
	}) as TransformedToken;

export const createFadeTokenWithUndefinedName = (): TransformedToken =>
	({
		...createBasicFadeColorDesignToken(),
		name: undefined,
	}) as unknown as TransformedToken;

export const createFadeTokenWithNullName = (): TransformedToken =>
	({
		...createBasicFadeColorDesignToken(),
		name: null,
	}) as unknown as TransformedToken;

// Mock Config and PlatformConfig
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

export const createBasicMockPlatformConfig = (): PlatformConfig =>
	({
		transforms: [],
		files: [],
	}) as PlatformConfig;

// Expected ValueTransform structure
export const createExpectedValueTransform = (): Partial<ValueTransform> => {
	return {
		name: 'a1/lower-case-linear-gradient',
		type: 'value',
		transitive: true,
	};
};

// Test scenarios for filter function
export const filterTestScenarios = [
	{
		description: 'should return true for color type token with fade in name',
		token: createBasicFadeColorDesignToken(),
		expected: true,
	},
	{
		description: 'should return false for non-color type token',
		token: createNonColorDesignToken(),
		expected: false,
	},
	{
		description: 'should return false for color token without fade in name',
		token: createNonFadeColorDesignToken(),
		expected: false,
	},
	{
		description: 'should return false for color token with fade not in name',
		token: createColorTokenWithoutFade(),
		expected: false,
	},
	{
		description: 'should return false for token with undefined name',
		token: createFadeTokenWithUndefinedName(),
		expected: false,
	},
	{
		description: 'should return false for token with null name',
		token: createFadeTokenWithNullName(),
		expected: false,
	},
];

// Test scenarios for transform function
export const transformTestScenarios = [
	{
		description: 'should transform uppercase LINEAR-GRADIENT to lowercase linear-gradient',
		token: createFadeTokenWithUppercaseLinearGradient('LINEAR-GRADIENT(90deg, #007bff 0%, transparent 100%)'),
		expected: 'linear-gradient(90deg, #007bff 0%, transparent 100%)',
	},
	{
		description: 'should leave already lowercase linear-gradient unchanged',
		token: createFadeTokenWithLowercaseLinearGradient('linear-gradient(90deg, #007bff 0%, transparent 100%)'),
		expected: 'linear-gradient(90deg, #007bff 0%, transparent 100%)',
	},
	{
		description: 'should handle multiple LINEAR-GRADIENT occurrences',
		token: createFadeTokenWithUppercaseLinearGradient('LINEAR-GRADIENT(90deg, red, blue), LINEAR-GRADIENT(45deg, green, yellow)'),
		expected: 'linear-gradient(90deg, red, blue), linear-gradient(45deg, green, yellow)', // All occurrences replaced
	},
	{
		description: 'should return unchanged value when no LINEAR-GRADIENT found',
		token: createFadeTokenWithLowercaseLinearGradient('#007bff'),
		expected: '#007bff',
	},
	{
		description: 'should handle complex multi-gradient background',
		token: createFadeTokenWithUppercaseLinearGradient(
			'LINEAR-GRADIENT(217deg, rgb(255 0 0 / 0.8), rgb(255 0 0 / 0) 70.71%), LINEAR-GRADIENT(127deg, rgb(0 255 0 / 0.8), rgb(0 255 0 / 0) 70.71%), LINEAR-GRADIENT(336deg, rgb(0 0 255 / 0.8), rgb(0 0 255 / 0) 70.71%)',
		),
		expected:
			'linear-gradient(217deg, rgb(255 0 0 / 0.8), rgb(255 0 0 / 0) 70.71%), linear-gradient(127deg, rgb(0 255 0 / 0.8), rgb(0 255 0 / 0) 70.71%), linear-gradient(336deg, rgb(0 0 255 / 0.8), rgb(0 0 255 / 0) 70.71%)', // All occurrences replaced
	},
	{
		description: 'should handle mixed case with partial matches',
		token: createFadeTokenWithUppercaseLinearGradient(
			'background: LINEAR-GRADIENT(45deg, red, blue), radial-gradient(circle, white, black)',
		),
		expected: 'background: linear-gradient(45deg, red, blue), radial-gradient(circle, white, black)',
	},
];

// Test scenarios specifically for the current replaceAll() behavior
export const currentBehaviorLimitationScenarios = [
	{
		description: 'should replace all LINEAR-GRADIENT occurrences even when nested',
		token: createFadeTokenWithUppercaseLinearGradient('LINEAR-GRADIENT(90deg, LINEAR-GRADIENT(0deg, red, blue), transparent)'),
		expected: 'linear-gradient(90deg, linear-gradient(0deg, red, blue), transparent)', // All occurrences replaced
	},
	{
		description: 'should replace all LINEAR-GRADIENT occurrences when multiple are present',
		token: createFadeTokenWithUppercaseLinearGradient(
			'background: LINEAR-GRADIENT(0deg, red, blue), LINEAR-GRADIENT(90deg, green, yellow)',
		),
		expected: 'background: linear-gradient(0deg, red, blue), linear-gradient(90deg, green, yellow)', // All occurrences replaced
	},
];

// Test scenarios for error cases
export const errorTestScenarios = [
	{
		description: 'should throw error for non-string value (number)',
		token: createNonStringValueDesignToken(123),
		expectedError: 'Invalid token value type: "number". Expected string, received number: 123',
	},
	{
		description: 'should throw error for non-string value (boolean)',
		token: createNonStringValueDesignToken(true),
		expectedError: 'Invalid token value type: "boolean". Expected string, received boolean: true',
	},
	{
		description: 'should throw error for non-string value (object)',
		token: createNonStringValueDesignToken({ gradient: 'linear' }),
		expectedError: 'Invalid token value type: "object". Expected string, received object: [object Object]',
	},
	{
		description: 'should throw error for non-string value (null)',
		token: createNonStringValueDesignToken(null),
		expectedError: 'Invalid token value type: "object". Expected string, received object: null',
	},
	{
		description: 'should throw error for non-string value (undefined)',
		token: createNonStringValueDesignToken(undefined),
		expectedError: 'Invalid token value type: "undefined". Expected string, received undefined: undefined',
	},
];

// Scenarios showing what the current behavior achieves (all occurrences replaced)
export const idealBehaviorScenarios = [
	{
		description: 'should replace ALL LINEAR-GRADIENT occurrences in complex backgrounds',
		input:
			'LINEAR-GRADIENT(217deg, rgb(255 0 0 / 0.8), rgb(255 0 0 / 0) 70.71%), LINEAR-GRADIENT(127deg, rgb(0 255 0 / 0.8), rgb(0 255 0 / 0) 70.71%), LINEAR-GRADIENT(336deg, rgb(0 0 255 / 0.8), rgb(0 0 255 / 0) 70.71%)',
		idealExpected:
			'linear-gradient(217deg, rgb(255 0 0 / 0.8), rgb(255 0 0 / 0) 70.71%), linear-gradient(127deg, rgb(0 255 0 / 0.8), rgb(0 255 0 / 0) 70.71%), linear-gradient(336deg, rgb(0 0 255 / 0.8), rgb(0 0 255 / 0) 70.71%)',
		currentActual:
			'linear-gradient(217deg, rgb(255 0 0 / 0.8), rgb(255 0 0 / 0) 70.71%), linear-gradient(127deg, rgb(0 255 0 / 0.8), rgb(0 255 0 / 0) 70.71%), linear-gradient(336deg, rgb(0 0 255 / 0.8), rgb(0 0 255 / 0) 70.71%)',
	},
];
