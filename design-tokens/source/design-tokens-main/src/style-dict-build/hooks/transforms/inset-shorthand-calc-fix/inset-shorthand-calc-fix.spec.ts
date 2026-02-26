import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { DesignToken } from 'style-dictionary/types';
import { insetShorthandCalcFixTransform, insetShorthandCalcFixTransformName } from './inset-shorthand-calc-fix.js';
import {
	createExpectedValueTransform,
	errorTestScenarios,
	filterTestScenarios,
	mockConfig,
	mockPlatformConfig,
	transformTestScenarios,
} from './inset-shorthand-calc-fix.mock.spec.js';

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

// Mock @tokens-studio/sd-transforms
jest.mock('@tokens-studio/sd-transforms', () => {
	return {
		checkAndEvaluateMath: jest.fn((token: DesignToken) => {
			const value = token.$value as string;
			// Mock implementation for testing purposes
			if (value === 'calc(16px + 8px)') {
				return '24px';
			}
			if (value === '16px / 2') {
				return '8px';
			}
			if (value === 'calc(24px - 4px)') {
				return '20px';
			}
			if (value === '(calc(8px + 4px))') {
				return '12px';
			}
			return value;
		}),
	};
});

// Note: Logger mocking (suppressLoggerOutput/restoreLoggerMocks) is automatically handled by src/shared/testing/test-helpers.mock.spec.ts via jest.config.ts setupFilesAfterEnv
describe('inset-shorthand-calc-fix module', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('insetShorthandCalcFixTransformName', () => {
		it('should export the correct transform name', () => {
			expect(insetShorthandCalcFixTransformName).toBe('a1/inset-shorthand-calc-fix');
			expect(typeof insetShorthandCalcFixTransformName).toBe('string');
		});

		it('should be a non-empty string', () => {
			expect(insetShorthandCalcFixTransformName).toBeTruthy();
			expect(insetShorthandCalcFixTransformName.length).toBeGreaterThan(0);
		});

		it('should follow the expected naming convention', () => {
			expect(insetShorthandCalcFixTransformName).toMatch(/^a1\//);
			expect(insetShorthandCalcFixTransformName).toContain('inset-shorthand-calc-fix');
		});
	});

	describe('insetShorthandCalcFixTransform', () => {
		describe('transform object structure', () => {
			it('should be a valid ValueTransform object', () => {
				expect(insetShorthandCalcFixTransform).toBeDefined();
				expect(typeof insetShorthandCalcFixTransform).toBe('object');
			});

			it('should have the correct name property', () => {
				expect(insetShorthandCalcFixTransform.name).toBe(insetShorthandCalcFixTransformName);
				expect(insetShorthandCalcFixTransform.name).toBe('a1/inset-shorthand-calc-fix');
			});

			it('should have the correct type property', () => {
				expect(insetShorthandCalcFixTransform.type).toBe('value');
			});

			it('should have the correct transitive property', () => {
				expect(insetShorthandCalcFixTransform.transitive).toBe(true);
			});

			it('should have a filter function', () => {
				expect(insetShorthandCalcFixTransform.filter).toBeDefined();
				expect(typeof insetShorthandCalcFixTransform.filter).toBe('function');
			});

			it('should have a transform function', () => {
				expect(insetShorthandCalcFixTransform.transform).toBeDefined();
				expect(typeof insetShorthandCalcFixTransform.transform).toBe('function');
			});

			it('should match the expected transform object structure', () => {
				const expected = createExpectedValueTransform();
				expect(insetShorthandCalcFixTransform).toMatchObject(expected);
			});
		});

		describe('filter function', () => {
			it('should accept DesignToken parameter', () => {
				expect(insetShorthandCalcFixTransform.filter).toHaveLength(1);
			});

			filterTestScenarios.forEach(scenario => {
				it(scenario.description, () => {
					const result = insetShorthandCalcFixTransform.filter?.(scenario.token, mockPlatformConfig);
					expect(result).toBe(scenario.expected);
					expect(typeof result).toBe('boolean');
				});
			});
		});

		describe('transform function', () => {
			it('should accept correct parameters', () => {
				expect(insetShorthandCalcFixTransform.transform).toHaveLength(1);
			});

			transformTestScenarios.forEach(scenario => {
				it(scenario.description, () => {
					const result = insetShorthandCalcFixTransform.transform?.(scenario.token, mockPlatformConfig, mockConfig);
					expect(result).toBe(scenario.expected);
					expect(typeof result).toBe('string');
				});
			});

			errorTestScenarios.forEach(scenario => {
				it(scenario.description, () => {
					expect(() => {
						insetShorthandCalcFixTransform.transform?.(scenario.token, mockPlatformConfig, mockConfig);
					}).toThrow(scenario.expectedError);
				});
			});
		});

		describe('edge cases and error handling', () => {
			it('should handle missing type gracefully', () => {
				const tokenWithoutType = {
					...filterTestScenarios[0].token,
					$type: undefined,
				};

				const result = insetShorthandCalcFixTransform.filter?.(tokenWithoutType, mockPlatformConfig);
				expect(result).toBe(false);
			});

			it('should handle missing name gracefully', () => {
				const tokenWithoutName = {
					...filterTestScenarios[0].token,
					name: '',
				};

				const result = insetShorthandCalcFixTransform.filter?.(tokenWithoutName, mockPlatformConfig);
				expect(result).toBe(false);
			});

			it('should handle empty name gracefully', () => {
				const tokenWithEmptyName = {
					...filterTestScenarios[0].token,
					name: '',
				};

				const result = insetShorthandCalcFixTransform.filter?.(tokenWithEmptyName, mockPlatformConfig);
				expect(result).toBe(false);
			});
		});

		describe('transform logic edge cases', () => {
			it('should handle value without parentheses or division', () => {
				const simpleToken = {
					...filterTestScenarios[0].token,
					$value: 'simple-value',
				};

				const result = insetShorthandCalcFixTransform.transform?.(simpleToken, mockPlatformConfig, mockConfig);
				expect(result).toBe('simple-value');
			});

			it('should handle empty string value', () => {
				const emptyValueToken = {
					...filterTestScenarios[0].token,
					$value: '',
				};

				const result = insetShorthandCalcFixTransform.transform?.(emptyValueToken, mockPlatformConfig, mockConfig);
				expect(result).toBe('');
			});

			it('should handle value with only parentheses', () => {
				const parenOnlyToken = {
					...filterTestScenarios[0].token,
					$value: '(test)',
				};

				const result = insetShorthandCalcFixTransform.transform?.(parenOnlyToken, mockPlatformConfig, mockConfig);
				expect(result).toBe('(test)');
			});

			it('should handle value with only division', () => {
				const divisionOnlyToken = {
					...filterTestScenarios[0].token,
					$value: 'test/value',
				};

				const result = insetShorthandCalcFixTransform.transform?.(divisionOnlyToken, mockPlatformConfig, mockConfig);
				expect(result).toBe('test/value');
			});
		});
	});
});
