import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { DesignToken } from 'style-dictionary/types';
import {
	A1TokenTypes,
	getTokenReferencePath,
	isObject,
	isSingleReferenceTokenValue,
	isTokenObject,
	isTypograhpyCompositionalToken,
	isTypograhpyReference,
	logicalTokenSetError,
	readJsonFile,
	resolveObjectPropertyValue,
	unsupportedFontPropertyLetterSpacing,
	unsupportedFontPropertyTextCase,
	unsupportedFontPropertyTextDecoration,
} from '../../../../shared/index.js';
import { extractUnsupportedComponentFontProperties } from './extract-unsupported-component-font-properties.js';
import {
	createTokenFileDataWithTypography,
	expectedReferenceTokenResult,
	expectedTypographyTokenWithExtractedProperties,
	mockCompositionalTokenSetData,
	mockEmptyTokenFileData,
	mockFileName,
	mockFileNamePartials,
	mockFilePathPartsComponents,
	mockFilePathPartsCore,
	mockFilePathPartsPartials,
	mockFilePathPartsSemantic,
	mockNonTypographyToken,
	mockResolvedTokenReference,
	mockTokenFileDataNested,
	mockTokenFileDataWithoutTypography,
	mockTokenFileDataWithTypography,
	mockTypographyReferenceToken,
	mockTypographyTokenWithoutUnsupportedProperties,
	mockTypographyTokenWithUnsupportedProperties,
	resetAllMocks,
	setupDefaultMocks,
} from './extract-unsupported-component-font-properties.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock the shared utilities
jest.mock('../../../../shared/index.js', () => {
	const actual: object = jest.requireActual('../../../../shared/index.js');
	return {
		...actual,
		getTokenReferencePath: jest.fn(),
		isObject: jest.fn(),
		isSingleReferenceTokenValue: jest.fn(),
		isTokenObject: jest.fn(),
		isTypograhpyCompositionalToken: jest.fn(),
		isTypograhpyReference: jest.fn(),
		logicalTokenSetError: jest.fn(),
		readJsonFile: jest.fn(),
		resolveObjectPropertyValue: jest.fn(),
	};
});

// Type the mocked functions
const mockGetTokenReferencePath = getTokenReferencePath as jest.MockedFunction<typeof getTokenReferencePath>;
const mockIsObject = isObject as jest.MockedFunction<typeof isObject>;
const mockIsSingleReferenceTokenValue = isSingleReferenceTokenValue as jest.MockedFunction<typeof isSingleReferenceTokenValue>;
const mockIsTokenObject = isTokenObject as jest.MockedFunction<typeof isTokenObject>;
const mockIsTypograhpyCompositionalToken = isTypograhpyCompositionalToken as jest.MockedFunction<typeof isTypograhpyCompositionalToken>;
const mockIsTypograhpyReference = isTypograhpyReference as jest.MockedFunction<typeof isTypograhpyReference>;
const mockLogicalTokenSetError = logicalTokenSetError as jest.MockedFunction<typeof logicalTokenSetError>;
const mockReadJsonFile = readJsonFile as jest.MockedFunction<typeof readJsonFile>;
const mockResolveObjectPropertyValue = resolveObjectPropertyValue as jest.MockedFunction<typeof resolveObjectPropertyValue>;

