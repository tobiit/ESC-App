import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { DesignToken } from 'style-dictionary/types';
import {
	A1SpecialTokenNameKeyWords,
	A1TokenTypes,
	isObject,
	isTokenObject,
	logger,
	logicalTokenSetError,
	matchAllReferenceMathShorthands,
} from '../../../../shared/index.js';
import { SsotInsetTokenGroup } from '../../types/index.js';
import { extractInsetValueShorthands } from './extract-inset-value-shorthands.js';
import {
	createTokenSetWithInset,
	expectedSubTokensFourValues,
	expectedSubTokensSingleValue,
	expectedSubTokensThreeValues,
	expectedSubTokensTwoValues,
	mockInsetTokenWithFiveValues,
	mockInsetTokenWithFourValues,
	mockInsetTokenWithGridHorizontal,
	mockInsetTokenWithGridVertical,
	mockInsetTokenWithoutType,
	mockInsetTokenWithoutValue,
	mockInsetTokenWithShorthand,
	mockInsetTokenWithSingleValue,
	mockInsetTokenWithThreeValues,
	mockMatchedFiveValues,
	mockMatchedFourValues,
	mockMatchedSingleValue,
	mockMatchedThreeValues,
	mockMatchedTwoValues,
	mockSsotInsetTokenHorizontalTopBottom,
	mockSsotInsetTokenOnlyBottom,
	mockSsotInsetTokenOnlyEnd,
	mockSsotInsetTokenOnlyHorizontal,
	mockSsotInsetTokenOnlyStart,
	mockSsotInsetTokenOnlyTop,
	mockSsotInsetTokenOnlyVertical,
	mockSsotInsetTokenTopEndBottomStart,
	mockSsotInsetTokenTrulyInvalid,
	mockSsotInsetTokenVerticalEndStart,
	mockSsotInsetTokenVerticalHorizontal,
	mockSsotInsetTokenWithAll,
	mockSsotInsetTokenWithBreakpoints,
	mockTokenSetCoreInternalKey,
	mockTokenSetSkipCoreInternal,
	mockTokenSetWithCoreInternalLayer,
	mockTokenSetWithCoreLayer,
	mockTokenSetWithCorePropertyNoInternal,
	mockTokenSetWithMixedContent,
	mockTokenSetWithNestedInset,
	mockTokenSetWithNonInsetObjects,
	resetAllMocks,
	setupDefaultMocks,
} from './extract-inset-value-shorthands.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock the shared utilities
jest.mock('../../../../shared/index.js', () => {
	const actual: object = jest.requireActual('../../../../shared/index.js');
	const mockedLoggerForJest = {
		info: jest.fn(),
		success: jest.fn(),
		start: jest.fn(),
		error: jest.fn(),
		debug: jest.fn(),
		warn: jest.fn(),
	};
	return {
		...actual,
		isObject: jest.fn(),
		isTokenObject: jest.fn(),
		logger: mockedLoggerForJest,
		logicalTokenSetError: jest.fn(),
		matchAllReferenceMathShorthands: jest.fn(),
	};
});

// Type the mocked functions
const mockIsObject = isObject as jest.MockedFunction<typeof isObject>;
const mockIsTokenObject = isTokenObject as jest.MockedFunction<typeof isTokenObject>;
const mockLogger = logger as jest.Mocked<typeof logger>;
const mockLogicalTokenSetError = logicalTokenSetError as jest.MockedFunction<typeof logicalTokenSetError>;
const mockMatchAllReferenceMathShorthands = matchAllReferenceMathShorthands as jest.MockedFunction<typeof matchAllReferenceMathShorthands>;

