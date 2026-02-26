import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Config, NameTransform, PlatformConfig } from 'style-dictionary/types';
import { pumlNameTransform, pumlNameTransformName } from './puml-name.js';
import {
	complexPathScenarios,
	consistencyScenarios,
	createBasicToken,
	createExpectedNameTransform,
	edgeCaseScenarios,
	numericScenarios,
	specialCharacterScenarios,
	transformTestScenarios,
} from './puml-name.mock.spec.js';

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

describe('puml-name module', () => {
	let mockConfig: Config;
	let mockPlatformConfig: PlatformConfig;

	beforeEach(() => {
		jest.clearAllMocks();
		mockConfig = {} as Config;
		mockPlatformConfig = {} as PlatformConfig;
	});

	describe('pumlNameTransformName', () => {
		it('should export the correct transform name', () => {
			expect(pumlNameTransformName).toBe('name/puml/constant');
			expect(typeof pumlNameTransformName).toBe('string');
		});

		it('should be a non-empty string', () => {
			expect(pumlNameTransformName).toBeTruthy();
			expect(pumlNameTransformName.length).toBeGreaterThan(0);
		});

		it('should follow the expected naming convention', () => {
			expect(pumlNameTransformName).toMatch(/^name\//);
			expect(pumlNameTransformName).toContain('puml');
			expect(pumlNameTransformName).toContain('constant');
		});
	});

	describe('pumlNameTransform', () => {
		describe('transform object structure', () => {
			it('should be a valid NameTransform object', () => {
				expect(pumlNameTransform).toBeDefined();
				expect(typeof pumlNameTransform).toBe('object');
			});

			it('should have the correct name property', () => {
				expect(pumlNameTransform.name).toBe(pumlNameTransformName);
				expect(pumlNameTransform.name).toBe('name/puml/constant');
			});

			it('should have the correct type property', () => {
				expect(pumlNameTransform.type).toBe('name');
			});

			it('should have a transform function', () => {
				expect(pumlNameTransform.transform).toBeDefined();
				expect(typeof pumlNameTransform.transform).toBe('function');
			});

			it('should not have a filter function', () => {
				expect(pumlNameTransform.filter).toBeUndefined();
			});

			it('should match the expected transform object structure', () => {
				const expected = createExpectedNameTransform();
				expect(pumlNameTransform).toMatchObject(expected);
			});

			it('should satisfy the NameTransform interface', () => {
				const transform: NameTransform = pumlNameTransform;
				expect(transform).toBeDefined();
				expect(transform.name).toBe('name/puml/constant');
				expect(typeof transform.transform).toBe('function');
			});
		});

		describe('transform function', () => {
			it('should accept DesignToken parameter', () => {
				expect(pumlNameTransform.transform).toHaveLength(1);
			});

			it('should return string', () => {
				const token = createBasicToken();
				const result = pumlNameTransform.transform(token, mockPlatformConfig, mockConfig);
				expect(typeof result).toBe('string');
			});

			transformTestScenarios.forEach(scenario => {
				it(scenario.description, () => {
					const result = pumlNameTransform.transform(scenario.token, mockPlatformConfig, mockConfig);
					expect(result).toBe(scenario.expected);
				});
			});

			describe('special character handling', () => {
				specialCharacterScenarios.forEach(scenario => {
					it(scenario.description, () => {
						const result = pumlNameTransform.transform(scenario.token, mockPlatformConfig, mockConfig);
						expect(result).toBe(scenario.expected);
					});
				});

				it('should only keep alphanumeric characters and underscores', () => {
					const token = createBasicToken({ path: ['test!@#$%^&*()value'] });
					const result = pumlNameTransform.transform(token, mockPlatformConfig, mockConfig);
					expect(result).toMatch(/^[A-Z0-9_]+$/);
				});

				it('should replace all non-alphanumeric characters except underscores', () => {
					const token = createBasicToken({ path: ['a-b.c d/e@f#g'] });
					const result = pumlNameTransform.transform(token, mockPlatformConfig, mockConfig);
					expect(result).not.toContain('-');
					expect(result).not.toContain('.');
					expect(result).not.toContain(' ');
					expect(result).not.toContain('/');
					expect(result).not.toContain('@');
					expect(result).not.toContain('#');
				});
			});

			describe('numeric handling', () => {
				numericScenarios.forEach(scenario => {
					it(scenario.description, () => {
						const result = pumlNameTransform.transform(scenario.token, mockPlatformConfig, mockConfig);
						expect(result).toBe(scenario.expected);
					});
				});

				it('should preserve numbers in transformation', () => {
					const token = createBasicToken({ path: ['spacing', '16'] });
					const result = pumlNameTransform.transform(token, mockPlatformConfig, mockConfig);
					expect(result).toContain('16');
				});
			});

			describe('case conversion', () => {
				it('should convert all lowercase to uppercase', () => {
					const token = createBasicToken({ path: ['color', 'primary'] });
					const result = pumlNameTransform.transform(token, mockPlatformConfig, mockConfig);
					expect(result).toBe('COLOR_PRIMARY');
					expect(result).not.toMatch(/[a-z]/);
				});

				it('should keep uppercase unchanged', () => {
					const token = createBasicToken({ path: ['COLOR', 'PRIMARY'] });
					const result = pumlNameTransform.transform(token, mockPlatformConfig, mockConfig);
					expect(result).toBe('COLOR_PRIMARY');
				});

				it('should convert mixed case to uppercase', () => {
					const token = createBasicToken({ path: ['CoLoR', 'PrImArY'] });
					const result = pumlNameTransform.transform(token, mockPlatformConfig, mockConfig);
					expect(result).toBe('COLOR_PRIMARY');
					expect(result).not.toMatch(/[a-z]/);
				});
			});

			describe('path segment joining', () => {
				it('should join path segments with underscores', () => {
					const token = createBasicToken({ path: ['a', 'b', 'c', 'd'] });
					const result = pumlNameTransform.transform(token, mockPlatformConfig, mockConfig) as string;
					expect(result).toBe('A_B_C_D');
					expect(result.split('_')).toHaveLength(4);
				});

				it('should handle single segment without underscores', () => {
					const token = createBasicToken({ path: ['single'] });
					const result = pumlNameTransform.transform(token, mockPlatformConfig, mockConfig) as string;
					expect(result).toBe('SINGLE');
					expect(result).not.toContain('_');
				});

				it('should handle two segments with single underscore', () => {
					const token = createBasicToken({ path: ['first', 'second'] });
					const result = pumlNameTransform.transform(token, mockPlatformConfig, mockConfig) as string;
					expect(result).toBe('FIRST_SECOND');
					expect(result.match(/_/g)?.length).toBe(1);
				});
			});

			describe('edge cases', () => {
				edgeCaseScenarios.forEach(scenario => {
					it(scenario.description, () => {
						const result = pumlNameTransform.transform(scenario.token, mockPlatformConfig, mockConfig);
						expect(result).toBe(scenario.expected);
					});
				});

				it('should handle token without path property', () => {
					const token = createBasicToken();
					delete (token as Record<string, unknown>)['path'];
					const result = pumlNameTransform.transform(token, mockPlatformConfig, mockConfig);
					expect(result).toBe('');
				});

				it('should handle path as empty array explicitly', () => {
					const token = createBasicToken({ path: [] });
					const result = pumlNameTransform.transform(token, mockPlatformConfig, mockConfig) as string;
					expect(result).toBe('');
					expect(result).toHaveLength(0);
				});
			});

			describe('complex path scenarios', () => {
				complexPathScenarios.forEach(scenario => {
					it(scenario.description, () => {
						const result = pumlNameTransform.transform(scenario.token, mockPlatformConfig, mockConfig);
						expect(result).toBe(scenario.expected);
					});
				});

				it('should handle very long paths', () => {
					const longPath = Array(20)
						.fill('')
						.map((_, i) => `segment${i}`);
					const token = createBasicToken({ path: longPath });
					const result = pumlNameTransform.transform(token, mockPlatformConfig, mockConfig) as string;
					expect(result.split('_')).toHaveLength(20);
					expect(result).toMatch(/^[A-Z0-9_]+$/);
				});
			});

			describe('consistency', () => {
				consistencyScenarios.forEach(scenario => {
					it(scenario.description, () => {
						const token1 = createBasicToken({ path: scenario.path });
						const token2 = createBasicToken({ path: scenario.path });
						const result1 = pumlNameTransform.transform(token1, mockPlatformConfig, mockConfig);
						const result2 = pumlNameTransform.transform(token2, mockPlatformConfig, mockConfig);
						expect(result1).toBe(result2);
						expect(result1).toBe(scenario.expected);
					});
				});

				it('should produce consistent output for same input', () => {
					const token = createBasicToken({ path: ['color', 'primary', 'base'] });
					const result1 = pumlNameTransform.transform(token, mockPlatformConfig, mockConfig);
					const result2 = pumlNameTransform.transform(token, mockPlatformConfig, mockConfig);
					const result3 = pumlNameTransform.transform(token, mockPlatformConfig, mockConfig);
					expect(result1).toBe(result2);
					expect(result2).toBe(result3);
				});

				it('should be deterministic', () => {
					const token = createBasicToken({ path: ['test', 'value', '123'] });
					const results = Array(10)
						.fill(null)
						.map(() => pumlNameTransform.transform(token, mockPlatformConfig, mockConfig));
					const allSame = results.every(result => result === results[0]);
					expect(allSame).toBe(true);
				});
			});

			describe('integration scenarios', () => {
				it('should transform typical token path for PlantUML constant', () => {
					const token = createBasicToken({
						name: 'color.brand.primary',
						path: ['color', 'brand', 'primary'],
					});

					const result = pumlNameTransform.transform(token, mockPlatformConfig, mockConfig);
					expect(result).toBe('COLOR_BRAND_PRIMARY');
					expect(result).toMatch(/^[A-Z0-9_]+$/);
				});

				it('should handle semantic token path', () => {
					const token = createBasicToken({
						name: 'semantic.button.primary.background',
						path: ['semantic', 'button', 'primary', 'background'],
					});

					const result = pumlNameTransform.transform(token, mockPlatformConfig, mockConfig);
					expect(result).toBe('SEMANTIC_BUTTON_PRIMARY_BACKGROUND');
				});

				it('should handle spacing token with numeric value', () => {
					const token = createBasicToken({
						name: 'spacing.16',
						path: ['spacing', '16'],
						$type: 'dimension',
						$value: '16px',
					});

					const result = pumlNameTransform.transform(token, mockPlatformConfig, mockConfig);
					expect(result).toBe('SPACING_16');
				});
			});
		});
	});
});
