import { Config, TransformedToken, ValueTransform } from 'style-dictionary/types';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

/**
 * Factory function to create a basic mock TransformedToken with color type
 */
export const createBasicColorDesignToken = (): TransformedToken => {
	return {
		name: 'test.color.token',
		path: ['test', 'color', 'token'],
		original: {
			value: '#ffffff',
			type: 'color',
		},
		$value: '#ffffff',
		$type: 'color',
		attributes: {},
		filePath: 'tokens/test.json',
		isSource: true,
	};
};

/**
 * Factory function to create a mock TransformedToken with non-color type
 */
export const createNonColorDesignToken = (): TransformedToken => {
	return {
		name: 'test.dimension.token',
		path: ['test', 'dimension', 'token'],
		original: {
			value: '16px',
			type: 'dimension',
		},
		$value: '16px',
		$type: 'dimension',
		attributes: {},
		filePath: 'tokens/test.json',
		isSource: true,
	};
};

/**
 * Factory function to create a mock TransformedToken with hex color value
 */
export const createHexColorDesignToken = ($value: string): TransformedToken => {
	return {
		...createBasicColorDesignToken(),
		$value,
		original: {
			...createBasicColorDesignToken().original,
			$value,
		},
	};
};

/**
 * Factory function to create a mock TransformedToken with rgba color value
 */
export const createRgbaColorDesignToken = ($value: string): TransformedToken => {
	return {
		...createBasicColorDesignToken(),
		$value,
		original: {
			...createBasicColorDesignToken().original,
			$value,
		},
	};
};

/**
 * Factory function to create a mock TransformedToken with non-string value
 */
export const createNonStringValueDesignToken = ($value: unknown): TransformedToken =>
	({
		...createBasicColorDesignToken(),
		$value,
		original: {
			...createBasicColorDesignToken().original,
			$value,
		},
	}) as TransformedToken;

/**
 * Factory function to create a mock TransformedToken with empty string value
 */
export const createEmptyStringValueDesignToken = (): TransformedToken => {
	return {
		...createBasicColorDesignToken(),
		$value: '',
		original: {
			...createBasicColorDesignToken().original,
			$value: '',
		},
	};
};

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
 * Factory function to create expected ValueTransform object
 */
export const createExpectedValueTransform = (): Partial<ValueTransform> => {
	return {
		name: 'a1/color/hex8',
		type: 'value',
		transitive: true,
	};
};

// Test scenarios for filter function
export const filterTestScenarios = [
	{
		description: 'should return true for color type token',
		token: createBasicColorDesignToken(),
		expected: true,
	},
	{
		description: 'should return false for non-color type token',
		token: createNonColorDesignToken(),
		expected: false,
	},
];

// Test scenarios for transform function
export const transformTestScenarios = [
	{
		description: 'should transform hex color correctly',
		token: createHexColorDesignToken('#ffffff'),
		expected: '#FFFFFF',
	},
	{
		description: 'should transform 4-digit hex color correctly',
		token: createHexColorDesignToken('#fff9'),
		expected: '#FFFFFF99',
	},
	{
		description: 'should transform rgba color correctly',
		token: createRgbaColorDesignToken('rgba(254, 254, 254, 0.8)'),
		expected: '#FEFEFECC',
	},
	{
		description: 'should transform rgba with hex color correctly',
		token: createRgbaColorDesignToken('rgba(#FFFFFF, 0.8)'),
		expected: '#FFFFFFCC',
	},
];

// Test scenarios for error cases
export const errorTestScenarios = [
	{
		description: 'should throw error for non-string value',
		token: createNonStringValueDesignToken(123),
		expectedError: 'Invalid token value type: "number". Expected string, received number: 123',
	},
	{
		description: 'should throw error for empty string value',
		token: createEmptyStringValueDesignToken(),
		expectedError: 'Invalid token value: empty or falsy string. Expected a valid color value',
	},
];

