import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { PlatformConfig } from 'style-dictionary/types';
import { transformTo8DigitHexValues, transformTo8DigitHexValuesTransformName } from './color-eight-digit-hex.js';
import {
	alphaErrorTestScenarios,
	alphaValueEdgeCaseTestScenarios,
	createBasicColorDesignToken,
	createBasicMockConfig,
	createExpectedValueTransform,
	createNonColorDesignToken,
	errorTestScenarios,
	filterTestScenarios,
	remainingErrorTestScenarios,
	transformTestScenarios,
} from './color-eight-digit-hex.mock.spec.js';

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

// Create mock platform config and main config
const createMockPlatformConfig = (): PlatformConfig => {
	return {
		buildPath: 'build/',
		files: [],
	};
};

const mockConfig = createBasicMockConfig();
const mockPlatformConfig = createMockPlatformConfig();

describe('color-eight-digit-hex module', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('transformTo8DigitHexValuesTransformName', () => {
		it('should export the correct transform name', () => {
			expect(transformTo8DigitHexValuesTransformName).toBe('a1/color/hex8');
			expect(typeof transformTo8DigitHexValuesTransformName).toBe('string');
		});

		it('should be a non-empty string', () => {
			expect(transformTo8DigitHexValuesTransformName).toBeTruthy();
			expect(transformTo8DigitHexValuesTransformName.length).toBeGreaterThan(0);
		});

		it('should follow the expected naming convention', () => {
			expect(transformTo8DigitHexValuesTransformName).toMatch(/^a1\/color\//);
			expect(transformTo8DigitHexValuesTransformName).toContain('hex8');
		});
	});

	describe('transformTo8DigitHexValues', () => {
		describe('transform object structure', () => {
			it('should be a valid ValueTransform object', () => {
				expect(transformTo8DigitHexValues).toBeDefined();
				expect(typeof transformTo8DigitHexValues).toBe('object');
			});

			it('should have the correct name property', () => {
				expect(transformTo8DigitHexValues.name).toBe(transformTo8DigitHexValuesTransformName);
				expect(transformTo8DigitHexValues.name).toBe('a1/color/hex8');
			});

			it('should have the correct type property', () => {
				expect(transformTo8DigitHexValues.type).toBe('value');
			});

			it('should have the correct transitive property', () => {
				expect(transformTo8DigitHexValues.transitive).toBe(true);
			});

			it('should have a filter function', () => {
				expect(transformTo8DigitHexValues.filter).toBeDefined();
				expect(typeof transformTo8DigitHexValues.filter).toBe('function');
			});

			it('should have a transform function', () => {
				expect(transformTo8DigitHexValues.transform).toBeDefined();
				expect(typeof transformTo8DigitHexValues.transform).toBe('function');
			});

			it('should match the expected transform object structure', () => {
				const expected = createExpectedValueTransform();
				expect(transformTo8DigitHexValues).toMatchObject(expected);
			});
		});

		describe('filter function', () => {
			it('should accept TransformedToken parameter', () => {
				expect(transformTo8DigitHexValues.filter).toHaveLength(1);
			});

			it('should return boolean', () => {
				const token = createBasicColorDesignToken();
				const filterFn = transformTo8DigitHexValues.filter;
				expect(filterFn).toBeDefined();
				if (filterFn) {
					const result = filterFn(token, mockConfig);
					expect(typeof result).toBe('boolean');
				}
			});

			it('should return true for color tokens', () => {
				const token = createBasicColorDesignToken();
				const filterFn = transformTo8DigitHexValues.filter;
				if (filterFn) {
					const result = filterFn(token, mockConfig);
					expect(result).toBe(true);
				}
			});

			it('should return false for non-color tokens', () => {
				const token = createNonColorDesignToken();
				const filterFn = transformTo8DigitHexValues.filter;
				if (filterFn) {
					const result = filterFn(token, mockConfig);
					expect(result).toBe(false);
				}
			});

			filterTestScenarios.forEach(scenario => {
				it(scenario.description, () => {
					const filterFn = transformTo8DigitHexValues.filter;
					if (filterFn) {
						const result = filterFn(scenario.token, mockConfig);
						expect(result).toBe(scenario.expected);
					}
				});
			});
		});

		describe('transform function', () => {
			it('should accept correct parameters', () => {
				// Transform functions have their parameters defined by style-dictionary interface
				// We cannot check .length because it's not reliably exposed in JavaScript
				expect(typeof transformTo8DigitHexValues.transform).toBe('function');
			});

			transformTestScenarios.forEach(scenario => {
				it(scenario.description, () => {
					const result = transformTo8DigitHexValues.transform(scenario.token, mockPlatformConfig, mockConfig);
					expect(result).toBe(scenario.expected);
				});
			});

			errorTestScenarios.forEach(scenario => {
				it(scenario.description, () => {
					expect(() => transformTo8DigitHexValues.transform(scenario.token, mockPlatformConfig, mockConfig)).toThrow(
						scenario.expectedError,
					);
				});
			});
		});

		describe('edge cases and error handling', () => {
			it('should handle missing type gracefully', () => {
				const token = createBasicColorDesignToken();
				// Create a copy and remove the type property
				const tokenWithoutType = { ...token };
				delete (tokenWithoutType as Partial<typeof token>).$type;

				const filterFn = transformTo8DigitHexValues.filter;
				if (filterFn) {
					const result = filterFn(tokenWithoutType, mockConfig);
					expect(result).toBe(false);
				}
			});

			it('should throw error for invalid token values in transform', () => {
				const token = createBasicColorDesignToken();
				/**
				 * Use a value that will trigger the rgba validation error
				 * This should trigger "Insufficient values provided" error
				 */
				token.$value = 'rgba(255, 255)';

				expect(() => transformTo8DigitHexValues.transform(token, mockPlatformConfig, mockConfig)).toThrow();
			});

			// Test alpha value edge cases to cover the convertAlphaFloatToHex function branches
			describe('alpha value edge cases', () => {
				alphaValueEdgeCaseTestScenarios.forEach(({ description, token, expectedOutput }) => {
					it(description, () => {
						const result = transformTo8DigitHexValues.transform(token, mockPlatformConfig, mockConfig);
						expect(result).toBe(expectedOutput);
					});
				});
			});

			// Test alpha error cases to cover the alpha >= 1 error branch
			describe('alpha error cases', () => {
				alphaErrorTestScenarios.forEach(({ description, token, expectedError }) => {
					it(description, () => {
						expect(() => {
							transformTo8DigitHexValues.transform(token, mockPlatformConfig, mockConfig);
						}).toThrow(expectedError);
					});
				});
			});

			// Test remaining error cases to cover all uncovered lines
			describe('remaining error cases', () => {
				remainingErrorTestScenarios.forEach(({ description, token, expectedError }) => {
					it(description, () => {
						expect(() => {
							transformTo8DigitHexValues.transform(token, mockPlatformConfig, mockConfig);
						}).toThrow(expectedError);
					});
				});
			});
		});
	});
});
