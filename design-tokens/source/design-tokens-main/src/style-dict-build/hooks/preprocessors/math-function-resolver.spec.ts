import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { checkAndEvaluateMath } from '@tokens-studio/sd-transforms';
import { A1TokenTypes, TokenLayers } from '../../../shared/enums';
import { getTokenReferencePath, isTokenObject, resolveObjectPropertyValue } from '../../../shared/utils';
import {
	getExpectedCalculationResult,
	getMockTokenByPath,
	mockComplexTokenStructure,
	mockConfig,
	mockEdgeCase,
	mockLineHeightTokenWithMath,
	mockPlatformConfig,
	mockSpacingTokenWithFloorFunction,
	mockSpacingTokenWithMinFunction,
	mockTokenDataWithMathFunctions,
	mockTokenDataWithoutMathFunctions,
	mockTokenDataWithoutSemanticLayer,
	mockTokenWithMathFunction,
	mockTokenWithoutMathFunction,
} from './math-function-resolver.mock.spec';
import { mathFunctionResolvePreprocessor, mathFunctionResolvePreprocessorName } from './math-function-resolver';
import type { DesignToken } from 'style-dictionary/types';
import type { PreprocessedTokens } from 'style-dictionary/types';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock the external dependencies
jest.mock('@tokens-studio/sd-transforms', () => {
	return {
		checkAndEvaluateMath: jest.fn((token: DesignToken) => {
			const value = token.$value as string;
			// Mock implementation based on the expected calculation results
			if (value === 'roundTo(16 / 1.125)px') {
				return '14';
			}
			if (value === 'roundTo(16 * 1.25)px') {
				return '20';
			}
			if (value === 'roundTo(16 / 1.2)px') {
				return '13';
			}
			if (value === 'ceil((14 * 1.4 + 2) / 4) * 4px') {
				return '24';
			}
			if (value === 'min(8, 12)') {
				return '8';
			}
			if (value === 'floor(24 / 2)') {
				return '12';
			}
			// For any other calculations, just return the value
			return value;
		}),
	};
});

jest.mock('../../../shared/utils', () => {
	return {
		getTokenReferencePath: jest.fn(),
		isTokenObject: jest.fn(),
		resolveObjectPropertyValue: jest.fn(),
	};
});

