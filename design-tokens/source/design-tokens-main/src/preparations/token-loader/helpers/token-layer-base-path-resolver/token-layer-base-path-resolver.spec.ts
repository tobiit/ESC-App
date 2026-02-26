import { describe, expect, it } from '@jest/globals';
import { resolveTokenLayerBasePath } from './token-layer-base-path-resolver.js';
import {
	mockExpectedComponents,
	mockExpectedCore,
	mockExpectedPartials,
	mockExpectedSemantic,
	mockFilePathPartsA1Components,
	mockFilePathPartsA1Core,
	mockFilePathPartsA1Partials,
	mockFilePathPartsA1Semantic,
} from './token-layer-base-path-resolver.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

describe('resolveTokenLayerBasePath', () => {
	describe('Token Layer Resolution', () => {
		it('should resolve core token layer correctly', () => {
			const result = resolveTokenLayerBasePath(mockFilePathPartsA1Core);

			expect(result).toEqual(mockExpectedCore);
			expect(result.tokenLayerBasePathLevel).toBe(3);
		});

		it('should resolve semantic token layer correctly', () => {
			const result = resolveTokenLayerBasePath(mockFilePathPartsA1Semantic);

			expect(result).toEqual(mockExpectedSemantic);
			expect(result.tokenLayerBasePathLevel).toBe(3);
		});

		it('should resolve components token layer correctly', () => {
			const result = resolveTokenLayerBasePath(mockFilePathPartsA1Components);

			expect(result).toEqual(mockExpectedComponents);
			expect(result.tokenLayerBasePathLevel).toBe(3);
		});

		it('should resolve partials token layer correctly', () => {
			const result = resolveTokenLayerBasePath(mockFilePathPartsA1Partials);

			expect(result).toEqual(mockExpectedPartials);
			expect(result.tokenLayerBasePathLevel).toBe(3);
		});
	});

	describe('Base Path Level', () => {
		it('should always return tokenLayerBasePathLevel of 3', () => {
			const layers = [mockFilePathPartsA1Core, mockFilePathPartsA1Semantic, mockFilePathPartsA1Components, mockFilePathPartsA1Partials];

			for (const layer of layers) {
				const result = resolveTokenLayerBasePath(layer);
				expect(result.tokenLayerBasePathLevel).toBe(3);
			}
		});
	});

	describe('Mock Data Coverage', () => {
		it('should cover all mock constants', () => {
			expect(mockFilePathPartsA1Core).toBeDefined();
			expect(mockFilePathPartsA1Semantic).toBeDefined();
			expect(mockFilePathPartsA1Components).toBeDefined();
			expect(mockFilePathPartsA1Partials).toBeDefined();
			expect(mockExpectedCore).toBeDefined();
			expect(mockExpectedSemantic).toBeDefined();
			expect(mockExpectedComponents).toBeDefined();
			expect(mockExpectedPartials).toBeDefined();
		});
	});
});
