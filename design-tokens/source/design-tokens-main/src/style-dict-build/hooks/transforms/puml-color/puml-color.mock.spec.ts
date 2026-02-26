import { TransformedToken, ValueTransform } from 'style-dictionary/types';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

/**
 * Factory function to create a basic color token
 */
export const createBasicColorToken = (overrides?: Partial<TransformedToken>): TransformedToken =>
	({
		name: 'color.primary',
		path: ['color', 'primary'],
		$type: 'color',
		$value: '#0066cc',
		original: {
			$type: 'color',
			$value: '#0066cc',
		},
		filePath: 'tokens/colors.json',
		isSource: true,
		...overrides,
	}) as TransformedToken;

/**
 * Factory function to create a non-color token
 */
export const createNonColorToken = (): TransformedToken =>
	({
		name: 'spacing.large',
		path: ['spacing', 'large'],
		$type: 'dimension',
		$value: '16px',
		original: {
			$type: 'dimension',
			$value: '16px',
		},
		filePath: 'tokens/spacing.json',
		isSource: true,
	}) as TransformedToken;

/**
 * Expected ValueTransform structure
 */
export const createExpectedValueTransform = (): Partial<ValueTransform> => {
	return {
		name: 'color/puml',
		type: 'value',
	};
};

// Test scenarios for filter function
export const filterTestScenarios = [
	{
		description: 'should return true for color type token',
		token: createBasicColorToken(),
		expected: true,
	},
	{
		description: 'should return false for non-color type token',
		token: createNonColorToken(),
		expected: false,
	},
	{
		description: 'should return true for color token with lowercase hex',
		token: createBasicColorToken({ $value: '#ff6600' }),
		expected: true,
	},
	{
		description: 'should return true for color token with uppercase hex',
		token: createBasicColorToken({ $value: '#FF6600' }),
		expected: true,
	},
	{
		description: 'should return true for color token with hex without hash',
		token: createBasicColorToken({ $value: 'ff6600' }),
		expected: true,
	},
];

// Test scenarios for transform function
export const transformTestScenarios = [
	{
		description: 'should convert lowercase hex to uppercase',
		token: createBasicColorToken({ $value: '#abc123' }),
		expected: '#ABC123',
	},
	{
		description: 'should keep uppercase hex unchanged',
		token: createBasicColorToken({ $value: '#ABC123' }),
		expected: '#ABC123',
	},
	{
		description: 'should add hash prefix to hex without hash',
		token: createBasicColorToken({ $value: 'ff6600' }),
		expected: '#FF6600',
	},
	{
		description: 'should convert lowercase hex without hash to uppercase with hash',
		token: createBasicColorToken({ $value: 'abc123' }),
		expected: '#ABC123',
	},
	{
		description: 'should handle 3-character hex codes',
		token: createBasicColorToken({ $value: '#f00' }),
		expected: '#F00',
	},
	{
		description: 'should handle 3-character hex codes without hash',
		token: createBasicColorToken({ $value: 'f00' }),
		expected: '#F00',
	},
	{
		description: 'should handle 8-character hex codes with alpha',
		token: createBasicColorToken({ $value: '#ff6600cc' }),
		expected: '#FF6600CC',
	},
	{
		description: 'should handle mixed case hex codes',
		token: createBasicColorToken({ $value: '#AbC123' }),
		expected: '#ABC123',
	},
];

// Edge case test scenarios
export const edgeCaseScenarios = [
	{
		description: 'should return non-string value unchanged',
		token: createBasicColorToken({ $value: 123 as unknown as string }),
		expected: 123,
	},
	{
		description: 'should return object value unchanged',
		token: createBasicColorToken({ $value: { r: 255, g: 0, b: 0 } as unknown as string }),
		expected: { r: 255, g: 0, b: 0 },
	},
	{
		description: 'should return null value unchanged',
		token: createBasicColorToken({ $value: null as unknown as string }),
		expected: null,
	},
	{
		description: 'should return undefined value unchanged',
		token: createBasicColorToken({ $value: undefined as unknown as string }),
		expected: undefined,
	},
	{
		description: 'should return empty string unchanged',
		token: createBasicColorToken({ $value: '' }),
		expected: '#',
	},
	{
		description: 'should handle named colors',
		token: createBasicColorToken({ $value: 'red' }),
		expected: '#RED',
	},
	{
		description: 'should handle rgba values',
		token: createBasicColorToken({ $value: 'rgba(255, 0, 0, 0.5)' }),
		expected: '#RGBA(255, 0, 0, 0.5)',
	},
];

// Hex format variation scenarios
export const hexFormatVariations = [
	{
		description: 'valid 6-character hex with hash',
		input: '#abc123',
		expected: '#ABC123',
	},
	{
		description: 'valid 6-character hex without hash',
		input: 'abc123',
		expected: '#ABC123',
	},
	{
		description: 'valid 3-character hex with hash',
		input: '#a1b',
		expected: '#A1B',
	},
	{
		description: 'valid 3-character hex without hash',
		input: 'a1b',
		expected: '#A1B',
	},
	{
		description: 'valid 8-character hex with alpha and hash',
		input: '#abc12380',
		expected: '#ABC12380',
	},
	{
		description: 'valid 8-character hex with alpha without hash',
		input: 'abc12380',
		expected: '#ABC12380',
	},
];
