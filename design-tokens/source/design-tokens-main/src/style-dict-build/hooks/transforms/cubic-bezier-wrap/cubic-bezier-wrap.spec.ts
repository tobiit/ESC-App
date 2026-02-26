import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { TransformedToken } from 'style-dictionary/types';
import { cubicBezierWrapTransform, cubicBezierWrapTransformName } from './cubic-bezier-wrap.js';
import {
	createExpectedValueTransform,
	errorTestScenarios,
	filterTestScenarios,
	mockConfig,
	mockPlatformConfig,
	transformTestScenarios,
} from './cubic-bezier-wrap.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock style-dictionary/enums to avoid ES module issues
jest.mock('style-dictionary/enums', () => {
	return {
		transformTypes: {
			value: 'value',
			attribute: 'attribute',
		},
	};
});

// Mock the shared dependencies - only mock logicalTokenSetError
jest.mock('../../../../shared/index.js', () => {
	const actualModule = jest.requireActual('../../../../shared/index.js') as Record<string, unknown>;
	const mockLogicalTokenSetError = jest.fn((errorMessage: string) => {
		throw new Error(errorMessage);
	});

	return {
		...actualModule,
		logicalTokenSetError: mockLogicalTokenSetError,
	};
});

describe('cubic-bezier-wrap module', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('cubicBezierWrapTransformName', () => {
		it('should export the correct transform name', () => {
			expect(cubicBezierWrapTransformName).toBe('a1/cubic-bezier-wrap');
			expect(typeof cubicBezierWrapTransformName).toBe('string');
		});

		it('should be a non-empty string', () => {
			expect(cubicBezierWrapTransformName).toBeTruthy();
			expect(cubicBezierWrapTransformName.length).toBeGreaterThan(0);
		});

		it('should follow the expected naming convention', () => {
			expect(cubicBezierWrapTransformName).toMatch(/^a1\//);
			expect(cubicBezierWrapTransformName).toContain('cubic-bezier-wrap');
		});
	});

	describe('cubicBezierWrapTransform', () => {
		describe('transform object structure', () => {
			it('should be a valid ValueTransform object', () => {
				expect(cubicBezierWrapTransform).toBeDefined();
				expect(typeof cubicBezierWrapTransform).toBe('object');
			});

			it('should have the correct name property', () => {
				expect(cubicBezierWrapTransform.name).toBe(cubicBezierWrapTransformName);
				expect(cubicBezierWrapTransform.name).toBe('a1/cubic-bezier-wrap');
			});

			it('should have the correct type property', () => {
				expect(cubicBezierWrapTransform.type).toBe('value');
			});

			it('should have the correct transitive property', () => {
				expect(cubicBezierWrapTransform.transitive).toBe(true);
			});

			it('should have a filter function', () => {
				expect(cubicBezierWrapTransform.filter).toBeDefined();
				expect(typeof cubicBezierWrapTransform.filter).toBe('function');
			});

			it('should have a transform function', () => {
				expect(cubicBezierWrapTransform.transform).toBeDefined();
				expect(typeof cubicBezierWrapTransform.transform).toBe('function');
			});

			it('should match the expected transform object structure', () => {
				const expected = createExpectedValueTransform();
				expect(cubicBezierWrapTransform).toMatchObject(expected);
			});
		});

		describe('filter function', () => {
			it('should accept TransformedToken parameter', () => {
				expect(cubicBezierWrapTransform.filter).toHaveLength(1);
			});

			filterTestScenarios.forEach(scenario => {
				it(scenario.description, () => {
					const result = cubicBezierWrapTransform.filter?.(scenario.token, mockPlatformConfig);
					expect(result).toBe(scenario.expected);
					expect(typeof result).toBe('boolean');
				});
			});
		});

		describe('transform function', () => {
			it('should accept correct parameters', () => {
				expect(cubicBezierWrapTransform.transform).toHaveLength(1);
			});

			transformTestScenarios.forEach(scenario => {
				it(scenario.description, () => {
					const result = cubicBezierWrapTransform.transform?.(scenario.token, mockPlatformConfig, mockConfig);
					expect(result).toBe(scenario.expected);
					expect(typeof result).toBe('string');
				});
			});

			errorTestScenarios.forEach(scenario => {
				it(scenario.description, () => {
					expect(() => {
						cubicBezierWrapTransform.transform?.(scenario.token, mockPlatformConfig, mockConfig);
					}).toThrow(scenario.expectedError);
				});
			});
		});

		describe('edge cases and error handling', () => {
			it('should handle missing type gracefully', () => {
				const tokenWithoutType = {
					...filterTestScenarios[0].token,
					$type: undefined,
				} as TransformedToken;

				const result = cubicBezierWrapTransform.filter?.(tokenWithoutType, mockPlatformConfig);
				expect(result).toBe(false);
			});

			it('should handle missing name gracefully', () => {
				const tokenWithoutName = {
					...filterTestScenarios[0].token,
					name: '',
				} as TransformedToken;

				const result = cubicBezierWrapTransform.filter?.(tokenWithoutName, mockPlatformConfig);
				expect(result).toBe(false);
			});

			it('should handle empty name gracefully', () => {
				const tokenWithEmptyName = {
					...filterTestScenarios[0].token,
					name: '',
				} as TransformedToken;

				const result = cubicBezierWrapTransform.filter?.(tokenWithEmptyName, mockPlatformConfig);
				expect(result).toBe(false);
			});
		});
	});
});
