import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { pumlFormat, pumlFormatName } from './puml-format.js';
import {
	createBasicToken,
	createMockDictionary,
	createMockFile,
	edgeCaseScenarios,
	formatTestScenarios,
	mockFileHeaderLines,
	tokenNameVariations,
} from './puml-format.mock.spec.js';
import type { FormatFnArguments } from 'style-dictionary/types';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock the fileHeaderGenerator function
jest.mock('../file-header/file-header.js', () => {
	return {
		fileHeaderGenerator: jest.fn(() => mockFileHeaderLines),
	};
});

describe('puml-format module', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('pumlFormatName', () => {
		it('should export the correct format name', () => {
			expect(pumlFormatName).toBe('a1/format/puml');
			expect(typeof pumlFormatName).toBe('string');
		});

		it('should be a non-empty string', () => {
			expect(pumlFormatName).toBeTruthy();
			expect(pumlFormatName.length).toBeGreaterThan(0);
		});

		it('should follow the expected naming convention', () => {
			expect(pumlFormatName).toMatch(/^a1\/format\//);
			expect(pumlFormatName).toContain('puml');
		});
	});

	describe('pumlFormat', () => {
		describe('format object structure', () => {
			it('should be a valid Format object', () => {
				expect(pumlFormat).toBeDefined();
				expect(typeof pumlFormat).toBe('object');
			});

			it('should have the correct name property', () => {
				expect(pumlFormat.name).toBe(pumlFormatName);
				expect(pumlFormat.name).toBe('a1/format/puml');
			});

			it('should have a format function', () => {
				expect(pumlFormat.format).toBeDefined();
				expect(typeof pumlFormat.format).toBe('function');
			});
		});

		describe('token generation', () => {
			formatTestScenarios.forEach(scenario => {
				it(`should correctly format ${scenario.description}`, () => {
					const dictionary = createMockDictionary(scenario.tokens);
					const file = createMockFile();
					const args = { dictionary, file } as FormatFnArguments;

					const result = pumlFormat.format(args) as string;

					scenario.expectedConstants.forEach(expectedConstant => {
						expect(result).toContain(expectedConstant);
					});
				});
			});
		});

		describe('header formatting', () => {
			it('should include file header with PlantUML comment prefix', () => {
				const dictionary = createMockDictionary([createBasicToken()]);
				const file = createMockFile();
				const args = { dictionary, file } as FormatFnArguments;

				const result = pumlFormat.format(args) as string;

				mockFileHeaderLines.forEach(line => {
					expect(result).toContain(`' ${line}`);
				});
			});

			it('should format header lines with single quote prefix', () => {
				const dictionary = createMockDictionary([createBasicToken()]);
				const file = createMockFile();
				const args = { dictionary, file } as FormatFnArguments;

				const result = pumlFormat.format(args) as string;

				mockFileHeaderLines.forEach(line => {
					expect(result).toContain(`' ${line}`);
				});
			});

			it('should include file path comment', () => {
				const dictionary = createMockDictionary([createBasicToken()]);
				const file = createMockFile('output/tokens.puml');
				const args = { dictionary, file } as FormatFnArguments;

				const result = pumlFormat.format(args) as string;

				expect(result).toContain('output/tokens.puml');
			});
		});

		describe('edge cases', () => {
			edgeCaseScenarios.forEach(scenario => {
				it(`should handle ${scenario.description}`, () => {
					const dictionary = createMockDictionary(scenario.tokens);
					const file = createMockFile();
					const args = { dictionary, file } as FormatFnArguments;

					const result = pumlFormat.format(args) as string;

					scenario.expectedConstants.forEach(expectedConstant => {
						expect(result).toContain(expectedConstant);
					});

					if (scenario.expectedConstants.length === 0) {
						expect(result).not.toContain('!$');
					}
				});
			});
		});

		describe('token name handling', () => {
			tokenNameVariations.forEach(scenario => {
				it(`should handle ${scenario.description}`, () => {
					const dictionary = createMockDictionary([scenario.token]);
					const file = createMockFile();
					const args = { dictionary, file } as FormatFnArguments;

					const result = pumlFormat.format(args) as string;

					expect(result).toContain(scenario.expectedConstant);
				});
			});

			it('should convert all token names to uppercase', () => {
				const tokens = [
					createBasicToken({ name: 'lowercase', value: '#aaa' }),
					createBasicToken({ name: 'MixedCase', value: '#bbb' }),
					createBasicToken({ name: 'UPPERCASE', value: '#ccc' }),
				];
				const dictionary = createMockDictionary(tokens);
				const file = createMockFile();
				const args = { dictionary, file } as FormatFnArguments;

				const result = pumlFormat.format(args) as string;

				expect(result).toContain('!$LOWERCASE');
				expect(result).toContain('!$MIXEDCASE');
				expect(result).toContain('!$UPPERCASE');
			});
		});

		describe('PlantUML syntax compliance', () => {
			it('should use !$ prefix for constants', () => {
				const dictionary = createMockDictionary([createBasicToken()]);
				const file = createMockFile();
				const args = { dictionary, file } as FormatFnArguments;

				const result = pumlFormat.format(args) as string;

				expect(result).toContain('!$');
				expect(result).toMatch(/!\$[A-Z._-]+ = "/);
			});

			it('should use single quote prefix for comments', () => {
				const dictionary = createMockDictionary([createBasicToken()]);
				const file = createMockFile();
				const args = { dictionary, file } as FormatFnArguments;

				const result = pumlFormat.format(args) as string;

				const commentLines = result.split('\n').filter(line => line.startsWith(''));
				expect(commentLines.length).toBeGreaterThan(0);
			});

			it('should wrap values in double quotes', () => {
				const dictionary = createMockDictionary([createBasicToken({ value: '#123456' })]);
				const file = createMockFile();
				const args = { dictionary, file } as FormatFnArguments;

				const result = pumlFormat.format(args) as string;

				expect(result).toMatch(/= "#123456"/);
			});
		});

		describe('consistency', () => {
			it('should produce consistent output for same input', () => {
				const dictionary = createMockDictionary([createBasicToken()]);
				const file = createMockFile();
				const args = { dictionary, file } as FormatFnArguments;

				const result1 = pumlFormat.format(args) as string;
				const result2 = pumlFormat.format(args) as string;

				expect(result1).toBe(result2);
			});

			it('should maintain token order', () => {
				const tokens = [
					createBasicToken({ name: 'first', value: '#111' }),
					createBasicToken({ name: 'second', value: '#222' }),
					createBasicToken({ name: 'third', value: '#333' }),
				];
				const dictionary = createMockDictionary(tokens);
				const file = createMockFile();
				const args = { dictionary, file } as FormatFnArguments;

				const result = pumlFormat.format(args) as string;

				const firstIndex = result.indexOf('!$FIRST');
				const secondIndex = result.indexOf('!$SECOND');
				const thirdIndex = result.indexOf('!$THIRD');

				expect(firstIndex).toBeLessThan(secondIndex);
				expect(secondIndex).toBeLessThan(thirdIndex);
			});
		});

		describe('integration', () => {
			it('should generate complete valid PlantUML file', () => {
				const tokens = [
					createBasicToken({ name: 'color_primary', value: '#0066cc' }),
					createBasicToken({ name: 'color_secondary', value: '#ff6600' }),
				];
				const dictionary = createMockDictionary(tokens);
				const file = createMockFile('theme.puml');
				const args = { dictionary, file } as FormatFnArguments;

				const result = pumlFormat.format(args) as string;

				expect(result).toContain('theme.puml');
				mockFileHeaderLines.forEach(line => {
					expect(result).toContain(`' ${line}`);
				});
				expect(result).toContain('!$COLOR_PRIMARY = "#0066cc"');
				expect(result).toContain('!$COLOR_SECONDARY = "#ff6600"');
			});

			it('should prefer $value over value property', () => {
				const token = createBasicToken({
					value: '#ffffff',
					$value: '#000000',
				});
				const dictionary = createMockDictionary([token]);
				const file = createMockFile();
				const args = { dictionary, file } as FormatFnArguments;

				const result = pumlFormat.format(args) as string;

				expect(result).toContain('#000000');
				expect(result).not.toContain('#ffffff');
			});
		});
	});
});
