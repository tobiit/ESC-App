import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Filter, TransformedToken } from 'style-dictionary/types';
import { A1SpecialTokenNameKeyWords, A1TokenTypes } from '../../../shared/index.js';
import { excludedTokensFilter, excludedTokensFilterName } from './excluded-tokens-filter.js';
import {
	createBasicMockConfig,
	createBasicMockTransformedToken,
	createComprehensiveMockConfig,
	createConfigScenarios,
	createDifferentTypeMockTransformedToken,
	createEmptyMockConfig,
	createEmptyNameMockTransformedToken,
	createEmptyNameTokenScenario,
	createExcludedBothTokenScenario,
	createExcludedInternalTokenScenario,
	createExcludedTextCaseTokenScenario,
	createExpectedFilterObject,
	createIncludedTokenScenario,
	createInternalAtEndMockTransformedToken,
	createInternalAtEndTokenScenario,
	createInternalAtStartMockTransformedToken,
	createInternalAtStartTokenScenario,
	createInternalMockTransformedToken,
	createInternalSubstringMockTransformedToken,
	createInternalSubstringTokenScenario,
	createInternalTextCaseMockTransformedToken,
	createNullNameMockTransformedToken,
	createNullNameTokenScenario,
	createTextCaseMockTransformedToken,
	createTokenTypeScenarios,
	createUndefinedNameMockTransformedToken,
	createUndefinedNameTokenScenario,
	mockA1SpecialTokenNameKeyWordsInternal,
	mockA1TokenTypesTextCase,
} from './excluded-tokens-filter.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock the shared dependencies
jest.mock('../../../shared/index.js', () => {
	return {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		A1SpecialTokenNameKeyWords: {
			internal: 'internal',
		},
		// eslint-disable-next-line @typescript-eslint/naming-convention
		A1TokenTypes: {
			textCase: 'textCase',
			color: 'color',
			borderRadius: 'borderRadius',
			borderWidth: 'borderWidth',
			boxShadow: 'boxShadow',
			composition: 'composition',
			dimension: 'dimension',
			easing: 'easing',
			fontFamilies: 'fontFamilies',
			fontSizes: 'fontSizes',
			fontWeights: 'fontWeights',
			letterSpacing: 'letterSpacing',
			lineHeights: 'lineHeights',
			other: 'other',
			scaling: 'scaling',
			sizing: 'sizing',
			spacing: 'spacing',
			textDecoration: 'textDecoration',
			time: 'time',
			transition: 'transition',
			typography: 'typography',
		},
	};
});

