import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import fs from 'fs-extra';
import { tokensSsotFolder } from '../../constants';
import {
	mockDesignSystemName,
	mockEmptyFolderPath,
	mockFolderPath,
	mockGlob,
	mockGlobFiles,
	mockInvalidFolderPath,
	mockTextFilePath,
} from './file-helper.mock.spec';
import {
	appendToFile,
	checkFolderExistence,
	copyFile,
	getArtifactBuildPath,
	getByProductFilePathByFilePathParts,
	getByProductFilePathByTokensetName,
	getFilePathByTokensetName,
	getFilePathParts,
	loadFilesFromFolder,
	prepareFolder,
	readFile,
	readJsonFile,
	readLinesFromFile,
	renameFile,
	statSync,
	writeFile,
	writeJsonFile,
} from './file-helper';
import {
	expectedArtifactPath,
	expectedByProductTokensetPath,
	expectedTokensetPath,
	mockAppendContent,
	mockBrand,
	mockByProductExpectedPaths,
	mockCopyDestPath,
	mockCopySourcePath,
	mockDirStats,
	mockExistingFolderPath,
	mockFileContent,
	mockFileNameCss,
	mockFileNameJson,
	mockFilePathParts,
	mockJsonContent,
	mockNestedFolderPath,
	mockNewFilePath,
	mockNewFolderPath,
	mockNonExistentFilePath,
	mockNonExistentFolderPath,
	mockOldFilePath,
	mockPlatform,
	mockReadFilePath,
	mockStats,
	mockTokensetName,
	mockUnwritableFilePath,
	mockWriteFilePath,
} from './file-helper.mock.spec';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// type GlobFn = (pattern: string) => Promise<string[]>;
// Mock the glob function with proper typing
jest.mock('glob', () => {
	return {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		glob: jest.fn((pattern: string) => Promise.resolve([] as string[])),
	};
});

jest.mock('fs-extra', () => {
	return {
		readFileSync: jest.fn(),
		writeFileSync: jest.fn(),
		copyFileSync: jest.fn(),
		appendFileSync: jest.fn(),
		readJsonSync: jest.fn(),
		writeJSONSync: jest.fn(),
		rename: jest.fn(),
		statSync: jest.fn(),
		existsSync: jest.fn(),
		mkdirSync: jest.fn(),
	};
});

