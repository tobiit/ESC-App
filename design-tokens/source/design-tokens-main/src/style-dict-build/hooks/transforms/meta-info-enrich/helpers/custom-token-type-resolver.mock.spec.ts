import { DesignToken } from 'style-dictionary/types';
import { A1TokenTypes } from '../../../../../shared/index.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

/**
 * Factory function to create a basic mock DesignToken
 */
export const createBasicDesignToken = (name: string, $type: A1TokenTypes, $value: unknown = '16px'): DesignToken => {
	return {
		name,
		path: name.split('-'),
		original: {
			value: $value,
			type: $type,
		},
		$value,
		$type,
		attributes: {},
		filePath: 'tokens/test.json',
		isSource: true,
	};
};

/**
 * Factory function to create a token without a name
 */
export const createTokenWithoutName = (): DesignToken => {
	const token = createBasicDesignToken('test-token', A1TokenTypes.dimension);
	delete (token as Partial<DesignToken>).name;
	return token;
};

// Test scenarios for inset tokens
export const insetTokenScenarios = [
	{
		description: 'should resolve spacing token with inset keyword to inset type',
		token: createBasicDesignToken('component-inset-all', A1TokenTypes.spacing),
		expected: A1TokenTypes.inset,
	},
	{
		description: 'should resolve dimension token with inset keyword to inset type',
		token: createBasicDesignToken('component-inset-top', A1TokenTypes.dimension),
		expected: A1TokenTypes.inset,
	},
];

// Test scenarios for border radius tokens
export const borderRadiusTokenScenarios = [
	{
		description: 'should resolve borderRadius token with border-radius keyword to borderRadius type',
		token: createBasicDesignToken('component-border-radius-small', A1TokenTypes.borderRadius),
		expected: A1TokenTypes.borderRadius,
	},
	{
		description: 'should resolve dimension token with border-radius keyword to borderRadius type',
		token: createBasicDesignToken('component-border-radius-large', A1TokenTypes.dimension),
		expected: A1TokenTypes.borderRadius,
	},
];

// Test scenarios for easing tokens
export const easingTokenScenarios = [
	{
		description: 'should resolve other token with easing keyword to easing type',
		token: createBasicDesignToken('motion-easing-standard', A1TokenTypes.other),
		expected: A1TokenTypes.easing,
	},
	{
		description: 'should resolve number token with curves keyword to easing type',
		token: createBasicDesignToken('motion-curves-bezier', A1TokenTypes.number),
		expected: A1TokenTypes.easing,
	},
];

// Test scenarios for scaling tokens
export const scalingTokenScenarios = [
	{
		description: 'should resolve number token with scaling keyword to scaling type',
		token: createBasicDesignToken('component-scaling-factor', A1TokenTypes.number),
		expected: A1TokenTypes.scaling,
	},
];

// Test scenarios for time tokens
export const timeTokenScenarios = [
	{
		description: 'should resolve other token with duration keyword to time type',
		token: createBasicDesignToken('motion-duration-short', A1TokenTypes.other),
		expected: A1TokenTypes.time,
	},
	{
		description: 'should resolve other token with delay keyword to time type',
		token: createBasicDesignToken('motion-delay-medium', A1TokenTypes.other),
		expected: A1TokenTypes.time,
	},
];

// Test scenarios for border width tokens
export const borderWidthTokenScenarios = [
	{
		description: 'should resolve dimension token with border-width keyword to borderWidth type',
		token: createBasicDesignToken('component-border-width-thin', A1TokenTypes.dimension),
		expected: A1TokenTypes.borderWidth,
	},
];

// Test scenarios for spacing tokens (gap, stack, position)
export const spacingTokenScenarios = [
	{
		description: 'should resolve dimension token with gap keyword to spacing type',
		token: createBasicDesignToken('component-gap-small', A1TokenTypes.dimension),
		expected: A1TokenTypes.spacing,
	},
	{
		description: 'should resolve dimension token with stack keyword to spacing type',
		token: createBasicDesignToken('component-stack-medium', A1TokenTypes.dimension),
		expected: A1TokenTypes.spacing,
	},
	{
		description: 'should resolve dimension token with start position keyword to spacing type',
		token: createBasicDesignToken('component-start', A1TokenTypes.dimension),
		expected: A1TokenTypes.spacing,
	},
	{
		description: 'should resolve dimension token with bottom position keyword to spacing type',
		token: createBasicDesignToken('component-bottom', A1TokenTypes.dimension),
		expected: A1TokenTypes.spacing,
	},
	{
		description: 'should resolve dimension token with end position keyword to spacing type',
		token: createBasicDesignToken('component-end', A1TokenTypes.dimension),
		expected: A1TokenTypes.spacing,
	},
	{
		description: 'should resolve dimension token with top position keyword to spacing type',
		token: createBasicDesignToken('component-top', A1TokenTypes.dimension),
		expected: A1TokenTypes.spacing,
	},
	{
		description: 'should resolve dimension token with grid margin (old format) to spacing type',
		token: createBasicDesignToken('component-grid-margin-left', A1TokenTypes.dimension),
		expected: A1TokenTypes.spacing,
	},
	{
		description: 'should resolve dimension token with grid column-gap (new format) to spacing type',
		token: createBasicDesignToken('component-grid-column-gap-small', A1TokenTypes.dimension),
		expected: A1TokenTypes.spacing,
	},
];

// Test scenarios for tokens that should not be resolved
export const nonResolvableTokenScenarios = [
	{
		description: 'should return undefined for color token',
		token: createBasicDesignToken('component-color-primary', A1TokenTypes.color),
		expected: undefined,
	},
	{
		description: 'should return undefined for dimension token without special keywords',
		token: createBasicDesignToken('component-width-large', A1TokenTypes.dimension),
		expected: undefined,
	},
	{
		description: 'should return undefined for token without name',
		token: createTokenWithoutName(),
		expected: undefined,
	},
];

// Edge case scenarios
export const edgeCaseScenarios = [
	{
		description: 'should not resolve start position token with inset in name',
		token: createBasicDesignToken('component-inset-start', A1TokenTypes.dimension),
		expected: A1TokenTypes.inset,
	},
	{
		description: 'should not resolve bottom position token with inset in name',
		token: createBasicDesignToken('component-inset-bottom', A1TokenTypes.dimension),
		expected: A1TokenTypes.inset,
	},
	{
		description: 'should not resolve end position token with inset in name',
		token: createBasicDesignToken('component-inset-end', A1TokenTypes.dimension),
		expected: A1TokenTypes.inset,
	},
	{
		description: 'should not resolve top position token with inset in name',
		token: createBasicDesignToken('component-inset-top', A1TokenTypes.dimension),
		expected: A1TokenTypes.inset,
	},
	{
		description: 'should not resolve grid column-gap as gap',
		token: createBasicDesignToken('component-grid-column-gap-small', A1TokenTypes.dimension),
		expected: A1TokenTypes.spacing,
	},
	{
		description: 'should not resolve grid margin as gap',
		token: createBasicDesignToken('component-grid-margin-small', A1TokenTypes.dimension),
		expected: A1TokenTypes.spacing,
	},
];
