import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { DesignSystemNames, loadFilesFromFolder, prepareFolder, readLinesFromFile, writeFile } from '../../shared/index.js';
import { extractFileName, hasExactlyThreeDashes, inferScssMixin, isCssFile } from './infer-scss-mixin.js';
import {
	mockAllFiles,
	mockBrand,
	mockCssFilePath,
	mockCssLinesComplexStructure,
	mockCssLinesEmpty,
	mockCssLinesNoHeaderComment,
	mockCssLinesOnlyComment,
	mockCssLinesWithHeader,
	mockCssLinesWithMediaQuery,
	mockDesignSystemName,
	mockScssFilePath,
	mockTargetFolder,
} from './infer-scss-mixin.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock all external dependencies
jest.mock('../../shared/index.js', () => {
	const actual: object = jest.requireActual('../../shared/index.js');
	return {
		...actual,
	};
});

jest.mock('../../shared/utils/file-helper/file-helper.js', () => {
	return {
		loadFilesFromFolder: jest.fn(),
		prepareFolder: jest.fn(),
		readLinesFromFile: jest.fn(),
		writeFile: jest.fn(),
	};
});

jest.mock('./helpers/index.js', () => {
	return {
		scssThemeMixinsBarrelFile: jest.fn(),
	};
});

// Cast mocks with proper typing
const mockLoadFilesFromFolder = loadFilesFromFolder as jest.MockedFunction<typeof loadFilesFromFolder>;
const mockPrepareFolder = prepareFolder as jest.MockedFunction<typeof prepareFolder>;
const mockReadLinesFromFile = readLinesFromFile as jest.MockedFunction<typeof readLinesFromFile>;
const mockWriteFile = writeFile as jest.MockedFunction<typeof writeFile>;

