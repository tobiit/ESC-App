import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import {
	filterOutBlacklistedTokenSets,
	getFilePathParts,
	isTokenSsotMetaDataFile,
	loadFilesFromFolder,
	readJsonFile,
} from '../../shared/index.js';
import { sortFigmaTokensFilePath } from '../token-file-path-sort/token-file-path-sorter.js';
import { complementAllTokensPerModifier } from './helpers/index.js';
import { loadTokenData } from './token-loader.js';
import {
	createBlacklistedFilterScenario,
	createComplementTokensErrorScenario,
	createEmptyFolderScenario,
	createGetFilePathPartsErrorScenario,
	createLoadFolderErrorScenario,
	createOnlyMetadataFilesScenario,
	createReadJsonFileErrorScenario,
	createSingleFileScenario,
	createSortFilePathsErrorScenario,
	createSuccessfulLoadScenario,
	mockFileDataMap,
	mockFilePathPartsMap,
	resetAllMocks,
} from './token-loader.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock all external dependencies
jest.mock('../../shared/index.js', () => {
	return {
		filterOutBlacklistedTokenSets: jest.fn(),
		getFilePathParts: jest.fn(),
		isTokenSsotMetaDataFile: jest.fn(),
		loadFilesFromFolder: jest.fn(),
		readJsonFile: jest.fn(),
	};
});

jest.mock('../token-file-path-sort/token-file-path-sorter.js', () => {
	return {
		sortFigmaTokensFilePath: jest.fn(),
	};
});

jest.mock('./helpers/index.js', () => {
	return {
		complementAllTokensPerModifier: jest.fn(),
	};
});

// Cast mocks with proper typing
const mockFilterOutBlacklistedTokenSets = filterOutBlacklistedTokenSets as jest.MockedFunction<typeof filterOutBlacklistedTokenSets>;
const mockLoadFilesFromFolder = loadFilesFromFolder as jest.MockedFunction<typeof loadFilesFromFolder>;
const mockSortFigmaTokensFilePath = sortFigmaTokensFilePath as jest.MockedFunction<typeof sortFigmaTokensFilePath>;
const mockGetFilePathParts = getFilePathParts as jest.MockedFunction<typeof getFilePathParts>;
const mockIsTokenSsotMetaDataFile = isTokenSsotMetaDataFile as jest.MockedFunction<typeof isTokenSsotMetaDataFile>;
const mockReadJsonFile = readJsonFile as jest.MockedFunction<typeof readJsonFile>;
const mockComplementAllTokensPerModifier = complementAllTokensPerModifier as jest.MockedFunction<typeof complementAllTokensPerModifier>;

