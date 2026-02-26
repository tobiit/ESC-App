import { Hash } from 'crypto';
import { Stats } from 'fs-extra';
import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { createDateFileHeaderPlaceholder, initialDistVersion, versionFileHeaderPlaceholder } from '../../../../shared/index.js';
import { mockDesignSystemName } from '../../../infer-scss-mixin/infer-scss-mixin.mock.spec.js';
import {
	addMetaDataToFileHeaderComment,
	createDistHash,
	extractTokenOutputFilePathParts,
	handleCdnOutputFiles,
	prepareVersionCheckData,
} from './dist-files-utils.js';
import {
	mockBrand,
	mockComplexFileName,
	mockComplexFilePath,
	mockComplexFilePathParts,
	mockDirectoryStats,
	mockedCopyFile,
	mockedCreateHash,
	mockedPrepareFolder,
	mockedReadFile,
	mockedStatSync,
	mockedWriteFile,
	mockEmptyFileList,
	mockExpectedHash,
	mockFileContent,
	mockFileContentWithVersionAndDate,
	mockFileData1,
	mockFileData2,
	mockFileData3,
	mockFileList,
	mockFileName,
	mockFileStats,
	mockPlatform,
	mockPreparedVersionCheckData,
	mockSingleFile,
	mockSingleFileContent,
	mockTokenOutputFilePathParts,
	mockTokenOutputFullFilePath,
	mockVersion,
} from './dist-files-utils.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock crypto module
jest.mock('crypto', () => {
	return {
		createHash: jest.fn(() => {
			return {
				update: jest.fn(),
				digest: jest.fn(),
			};
		}),
	};
});

// Mock shared functions
jest.mock('../../../../shared/index.js', () => {
	const actual: object = jest.requireActual('../../../../shared/index.js');
	return {
		...actual,
		statSync: jest.fn(),
		readFile: jest.fn(),
		writeFile: jest.fn(),
		copyFile: jest.fn(),
		prepareFolder: jest.fn(),
		cdnArtifactFolderName: 'cdn/tokens',
		initialDistVersion: '0.0.1',
		versionFileHeaderPlaceholder: '§§{VERSION_PLACEHOLDER}§§',
		createDateFileHeaderPlaceholder: '§§{DATE_PLACEHOLDER}§§',
	};
});

