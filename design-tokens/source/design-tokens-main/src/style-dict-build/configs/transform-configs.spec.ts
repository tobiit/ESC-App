import { describe, expect, it } from '@jest/globals';
import { defaultTransformOptions } from './transform-configs.js';
import { mockExpectedDefaultTransformOptions } from './transform-configs.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

describe('transform-configs', () => {
	describe('defaultTransformOptions', () => {
		it('should export defaultTransformOptions with correct structure', () => {
			expect(defaultTransformOptions).toBeDefined();
			expect(defaultTransformOptions).toEqual(mockExpectedDefaultTransformOptions);
		});

		it('should have excludeParentKeys set to false', () => {
			expect(defaultTransformOptions.excludeParentKeys).toBe(false);
		});

		it('should have alwaysAddFontStyle set to false', () => {
			expect(defaultTransformOptions.alwaysAddFontStyle).toBe(false);
		});

		it('should have ts/color/modifiers configured with hex format', () => {
			expect(defaultTransformOptions['ts/color/modifiers']).toBeDefined();
			expect(defaultTransformOptions['ts/color/modifiers']?.format).toBe('hex');
		});
	});

	describe('Mock Data Coverage', () => {
		it('should cover all mock constants', () => {
			expect(mockExpectedDefaultTransformOptions).toBeDefined();
		});
	});
});
