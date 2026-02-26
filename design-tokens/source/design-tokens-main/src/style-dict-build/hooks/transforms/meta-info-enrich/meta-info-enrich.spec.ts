import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { PlatformConfig } from 'style-dictionary/types';
import { metaInfoEnrichTransform, metaInfoEnrichTransformName } from './meta-info-enrich.js';
import {
	createBasicMockConfig,
	createTokenWithDifferentCustomType,
	createTokenWithExtensions,
	createTokenWithoutName,
	createTokenWithoutStudioTokensExtension,
	createTokenWithSameCustomType,
	filterTestScenarios,
	mockConfig,
	transformTestScenarios,
} from './meta-info-enrich.mock.spec.js';

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

// Mock the helper function
jest.mock('./helpers/custom-token-type-resolver.js', () => {
	const actual = jest.requireActual('./helpers/custom-token-type-resolver.js') as Record<string, unknown>;
	return {
		...actual,
	};
});

// Create mock platform config
const createMockPlatformConfig = (): PlatformConfig => {
	return {
		buildPath: 'build/',
		files: [],
	};
};

const mockPlatformConfig = createMockPlatformConfig();

describe('meta-info-enrich module', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('metaInfoEnrichTransformName', () => {
		it('should export the correct transform name', () => {
			expect(metaInfoEnrichTransformName).toBe('a1/meta-info-enrich');
			expect(typeof metaInfoEnrichTransformName).toBe('string');
		});

		it('should be a non-empty string', () => {
			expect(metaInfoEnrichTransformName).toBeTruthy();
			expect(metaInfoEnrichTransformName.length).toBeGreaterThan(0);
		});

		it('should follow the expected naming convention', () => {
			expect(metaInfoEnrichTransformName).toMatch(/^a1\//);
		});
	});

	describe('metaInfoEnrichTransform', () => {
		describe('transform object structure', () => {
			it('should be a valid AttributeTransform object', () => {
				expect(metaInfoEnrichTransform).toBeDefined();
				expect(typeof metaInfoEnrichTransform).toBe('object');
			});

			it('should have the correct name property', () => {
				expect(metaInfoEnrichTransform.name).toBe(metaInfoEnrichTransformName);
				expect(metaInfoEnrichTransform.name).toBe('a1/meta-info-enrich');
			});

			it('should have the correct type property', () => {
				expect(metaInfoEnrichTransform.type).toBe('value');
			});
			it('should have the correct transitive property', () => {
				expect(metaInfoEnrichTransform.transitive).toBe(false);
			});

			it('should have a filter function', () => {
				expect(metaInfoEnrichTransform.filter).toBeDefined();
				expect(typeof metaInfoEnrichTransform.filter).toBe('function');
			});

			it('should have a transform function', () => {
				expect(metaInfoEnrichTransform.transform).toBeDefined();
				expect(typeof metaInfoEnrichTransform.transform).toBe('function');
			});
		});

		describe('filter function', () => {
			it('should accept DesignToken parameter', () => {
				expect(metaInfoEnrichTransform.filter).toHaveLength(1);
			});

			it('should return boolean', () => {
				const config = createBasicMockConfig();
				filterTestScenarios.forEach(scenario => {
					const filterFn = metaInfoEnrichTransform.filter;
					expect(filterFn).toBeDefined();
					if (filterFn) {
						const result = filterFn(scenario.token, config);
						expect(typeof result).toBe('boolean');
					}
				});
			});

			filterTestScenarios.forEach(scenario => {
				it(scenario.description, () => {
					const filterFn = metaInfoEnrichTransform.filter;
					if (filterFn) {
						const result = filterFn(scenario.token, mockConfig);
						expect(result).toBe(scenario.expected);
					}
				});
			});
		});

		describe('transform function', () => {
			it('should accept correct parameters', () => {
				expect(typeof metaInfoEnrichTransform.transform).toBe('function');
			});

			transformTestScenarios.forEach(scenario => {
				it(scenario.description, () => {
					const token = scenario.token;
					const result = metaInfoEnrichTransform.transform(token, mockPlatformConfig, mockConfig);

					// Check that the correct value is returned
					expect(result).toBe(scenario.expectedValue);

					// Check a1Customs extension if expected
					if (scenario.shouldHaveA1Customs) {
						expect(token['$extensions']).toBeDefined();
						expect(token['$extensions']?.a1Customs).toBeDefined();
						expect(token['$extensions']?.a1Customs?.a1CustomTokenType).toBeDefined();
						if (scenario.expectedCustomType) {
							expect(token['$extensions']?.a1Customs?.a1CustomTokenType).toBe(scenario.expectedCustomType);
						}
					}

					// Check that existing properties are preserved
					if (scenario.shouldPreserveExisting) {
						expect(token['$extensions']?.existingProperty).toBe('existingValue');
					}
				});
			});
		});

		describe('edge cases', () => {
			it('should handle token without name in filter', () => {
				const token = createTokenWithoutName();
				const filterFn = metaInfoEnrichTransform.filter;
				if (filterFn) {
					const result = filterFn(token, mockConfig);
					expect(result).toBe(false);
				}
			});

			it('should return $value for token with custom type equal to conventional type', () => {
				const token = createTokenWithSameCustomType();
				const result = metaInfoEnrichTransform.transform(token, mockPlatformConfig, mockConfig);
				expect(result).toBe(token.$value);
				// Should not add a1Customs when types are the same
				expect(token['$extensions']?.a1Customs).toBeUndefined();
			});

			it('should add a1Customs when custom type differs from conventional type', () => {
				const token = createTokenWithDifferentCustomType();
				const result = metaInfoEnrichTransform.transform(token, mockPlatformConfig, mockConfig);
				expect(result).toBe(token.$value);
				expect(token['$extensions']?.a1Customs).toBeDefined();
			});

			it('should preserve existing $extensions properties when adding a1Customs', () => {
				const token = createTokenWithExtensions();
				const originalExistingProperty = token['$extensions']?.existingProperty;
				const result = metaInfoEnrichTransform.transform(token, mockPlatformConfig, mockConfig);
				expect(result).toBe(token.$value);
				expect(token['$extensions']?.existingProperty).toBe(originalExistingProperty);
				expect(token['$extensions']?.a1Customs).toBeDefined();
			});

			it('should handle token without studio.tokens extension', () => {
				const token = createTokenWithoutStudioTokensExtension();
				const result = metaInfoEnrichTransform.transform(token, mockPlatformConfig, mockConfig);
				expect(result).toBe(token.$value);
				// Should resolve based on $type
				expect(token['$extensions']?.a1Customs).toBeDefined();
			});
		});
	});
});
