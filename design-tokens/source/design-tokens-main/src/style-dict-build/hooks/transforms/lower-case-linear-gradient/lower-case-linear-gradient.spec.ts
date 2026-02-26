import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Config, PlatformConfig } from 'style-dictionary/types';
import { lowerCaseLinearGradientTransform, lowerCaseLinearGradientTransformName } from './lower-case-linear-gradient.js';
import {
	createBasicFadeColorDesignToken,
	createBasicMockConfig,
	createBasicMockPlatformConfig,
	createExpectedValueTransform,
	createNonColorDesignToken,
	createNonFadeColorDesignToken,
	currentBehaviorLimitationScenarios,
	errorTestScenarios,
	filterTestScenarios,
	idealBehaviorScenarios,
	transformTestScenarios,
} from './lower-case-linear-gradient.mock.spec.js';

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
	return {
		...actualModule,
		logicalTokenSetError: jest.fn((message: string) => {
			throw new Error(message);
		}),
	};
});

// Import the mocked function
const { logicalTokenSetError } = jest.requireMock('../../../../shared/index.js') as {
	logicalTokenSetError: jest.MockedFunction<typeof import('../../../../shared/index.js').logicalTokenSetError>;
};

// Note: Logger mocking (suppressLoggerOutput/restoreLoggerMocks) is automatically handled by src/shared/testing/test-helpers.mock.spec.ts via jest.config.ts setupFilesAfterEnv
describe('lower-case-linear-gradient', () => {
	let mockConfig: Config;
	let mockPlatformConfig: PlatformConfig;

	beforeEach(() => {
		jest.clearAllMocks();
		mockConfig = createBasicMockConfig();
		mockPlatformConfig = createBasicMockPlatformConfig();
	});

	describe('lowerCaseLinearGradientTransformName', () => {
		it('should be defined', () => {
			expect(lowerCaseLinearGradientTransformName).toBeDefined();
		});

		it('should be a non-empty string', () => {
			expect(typeof lowerCaseLinearGradientTransformName).toBe('string');
			expect(lowerCaseLinearGradientTransformName.length).toBeGreaterThan(0);
		});

		it('should follow the expected naming convention', () => {
			expect(lowerCaseLinearGradientTransformName).toMatch(/^a1\//);
			expect(lowerCaseLinearGradientTransformName).toBe('a1/lower-case-linear-gradient');
		});
	});

	describe('lowerCaseLinearGradientTransform', () => {
		describe('transform object structure', () => {
			it('should be a valid ValueTransform object', () => {
				expect(lowerCaseLinearGradientTransform).toBeDefined();
				expect(typeof lowerCaseLinearGradientTransform).toBe('object');
			});

			it('should have the correct name property', () => {
				expect(lowerCaseLinearGradientTransform.name).toBe(lowerCaseLinearGradientTransformName);
				expect(lowerCaseLinearGradientTransform.name).toBe('a1/lower-case-linear-gradient');
			});

			it('should have the correct type property', () => {
				expect(lowerCaseLinearGradientTransform.type).toBe('value');
			});

			it('should have the correct transitive property', () => {
				expect(lowerCaseLinearGradientTransform.transitive).toBe(true);
			});

			it('should have a filter function', () => {
				expect(lowerCaseLinearGradientTransform.filter).toBeDefined();
				expect(typeof lowerCaseLinearGradientTransform.filter).toBe('function');
			});

			it('should have a transform function', () => {
				expect(lowerCaseLinearGradientTransform.transform).toBeDefined();
				expect(typeof lowerCaseLinearGradientTransform.transform).toBe('function');
			});

			it('should match the expected transform object structure', () => {
				const expected = createExpectedValueTransform();
				expect(lowerCaseLinearGradientTransform).toMatchObject(expected);
			});
		});

		describe('filter function', () => {
			it('should accept DesignToken parameter', () => {
				expect(lowerCaseLinearGradientTransform.filter).toHaveLength(1);
			});

			it('should return boolean', () => {
				const token = createBasicFadeColorDesignToken();
				const filterFn = lowerCaseLinearGradientTransform.filter;
				expect(filterFn).toBeDefined();
				if (filterFn) {
					const result = filterFn(token, mockConfig);
					expect(typeof result).toBe('boolean');
				}
			});

			it('should return true for color tokens with fade in name', () => {
				const token = createBasicFadeColorDesignToken();
				const filterFn = lowerCaseLinearGradientTransform.filter;
				if (filterFn) {
					const result = filterFn(token, mockConfig);
					expect(result).toBe(true);
				}
			});

			it('should return false for non-color tokens', () => {
				const token = createNonColorDesignToken();
				const filterFn = lowerCaseLinearGradientTransform.filter;
				if (filterFn) {
					const result = filterFn(token, mockConfig);
					expect(result).toBe(false);
				}
			});

			it('should return false for color tokens without fade in name', () => {
				const token = createNonFadeColorDesignToken();
				const filterFn = lowerCaseLinearGradientTransform.filter;
				if (filterFn) {
					const result = filterFn(token, mockConfig);
					expect(result).toBe(false);
				}
			});

			filterTestScenarios.forEach(scenario => {
				it(scenario.description, () => {
					const filterFn = lowerCaseLinearGradientTransform.filter;
					if (filterFn) {
						const result = filterFn(scenario.token, mockConfig);
						expect(result).toBe(scenario.expected);
						expect(typeof result).toBe('boolean');
					}
				});
			});
		});

		describe('transform function', () => {
			it('should accept correct parameters', () => {
				expect(lowerCaseLinearGradientTransform.transform).toHaveLength(1);
			});

			transformTestScenarios.forEach(scenario => {
				it(scenario.description, () => {
					const result = lowerCaseLinearGradientTransform.transform?.(scenario.token, mockPlatformConfig, mockConfig);
					expect(result).toBe(scenario.expected);
				});
			});

			describe('current behavior (documenting replaceAll() functionality)', () => {
				currentBehaviorLimitationScenarios.forEach(scenario => {
					it(scenario.description, () => {
						const result = lowerCaseLinearGradientTransform.transform?.(scenario.token, mockPlatformConfig, mockConfig);
						expect(result).toBe(scenario.expected);
					});
				});

				// Document the current correct behavior
				describe('documentation of current correct behavior', () => {
					idealBehaviorScenarios.forEach(scenario => {
						it(`${scenario.description} (current implementation works correctly)`, () => {
							const token = createBasicFadeColorDesignToken();
							token.$value = scenario.input;

							const result = lowerCaseLinearGradientTransform.transform?.(token, mockPlatformConfig, mockConfig);

							// Test current behavior - should match ideal behavior
							expect(result).toBe(scenario.currentActual);

							// Current implementation already achieves ideal behavior
							expect(result).toBe(scenario.idealExpected);

							// This test serves as documentation that the current implementation
							// using replaceAll() correctly replaces all occurrences of LINEAR-GRADIENT
						});
					});
				});
			});

			describe('error handling', () => {
				errorTestScenarios.forEach(scenario => {
					it(scenario.description, () => {
						expect(() => {
							lowerCaseLinearGradientTransform.transform?.(scenario.token, mockPlatformConfig, mockConfig);
						}).toThrow();

						expect(logicalTokenSetError).toHaveBeenCalledWith(scenario.expectedError);
					});
				});

				it('should call logicalTokenSetError for invalid token types', () => {
					const invalidToken = createBasicFadeColorDesignToken();
					invalidToken.$value = 42; // Set invalid type

					expect(() => {
						lowerCaseLinearGradientTransform.transform?.(invalidToken, mockPlatformConfig, mockConfig);
					}).toThrow();

					expect(logicalTokenSetError).toHaveBeenCalledTimes(1);
				});

				it('should handle edge case with array value', () => {
					const tokenWithArrayValue = createBasicFadeColorDesignToken();
					tokenWithArrayValue.$value = ['LINEAR-GRADIENT(90deg, red, blue)'] as unknown as string;

					expect(() => {
						lowerCaseLinearGradientTransform.transform?.(tokenWithArrayValue, mockPlatformConfig, mockConfig);
					}).toThrow();

					expect(logicalTokenSetError).toHaveBeenCalledWith(
						'Invalid token value type: "object". Expected string, received object: LINEAR-GRADIENT(90deg, red, blue)',
					);
				});
			});

			describe('edge cases', () => {
				it('should handle empty string value', () => {
					const tokenWithEmptyValue = createBasicFadeColorDesignToken();
					tokenWithEmptyValue.$value = '';

					const result = lowerCaseLinearGradientTransform.transform?.(tokenWithEmptyValue, mockPlatformConfig, mockConfig);
					expect(result).toBe('');
				});

				it('should handle value with only whitespace', () => {
					const tokenWithWhitespace = createBasicFadeColorDesignToken();
					tokenWithWhitespace.$value = '   ';

					const result = lowerCaseLinearGradientTransform.transform?.(tokenWithWhitespace, mockPlatformConfig, mockConfig);
					expect(result).toBe('   ');
				});

				it('should handle value with LINEAR-GRADIENT substring but not function', () => {
					const tokenWithSubstring = createBasicFadeColorDesignToken();
					tokenWithSubstring.$value = 'This has LINEAR-GRADIENT text but not as function';

					const result = lowerCaseLinearGradientTransform.transform?.(tokenWithSubstring, mockPlatformConfig, mockConfig);
					expect(result).toBe('This has linear-gradient text but not as function');
				});

				it('should handle mixed case variations (only exact matches)', () => {
					const tokenWithMixedCase = createBasicFadeColorDesignToken();
					tokenWithMixedCase.$value = 'Linear-Gradient(90deg, red, blue) and LINEAR-gradient(45deg, green, yellow)';

					// Only LINEAR-GRADIENT (all uppercase) should be replaced
					const result = lowerCaseLinearGradientTransform.transform?.(tokenWithMixedCase, mockPlatformConfig, mockConfig);
					expect(result).toBe('Linear-Gradient(90deg, red, blue) and LINEAR-gradient(45deg, green, yellow)');
				});
			});
		});

		describe('integration with real token scenarios', () => {
			it('should handle typical fade token with uppercase linear gradient', () => {
				const fadeToken = createBasicFadeColorDesignToken();
				fadeToken.$value = 'LINEAR-GRADIENT(90deg, rgba(0, 123, 255, 1) 0%, rgba(0, 123, 255, 0) 100%)';

				const shouldMatch = lowerCaseLinearGradientTransform.filter?.(fadeToken, mockConfig);
				expect(shouldMatch).toBe(true);

				const result = lowerCaseLinearGradientTransform.transform?.(fadeToken, mockPlatformConfig, mockConfig);
				expect(result).toBe('linear-gradient(90deg, rgba(0, 123, 255, 1) 0%, rgba(0, 123, 255, 0) 100%)');
			});

			it('should handle fade token with already correct linear gradient', () => {
				const fadeToken = createBasicFadeColorDesignToken();
				fadeToken.$value = 'linear-gradient(90deg, rgba(0, 123, 255, 1) 0%, rgba(0, 123, 255, 0) 100%)';

				const shouldMatch = lowerCaseLinearGradientTransform.filter?.(fadeToken, mockConfig);
				expect(shouldMatch).toBe(true);

				const result = lowerCaseLinearGradientTransform.transform?.(fadeToken, mockPlatformConfig, mockConfig);
				expect(result).toBe('linear-gradient(90deg, rgba(0, 123, 255, 1) 0%, rgba(0, 123, 255, 0) 100%)');
			});

			it('should not process non-fade color tokens even with LINEAR-GRADIENT', () => {
				const nonFadeToken = createNonFadeColorDesignToken();
				nonFadeToken.$value = 'LINEAR-GRADIENT(90deg, red, blue)';

				const shouldMatch = lowerCaseLinearGradientTransform.filter?.(nonFadeToken, mockConfig);
				expect(shouldMatch).toBe(false);

				// Transform should not be called for non-matching tokens in practice,
				// but if it were, it should still work correctly
				const result = lowerCaseLinearGradientTransform.transform?.(nonFadeToken, mockPlatformConfig, mockConfig);
				expect(result).toBe('linear-gradient(90deg, red, blue)');
			});
		});
	});
});