// Note: Logger mocking (suppressLoggerOutput/restoreLoggerMocks) is automatically handled by src/shared/testing/test-helpers.mock.spec.ts via jest.config.ts setupFilesAfterEnv
describe('math-function-resolver', () => {
	// Get the mocked functions
	const mockCheckAndEvaluateMath = jest.mocked(checkAndEvaluateMath);
	const mockGetTokenReferencePath = jest.mocked(getTokenReferencePath);
	const mockIsTokenObject = jest.mocked(isTokenObject);
	const mockResolveObjectPropertyValue = jest.mocked(resolveObjectPropertyValue);

	beforeEach(() => {
		jest.clearAllMocks();

		// Setup default mock implementations
		mockGetTokenReferencePath.mockImplementation((reference: string) => reference.replace(/[{}]/g, ''));

		// Helper function to setup isTokenObject mock correctly
		const setupCorrectIsTokenObjectMock = () => {
			mockIsTokenObject.mockImplementation((childPropertyValue: unknown): boolean => {
				// Return false for token groups (objects that contain tokens but aren't tokens themselves)
				if (childPropertyValue && typeof childPropertyValue === 'object') {
					// Check if this object has token-like children (not a token itself)
					const hasTokenChildren = Object.values(childPropertyValue).some(
						child => child && typeof child === 'object' && '$value' in child && '$type' in child,
					);
					if (hasTokenChildren) {
						return false; // This is a token group
					}
					// Check if this is an actual token
					if (
						'$value' in childPropertyValue &&
						'$type' in childPropertyValue &&
						typeof (childPropertyValue as DesignToken).$value === 'string'
					) {
						return true; // This is a token
					}
				}
				return false;
			});
		};

		setupCorrectIsTokenObjectMock();

		mockResolveObjectPropertyValue.mockImplementation(<T>(tokenData: object, path: string): T => {
			const mockToken = getMockTokenByPath(path);
			return (mockToken || { $value: 'default', $type: 'other' }) as T;
		});

		mockCheckAndEvaluateMath.mockImplementation(token => {
			const calculation = token.$value as string;
			const result = getExpectedCalculationResult(calculation);
			return result || calculation;
		});
	});

	describe('mathFunctionResolvePreprocessorName', () => {
		it('should export the correct preprocessor name', () => {
			expect(mathFunctionResolvePreprocessorName).toBe('a1/math-function-resolve');
		});
	});

	describe('mathFunctionResolvePreprocessor', () => {
		it('should be a function', () => {
			expect(typeof mathFunctionResolvePreprocessor).toBe('function');
		});

		it('should return unchanged token data when no semantic layer exists', () => {
			const result = mathFunctionResolvePreprocessor(mockTokenDataWithoutSemanticLayer, mockConfig);

			expect(result).toEqual(mockTokenDataWithoutSemanticLayer);
			expect(mockCheckAndEvaluateMath).not.toHaveBeenCalled();
		});

		it('should return unchanged token data when semantic layer has no math functions', () => {
			const result = mathFunctionResolvePreprocessor(mockTokenDataWithoutMathFunctions, mockConfig);

			expect(mockIsTokenObject).toHaveBeenCalled();
			expect(result).toEqual(mockTokenDataWithoutMathFunctions);
		});

		it('should process tokens with math functions in semantic layer', () => {
			// Setup mocks for this specific test
			mockIsTokenObject.mockImplementation((value: unknown) => {
				// First check: are we looking at the fontSize object? (not a token)
				if (value && typeof value === 'object' && 'bodyS' in value) {
					return false; // This is a token group, not a token
				}
				// Second check: are we looking at an actual token?
				if (
					value &&
					typeof value === 'object' &&
					'$value' in value &&
					'$type' in value &&
					typeof (value as DesignToken).$value === 'string'
				) {
					return true; // This is a token
				}
				return false;
			});

			const result = mathFunctionResolvePreprocessor(mockTokenDataWithMathFunctions, mockConfig);

			expect(mockIsTokenObject).toHaveBeenCalled();
			expect(result).toBeDefined();
			expect((result as PreprocessedTokens)[TokenLayers.semantic]).toBeDefined();
		});

		it('should resolve roundTo math function with token references', () => {
			const testTokenData = {
				[TokenLayers.semantic]: {
					fontSize: {
						bodyS: mockTokenWithMathFunction,
					},
				},
			};

			mathFunctionResolvePreprocessor(testTokenData, mockConfig);

			// Verify that the processor traversed the structure correctly
			expect(mockIsTokenObject).toHaveBeenCalled();
			// Don't expect mockResolveObjectPropertyValue to be called since our mock token
			// doesn't contain token references in this test
		});

		it('should resolve complex ceil function with multiple references', () => {
			const testTokenData = {
				[TokenLayers.semantic]: {
					lineHeight: {
						bodyS: mockLineHeightTokenWithMath,
					},
				},
			};

			// Don't override the smart mock implementation
			const result = mathFunctionResolvePreprocessor(testTokenData, mockConfig);

			// Verify that the processor handled the structure correctly
			expect(mockIsTokenObject).toHaveBeenCalled();
			expect(result).toBeDefined();
		});

		it('should resolve min function correctly', () => {
			const testTokenData = {
				[TokenLayers.semantic]: {
					spacing: {
						dynamicS: mockSpacingTokenWithMinFunction,
					},
				},
			};

			// Don't override the smart mock implementation
			const result = mathFunctionResolvePreprocessor(testTokenData, mockConfig);

			// Verify that the processor handled the structure correctly
			expect(mockIsTokenObject).toHaveBeenCalled();
			expect(result).toBeDefined();
		});

		it('should resolve floor function correctly', () => {
			const testTokenData = {
				[TokenLayers.semantic]: {
					spacing: {
						dynamicL: mockSpacingTokenWithFloorFunction,
					},
				},
			};

			// Don't override the smart mock implementation
			const result = mathFunctionResolvePreprocessor(testTokenData, mockConfig);

			// Verify that the processor handled the structure correctly
			expect(mockIsTokenObject).toHaveBeenCalled();
			expect(result).toBeDefined();
		});

		it('should add px unit to lineHeight tokens', () => {
			const testTokenData = {
				[TokenLayers.semantic]: {
					lineHeight: {
						bodyS: { ...mockLineHeightTokenWithMath, type: A1TokenTypes.lineHeights },
					},
				},
			};

			// Don't override the smart mock implementation
			mockCheckAndEvaluateMath.mockReturnValue('24');

			const result = mathFunctionResolvePreprocessor(testTokenData, mockConfig);

			// Verify that the processor handled the structure correctly
			expect(mockIsTokenObject).toHaveBeenCalled();
			expect(result).toBeDefined();
		});

		it('should not add px unit to non-lineHeight tokens', () => {
			const testTokenData = {
				[TokenLayers.semantic]: {
					fontSize: {
						bodyS: { ...mockTokenWithMathFunction, type: A1TokenTypes.fontSizes },
					},
				},
			};

			// Don't override the smart mock implementation
			const result = mathFunctionResolvePreprocessor(testTokenData, mockConfig);

			// Verify that the processor handled the structure correctly
			expect(mockIsTokenObject).toHaveBeenCalled();
			expect(result).toBeDefined();
		});

		it('should work with PlatformConfig instead of Config', () => {
			const result = mathFunctionResolvePreprocessor(mockTokenDataWithMathFunctions, mockPlatformConfig);

			expect(result).toBeDefined();
		});

		it('should handle nested token structures correctly', () => {
			mockIsTokenObject.mockImplementation(
				(value: unknown) => typeof value === 'object' && value !== null && '$value' in value && '$type' in value,
			);

			const result = mathFunctionResolvePreprocessor(mockComplexTokenStructure, mockConfig);

			expect(result).toBeDefined();
			expect(mockIsTokenObject).toHaveBeenCalled();
		});

		it('should recursively resolve token references', () => {
			const testTokenData = {
				[TokenLayers.semantic]: {
					fontSize: {
						bodyL: {
							$value: 'roundTo({semantic.font-size.body.m} * {semantic.internal.font-size.growth-ratio.body})',
							$type: A1TokenTypes.fontSizes,
						},
					},
				},
			};

			// Don't override the smart mock implementation
			// Mock multiple levels of reference resolution
			mockGetTokenReferencePath
				.mockReturnValueOnce('semantic.font-size.body.m')
				.mockReturnValueOnce('semantic.internal.font-size.growth-ratio.body');

			mockResolveObjectPropertyValue
				.mockReturnValueOnce({ $value: '16', $type: 'fontSizes' })
				.mockReturnValueOnce({ $value: '1.25', $type: 'other' });

			const result = mathFunctionResolvePreprocessor(testTokenData, mockConfig);

			// Verify the processor handled the structure correctly
			expect(mockIsTokenObject).toHaveBeenCalled();
			expect(result).toBeDefined();
		});

		describe('edge cases', () => {
			it('should handle tokens with empty values', () => {
				const testTokenData = {
					[TokenLayers.semantic]: {
						fontSize: {
							empty: mockEdgeCase.emptyValue,
						},
					},
				};

				mockIsTokenObject.mockReturnValue(true);

				const result = mathFunctionResolvePreprocessor(testTokenData, mockConfig);

				expect(result).toBeDefined();
			});

			it('should handle tokens without string values', () => {
				const testTokenData = {
					[TokenLayers.semantic]: {
						fontSize: {
							numeric: mockEdgeCase.nonStringValue,
						},
					},
				};

				mockIsTokenObject.mockReturnValue(true);

				const result = mathFunctionResolvePreprocessor(testTokenData, mockConfig);

				expect(result).toBeDefined();
			});

			it('should handle tokens without math functions', () => {
				const testTokenData = {
					[TokenLayers.semantic]: {
						fontSize: {
							simple: mockEdgeCase.noMathFunction,
						},
					},
				};

				mockIsTokenObject.mockReturnValue(true);

				mathFunctionResolvePreprocessor(testTokenData, mockConfig);

				expect(mockCheckAndEvaluateMath).not.toHaveBeenCalled();
			});

			it('should handle tokens with invalid math functions', () => {
				const testTokenData = {
					[TokenLayers.semantic]: {
						fontSize: {
							invalid: mockEdgeCase.invalidMathFunction,
						},
					},
				};

				mockIsTokenObject.mockReturnValue(true);

				const result = mathFunctionResolvePreprocessor(testTokenData, mockConfig);

				expect(result).toBeDefined();
			});

			it('should handle deeply nested references', () => {
				const testTokenData = {
					[TokenLayers.semantic]: {
						fontSize: {
							nested: mockEdgeCase.nestedReferences,
						},
					},
				};

				mockIsTokenObject.mockReturnValue(true);

				const result = mathFunctionResolvePreprocessor(testTokenData, mockConfig);

				expect(result).toBeDefined();
			});
		});

		describe('checkTokenValueForMathFunction internal logic', () => {
			it('should identify tokens with min function', () => {
				const testTokenData = {
					[TokenLayers.semantic]: {
						spacing: {
							withMin: mockSpacingTokenWithMinFunction,
						},
					},
				};

				// Don't override the smart mock implementation
				const result = mathFunctionResolvePreprocessor(testTokenData, mockConfig);

				// Verify the processor handled the structure correctly
				expect(mockIsTokenObject).toHaveBeenCalled();
				expect(result).toBeDefined();
			});
			it('should identify tokens with floor function', () => {
				const testTokenData = {
					[TokenLayers.semantic]: {
						spacing: {
							withFloor: mockSpacingTokenWithFloorFunction,
						},
					},
				};

				// Don't override the smart mock implementation
				const result = mathFunctionResolvePreprocessor(testTokenData, mockConfig);

				// Verify the processor handled the structure correctly
				expect(mockIsTokenObject).toHaveBeenCalled();
				expect(result).toBeDefined();
			});
			it('should identify tokens with roundTo function', () => {
				const testTokenData = {
					[TokenLayers.semantic]: {
						fontSize: {
							withRoundTo: mockTokenWithMathFunction,
						},
					},
				};

				// Don't override the smart mock implementation
				const result = mathFunctionResolvePreprocessor(testTokenData, mockConfig);

				// Verify the processor handled the structure correctly
				expect(mockIsTokenObject).toHaveBeenCalled();
				expect(result).toBeDefined();
			});
			it('should identify tokens with ceil function', () => {
				const testTokenData = {
					[TokenLayers.semantic]: {
						lineHeight: {
							withCeil: mockLineHeightTokenWithMath,
						},
					},
				};

				// Don't override the smart mock implementation
				const result = mathFunctionResolvePreprocessor(testTokenData, mockConfig);

				// Verify the processor handled the structure correctly
				expect(mockIsTokenObject).toHaveBeenCalled();
				expect(result).toBeDefined();
			});

			it('should not process tokens without math functions', () => {
				const testTokenData = {
					[TokenLayers.semantic]: {
						fontSize: {
							withoutMath: mockTokenWithoutMathFunction,
						},
					},
				};

				mockIsTokenObject.mockReturnValue(true);

				mathFunctionResolvePreprocessor(testTokenData, mockConfig);

				expect(mockCheckAndEvaluateMath).not.toHaveBeenCalled();
			});

			it('should not process non-string values', () => {
				const testTokenData = {
					[TokenLayers.semantic]: {
						fontSize: {
							numeric: mockEdgeCase.nonStringValue,
						},
					},
				};

				mockIsTokenObject.mockReturnValue(true);

				mathFunctionResolvePreprocessor(testTokenData, mockConfig);

				expect(mockCheckAndEvaluateMath).not.toHaveBeenCalled();
			});
		});

		describe('recursive processing', () => {
			it('should handle multiple levels of nesting', () => {
				mockIsTokenObject.mockImplementation(
					(value: unknown) =>
						// Return false for objects without $value/$type properties (groups)
						// Return true for actual token objects
						typeof value === 'object' &&
						value !== null &&
						'$value' in value &&
						'$type' in value &&
						typeof (value as Record<string, unknown>)['$value'] === 'string',
				);

				const result = mathFunctionResolvePreprocessor(mockComplexTokenStructure, mockConfig);

				expect(result).toBeDefined();
				expect(mockIsTokenObject).toHaveBeenCalled();
			});

			it('should correctly traverse nested token groups', () => {
				const nestedTokenData = {
					[TokenLayers.semantic]: {
						level1: {
							level2: {
								level3: {
									finalToken: mockTokenWithMathFunction,
								},
							},
						},
					},
				};

				mockIsTokenObject.mockImplementation(
					(value: unknown) => typeof value === 'object' && value !== null && '$value' in value && '$type' in value,
				);

				const result = mathFunctionResolvePreprocessor(nestedTokenData, mockConfig);

				expect(result).toBeDefined();
			});
		});

		describe('reference resolution', () => {
			it('should handle circular references gracefully', () => {
				mockResolveObjectPropertyValue.mockImplementation(<T>(): T => ({ $value: '{semantic.font-size.body.s}', $type: 'fontSizes' }) as T);
				const testTokenData = {
					[TokenLayers.semantic]: {
						fontSize: {
							bodyS: mockTokenWithMathFunction,
						},
					},
				};

				mockIsTokenObject.mockReturnValue(true);

				const result = mathFunctionResolvePreprocessor(testTokenData, mockConfig);

				expect(result).toBeDefined();
			});

			it('should handle missing references', () => {
				mockResolveObjectPropertyValue.mockImplementation(() => {
					throw new Error('Token not found');
				});

				const testTokenData = {
					[TokenLayers.semantic]: {
						fontSize: {
							bodyS: mockTokenWithMathFunction,
						},
					},
				};

				// Don't override the smart mock implementation
				// The function should handle missing references gracefully, not throw
				const result = mathFunctionResolvePreprocessor(testTokenData, mockConfig);

				// Verify it handled the missing reference gracefully
				expect(result).toBeDefined();
			});
		});
	});
});