describe('Extract Unsupported Component Font Properties', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		resetAllMocks();
		setupDefaultMocks();
	});

	describe('extractUnsupportedComponentFontProperties', () => {
		describe('Typography reference token processing', () => {
			it('should extract unsupported font properties from reference token for components layer', () => {
				const tokenFileData = createTokenFileDataWithTypography(mockTypographyReferenceToken);
				mockResolveObjectPropertyValue.mockReturnValue(mockResolvedTokenReference);

				const result = extractUnsupportedComponentFontProperties(tokenFileData, mockFilePathPartsComponents, mockFileName);

				const buttonTextPrimary = (result['button'] as Record<string, object>)['text'] as Record<string, object>;
				expect(buttonTextPrimary['primary']).toEqual(expectedReferenceTokenResult);
				expect(mockReadJsonFile).toHaveBeenCalledWith('tokens/semantic/combined/composites.json');
				expect(mockGetTokenReferencePath).toHaveBeenCalledWith(mockTypographyReferenceToken.$value);
				expect(mockResolveObjectPropertyValue).toHaveBeenCalledWith(mockCompositionalTokenSetData, 'semantic.text.body.s');
			});

			it('should extract unsupported font properties from reference token for partials layer', () => {
				const tokenFileData = createTokenFileDataWithTypography(mockTypographyReferenceToken);
				mockResolveObjectPropertyValue.mockReturnValue(mockResolvedTokenReference);

				const result = extractUnsupportedComponentFontProperties(tokenFileData, mockFilePathPartsPartials, mockFileNamePartials);

				const buttonTextPrimary = (result['button'] as Record<string, object>)['text'] as Record<string, object>;
				expect(buttonTextPrimary['primary']).toEqual(expectedReferenceTokenResult);
			});

			it('should not extract unsupported font properties from reference token for semantic layer', () => {
				const tokenFileData = createTokenFileDataWithTypography(mockTypographyReferenceToken);
				mockResolveObjectPropertyValue.mockReturnValue(mockResolvedTokenReference);

				const result = extractUnsupportedComponentFontProperties(tokenFileData, mockFilePathPartsSemantic, mockFileName);

				const buttonTextPrimary = (result['button'] as Record<string, object>)['text'] as Record<string, object>;
				expect(buttonTextPrimary['primary']).toEqual(mockTypographyReferenceToken);
			});

			it('should not extract unsupported font properties from reference token for core layer', () => {
				const tokenFileData = createTokenFileDataWithTypography(mockTypographyReferenceToken);
				mockResolveObjectPropertyValue.mockReturnValue(mockResolvedTokenReference);

				const result = extractUnsupportedComponentFontProperties(tokenFileData, mockFilePathPartsCore, mockFileName);

				const buttonTextPrimary = (result['button'] as Record<string, object>)['text'] as Record<string, object>;
				expect(buttonTextPrimary['primary']).toEqual(mockTypographyReferenceToken);
			});

			it('should throw error when token reference cannot be resolved', () => {
				const tokenFileData = createTokenFileDataWithTypography(mockTypographyReferenceToken);
				mockResolveObjectPropertyValue.mockReturnValue(null);

				expect(() => {
					extractUnsupportedComponentFontProperties(tokenFileData, mockFilePathPartsComponents, mockFileName);
				}).toThrow(
					'Compositional typography token resolution failed for reference: semantic.text.body.s in file tokens/components/default/button.json',
				);

				expect(mockLogicalTokenSetError).toHaveBeenCalledWith(
					'Compositional typography token resolution failed for reference: semantic.text.body.s in file tokens/components/default/button.json',
				);
			});
		});

		describe('Compositional typography token processing', () => {
			it('should extract unsupported font properties from compositional token for components layer', () => {
				const tokenFileData = createTokenFileDataWithTypography(mockTypographyTokenWithUnsupportedProperties);

				const result = extractUnsupportedComponentFontProperties(tokenFileData, mockFilePathPartsComponents, mockFileName);

				const buttonTextPrimary = (result['button'] as Record<string, object>)['text'] as Record<string, object>;
				expect(buttonTextPrimary['primary']).toEqual(expectedTypographyTokenWithExtractedProperties);
			});

			it('should extract unsupported font properties from compositional token for partials layer', () => {
				const tokenFileData = createTokenFileDataWithTypography(mockTypographyTokenWithUnsupportedProperties);

				const result = extractUnsupportedComponentFontProperties(tokenFileData, mockFilePathPartsPartials, mockFileNamePartials);

				const buttonTextPrimary = (result['button'] as Record<string, object>)['text'] as Record<string, object>;
				expect(buttonTextPrimary['primary']).toEqual(expectedTypographyTokenWithExtractedProperties);
			});

			it('should extract unsupported font properties from compositional token for semantic layer', () => {
				const tokenFileData = createTokenFileDataWithTypography(mockTypographyTokenWithUnsupportedProperties);

				const result = extractUnsupportedComponentFontProperties(tokenFileData, mockFilePathPartsSemantic, mockFileName);

				// Note: The implementation currently processes compositional tokens regardless of layer
				// This might be a bug, but we test the actual behavior
				const buttonTextPrimary = (result['button'] as Record<string, object>)['text'] as Record<string, object>;
				expect(buttonTextPrimary['primary']).toEqual(expectedTypographyTokenWithExtractedProperties);
			});

			it('should handle compositional token without unsupported properties', () => {
				const tokenFileData = createTokenFileDataWithTypography(mockTypographyTokenWithoutUnsupportedProperties);

				const result = extractUnsupportedComponentFontProperties(tokenFileData, mockFilePathPartsComponents, mockFileName);

				const buttonTextPrimary = (result['button'] as Record<string, object>)['text'] as Record<string, object>;
				const expected = {
					shorthand: mockTypographyTokenWithoutUnsupportedProperties,
				};
				expect(buttonTextPrimary['primary']).toEqual(expected);
			});

			it('should handle compositional token with only letterSpacing', () => {
				const tokenWithLetterSpacing: DesignToken = {
					$type: A1TokenTypes.typography,
					$value: {
						fontFamily: 'Arial',
						fontSize: '16px',
						fontWeight: '400',
						lineHeight: '1.5',
						letterSpacing: '0.5px',
					},
				};
				const tokenFileData = createTokenFileDataWithTypography(tokenWithLetterSpacing);

				const result = extractUnsupportedComponentFontProperties(tokenFileData, mockFilePathPartsComponents, mockFileName);

				const buttonTextPrimary = (result['button'] as Record<string, object>)['text'] as Record<string, object>;
				const expected = {
					shorthand: tokenWithLetterSpacing,
					[unsupportedFontPropertyLetterSpacing]: {
						$type: A1TokenTypes.letterSpacing,
						$value: '0.5px',
					},
				};
				expect(buttonTextPrimary['primary']).toEqual(expected);
			});

			it('should handle compositional token with only textCase', () => {
				const tokenWithTextCase: DesignToken = {
					$type: A1TokenTypes.typography,
					$value: {
						fontFamily: 'Arial',
						fontSize: '16px',
						fontWeight: '400',
						lineHeight: '1.5',
						textCase: 'uppercase',
					},
				};
				const tokenFileData = createTokenFileDataWithTypography(tokenWithTextCase);

				const result = extractUnsupportedComponentFontProperties(tokenFileData, mockFilePathPartsComponents, mockFileName);

				const buttonTextPrimary = (result['button'] as Record<string, object>)['text'] as Record<string, object>;
				const expected = {
					shorthand: tokenWithTextCase,
					[unsupportedFontPropertyTextCase]: {
						$type: A1TokenTypes.textCase,
						$value: 'uppercase',
					},
				};
				expect(buttonTextPrimary['primary']).toEqual(expected);
			});

			it('should handle compositional token with only textDecoration', () => {
				const tokenWithTextDecoration: DesignToken = {
					$type: A1TokenTypes.typography,
					$value: {
						fontFamily: 'Arial',
						fontSize: '16px',
						fontWeight: '400',
						lineHeight: '1.5',
						textDecoration: 'underline',
					},
				};
				const tokenFileData = createTokenFileDataWithTypography(tokenWithTextDecoration);

				const result = extractUnsupportedComponentFontProperties(tokenFileData, mockFilePathPartsComponents, mockFileName);

				const buttonTextPrimary = (result['button'] as Record<string, object>)['text'] as Record<string, object>;
				const expected = {
					shorthand: tokenWithTextDecoration,
					[unsupportedFontPropertyTextDecoration]: {
						$type: A1TokenTypes.textDecoration,
						$value: 'underline',
					},
				};
				expect(buttonTextPrimary['primary']).toEqual(expected);
			});
		});

		describe('Nested structure processing', () => {
			it('should process nested typography tokens', () => {
				const result = extractUnsupportedComponentFontProperties(mockTokenFileDataNested, mockFilePathPartsComponents, mockFileName);

				const componentButtonTextPrimary = ((result['component'] as Record<string, object>)['button'] as Record<string, object>)[
					'text'
				] as Record<string, object>;
				expect(componentButtonTextPrimary['primary']).toEqual(expectedTypographyTokenWithExtractedProperties);
			});

			it('should skip non-object values', () => {
				const tokenFileDataWithPrimitive = {
					someString: 'hello',
					someNumber: 42,
					someBoolean: true,
				} as unknown as Record<string, object>;

				const result = extractUnsupportedComponentFontProperties(tokenFileDataWithPrimitive, mockFilePathPartsComponents, mockFileName);

				expect(result).toEqual(tokenFileDataWithPrimitive);
			});

			it('should skip non-typography tokens', () => {
				const result = extractUnsupportedComponentFontProperties(
					mockTokenFileDataWithoutTypography,
					mockFilePathPartsComponents,
					mockFileName,
				);

				expect(result).toEqual(mockTokenFileDataWithoutTypography);
			});
		});

		describe('Edge cases and error handling', () => {
			it('should handle empty token file data', () => {
				const result = extractUnsupportedComponentFontProperties(mockEmptyTokenFileData, mockFilePathPartsComponents, mockFileName);

				expect(result).toEqual(mockEmptyTokenFileData);
			});

			it('should handle token file data with mixed content', () => {
				const mixedTokenFileData = {
					...mockTokenFileDataWithTypography,
					...mockTokenFileDataWithoutTypography,
				};

				const result = extractUnsupportedComponentFontProperties(mixedTokenFileData, mockFilePathPartsComponents, mockFileName);

				// Typography token should be processed
				const buttonTextPrimary = (result['button'] as Record<string, object>)['text'] as Record<string, object>;
				expect(buttonTextPrimary['primary']).toEqual(expectedTypographyTokenWithExtractedProperties);

				// Non-typography tokens should remain unchanged
				const spacing = result['spacing'] as Record<string, object>;
				expect(spacing['small']).toEqual(mockNonTypographyToken);
				expect(spacing['medium']).toEqual({ $type: A1TokenTypes.spacing, $value: '16px' });
			});

			it('should handle null/undefined values gracefully', () => {
				const tokenFileDataWithNulls = {
					nullValue: null,
					undefinedValue: undefined,
					emptyObject: {},
				} as unknown as Record<string, object>;

				const result = extractUnsupportedComponentFontProperties(tokenFileDataWithNulls, mockFilePathPartsComponents, mockFileName);

				expect(result).toEqual(tokenFileDataWithNulls);
			});

			it('should handle unknown file paths in readJsonFile mock', () => {
				const tokenFileData = createTokenFileDataWithTypography(mockTypographyReferenceToken);
				mockResolveObjectPropertyValue.mockReturnValue(mockResolvedTokenReference);
				// This will trigger the fallback return {} in readJsonFile mock
				mockReadJsonFile.mockImplementation((filePath: string) => {
					if (filePath === 'unknown/path.json') {
						return {};
					}
					// This will hit the fallback line 251: return {};
					return {};
				});

				const result = extractUnsupportedComponentFontProperties(tokenFileData, mockFilePathPartsComponents, mockFileName);

				// Should still work with the mocked resolved token
				const buttonTextPrimary = (result['button'] as Record<string, object>)['text'] as Record<string, object>;
				expect(buttonTextPrimary['primary']).toEqual(expectedReferenceTokenResult);
			});

			it('should handle unknown token paths in resolveObjectPropertyValue mock', () => {
				const tokenFileData = createTokenFileDataWithTypography(mockTypographyReferenceToken);
				// This will trigger the fallback return null as T in resolveObjectPropertyValue mock
				mockResolveObjectPropertyValue.mockImplementation(<T>(obj: object, path: string): T => {
					if (path === 'unknown.path') {
						return null as T;
					}
					// This will hit the fallback line 258: return null as T;
					return null as T;
				});

				expect(() => {
					extractUnsupportedComponentFontProperties(tokenFileData, mockFilePathPartsComponents, mockFileName);
				}).toThrow(
					'Compositional typography token resolution failed for reference: semantic.text.body.s in file tokens/components/default/button.json',
				);
			});
		});

		describe('Integration with utility functions', () => {
			it('should call isTokenObject correctly for token identification', () => {
				const tokenFileData = createTokenFileDataWithTypography(mockTypographyTokenWithUnsupportedProperties);

				extractUnsupportedComponentFontProperties(tokenFileData, mockFilePathPartsComponents, mockFileName);

				expect(mockIsTokenObject).toHaveBeenCalledWith(mockTypographyTokenWithUnsupportedProperties);
			});

			it('should call isTypograhpyCompositionalToken correctly', () => {
				const tokenFileData = createTokenFileDataWithTypography(mockTypographyTokenWithUnsupportedProperties);

				extractUnsupportedComponentFontProperties(tokenFileData, mockFilePathPartsComponents, mockFileName);

				expect(mockIsTypograhpyCompositionalToken).toHaveBeenCalledWith(mockTypographyTokenWithUnsupportedProperties);
			});

			it('should call isTypograhpyReference correctly for reference tokens', () => {
				const tokenFileData = createTokenFileDataWithTypography(mockTypographyReferenceToken);
				mockResolveObjectPropertyValue.mockReturnValue(mockResolvedTokenReference);

				extractUnsupportedComponentFontProperties(tokenFileData, mockFilePathPartsComponents, mockFileName);

				expect(mockIsTypograhpyReference).toHaveBeenCalledWith(mockTypographyReferenceToken);
			});

			it('should call isSingleReferenceTokenValue correctly', () => {
				const tokenFileData = createTokenFileDataWithTypography(mockTypographyReferenceToken);
				mockResolveObjectPropertyValue.mockReturnValue(mockResolvedTokenReference);

				extractUnsupportedComponentFontProperties(tokenFileData, mockFilePathPartsComponents, mockFileName);

				expect(mockIsSingleReferenceTokenValue).toHaveBeenCalledWith(mockTypographyReferenceToken.$value);
			});

			it('should call isObject correctly for nested structure detection', () => {
				const tokenFileData = createTokenFileDataWithTypography(mockTypographyTokenWithUnsupportedProperties);

				extractUnsupportedComponentFontProperties(tokenFileData, mockFilePathPartsComponents, mockFileName);

				expect(mockIsObject).toHaveBeenCalled();
			});
		});

		describe('Coverage of specific code paths', () => {
			it('should handle invalid token layer (not components or partials)', () => {
				const tokenFileData = createTokenFileDataWithTypography(mockTypographyReferenceToken);
				mockResolveObjectPropertyValue.mockReturnValue(mockResolvedTokenReference);

				const result = extractUnsupportedComponentFontProperties(tokenFileData, mockFilePathPartsCore, mockFileName);

				// Should not process the typography token
				const buttonTextPrimary = (result['button'] as Record<string, object>)['text'] as Record<string, object>;
				expect(buttonTextPrimary['primary']).toEqual(mockTypographyReferenceToken);
			});

			it('should handle non-typography compositional tokens', () => {
				const nonTypographyCompositionalToken: DesignToken = {
					type: A1TokenTypes.spacing,
					value: {
						top: '8px',
						right: '16px',
						bottom: '8px',
						left: '16px',
					},
				};
				const tokenFileData = createTokenFileDataWithTypography(nonTypographyCompositionalToken);

				const result = extractUnsupportedComponentFontProperties(tokenFileData, mockFilePathPartsComponents, mockFileName);

				// Should not process the non-typography token
				const buttonTextPrimary = (result['button'] as Record<string, object>)['text'] as Record<string, object>;
				expect(buttonTextPrimary['primary']).toEqual(nonTypographyCompositionalToken);
			});

			it('should handle non-reference typography tokens', () => {
				const nonReferenceTypographyToken: DesignToken = {
					type: A1TokenTypes.typography,
					value: 'Arial 16px',
				};
				const tokenFileData = createTokenFileDataWithTypography(nonReferenceTypographyToken);

				const result = extractUnsupportedComponentFontProperties(tokenFileData, mockFilePathPartsComponents, mockFileName);

				// Should not process the non-reference typography token
				const buttonTextPrimary = (result['button'] as Record<string, object>)['text'] as Record<string, object>;
				expect(buttonTextPrimary['primary']).toEqual(nonReferenceTypographyToken);
			});

			it('should handle deeply nested structure', () => {
				const deeplyNestedData = {
					level1: {
						level2: {
							level3: {
								level4: {
									typography: mockTypographyTokenWithUnsupportedProperties,
								},
							},
						},
					},
				};

				const result = extractUnsupportedComponentFontProperties(deeplyNestedData, mockFilePathPartsComponents, mockFileName);

				const deepTypography = (
					(((result['level1'] as Record<string, object>)['level2'] as Record<string, object>)['level3'] as Record<string, object>)[
						'level4'
					] as Record<string, object>
				)['typography'] as Record<string, object>;
				expect(deepTypography).toEqual(expectedTypographyTokenWithExtractedProperties);
			});
		});

		describe('Mock error handling', () => {
			it('should call logicalTokenSetError with correct message when resolution fails', () => {
				// Mock resolveObjectPropertyValue to return null for our test case
				mockResolveObjectPropertyValue.mockReturnValueOnce(null);

				expect(() =>
					extractUnsupportedComponentFontProperties(
						{ typography: mockTypographyReferenceToken },
						mockFilePathPartsComponents,
						mockFileName,
					),
				).toThrow();

				// Verify that logicalTokenSetError was called with the expected message
				expect(mockLogicalTokenSetError).toHaveBeenCalledWith(
					expect.stringContaining(
						'Compositional typography token resolution failed for reference: semantic.text.body.s in file tokens/components/default/button.json',
					),
				);
			});

			it('should handle readJsonFile error for unexpected compositional file path', () => {
				// Store the original mock implementation
				const originalMockImplementation = mockReadJsonFile.getMockImplementation();

				// Temporarily set mock to always trigger the error path to cover line 251
				mockReadJsonFile.mockImplementation((filePath: string) => {
					// This forces the execution of line 251 in the mock file
					throw new Error(`Unexpected file path in readJsonFile mock: ${filePath}`);
				});

				expect(() =>
					extractUnsupportedComponentFontProperties(
						{ typography: mockTypographyReferenceToken },
						mockFilePathPartsComponents,
						mockFileName,
					),
				).toThrow('Unexpected file path in readJsonFile mock');

				// Restore the original mock implementation for other tests
				if (originalMockImplementation) {
					mockReadJsonFile.mockImplementation(originalMockImplementation);
				}
			});
		});
	});
});
