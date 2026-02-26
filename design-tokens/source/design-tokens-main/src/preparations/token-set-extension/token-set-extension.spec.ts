import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import {
	checkFolderExistence,
	copyFile,
	getFilePathParts,
	isTokenSsotMetaDataFile,
	loadFilesFromFolder,
	logGeneralError,
	logger,
	prepareFolder,
	tokensSsotFolder,
} from '../../shared/index.js';
import { checkForTokenSetExtensionCaseAndPrepare } from './token-set-extension.js';
import {
	createCopyOperationScenario,
	createEmptyFolderScenario,
	createFolderDoesNotExistScenario,
	createFolderExistsScenario,
	createNoExtensionPathScenario,
	createValidExtensionPathScenario,
	mockFilePathParts,
	mockFilesDetectedMessage,
	mockFolderFoundMessage,
	mockFolderNotExistErrorMessage,
	mockNoExtensionPathMessage,
	mockNoFilesErrorMessage,
	mockOriginalA1TokenFilePaths,
	mockSrcPath,
	resetAllMocks,
} from './token-set-extension.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock the shared utilities
jest.mock('../../shared/index.js', () => {
	const actual: object = jest.requireActual('../../shared/index.js');
	return {
		...actual,
		checkFolderExistence: jest.fn(),
		copyFile: jest.fn(),
		getFilePathParts: jest.fn(),
		isTokenSsotMetaDataFile: jest.fn(),
		loadFilesFromFolder: jest.fn(),
		logGeneralError: jest.fn(),
		prepareFolder: jest.fn(),
		tokensSsotFolder: 'tokens',
	};
});

// Type the mocked functions
const mockCheckFolderExistence = checkFolderExistence as jest.MockedFunction<typeof checkFolderExistence>;
const mockCopyFile = copyFile as jest.MockedFunction<typeof copyFile>;
const mockGetFilePathParts = getFilePathParts as jest.MockedFunction<typeof getFilePathParts>;
const mockIsTokenSsotMetaDataFile = isTokenSsotMetaDataFile as jest.MockedFunction<typeof isTokenSsotMetaDataFile>;
const mockLoadFilesFromFolder = loadFilesFromFolder as jest.MockedFunction<typeof loadFilesFromFolder>;
const mockLogGeneralError = logGeneralError as jest.MockedFunction<typeof logGeneralError>;
const mockLogger = logger as jest.Mocked<typeof logger>;
const mockPrepareFolder = prepareFolder as jest.MockedFunction<typeof prepareFolder>;