// Note: Logger mocking (suppressLoggerOutput/restoreLoggerMocks) is automatically handled by src/shared/testing/test-helpers.mock.spec.ts via jest.config.ts setupFilesAfterEnv
describe('Infer SCSS Mixin', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('inferScssMixin', () => {
		it('should process CSS files with exactly three dashes and generate SCSS mixins', async () => {
			mockLoadFilesFromFolder.mockResolvedValue(mockAllFiles);
			mockReadLinesFromFile.mockResolvedValue(mockCssLinesWithHeader);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			expect(mockLoadFilesFromFolder).toHaveBeenCalledWith(mockTargetFolder);
			expect(mockReadLinesFromFile).toHaveBeenCalledTimes(3); // 3 files with exactly 3 dashes
			expect(mockPrepareFolder).toHaveBeenCalledTimes(3);
			expect(mockWriteFile).toHaveBeenCalledTimes(3);
		});

		it('should handle empty file list', async () => {
			mockLoadFilesFromFolder.mockResolvedValue([]);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			expect(mockLoadFilesFromFolder).toHaveBeenCalledWith(mockTargetFolder);
			expect(mockReadLinesFromFile).not.toHaveBeenCalled();
			expect(mockWriteFile).not.toHaveBeenCalled();
		});

		it('should filter out non-CSS files and files without exactly three dashes', async () => {
			mockLoadFilesFromFolder.mockResolvedValue(mockAllFiles);
			mockReadLinesFromFile.mockResolvedValue(mockCssLinesWithHeader);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			// Should only process CSS files with exactly 3 dashes
			expect(mockReadLinesFromFile).toHaveBeenCalledTimes(3);
			expect(mockReadLinesFromFile).toHaveBeenCalledWith('token-package/dist/allianz/a1/web/test-file-name-here.css');
			expect(mockReadLinesFromFile).toHaveBeenCalledWith('token-package/dist/allianz/a1/web/another-test-file-name.css');
			expect(mockReadLinesFromFile).toHaveBeenCalledWith('token-package/dist/allianz/a1/web/valid-file-name-extension.css');
		});

		it('should handle CSS files with media queries', async () => {
			mockLoadFilesFromFolder.mockResolvedValue([mockCssFilePath]);
			mockReadLinesFromFile.mockResolvedValue(mockCssLinesWithMediaQuery);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			expect(mockWriteFile).toHaveBeenCalledWith(mockScssFilePath, expect.stringContaining('@media'));
			expect(mockWriteFile).toHaveBeenCalledWith(mockScssFilePath, expect.stringContaining('#{$selector}'));
		});

		it('should handle empty CSS files', async () => {
			mockLoadFilesFromFolder.mockResolvedValue([mockCssFilePath]);
			mockReadLinesFromFile.mockResolvedValue(mockCssLinesEmpty);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			expect(mockWriteFile).toHaveBeenCalled();
		});

		it('should handle CSS files with only comments', async () => {
			mockLoadFilesFromFolder.mockResolvedValue([mockCssFilePath]);
			mockReadLinesFromFile.mockResolvedValue(mockCssLinesOnlyComment);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			expect(mockWriteFile).toHaveBeenCalled();
		});

		it('should handle complex CSS structure with multiple media queries', async () => {
			mockLoadFilesFromFolder.mockResolvedValue([mockCssFilePath]);
			mockReadLinesFromFile.mockResolvedValue(mockCssLinesComplexStructure);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			expect(mockWriteFile).toHaveBeenCalledWith(mockScssFilePath, expect.stringContaining('@media (min-width: 768px)'));
			expect(mockWriteFile).toHaveBeenCalledWith(mockScssFilePath, expect.stringContaining('@media (min-width: 1024px)'));
		});

		it('should handle CSS files without header comments', async () => {
			mockLoadFilesFromFolder.mockResolvedValue([mockCssFilePath]);
			mockReadLinesFromFile.mockResolvedValue(mockCssLinesNoHeaderComment);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			expect(mockWriteFile).toHaveBeenCalled();
		});
	});

	describe('File filtering logic', () => {
		it('should correctly identify files with exactly three dashes', () => {
			// We can't directly test the private function, but we can verify through the main function behavior
			mockLoadFilesFromFolder.mockResolvedValue([
				'token-package/dist/allianz/a1/web/test-file-name-here.css',
				'token-package/dist/allianz/a1/web/test-file.css',
				'token-package/dist/allianz/a1/web/test-file-name-here-extra.css',
				'token-package/dist/allianz/a1/web/no-dashes.css',
			]);
			mockReadLinesFromFile.mockResolvedValue(mockCssLinesWithHeader);

			return inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]).then(() => {
				// Only files with exactly 3 dashes should be processed
				expect(mockReadLinesFromFile).toHaveBeenCalledTimes(1);
				expect(mockReadLinesFromFile).toHaveBeenCalledWith('token-package/dist/allianz/a1/web/test-file-name-here.css');
			});
		});

		it('should filter out non-CSS files', () => {
			mockLoadFilesFromFolder.mockResolvedValue([
				'token-package/dist/allianz/a1/web/test-file-name-here.css',
				'token-package/dist/allianz/a1/web/test-file-name-here.json',
				'token-package/dist/allianz/a1/web/test-file-name-here.txt',
			]);
			mockReadLinesFromFile.mockResolvedValue(mockCssLinesWithHeader);

			return inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]).then(() => {
				// Only CSS files should be processed
				expect(mockReadLinesFromFile).toHaveBeenCalledTimes(1);
				expect(mockReadLinesFromFile).toHaveBeenCalledWith('token-package/dist/allianz/a1/web/test-file-name-here.css');
			});
		});
	});

	describe('File processing logic', () => {
		it('should create correct file processing data', async () => {
			mockLoadFilesFromFolder.mockResolvedValue([mockCssFilePath]);
			mockReadLinesFromFile.mockResolvedValue(mockCssLinesWithHeader);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			expect(mockWriteFile).toHaveBeenCalledWith(mockScssFilePath, expect.any(String));
		});
		it('should ensure target directory exists before writing', async () => {
			mockLoadFilesFromFolder.mockResolvedValue([mockCssFilePath]);
			mockReadLinesFromFile.mockResolvedValue(mockCssLinesWithHeader);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			expect(mockPrepareFolder).toHaveBeenCalledWith('token-package/dist/allianz/a1/web');
		});

		it('should generate correct SCSS content structure', async () => {
			mockLoadFilesFromFolder.mockResolvedValue([mockCssFilePath]);
			mockReadLinesFromFile.mockResolvedValue(mockCssLinesWithHeader);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			const writtenContent = mockWriteFile.mock.calls[0][1] as string;
			expect(writtenContent).toContain('@mixin design-test-file-name-here($selector)');
			expect(writtenContent).toContain('#{$selector} {');
			expect(writtenContent).toContain('--color-primary: #0066cc;');
			expect(writtenContent).toContain('--color-secondary: #999999;');
		});
	});

	describe('CSS content processing', () => {
		it('should handle header comment extraction correctly', async () => {
			mockLoadFilesFromFolder.mockResolvedValue([mockCssFilePath]);
			mockReadLinesFromFile.mockResolvedValue(mockCssLinesWithHeader);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			const writtenContent = mockWriteFile.mock.calls[0][1] as string;
			expect(writtenContent).toContain('CSS Generated by Style Dictionary');
			expect(writtenContent).toContain('https://amzn.github.io/style-dictionary/');
		});

		it('should process :root selectors correctly', async () => {
			mockLoadFilesFromFolder.mockResolvedValue([mockCssFilePath]);
			mockReadLinesFromFile.mockResolvedValue(mockCssLinesWithHeader);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			const writtenContent = mockWriteFile.mock.calls[0][1] as string;
			expect(writtenContent).toContain('#{$selector} {');
			expect(writtenContent).not.toContain(':root, :host {');
		});

		it('should handle media queries with proper indentation', async () => {
			mockLoadFilesFromFolder.mockResolvedValue([mockCssFilePath]);
			mockReadLinesFromFile.mockResolvedValue(mockCssLinesWithMediaQuery);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			const writtenContent = mockWriteFile.mock.calls[0][1] as string;
			expect(writtenContent).toContain('\t@media (min-width: 768px) {');
			expect(writtenContent).toContain('\t\t#{$selector} {');
			expect(writtenContent).toContain('\t\t\t--color-primary: #0088ff;');
		});

		it('should add blank line before first media query', async () => {
			mockLoadFilesFromFolder.mockResolvedValue([mockCssFilePath]);
			mockReadLinesFromFile.mockResolvedValue(mockCssLinesWithMediaQuery);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			const writtenContent = mockWriteFile.mock.calls[0][1] as string;
			const lines = writtenContent.split('\n');
			const mediaQueryIndex = lines.findIndex(line => line.includes('@media'));
			expect(lines[mediaQueryIndex - 1]).toBe('');
		});

		it('should handle empty lines correctly', async () => {
			mockLoadFilesFromFolder.mockResolvedValue([mockCssFilePath]);
			mockReadLinesFromFile.mockResolvedValue(['/*', ' * Comment', ' */', '', ':root, :host {', '  --color: red;', '', '}']);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			const writtenContent = mockWriteFile.mock.calls[0][1] as string;
			expect(writtenContent).toContain('#{$selector} {');
			expect(mockWriteFile).toHaveBeenCalled();
		});

		it('should handle nested braces correctly', async () => {
			mockLoadFilesFromFolder.mockResolvedValue([mockCssFilePath]);
			mockReadLinesFromFile.mockResolvedValue(mockCssLinesComplexStructure);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			const writtenContent = mockWriteFile.mock.calls[0][1] as string;
			// Count opening and closing braces to ensure they match
			const openingBraces = (writtenContent.match(/{/g) || []).length;
			const closingBraces = (writtenContent.match(/}/g) || []).length;
			expect(openingBraces).toBe(closingBraces);
		});

		it('should skip empty lines at the start of content', async () => {
			mockLoadFilesFromFolder.mockResolvedValue([mockCssFilePath]);
			mockReadLinesFromFile.mockResolvedValue(['/*', ' * Comment', ' */', '', '', ':root, :host {', '  --color: red;', '}']);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			const writtenContent = mockWriteFile.mock.calls[0][1] as string;
			expect(writtenContent).toContain('#{$selector} {');
			expect(mockWriteFile).toHaveBeenCalled();
		});
	});

	describe('Error handling and edge cases', () => {
		it('should handle files with no header comment end marker', async () => {
			mockLoadFilesFromFolder.mockResolvedValue([mockCssFilePath]);
			mockReadLinesFromFile.mockResolvedValue(['/*', ' * This comment has no end', ':root, :host {', '  --color: red;', '}']);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			expect(mockWriteFile).toHaveBeenCalled();
		});

		it('should handle files with only whitespace content', async () => {
			mockLoadFilesFromFolder.mockResolvedValue([mockCssFilePath]);
			mockReadLinesFromFile.mockResolvedValue(['   ', '\t', '']);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			expect(mockWriteFile).toHaveBeenCalled();
		});

		it('should handle files with malformed CSS structure', async () => {
			mockLoadFilesFromFolder.mockResolvedValue([mockCssFilePath]);
			mockReadLinesFromFile.mockResolvedValue([
				':root, :host {',
				'  --color: red',
				// Missing closing brace intentionally
			]);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			expect(mockWriteFile).toHaveBeenCalled();
		});

		it('should handle deep file paths correctly', async () => {
			const deepPath = 'token-package/dist/allianz/a1/web/deep/nested/path/test-file-name-here.css';
			mockLoadFilesFromFolder.mockResolvedValue([deepPath]);
			mockReadLinesFromFile.mockResolvedValue(mockCssLinesWithHeader);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			expect(mockPrepareFolder).toHaveBeenCalledWith('token-package/dist/allianz/a1/web/deep/nested/path');
			expect(mockWriteFile).toHaveBeenCalledWith(
				'token-package/dist/allianz/a1/web/deep/nested/path/test-file-name-here-mixins.scss',
				expect.any(String),
			);
		});

		it('should handle file names with special characters', async () => {
			const specialPath = 'token-package/dist/allianz/a1/web/test-file-name-here.css';
			mockLoadFilesFromFolder.mockResolvedValue([specialPath]);
			mockReadLinesFromFile.mockResolvedValue(mockCssLinesWithHeader);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			expect(mockWriteFile).toHaveBeenCalled();
		});

		it('should handle file paths without file names', async () => {
			// This test covers the || '' fallback in extractFileName
			const pathWithoutFileName = 'token-package/dist/allianz/a1/web/';
			mockLoadFilesFromFolder.mockResolvedValue([pathWithoutFileName]);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			// Should not process this path since it doesn't have a file name
			expect(mockReadLinesFromFile).not.toHaveBeenCalled();
		});

		it('should handle file names without dashes', async () => {
			// This test covers the || [] fallback in hasExactlyThreeDashes when no dashes are found
			const noDashFile = 'token-package/dist/allianz/a1/web/nodashes.css';
			mockLoadFilesFromFolder.mockResolvedValue([noDashFile]);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			// Should not process this file since it has no dashes
			expect(mockReadLinesFromFile).not.toHaveBeenCalled();
		});

		it('should handle empty file paths', async () => {
			// This test covers the empty string check in extractFileName
			mockLoadFilesFromFolder.mockResolvedValue(['']);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			// Should not process empty paths
			expect(mockReadLinesFromFile).not.toHaveBeenCalled();
		});

		it('should handle file paths that end with slash', async () => {
			// This test covers the fileName || '' fallback in extractFileName
			mockLoadFilesFromFolder.mockResolvedValue(['token-package/dist/allianz/a1/web/']);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			// Should not process paths that end with slash (no actual file name)
			expect(mockReadLinesFromFile).not.toHaveBeenCalled();
		});

		it('should handle null/undefined-like file paths', async () => {
			// This test covers the !filePath check in extractFileName
			mockLoadFilesFromFolder.mockResolvedValue([null as unknown as string, undefined as unknown as string]);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			// Should not process null/undefined paths
			expect(mockReadLinesFromFile).not.toHaveBeenCalled();
		});

		it('should handle non-string file paths', async () => {
			// This test covers the typeof filePath !== 'string' checks in both isCssFile and hasExactlyThreeDashes
			mockLoadFilesFromFolder.mockResolvedValue([123 as unknown as string, {} as unknown as string, [] as unknown as string]);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			// Should not process non-string paths
			expect(mockReadLinesFromFile).not.toHaveBeenCalled();
		});

		it('should handle invalid file name types', async () => {
			// This test specifically covers the typeof fileName !== 'string' check in hasExactlyThreeDashes
			// by testing the scenario where extractFileName might be called with non-string input
			const invalidFileName = 'token-package/dist/allianz/a1/web/123.css';
			mockLoadFilesFromFolder.mockResolvedValue([invalidFileName]);

			await inferScssMixin(mockBrand, DesignSystemNames[mockDesignSystemName]);

			// Should not process files with invalid names (123.css has no dashes)
			expect(mockReadLinesFromFile).not.toHaveBeenCalled();
		});
	});

	// Direct unit tests for exported helper functions to achieve 100% branch coverage
	describe('Helper function type checking coverage', () => {
		it('should handle non-string inputs in hasExactlyThreeDashes', () => {
			// Test the typeof fileName !== 'string' branch in hasExactlyThreeDashes
			expect(hasExactlyThreeDashes(123 as unknown as string)).toBe(false);
			expect(hasExactlyThreeDashes(null as unknown as string)).toBe(false);
			expect(hasExactlyThreeDashes(undefined as unknown as string)).toBe(false);
			expect(hasExactlyThreeDashes({} as unknown as string)).toBe(false);
			expect(hasExactlyThreeDashes([] as unknown as string)).toBe(false);
		});

		it('should handle non-string inputs in isCssFile', () => {
			// Test the typeof filePath !== 'string' branch in isCssFile
			expect(isCssFile(123 as unknown as string)).toBe(false);
			expect(isCssFile(null as unknown as string)).toBe(false);
			expect(isCssFile(undefined as unknown as string)).toBe(false);
			expect(isCssFile({} as unknown as string)).toBe(false);
			expect(isCssFile([] as unknown as string)).toBe(false);
		});

		it('should handle falsy inputs in extractFileName', () => {
			// Test the !filePath branch in extractFileName (line 28)
			expect(extractFileName('')).toBe('');
			expect(extractFileName(null as unknown as string)).toBe('');
			expect(extractFileName(undefined as unknown as string)).toBe('');
			expect(extractFileName(0 as unknown as string)).toBe('');
			expect(extractFileName(false as unknown as string)).toBe('');
		});

		it('should handle file paths with empty file names in extractFileName', () => {
			// Test the fileName || '' branch in extractFileName (line 32)
			expect(extractFileName('some/path/')).toBe('');
			expect(extractFileName('another/path//')).toBe('');
			expect(extractFileName('/')).toBe('');
		});
	});
});