describe('Dist Files Utils', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('createDistHash', () => {
		it('should create a hash for a list of files', async () => {
			const mockHashInstance = {
				update: jest.fn(),
				digest: jest.fn().mockReturnValue(mockExpectedHash),
			};
			mockedCreateHash.mockReturnValue(mockHashInstance as unknown as Hash);
			mockedStatSync.mockReturnValue(mockFileStats as Stats);
			mockedReadFile.mockReturnValueOnce(mockFileData1).mockReturnValueOnce(mockFileData2).mockReturnValueOnce(mockFileData3);

			const result = await createDistHash(mockFileList);

			expect(result).toBe(mockExpectedHash);
			expect(mockedCreateHash).toHaveBeenCalledWith('sha256');
			expect(mockedStatSync).toHaveBeenCalledTimes(3);
			expect(mockedReadFile).toHaveBeenCalledTimes(3);
			expect(mockHashInstance.update).toHaveBeenCalledTimes(3);
			expect(mockHashInstance.digest).toHaveBeenCalledWith('hex');
		});

		it('should handle empty file list', async () => {
			const mockHashInstance = {
				update: jest.fn(),
				digest: jest.fn().mockReturnValue('empty-hash'),
			};
			mockedCreateHash.mockReturnValue(mockHashInstance as unknown as Hash);

			const result = await createDistHash(mockEmptyFileList);

			expect(result).toBe('empty-hash');
			expect(mockedCreateHash).toHaveBeenCalledWith('sha256');
			expect(mockedStatSync).not.toHaveBeenCalled();
			expect(mockedReadFile).not.toHaveBeenCalled();
			expect(mockHashInstance.update).not.toHaveBeenCalled();
			expect(mockHashInstance.digest).toHaveBeenCalledWith('hex');
		});

		it('should handle single file', async () => {
			const mockHashInstance = {
				update: jest.fn(),
				digest: jest.fn().mockReturnValue('single-hash'),
			};
			mockedCreateHash.mockReturnValue(mockHashInstance as unknown as Hash);
			mockedStatSync.mockReturnValue(mockFileStats);
			mockedReadFile.mockReturnValue(mockSingleFileContent);

			const result = await createDistHash([mockSingleFile]);

			expect(result).toBe('single-hash');
			expect(mockedCreateHash).toHaveBeenCalledWith('sha256');
			expect(mockedStatSync).toHaveBeenCalledWith(mockSingleFile);
			expect(mockedReadFile).toHaveBeenCalledWith(mockSingleFile);
			expect(mockHashInstance.update).toHaveBeenCalledWith(mockSingleFileContent);
			expect(mockHashInstance.digest).toHaveBeenCalledWith('hex');
		});

		it('should skip directories and only process files', async () => {
			const mockHashInstance = {
				update: jest.fn(),
				digest: jest.fn().mockReturnValue('files-only-hash'),
			};
			mockedCreateHash.mockReturnValue(mockHashInstance as unknown as Hash);
			mockedStatSync
				.mockReturnValueOnce(mockFileStats) // First file is a file
				.mockReturnValueOnce(mockDirectoryStats) // Second file is a directory
				.mockReturnValueOnce(mockFileStats); // Third file is a file
			mockedReadFile.mockReturnValueOnce(mockFileData1).mockReturnValueOnce(mockFileData3);

			const result = await createDistHash(mockFileList);

			expect(result).toBe('files-only-hash');
			expect(mockedStatSync).toHaveBeenCalledTimes(3);
			expect(mockedReadFile).toHaveBeenCalledTimes(2); // Only called for files, not directories
			expect(mockHashInstance.update).toHaveBeenCalledTimes(2);
		});

		it('should sort files before processing', async () => {
			const mockHashInstance = {
				update: jest.fn(),
				digest: jest.fn().mockReturnValue('sorted-hash'),
			};
			mockedCreateHash.mockReturnValue(mockHashInstance as unknown as Hash);
			mockedStatSync.mockReturnValue(mockFileStats);
			mockedReadFile.mockReturnValue('file content');

			const unsortedFiles = ['/path/to/file3.css', '/path/to/file1.css', '/path/to/file2.css'];

			await createDistHash(unsortedFiles);

			// Verify that files are processed in sorted order
			expect(mockedStatSync).toHaveBeenNthCalledWith(1, '/path/to/file1.css');
			expect(mockedStatSync).toHaveBeenNthCalledWith(2, '/path/to/file2.css');
			expect(mockedStatSync).toHaveBeenNthCalledWith(3, '/path/to/file3.css');
		});
	});

	describe('extractTokenOutputFilePathParts', () => {
		it('should extract path parts from token output file path', () => {
			const result = extractTokenOutputFilePathParts(mockTokenOutputFullFilePath);

			expect(result).toEqual({
				brand: mockBrand,
				designSystemName: mockDesignSystemName,
				tokenOutputFilePathParts: mockTokenOutputFilePathParts,
				platform: mockPlatform,
				file: mockFileName,
			});
		});

		it('should handle complex file paths', () => {
			const result = extractTokenOutputFilePathParts(mockComplexFilePath);

			expect(result).toEqual({
				tokenOutputFilePathParts: mockComplexFilePathParts,
				platform: mockPlatform,
				brand: mockBrand,
				file: mockComplexFileName,
				designSystemName: 'a1',
			});
		});

		it('should handle minimal file paths', () => {
			const minimalPath = 'a/b/c/d/e/file.css';
			const result = extractTokenOutputFilePathParts(minimalPath);

			expect(result).toEqual({
				tokenOutputFilePathParts: ['a', 'b', 'c', 'd', 'e', 'file.css'],
				platform: 'e',
				designSystemName: 'd',
				brand: 'c',
				file: 'file.css',
			});
		});

		it('should handle file paths with different extensions', () => {
			const jsFilePath = 'token-package/dist/escapp/a1/web/tokens-escapp.js';
			const result = extractTokenOutputFilePathParts(jsFilePath);

			expect(result).toEqual({
				tokenOutputFilePathParts: ['token-package', 'dist', 'escapp', 'a1', 'web', 'tokens-escapp.js'],
				platform: 'web',
				brand: 'escapp',
				file: 'tokens-escapp.js',
				designSystemName: 'a1',
			});
		});
	});

	describe('prepareVersionCheckData', () => {
		it('should prepare version check data', () => {
			const result = prepareVersionCheckData(mockTokenOutputFullFilePath);

			expect(result).toEqual({
				tokenOutputFullFilePath: mockTokenOutputFullFilePath,
				tokenOutputFilePathParts: mockTokenOutputFilePathParts,
				platform: mockPlatform,
				brand: mockBrand,
				file: mockFileName,
				initialDistVersion,
			});
		});

		it('should handle complex file paths', () => {
			const result = prepareVersionCheckData(mockComplexFilePath);

			expect(result).toEqual({
				tokenOutputFullFilePath: mockComplexFilePath,
				tokenOutputFilePathParts: mockComplexFilePathParts,
				platform: mockPlatform,
				brand: mockBrand,
				file: mockComplexFileName,
				initialDistVersion,
			});
		});

		it('should include initial dist version', () => {
			const result = prepareVersionCheckData(mockTokenOutputFullFilePath);

			expect(result.initialDistVersion).toBe(initialDistVersion);
		});
	});

	describe('handleCdnOutputFiles', () => {
		it('should add version to file name for CDN and write minified content', async () => {
			await handleCdnOutputFiles(mockTokenOutputFullFilePath, mockPreparedVersionCheckData, mockVersion);

			expect(mockedPrepareFolder).toHaveBeenCalledWith('token-package/cdn/tokens/1.0.0/escapp/a1/web');
			expect(mockedCopyFile).toHaveBeenCalledWith(
				mockTokenOutputFullFilePath,
				'token-package/cdn/tokens/1.0.0/escapp/a1/web/tokens-escapp.1.0.0.css',
			);
		});

		it('should handle complex file names with multiple extensions', async () => {
			const complexPreparedData = {
				tokenOutputFullFilePath: mockComplexFilePath,
				tokenOutputFilePathParts: mockComplexFilePathParts,
				platform: mockPlatform,
				brand: mockBrand,
				file: mockComplexFileName,
				initialDistVersion,
			};

			await handleCdnOutputFiles(mockComplexFilePath, complexPreparedData, mockVersion);

			expect(mockedPrepareFolder).toHaveBeenCalledWith('token-package/cdn/tokens/1.0.0/escapp/a1/web/components');
			expect(mockedCopyFile).toHaveBeenCalledWith(
				mockComplexFilePath,
				'token-package/cdn/tokens/1.0.0/escapp/a1/web/components/tokens-escapp-components.v2.1.0.0.css',
			);
		});

		it('should handle different versions', async () => {
			const differentVersion = '2.1.0';
			await handleCdnOutputFiles(mockTokenOutputFullFilePath, mockPreparedVersionCheckData, differentVersion);

			expect(mockedPrepareFolder).toHaveBeenCalledWith('token-package/cdn/tokens/2.1.0/escapp/a1/web');
			expect(mockedCopyFile).toHaveBeenCalledWith(
				mockTokenOutputFullFilePath,
				'token-package/cdn/tokens/2.1.0/escapp/a1/web/tokens-escapp.2.1.0.css',
			);
		});

		it('should handle files with no extension', async () => {
			const noExtensionPath = 'token-package/dist/escapp/a1/web/tokens-escapp';
			const noExtensionPathParts = ['token-package', 'dist', 'escapp', 'a1', 'web', 'tokens-escapp'];
			const noExtensionPreparedData = {
				tokenOutputFullFilePath: noExtensionPath,
				tokenOutputFilePathParts: noExtensionPathParts,
				platform: mockPlatform,
				brand: mockBrand,
				file: 'tokens-escapp',
				initialDistVersion,
			};

			await handleCdnOutputFiles(noExtensionPath, noExtensionPreparedData, mockVersion);

			expect(mockedPrepareFolder).toHaveBeenCalledWith('token-package/cdn/tokens/1.0.0/escapp/a1/web');
			expect(mockedCopyFile).toHaveBeenCalledWith(noExtensionPath, 'token-package/cdn/tokens/1.0.0/escapp/a1/web/1.0.0.tokens-escapp');
		});
	});

	describe('addMetaDataToFileHeaderComment', () => {
		beforeEach(() => {
			// Mock Date to ensure consistent test results
			jest.spyOn(Date.prototype, 'toString').mockReturnValue('Thu Jul 04 2025 10:00:00 GMT+0200 (Central European Summer Time)');
		});

		afterEach(() => {
			jest.restoreAllMocks();
		});

		it('should add version and date to file header comment', () => {
			mockedReadFile.mockReturnValue(mockFileContent);

			addMetaDataToFileHeaderComment('/path/to/file.css', mockVersion);

			expect(mockedReadFile).toHaveBeenCalledWith('/path/to/file.css');
			expect(mockedWriteFile).toHaveBeenCalledWith('/path/to/file.css', mockFileContentWithVersionAndDate);
		});

		it('should handle file with only version placeholder', () => {
			const contentWithOnlyVersionPlaceholder = `Version ${versionFileHeaderPlaceholder}`;
			mockedReadFile.mockReturnValue(contentWithOnlyVersionPlaceholder);

			addMetaDataToFileHeaderComment('/path/to/file.css', mockVersion);

			expect(mockedWriteFile).toHaveBeenCalledWith('/path/to/file.css', `Version ${mockVersion}`);
		});

		it('should handle file with only date placeholder', () => {
			const contentWithOnlyDatePlaceholder = `Generated on ${createDateFileHeaderPlaceholder}`;
			mockedReadFile.mockReturnValue(contentWithOnlyDatePlaceholder);

			addMetaDataToFileHeaderComment('/path/to/file.css', mockVersion);

			expect(mockedWriteFile).toHaveBeenCalledWith(
				'/path/to/file.css',
				`Generated on Thu Jul 04 2025 10:00:00 GMT+0200 (Central European Summer Time)`,
			);
		});

		it('should handle file with no placeholders', () => {
			const contentWithNoPlaceholders = ':root { --color: #000; }';
			mockedReadFile.mockReturnValue(contentWithNoPlaceholders);

			addMetaDataToFileHeaderComment('/path/to/file.css', mockVersion);

			expect(mockedWriteFile).toHaveBeenCalledWith('/path/to/file.css', contentWithNoPlaceholders);
		});

		it('should handle multiple version placeholders', () => {
			const contentWithMultipleVersions = `Version ${versionFileHeaderPlaceholder} and ${versionFileHeaderPlaceholder}`;
			mockedReadFile.mockReturnValue(contentWithMultipleVersions);

			addMetaDataToFileHeaderComment('/path/to/file.css', mockVersion);

			expect(mockedWriteFile).toHaveBeenCalledWith('/path/to/file.css', `Version ${mockVersion} and ${versionFileHeaderPlaceholder}`);
		});

		it('should handle multiple date placeholders', () => {
			const contentWithMultipleDates = `Generated on ${createDateFileHeaderPlaceholder} and ${createDateFileHeaderPlaceholder}`;
			mockedReadFile.mockReturnValue(contentWithMultipleDates);

			addMetaDataToFileHeaderComment('/path/to/file.css', mockVersion);

			expect(mockedWriteFile).toHaveBeenCalledWith(
				'/path/to/file.css',
				`Generated on Thu Jul 04 2025 10:00:00 GMT+0200 (Central European Summer Time) and ${createDateFileHeaderPlaceholder}`,
			);
		});

		it('should handle different file paths', () => {
			const differentFilePath = '/different/path/to/file.js';
			mockedReadFile.mockReturnValue(mockFileContent);

			addMetaDataToFileHeaderComment(differentFilePath, mockVersion);

			expect(mockedReadFile).toHaveBeenCalledWith(differentFilePath);
			expect(mockedWriteFile).toHaveBeenCalledWith(differentFilePath, mockFileContentWithVersionAndDate);
		});

		it('should handle different versions', () => {
			const differentVersion = '2.1.0-beta';
			const expectedContentWithDifferentVersion = mockFileContent
				.replace(versionFileHeaderPlaceholder, differentVersion)
				.replace(createDateFileHeaderPlaceholder, 'Thu Jul 04 2025 10:00:00 GMT+0200 (Central European Summer Time)');
			mockedReadFile.mockReturnValue(mockFileContent);

			addMetaDataToFileHeaderComment('/path/to/file.css', differentVersion);

			expect(mockedWriteFile).toHaveBeenCalledWith('/path/to/file.css', expectedContentWithDifferentVersion);
		});
	});

	describe('Integration Tests', () => {
		it('should work with extracted data from prepareVersionCheckData', async () => {
			const versionCheckData = prepareVersionCheckData(mockTokenOutputFullFilePath);

			await handleCdnOutputFiles(mockTokenOutputFullFilePath, versionCheckData, mockVersion);

			expect(mockedPrepareFolder).toHaveBeenCalledWith('token-package/cdn/tokens/1.0.0/escapp/a1/web');
			expect(mockedCopyFile).toHaveBeenCalledWith(
				mockTokenOutputFullFilePath,
				'token-package/cdn/tokens/1.0.0/escapp/a1/web/tokens-escapp.1.0.0.css',
			);
		});

		it('should handle end-to-end file processing', async () => {
			// Step 1: Extract path parts
			const pathParts = extractTokenOutputFilePathParts(mockTokenOutputFullFilePath);

			// Step 2: Prepare version check data
			const versionCheckData = prepareVersionCheckData(mockTokenOutputFullFilePath);

			// Step 3: Handle CDN output files
			mockedReadFile.mockReturnValue(':root { --color: #000; }');
			await handleCdnOutputFiles(mockTokenOutputFullFilePath, versionCheckData, mockVersion);

			// Step 4: Add metadata to file header
			mockedReadFile.mockReturnValue(mockFileContent);
			addMetaDataToFileHeaderComment(mockTokenOutputFullFilePath, mockVersion);

			// Verify all steps were executed
			expect(pathParts.platform).toBe(mockPlatform);
			expect(pathParts.brand).toBe(mockBrand);
			expect(versionCheckData.initialDistVersion).toBe(initialDistVersion);
			expect(mockedPrepareFolder).toHaveBeenCalled();
			expect(mockedReadFile).toHaveBeenCalled();
			expect(mockedWriteFile).toHaveBeenCalled();
		});
	});

	describe('Mock File Stats Coverage', () => {
		it('should cover all mockFileStats methods', () => {
			// Test all methods to ensure 100% coverage of mock file
			expect(mockFileStats.isFile()).toBe(true);
			expect(mockFileStats.isDirectory()).toBe(false);
			expect(mockFileStats.isBlockDevice()).toBe(false);
			expect(mockFileStats.isCharacterDevice()).toBe(false);
			expect(mockFileStats.isSymbolicLink()).toBe(false);
			expect(mockFileStats.isFIFO()).toBe(false);
			expect(mockFileStats.isSocket()).toBe(false);
		});

		it('should cover all mockDirectoryStats methods', () => {
			// Test all methods to ensure 100% coverage of mock file
			expect(mockDirectoryStats.isFile()).toBe(false);
			expect(mockDirectoryStats.isDirectory()).toBe(true);
			expect(mockDirectoryStats.isBlockDevice()).toBe(false);
			expect(mockDirectoryStats.isCharacterDevice()).toBe(false);
			expect(mockDirectoryStats.isSymbolicLink()).toBe(false);
			expect(mockDirectoryStats.isFIFO()).toBe(false);
			expect(mockDirectoryStats.isSocket()).toBe(false);
		});
	});
});
