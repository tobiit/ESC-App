import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { loadFilesFromFolder, readFile, writeFile } from '../../../../shared/index.js';
import { scssThemeMixinsBarrelFile } from './scss-theme-mixins-barrel-file.js';
import {
	mockAllOutputFiles,
	mockEmptyFileList,
	mockExpectedBarrelFileContent,
	mockExpectedBarrelFilePath,
	mockFilesWithoutMixins,
	mockGeneralDesignTokenMixinContent,
	mockScssMixinFiles,
	mockTargetFolder,
} from './scss-theme-mixins-barrel-file.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

jest.mock('../../../../shared/index.js', () => {
	const actual: object = jest.requireActual('../../../../shared/index.js');
	return {
		...actual,
		loadFilesFromFolder: jest.fn(),
		readFile: jest.fn(),
		writeFile: jest.fn(),
	};
});

const mockLoadFilesFromFolder = loadFilesFromFolder as jest.MockedFunction<typeof loadFilesFromFolder>;
const mockReadFile = readFile as jest.MockedFunction<typeof readFile>;
const mockWriteFile = writeFile as jest.MockedFunction<typeof writeFile>;

describe('scssThemeMixinsBarrelFile', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('Basic functionality', () => {
		it('should filter SCSS mixin files from all output files', async () => {
			mockLoadFilesFromFolder.mockResolvedValue(mockAllOutputFiles);
			mockReadFile.mockReturnValue(mockGeneralDesignTokenMixinContent);

			await scssThemeMixinsBarrelFile(mockTargetFolder);

			expect(mockLoadFilesFromFolder).toHaveBeenCalledWith(mockTargetFolder);
			expect(mockLoadFilesFromFolder).toHaveBeenCalledTimes(1);
		});

		it('should create barrel file with correct imports for each mixin file', async () => {
			mockLoadFilesFromFolder.mockResolvedValue(mockAllOutputFiles);
			mockReadFile.mockReturnValue(mockGeneralDesignTokenMixinContent);

			await scssThemeMixinsBarrelFile(mockTargetFolder);

			expect(mockWriteFile).toHaveBeenCalledTimes(1);
			expect(mockWriteFile).toHaveBeenCalledWith(mockExpectedBarrelFilePath, mockExpectedBarrelFileContent);
		});

		it('should generate correct import paths by removing target folder and file extension', async () => {
			mockLoadFilesFromFolder.mockResolvedValue(mockScssMixinFiles);
			mockReadFile.mockReturnValue(mockGeneralDesignTokenMixinContent);

			await scssThemeMixinsBarrelFile(mockTargetFolder);

			const writtenContent = mockWriteFile.mock.calls[0][1] as string;
			// eslint-disable-next-line @stylistic/ts/quotes
			expect(writtenContent).toContain("@use './tokens-light-minimal-spacious-mixins' as *;");
			// eslint-disable-next-line @stylistic/ts/quotes
			expect(writtenContent).toContain("@use './tokens-light-minimal-dense-mixins' as *;");
			// eslint-disable-next-line @stylistic/ts/quotes
			expect(writtenContent).toContain("@use './tokens-dark-lively-compact-mixins' as *;");
		});

		it('should append general design token mixin content to barrel file', async () => {
			mockLoadFilesFromFolder.mockResolvedValue(mockScssMixinFiles);
			mockReadFile.mockReturnValue(mockGeneralDesignTokenMixinContent);

			await scssThemeMixinsBarrelFile(mockTargetFolder);

			expect(mockReadFile).toHaveBeenCalledWith('token-package/src/tokens-theme-mixins-index.scss');
			const writtenContent = mockWriteFile.mock.calls[0][1] as string;
			expect(writtenContent).toContain(mockGeneralDesignTokenMixinContent);
		});

		it('should add blank line before general design token mixin', async () => {
			mockLoadFilesFromFolder.mockResolvedValue(mockScssMixinFiles);
			mockReadFile.mockReturnValue(mockGeneralDesignTokenMixinContent);

			await scssThemeMixinsBarrelFile(mockTargetFolder);

			const writtenContent = mockWriteFile.mock.calls[0][1] as string;
			const lines = writtenContent.split('\n');
			const generalMixinStartLine = lines.findIndex(line => line.includes('@use'));
			const lastImportLine = lines.slice(generalMixinStartLine).findIndex(line => !line.includes('@use'));

			expect(lines[generalMixinStartLine + lastImportLine]).toBe('');
		});
	});

	describe('Edge cases', () => {
		it('should handle empty file list', async () => {
			mockLoadFilesFromFolder.mockResolvedValue(mockEmptyFileList);
			mockReadFile.mockReturnValue(mockGeneralDesignTokenMixinContent);

			await scssThemeMixinsBarrelFile(mockTargetFolder);

			const writtenContent = mockWriteFile.mock.calls[0][1] as string;
			expect(writtenContent).toContain(mockGeneralDesignTokenMixinContent);
			// eslint-disable-next-line @stylistic/ts/quotes
			const barrelFileImports = writtenContent.split('\n').filter(line => line.trim().startsWith("@use './"));
			expect(barrelFileImports).toHaveLength(0);
		});

		it('should handle files without mixin files', async () => {
			mockLoadFilesFromFolder.mockResolvedValue(mockFilesWithoutMixins);
			mockReadFile.mockReturnValue(mockGeneralDesignTokenMixinContent);

			await scssThemeMixinsBarrelFile(mockTargetFolder);

			const writtenContent = mockWriteFile.mock.calls[0][1] as string;
			// eslint-disable-next-line @stylistic/ts/quotes
			const barrelFileImports = writtenContent.split('\n').filter(line => line.trim().startsWith("@use './"));
			expect(barrelFileImports).toHaveLength(0);
			expect(writtenContent).toContain(mockGeneralDesignTokenMixinContent);
		});

		it('should handle single mixin file', async () => {
			const singleMixinFile = [mockScssMixinFiles[0]];
			mockLoadFilesFromFolder.mockResolvedValue(singleMixinFile);
			mockReadFile.mockReturnValue(mockGeneralDesignTokenMixinContent);

			await scssThemeMixinsBarrelFile(mockTargetFolder);

			const writtenContent = mockWriteFile.mock.calls[0][1] as string;
			// eslint-disable-next-line @stylistic/ts/quotes
			expect(writtenContent).toContain("@use './tokens-light-minimal-spacious-mixins' as *;");
			// eslint-disable-next-line @stylistic/ts/quotes
			const barrelFileImports = writtenContent.split('\n').filter(line => line.trim().startsWith("@use './"));
			expect(barrelFileImports).toHaveLength(1);
		});

		it('should handle nested folder structure in file paths', async () => {
			const nestedMixinFiles = [
				`${mockTargetFolder}/subfolder/nested/tokens-nested-theme-mixins.scss`,
				`${mockTargetFolder}/other/tokens-other-theme-mixins.scss`,
			];
			mockLoadFilesFromFolder.mockResolvedValue(nestedMixinFiles);
			mockReadFile.mockReturnValue(mockGeneralDesignTokenMixinContent);

			await scssThemeMixinsBarrelFile(mockTargetFolder);

			const writtenContent = mockWriteFile.mock.calls[0][1] as string;
			// eslint-disable-next-line @stylistic/ts/quotes
			expect(writtenContent).toContain("@use './subfolder/nested/tokens-nested-theme-mixins' as *;");
			// eslint-disable-next-line @stylistic/ts/quotes
			expect(writtenContent).toContain("@use './other/tokens-other-theme-mixins' as *;");
		});

		it('should handle files with different naming patterns ending with -mixins.scss', async () => {
			const differentNamedFiles = [`${mockTargetFolder}/custom-file-name-mixins.scss`, `${mockTargetFolder}/another-custom-mixins.scss`];
			mockLoadFilesFromFolder.mockResolvedValue(differentNamedFiles);
			mockReadFile.mockReturnValue(mockGeneralDesignTokenMixinContent);

			await scssThemeMixinsBarrelFile(mockTargetFolder);

			const writtenContent = mockWriteFile.mock.calls[0][1] as string;
			// eslint-disable-next-line @stylistic/ts/quotes
			expect(writtenContent).toContain("@use './custom-file-name-mixins' as *;");
			// eslint-disable-next-line @stylistic/ts/quotes
			expect(writtenContent).toContain("@use './another-custom-mixins' as *;");
		});

		it('should preserve order of mixin files in barrel file', async () => {
			mockLoadFilesFromFolder.mockResolvedValue(mockScssMixinFiles);
			mockReadFile.mockReturnValue(mockGeneralDesignTokenMixinContent);

			await scssThemeMixinsBarrelFile(mockTargetFolder);

			const writtenContent = mockWriteFile.mock.calls[0][1] as string;
			const lines = writtenContent.split('\n');
			const importLines = lines.filter(line => line.includes('@use'));

			expect(importLines[0]).toContain('tokens-light-minimal-spacious-mixins');
			expect(importLines[1]).toContain('tokens-light-minimal-dense-mixins');
			expect(importLines[2]).toContain('tokens-dark-lively-compact-mixins');
		});

		it('should handle empty general design token mixin content', async () => {
			mockLoadFilesFromFolder.mockResolvedValue(mockScssMixinFiles);
			mockReadFile.mockReturnValue('');

			await scssThemeMixinsBarrelFile(mockTargetFolder);

			const writtenContent = mockWriteFile.mock.calls[0][1] as string;
			// eslint-disable-next-line @stylistic/ts/quotes
			expect(writtenContent).toContain("@use './tokens-light-minimal-spacious-mixins' as *;");
			expect(writtenContent.split('\n').pop()).toBe('');
		});

		it('should handle general design token mixin content with multiple lines', async () => {
			const multiLineContent = `@mixin test() {\n\tcolor: red;\n\tfont-size: 16px;\n}`;
			mockLoadFilesFromFolder.mockResolvedValue(mockScssMixinFiles);
			mockReadFile.mockReturnValue(multiLineContent);

			await scssThemeMixinsBarrelFile(mockTargetFolder);

			const writtenContent = mockWriteFile.mock.calls[0][1] as string;
			expect(writtenContent).toContain(multiLineContent);
		});
	});

	describe('File filtering', () => {
		it('should only include files ending with -mixins.scss', async () => {
			const mixedFiles = [
				...mockScssMixinFiles,
				`${mockTargetFolder}/tokens-light-minimal.scss`,
				`${mockTargetFolder}/tokens-mixin-test.scss`,
				`${mockTargetFolder}/tokens-not-a-mixin.scss`,
			];
			mockLoadFilesFromFolder.mockResolvedValue(mixedFiles);
			mockReadFile.mockReturnValue(mockGeneralDesignTokenMixinContent);

			await scssThemeMixinsBarrelFile(mockTargetFolder);

			const writtenContent = mockWriteFile.mock.calls[0][1] as string;
			// eslint-disable-next-line @stylistic/ts/quotes
			const barrelFileImports = writtenContent.split('\n').filter(line => line.trim().startsWith("@use './"));
			expect(barrelFileImports).toHaveLength(3);
			// eslint-disable-next-line @stylistic/ts/quotes
			expect(writtenContent).not.toContain("tokens-light-minimal' as");
			// eslint-disable-next-line @stylistic/ts/quotes
			expect(writtenContent).not.toContain("tokens-mixin-test' as");
			// eslint-disable-next-line @stylistic/ts/quotes
			expect(writtenContent).not.toContain("tokens-not-a-mixin' as");
		});

		it('should exclude files not ending with .scss extension', async () => {
			const mixedExtensions = [
				...mockScssMixinFiles,
				`${mockTargetFolder}/tokens-theme-mixins.css`,
				`${mockTargetFolder}/tokens-theme-mixins.txt`,
			];
			mockLoadFilesFromFolder.mockResolvedValue(mixedExtensions);
			mockReadFile.mockReturnValue(mockGeneralDesignTokenMixinContent);

			await scssThemeMixinsBarrelFile(mockTargetFolder);

			const writtenContent = mockWriteFile.mock.calls[0][1] as string;
			// eslint-disable-next-line @stylistic/ts/quotes
			const barrelFileImports = writtenContent.split('\n').filter(line => line.trim().startsWith("@use './"));
			expect(barrelFileImports).toHaveLength(3);
		});

		it('should handle files with -mixins in the middle of the name but not at the end', async () => {
			const mixinMiddleFiles = [`${mockTargetFolder}/tokens-mixins-something-else.scss`, `${mockTargetFolder}/mixins-tokens.scss`];
			mockLoadFilesFromFolder.mockResolvedValue([...mockScssMixinFiles, ...mixinMiddleFiles]);
			mockReadFile.mockReturnValue(mockGeneralDesignTokenMixinContent);

			await scssThemeMixinsBarrelFile(mockTargetFolder);

			const writtenContent = mockWriteFile.mock.calls[0][1] as string;
			// eslint-disable-next-line @stylistic/ts/quotes
			const barrelFileImports = writtenContent.split('\n').filter(line => line.trim().startsWith("@use './"));
			expect(barrelFileImports).toHaveLength(3);
			expect(writtenContent).not.toContain('mixins-something-else');
			expect(writtenContent).not.toContain('mixins-tokens');
		});
	});

	describe('Path transformation', () => {
		it('should correctly transform absolute paths to relative paths', async () => {
			mockLoadFilesFromFolder.mockResolvedValue(mockScssMixinFiles);
			mockReadFile.mockReturnValue(mockGeneralDesignTokenMixinContent);

			await scssThemeMixinsBarrelFile(mockTargetFolder);

			const writtenContent = mockWriteFile.mock.calls[0][1] as string;
			mockScssMixinFiles.forEach(filePath => {
				const relativePath = filePath.replace(mockTargetFolder, '').replace('.scss', '');
				expect(writtenContent).toContain(`@use '.${relativePath}' as *;`);
			});
		});

		it('should remove .scss extension from import paths', async () => {
			mockLoadFilesFromFolder.mockResolvedValue(mockScssMixinFiles);
			mockReadFile.mockReturnValue(mockGeneralDesignTokenMixinContent);

			await scssThemeMixinsBarrelFile(mockTargetFolder);

			const writtenContent = mockWriteFile.mock.calls[0][1] as string;
			// eslint-disable-next-line @stylistic/ts/quotes
			expect(writtenContent).not.toContain(".scss' as *;");
			// eslint-disable-next-line @stylistic/ts/quotes
			expect(writtenContent).toContain("-mixins' as *;");
		});

		it('should handle target folder paths with trailing slash', async () => {
			const targetFolderWithSlash = `${mockTargetFolder}/`;
			mockLoadFilesFromFolder.mockResolvedValue(mockScssMixinFiles);
			mockReadFile.mockReturnValue(mockGeneralDesignTokenMixinContent);

			await scssThemeMixinsBarrelFile(targetFolderWithSlash);

			expect(mockLoadFilesFromFolder).toHaveBeenCalledWith(targetFolderWithSlash);
			expect(mockWriteFile).toHaveBeenCalled();
		});

		it('should handle target folder paths without trailing slash', async () => {
			mockLoadFilesFromFolder.mockResolvedValue(mockScssMixinFiles);
			mockReadFile.mockReturnValue(mockGeneralDesignTokenMixinContent);

			await scssThemeMixinsBarrelFile(mockTargetFolder);

			expect(mockLoadFilesFromFolder).toHaveBeenCalledWith(mockTargetFolder);
			expect(mockWriteFile).toHaveBeenCalledWith(`${mockTargetFolder}/tokens-theme-mixins-index.scss`, expect.any(String));
		});
	});

	describe('Output file generation', () => {
		it('should write barrel file to correct location', async () => {
			mockLoadFilesFromFolder.mockResolvedValue(mockScssMixinFiles);
			mockReadFile.mockReturnValue(mockGeneralDesignTokenMixinContent);

			await scssThemeMixinsBarrelFile(mockTargetFolder);

			expect(mockWriteFile).toHaveBeenCalledWith(`${mockTargetFolder}/tokens-theme-mixins-index.scss`, expect.any(String));
		});

		it('should generate barrel file with correct file name format', async () => {
			mockLoadFilesFromFolder.mockResolvedValue(mockScssMixinFiles);
			mockReadFile.mockReturnValue(mockGeneralDesignTokenMixinContent);

			await scssThemeMixinsBarrelFile(mockTargetFolder);

			const [targetPath] = mockWriteFile.mock.calls[0];
			expect(targetPath).toMatch(/tokens-theme-mixins-index\.scss$/);
		});

		it('should ensure barrel file content structure is correct', async () => {
			mockLoadFilesFromFolder.mockResolvedValue(mockScssMixinFiles);
			mockReadFile.mockReturnValue(mockGeneralDesignTokenMixinContent);

			await scssThemeMixinsBarrelFile(mockTargetFolder);

			const writtenContent = mockWriteFile.mock.calls[0][1] as string;
			const lines = writtenContent.split('\n');

			const importSectionEndIndex = lines.findIndex(line => line === '');
			expect(importSectionEndIndex).toBeGreaterThan(0);

			const importsSection = lines.slice(0, importSectionEndIndex);
			importsSection.forEach(line => {
				expect(line).toMatch(/^@use '.+' as \*;$/);
			});
		});
	});

	describe('Integration scenarios', () => {
		it('should handle complete workflow with multiple theme variations', async () => {
			const multipleThemeFiles = [
				`${mockTargetFolder}/tokens-light-minimal-spacious-mixins.scss`,
				`${mockTargetFolder}/tokens-light-minimal-dense-mixins.scss`,
				`${mockTargetFolder}/tokens-light-minimal-compact-mixins.scss`,
				`${mockTargetFolder}/tokens-dark-minimal-spacious-mixins.scss`,
				`${mockTargetFolder}/tokens-dark-minimal-dense-mixins.scss`,
				`${mockTargetFolder}/tokens-dark-minimal-compact-mixins.scss`,
			];
			mockLoadFilesFromFolder.mockResolvedValue(multipleThemeFiles);
			mockReadFile.mockReturnValue(mockGeneralDesignTokenMixinContent);

			await scssThemeMixinsBarrelFile(mockTargetFolder);

			const writtenContent = mockWriteFile.mock.calls[0][1] as string;
			// eslint-disable-next-line @stylistic/ts/quotes
			const barrelFileImports = writtenContent.split('\n').filter(line => line.trim().startsWith("@use './"));
			expect(barrelFileImports).toHaveLength(6);
			expect(mockWriteFile).toHaveBeenCalledTimes(1);
		});

		it('should correctly handle files from different brands', async () => {
			const differentBrandFolder = 'token-package/dist/ndbx/ndbx/web';
			const brandFiles = [
				`${differentBrandFolder}/tokens-brand-theme-mixins.scss`,
				`${differentBrandFolder}/tokens-brand-dark-mixins.scss`,
			];
			mockLoadFilesFromFolder.mockResolvedValue(brandFiles);
			mockReadFile.mockReturnValue(mockGeneralDesignTokenMixinContent);

			await scssThemeMixinsBarrelFile(differentBrandFolder);

			expect(mockWriteFile).toHaveBeenCalledWith(`${differentBrandFolder}/tokens-theme-mixins-index.scss`, expect.any(String));
		});
	});
});
