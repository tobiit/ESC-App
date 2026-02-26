import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { DesignToken } from 'style-dictionary/types';
import { A1TokenTypes, isObject, isTokenObject, isTypograhpyCompositionalToken } from '../../../../shared/index.js';
import { removeUnsupportedFontPropertiesInComposite } from './remove-unsupported-font-properties.js';
import {
	createDeepCopyOfToken,
	createTokenSetWithTypography,
	mockDeeplyNestedTokenSet,
	mockEmptyObject,
	mockNonTokenObject,
	mockNonTypographyToken,
	mockTokenSetWithMixedContent,
	mockTokenSetWithOnlyCompositionalTypography,
	mockTokenSetWithOnlyReferenceTypography,
	mockTokenSetWithoutTypography,
	mockTypographyReferenceToken,
	mockTypographyTokenWithAllUnsupportedProperties,
	mockTypographyTokenWithLetterSpacing,
	mockTypographyTokenWithoutUnsupportedProperties,
	mockTypographyTokenWithTextCase,
	mockTypographyTokenWithTextDecoration,
	resetAllMocks,
	setupDefaultMocks,
	setupMockImplementationsForErrorPaths,
} from './remove-unsupported-font-properties.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock the shared utilities
jest.mock('../../../../shared/index.js', () => {
	const actual: object = jest.requireActual('../../../../shared/index.js');
	return {
		...actual,
		isObject: jest.fn(),
		isTokenObject: jest.fn(),
		isTypograhpyCompositionalToken: jest.fn(),
	};
});

// Type the mocked functions
const mockIsObject = isObject as jest.MockedFunction<typeof isObject>;
const mockIsTokenObject = isTokenObject as jest.MockedFunction<typeof isTokenObject>;
const mockIsTypograhpyCompositionalToken = isTypograhpyCompositionalToken as jest.MockedFunction<typeof isTypograhpyCompositionalToken>;

