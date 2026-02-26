import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { DesignSystemNames, readJsonFile, readLinesFromFile, writeFile, writeJsonFile } from '../../shared/index.js';
import { runRemTypoUnitConversions } from './rem-typo-units-conversion.js';
import {
	createObjectWithInheritedProps,
	mockCssContentWithoutTypography,
	mockCssContentWithTypography,
	mockCssExpectedOutput,
	mockCssFilePath,
	mockFileList,
	mockJsContentWithTypography,
	mockJsExpectedOutput,
	mockJsFilePath,
	mockJsonDataCamelCase,
	mockJsonDataCamelCaseExpected,
	mockJsonDataComplexNested,
	mockJsonDataComplexNestedExpected,
	mockJsonDataDecimal,
	mockJsonDataDecimalExpected,
	mockJsonDataMixed,
	mockJsonDataMixedExpected,
	mockJsonDataNegative,
	mockJsonDataNegativeExpected,
	mockJsonDataNested,
	mockJsonDataNestedExpected,
	mockJsonDataNestedObjectWithoutType,
	mockJsonDataNonString,
	mockJsonDataNoTypography,
	mockJsonDataOtherUnits,
	mockJsonDataSimple,
	mockJsonDataSimpleExpected,
	mockJsonDataUnderscoreCase,
	mockJsonDataUnderscoreCaseExpected,
	mockJsonDataWithAllTypographyTypes,
	mockJsonDataWithAllTypographyTypesExpected,
	mockJsonDataWithArray,
	mockJsonDataWithArrayExpected,
	mockJsonDataWithDollarValue,
	mockJsonDataWithDollarValueExpected,
	mockJsonDataWithFontSizeType,
	mockJsonDataWithFontSizeTypeExpected,
	mockJsonDataWithInheritedPropsExpected,
	mockJsonDataWithInvalidStudioTokens,
	mockJsonDataWithInvalidStudioTokensExpected,
	mockJsonDataWithLetterSpacingOriginalType,
	mockJsonDataWithLetterSpacingOriginalTypeExpected,
	mockJsonDataWithLineHeightType,
	mockJsonDataWithLineHeightTypeExpected,
	mockJsonDataWithNonTypographyType,
	mockJsonDataWithNullInArray,
	mockJsonDataWithNullInArrayExpected,
	mockJsonDataWithNullStudioTokens,
	mockJsonDataWithNullStudioTokensExpected,
	mockJsonDataWithNullStudioTokensNoFontSizeType,
	mockJsonDataWithNullValues,
	mockJsonDataWithTextKeyword,
	mockJsonDataWithTextKeywordExpected,
	mockJsonDataZero,
	mockJsonDataZeroExpected,
	mockJsonFilePath,
	mockScssContentWithTypography,
	mockScssExpectedOutput,
	mockScssFilePath,
} from './rem-typo-units-conversion.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock all external dependencies
jest.mock('../../shared/index.js', () => {
	const actual: object = jest.requireActual('../../shared/index.js');
	return {
		...actual,
		checkFolderExistence: jest.fn(),
		loadFilesFromFolder: jest.fn(),
		readFile: jest.fn(),
		readJsonFile: jest.fn(),
		readLinesFromFile: jest.fn(),
		writeFile: jest.fn(),
		writeJsonFile: jest.fn(),
		logger: {
			start: jest.fn(),
			info: jest.fn(),
			success: jest.fn(),
		},
		logicalTokenSetError: jest.fn(),
	};
});

// Import mocked functions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sharedMocks = jest.requireMock('../../shared/index.js') as any;
const mockCheckFolderExistence = sharedMocks.checkFolderExistence as jest.MockedFunction<() => boolean>;
const mockLoadFilesFromFolder = sharedMocks.loadFilesFromFolder as jest.MockedFunction<() => Promise<string[]>>;
const mockReadJsonFile = readJsonFile as jest.MockedFunction<typeof readJsonFile>;
const mockReadLinesFromFile = readLinesFromFile as jest.MockedFunction<typeof readLinesFromFile>;
const mockWriteFile = writeFile as jest.MockedFunction<typeof writeFile>;
const mockWriteJsonFile = writeJsonFile as jest.MockedFunction<typeof writeJsonFile>;
const mockLogger = sharedMocks.logger as jest.Mocked<{
	start: jest.MockedFunction<(message: string) => void>;
	info: jest.MockedFunction<(message: string) => void>;
	success: jest.MockedFunction<(message: string) => void>;
}>;
const mockLogicalTokenSetError = sharedMocks.logicalTokenSetError as jest.MockedFunction<(message: string) => void>;

