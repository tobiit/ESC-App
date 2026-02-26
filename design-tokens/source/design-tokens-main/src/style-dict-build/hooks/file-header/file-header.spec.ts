import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Config, FileHeader } from 'style-dictionary/types';
import { createDateFileHeaderPlaceholder, versionFileHeaderPlaceholder } from '../../../shared/index.js';
import { allianzFileHeaderName, fileHeaderGenerator } from './file-header.js';
import {
	createExpectedStandardFileHeader,
	createFileHeaderWithBothParametersScenario,
	createFileHeaderWithDefaultMessageScenario,
	createFileHeaderWithEmptyDefaultMessageScenario,
	createFileHeaderWithExtensiveConfigScenario,
	createFileHeaderWithMinimalConfigScenario,
	createFileHeaderWithNullDefaultMessageScenario,
	createFileHeaderWithOptionsScenario,
	createFileHeaderWithUndefinedOptionsScenario,
	createMinimalMockConfig,
	createMockConfig,
	createStandardFileHeaderScenario,
	mockAllianzFileHeaderName,
	mockCreateDateFileHeaderPlaceholder,
	mockVersionFileHeaderPlaceholder,
} from './file-header.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock the shared dependencies
jest.mock('../../../shared/index.js', () => {
	return {
		createDateFileHeaderPlaceholder: '§§{DATE_PLACEHOLDER}§§',
		versionFileHeaderPlaceholder: '§§{VERSION_PLACEHOLDER}§§',
	};
});

