import { Config, PlatformConfig, TransformedToken, ValueTransform } from 'style-dictionary/types';
import { A1TokenTypes } from '../../../../shared/index.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock data helpers for creating tokens
export const createBasicInsetAllDimensionToken = (): TransformedToken =>
	({
		name: 'core.dimensions.inset-all.16',
		$type: A1TokenTypes.dimension,
		$value: '16px',
		path: ['core', 'dimensions', 'inset-all', '16'],
		original: {
			$type: A1TokenTypes.dimension,
			$value: '16px',
		},
		filePath: 'tokens/core/dimensions.json',
		isSource: true,
	}) as TransformedToken;

export const createInsetAllTokenWithCalc = (): TransformedToken =>
	({
		name: 'core.dimensions.inset-all.calc',
		$type: A1TokenTypes.dimension,
		$value: 'calc(16px + 8px)',
		path: ['core', 'dimensions', 'inset-all', 'calc'],
		original: {
			$type: A1TokenTypes.dimension,
			$value: 'calc(16px + 8px)',
		},
		filePath: 'tokens/core/dimensions.json',
		isSource: true,
	}) as TransformedToken;

export const createInsetAllTokenWithDivision = (): TransformedToken =>
	({
		name: 'core.dimensions.inset-all.division',
		$type: A1TokenTypes.dimension,
		$value: '16px / 2',
		path: ['core', 'dimensions', 'inset-all', 'division'],
		original: {
			$type: A1TokenTypes.dimension,
			$value: '16px / 2',
		},
		filePath: 'tokens/core/dimensions.json',
		isSource: true,
	}) as TransformedToken;

export const createInsetAllTokenWithComplexValue = (): TransformedToken =>
	({
		name: 'core.dimensions.inset-all.complex',
		$type: A1TokenTypes.dimension,
		$value: '16px (calc(8px + 4px))',
		path: ['core', 'dimensions', 'inset-all', 'complex'],
		original: {
			$type: A1TokenTypes.dimension,
			$value: '16px (calc(8px + 4px))',
		},
		filePath: 'tokens/core/dimensions.json',
		isSource: true,
	}) as TransformedToken;

export const createNonInsetAllDimensionToken = (): TransformedToken =>
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

export const createNonDimensionToken = (): TransformedToken =>
	({
		name: 'core.colors.primary',
		$type: A1TokenTypes.color,
		$value: '#007bff',
		path: ['core', 'colors', 'primary'],
		original: {
			$type: A1TokenTypes.color,
			$value: '#007bff',
		},
		filePath: 'tokens/core/colors.json',
		isSource: true,
	}) as TransformedToken;

export const createInsetAllTokenWithNonStringValue = (value: unknown): TransformedToken =>
	({
		name: 'core.dimensions.inset-all.invalid',
		$type: A1TokenTypes.dimension,
		$value: value,
		path: ['core', 'dimensions', 'inset-all', 'invalid'],
		original: {
			$type: A1TokenTypes.dimension,
			$value: value,
		},
		filePath: 'tokens/core/dimensions.json',
		isSource: true,
	}) as TransformedToken;

export const createTokenWithNullName = (): TransformedToken =>
	({
		name: null,
		$type: A1TokenTypes.dimension,
		$value: '16px',
		path: ['core', 'dimensions', 'test'],
		original: {
			$type: A1TokenTypes.dimension,
			$value: '16px',
		},
		filePath: 'tokens/core/dimensions.json',
		isSource: true,
	}) as unknown as TransformedToken;

export const createTokenWithUndefinedName = (): TransformedToken =>
	({
		name: undefined,
		$type: A1TokenTypes.dimension,
		$value: '16px',
		path: ['core', 'dimensions', 'test'],
		original: {
			$type: A1TokenTypes.dimension,
			$value: '16px',
		},
		filePath: 'tokens/core/dimensions.json',
		isSource: true,
	}) as unknown as TransformedToken;

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

export const createMockPlatformConfig = (): PlatformConfig =>
	({
		buildPath: 'build/',
		files: [],
	}) as PlatformConfig;

export const createExpectedValueTransform = (): Partial<ValueTransform> => {
	return {
		name: 'a1/inset-shorthand-calc-fix',
		type: 'value',
		transitive: true,
	};
};

// Test scenarios for filter function
export const filterTestScenarios = [
	{
		description: 'should return true for dimension type token with inset-all in name',
		token: createBasicInsetAllDimensionToken(),
		expected: true,
	},
	{
		description: 'should return false for non-dimension type token',
		token: createNonDimensionToken(),
		expected: false,
	},
	{
		description: 'should return false for dimension type token without inset-all in name',
		token: createNonInsetAllDimensionToken(),
		expected: false,
	},
	{
		description: 'should return false for token with null name',
		token: createTokenWithNullName(),
		expected: false,
	},
	{
		description: 'should return false for token with undefined name',
		token: createTokenWithUndefinedName(),
		expected: false,
	},
];

// Test scenarios for transform function
export const transformTestScenarios = [
	{
		description: 'should return original value for simple string without calc or division',
		token: createBasicInsetAllDimensionToken(),
		expected: '16px',
	},
	{
		description: 'should transform calc expression',
		token: createInsetAllTokenWithCalc(),
		expected: '24px', // checkAndEvaluateMath should resolve calc(16px + 8px) to 24px
	},
	{
		description: 'should transform division expression',
		token: createInsetAllTokenWithDivision(),
		expected: '8px', // checkAndEvaluateMath should resolve 16px / 2 to 8px
	},
	{
		description: 'should transform complex expression with space before calc',
		token: createInsetAllTokenWithComplexValue(),
		expected: '16px 12px', // 16px stays as is, (calc(8px + 4px)) becomes 12px
	},
];

// Test scenarios for error handling
export const errorTestScenarios = [
	{
		description: 'should throw error for non-string value (number)',
		token: createInsetAllTokenWithNonStringValue(123),
		expectedError: 'Invalid token value type: "number". Expected string, received number: 123',
	},
	{
		description: 'should throw error for non-string value (boolean)',
		token: createInsetAllTokenWithNonStringValue(true),
		expectedError: 'Invalid token value type: "boolean". Expected string, received boolean: true',
	},
	{
		description: 'should throw error for non-string value (object)',
		token: createInsetAllTokenWithNonStringValue({ invalid: 'value' }),
		expectedError: 'Invalid token value type: "object". Expected string, received object: [object Object]',
	},
	{
		description: 'should throw error for non-string value (null)',
		token: createInsetAllTokenWithNonStringValue(null),
		expectedError: 'Invalid token value type: "object". Expected string, received object: null',
	},
];

// Create mock platform config and main config
export const mockConfig = createBasicMockConfig();
export const mockPlatformConfig = createMockPlatformConfig();
