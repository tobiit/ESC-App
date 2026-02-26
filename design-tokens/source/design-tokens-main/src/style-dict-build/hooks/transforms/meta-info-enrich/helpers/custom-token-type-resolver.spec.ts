import { describe, expect, it } from '@jest/globals';
import { resolveA1CustomTokenType } from './custom-token-type-resolver.js';
import {
	borderRadiusTokenScenarios,
	borderWidthTokenScenarios,
	createTokenWithoutName,
	easingTokenScenarios,
	edgeCaseScenarios,
	insetTokenScenarios,
	nonResolvableTokenScenarios,
	scalingTokenScenarios,
	spacingTokenScenarios,
	timeTokenScenarios,
} from './custom-token-type-resolver.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

describe('custom-token-type-resolver', () => {
	describe('resolveA1CustomTokenType', () => {
		it('should be a function', () => {
			expect(typeof resolveA1CustomTokenType).toBe('function');
		});

		it('should return undefined for token without name', () => {
			const token = createTokenWithoutName();
			const result = resolveA1CustomTokenType(token);
			expect(result).toBeUndefined();
		});

		describe('inset tokens', () => {
			insetTokenScenarios.forEach(scenario => {
				it(scenario.description, () => {
					const result = resolveA1CustomTokenType(scenario.token);
					expect(result).toBe(scenario.expected);
				});
			});
		});

		describe('border radius tokens', () => {
			borderRadiusTokenScenarios.forEach(scenario => {
				it(scenario.description, () => {
					const result = resolveA1CustomTokenType(scenario.token);
					expect(result).toBe(scenario.expected);
				});
			});
		});

		describe('easing tokens', () => {
			easingTokenScenarios.forEach(scenario => {
				it(scenario.description, () => {
					const result = resolveA1CustomTokenType(scenario.token);
					expect(result).toBe(scenario.expected);
				});
			});
		});

		describe('scaling tokens', () => {
			scalingTokenScenarios.forEach(scenario => {
				it(scenario.description, () => {
					const result = resolveA1CustomTokenType(scenario.token);
					expect(result).toBe(scenario.expected);
				});
			});
		});

		describe('time tokens', () => {
			timeTokenScenarios.forEach(scenario => {
				it(scenario.description, () => {
					const result = resolveA1CustomTokenType(scenario.token);
					expect(result).toBe(scenario.expected);
				});
			});
		});

		describe('border width tokens', () => {
			borderWidthTokenScenarios.forEach(scenario => {
				it(scenario.description, () => {
					const result = resolveA1CustomTokenType(scenario.token);
					expect(result).toBe(scenario.expected);
				});
			});
		});

		describe('spacing tokens', () => {
			spacingTokenScenarios.forEach(scenario => {
				it(scenario.description, () => {
					const result = resolveA1CustomTokenType(scenario.token);
					expect(result).toBe(scenario.expected);
				});
			});
		});

		describe('non-resolvable tokens', () => {
			nonResolvableTokenScenarios.forEach(scenario => {
				it(scenario.description, () => {
					const result = resolveA1CustomTokenType(scenario.token);
					expect(result).toBe(scenario.expected);
				});
			});
		});

		describe('edge cases', () => {
			edgeCaseScenarios.forEach(scenario => {
				it(scenario.description, () => {
					const result = resolveA1CustomTokenType(scenario.token);
					expect(result).toBe(scenario.expected);
				});
			});
		});
	});
});