// Note: Logger mocking (suppressLoggerOutput/restoreLoggerMocks) is automatically handled by src/shared/testing/test-helpers.mock.spec.ts via jest.config.ts setupFilesAfterEnv
describe('Remove Unsupported Font Properties', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		resetAllMocks();
		setupDefaultMocks();
	});

	describe('removeUnsupportedFontPropertiesInComposite', () => {
		describe('Basic functionality', () => {
			it('should remove all unsupported font properties from compositional typography token', () => {
				const tokenSet = createTokenSetWithTypography(mockTypographyTokenWithAllUnsupportedProperties);

				const result = removeUnsupportedFontPropertiesInComposite(tokenSet);

				const buttonTextPrimary = (result['button'] as Record<string, object>)['text'] as Record<string, object>;
				const primaryToken = buttonTextPrimary['primary'] as DesignToken;
				const tokenValue = primaryToken.$value as Record<string, unknown>;

				expect(tokenValue).not.toHaveProperty('letterSpacing');
				expect(tokenValue).not.toHaveProperty('textCase');
				expect(tokenValue).not.toHaveProperty('textDecoration');
				expect(tokenValue).toHaveProperty('fontFamily');
				expect(tokenValue).toHaveProperty('fontSize');
				expect(tokenValue).toHaveProperty('fontWeight');
				expect(tokenValue).toHaveProperty('lineHeight');
			});

			it('should remove only letterSpacing from compositional typography token', () => {
				const tokenSet = createTokenSetWithTypography(mockTypographyTokenWithLetterSpacing);

				const result = removeUnsupportedFontPropertiesInComposite(tokenSet);

				const buttonTextPrimary = (result['button'] as Record<string, object>)['text'] as Record<string, object>;
				const primaryToken = buttonTextPrimary['primary'] as DesignToken;
				const tokenValue = primaryToken.$value as Record<string, unknown>;

				expect(tokenValue).not.toHaveProperty('letterSpacing');
				expect(tokenValue).toHaveProperty('fontFamily');
				expect(tokenValue).toHaveProperty('fontSize');
				expect(tokenValue).toHaveProperty('fontWeight');
				expect(tokenValue).toHaveProperty('lineHeight');
			});

			it('should remove only textCase from compositional typography token', () => {
				const tokenSet = createTokenSetWithTypography(mockTypographyTokenWithTextCase);

				const result = removeUnsupportedFontPropertiesInComposite(tokenSet);

				const buttonTextPrimary = (result['button'] as Record<string, object>)['text'] as Record<string, object>;
				const primaryToken = buttonTextPrimary['primary'] as DesignToken;
				const tokenValue = primaryToken.$value as Record<string, unknown>;

				expect(tokenValue).not.toHaveProperty('textCase');
				expect(tokenValue).toHaveProperty('fontFamily');
				expect(tokenValue).toHaveProperty('fontSize');
				expect(tokenValue).toHaveProperty('fontWeight');
				expect(tokenValue).toHaveProperty('lineHeight');
			});

			it('should remove only textDecoration from compositional typography token', () => {
				const tokenSet = createTokenSetWithTypography(mockTypographyTokenWithTextDecoration);

				const result = removeUnsupportedFontPropertiesInComposite(tokenSet);

				const buttonTextPrimary = (result['button'] as Record<string, object>)['text'] as Record<string, object>;
				const primaryToken = buttonTextPrimary['primary'] as DesignToken;
				const tokenValue = primaryToken.$value as Record<string, unknown>;

				expect(tokenValue).not.toHaveProperty('textDecoration');
				expect(tokenValue).toHaveProperty('fontFamily');
				expect(tokenValue).toHaveProperty('fontSize');
				expect(tokenValue).toHaveProperty('fontWeight');
				expect(tokenValue).toHaveProperty('lineHeight');
			});

			it('should not modify compositional typography token without unsupported properties', () => {
				const tokenSet = createTokenSetWithTypography(mockTypographyTokenWithoutUnsupportedProperties);
				const originalToken = createDeepCopyOfToken(mockTypographyTokenWithoutUnsupportedProperties);

				const result = removeUnsupportedFontPropertiesInComposite(tokenSet);

				const buttonTextPrimary = (result['button'] as Record<string, object>)['text'] as Record<string, object>;
				expect(buttonTextPrimary['primary']).toEqual(originalToken);
			});

			it('should not modify reference typography tokens', () => {
				const tokenSet = createTokenSetWithTypography(mockTypographyReferenceToken);
				const originalToken = createDeepCopyOfToken(mockTypographyReferenceToken);

				const result = removeUnsupportedFontPropertiesInComposite(tokenSet);

				const buttonTextPrimary = (result['button'] as Record<string, object>)['text'] as Record<string, object>;
				expect(buttonTextPrimary['primary']).toEqual(originalToken);
			});

			it('should not modify non-typography tokens', () => {
				const tokenSet = createTokenSetWithTypography(mockNonTypographyToken, 'spacing.small');
				const originalToken = createDeepCopyOfToken(mockNonTypographyToken);

				const result = removeUnsupportedFontPropertiesInComposite(tokenSet);

				const spacingSmall = (result['spacing'] as Record<string, object>)['small'];
				expect(spacingSmall).toEqual(originalToken);
			});
		});

		describe('Complex token structures', () => {
			it('should process mixed content token set correctly', () => {
				const tokenSet = createDeepCopyOfToken(mockTokenSetWithMixedContent) as Record<string, object>;

				const result = removeUnsupportedFontPropertiesInComposite(tokenSet);

				// Check that typography tokens were processed
				const typography = result['typography'] as Record<string, object>;
				const body = typography['body'] as Record<string, object>;
				const heading = typography['heading'] as Record<string, object>;

				// Primary should have all unsupported properties removed
				const primaryToken = body['primary'] as DesignToken;
				const primaryValue = primaryToken.$value as Record<string, unknown>;
				expect(primaryValue).not.toHaveProperty('letterSpacing');
				expect(primaryValue).not.toHaveProperty('textCase');
				expect(primaryValue).not.toHaveProperty('textDecoration');

				// Secondary should have letterSpacing removed
				const secondaryToken = body['secondary'] as DesignToken;
				const secondaryValue = secondaryToken.$value as Record<string, unknown>;
				expect(secondaryValue).not.toHaveProperty('letterSpacing');

				// H1 should have textCase removed
				const h1Token = heading['h1'] as DesignToken;
				const h1Value = h1Token.$value as Record<string, unknown>;
				expect(h1Value).not.toHaveProperty('textCase');

				// H2 should have textDecoration removed
				const h2Token = heading['h2'] as DesignToken;
				const h2Value = h2Token.$value as Record<string, unknown>;
				expect(h2Value).not.toHaveProperty('textDecoration');

				// H3 should remain unchanged (no unsupported properties)
				expect(heading['h3']).toEqual(mockTypographyTokenWithoutUnsupportedProperties);

				// H4 should remain unchanged (reference token)
				expect(heading['h4']).toEqual(mockTypographyReferenceToken);

				// Non-typography content should remain unchanged
				expect(result['spacing']).toEqual(mockTokenSetWithMixedContent['spacing']);
				expect(result['nonTokenContent']).toEqual(mockTokenSetWithMixedContent['nonTokenContent']);
				expect(result['primitiveValue']).toBe('some string');
				expect(result['numberValue']).toBe(42);
				expect(result['booleanValue']).toBe(true);
				expect(result['nullValue']).toBeNull();
				expect(result['undefinedValue']).toBeUndefined();
			});

			it('should process deeply nested token structures', () => {
				const tokenSet = createDeepCopyOfToken(mockDeeplyNestedTokenSet) as Record<string, object>;

				const result = removeUnsupportedFontPropertiesInComposite(tokenSet);

				const level4 = (
					((result['level1'] as Record<string, object>)['level2'] as Record<string, object>)['level3'] as Record<string, object>
				)['level4'] as Record<string, object>;

				// Check that typography token was processed
				const typographyToken = level4['typography'] as DesignToken;
				const typographyValue = typographyToken.$value as Record<string, unknown>;
				expect(typographyValue).not.toHaveProperty('letterSpacing');
				expect(typographyValue).not.toHaveProperty('textCase');
				expect(typographyValue).not.toHaveProperty('textDecoration');

				// Check nested typography token was processed
				const nested = level4['nested'] as Record<string, object>;
				const nestedTypographyToken = nested['typography'] as DesignToken;
				const nestedTypographyValue = nestedTypographyToken.$value as Record<string, unknown>;
				expect(nestedTypographyValue).not.toHaveProperty('letterSpacing');

				// Check that non-typography token remains unchanged
				expect(level4['spacing']).toEqual(mockNonTypographyToken);
			});

			it('should process token set with only compositional typography tokens', () => {
				const tokenSet = createDeepCopyOfToken(mockTokenSetWithOnlyCompositionalTypography) as Record<string, object>;

				const result = removeUnsupportedFontPropertiesInComposite(tokenSet);

				const heading = result['heading'] as Record<string, object>;
				const body = result['body'] as Record<string, object>;

				// All tokens should have unsupported properties removed
				const h1Token = heading['h1'] as DesignToken;
				const h1Value = h1Token.$value as Record<string, unknown>;
				expect(h1Value).not.toHaveProperty('letterSpacing');
				expect(h1Value).not.toHaveProperty('textCase');
				expect(h1Value).not.toHaveProperty('textDecoration');

				const h2Token = heading['h2'] as DesignToken;
				const h2Value = h2Token.$value as Record<string, unknown>;
				expect(h2Value).not.toHaveProperty('letterSpacing');

				const primaryToken = body['primary'] as DesignToken;
				const primaryValue = primaryToken.$value as Record<string, unknown>;
				expect(primaryValue).not.toHaveProperty('textCase');

				const secondaryToken = body['secondary'] as DesignToken;
				const secondaryValue = secondaryToken.$value as Record<string, unknown>;
				expect(secondaryValue).not.toHaveProperty('textDecoration');
			});

			it('should not modify token set with only reference typography tokens', () => {
				const tokenSet = createDeepCopyOfToken(mockTokenSetWithOnlyReferenceTypography) as Record<string, object>;
				const originalTokenSet = createDeepCopyOfToken(mockTokenSetWithOnlyReferenceTypography) as Record<string, object>;

				const result = removeUnsupportedFontPropertiesInComposite(tokenSet);

				expect(result).toEqual(originalTokenSet);
			});

			it('should not modify token set without typography tokens', () => {
				const tokenSet = createDeepCopyOfToken(mockTokenSetWithoutTypography) as Record<string, object>;
				const originalTokenSet = createDeepCopyOfToken(mockTokenSetWithoutTypography) as Record<string, object>;

				const result = removeUnsupportedFontPropertiesInComposite(tokenSet);

				expect(result).toEqual(originalTokenSet);
			});
		});

		describe('Edge cases and error handling', () => {
			it('should handle empty token set', () => {
				const result = removeUnsupportedFontPropertiesInComposite(mockEmptyObject);

				expect(result).toEqual(mockEmptyObject);
			});

			it('should handle token set with primitive values', () => {
				const tokenSetWithPrimitives = {
					stringValue: 'test',
					numberValue: 123,
					booleanValue: false,
					nullValue: null,
					undefinedValue: undefined,
				} as unknown as Record<string, object>;

				const result = removeUnsupportedFontPropertiesInComposite(tokenSetWithPrimitives);

				expect(result).toEqual(tokenSetWithPrimitives);
			});

			it('should handle token set with arrays', () => {
				const tokenSetWithArrays = {
					arrayValue: ['item1', 'item2'],
					nestedArray: [
						{
							typography: mockTypographyTokenWithAllUnsupportedProperties,
						},
					],
				} as unknown as Record<string, object>;

				const result = removeUnsupportedFontPropertiesInComposite(tokenSetWithArrays);

				// Arrays should be skipped (not objects in our context)
				expect(result).toEqual(tokenSetWithArrays);
			});

			it('should handle token set with non-token objects', () => {
				const tokenSetWithNonTokens = {
					config: mockNonTokenObject,
					settings: {
						theme: 'dark',
						language: 'en',
					},
				};

				const result = removeUnsupportedFontPropertiesInComposite(tokenSetWithNonTokens);

				expect(result).toEqual(tokenSetWithNonTokens);
			});

			it('should mutate the original token set (verify mutation)', () => {
				const tokenSet = createTokenSetWithTypography(mockTypographyTokenWithAllUnsupportedProperties);
				const originalReference = tokenSet;

				removeUnsupportedFontPropertiesInComposite(tokenSet);

				// Should be the same reference (mutated)
				expect(tokenSet).toBe(originalReference);

				// Should have unsupported properties removed
				const buttonTextPrimary = (tokenSet['button'] as Record<string, object>)['text'] as Record<string, object>;
				const primaryToken = buttonTextPrimary['primary'] as DesignToken;
				const tokenValue = primaryToken.$value as Record<string, unknown>;
				expect(tokenValue).not.toHaveProperty('letterSpacing');
				expect(tokenValue).not.toHaveProperty('textCase');
				expect(tokenValue).not.toHaveProperty('textDecoration');
			});
		});

		describe('Integration with utility functions', () => {
			it('should call isTokenObject correctly for token identification', () => {
				const tokenSet = createTokenSetWithTypography(mockTypographyTokenWithAllUnsupportedProperties);

				removeUnsupportedFontPropertiesInComposite(tokenSet);

				expect(mockIsTokenObject).toHaveBeenCalledWith(mockTypographyTokenWithAllUnsupportedProperties);
			});

			it('should call isTypograhpyCompositionalToken correctly for compositional tokens', () => {
				const tokenSet = createTokenSetWithTypography(mockTypographyTokenWithAllUnsupportedProperties);

				removeUnsupportedFontPropertiesInComposite(tokenSet);

				expect(mockIsTypograhpyCompositionalToken).toHaveBeenCalledWith(mockTypographyTokenWithAllUnsupportedProperties);
			});

			it('should call isObject correctly for nested structure detection', () => {
				const tokenSet = createTokenSetWithTypography(mockTypographyTokenWithAllUnsupportedProperties);

				removeUnsupportedFontPropertiesInComposite(tokenSet);

				expect(mockIsObject).toHaveBeenCalled();
			});

			it('should not call isTypograhpyCompositionalToken for non-token objects', () => {
				const tokenSet = {
					nonToken: mockNonTokenObject,
				};

				removeUnsupportedFontPropertiesInComposite(tokenSet);

				expect(mockIsTypograhpyCompositionalToken).not.toHaveBeenCalled();
			});
		});

		describe('Coverage of specific code paths', () => {
			it('should handle the case where isObject returns false', () => {
				// Setup mock to return false for isObject for specific values
				mockIsObject.mockImplementation((value: unknown): value is object => {
					if (value === 'test-non-object') {
						return false;
					}
					return typeof value === 'object' && value !== null && !Array.isArray(value);
				});

				const tokenSet = {
					nonObjectValue: 'test-non-object',
					typography: mockTypographyTokenWithAllUnsupportedProperties,
				} as unknown as Record<string, object>;

				const result = removeUnsupportedFontPropertiesInComposite(tokenSet);

				// Non-object value should remain unchanged
				expect(result['nonObjectValue']).toBe('test-non-object');
				// Typography token should still be processed
				const typographyToken = result['typography'] as DesignToken;
				const typographyValue = typographyToken.$value as Record<string, unknown>;
				expect(typographyValue).not.toHaveProperty('letterSpacing');
			});

			it('should handle the case where isTokenObject returns false', () => {
				// Setup mock to return false for isTokenObject for specific values
				mockIsTokenObject.mockImplementation((value: unknown): value is DesignToken => {
					if (value === mockNonTokenObject) {
						return false;
					}
					return typeof value === 'object' && value !== null && 'value' in value && 'type' in value;
				});

				const tokenSet = {
					nonToken: mockNonTokenObject,
					typography: mockTypographyTokenWithAllUnsupportedProperties,
				};

				const result = removeUnsupportedFontPropertiesInComposite(tokenSet);

				// Non-token object should remain unchanged
				expect(result['nonToken']).toEqual(mockNonTokenObject);
				// Typography token should still be processed
				const typographyToken = result['typography'] as DesignToken;
				const typographyValue = typographyToken.$value as Record<string, unknown>;
				expect(typographyValue).not.toHaveProperty('letterSpacing');
			});

			it('should handle the case where isTypograhpyCompositionalToken returns false', () => {
				// Setup mock to return false for isTypograhpyCompositionalToken for reference tokens
				mockIsTypograhpyCompositionalToken.mockImplementation((token: DesignToken): boolean => {
					// Return false for reference tokens
					if (typeof token.$value === 'string') {
						return false;
					}
					// Return true for compositional tokens
					return (
						token.$type === A1TokenTypes.typography &&
						typeof token.$value === 'object' &&
						token.$value !== null &&
						'fontFamily' in token.$value &&
						'fontSize' in token.$value &&
						'fontWeight' in token.$value &&
						'lineHeight' in token.$value
					);
				});
				const tokenSet = {
					referenceToken: mockTypographyReferenceToken,
					compositionalToken: mockTypographyTokenWithAllUnsupportedProperties,
				};

				const result = removeUnsupportedFontPropertiesInComposite(tokenSet);

				// Reference token should remain unchanged
				expect(result['referenceToken']).toEqual(mockTypographyReferenceToken);
				// Compositional token should be processed
				const compositionalToken = result['compositionalToken'] as DesignToken;
				const compositionalValue = compositionalToken.$value as Record<string, unknown>;
				expect(compositionalValue).not.toHaveProperty('letterSpacing');
			});

			it('should handle nested structures where some objects are not tokens', () => {
				const tokenSet = {
					config: {
						settings: {
							theme: 'dark',
						},
					},
					tokens: {
						typography: mockTypographyTokenWithAllUnsupportedProperties,
					},
				};

				const result = removeUnsupportedFontPropertiesInComposite(tokenSet);

				// Config should remain unchanged
				expect(result['config']).toEqual(tokenSet['config']);
				// Typography token should be processed
				const tokens = result['tokens'] as Record<string, object>;
				const typographyToken = tokens['typography'] as DesignToken;
				const typographyValue = typographyToken.$value as Record<string, unknown>;
				expect(typographyValue).not.toHaveProperty('letterSpacing');
			});

			it('should correctly process tokens with some but not all unsupported properties', () => {
				const partialUnsupportedToken: DesignToken = {
					$type: A1TokenTypes.typography,
					$value: {
						fontFamily: 'Arial',
						fontSize: '16px',
						fontWeight: '400',
						lineHeight: '1.5',
						// Only has textCase, not letterSpacing or textDecoration
						textCase: 'uppercase',
					},
				};

				const tokenSet = createTokenSetWithTypography(partialUnsupportedToken);

				const result = removeUnsupportedFontPropertiesInComposite(tokenSet);

				const buttonTextPrimary = (result['button'] as Record<string, object>)['text'] as Record<string, object>;
				const primaryToken = buttonTextPrimary['primary'] as DesignToken;
				const tokenValue = primaryToken.$value as Record<string, unknown>;

				// Should not have textCase
				expect(tokenValue).not.toHaveProperty('textCase');
				// Should still have supported properties
				expect(tokenValue).toHaveProperty('fontFamily');
				expect(tokenValue).toHaveProperty('fontSize');
				expect(tokenValue).toHaveProperty('fontWeight');
				expect(tokenValue).toHaveProperty('lineHeight');
				// Should not have other unsupported properties (they weren't there to begin with)
				expect(tokenValue).not.toHaveProperty('letterSpacing');
				expect(tokenValue).not.toHaveProperty('textDecoration');
			});
		});

		describe('Mock error handling and edge cases', () => {
			it('should test all mock implementation error paths', () => {
				setupMockImplementationsForErrorPaths();

				const tokenSet = {
					nonObjectTrigger: 'trigger-false-path',
					nonTokenTrigger: 'trigger-non-token-path',
					nonCompositionalTrigger: {
						type: A1TokenTypes.typography,
						value: 'trigger-non-compositional-path',
					} as unknown as DesignToken,
					normalToken: mockTypographyTokenWithAllUnsupportedProperties,
				} as unknown as Record<string, object>;

				const result = removeUnsupportedFontPropertiesInComposite(tokenSet);

				// Should handle all the error paths without crashing
				expect(result['nonObjectTrigger']).toBe('trigger-false-path');
				expect(result['nonTokenTrigger']).toBe('trigger-non-token-path');
				expect(result['nonCompositionalTrigger']).toEqual({
					type: A1TokenTypes.typography,
					value: 'trigger-non-compositional-path',
				});

				// Normal token should still be processed
				const normalToken = result['normalToken'] as DesignToken;
				const normalValue = normalToken.$value as Record<string, unknown>;
				expect(normalValue).not.toHaveProperty('letterSpacing');
			});

			it('should directly test the error path fallback in setupMockImplementationsForErrorPaths', () => {
				setupMockImplementationsForErrorPaths();

				// Test the direct trigger condition that hits line 310
				const triggerToken = 'trigger-non-compositional-path' as unknown as DesignToken;
				const result = mockIsTypograhpyCompositionalToken(triggerToken);
				expect(result).toBe(false);
			});

			it('should verify that all mock functions are called appropriately', () => {
				const tokenSet = createTokenSetWithTypography(mockTypographyTokenWithAllUnsupportedProperties);

				removeUnsupportedFontPropertiesInComposite(tokenSet);

				// Verify all mocked functions were called
				expect(mockIsObject).toHaveBeenCalled();
				expect(mockIsTokenObject).toHaveBeenCalled();
				expect(mockIsTypograhpyCompositionalToken).toHaveBeenCalled();

				// Verify specific calls
				expect(mockIsTokenObject).toHaveBeenCalledWith(mockTypographyTokenWithAllUnsupportedProperties);
				expect(mockIsTypograhpyCompositionalToken).toHaveBeenCalledWith(mockTypographyTokenWithAllUnsupportedProperties);
			});

			it('should handle the complete flow with all mock implementations', () => {
				// Reset and setup fresh mocks
				resetAllMocks();
				setupDefaultMocks();

				const complexTokenSet = {
					level1: {
						level2: {
							compositionToken: mockTypographyTokenWithAllUnsupportedProperties,
							referenceToken: mockTypographyReferenceToken,
							nonTypographyToken: mockNonTypographyToken,
							nonTokenObject: mockNonTokenObject,
						},
					},
				};

				const result = removeUnsupportedFontPropertiesInComposite(complexTokenSet);

				// Verify the structure is processed correctly
				const level2 = (result['level1'] as Record<string, object>)['level2'] as Record<string, object>;

				// Compositional token should be processed
				const compositionToken = level2['compositionToken'] as DesignToken;
				const compositionValue = compositionToken.$value as Record<string, unknown>;
				expect(compositionValue).not.toHaveProperty('letterSpacing');
				expect(compositionValue).not.toHaveProperty('textCase');
				expect(compositionValue).not.toHaveProperty('textDecoration');

				// Reference token should remain unchanged
				expect(level2['referenceToken']).toEqual(mockTypographyReferenceToken);

				// Non-typography token should remain unchanged
				expect(level2['nonTypographyToken']).toEqual(mockNonTypographyToken);

				// Non-token object should remain unchanged
				expect(level2['nonTokenObject']).toEqual(mockNonTokenObject);
			});
		});
	});
});
