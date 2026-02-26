import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Config, PlatformConfig, ValueTransform } from 'style-dictionary/types';
import { pumlColorTransform, pumlColorTransformName } from './puml-color.js';
import {
	createBasicColorToken,
	createExpectedValueTransform,
	createNonColorToken,
	edgeCaseScenarios,
	filterTestScenarios,
	hexFormatVariations,
	transformTestScenarios,
} from './puml-color.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock style-dictionary/enums to avoid ES module issues
jest.mock('style-dictionary/enums', () => {
	return {
		transformTypes: {
			value: 'value',
			name: 'name',
			attribute: 'attribute',
		},
	};
});

describe('puml-color module', () => {
	let mockConfig: Config;
	let mockPlatformConfig: PlatformConfig;

	beforeEach(() => {
		jest.clearAllMocks();
		mockConfig = {} as Config;
		mockPlatformConfig = {} as PlatformConfig;
	});

	describe('pumlColorTransformName', () => {
		it('should export the correct transform name', () => {
			expect(pumlColorTransformName).toBe('color/puml');
			expect(typeof pumlColorTransformName).toBe('string');
		});

		it('should be a non-empty string', () => {
			expect(pumlColorTransformName).toBeTruthy();
			expect(pumlColorTransformName.length).toBeGreaterThan(0);
		});

		it('should follow the expected naming convention', () => {
			expect(pumlColorTransformName).toMatch(/^color\//);
			expect(pumlColorTransformName).toContain('puml');
		});
	});

	describe('pumlColorTransform', () => {
		describe('transform object structure', () => {
			it('should be a valid ValueTransform object', () => {
				expect(pumlColorTransform).toBeDefined();
				expect(typeof pumlColorTransform).toBe('object');
			});

			it('should have the correct name property', () => {
				expect(pumlColorTransform.name).toBe(pumlColorTransformName);
				expect(pumlColorTransform.name).toBe('color/puml');
			});

			it('should have the correct type property', () => {
				expect(pumlColorTransform.type).toBe('value');
			});

			it('should have a filter function', () => {
				expect(pumlColorTransform.filter).toBeDefined();
				expect(typeof pumlColorTransform.filter).toBe('function');
			});

			it('should have a transform function', () => {
				expect(pumlColorTransform.transform).toBeDefined();
				expect(typeof pumlColorTransform.transform).toBe('function');
			});

			it('should match the expected transform object structure', () => {
				const expected = createExpectedValueTransform();
				expect(pumlColorTransform).toMatchObject(expected);
			});

			it('should satisfy the ValueTransform interface', () => {
				const transform: ValueTransform = pumlColorTransform;
				expect(transform).toBeDefined();
				expect(transform.name).toBe('color/puml');
				expect(typeof transform.filter).toBe('function');
				expect(typeof transform.transform).toBe('function');
			});
		});

		describe('filter function', () => {
			it('should accept DesignToken parameter', () => {
				expect(pumlColorTransform.filter).toHaveLength(1);
			});

			it('should return boolean', () => {
				const token = createBasicColorToken();
				const filterFn = pumlColorTransform.filter;
				if (filterFn) {
					const result = filterFn(token, mockConfig);
					expect(typeof result).toBe('boolean');
				}
			});

			it('should return true for color tokens', () => {
				const token = createBasicColorToken();
				const filterFn = pumlColorTransform.filter;
				if (filterFn) {
					const result = filterFn(token, mockConfig);
					expect(result).toBe(true);
				}
			});

			it('should return false for non-color tokens', () => {
				const token = createNonColorToken();
				const filterFn = pumlColorTransform.filter;
				if (filterFn) {
					const result = filterFn(token, mockConfig);
					expect(result).toBe(false);
				}
			});

			filterTestScenarios.forEach(scenario => {
				it(scenario.description, () => {
					const filterFn = pumlColorTransform.filter;
					if (filterFn) {
						const result = filterFn(scenario.token, mockConfig);
						expect(result).toBe(scenario.expected);
						expect(typeof result).toBe('boolean');
					}
				});
			});
		});

		describe('transform function', () => {
			it('should accept DesignToken parameter', () => {
				expect(pumlColorTransform.transform).toHaveLength(1);
			});

			transformTestScenarios.forEach(scenario => {
				it(scenario.description, () => {
					const result = pumlColorTransform.transform(scenario.token, mockPlatformConfig, mockConfig);
					expect(result).toBe(scenario.expected);
				});
			});

			describe('hex color normalization', () => {
				hexFormatVariations.forEach(scenario => {
					it(`should normalize ${scenario.description}`, () => {
						const token = createBasicColorToken({ $value: scenario.input });
						const result = pumlColorTransform.transform(token, mockPlatformConfig, mockConfig);
						expect(result).toBe(scenario.expected);
					});
				});

				it('should convert all hex characters to uppercase', () => {
					const token = createBasicColorToken({ $value: '#abcdef' });
					const result = pumlColorTransform.transform(token, mockPlatformConfig, mockConfig);
					expect(result).toBe('#ABCDEF');
					expect(result).not.toContain('a');
					expect(result).not.toContain('b');
					expect(result).not.toContain('c');
				});

				it('should preserve hash prefix if present', () => {
					const token = createBasicColorToken({ $value: '#123456' });
					const result = pumlColorTransform.transform(token, mockPlatformConfig, mockConfig);
					expect(result).toMatch(/^#/);
				});

				it('should add hash prefix if missing', () => {
					const token = createBasicColorToken({ $value: '123456' });
					const result = pumlColorTransform.transform(token, mockPlatformConfig, mockConfig);
					expect(result).toMatch(/^#/);
					expect(result).toBe('#123456');
				});
			});

			describe('edge cases', () => {
				edgeCaseScenarios.forEach(scenario => {
					it(scenario.description, () => {
						const result = pumlColorTransform.transform(scenario.token, mockPlatformConfig, mockConfig);
						expect(result).toEqual(scenario.expected);
					});
				});

				it('should handle boolean value', () => {
					const token = createBasicColorToken({ $value: true as unknown as string });
					const result = pumlColorTransform.transform(token, mockPlatformConfig, mockConfig);
					expect(result).toBe(true);
				});

				it('should handle array value', () => {
					const token = createBasicColorToken({ $value: ['#ff0000', '#00ff00'] as unknown as string });
					const result = pumlColorTransform.transform(token, mockPlatformConfig, mockConfig);
					expect(result).toEqual(['#ff0000', '#00ff00']);
				});
			});

			describe('consistency', () => {
				it('should produce consistent output for same input', () => {
					const token = createBasicColorToken({ $value: '#abc123' });
					const result1 = pumlColorTransform.transform(token, mockPlatformConfig, mockConfig);
					const result2 = pumlColorTransform.transform(token, mockPlatformConfig, mockConfig);
					expect(result1).toBe(result2);
				});

				it('should be idempotent for uppercase hex', () => {
					const token = createBasicColorToken({ $value: '#ABC123' });
					const result1 = pumlColorTransform.transform(token, mockPlatformConfig, mockConfig);
					const result2 = pumlColorTransform.transform(
						createBasicColorToken({ $value: result1 as string }),
						mockPlatformConfig,
						mockConfig,
					);
					expect(result1).toBe(result2);
				});
			});

			describe('integration scenarios', () => {
				it('should handle typical color token transformation', () => {
					const token = createBasicColorToken({
						name: 'color.brand.primary',
						$value: '#0066cc',
					});

					const shouldMatch = pumlColorTransform.filter?.(token, mockConfig);
					expect(shouldMatch).toBe(true);

					const result = pumlColorTransform.transform(token, mockPlatformConfig, mockConfig);
					expect(result).toBe('#0066CC');
				});

				it('should handle color token with lowercase hex', () => {
					const token = createBasicColorToken({
						name: 'color.brand.secondary',
						$value: 'ff6600',
					});

					const shouldMatch = pumlColorTransform.filter?.(token, mockConfig);
					expect(shouldMatch).toBe(true);

					const result = pumlColorTransform.transform(token, mockPlatformConfig, mockConfig);
					expect(result).toBe('#FF6600');
				});

				it('should not process non-color tokens', () => {
					const token = createNonColorToken();

					const shouldMatch = pumlColorTransform.filter?.(token, mockConfig);
					expect(shouldMatch).toBe(false);
				});
			});
		});
	});
});