// Additional test scenarios focusing on alpha value edge cases
export const alphaValueEdgeCaseTestScenarios = [
	// Normal alpha values that should NOT trigger the error condition
	{
		description: 'transform rgba token with alpha 0.5 (normal case)',
		token: {
			...createBasicColorDesignToken(),
			original: {
				...createBasicColorDesignToken().original,
				$value: 'rgba(254, 0, 0, 0.5)',
			},
			$value: 'rgba(254, 0, 0, 0.5)',
		},
		expectedOutput: '#FE000080',
	},
	{
		description: 'transform rgba token with alpha 0.99 (just under 1)',
		token: {
			...createBasicColorDesignToken(),
			original: {
				...createBasicColorDesignToken().original,
				$value: 'rgba(128, 128, 128, 0.99)',
			},
			$value: 'rgba(128, 128, 128, 0.99)',
		},
		expectedOutput: '#808080FC',
	},
	{
		description: 'transform rgba token with alpha 0 (minimum valid)',
		token: {
			...createBasicColorDesignToken(),
			original: {
				...createBasicColorDesignToken().original,
				$value: 'rgba(254, 254, 254, 0)',
			},
			$value: 'rgba(254, 254, 254, 0)',
		},
		expectedOutput: '#FEFEFE00',
	},
	{
		description: 'transform rgba token with alpha 0.25',
		token: {
			...createBasicColorDesignToken(),
			original: {
				...createBasicColorDesignToken().original,
				$value: 'rgba(100, 150, 200, 0.25)',
			},
			$value: 'rgba(100, 150, 200, 0.25)',
		},
		expectedOutput: '#6496C840',
	},
];

// Error test scenarios that should trigger the alpha >= 1 error condition
export const alphaErrorTestScenarios = [
	{
		description: 'should throw error for alpha value exactly 1',
		token: {
			...createBasicColorDesignToken(),
			original: {
				...createBasicColorDesignToken().original,
				$value: 'rgba(254, 0, 0, 1)',
			},
			$value: 'rgba(254, 0, 0, 1)',
		},
		expectedError: 'Invalid alpha value: "1". Alpha must be between 0 and 1',
	},
	{
		description: 'should throw error for alpha value greater than 1',
		token: {
			...createBasicColorDesignToken(),
			original: {
				...createBasicColorDesignToken().original,
				$value: 'rgba(254, 0, 0, 1.5)',
			},
			$value: 'rgba(254, 0, 0, 1.5)',
		},
		expectedError: 'Invalid alpha value: "1.5". Alpha must be between 0 and 1',
	},
	{
		description: 'should throw error for alpha value much greater than 1',
		token: {
			...createBasicColorDesignToken(),
			original: {
				...createBasicColorDesignToken().original,
				$value: 'rgba(254, 0, 0, 2)',
			},
			$value: 'rgba(254, 0, 0, 2)',
		},
		expectedError: 'Invalid alpha value: "2". Alpha must be between 0 and 1',
	},
];

// Additional error test scenarios to cover remaining uncovered lines
export const remainingErrorTestScenarios = [
	{
		description: 'should throw error for RGB value >= 255 (line 51)',
		token: {
			...createBasicColorDesignToken(),
			original: {
				...createBasicColorDesignToken().original,
				$value: 'rgba(255, 0, 0, 0.5)',
			},
			$value: 'rgba(255, 0, 0, 0.5)',
		},
		expectedError: 'Invalid rgb color value: "255". Color value must be between 0 and 255',
	},
	{
		description: 'should throw error for malformed rgba without closing parentheses (line 70)',
		token: {
			...createBasicColorDesignToken(),
			original: {
				...createBasicColorDesignToken().original,
				$value: 'rgba(255, 0, 0, 0.5',
			},
			$value: 'rgba(255, 0, 0, 0.5',
		},
		expectedError: 'Invalid rgba format: "rgba(255, 0, 0, 0.5". Expected format: rgba(r, g, b, a)',
	},
	{
		description: 'should throw error for insufficient values (line 77)',
		token: {
			...createBasicColorDesignToken(),
			original: {
				...createBasicColorDesignToken().original,
				$value: 'rgba()',
			},
			$value: 'rgba()',
		},
		expectedError: 'Invalid rgba format: "rgba()". Insufficient values provided',
	},
	{
		description: 'should throw error for exactly 3 values (line 87)',
		token: {
			...createBasicColorDesignToken(),
			original: {
				...createBasicColorDesignToken().original,
				$value: 'rgba(255, 0, 0.5)',
			},
			$value: 'rgba(255, 0, 0.5)',
		},
		expectedError: 'Invalid rgba format: "rgba(255, 0, 0.5)". Expected 2 values (hex, alpha) or 4 values (r, g, b, a), got 3',
	},
	{
		description: 'should throw error for NaN alpha value (line 95)',
		token: {
			...createBasicColorDesignToken(),
			original: {
				...createBasicColorDesignToken().original,
				$value: 'rgba(100, 100, 100, invalid)',
			},
			$value: 'rgba(100, 100, 100, invalid)',
		},
		expectedError: 'Invalid alpha value: "invalid". Expected a numeric value between 0 and 1',
	},
];