describe('excluded-tokens-filter module', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('excludedTokensFilterName', () => {
		it('should export the correct filter name', () => {
			expect(excludedTokensFilterName).toBe('a1/filter/excluded');
			expect(typeof excludedTokensFilterName).toBe('string');
		});

		it('should be a non-empty string', () => {
			expect(excludedTokensFilterName).toBeTruthy();
			expect(excludedTokensFilterName.length).toBeGreaterThan(0);
		});

		it('should follow the expected naming convention', () => {
			expect(excludedTokensFilterName).toMatch(/^a1\/filter\//);
			expect(excludedTokensFilterName).toContain('excluded');
		});
	});

	describe('excludedTokensFilter', () => {
		describe('filter object structure', () => {
			it('should be a valid Filter object', () => {
				expect(excludedTokensFilter).toBeDefined();
				expect(typeof excludedTokensFilter).toBe('object');
			});

			it('should have the correct name property', () => {
				expect(excludedTokensFilter.name).toBe(excludedTokensFilterName);
				expect(excludedTokensFilter.name).toBe('a1/filter/excluded');
			});

			it('should have a filter function', () => {
				expect(excludedTokensFilter.filter).toBeDefined();
				expect(typeof excludedTokensFilter.filter).toBe('function');
			});

			it('should match the expected filter object structure', () => {
				const expected = createExpectedFilterObject();
				expect(excludedTokensFilter).toEqual(expected);
			});

			it('should satisfy the Filter interface', () => {
				const filter: Filter = excludedTokensFilter;
				expect(filter).toBeDefined();
				expect(filter.name).toBe('a1/filter/excluded');
				expect(typeof filter.filter).toBe('function');
			});
		});

		describe('filter function signature', () => {
			it('should accept TransformedToken and Config parameters', () => {
				expect(excludedTokensFilter.filter).toHaveLength(2);
			});

			it('should return boolean', () => {
				const token = createBasicMockTransformedToken();
				const config = createBasicMockConfig();

				const result = excludedTokensFilter.filter(token, config);
				expect(typeof result).toBe('boolean');
			});
		});

		describe('token inclusion logic', () => {
			it('should include regular tokens without internal keyword or textCase type', () => {
				const scenario = createIncludedTokenScenario();

				const result = excludedTokensFilter.filter(scenario.token, scenario.config);

				expect(result).toBe(scenario.expectedResult);
				expect(result).toBe(true);
			});

			it('should include tokens with different valid types', () => {
				const scenarios = createTokenTypeScenarios();

				scenarios.forEach(scenario => {
					if (scenario.tokenType !== A1TokenTypes.textCase) {
						const result = excludedTokensFilter.filter(scenario.token, scenario.config);
						expect(result).toBe(scenario.expectedResult);
						expect(result).toBe(true);
					}
				});
			});

			it('should include tokens with empty names', () => {
				const scenario = createEmptyNameTokenScenario();

				const result = excludedTokensFilter.filter(scenario.token, scenario.config);

				expect(result).toBe(scenario.expectedResult);
				expect(result).toBe(true);
			});

			it('should exclude tokens with undefined names', () => {
				const scenario = createUndefinedNameTokenScenario();

				const result = excludedTokensFilter.filter(scenario.token as TransformedToken, scenario.config);

				expect(result).toBe(scenario.expectedResult);
				expect(result).toBe(false);
			});

			it('should exclude tokens with null names', () => {
				const scenario = createNullNameTokenScenario();

				const result = excludedTokensFilter.filter(scenario.token as TransformedToken, scenario.config);

				expect(result).toBe(scenario.expectedResult);
				expect(result).toBe(false);
			});
		});

		describe('token exclusion logic', () => {
			it('should exclude tokens with internal keyword', () => {
				const scenario = createExcludedInternalTokenScenario();

				const result = excludedTokensFilter.filter(scenario.token, scenario.config);

				expect(result).toBe(scenario.expectedResult);
				expect(result).toBe(false);
			});

			it('should exclude tokens with textCase type', () => {
				const scenario = createExcludedTextCaseTokenScenario();

				const result = excludedTokensFilter.filter(scenario.token, scenario.config);

				expect(result).toBe(scenario.expectedResult);
				expect(result).toBe(false);
			});

			it('should exclude tokens with both internal keyword and textCase type', () => {
				const scenario = createExcludedBothTokenScenario();

				const result = excludedTokensFilter.filter(scenario.token, scenario.config);

				expect(result).toBe(scenario.expectedResult);
				expect(result).toBe(false);
			});

			it('should exclude tokens with internal keyword at the beginning of name', () => {
				const scenario = createInternalAtStartTokenScenario();

				const result = excludedTokensFilter.filter(scenario.token, scenario.config);

				expect(result).toBe(scenario.expectedResult);
				expect(result).toBe(false);
			});

			it('should exclude tokens with internal keyword at the end of name', () => {
				const scenario = createInternalAtEndTokenScenario();

				const result = excludedTokensFilter.filter(scenario.token, scenario.config);

				expect(result).toBe(scenario.expectedResult);
				expect(result).toBe(false);
			});

			it('should exclude tokens with internal as substring in name', () => {
				const scenario = createInternalSubstringTokenScenario();

				const result = excludedTokensFilter.filter(scenario.token, scenario.config);

				expect(result).toBe(scenario.expectedResult);
				expect(result).toBe(false);
			});
		});

		describe('internal keyword detection', () => {
			it('should use A1SpecialTokenNameKeyWords.internal for detection', () => {
				const token = createInternalMockTransformedToken();
				const config = createBasicMockConfig();

				const result = excludedTokensFilter.filter(token, config);

				expect(result).toBe(false);
				expect(A1SpecialTokenNameKeyWords.internal).toBe(mockA1SpecialTokenNameKeyWordsInternal);
			});

			it('should handle case-sensitive internal keyword detection', () => {
				const token = createBasicMockTransformedToken();
				token.name = 'testInternalToken';

				const result = excludedTokensFilter.filter(token, createBasicMockConfig());

				expect(result).toBe(false);
			});

			it('should detect internal keyword anywhere in the name', () => {
				const testCases = [
					'internal.test.token',
					'test.internal.token',
					'test.token.internal',
					'internaltest',
					'testinternal',
					'testinternaltest',
				];

				testCases.forEach(name => {
					const token = createBasicMockTransformedToken();
					token.name = name;

					const result = excludedTokensFilter.filter(token, createBasicMockConfig());

					expect(result).toBe(false);
				});
			});
		});

		describe('textCase type detection', () => {
			it('should use A1TokenTypes.textCase for detection', () => {
				const token = createTextCaseMockTransformedToken();
				const config = createBasicMockConfig();

				const result = excludedTokensFilter.filter(token, config);

				expect(result).toBe(false);
				expect(A1TokenTypes.textCase).toBe(mockA1TokenTypesTextCase);
			});

			it('should handle type casting for textCase detection', () => {
				const token = createBasicMockTransformedToken();
				token.$type = 'textCase' as A1TokenTypes;

				const result = excludedTokensFilter.filter(token, createBasicMockConfig());

				expect(result).toBe(false);
			});

			it('should exclude only textCase type tokens', () => {
				const textCaseToken = createDifferentTypeMockTransformedToken(A1TokenTypes.textCase);
				const colorToken = createDifferentTypeMockTransformedToken(A1TokenTypes.color);

				const textCaseResult = excludedTokensFilter.filter(textCaseToken, createBasicMockConfig());
				const colorResult = excludedTokensFilter.filter(colorToken, createBasicMockConfig());

				expect(textCaseResult).toBe(false);
				expect(colorResult).toBe(true);
			});
		});

		describe('edge cases and error handling', () => {
			it('should handle undefined token name gracefully', () => {
				const token = createUndefinedNameMockTransformedToken();

				const result = excludedTokensFilter.filter(token as TransformedToken, createBasicMockConfig());

				expect(result).toBe(false); // undefined name should be excluded
			});

			it('should handle null token name gracefully', () => {
				const token = createNullNameMockTransformedToken();

				const result = excludedTokensFilter.filter(token as TransformedToken, createBasicMockConfig());

				expect(result).toBe(false); // null name should be excluded
			});

			it('should handle empty token name', () => {
				const token = createEmptyNameMockTransformedToken();

				const result = excludedTokensFilter.filter(token, createBasicMockConfig());

				expect(result).toBe(true); // empty name should be included
			});

			it('should handle various config objects', () => {
				const scenarios = createConfigScenarios();
				const token = createBasicMockTransformedToken();

				scenarios.forEach(scenario => {
					const result = excludedTokensFilter.filter(token, scenario.config);
					expect(typeof result).toBe('boolean');
					expect(result).toBe(true);
				});
			});

			it('should handle empty config object', () => {
				const token = createBasicMockTransformedToken();
				const config = createEmptyMockConfig();

				const result = excludedTokensFilter.filter(token, config);

				expect(result).toBe(true);
			});

			it('should handle comprehensive config object', () => {
				const token = createBasicMockTransformedToken();
				const config = createComprehensiveMockConfig();

				const result = excludedTokensFilter.filter(token, config);

				expect(result).toBe(true);
			});
		});

		describe('filter logic behavior', () => {
			it('should implement correct boolean logic for exclusion', () => {
				// Logic: !(!noInternalToken(token) || !noTextCaseToken(token))
				// This means: exclude if (hasInternal OR hasTextCase)
				// Which is equivalent to: include if (!hasInternal AND !hasTextCase)

				const regularToken = createBasicMockTransformedToken();
				const internalToken = createInternalMockTransformedToken();
				const textCaseToken = createTextCaseMockTransformedToken();
				const bothToken = createInternalTextCaseMockTransformedToken();

				const regularResult = excludedTokensFilter.filter(regularToken, createBasicMockConfig());
				const internalResult = excludedTokensFilter.filter(internalToken, createBasicMockConfig());
				const textCaseResult = excludedTokensFilter.filter(textCaseToken, createBasicMockConfig());
				const bothResult = excludedTokensFilter.filter(bothToken, createBasicMockConfig());

				expect(regularResult).toBe(true); // !hasInternal AND !hasTextCase = true
				expect(internalResult).toBe(false); // hasInternal = exclude
				expect(textCaseResult).toBe(false); // hasTextCase = exclude
				expect(bothResult).toBe(false); // hasInternal OR hasTextCase = exclude
			});

			it('should be consistent across multiple calls with same input', () => {
				const token = createInternalMockTransformedToken();
				const config = createBasicMockConfig();

				const result1 = excludedTokensFilter.filter(token, config);
				const result2 = excludedTokensFilter.filter(token, config);
				const result3 = excludedTokensFilter.filter(token, config);

				expect(result1).toBe(result2);
				expect(result2).toBe(result3);
				expect(result1).toBe(false);
			});

			it('should ignore config parameter in filter logic', () => {
				const token = createInternalMockTransformedToken();
				const configs = [createBasicMockConfig(), createEmptyMockConfig(), createComprehensiveMockConfig()];

				const results = configs.map(config => excludedTokensFilter.filter(token, config));

				// All results should be identical since config is ignored
				expect(results.every(result => result === results[0])).toBe(true);
				expect(results[0]).toBe(false);
			});
		});

		describe('comprehensive token type testing', () => {
			it('should include all non-textCase token types', () => {
				const nonTextCaseTypes = [
					A1TokenTypes.borderRadius,
					A1TokenTypes.borderWidth,
					A1TokenTypes.boxShadow,
					A1TokenTypes.color,
					A1TokenTypes.composition,
					A1TokenTypes.dimension,
					A1TokenTypes.fontFamilies,
					A1TokenTypes.fontSizes,
					A1TokenTypes.fontWeights,
					A1TokenTypes.letterSpacing,
					A1TokenTypes.lineHeights,
					A1TokenTypes.other,
					A1TokenTypes.sizing,
					A1TokenTypes.spacing,
					A1TokenTypes.textDecoration,
					A1TokenTypes.transition,
					A1TokenTypes.typography,
				];

				nonTextCaseTypes.forEach(type => {
					const token = createDifferentTypeMockTransformedToken(type);
					const result = excludedTokensFilter.filter(token, createBasicMockConfig());

					expect(result).toBe(true);
				});
			});

			it('should exclude only textCase type specifically', () => {
				const textCaseToken = createDifferentTypeMockTransformedToken(A1TokenTypes.textCase);
				const result = excludedTokensFilter.filter(textCaseToken, createBasicMockConfig());

				expect(result).toBe(false);
			});
		});

		describe('name-based exclusion patterns', () => {
			it('should handle various internal keyword positions', () => {
				const internalPositions = [
					createInternalAtStartMockTransformedToken(),
					createInternalAtEndMockTransformedToken(),
					createInternalSubstringMockTransformedToken(),
				];

				internalPositions.forEach(token => {
					const result = excludedTokensFilter.filter(token, createBasicMockConfig());
					expect(result).toBe(false);
				});
			});

			it('should not exclude tokens without internal keyword', () => {
				const tokenNames = ['test.token.name', 'button.primary.color', 'spacing.large.value', 'typography.heading.font'];

				tokenNames.forEach(name => {
					const token = createBasicMockTransformedToken();
					token.name = name;

					const result = excludedTokensFilter.filter(token, createBasicMockConfig());
					expect(result).toBe(true);
				});
			});
		});
	});
});