describe('file-header module', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('allianzFileHeaderName', () => {
		it('should export the correct file header name', () => {
			expect(allianzFileHeaderName).toBe(mockAllianzFileHeaderName);
			expect(typeof allianzFileHeaderName).toBe('string');
		});

		it('should be a non-empty string', () => {
			expect(allianzFileHeaderName).toBeTruthy();
			expect(allianzFileHeaderName.length).toBeGreaterThan(0);
		});

		it('should match the expected naming convention', () => {
			expect(allianzFileHeaderName).toMatch(/^allianz/i);
			expect(allianzFileHeaderName).toContain('FileHeader');
		});
	});

	describe('fileHeaderGenerator', () => {
		describe('function signature and type validation', () => {
			it('should be a valid FileHeader function', () => {
				expect(typeof fileHeaderGenerator).toBe('function');
			});

			it('should accept optional defaultMessage and options parameters', () => {
				expect(fileHeaderGenerator).toHaveLength(2);
			});

			it('should return string array or Promise<string[]>', () => {
				const result = fileHeaderGenerator();
				expect(Array.isArray(result) || result instanceof Promise).toBe(true);
			});
		});

		describe('successful header generation', () => {
			it('should generate standard file header with no parameters', () => {
				const scenario = createStandardFileHeaderScenario();
				const expected = createExpectedStandardFileHeader();

				const result = fileHeaderGenerator(scenario.defaultMessage, scenario.options) as string[];

				expect(result).toEqual(expected);
				expect(Array.isArray(result)).toBe(true);
				expect(result).toHaveLength(expected.length);
			});

			it('should generate file header with default message parameter (ignored)', () => {
				const scenario = createFileHeaderWithDefaultMessageScenario();
				const expected = createExpectedStandardFileHeader();

				const result = fileHeaderGenerator(scenario.defaultMessage, scenario.options) as string[];

				expect(result).toEqual(expected);
				// DefaultMessage parameter should be ignored, so result should be the same
				expect(result).not.toContain(scenario.defaultMessage?.[0]);
			});

			it('should generate file header with options parameter (ignored)', () => {
				const scenario = createFileHeaderWithOptionsScenario();
				const expected = createExpectedStandardFileHeader();

				const result = fileHeaderGenerator(scenario.defaultMessage, scenario.options) as string[];

				expect(result).toEqual(expected);
				// Options parameter should be ignored, so result should be the same
				expect(result).toHaveLength(expected.length);
			});

			it('should generate file header with both parameters (both ignored)', () => {
				const scenario = createFileHeaderWithBothParametersScenario();
				const expected = createExpectedStandardFileHeader();

				const result = fileHeaderGenerator(scenario.defaultMessage, scenario.options) as string[];

				expect(result).toEqual(expected);
				// Both parameters should be ignored
				expect(result).not.toContain(scenario.defaultMessage?.[0]);
			});

			it('should generate consistent output regardless of input parameters', () => {
				const scenarios = [
					createStandardFileHeaderScenario(),
					createFileHeaderWithDefaultMessageScenario(),
					createFileHeaderWithOptionsScenario(),
					createFileHeaderWithBothParametersScenario(),
				];

				const results = scenarios.map(scenario => fileHeaderGenerator(scenario.defaultMessage, scenario.options) as string[]);

				// All results should be identical
				results.forEach(result => {
					expect(result).toEqual(results[0]);
				});
			});
		});

		describe('header content validation', () => {
			it('should include version placeholder', () => {
				const result = fileHeaderGenerator() as string[];

				expect(result).toContain(`Version ${mockVersionFileHeaderPlaceholder}`);
				expect(result.some(line => line.includes(mockVersionFileHeaderPlaceholder))).toBe(true);
			});

			it('should include date placeholder', () => {
				const result = fileHeaderGenerator() as string[];

				expect(result).toContain(`Generated on ${mockCreateDateFileHeaderPlaceholder}`);
				expect(result.some(line => line.includes(mockCreateDateFileHeaderPlaceholder))).toBe(true);
			});

			it('should include copyright notice', () => {
				const result = fileHeaderGenerator() as string[];

				expect(result).toContain('Copyright (c) Allianz Group');
			});

			it('should include generation warning', () => {
				const result = fileHeaderGenerator() as string[];

				expect(result).toContain('THIS FILE WAS GENERATED AUTOMATICALLY AND SHOULD NOT BE EDITED MANUALLY!');
			});

			it('should include disclaimer notice about stable version', () => {
				const result = fileHeaderGenerator() as string[];

				const disclaimerLines = result.filter(line => line.includes('DISCLAIMER'));
				expect(disclaimerLines).toHaveLength(1);
				expect(result).toContain('DISCLAIMER: While this major version represents a significant milestone in stability and');
			});

			it('should include all expected lines in correct order', () => {
				const result = fileHeaderGenerator() as string[];
				const expected = createExpectedStandardFileHeader();
				expect(result).toEqual(expected);
				expected.forEach((expectedLine, index) => {
					expect(result[index]).toBe(expectedLine);
				});
			});

			it('should have correct line count', () => {
				const result = fileHeaderGenerator() as string[];

				expect(result).toHaveLength(11);
			});

			it('should include empty lines for formatting', () => {
				const result = fileHeaderGenerator() as string[];

				const emptyLines = result.filter(line => line === '');
				expect(emptyLines.length).toBeGreaterThan(0);
				expect(result[1]).toBe(''); // Second line should be empty
				expect(result[5]).toBe(''); // Sixth line should be empty
			});
		});

		describe('parameter handling and edge cases', () => {
			it('should handle empty default message array', () => {
				const scenario = createFileHeaderWithEmptyDefaultMessageScenario();
				const expected = createExpectedStandardFileHeader();

				const result = fileHeaderGenerator(scenario.defaultMessage, scenario.options) as string[];

				expect(result).toEqual(expected);
			});

			it('should handle null default message', () => {
				const scenario = createFileHeaderWithNullDefaultMessageScenario();
				const expected = createExpectedStandardFileHeader();

				const result = fileHeaderGenerator(scenario.defaultMessage, scenario.options) as string[];

				expect(result).toEqual(expected);
			});

			it('should handle undefined options explicitly', () => {
				const scenario = createFileHeaderWithUndefinedOptionsScenario();
				const expected = createExpectedStandardFileHeader();

				const result = fileHeaderGenerator(scenario.defaultMessage, scenario.options) as string[];

				expect(result).toEqual(expected);
			});

			it('should handle minimal config object', () => {
				const scenario = createFileHeaderWithMinimalConfigScenario();
				const expected = createExpectedStandardFileHeader();

				const result = fileHeaderGenerator(scenario.defaultMessage, scenario.options) as string[];

				expect(result).toEqual(expected);
			});

			it('should handle extensive config object', () => {
				const scenario = createFileHeaderWithExtensiveConfigScenario();
				const expected = createExpectedStandardFileHeader();

				const result = fileHeaderGenerator(scenario.defaultMessage, scenario.options) as string[];

				expect(result).toEqual(expected);
			});

			it('should handle various Config object structures', () => {
				const configs = [createMockConfig(), createMinimalMockConfig(), undefined];
				const expected = createExpectedStandardFileHeader();

				configs.forEach(config => {
					const result = fileHeaderGenerator(undefined, config) as string[];
					expect(result).toEqual(expected);
				});
			});
		});

		describe('placeholder integration', () => {
			it('should use versionFileHeaderPlaceholder from shared constants', () => {
				const result = fileHeaderGenerator() as string[];

				expect(result.some(line => line.includes(versionFileHeaderPlaceholder))).toBe(true);
				expect(versionFileHeaderPlaceholder).toBe(mockVersionFileHeaderPlaceholder);
			});

			it('should use createDateFileHeaderPlaceholder from shared constants', () => {
				const result = fileHeaderGenerator() as string[];

				expect(result.some(line => line.includes(createDateFileHeaderPlaceholder))).toBe(true);
				expect(createDateFileHeaderPlaceholder).toBe(mockCreateDateFileHeaderPlaceholder);
			});

			it('should preserve placeholder format for post-processing', () => {
				const result = fileHeaderGenerator() as string[];

				const versionLine = result.find(line => line.includes('Version'));
				const dateLine = result.find(line => line.includes('Generated on'));

				expect(versionLine).toContain('§§{VERSION_PLACEHOLDER}§§');
				expect(dateLine).toContain('§§{DATE_PLACEHOLDER}§§');
			});
		});

		describe('return value structure', () => {
			it('should return an array of strings', () => {
				const result = fileHeaderGenerator() as string[];

				expect(Array.isArray(result)).toBe(true);
				expect(result.every(item => typeof item === 'string')).toBe(true);
			});

			it('should return synchronously (not a Promise)', () => {
				const result = fileHeaderGenerator();

				expect(result).not.toBeInstanceOf(Promise);
				expect(Array.isArray(result)).toBe(true);
			});

			it('should return non-empty array', () => {
				const result = fileHeaderGenerator() as string[];

				expect(result.length).toBeGreaterThan(0);
			});

			it('should return array with string elements only', () => {
				const result = fileHeaderGenerator() as string[];

				result.forEach(line => {
					expect(typeof line).toBe('string');
					expect(line).toBeDefined();
					// All lines should be defined, even empty ones
					expect(line).not.toBeNull();
					expect(line).not.toBeUndefined();
				});
			});
		});

		describe('function behavior consistency', () => {
			it('should return consistent results for identical calls', () => {
				const result1 = fileHeaderGenerator() as string[];
				const result2 = fileHeaderGenerator() as string[];

				expect(result1).toEqual(result2);
				expect(result1).not.toBe(result2); // Should be different array instances
			});

			it('should return identical results for different parameter combinations', () => {
				const defaultMessages = [undefined, [], ['test'], null as unknown as string[]];
				const options = [undefined, createMockConfig(), createMinimalMockConfig()];

				const results: string[][] = [];
				defaultMessages.forEach(defaultMessage => {
					options.forEach(option => {
						results.push(fileHeaderGenerator(defaultMessage, option) as string[]);
					});
				});

				// All results should be identical since parameters are ignored
				results.forEach(result => {
					expect(result).toEqual(results[0]);
				});
			});

			it('should be deterministic', () => {
				const iterations = 10;
				const results = Array.from({ length: iterations }, () => fileHeaderGenerator() as string[]);

				results.forEach(result => {
					expect(result).toEqual(results[0]);
				});
			});
		});

		describe('FileHeader interface compliance', () => {
			it('should satisfy FileHeader type constraints', () => {
				const fn: FileHeader = fileHeaderGenerator;

				expect(typeof fn).toBe('function');
				expect(fn.length).toBeGreaterThanOrEqual(0);
			});

			it('should be usable as FileHeader in Config', () => {
				const config: Partial<Config> = {
					platforms: {
						test: {
							files: [
								{
									destination: 'test.css',
									format: 'css/variables',
									options: {
										fileHeader: fileHeaderGenerator,
									},
								},
							],
						},
					},
				};

				expect(config.platforms?.['test']?.files?.[0]?.options?.fileHeader).toBe(fileHeaderGenerator);
			});

			it('should return type compatible with FileHeader expectations', () => {
				const result = fileHeaderGenerator();

				// FileHeader should return string[] or Promise<string[]>
				const isValidReturn = Array.isArray(result) || result instanceof Promise;
				expect(isValidReturn).toBe(true);

				if (Array.isArray(result)) {
					expect(result.every(item => typeof item === 'string')).toBe(true);
				}
			});
		});

		describe('multiline content validation', () => {
			it('should split disclaimer notice across multiple lines correctly', () => {
				const result = fileHeaderGenerator() as string[];

				const disclaimerIndex = result.findIndex(line => line.includes('DISCLAIMER'));
				expect(disclaimerIndex).toBeGreaterThanOrEqual(0);

				// Check the five lines of the disclaimer notice
				expect(result[disclaimerIndex]).toBe('DISCLAIMER: While this major version represents a significant milestone in stability and');
				expect(result[disclaimerIndex + 1]).toBe('reliability, the Allianz A1 Design Tokens will continue to evolve. We are committed to');
				expect(result[disclaimerIndex + 2]).toBe(
					'regularly expanding our A1 Design Token library to support additional components and use',
				);
				expect(result[disclaimerIndex + 3]).toBe(
					'cases. Our versioning strategy follows semantic versioning principles, with major releases',
				);
				expect(result[disclaimerIndex + 4]).toBe('scheduled biannually to ensure predictability and minimize disruption to your projects.');
			});

			it('should have proper line breaks and formatting', () => {
				const result = fileHeaderGenerator() as string[];

				// First line should be the generation warning
				expect(result[0]).toBe('THIS FILE WAS GENERATED AUTOMATICALLY AND SHOULD NOT BE EDITED MANUALLY!');
				// Second line should be empty
				expect(result[1]).toBe('');
				// Version line
				expect(result[2]).toContain('Version');
				// Date line
				expect(result[3]).toContain('Generated on');
				// Copyright line
				expect(result[4]).toContain('Copyright');
				// Empty line before disclaimer
				expect(result[5]).toBe('');
				// Disclaimer notice starts
				expect(result[6]).toContain('DISCLAIMER');
			});
		});
	});
});