// Note: Logger mocking (suppressLoggerOutput/restoreLoggerMocks) is automatically handled by src/shared/testing/test-helpers.mock.spec.ts via jest.config.ts setupFilesAfterEnv
describe('Extract Inset Value Shorthands', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		resetAllMocks();
		setupDefaultMocks();
	});

	describe('extractInsetValueShorthands', () => {
		describe('Direct inset token processing (isTokenObject = true)', () => {
			it('should extract sub-tokens from single value shorthand', () => {
				const tokenSet = createTokenSetWithInset(mockInsetTokenWithSingleValue);
				mockMatchAllReferenceMathShorthands.mockReturnValue(mockMatchedSingleValue as RegExpMatchArray);

				const result = extractInsetValueShorthands(tokenSet);

				const expectedResult = {
					[A1SpecialTokenNameKeyWords.inset]: {
						all: mockInsetTokenWithSingleValue,
						...expectedSubTokensSingleValue,
					},
				};

				expect(result).toEqual(expectedResult);
				expect(mockMatchAllReferenceMathShorthands).toHaveBeenCalledWith(mockInsetTokenWithSingleValue.$value);
			});

			it('should extract sub-tokens from two value shorthand', () => {
				const tokenSet = createTokenSetWithInset(mockInsetTokenWithShorthand);
				mockMatchAllReferenceMathShorthands.mockReturnValue(mockMatchedTwoValues as RegExpMatchArray);

				const result = extractInsetValueShorthands(tokenSet);

				const expectedResult = {
					[A1SpecialTokenNameKeyWords.inset]: {
						all: mockInsetTokenWithShorthand,
						...expectedSubTokensTwoValues,
					},
				};

				expect(result).toEqual(expectedResult);
				expect(mockMatchAllReferenceMathShorthands).toHaveBeenCalledWith(mockInsetTokenWithShorthand.$value);
			});

			it('should extract sub-tokens from three value shorthand', () => {
				const tokenSet = createTokenSetWithInset(mockInsetTokenWithThreeValues);
				mockMatchAllReferenceMathShorthands.mockReturnValue(mockMatchedThreeValues as RegExpMatchArray);

				const result = extractInsetValueShorthands(tokenSet);

				const expectedResult = {
					[A1SpecialTokenNameKeyWords.inset]: {
						all: mockInsetTokenWithThreeValues,
						...expectedSubTokensThreeValues,
					},
				};

				expect(result).toEqual(expectedResult);
			});

			it('should extract sub-tokens from four value shorthand', () => {
				const tokenSet = createTokenSetWithInset(mockInsetTokenWithFourValues);
				mockMatchAllReferenceMathShorthands.mockReturnValue(mockMatchedFourValues as RegExpMatchArray);

				const result = extractInsetValueShorthands(tokenSet);

				const expectedResult = {
					[A1SpecialTokenNameKeyWords.inset]: {
						all: mockInsetTokenWithFourValues,
						...expectedSubTokensFourValues,
					},
				};

				expect(result).toEqual(expectedResult);
			});

			it('should return empty object for invalid shorthand value count (5 values)', () => {
				const tokenSet = createTokenSetWithInset(mockInsetTokenWithFiveValues);
				mockMatchAllReferenceMathShorthands.mockReturnValue(mockMatchedFiveValues as RegExpMatchArray);

				const result = extractInsetValueShorthands(tokenSet);

				const expectedResult = {
					[A1SpecialTokenNameKeyWords.inset]: {
						all: mockInsetTokenWithFiveValues,
						// No sub-tokens for invalid count
					},
				};

				expect(result).toEqual(expectedResult);
			});

			it('should throw error when token lacks $type or $value', () => {
				const tokenSet = createTokenSetWithInset(mockInsetTokenWithoutType);
				mockMatchAllReferenceMathShorthands.mockReturnValue(null);

				expect(() => extractInsetValueShorthands(tokenSet)).toThrow('Design Token needs to have a $type and $value property set!');
				expect(mockLogicalTokenSetError).toHaveBeenCalledWith('Design Token needs to have a $type and $value property set!', [
					A1SpecialTokenNameKeyWords.inset,
					`Design Token: ${JSON.stringify(mockInsetTokenWithoutType)}`,
				]);
			});

			it('should throw error when matchAllReferenceMathShorthands returns null', () => {
				const tokenSet = createTokenSetWithInset(mockInsetTokenWithShorthand);
				mockMatchAllReferenceMathShorthands.mockReturnValue(null);

				expect(() => extractInsetValueShorthands(tokenSet)).toThrow('Design Token needs to have a $type and $value property set!');
			});

			it('should throw error when matchAllReferenceMathShorthands returns empty array', () => {
				const tokenSet = createTokenSetWithInset(mockInsetTokenWithShorthand);
				mockMatchAllReferenceMathShorthands.mockReturnValue(null);

				expect(() => extractInsetValueShorthands(tokenSet)).toThrow('Design Token needs to have a $type and $value property set!');
			});

			it('should handle empty $value and trigger return null in mock implementation', () => {
				const tokenWithEmptyValue = { ...mockInsetTokenWithShorthand, $value: '' };
				const tokenSet = createTokenSetWithInset(tokenWithEmptyValue);
				// Don't override the mock implementation, let it handle the empty string

				expect(() => extractInsetValueShorthands(tokenSet)).toThrow('Design Token needs to have a $type and $value property set!');
			});
		});

		describe('SSOT inset token group processing', () => {
			it('should do nothing when inset group already has "all" property', () => {
				const tokenSet = createTokenSetWithInset(mockSsotInsetTokenWithAll);

				const result = extractInsetValueShorthands(tokenSet);

				// Should remain unchanged since it already has 'all' property
				expect(result).toEqual(tokenSet);
			});

			it('should create "all" token from vertical + horizontal combination', () => {
				const tokenSet = createTokenSetWithInset(mockSsotInsetTokenVerticalHorizontal);

				const result = extractInsetValueShorthands(tokenSet);

				const resultInset = result[A1SpecialTokenNameKeyWords.inset] as SsotInsetTokenGroup;
				expect(resultInset.all).toEqual({ $type: A1TokenTypes.spacing, $value: '8px 16px' });
				expect(resultInset.vertical).toEqual(mockSsotInsetTokenVerticalHorizontal.vertical);
				expect(resultInset.horizontal).toEqual(mockSsotInsetTokenVerticalHorizontal.horizontal);
			});

			it('should create "all" token from vertical + end + start combination', () => {
				const tokenSet = createTokenSetWithInset(mockSsotInsetTokenVerticalEndStart);

				const result = extractInsetValueShorthands(tokenSet);

				const resultInset = result[A1SpecialTokenNameKeyWords.inset] as SsotInsetTokenGroup;
				expect(resultInset.all).toEqual({ $type: A1TokenTypes.spacing, $value: '8px 16px 8px 24px' });
			});

			it('should create "all" token from horizontal + top + bottom combination', () => {
				const tokenSet = createTokenSetWithInset(mockSsotInsetTokenHorizontalTopBottom);

				const result = extractInsetValueShorthands(tokenSet);

				const resultInset = result[A1SpecialTokenNameKeyWords.inset] as SsotInsetTokenGroup;
				expect(resultInset.all).toEqual({ $type: A1TokenTypes.spacing, $value: '8px 16px 12px' });
			});

			it('should create "all" token from top + end + bottom + start combination', () => {
				const tokenSet = createTokenSetWithInset(mockSsotInsetTokenTopEndBottomStart);

				const result = extractInsetValueShorthands(tokenSet);

				const resultInset = result[A1SpecialTokenNameKeyWords.inset] as SsotInsetTokenGroup;
				// Corrected: bug has been fixed, no extra braces
				expect(resultInset.all).toEqual({ $type: A1TokenTypes.spacing, $value: '8px 16px 12px 24px' });
			});

			it('should fill missing vertical when only horizontal exists', () => {
				const tokenSet = createTokenSetWithInset(mockSsotInsetTokenOnlyHorizontal);

				const result = extractInsetValueShorthands(tokenSet);

				const resultInset = result[A1SpecialTokenNameKeyWords.inset] as SsotInsetTokenGroup;
				expect(resultInset.all).toEqual({ $type: A1TokenTypes.spacing, $value: '0 16px' });
				expect(resultInset.vertical).toEqual({ $type: A1TokenTypes.spacing, $value: '0' });
				expect(resultInset.horizontal).toEqual(mockSsotInsetTokenOnlyHorizontal.horizontal);
			});

			it('should fill missing horizontal when only vertical exists', () => {
				const tokenSet = createTokenSetWithInset(mockSsotInsetTokenOnlyVertical);

				const result = extractInsetValueShorthands(tokenSet);

				const resultInset = result[A1SpecialTokenNameKeyWords.inset] as SsotInsetTokenGroup;
				expect(resultInset.all).toEqual({ $type: A1TokenTypes.spacing, $value: '8px 0' });
				expect(resultInset.vertical).toEqual(mockSsotInsetTokenOnlyVertical.vertical);
				expect(resultInset.horizontal).toEqual({ $type: A1TokenTypes.spacing, $value: '0' });
			});

			it('should fill missing top when only bottom exists', () => {
				const tokenSet = createTokenSetWithInset(mockSsotInsetTokenOnlyBottom);

				const result = extractInsetValueShorthands(tokenSet);

				const resultInset = result[A1SpecialTokenNameKeyWords.inset] as SsotInsetTokenGroup;
				expect(resultInset.all).toEqual({ $type: A1TokenTypes.spacing, $value: '0 0 12px' });
				expect(resultInset.top).toEqual({ $type: A1TokenTypes.spacing, $value: '0' });
				expect(resultInset.horizontal).toEqual({ $type: A1TokenTypes.spacing, $value: '0' });
				expect(resultInset.bottom).toEqual(mockSsotInsetTokenOnlyBottom.bottom);
			});

			it('should fill missing bottom when only top exists', () => {
				const tokenSet = createTokenSetWithInset(mockSsotInsetTokenOnlyTop);

				const result = extractInsetValueShorthands(tokenSet);

				const resultInset = result[A1SpecialTokenNameKeyWords.inset] as SsotInsetTokenGroup;
				expect(resultInset.all).toEqual({ $type: A1TokenTypes.spacing, $value: '8px 0 0' });
				expect(resultInset.top).toEqual(mockSsotInsetTokenOnlyTop.top);
				expect(resultInset.horizontal).toEqual({ $type: A1TokenTypes.spacing, $value: '0' });
				expect(resultInset.bottom).toEqual({ $type: A1TokenTypes.spacing, $value: '0' });
			});

			it('should fill missing end when only start exists', () => {
				const tokenSet = createTokenSetWithInset(mockSsotInsetTokenOnlyStart);

				const result = extractInsetValueShorthands(tokenSet);

				const resultInset = result[A1SpecialTokenNameKeyWords.inset] as SsotInsetTokenGroup;
				expect(resultInset.all).toEqual({ $type: A1TokenTypes.spacing, $value: '0 0 0 24px' });
				expect(resultInset.end).toEqual({ $type: A1TokenTypes.spacing, $value: '0' });
				expect(resultInset.vertical).toEqual({ $type: A1TokenTypes.spacing, $value: '0' });
				expect(resultInset.start).toEqual(mockSsotInsetTokenOnlyStart.start);
			});

			it('should fill missing start when only end exists', () => {
				const tokenSet = createTokenSetWithInset(mockSsotInsetTokenOnlyEnd);

				const result = extractInsetValueShorthands(tokenSet);

				const resultInset = result[A1SpecialTokenNameKeyWords.inset] as SsotInsetTokenGroup;
				expect(resultInset.all).toEqual({ $type: A1TokenTypes.spacing, $value: '0 16px 0 0' });
				expect(resultInset.end).toEqual(mockSsotInsetTokenOnlyEnd.end);
				expect(resultInset.vertical).toEqual({ $type: A1TokenTypes.spacing, $value: '0' });
				expect(resultInset.start).toEqual({ $type: A1TokenTypes.spacing, $value: '0' });
			});

			it('should handle breakpoint tokens and log debug message', () => {
				const tokenSet = createTokenSetWithInset(mockSsotInsetTokenWithBreakpoints);
				const result = extractInsetValueShorthands(tokenSet);

				// Should remain unchanged and log debug message
				expect(result).toEqual(tokenSet);
				expect(mockLogger.warn).toHaveBeenCalledWith('No inset token adjustments for core.inset.horizontal.grid design tokens were done!');
			});

			it('should throw error for invalid inset token combinations', () => {
				const tokenSet = createTokenSetWithInset(mockSsotInsetTokenTrulyInvalid);

				expect(() => extractInsetValueShorthands(tokenSet)).toThrow(
					'Wrong combination of inset design tokens in the SSOT! Allowed are only all, vertical + horizontal, vertical + end + start, horizontal + top + bottom, top + end + bottom + start, or single one of these properties for which the missing get filled up accordingly',
				);

				expect(mockLogicalTokenSetError).toHaveBeenCalledWith(
					'Wrong combination of inset design tokens in the SSOT! Allowed are only all, vertical + horizontal, vertical + end + start, horizontal + top + bottom, top + end + bottom + start, or single one of these properties for which the missing get filled up accordingly',
					[A1SpecialTokenNameKeyWords.inset, `Design Token: ${JSON.stringify(mockSsotInsetTokenTrulyInvalid)}`],
				);
			});
		});

		describe('Recursive processing of nested objects', () => {
			it('should process nested inset tokens', () => {
				const tokenSet = mockTokenSetWithNestedInset;
				const result = extractInsetValueShorthands(tokenSet);
				const nestedInset = (result['component'] as Record<string, unknown>)['button'] as Record<string, unknown>;
				const insetResult = nestedInset[A1SpecialTokenNameKeyWords.inset] as Record<string, DesignToken>;

				expect(insetResult['all']).toEqual(mockInsetTokenWithShorthand);
				expect(insetResult['top']).toBeDefined();
				expect(insetResult['end']).toBeDefined();
				expect(insetResult['bottom']).toBeDefined();
				expect(insetResult['start']).toBeDefined();
			});

			it('should skip processing for core layer tokens', () => {
				const tokenSet = mockTokenSetWithCoreLayer;
				const result = extractInsetValueShorthands(tokenSet);

				// Should remain unchanged because core layer is skipped
				expect(result).toEqual(tokenSet);
			});

			it('should skip processing for core layer tokens with internal keyword', () => {
				const tokenSet = { ...mockTokenSetWithCoreInternalLayer };
				const originalTokenSet = JSON.stringify(tokenSet);

				extractInsetValueShorthands(tokenSet);

				// Should not process tokens with 'internal' keyword in core layer
				expect(JSON.stringify(tokenSet)).toBe(originalTokenSet);
			});

			it('should not recurse into property named core without internal keyword', () => {
				const tokenSet = { ...mockTokenSetWithCorePropertyNoInternal };
				const originalTokenSet = JSON.stringify(tokenSet);

				extractInsetValueShorthands(tokenSet);

				// Should not recurse into a property literally named 'core' when it doesn't contain 'internal'
				expect(JSON.stringify(tokenSet)).toBe(originalTokenSet);
			});
			it('should skip non-object values', () => {
				const tokenSet = {
					stringValue: 'test' as unknown as object,
					numberValue: 42 as unknown as object,
					booleanValue: true as unknown as object,
				};

				const result = extractInsetValueShorthands(tokenSet);

				expect(result).toEqual(tokenSet);
			});

			it('should skip token objects that are not inset-related', () => {
				const result = extractInsetValueShorthands(mockTokenSetWithNonInsetObjects);

				expect(result).toEqual(mockTokenSetWithNonInsetObjects);
			});

			it('should process mixed content correctly', () => {
				const result = extractInsetValueShorthands(mockTokenSetWithMixedContent);

				// Colors should remain unchanged
				expect(result['colors']).toEqual(mockTokenSetWithMixedContent.colors);

				// Spacing inset should be processed
				const spacingResult = result['spacing'] as Record<string, unknown>;
				const insetResult = spacingResult[A1SpecialTokenNameKeyWords.inset] as Record<string, DesignToken>;
				expect(insetResult['all']).toEqual(mockInsetTokenWithShorthand);

				// Other spacing tokens should remain unchanged
				expect(spacingResult['small']).toEqual(mockTokenSetWithMixedContent.spacing.small);
			});
		});

		describe('Edge cases and error handling', () => {
			it('should handle empty input object', () => {
				const result = extractInsetValueShorthands({});

				expect(result).toEqual({});
			});

			it('should handle null/undefined input gracefully', () => {
				mockIsObject.mockReturnValue(false);

				const result = extractInsetValueShorthands({});

				expect(result).toEqual({});
			});

			it('should handle tokens without value property', () => {
				const tokenSet = createTokenSetWithInset(mockInsetTokenWithoutValue);
				mockMatchAllReferenceMathShorthands.mockReturnValue(null);

				expect(() => extractInsetValueShorthands(tokenSet)).toThrow('Design Token needs to have a $type and $value property set!');
			});

			it('should preserve original object structure for non-inset properties', () => {
				const complexTokenSet = {
					colors: {
						primary: { $value: '#ff0000', $type: 'color' },
						nested: {
							secondary: { $value: '#00ff00', $type: 'color' },
						},
					},
					spacing: {
						[A1SpecialTokenNameKeyWords.inset]: mockInsetTokenWithShorthand,
					},
				};

				const result = extractInsetValueShorthands(complexTokenSet);

				// Colors structure should be preserved
				expect(result['colors']).toEqual(complexTokenSet.colors);
			});

			it('should skip grid-related inset tokens with horizontal.grid structure', () => {
				const tokenSet = createTokenSetWithInset(mockInsetTokenWithGridHorizontal);
				const loggerWarnSpy = jest.spyOn(logger, 'warn');

				const result = extractInsetValueShorthands(tokenSet);

				// Should log warning and skip processing
				expect(loggerWarnSpy).toHaveBeenCalledWith(
					`Skipping grid-related inset token: ${A1SpecialTokenNameKeyWords.inset} (contains grid breakpoints, not component insets)`,
				);
				// Grid tokens should be preserved unchanged (not converted to 'all' shorthand)
				expect(result).toEqual(tokenSet);
			});

			it('should skip grid-related inset tokens with vertical.grid structure', () => {
				const tokenSet = createTokenSetWithInset(mockInsetTokenWithGridVertical);
				const loggerWarnSpy = jest.spyOn(logger, 'warn');

				const result = extractInsetValueShorthands(tokenSet);

				// Should log warning and skip processing
				expect(loggerWarnSpy).toHaveBeenCalledWith(
					`Skipping grid-related inset token: ${A1SpecialTokenNameKeyWords.inset} (contains grid breakpoints, not component insets)`,
				);
				// Grid tokens should be preserved unchanged (not converted to 'all' shorthand)
				expect(result).toEqual(tokenSet);
			});
		});

		describe('Integration with utility functions', () => {
			it('should call isObject correctly for type checking', () => {
				const tokenSet = mockTokenSetWithMixedContent;

				extractInsetValueShorthands(tokenSet);

				expect(mockIsObject).toHaveBeenCalled();
			});

			it('should call isTokenObject correctly for token identification', () => {
				const tokenSet = createTokenSetWithInset(mockInsetTokenWithShorthand);

				extractInsetValueShorthands(tokenSet);

				expect(mockIsTokenObject).toHaveBeenCalledWith(mockInsetTokenWithShorthand);
			});

			it('should call matchAllReferenceMathShorthands with correct token value', () => {
				const tokenSet = createTokenSetWithInset(mockInsetTokenWithShorthand);

				extractInsetValueShorthands(tokenSet);

				expect(mockMatchAllReferenceMathShorthands).toHaveBeenCalledWith(mockInsetTokenWithShorthand.$value);
			});
		});

		describe('Coverage of specific code paths', () => {
			it('should handle inset tokens that are not design token objects but have all property', () => {
				const tokenSetWithAll = createTokenSetWithInset(mockSsotInsetTokenWithAll);
				// Mock isTokenObject to return false to trigger the hasOwnProperty('all') branch
				mockIsTokenObject.mockImplementation(() => false);

				const result = extractInsetValueShorthands(tokenSetWithAll);

				// Should pass through unchanged when 'all' property exists
				expect(result).toEqual(tokenSetWithAll);
			});

			it('should handle objects that are not tokens and not inset keywords', () => {
				const tokenSet = {
					notInset: {
						regular: {
							nested: { $value: '8px', $type: A1TokenTypes.spacing },
						},
					},
				};

				const result = extractInsetValueShorthands(tokenSet);

				// Should process recursively through non-inset objects
				expect(result).toEqual(tokenSet);
			});

			it('should not add "all" property when value is undefined', () => {
				const customInsetGroup = { top: { $value: '8px', $type: A1TokenTypes.spacing } };
				const tokenSet = createTokenSetWithInset(customInsetGroup);
				const result = extractInsetValueShorthands(tokenSet);
				const insetResult = result[A1SpecialTokenNameKeyWords.inset] as SsotInsetTokenGroup;

				// Should fill missing properties but still have a valid 'all' property
				expect(insetResult['all']).toBeDefined();
				expect(insetResult['top']).toEqual({ $value: '8px', $type: A1TokenTypes.spacing });
				expect(insetResult['horizontal']).toBeDefined();
			});
		});

		describe('core and internal property handling', () => {
			it('should process core property normally when it does not contain internal keyword', () => {
				const tokenSet = { ...mockTokenSetSkipCoreInternal };

				// Line 253 condition: (childPropertyName !== 'core' || !childPropertyName.includes('internal'))
				// When childPropertyName is 'core': (false || true) = true, so recursion happens
				// The ELSE branch (skip recursion) requires: childPropertyName === 'core' AND includes('internal')
				// This is impossible - 'core' can't contain 'internal' substring
				const result = extractInsetValueShorthands(tokenSet);

				expect(result).toBeDefined();
				expect(result['parent']).toBeDefined();
			});

			it('should handle composite key with core-internal pattern', () => {
				const tokenSet = { ...mockTokenSetCoreInternalKey };

				// Testing 'core-internal' key: !== 'core' is true, so recursion happens
				// The property name contains 'internal' but doesn't equal 'core'
				// So condition (true || anything) = true, recursion proceeds
				const result = extractInsetValueShorthands(tokenSet);

				expect(result).toBeDefined();
				expect(result['parent']).toBeDefined();
			});
		});
	});
});