// Note: Logger mocking (suppressLoggerOutput/restoreLoggerMocks) is automatically handled by src/shared/testing/test-helpers.mock.spec.ts via jest.config.ts setupFilesAfterEnv
describe('Token Set Extension', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		resetAllMocks();
	});

	describe('checkForTokenSetExtensionCaseAndPrepare', () => {
		describe('when no extension folder path is provided', () => {
			it('should log info message and return without processing', async () => {
				const scenario = createNoExtensionPathScenario();

				await checkForTokenSetExtensionCaseAndPrepare(scenario.extensionPath);

				expect(mockLogger.info).toHaveBeenCalledWith(mockNoExtensionPathMessage);
				expect(mockCheckFolderExistence).not.toHaveBeenCalled();
				expect(mockLoadFilesFromFolder).not.toHaveBeenCalled();
			});

			it('should handle undefined extension path', async () => {
				await checkForTokenSetExtensionCaseAndPrepare(undefined);

				expect(mockLogger.info).toHaveBeenCalledWith(mockNoExtensionPathMessage);
				expect(mockCheckFolderExistence).not.toHaveBeenCalled();
			});

			it('should handle empty string extension path', async () => {
				await checkForTokenSetExtensionCaseAndPrepare('');

				expect(mockLogger.info).toHaveBeenCalledWith(mockNoExtensionPathMessage);
				expect(mockCheckFolderExistence).not.toHaveBeenCalled();
			});

			it('should handle null extension path', async () => {
				await checkForTokenSetExtensionCaseAndPrepare(null as unknown as string);

				expect(mockLogger.info).toHaveBeenCalledWith(mockNoExtensionPathMessage);
				expect(mockCheckFolderExistence).not.toHaveBeenCalled();
			});
		});

		describe('when extension folder path is provided', () => {
			describe('folder existence check', () => {
				it('should proceed when folder exists and contains files', async () => {
					const scenario = createFolderExistsScenario();
					mockCheckFolderExistence.mockReturnValue(scenario.folderExists);
					mockLoadFilesFromFolder
						.mockResolvedValueOnce(scenario.filePaths) // For extension folder
						.mockResolvedValueOnce(mockOriginalA1TokenFilePaths); // For original A1 tokens

					// Mock getFilePathParts to return valid structure for all file paths
					mockGetFilePathParts.mockReturnValue(mockFilePathParts);

					// Mock metadata file detection for all files
					mockIsTokenSsotMetaDataFile
						.mockReturnValueOnce(false) // core/colors.json
						.mockReturnValueOnce(false) // core/typography.json
						.mockReturnValueOnce(false) // semantic/light.json
						.mockReturnValueOnce(false) // components/button.json
						.mockReturnValueOnce(true) // $metadata.json
						.mockReturnValueOnce(true); // $themes.json

					await checkForTokenSetExtensionCaseAndPrepare(scenario.folderPath);

					expect(mockCheckFolderExistence).toHaveBeenCalledWith(scenario.folderPath);
					expect(mockLogger.info).toHaveBeenCalledWith(mockFolderFoundMessage);
					expect(mockLoadFilesFromFolder).toHaveBeenCalledWith(scenario.folderPath);
					expect(mockLogger.info).toHaveBeenCalledWith(mockFilesDetectedMessage);
					expect(mockIsTokenSsotMetaDataFile).toHaveBeenCalledTimes(mockOriginalA1TokenFilePaths.length);
					expect(mockCopyFile).toHaveBeenCalledTimes(4); // 4 non-metadata files
				});

				it('should log error and continue when folder does not exist', async () => {
					const scenario = createFolderDoesNotExistScenario();
					mockCheckFolderExistence.mockReturnValue(scenario.folderExists);
					mockLoadFilesFromFolder.mockResolvedValue(scenario.filePaths);

					await checkForTokenSetExtensionCaseAndPrepare(scenario.folderPath);

					expect(mockCheckFolderExistence).toHaveBeenCalledWith(scenario.folderPath);
					expect(mockLogGeneralError).toHaveBeenCalledWith(mockFolderNotExistErrorMessage);
					expect(mockLogger.info).toHaveBeenCalledWith(mockFolderFoundMessage);
					expect(mockLoadFilesFromFolder).toHaveBeenCalledWith(scenario.folderPath);
					// Should not proceed to copy since folder doesn't exist and files are empty
					expect(mockLoadFilesFromFolder).toHaveBeenCalledTimes(1);
				});
			});

			describe('empty folder handling', () => {
				it('should log error and return false when folder is empty', async () => {
					const scenario = createEmptyFolderScenario();
					mockCheckFolderExistence.mockReturnValue(scenario.folderExists);
					mockLoadFilesFromFolder.mockResolvedValue(scenario.filePaths);

					await checkForTokenSetExtensionCaseAndPrepare(scenario.folderPath);

					expect(mockCheckFolderExistence).toHaveBeenCalledWith(scenario.folderPath);
					expect(mockLoadFilesFromFolder).toHaveBeenCalledWith(scenario.folderPath);
					expect(mockLogGeneralError).toHaveBeenCalledWith(mockNoFilesErrorMessage);
					expect(mockLoadFilesFromFolder).toHaveBeenCalledTimes(1); // Should not proceed to copy
				});
			});

			describe('file copying operations', () => {
				it('should copy original A1 token files when extension files exist', async () => {
					const folderScenario = createFolderExistsScenario();
					const copyScenario = createCopyOperationScenario();

					mockCheckFolderExistence.mockReturnValue(folderScenario.folderExists);
					mockLoadFilesFromFolder
						.mockResolvedValueOnce(folderScenario.filePaths) // For extension folder
						.mockResolvedValueOnce(copyScenario.originalFilePaths); // For original A1 tokens

					// Mock metadata file detection
					mockIsTokenSsotMetaDataFile
						.mockReturnValueOnce(false) // core/colors.json
						.mockReturnValueOnce(false) // core/typography.json
						.mockReturnValueOnce(false) // semantic/light.json
						.mockReturnValueOnce(false) // components/button.json
						.mockReturnValueOnce(true) // $metadata.json
						.mockReturnValueOnce(true); // $themes.json

					// Mock file path parts for non-metadata files
					mockGetFilePathParts.mockReturnValue(mockFilePathParts);

					await checkForTokenSetExtensionCaseAndPrepare(folderScenario.folderPath);

					expect(mockLoadFilesFromFolder).toHaveBeenCalledWith(folderScenario.folderPath);
					expect(mockLoadFilesFromFolder).toHaveBeenCalledWith(copyScenario.srcPath);
					expect(mockIsTokenSsotMetaDataFile).toHaveBeenCalledTimes(copyScenario.originalFilePaths.length);

					// Should copy non-metadata files (4 files)
					expect(mockCopyFile).toHaveBeenCalledTimes(4);
					expect(mockPrepareFolder).toHaveBeenCalledTimes(4);
					expect(mockGetFilePathParts).toHaveBeenCalledTimes(4);
				});

				it('should handle metadata files without copying them', async () => {
					const folderScenario = createFolderExistsScenario();
					const metadataFiles = [`${mockSrcPath}/$metadata.json`, `${mockSrcPath}/$themes.json`];

					mockCheckFolderExistence.mockReturnValue(folderScenario.folderExists);
					mockLoadFilesFromFolder
						.mockResolvedValueOnce(folderScenario.filePaths) // For extension folder
						.mockResolvedValueOnce(metadataFiles); // Only metadata files

					// Mock all files as metadata
					mockIsTokenSsotMetaDataFile.mockReturnValue(true);

					await checkForTokenSetExtensionCaseAndPrepare(folderScenario.folderPath);

					expect(mockIsTokenSsotMetaDataFile).toHaveBeenCalledTimes(metadataFiles.length);
					expect(mockCopyFile).not.toHaveBeenCalled();
					expect(mockPrepareFolder).not.toHaveBeenCalled();
					expect(mockGetFilePathParts).not.toHaveBeenCalled();
				});

				it('should handle mixed metadata and non-metadata files', async () => {
					const folderScenario = createFolderExistsScenario();
					const mixedFiles = [`${mockSrcPath}/core/colors.json`, `${mockSrcPath}/$metadata.json`, `${mockSrcPath}/semantic/light.json`];

					mockCheckFolderExistence.mockReturnValue(folderScenario.folderExists);
					mockLoadFilesFromFolder
						.mockResolvedValueOnce(folderScenario.filePaths) // For extension folder
						.mockResolvedValueOnce(mixedFiles); // Mixed files

					// Mock file type detection
					mockIsTokenSsotMetaDataFile
						.mockReturnValueOnce(false) // core/colors.json
						.mockReturnValueOnce(true) // $metadata.json
						.mockReturnValueOnce(false); // semantic/light.json

					mockGetFilePathParts.mockReturnValue(mockFilePathParts);

					await checkForTokenSetExtensionCaseAndPrepare(folderScenario.folderPath);

					expect(mockIsTokenSsotMetaDataFile).toHaveBeenCalledTimes(mixedFiles.length);
					expect(mockCopyFile).toHaveBeenCalledTimes(2); // Only non-metadata files
					expect(mockPrepareFolder).toHaveBeenCalledTimes(2);
					expect(mockGetFilePathParts).toHaveBeenCalledTimes(2);
				});
			});

			describe('file path processing', () => {
				it('should correctly process file paths during copying', async () => {
					const folderScenario = createFolderExistsScenario();
					const testFile = `${mockSrcPath}/core/colors.json`;

					mockCheckFolderExistence.mockReturnValue(folderScenario.folderExists);
					mockLoadFilesFromFolder
						.mockResolvedValueOnce(folderScenario.filePaths) // For extension folder
						.mockResolvedValueOnce([testFile]); // Single test file

					mockIsTokenSsotMetaDataFile.mockReturnValue(false);
					mockGetFilePathParts.mockReturnValue(mockFilePathParts);

					await checkForTokenSetExtensionCaseAndPrepare(folderScenario.folderPath);

					const expectedSubPath = testFile.replace(mockSrcPath, '');
					const expectedNewPath = `${folderScenario.folderPath}${expectedSubPath}`;

					expect(mockGetFilePathParts).toHaveBeenCalledWith(expectedNewPath);
					expect(mockPrepareFolder).toHaveBeenCalledWith(mockFilePathParts.filePathParts.join('/'));
					expect(mockCopyFile).toHaveBeenCalledWith(testFile, expectedNewPath);
				});

				it('should handle different file path structures', async () => {
					const folderScenario = createFolderExistsScenario();
					const nestedFile = `${mockSrcPath}/semantic/color-schemes/dark.json`;
					const customFilePathParts = {
						filePathParts: ['/test', 'dest', 'path', 'semantic', 'color-schemes'],
						fileName: 'dark.json',
					};

					mockCheckFolderExistence.mockReturnValue(folderScenario.folderExists);
					mockLoadFilesFromFolder
						.mockResolvedValueOnce(folderScenario.filePaths) // For extension folder
						.mockResolvedValueOnce([nestedFile]); // Nested file

					mockIsTokenSsotMetaDataFile.mockReturnValue(false);
					mockGetFilePathParts.mockReturnValue(customFilePathParts);

					await checkForTokenSetExtensionCaseAndPrepare(folderScenario.folderPath);

					const expectedSubPath = nestedFile.replace(mockSrcPath, '');
					const expectedNewPath = `${folderScenario.folderPath}${expectedSubPath}`;

					expect(mockGetFilePathParts).toHaveBeenCalledWith(expectedNewPath);
					expect(mockPrepareFolder).toHaveBeenCalledWith(customFilePathParts.filePathParts.join('/'));
					expect(mockCopyFile).toHaveBeenCalledWith(nestedFile, expectedNewPath);
				});
			});

			describe('error handling and edge cases', () => {
				it('should handle loadFilesFromFolder rejection for extension folder', async () => {
					const scenario = createValidExtensionPathScenario();
					const error = new Error('Failed to load extension files');

					mockCheckFolderExistence.mockReturnValue(true);
					mockLoadFilesFromFolder.mockRejectedValue(error);

					await expect(checkForTokenSetExtensionCaseAndPrepare(scenario.extensionPath)).rejects.toThrow('Failed to load extension files');

					expect(mockCheckFolderExistence).toHaveBeenCalledWith(scenario.extensionPath);
					expect(mockLoadFilesFromFolder).toHaveBeenCalledWith(scenario.extensionPath);
				});

				it('should handle loadFilesFromFolder rejection for original A1 tokens', async () => {
					const folderScenario = createFolderExistsScenario();
					const error = new Error('Failed to load original A1 files');

					mockCheckFolderExistence.mockReturnValue(folderScenario.folderExists);
					mockLoadFilesFromFolder
						.mockResolvedValueOnce(folderScenario.filePaths) // Extension folder succeeds
						.mockRejectedValueOnce(error); // Original A1 folder fails

					await expect(checkForTokenSetExtensionCaseAndPrepare(folderScenario.folderPath)).rejects.toThrow(
						'Failed to load original A1 files',
					);

					expect(mockLoadFilesFromFolder).toHaveBeenCalledWith(folderScenario.folderPath);
					expect(mockLoadFilesFromFolder).toHaveBeenCalledWith(mockSrcPath);
				});

				it('should handle empty original A1 token files array', async () => {
					const folderScenario = createFolderExistsScenario();

					mockCheckFolderExistence.mockReturnValue(folderScenario.folderExists);
					mockLoadFilesFromFolder
						.mockResolvedValueOnce(folderScenario.filePaths) // For extension folder
						.mockResolvedValueOnce([]); // Empty original A1 files

					await checkForTokenSetExtensionCaseAndPrepare(folderScenario.folderPath);

					expect(mockIsTokenSsotMetaDataFile).not.toHaveBeenCalled();
					expect(mockCopyFile).not.toHaveBeenCalled();
					expect(mockPrepareFolder).not.toHaveBeenCalled();
				});

				it('should verify tokensSsotFolder is used in src path construction', async () => {
					const folderScenario = createFolderExistsScenario();

					mockCheckFolderExistence.mockReturnValue(folderScenario.folderExists);
					mockLoadFilesFromFolder
						.mockResolvedValueOnce(folderScenario.filePaths) // For extension folder
						.mockResolvedValueOnce([]); // Empty original A1 files for simplicity

					await checkForTokenSetExtensionCaseAndPrepare(folderScenario.folderPath);

					const expectedSrcPath = `node_modules/@allianz/a1-design-tokens-builder/${tokensSsotFolder}`;
					expect(mockLoadFilesFromFolder).toHaveBeenCalledWith(expectedSrcPath);
				});
			});
		});

		describe('integration scenarios', () => {
			it('should complete full workflow with valid extension path and files', async () => {
				const scenario = createValidExtensionPathScenario();
				const copyScenario = createCopyOperationScenario();

				mockCheckFolderExistence.mockReturnValue(true);
				// Use mockExtensionFilePaths (3 files) to match the expected message
				mockLoadFilesFromFolder
					.mockResolvedValueOnce(createFolderExistsScenario().filePaths) // Extension files (3 files)
					.mockResolvedValueOnce(copyScenario.originalFilePaths); // Original A1 files

				// Mock metadata detection explicitly to match the working test pattern
				mockIsTokenSsotMetaDataFile
					.mockReturnValueOnce(false) // core/colors.json
					.mockReturnValueOnce(false) // core/typography.json
					.mockReturnValueOnce(false) // semantic/light.json
					.mockReturnValueOnce(false) // components/button.json
					.mockReturnValueOnce(true) // $metadata.json
					.mockReturnValueOnce(true); // $themes.json

				mockGetFilePathParts.mockReturnValue(mockFilePathParts);

				await checkForTokenSetExtensionCaseAndPrepare(scenario.extensionPath);

				// Verify the complete flow
				expect(mockCheckFolderExistence).toHaveBeenCalledWith(scenario.extensionPath);
				expect(mockLogger.info).toHaveBeenCalledWith(expect.stringContaining('Token SSOT extension folder found'));
				expect(mockLoadFilesFromFolder).toHaveBeenCalledTimes(2);
				expect(mockLogger.info).toHaveBeenCalledWith(expect.stringContaining('Number of detected design token extension files'));
				expect(mockIsTokenSsotMetaDataFile).toHaveBeenCalledTimes(copyScenario.originalFilePaths.length);
				expect(mockCopyFile).toHaveBeenCalledTimes(copyScenario.nonMetadataFiles.length);
			});

			it('should handle workflow with only metadata files', async () => {
				const scenario = createValidExtensionPathScenario();
				const copyScenario = createCopyOperationScenario();

				mockCheckFolderExistence.mockReturnValue(true);
				mockLoadFilesFromFolder
					.mockResolvedValueOnce(['extension-file.json']) // Extension files exist
					.mockResolvedValueOnce(copyScenario.metadataFiles); // Only metadata files

				// Mock all files as metadata
				mockIsTokenSsotMetaDataFile.mockReturnValue(true);

				await checkForTokenSetExtensionCaseAndPrepare(scenario.extensionPath);

				expect(mockIsTokenSsotMetaDataFile).toHaveBeenCalledTimes(copyScenario.metadataFiles.length);
				expect(mockCopyFile).not.toHaveBeenCalled();
				expect(mockPrepareFolder).not.toHaveBeenCalled();
			});
		});
	});
});