describe('loadTokenData', () => {
	beforeEach(() => {
		resetAllMocks();
		jest.clearAllMocks();
	});

	describe('successful token loading', () => {
		it('should load token data successfully with all files', async () => {
			const scenario = createSuccessfulLoadScenario();

			// Mock file loading and sorting
			mockLoadFilesFromFolder.mockResolvedValueOnce(scenario.unsortedFilePaths);
			mockFilterOutBlacklistedTokenSets.mockReturnValueOnce(scenario.unsortedFilePaths);
			mockSortFigmaTokensFilePath.mockReturnValueOnce(scenario.sortedFilePaths);

			// Mock getFilePathParts for each file
			scenario.sortedFilePaths.forEach(filePath => {
				const parts = mockFilePathPartsMap.get(filePath) || ['tokens', 'default'];
				mockGetFilePathParts.mockReturnValueOnce({
					filePathParts: parts,
					fileName: parts[parts.length - 1],
				});
			});

			// Mock isTokenSsotMetaDataFile
			mockIsTokenSsotMetaDataFile.mockImplementation((fileName?: string) => {
				const isMetadata = fileName ? fileName.includes('$metadata') || fileName.includes('$themes') : false;
				return isMetadata;
			});

			// Mock readJsonFile for non-metadata files only
			const nonMetadataFiles = scenario.sortedFilePaths.filter((filePath: string) => {
				const fileName = filePath.split('/').pop() || '';
				return !fileName.includes('$metadata') && !fileName.includes('$themes');
			});

			nonMetadataFiles.forEach((filePath: string) => {
				const data = mockFileDataMap.get(filePath);
				if (data) {
					mockReadJsonFile.mockReturnValueOnce(data as object);
				}
			});

			// Mock complementAllTokensPerModifier (it modifies allTokensPerModifier in place)
			mockComplementAllTokensPerModifier.mockImplementation((_, __, allTokensPerModifier) => {
				// Simulate the function populating the allTokensPerModifier object
				Object.assign(allTokensPerModifier, scenario.expectedResult.allTokensPerModifier);
			});

			// Execute
			const result = await loadTokenData(scenario.tokenFolderPath);

			// Verify
			expect(result).toEqual(scenario.expectedResult);
			expect(mockLoadFilesFromFolder).toHaveBeenCalledWith(scenario.tokenFolderPath);
			expect(mockSortFigmaTokensFilePath).toHaveBeenCalledWith(scenario.unsortedFilePaths);
			expect(mockGetFilePathParts).toHaveBeenCalledTimes(scenario.sortedFilePaths.length);

			// Verify readJsonFile was called for non-metadata files
			const nonMetadataFilesCount = scenario.sortedFilePaths.filter((filePath: string) => {
				const fileName = filePath.split('/').pop() || '';
				return !fileName.includes('$metadata.json') && !fileName.includes('$themes.json');
			}).length;
			expect(mockReadJsonFile).toHaveBeenCalledTimes(nonMetadataFilesCount);
			expect(mockComplementAllTokensPerModifier).toHaveBeenCalledTimes(nonMetadataFilesCount);
		});
	});

	describe('edge cases', () => {
		it('should handle empty folder gracefully', async () => {
			const scenario = createEmptyFolderScenario();

			mockLoadFilesFromFolder.mockResolvedValueOnce(scenario.sortedFilePaths);
			mockSortFigmaTokensFilePath.mockReturnValueOnce(scenario.sortedFilePaths);

			// No files to process, so no other mocks needed

			const result = await loadTokenData(scenario.tokenFolderPath);

			expect(result.figmaTokenFullFilePaths).toEqual(scenario.sortedFilePaths);
			expect(result.allTokensPerModifier).toEqual({});
			expect(mockGetFilePathParts).not.toHaveBeenCalled();
		});

		it('should handle metadata-only files', async () => {
			const scenario = createOnlyMetadataFilesScenario();

			mockLoadFilesFromFolder.mockResolvedValueOnce(scenario.unsortedFilePaths);
			mockSortFigmaTokensFilePath.mockReturnValueOnce(scenario.sortedFilePaths);

			// Mock getFilePathParts for metadata files
			scenario.sortedFilePaths.forEach(filePath => {
				const parts = mockFilePathPartsMap.get(filePath) || ['tokens', '$metadata'];
				mockGetFilePathParts.mockReturnValueOnce({
					filePathParts: parts,
					fileName: parts[parts.length - 1],
				});
			});

			mockIsTokenSsotMetaDataFile.mockImplementation((fileName?: string) => {
				const isMetadata = fileName ? fileName.includes('$metadata') || fileName.includes('$themes') : false;
				return isMetadata;
			});

			const result = await loadTokenData(scenario.tokenFolderPath);

			expect(result.figmaTokenFullFilePaths).toEqual(scenario.sortedFilePaths);
			expect(result.allTokensPerModifier).toEqual({});
			expect(mockGetFilePathParts).toHaveBeenCalledTimes(scenario.sortedFilePaths.length);
			// Metadata files should be skipped, so readJsonFile and complementAllTokensPerModifier should not be called
			expect(mockReadJsonFile).not.toHaveBeenCalled();
			expect(mockComplementAllTokensPerModifier).not.toHaveBeenCalled();
		});

		it('should handle single file scenario', async () => {
			const scenario = createSingleFileScenario();

			mockLoadFilesFromFolder.mockResolvedValueOnce(scenario.unsortedFilePaths);
			mockSortFigmaTokensFilePath.mockReturnValueOnce(scenario.sortedFilePaths);

			// Mock getFilePathParts for single file
			scenario.sortedFilePaths.forEach(filePath => {
				const parts = mockFilePathPartsMap.get(filePath) || ['tokens', 'core', 'colors'];
				mockGetFilePathParts.mockReturnValueOnce({
					filePathParts: parts,
					fileName: parts[parts.length - 1],
				});
			});

			mockIsTokenSsotMetaDataFile.mockImplementation((fileName?: string) =>
				fileName ? fileName.includes('$metadata.json') || fileName.includes('$themes.json') : false,
			);

			// Mock readJsonFile for the single file
			scenario.sortedFilePaths.forEach((filePath: string) => {
				const data = mockFileDataMap.get(filePath);
				if (data) {
					mockReadJsonFile.mockReturnValueOnce(data as object);
				}
			});

			mockComplementAllTokensPerModifier.mockImplementation((_, __, allTokensPerModifier) => {
				// Simulate the function populating the allTokensPerModifier object
				Object.assign(allTokensPerModifier, scenario.expectedResult.allTokensPerModifier);
			});

			const result = await loadTokenData(scenario.tokenFolderPath);

			expect(result).toEqual(scenario.expectedResult);
			expect(mockGetFilePathParts).toHaveBeenCalledTimes(scenario.sortedFilePaths.length);
			// Only non-metadata files should trigger readJsonFile
			expect(mockReadJsonFile).toHaveBeenCalledTimes(1);
			expect(mockComplementAllTokensPerModifier).toHaveBeenCalledTimes(1);
		});
	});

	describe('error handling', () => {
		it('should propagate error when loadFilesFromFolder fails', async () => {
			const scenario = createLoadFolderErrorScenario();

			mockLoadFilesFromFolder.mockRejectedValueOnce(new Error(scenario.error.message));

			await expect(loadTokenData(scenario.tokenFolderPath)).rejects.toThrow(scenario.error.message);

			expect(mockLoadFilesFromFolder).toHaveBeenCalledWith(scenario.tokenFolderPath);
			expect(mockGetFilePathParts).not.toHaveBeenCalled();
		});

		it('should propagate error when sortFigmaTokensFilePath fails', async () => {
			const scenario = createSortFilePathsErrorScenario();

			mockLoadFilesFromFolder.mockResolvedValueOnce([]);
			mockFilterOutBlacklistedTokenSets.mockReturnValueOnce([]);
			mockSortFigmaTokensFilePath.mockImplementation(() => {
				throw new Error(scenario.error.message);
			});

			await expect(loadTokenData(scenario.tokenFolderPath)).rejects.toThrow(scenario.error.message);

			expect(mockSortFigmaTokensFilePath).toHaveBeenCalledWith([]);
			expect(mockGetFilePathParts).not.toHaveBeenCalled();
		});

		it('should propagate error when getFilePathParts fails', async () => {
			const scenario = createGetFilePathPartsErrorScenario();

			mockLoadFilesFromFolder.mockResolvedValueOnce([scenario.filePath]);
			mockSortFigmaTokensFilePath.mockReturnValueOnce([scenario.filePath]);

			mockGetFilePathParts.mockImplementation(() => {
				throw new Error(scenario.error.message);
			});

			await expect(loadTokenData(scenario.tokenFolderPath)).rejects.toThrow(scenario.error.message);

			expect(mockGetFilePathParts).toHaveBeenCalledWith(scenario.filePath);
		});

		it('should propagate error when readJsonFile fails', async () => {
			const scenario = createReadJsonFileErrorScenario();

			mockLoadFilesFromFolder.mockResolvedValueOnce([scenario.filePath]);
			mockSortFigmaTokensFilePath.mockReturnValueOnce([scenario.filePath]);

			const mockParts = ['tokens', 'core', 'colors'];
			mockGetFilePathParts.mockReturnValueOnce({
				filePathParts: mockParts,
				fileName: mockParts[mockParts.length - 1],
			});

			mockIsTokenSsotMetaDataFile.mockReturnValueOnce(false);

			mockReadJsonFile.mockImplementation(() => {
				throw new Error(scenario.error.message);
			});

			await expect(loadTokenData(scenario.tokenFolderPath)).rejects.toThrow(scenario.error.message);

			expect(mockReadJsonFile).toHaveBeenCalledWith(scenario.filePath);
		});

		it('should propagate error when complementAllTokensSet fails', async () => {
			const scenario = createComplementTokensErrorScenario();

			mockLoadFilesFromFolder.mockResolvedValueOnce([scenario.filePath]);
			mockSortFigmaTokensFilePath.mockReturnValueOnce([scenario.filePath]);

			const mockParts = ['tokens', 'core', 'colors'];
			mockGetFilePathParts.mockReturnValueOnce({
				filePathParts: mockParts,
				fileName: mockParts[mockParts.length - 1],
			});

			mockIsTokenSsotMetaDataFile.mockReturnValueOnce(false);
			mockReadJsonFile.mockReturnValueOnce({ testToken: { value: 'test', type: 'color' } });

			mockComplementAllTokensPerModifier.mockImplementation(() => {
				throw new Error(scenario.error.message);
			});

			await expect(loadTokenData(scenario.tokenFolderPath)).rejects.toThrow(scenario.error.message);

			expect(mockComplementAllTokensPerModifier).toHaveBeenCalledTimes(1);
		});
	});

	describe('integration scenarios', () => {
		it('should handle empty token data gracefully', async () => {
			const emptyDataFiles = ['/test/tokens/core/empty.json'];

			mockLoadFilesFromFolder.mockResolvedValueOnce(emptyDataFiles);
			mockSortFigmaTokensFilePath.mockReturnValueOnce(emptyDataFiles);

			const mockParts = ['tokens', 'core', 'empty'];
			mockGetFilePathParts.mockReturnValueOnce({
				filePathParts: mockParts,
				fileName: mockParts[mockParts.length - 1],
			});

			mockIsTokenSsotMetaDataFile.mockReturnValueOnce(false);
			mockReadJsonFile.mockReturnValueOnce({});

			mockComplementAllTokensPerModifier.mockImplementation(() => {
				// Mock implementation for empty data scenario - no modifications needed
			});

			const result = await loadTokenData('/test/tokens');

			expect(result.figmaTokenFullFilePaths).toEqual(emptyDataFiles);
			expect(result.allTokensPerModifier).toEqual({});
			expect(mockComplementAllTokensPerModifier).toHaveBeenCalledWith(mockParts, 'empty', {}, {});
		});
	});

	describe('blacklist filtering', () => {
		it('should filter out file paths containing blacklisted keywords', async () => {
			const scenario = createBlacklistedFilterScenario();

			// Mock file loading with all file paths
			mockLoadFilesFromFolder.mockResolvedValueOnce(scenario.mockFilePaths);

			// Mock filtering logic to return only non-blacklisted paths
			mockFilterOutBlacklistedTokenSets.mockReturnValueOnce(scenario.expectedFilteredPaths);

			// Mock sorting logic to return the same order (let filtering happen naturally)
			mockSortFigmaTokensFilePath.mockImplementation((paths: string[]) => paths);

			// Mock getFilePathParts only for the expected filtered paths
			scenario.expectedFilteredPaths.forEach(filePath => {
				const parts = filePath.split('/').filter(part => part !== '');
				mockGetFilePathParts.mockReturnValueOnce({
					filePathParts: parts,
					fileName: parts[parts.length - 1].replace('.json', ''),
				});
			});

			// Mock isTokenSsotMetaDataFile to return false for all files
			mockIsTokenSsotMetaDataFile.mockImplementation(() => false);

			// Mock readJsonFile only for the expected filtered paths
			scenario.expectedFilteredPaths.forEach(filePath => {
				mockReadJsonFile.mockReturnValueOnce({
					filePath,
					data: 'mockData',
				});
			});

			// Mock complementAllTokensPerModifier
			mockComplementAllTokensPerModifier.mockImplementation(() => {
				// No-op for this test
			});

			// Execute
			const result = await loadTokenData(scenario.mockFolderPath);

			// Verify
			expect(mockLoadFilesFromFolder).toHaveBeenCalledWith(scenario.mockFolderPath);
			expect(result.figmaTokenFullFilePaths).toEqual(scenario.expectedFilteredPaths);
		});
	});
});
