import { NameTransform, TransformedToken } from 'style-dictionary/types';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

/**
 * Factory function to create a basic token with path
 */
export const createBasicToken = (overrides?: Partial<TransformedToken>): TransformedToken =>
	({
		name: 'color.primary.base',
		path: ['color', 'primary', 'base'],
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
 * Expected NameTransform structure
 */
export const createExpectedNameTransform = (): Partial<NameTransform> => {
	return {
		name: 'name/puml/constant',
		type: 'name',
	};
};

// Test scenarios for transform function with various path structures
export const transformTestScenarios = [
	{
		description: 'should transform simple path to uppercase with underscores',
		token: createBasicToken({ path: ['color', 'primary', 'base'] }),
		expected: 'COLOR_PRIMARY_BASE',
	},
	{
		description: 'should handle single segment path',
		token: createBasicToken({ path: ['primary'] }),
		expected: 'PRIMARY',
	},
	{
		description: 'should handle empty path array',
		token: createBasicToken({ path: [] }),
		expected: '',
	},
	{
		description: 'should convert lowercase to uppercase',
		token: createBasicToken({ path: ['button', 'background', 'hover'] }),
		expected: 'BUTTON_BACKGROUND_HOVER',
	},
	{
		description: 'should handle already uppercase path',
		token: createBasicToken({ path: ['BRAND', 'PRIMARY', 'COLOR'] }),
		expected: 'BRAND_PRIMARY_COLOR',
	},
	{
		description: 'should handle mixed case path',
		token: createBasicToken({ path: ['Brand', 'Primary', 'Color'] }),
		expected: 'BRAND_PRIMARY_COLOR',
	},
];

// Test scenarios for special character handling
export const specialCharacterScenarios = [
	{
		description: 'should replace hyphens with underscores',
		token: createBasicToken({ path: ['button-primary', 'background-color'] }),
		expected: 'BUTTON_PRIMARY_BACKGROUND_COLOR',
	},
	{
		description: 'should replace dots with underscores',
		token: createBasicToken({ path: ['color.brand.primary'] }),
		expected: 'COLOR_BRAND_PRIMARY',
	},
	{
		description: 'should replace spaces with underscores',
		token: createBasicToken({ path: ['button primary', 'background color'] }),
		expected: 'BUTTON_PRIMARY_BACKGROUND_COLOR',
	},
	{
		description: 'should remove forward slashes',
		token: createBasicToken({ path: ['color/brand/primary'] }),
		expected: 'COLOR_BRAND_PRIMARY',
	},
	{
		description: 'should remove special characters',
		token: createBasicToken({ path: ['color@brand', 'primary#value'] }),
		expected: 'COLOR_BRAND_PRIMARY_VALUE',
	},
	{
		description: 'should handle multiple consecutive special characters',
		token: createBasicToken({ path: ['color---brand', 'primary...value'] }),
		expected: 'COLOR___BRAND_PRIMARY___VALUE',
	},
	{
		description: 'should handle parentheses',
		token: createBasicToken({ path: ['color(brand)', 'primary[value]'] }),
		expected: 'COLOR_BRAND__PRIMARY_VALUE_',
	},
	{
		description: 'should handle curly braces',
		token: createBasicToken({ path: ['color{brand}', 'primary{value}'] }),
		expected: 'COLOR_BRAND__PRIMARY_VALUE_',
	},
];

// Test scenarios for numeric handling
export const numericScenarios = [
	{
		description: 'should preserve numbers in path',
		token: createBasicToken({ path: ['spacing', '16', 'px'] }),
		expected: 'SPACING_16_PX',
	},
	{
		description: 'should handle numeric-only segments',
		token: createBasicToken({ path: ['100', '200', '300'] }),
		expected: '100_200_300',
	},
	{
		description: 'should handle mixed alphanumeric segments',
		token: createBasicToken({ path: ['font-size-16', 'line-height-24'] }),
		expected: 'FONT_SIZE_16_LINE_HEIGHT_24',
	},
	{
		description: 'should handle numbers at start of segment',
		token: createBasicToken({ path: ['16px', '24px'] }),
		expected: '16PX_24PX',
	},
];

// Edge case test scenarios
export const edgeCaseScenarios = [
	{
		description: 'should handle token with undefined path',
		token: createBasicToken({ path: undefined as unknown as string[] }),
		expected: '',
	},
	{
		description: 'should handle token with null path',
		token: createBasicToken({ path: null as unknown as string[] }),
		expected: '',
	},
	{
		description: 'should handle path with empty strings',
		token: createBasicToken({ path: ['color', '', 'primary', ''] }),
		expected: 'COLOR__PRIMARY_',
	},
	{
		description: 'should handle path with only special characters in segment',
		token: createBasicToken({ path: ['color', '---', 'primary'] }),
		expected: 'COLOR_____PRIMARY',
	},
	{
		description: 'should handle path with whitespace-only segment',
		token: createBasicToken({ path: ['color', '   ', 'primary'] }),
		expected: 'COLOR_____PRIMARY',
	},
	{
		description: 'should handle path with unicode characters',
		token: createBasicToken({ path: ['color', 'pr_mary', 'b_se'] }),
		expected: 'COLOR_PR_MARY_B_SE',
	},
];

// Complex path scenarios
export const complexPathScenarios = [
	{
		description: 'should handle deeply nested path',
		token: createBasicToken({
			path: ['semantic', 'component', 'button', 'primary', 'background', 'hover', 'active'],
		}),
		expected: 'SEMANTIC_COMPONENT_BUTTON_PRIMARY_BACKGROUND_HOVER_ACTIVE',
	},
	{
		description: 'should handle path with mixed separators',
		token: createBasicToken({ path: ['button-primary.background', 'hover_state'] }),
		expected: 'BUTTON_PRIMARY_BACKGROUND_HOVER_STATE',
	},
	{
		description: 'should handle camelCase segments',
		token: createBasicToken({ path: ['buttonPrimary', 'backgroundColor'] }),
		expected: 'BUTTONPRIMARY_BACKGROUNDCOLOR',
	},
	{
		description: 'should handle PascalCase segments',
		token: createBasicToken({ path: ['ButtonPrimary', 'BackgroundColor'] }),
		expected: 'BUTTONPRIMARY_BACKGROUNDCOLOR',
	},
];

// Consistency test scenarios
export const consistencyScenarios = [
	{
		description: 'same path should produce same result',
		path: ['color', 'primary', 'base'],
		expected: 'COLOR_PRIMARY_BASE',
	},
	{
		description: 'different tokens with same path should produce same result',
		path: ['spacing', 'large'],
		expected: 'SPACING_LARGE',
	},
];