describe('runRemTypoUnitConversions', () => {
	const typographyPath = 'tokens/a1/core/typography.json';
	const typographySsotMock = {
		core: {
			internal: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'font-size': {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'user-agent': {
						$value: 16,
						$type: 'dimension',
					},
				},
			},
		},
	};

	const setupJsonFileMock = (testFilePath: string, testFileData: object): void => {
		mockReadJsonFile.mockImplementation((filePath: string) => {
			if (filePath === typographyPath) {
				return typographySsotMock;
			}
			if (filePath === testFilePath) {
				return testFileData;
			}
			return {};
		});
	};

	beforeEach(() => {
		jest.clearAllMocks();
		// Setup default mock that returns typography user agent for the SSOT path
		mockReadJsonFile.mockImplementation((filePath: string) => {
			if (filePath === typographyPath) {
				return typographySsotMock;
			}
			return {};
		});
	});

	describe('successful conversion scenarios', () => {
		it('should convert px to rem in CSS files', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockCssFilePath]);
			mockReadLinesFromFile.mockResolvedValue(mockCssContentWithTypography.split('\n'));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockReadLinesFromFile).toHaveBeenCalledWith(mockCssFilePath);
			expect(mockWriteFile).toHaveBeenCalledWith(mockCssFilePath, mockCssExpectedOutput);
			expect(mockLogger.start).toHaveBeenCalledWith('Custom REM unit conversions for font-size, line-height and letter-spacing');
			expect(mockLogger.success).toHaveBeenCalledWith('Finished custom REM unit conversions for font-size, line-height and letter-spacing');
		});

		it('should convert px to rem in SCSS files', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockScssFilePath]);
			mockReadLinesFromFile.mockResolvedValue(mockScssContentWithTypography.split('\n'));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockReadLinesFromFile).toHaveBeenCalledWith(mockScssFilePath);
			expect(mockWriteFile).toHaveBeenCalledWith(mockScssFilePath, mockScssExpectedOutput);
		});

		it('should convert px to rem in JS files', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsFilePath]);
			mockReadLinesFromFile.mockResolvedValue(mockJsContentWithTypography.split('\n'));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockReadLinesFromFile).toHaveBeenCalledWith(mockJsFilePath);
			expect(mockWriteFile).toHaveBeenCalledWith(mockJsFilePath, mockJsExpectedOutput);
		});

		it('should convert px to rem in JSON files with simple structure', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			setupJsonFileMock(mockJsonFilePath, JSON.parse(JSON.stringify(mockJsonDataSimple)));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockReadJsonFile).toHaveBeenCalledWith(mockJsonFilePath);
			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, mockJsonDataSimpleExpected);
		});

		it('should convert px to rem in JSON files with nested structure', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			setupJsonFileMock(mockJsonFilePath, JSON.parse(JSON.stringify(mockJsonDataNested)));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, mockJsonDataNestedExpected);
		});

		it('should convert px to rem in JSON files with $value properties', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			setupJsonFileMock(mockJsonFilePath, JSON.parse(JSON.stringify(mockJsonDataWithDollarValue)));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, mockJsonDataWithDollarValueExpected);
		});

		it('should convert px to rem in JSON files with camelCase keys', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			setupJsonFileMock(mockJsonFilePath, JSON.parse(JSON.stringify(mockJsonDataCamelCase)));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, mockJsonDataCamelCaseExpected);
		});

		it('should convert px to rem in JSON files with underscore_case keys', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			setupJsonFileMock(mockJsonFilePath, JSON.parse(JSON.stringify(mockJsonDataUnderscoreCase)));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, mockJsonDataUnderscoreCaseExpected);
		});

		it('should convert px to rem in JSON files with arrays', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			setupJsonFileMock(mockJsonFilePath, JSON.parse(JSON.stringify(mockJsonDataWithArray)));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, mockJsonDataWithArrayExpected);
		});

		it('should convert px to rem in JSON files with text keyword', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			setupJsonFileMock(mockJsonFilePath, JSON.parse(JSON.stringify(mockJsonDataWithTextKeyword)));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, mockJsonDataWithTextKeywordExpected);
		});

		it('should convert decimal px values to rem', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			setupJsonFileMock(mockJsonFilePath, JSON.parse(JSON.stringify(mockJsonDataDecimal)));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, mockJsonDataDecimalExpected);
		});

		it('should convert zero px values to rem', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			setupJsonFileMock(mockJsonFilePath, JSON.parse(JSON.stringify(mockJsonDataZero)));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, mockJsonDataZeroExpected);
		});

		it('should handle mixed typography and non-typography properties', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			setupJsonFileMock(mockJsonFilePath, JSON.parse(JSON.stringify(mockJsonDataMixed)));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, mockJsonDataMixedExpected);
		});

		it('should handle complex nested structures correctly', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			setupJsonFileMock(mockJsonFilePath, JSON.parse(JSON.stringify(mockJsonDataComplexNested)));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, mockJsonDataComplexNestedExpected);
		});

		it('should process multiple files of different types', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue(mockFileList);
			mockReadLinesFromFile
				.mockResolvedValueOnce(mockCssContentWithTypography.split('\n'))
				.mockResolvedValueOnce(mockScssContentWithTypography.split('\n'))
				.mockResolvedValueOnce(mockJsContentWithTypography.split('\n'));
			setupJsonFileMock(mockJsonFilePath, JSON.parse(JSON.stringify(mockJsonDataSimple)));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockReadLinesFromFile).toHaveBeenCalledTimes(3);
			expect(mockWriteFile).toHaveBeenCalledTimes(3);
			expect(mockReadJsonFile).toHaveBeenCalledTimes(2); // Once for typography SSOT, once for JSON file
			expect(mockWriteJsonFile).toHaveBeenCalledTimes(1);
		});

		it('should convert px to rem in JSON files with $type fontSize', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			setupJsonFileMock(mockJsonFilePath, JSON.parse(JSON.stringify(mockJsonDataWithFontSizeType)));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, mockJsonDataWithFontSizeTypeExpected);
		});

		it('should convert px to rem in JSON files with $type lineHeight', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			setupJsonFileMock(mockJsonFilePath, JSON.parse(JSON.stringify(mockJsonDataWithLineHeightType)));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, mockJsonDataWithLineHeightTypeExpected);
		});

		it('should convert px to rem in JSON files with originalType letterSpacing', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			setupJsonFileMock(mockJsonFilePath, JSON.parse(JSON.stringify(mockJsonDataWithLetterSpacingOriginalType)));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, mockJsonDataWithLetterSpacingOriginalTypeExpected);
		});

		it('should convert negative px values to rem', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			setupJsonFileMock(mockJsonFilePath, JSON.parse(JSON.stringify(mockJsonDataNegative)));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, mockJsonDataNegativeExpected);
		});

		it('should convert all typography types (fontSize, lineHeight, letterSpacing) in one structure', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			setupJsonFileMock(mockJsonFilePath, JSON.parse(JSON.stringify(mockJsonDataWithAllTypographyTypes)));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, mockJsonDataWithAllTypographyTypesExpected);
		});
	});

	describe('files without typography properties', () => {
		it('should not modify CSS files without typography properties', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockCssFilePath]);
			mockReadLinesFromFile.mockResolvedValue(mockCssContentWithoutTypography.split('\n'));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteFile).toHaveBeenCalledWith(mockCssFilePath, mockCssContentWithoutTypography);
		});

		it('should not modify JSON files without typography properties', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			const noTypographyDataCopy = JSON.parse(JSON.stringify(mockJsonDataNoTypography));
			setupJsonFileMock(mockJsonFilePath, noTypographyDataCopy);

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, mockJsonDataNoTypography);
		});

		it('should not modify non-string values in JSON files', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			const nonStringDataCopy = JSON.parse(JSON.stringify(mockJsonDataNonString));
			setupJsonFileMock(mockJsonFilePath, nonStringDataCopy);

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, mockJsonDataNonString);
		});

		it('should not modify values with other units in JSON files', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			const otherUnitsDataCopy = JSON.parse(JSON.stringify(mockJsonDataOtherUnits));
			setupJsonFileMock(mockJsonFilePath, otherUnitsDataCopy);

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, mockJsonDataOtherUnits);
		});

		it('should not modify JSON files with non-typography $type', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			const nonTypographyTypeCopy = JSON.parse(JSON.stringify(mockJsonDataWithNonTypographyType));
			setupJsonFileMock(mockJsonFilePath, nonTypographyTypeCopy);

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, mockJsonDataWithNonTypographyType);
		});

		it('should still convert when studio.tokens is not an object', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			setupJsonFileMock(mockJsonFilePath, JSON.parse(JSON.stringify(mockJsonDataWithInvalidStudioTokens)));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, mockJsonDataWithInvalidStudioTokensExpected);
		});

		it('should still convert when studio.tokens is null', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			setupJsonFileMock(mockJsonFilePath, JSON.parse(JSON.stringify(mockJsonDataWithNullStudioTokens)));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, mockJsonDataWithNullStudioTokensExpected);
		});

		it('should not convert when studio.tokens is null and no fontSize $type', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			const dataCopy = JSON.parse(JSON.stringify(mockJsonDataWithNullStudioTokensNoFontSizeType));
			setupJsonFileMock(mockJsonFilePath, dataCopy);

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, mockJsonDataWithNullStudioTokensNoFontSizeType);
		});

		it('should traverse nested objects without $type in else branch', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			const nestedDataCopy = JSON.parse(JSON.stringify(mockJsonDataNestedObjectWithoutType));
			setupJsonFileMock(mockJsonFilePath, nestedDataCopy);

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, mockJsonDataNestedObjectWithoutType);
		});

		it('should handle null values in arrays', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			setupJsonFileMock(mockJsonFilePath, JSON.parse(JSON.stringify(mockJsonDataWithNullInArray)));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, mockJsonDataWithNullInArrayExpected);
		});

		it('should handle null values in object properties', async () => {
			const brand = 'escapp';
			const expected = {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'font-size': {
					name: 'font-size',
					$value: '1rem',
					$type: 'dimension',
				},
				nested: {
					color: {
						name: 'nested.color',
						$value: '#000',
						$type: 'color',
					},
				},
			};
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			setupJsonFileMock(mockJsonFilePath, JSON.parse(JSON.stringify(mockJsonDataWithNullValues)));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, expected);
		});

		it('should skip inherited properties from prototype chain', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			setupJsonFileMock(mockJsonFilePath, createObjectWithInheritedProps());

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			const result = mockWriteJsonFile.mock.calls[0][1] as Record<string, unknown>;
			expect(result).toEqual(mockJsonDataWithInheritedPropsExpected);
		});
	});

	describe('error handling', () => {
		it('should log error and return early when directory does not exist', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(false);

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockLogicalTokenSetError).toHaveBeenCalledWith(
				expect.stringContaining('REM unit conversion could not be done, because the path'),
			);
			expect(mockLoadFilesFromFolder).not.toHaveBeenCalled();
			expect(mockLogger.start).not.toHaveBeenCalled();
		});

		it('should handle empty file list gracefully', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([]);

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockLogger.start).toHaveBeenCalled();
			expect(mockLogger.success).toHaveBeenCalled();
			expect(mockReadLinesFromFile).not.toHaveBeenCalled();
			expect(mockReadJsonFile).toHaveBeenCalled(); // Called for typography.json
		});
	});

	describe('edge cases', () => {
		it('should handle empty brand string', async () => {
			const brand = '';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([]);

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockCheckFolderExistence).toHaveBeenCalled();
			expect(mockLogger.success).toHaveBeenCalled();
		});

		it('should handle different design system names', async () => {
			const brand = 'escapp';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([]);

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockCheckFolderExistence).toHaveBeenCalled();
		});

		it('should handle files without extensions gracefully', async () => {
			const brand = 'escapp';
			const fileWithoutExtension = '/mock/path/tokens';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([fileWithoutExtension]);

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockLogger.success).toHaveBeenCalled();
			expect(mockReadLinesFromFile).not.toHaveBeenCalled();
			expect(mockReadJsonFile).toHaveBeenCalled(); // Called for typography.json
		});

		it('should handle unsupported file extensions gracefully', async () => {
			const brand = 'escapp';
			const unsupportedFile = '/mock/path/tokens.txt';
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([unsupportedFile]);

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockLogger.success).toHaveBeenCalled();
			expect(mockReadLinesFromFile).not.toHaveBeenCalled();
			expect(mockReadJsonFile).toHaveBeenCalled(); // Called for typography.json
		});
	});

	describe('conversion accuracy', () => {
		it('should convert 16px to 1rem (default font size)', async () => {
			const brand = 'escapp';

			const testData = {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'font-size': {
					name: 'font-size',
					$value: '16px',
					$type: 'dimension',
				},
			};

			const expectedData = {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'font-size': {
					name: 'font-size',
					$value: '1rem',
					$type: 'dimension',
				},
			};
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			setupJsonFileMock(mockJsonFilePath, JSON.parse(JSON.stringify(testData)));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, expectedData);
		});

		it('should handle precision correctly for fractional results', async () => {
			const brand = 'escapp';
			const testData = {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'font-size': {
					name: 'font-size',
					$value: '14px',
					$type: 'dimension',
				},
			};
			const expectedData = {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'font-size': {
					name: 'font-size',
					$value: '0.875rem',
					$type: 'dimension',
				},
			};
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			setupJsonFileMock(mockJsonFilePath, JSON.parse(JSON.stringify(testData)));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, expectedData);
		});

		it('should limit decimal precision to 5 places', async () => {
			const brand = 'escapp';
			const testData = {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'font-size': {
					name: 'font-size',
					$value: '13px',
					$type: 'dimension',
				},
			};
			const expectedData = {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'font-size': {
					name: 'font-size',
					$value: '0.8125rem',
					$type: 'dimension',
				},
			};
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			setupJsonFileMock(mockJsonFilePath, JSON.parse(JSON.stringify(testData)));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(mockWriteJsonFile).toHaveBeenCalledWith(mockJsonFilePath, expectedData);
		});
	});

	describe('integration scenarios', () => {
		it('should process full workflow from start to finish', async () => {
			const brand = 'escapp';
			const callOrder: string[] = [];

			mockCheckFolderExistence.mockImplementation(() => {
				callOrder.push('checkFolderExistence');
				return true;
			});

			mockLoadFilesFromFolder.mockImplementation(async () => {
				callOrder.push('loadFilesFromFolder');
				return [mockCssFilePath];
			});

			mockReadLinesFromFile.mockImplementation(async () => {
				callOrder.push('readLinesFromFile');
				return mockCssContentWithTypography.split('\n');
			});

			mockWriteFile.mockImplementation(() => {
				callOrder.push('writeFile');
			});

			mockLogger.start.mockImplementation(() => {
				callOrder.push('logger.start');
			});

			mockLogger.success.mockImplementation(() => {
				callOrder.push('logger.success');
			});

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			expect(callOrder).toEqual([
				'checkFolderExistence',
				'loadFilesFromFolder',
				'logger.start',
				'readLinesFromFile',
				'logger.success',
				'writeFile',
			]);
		});

		it('should preserve original data structure integrity', async () => {
			const brand = 'escapp';
			const originalData = JSON.parse(JSON.stringify(mockJsonDataComplexNested));
			mockCheckFolderExistence.mockReturnValue(true);
			mockLoadFilesFromFolder.mockResolvedValue([mockJsonFilePath]);
			setupJsonFileMock(mockJsonFilePath, JSON.parse(JSON.stringify(mockJsonDataComplexNested)));

			await runRemTypoUnitConversions(brand, DesignSystemNames.a1);

			const writtenData = mockWriteJsonFile.mock.calls[0][1] as Record<string, unknown>;
			expect(Object.keys(writtenData)).toEqual(Object.keys(originalData));
			expect(Object.keys((writtenData['tokens'] as Record<string, unknown>)['colors'] as Record<string, unknown>)).toEqual(
				Object.keys((originalData['tokens'] as Record<string, unknown>)['colors'] as Record<string, unknown>),
			);
		});
	});
});