// Note: Logger mocking (suppressLoggerOutput/restoreLoggerMocks) is automatically handled by src/shared/testing/test-helpers.mock.spec.ts via jest.config.ts setupFilesAfterEnv
describe('file-helper', () => {
	describe('getArtifactBuildPath', () => {
		it('should correctly construct artifact build path from given parameters', () => {
			const result = getArtifactBuildPath(mockBrand, mockDesignSystemName, mockPlatform, mockFileNameCss);
			expect(result).toBe(expectedArtifactPath);
		});

		it('should maintain correct path structure', () => {
			const result = getArtifactBuildPath(mockBrand, mockDesignSystemName, mockPlatform, mockFileNameCss);
			const pathParts = result.split('/');

			expect(pathParts).toHaveLength(6);
			expect(pathParts[0]).toBe('token-package');
			expect(pathParts[1]).toBe('dist');
			expect(pathParts[2]).toBe(mockBrand);
			expect(pathParts[3]).toBe(mockDesignSystemName);
			expect(pathParts[4]).toBe(mockPlatform);
			expect(pathParts[5]).toBe(mockFileNameCss);
		});
	});

	describe('getByProductFilePathByFilePathParts', () => {
		it('should correctly transform file path parts and construct by-product paths', () => {
			const result = getByProductFilePathByFilePathParts([...mockFilePathParts], mockFileNameJson);
			expect(result).toEqual(mockByProductExpectedPaths);
		});

		it('should not modify the original filePathParts array', () => {
			const originalParts = [...mockFilePathParts];
			getByProductFilePathByFilePathParts(originalParts, mockFileNameJson);
			expect(originalParts).toEqual(mockFilePathParts);
		});

		it('should handle empty path parts array', () => {
			const result = getByProductFilePathByFilePathParts(['tokens'], mockFileNameJson);
			expect(result).toEqual({
				byProductFilePath: 'build/by-product/prepared-tokens/',
				byProductFullFilePath: 'build/by-product/prepared-tokens/button.json',
			});
		});

		it('should maintain correct path structure', () => {
			const result = getByProductFilePathByFilePathParts([...mockFilePathParts], mockFileNameJson);
			const pathParts = result.byProductFullFilePath.split('/');

			expect(pathParts).toHaveLength(6);
			expect(pathParts[0]).toBe('build');
			expect(pathParts[1]).toBe('by-product');
			expect(pathParts[2]).toBe('prepared-tokens');
			expect(pathParts[3]).toBe('components');
			expect(pathParts[4]).toBe('default');
			expect(pathParts[5]).toBe(mockFileNameJson);
		});
	});

	describe('getFilePathByTokensetName', () => {
		it('should correctly construct token set file path', () => {
			const result = getFilePathByTokensetName(mockTokensetName);
			expect(result).toBe(expectedTokensetPath);
		});

		it('should handle tokenset names without subfolders', () => {
			const result = getFilePathByTokensetName('metadata');
			expect(result).toBe('tokens/metadata.json');
		});

		it('should handle deep nested tokenset paths', () => {
			const result = getFilePathByTokensetName('semantic/color-schemes/dark');
			expect(result).toBe('tokens/semantic/color-schemes/dark.json');
		});

		it('should maintain correct file extension', () => {
			const result = getFilePathByTokensetName(mockTokensetName);
			expect(result.endsWith('.json')).toBe(true);
		});
	});

	describe('getByProductFilePathByTokensetName', () => {
		it('should correctly construct by-product token set file path', () => {
			const result = getByProductFilePathByTokensetName(mockTokensetName);
			expect(result).toBe(expectedByProductTokensetPath);
		});

		it('should handle tokenset names without subfolders', () => {
			const result = getByProductFilePathByTokensetName('metadata');
			expect(result).toBe('build/by-product/prepared-tokens/metadata.json');
		});

		it('should handle deep nested tokenset paths', () => {
			const result = getByProductFilePathByTokensetName('semantic/color-schemes/dark');
			expect(result).toBe('build/by-product/prepared-tokens/semantic/color-schemes/dark.json');
		});

		it('should maintain correct file extension', () => {
			const result = getByProductFilePathByTokensetName(mockTokensetName);
			expect(result.endsWith('.json')).toBe(true);
		});

		it('should use correct base directory', () => {
			const result = getByProductFilePathByTokensetName(mockTokensetName);
			const pathParts = result.split('/');
			expect(pathParts[0]).toBe('build');
			expect(pathParts[1]).toBe('by-product');
			expect(pathParts[2]).toBe('prepared-tokens');
		});
	});

	describe('readFile', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should read file content correctly', () => {
			(fs.readFileSync as jest.Mock).mockReturnValue(mockFileContent);
			const result = readFile(mockReadFilePath);

			expect(result).toBe(mockFileContent);
			expect(fs.readFileSync).toHaveBeenCalledTimes(1);
			expect(fs.readFileSync).toHaveBeenCalledWith(mockReadFilePath, 'utf-8');
		});

		it('should throw error when file cannot be read', () => {
			const errorMessage = 'ENOENT: no such file or directory';
			(fs.readFileSync as jest.Mock).mockImplementation(() => {
				throw new Error(errorMessage);
			});

			expect(() => readFile(mockReadFilePath)).toThrow(errorMessage);
			expect(fs.readFileSync).toHaveBeenCalledTimes(1);
			expect(fs.readFileSync).toHaveBeenCalledWith(mockReadFilePath, 'utf-8');
		});

		it('should handle empty file content', () => {
			(fs.readFileSync as jest.Mock).mockReturnValue('');
			const result = readFile(mockReadFilePath);

			expect(result).toBe('');
			expect(fs.readFileSync).toHaveBeenCalledTimes(1);
			expect(fs.readFileSync).toHaveBeenCalledWith(mockReadFilePath, 'utf-8');
		});
	});

	describe('writeFile', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should write file content correctly', () => {
			writeFile(mockWriteFilePath, mockFileContent);

			expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
			expect(fs.writeFileSync).toHaveBeenCalledWith(mockWriteFilePath, mockFileContent);
		});

		it('should handle writing empty content', () => {
			writeFile(mockWriteFilePath, '');

			expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
			expect(fs.writeFileSync).toHaveBeenCalledWith(mockWriteFilePath, '');
		});

		it('should handle writing non-string content by converting to string', () => {
			const numericContent = 42;
			writeFile(mockWriteFilePath, numericContent as unknown as string);

			expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
			expect(fs.writeFileSync).toHaveBeenCalledWith(mockWriteFilePath, expect.anything());
		});

		it('should throw error when file cannot be written', () => {
			const errorMessage = 'EACCES: permission denied';
			(fs.writeFileSync as jest.Mock).mockImplementation(() => {
				throw new Error(errorMessage);
			});

			expect(() => writeFile(mockWriteFilePath, mockFileContent)).toThrow(errorMessage);
			expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
			expect(fs.writeFileSync).toHaveBeenCalledWith(mockWriteFilePath, mockFileContent);
		});
	});

	describe('copyFile', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should copy file correctly', () => {
			copyFile(mockCopySourcePath, mockCopyDestPath);

			expect(fs.copyFileSync).toHaveBeenCalledTimes(1);
			expect(fs.copyFileSync).toHaveBeenCalledWith(mockCopySourcePath, mockCopyDestPath);
		});

		it('should throw error when source file does not exist', () => {
			const errorMessage = 'ENOENT: no such file or directory';
			(fs.copyFileSync as jest.Mock).mockImplementation(() => {
				throw new Error(errorMessage);
			});

			expect(() => copyFile(mockCopySourcePath, mockCopyDestPath)).toThrow(errorMessage);
			expect(fs.copyFileSync).toHaveBeenCalledTimes(1);
			expect(fs.copyFileSync).toHaveBeenCalledWith(mockCopySourcePath, mockCopyDestPath);
		});

		it('should throw error when destination path is not writable', () => {
			const errorMessage = 'EACCES: permission denied';
			(fs.copyFileSync as jest.Mock).mockImplementation(() => {
				throw new Error(errorMessage);
			});

			expect(() => copyFile(mockCopySourcePath, mockCopyDestPath)).toThrow(errorMessage);
			expect(fs.copyFileSync).toHaveBeenCalledTimes(1);
			expect(fs.copyFileSync).toHaveBeenCalledWith(mockCopySourcePath, mockCopyDestPath);
		});
	});

	describe('appendToFile', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should append content to file correctly', () => {
			appendToFile(mockWriteFilePath, mockAppendContent);

			expect(fs.appendFileSync).toHaveBeenCalledTimes(1);
			expect(fs.appendFileSync).toHaveBeenCalledWith(mockWriteFilePath, mockAppendContent);
		});

		it('should handle appending empty content', () => {
			appendToFile(mockWriteFilePath, '');

			expect(fs.appendFileSync).toHaveBeenCalledTimes(1);
			expect(fs.appendFileSync).toHaveBeenCalledWith(mockWriteFilePath, '');
		});

		it('should handle appending content with newlines', () => {
			const multilineContent = '\nline1\nline2\n';
			appendToFile(mockWriteFilePath, multilineContent);

			expect(fs.appendFileSync).toHaveBeenCalledTimes(1);
			expect(fs.appendFileSync).toHaveBeenCalledWith(mockWriteFilePath, multilineContent);
		});

		it('should throw error when file cannot be accessed', () => {
			const errorMessage = 'EACCES: permission denied';
			(fs.appendFileSync as jest.Mock).mockImplementation(() => {
				throw new Error(errorMessage);
			});

			expect(() => appendToFile(mockWriteFilePath, mockAppendContent)).toThrow(errorMessage);
			expect(fs.appendFileSync).toHaveBeenCalledTimes(1);
			expect(fs.appendFileSync).toHaveBeenCalledWith(mockWriteFilePath, mockAppendContent);
		});

		it('should throw error when file does not exist', () => {
			const errorMessage = 'ENOENT: no such file or directory';
			(fs.appendFileSync as jest.Mock).mockImplementation(() => {
				throw new Error(errorMessage);
			});

			expect(() => appendToFile(mockWriteFilePath, mockAppendContent)).toThrow(errorMessage);
			expect(fs.appendFileSync).toHaveBeenCalledTimes(1);
			expect(fs.appendFileSync).toHaveBeenCalledWith(mockWriteFilePath, mockAppendContent);
		});
	});

	describe('readJsonFile', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should read and parse JSON file correctly', () => {
			(fs.readJsonSync as jest.Mock).mockReturnValue(mockJsonContent);
			const result = readJsonFile(mockReadFilePath);

			expect(result).toEqual(mockJsonContent);
			expect(fs.readJsonSync).toHaveBeenCalledTimes(1);
			expect(fs.readJsonSync).toHaveBeenCalledWith(mockReadFilePath, { throws: false });
		});

		it('should return null when file cannot be read', () => {
			(fs.readJsonSync as jest.Mock).mockReturnValue(null);
			const result = readJsonFile(mockReadFilePath);

			expect(result).toBeNull();
			expect(fs.readJsonSync).toHaveBeenCalledTimes(1);
			expect(fs.readJsonSync).toHaveBeenCalledWith(mockReadFilePath, { throws: false });
		});

		it('should handle empty JSON file', () => {
			(fs.readJsonSync as jest.Mock).mockReturnValue({});
			const result = readJsonFile(mockReadFilePath);

			expect(result).toEqual({});
			expect(fs.readJsonSync).toHaveBeenCalledTimes(1);
			expect(fs.readJsonSync).toHaveBeenCalledWith(mockReadFilePath, { throws: false });
		});

		it('should handle invalid JSON gracefully', () => {
			(fs.readJsonSync as jest.Mock).mockReturnValue(null);
			const result = readJsonFile(mockReadFilePath);

			expect(result).toBeNull();
			expect(fs.readJsonSync).toHaveBeenCalledTimes(1);
			expect(fs.readJsonSync).toHaveBeenCalledWith(mockReadFilePath, { throws: false });
		});

		it('should maintain JSON data types', () => {
			const complexJson = {
				text: 'test',
				count: 42,
				isActive: true,
				emptyValue: null,
				list: [1, 2, 3],
				object: { key: 'value' },
			};
			(fs.readJsonSync as jest.Mock).mockReturnValue(complexJson);
			const result = readJsonFile(mockReadFilePath);

			expect(result).toEqual(complexJson);
			expect(fs.readJsonSync).toHaveBeenCalledTimes(1);
			expect(fs.readJsonSync).toHaveBeenCalledWith(mockReadFilePath, { throws: false });
		});
	});

	describe('writeJsonFile', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should write JSON file with correct formatting options', () => {
			writeJsonFile(mockWriteFilePath, mockJsonContent);

			expect(fs.writeJSONSync).toHaveBeenCalledTimes(1);
			expect(fs.writeJSONSync).toHaveBeenCalledWith(mockWriteFilePath, mockJsonContent, { encoding: 'UTF-8', spaces: 2 });
		});

		it('should handle empty object', () => {
			const emptyObject = {};
			writeJsonFile(mockWriteFilePath, emptyObject);

			expect(fs.writeJSONSync).toHaveBeenCalledTimes(1);
			expect(fs.writeJSONSync).toHaveBeenCalledWith(mockWriteFilePath, emptyObject, { encoding: 'UTF-8', spaces: 2 });
		});

		it('should handle nested objects', () => {
			const nestedObject = {
				nested: {
					deep: {
						value: true,
					},
				},
			};
			writeJsonFile(mockWriteFilePath, nestedObject);

			expect(fs.writeJSONSync).toHaveBeenCalledTimes(1);
			expect(fs.writeJSONSync).toHaveBeenCalledWith(mockWriteFilePath, nestedObject, { encoding: 'UTF-8', spaces: 2 });
		});

		it('should throw error when file cannot be written', () => {
			const errorMessage = 'EACCES: permission denied';
			(fs.writeJSONSync as jest.Mock).mockImplementation(() => {
				throw new Error(errorMessage);
			});

			expect(() => writeJsonFile(mockWriteFilePath, mockJsonContent)).toThrow(errorMessage);
			expect(fs.writeJSONSync).toHaveBeenCalledTimes(1);
			expect(fs.writeJSONSync).toHaveBeenCalledWith(mockWriteFilePath, mockJsonContent, { encoding: 'UTF-8', spaces: 2 });
		});
	});

	describe('renameFile', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should rename file correctly', async () => {
			(fs.rename as unknown as jest.Mock).mockImplementation(() => Promise.resolve());

			await expect(renameFile(mockOldFilePath, mockNewFilePath)).resolves.toBeUndefined();
			expect(fs.rename).toHaveBeenCalledTimes(1);
			expect(fs.rename).toHaveBeenCalledWith(mockOldFilePath, mockNewFilePath);
		});

		it('should throw error when source file does not exist', async () => {
			const errorMessage = 'ENOENT: no such file or directory';
			(fs.rename as unknown as jest.Mock).mockImplementation(() => Promise.reject(new Error(errorMessage)));

			await expect(renameFile(mockNonExistentFilePath, mockNewFilePath)).rejects.toThrow(errorMessage);
			expect(fs.rename).toHaveBeenCalledTimes(1);
			expect(fs.rename).toHaveBeenCalledWith(mockNonExistentFilePath, mockNewFilePath);
		});

		it('should throw error when destination path is not writable', async () => {
			const errorMessage = 'EACCES: permission denied';
			(fs.rename as unknown as jest.Mock).mockImplementation(() => Promise.reject(new Error(errorMessage)));

			await expect(renameFile(mockOldFilePath, mockUnwritableFilePath)).rejects.toThrow(errorMessage);
			expect(fs.rename).toHaveBeenCalledTimes(1);
			expect(fs.rename).toHaveBeenCalledWith(mockOldFilePath, mockUnwritableFilePath);
		});

		it('should throw error when destination already exists', async () => {
			const errorMessage = 'EEXIST: file already exists';
			(fs.rename as unknown as jest.Mock).mockImplementation(() => Promise.reject(new Error(errorMessage)));

			await expect(renameFile(mockOldFilePath, mockReadFilePath)).rejects.toThrow(errorMessage);
			expect(fs.rename).toHaveBeenCalledTimes(1);
			expect(fs.rename).toHaveBeenCalledWith(mockOldFilePath, mockReadFilePath);
		});
	});

	describe('statSync', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should return file stats correctly', () => {
			(fs.statSync as jest.Mock).mockReturnValue(mockStats);
			const result = statSync(mockReadFilePath);

			expect(result).toEqual(mockStats);
			expect(fs.statSync).toHaveBeenCalledTimes(1);
			expect(fs.statSync).toHaveBeenCalledWith(mockReadFilePath);
			expect(result.isFile()).toBe(true);
			expect(result.isDirectory()).toBe(false);
		});

		it('should return directory stats correctly', () => {
			(fs.statSync as jest.Mock).mockReturnValue(mockDirStats);
			const result = statSync(tokensSsotFolder);

			expect(result).toEqual(mockDirStats);
			expect(fs.statSync).toHaveBeenCalledTimes(1);
			expect(fs.statSync).toHaveBeenCalledWith(tokensSsotFolder);
			expect(result.isFile()).toBe(false);
			expect(result.isDirectory()).toBe(true);
		});

		it('should throw error when path does not exist', () => {
			const errorMessage = 'ENOENT: no such file or directory';
			(fs.statSync as jest.Mock).mockImplementation(() => {
				throw new Error(errorMessage);
			});

			expect(() => statSync(mockNonExistentFilePath)).toThrow(errorMessage);
			expect(fs.statSync).toHaveBeenCalledTimes(1);
			expect(fs.statSync).toHaveBeenCalledWith(mockNonExistentFilePath);
		});

		it('should throw error when access is denied', () => {
			const errorMessage = 'EACCES: permission denied';
			(fs.statSync as jest.Mock).mockImplementation(() => {
				throw new Error(errorMessage);
			});

			expect(() => statSync(mockUnwritableFilePath)).toThrow(errorMessage);
			expect(fs.statSync).toHaveBeenCalledTimes(1);
			expect(fs.statSync).toHaveBeenCalledWith(mockUnwritableFilePath);
		});
	});

	describe('checkFolderExistence', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should return true when folder exists', () => {
			(fs.existsSync as jest.Mock).mockReturnValue(true);
			const result = checkFolderExistence(mockExistingFolderPath);

			expect(result).toBe(true);
			expect(fs.existsSync).toHaveBeenCalledTimes(1);
			expect(fs.existsSync).toHaveBeenCalledWith(mockExistingFolderPath);
		});

		it('should return false when folder does not exist', () => {
			(fs.existsSync as jest.Mock).mockReturnValue(false);
			const result = checkFolderExistence(mockNonExistentFolderPath);

			expect(result).toBe(false);
			expect(fs.existsSync).toHaveBeenCalledTimes(1);
			expect(fs.existsSync).toHaveBeenCalledWith(mockNonExistentFolderPath);
		});

		it('should return false for invalid paths', () => {
			(fs.existsSync as jest.Mock).mockReturnValue(false);
			const result = checkFolderExistence('');

			expect(result).toBe(false);
			expect(fs.existsSync).toHaveBeenCalledTimes(1);
			expect(fs.existsSync).toHaveBeenCalledWith('');
		});
	});

	describe('prepareFolder', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should create folder when it does not exist', () => {
			(fs.existsSync as jest.Mock).mockReturnValue(false);
			prepareFolder(mockNewFolderPath);

			expect(fs.existsSync).toHaveBeenCalledTimes(1);
			expect(fs.existsSync).toHaveBeenCalledWith(mockNewFolderPath);
			expect(fs.mkdirSync).toHaveBeenCalledTimes(1);
			expect(fs.mkdirSync).toHaveBeenCalledWith(mockNewFolderPath, { recursive: true });
		});

		it('should not create folder when it already exists', () => {
			(fs.existsSync as jest.Mock).mockReturnValue(true);
			prepareFolder(mockExistingFolderPath);

			expect(fs.existsSync).toHaveBeenCalledTimes(1);
			expect(fs.existsSync).toHaveBeenCalledWith(mockExistingFolderPath);
			expect(fs.mkdirSync).not.toHaveBeenCalled();
		});

		it('should create nested folder structure when needed', () => {
			(fs.existsSync as jest.Mock).mockReturnValue(false);
			prepareFolder(mockNestedFolderPath);

			expect(fs.existsSync).toHaveBeenCalledTimes(1);
			expect(fs.existsSync).toHaveBeenCalledWith(mockNestedFolderPath);
			expect(fs.mkdirSync).toHaveBeenCalledTimes(1);
			expect(fs.mkdirSync).toHaveBeenCalledWith(mockNestedFolderPath, { recursive: true });
		});

		it('should handle error when folder creation fails', () => {
			const errorMessage = 'EACCES: permission denied';
			(fs.existsSync as jest.Mock).mockReturnValue(false);
			(fs.mkdirSync as jest.Mock).mockImplementation(() => {
				throw new Error(errorMessage);
			});

			expect(() => prepareFolder(mockUnwritableFilePath)).toThrow(errorMessage);
			expect(fs.existsSync).toHaveBeenCalledTimes(1);
			expect(fs.existsSync).toHaveBeenCalledWith(mockUnwritableFilePath);
			expect(fs.mkdirSync).toHaveBeenCalledTimes(1);
			expect(fs.mkdirSync).toHaveBeenCalledWith(mockUnwritableFilePath, { recursive: true });
		});
	});

	describe('loadFilesFromFolder', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should load files from folder correctly', async () => {
			mockGlob.mockResolvedValueOnce(mockGlobFiles);
			const result = await loadFilesFromFolder(mockFolderPath);
			expect(result).toEqual(mockGlobFiles);
			expect(mockGlob).toHaveBeenCalledWith(`./${mockFolderPath}/**/**/*.*`);
		});

		it('should return empty array for empty folder', async () => {
			mockGlob.mockResolvedValueOnce([]);
			const result = await loadFilesFromFolder(mockEmptyFolderPath);
			expect(result).toEqual([]);
			expect(mockGlob).toHaveBeenCalledWith(`./${mockEmptyFolderPath}/**/**/*.*`);
		});

		it('should handle glob errors', async () => {
			const error = new Error('Failed to glob');
			mockGlob.mockRejectedValueOnce(error);
			await expect(loadFilesFromFolder(mockInvalidFolderPath)).rejects.toThrow(error);
			expect(mockGlob).toHaveBeenCalledTimes(1);
			expect(mockGlob).toHaveBeenCalledWith(`./${mockInvalidFolderPath}/**/**/*.*`);
		});
	});

	describe('getFilePathParts', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should correctly split file path into parts and file name', () => {
			const result = getFilePathParts(mockReadFilePath);
			expect(result).toEqual({
				filePathParts: ['tokens', 'core'],
				fileName: 'colors.json',
			});
		});

		it('should handle paths with multiple segments', () => {
			const result = getFilePathParts(mockByProductExpectedPaths.byProductFullFilePath);
			expect(result).toEqual({
				filePathParts: ['build', 'by-product', 'prepared-tokens', 'components', 'default'],
				fileName: mockFileNameJson,
			});
		});

		it('should throw error for paths with trailing separator', () => {
			expect(() => getFilePathParts(mockByProductExpectedPaths.byProductFilePath)).toThrow('Could not resolve file name from file path.');
		});

		it('should throw error for empty path', () => {
			expect(() => getFilePathParts('')).toThrow('Could not resolve file name from file path.');
		});
	});

	describe('readLinesFromFile', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should read and split lines from file successfully', async () => {
			(fs.readFileSync as jest.Mock).mockReturnValue('line1\nline2\nline3');
			const lines = await readLinesFromFile(mockTextFilePath);
			expect(lines).toEqual(['line1', 'line2', 'line3']);
			expect(fs.readFileSync).toHaveBeenCalledWith(mockTextFilePath, 'utf-8');
		});

		it('should handle empty files', async () => {
			(fs.readFileSync as jest.Mock).mockReturnValue('');
			const lines = await readLinesFromFile(mockTextFilePath);
			expect(lines).toEqual(['']);
		});

		it('should handle file read errors', async () => {
			const error = new Error('File read error');
			(fs.readFileSync as jest.Mock).mockImplementation(() => {
				throw error;
			});
			await expect(readLinesFromFile(mockTextFilePath)).rejects.toThrow('File read error');
		});

		it('should handle files with trailing newline', async () => {
			(fs.readFileSync as jest.Mock).mockReturnValue('line1\nline2\nline3\n');
			const lines = await readLinesFromFile(mockTextFilePath);
			expect(lines).toEqual(['line1', 'line2', 'line3', '']);
		});

		it('should handle files with single line', async () => {
			(fs.readFileSync as jest.Mock).mockReturnValue('single line');
			const lines = await readLinesFromFile(mockTextFilePath);
			expect(lines).toEqual(['single line']);
		});
	});
});
