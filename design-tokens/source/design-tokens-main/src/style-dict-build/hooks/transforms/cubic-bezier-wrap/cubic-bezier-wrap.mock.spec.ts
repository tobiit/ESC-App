import { Config, PlatformConfig, TransformedToken, ValueTransform } from 'style-dictionary/types';
import { A1TokenTypes } from '../../../../shared/index.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock data helpers for creating tokens
export const createBasicEasingDesignToken = (): TransformedToken =>
	({
		name: 'core.motion.easing.enter',
		$type: A1TokenTypes.other,
		$value: '0.25, 0.46, 0.45, 0.94',
		path: ['core', 'motion', 'easing', 'enter'],
		original: {
			$type: A1TokenTypes.other,
			$value: '0.25, 0.46, 0.45, 0.94',
		},
		filePath: 'tokens/core/motion.json',
		isSource: true,
	}) as TransformedToken;

export const createNonEasingDesignToken = (): TransformedToken =>
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

export const createEasingTokenWithoutCubicBezier = (value: string): TransformedToken =>
	({
		...createBasicEasingDesignToken(),
		$value: value,
		original: {
			...createBasicEasingDesignToken().original,
			$value: value,
		},
	}) as TransformedToken;

export const createNonStringValueDesignToken = (value: unknown): TransformedToken =>
	({
		...createBasicEasingDesignToken(),
		$value: value,
		original: {
			...createBasicEasingDesignToken().original,
			$value: value,
		},
	}) as TransformedToken;

export const createOtherTypeTokenWithoutEasing = (): TransformedToken =>
	({
		name: 'core.other.something',
		$type: A1TokenTypes.other,
		$value: 'some-value',
		path: ['core', 'other', 'something'],
		original: {
			$type: A1TokenTypes.other,
			$value: 'some-value',
		},
		filePath: 'tokens/core/other.json',
		isSource: true,
	}) as TransformedToken;

export const createOtherTypeTokenWithUndefinedName = (): TransformedToken =>
	({
		name: undefined,
		$type: A1TokenTypes.other,
		$value: 'some-value',
		path: ['core', 'other', 'something'],
		original: {
			$type: A1TokenTypes.other,
			$value: 'some-value',
		},
		filePath: 'tokens/core/other.json',
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
		name: 'a1/cubic-bezier-wrap',
		type: 'value',
		transitive: true,
	};
};

// Test scenarios
export const filterTestScenarios = [
	{
		description: 'should return true for other type token with easing in name',
		token: createBasicEasingDesignToken(),
		expected: true,
	},
	{
		description: 'should return false for non-other type token',
		token: createNonEasingDesignToken(),
		expected: false,
	},
	{
		description: 'should return false for other type token without easing in name',
		token: createOtherTypeTokenWithoutEasing(),
		expected: false,
	},
	{
		description: 'should return false for other type token with undefined name',
		token: createOtherTypeTokenWithUndefinedName(),
		expected: false,
	},
];

export const transformTestScenarios = [
	{
		description: 'should wrap 4-value comma-separated string with cubic-bezier',
		token: createEasingTokenWithoutCubicBezier('0.25, 0.46, 0.45, 0.94'),
		expected: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
	},
	{
		description: 'should not wrap already wrapped cubic-bezier function',
		token: createEasingTokenWithoutCubicBezier('cubic-bezier(0.25, 0.46, 0.45, 0.94)'),
		expected: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
	},
	{
		description: 'should not wrap string with less than 4 comma-separated values',
		token: createEasingTokenWithoutCubicBezier('0.25, 0.46, 0.45'),
		expected: '0.25, 0.46, 0.45',
	},
	{
		description: 'should not wrap string with more than 4 comma-separated values',
		token: createEasingTokenWithoutCubicBezier('0.25, 0.46, 0.45, 0.94, 0.5'),
		expected: '0.25, 0.46, 0.45, 0.94, 0.5',
	},
	{
		description: 'should not wrap string without commas',
		token: createEasingTokenWithoutCubicBezier('ease-in-out'),
		expected: 'ease-in-out',
	},
];

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
		token: createNonStringValueDesignToken({ invalid: 'value' }),
		expectedError: 'Invalid token value type: "object". Expected string, received object: [object Object]',
	},
	{
		description: 'should throw error for non-string value (null)',
		token: createNonStringValueDesignToken(null),
		expectedError: 'Invalid token value type: "object". Expected string, received object: null',
	},
];

// Create mock platform config and main config
export const mockConfig = createBasicMockConfig();
export const mockPlatformConfig = createMockPlatformConfig();
