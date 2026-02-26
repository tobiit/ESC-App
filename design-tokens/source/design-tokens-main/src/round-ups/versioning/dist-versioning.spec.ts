import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { artifactBuildPathNpm, initialDistVersion } from '../../shared/index.js';
import { runDistVersioning } from './dist-versioning.js';
import {
	mockComment,
	mockDetermineNewFileVersionFromUserPromptReturn,
	mockDistFolderFiles,
	mockDistHistory,
	mockedAddInitialDistHistoryEntry,
	mockedAddMetaDataToFileHeaderComment,
	mockedCopyDistHistoryToCdnFolder,
	mockedCreateDistHash,
	mockedDetermineNewFileVersionFromUserPrompt,
	mockedDistHistoryEqualToPackageVersion,
	mockedGetLastVersionEntryDetails,
	mockedGetTokenPackageVersion,
	mockedHandleCdnOutputFiles,
	mockedInitDistHistoryObj,
	mockedLoadFilesFromFolder,
	mockedLogger,
	mockedLogHorizontalDivider,
	mockedManualPackageVersionBumpDetected,
	mockedPrepareVersionCheckData,
	mockedSetDistHistoryInfo,
	mockedSetNewVersionInPackageJson,
	mockedWriteDistHistoryFile,
	mockErrorMessage,
	mockGetLastVersionEntryDetailsReturn,
	mockInitDistHistoryObjReturn,
	mockInitDistHistoryObjReturnEmpty,
	mockNewHash,
	mockNewVersion,
	mockPreparedVersionCheckData,
	mockStoredHash,
	mockTokenPackageVersion,
} from './dist-versioning.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock all shared functions
jest.mock('../../shared/index.js', () => {
	const actual: object = jest.requireActual('../../shared/index.js');
	return {
		...actual,
		loadFilesFromFolder: jest.fn(),
		getTokenPackageVersion: jest.fn(),
		setNewVersionInPackageJson: jest.fn(),
		logHorizontalDivider: jest.fn(),
		artifactBuildPathNpm: '/path/to/build/npm',
		initialDistVersion: '0.0.1',
	};
});
// Mock all helper functions
jest.mock('./helpers/index.js', () => {
	return {
		initDistHistoryObj: jest.fn(),
		createDistHash: jest.fn(),
		addInitialDistHistoryEntry: jest.fn(),
		getLastVersionEntryDetails: jest.fn(),
		determineNewFileVersionFromUserPrompt: jest.fn(),
		setDistHistoryInfo: jest.fn(),
		writeDistHistoryFile: jest.fn(),
		manualPackageVersionBumpDetected: jest.fn(),
		distHistoryEqualToPackageVersion: jest.fn(),
		addMetaDataToFileHeaderComment: jest.fn(),
		prepareVersionCheckData: jest.fn(),
		handleCdnOutputFiles: jest.fn(),
		copyDistHistoryToCdnFolder: jest.fn(),
	};
});

// Note: Logger mocking (suppressLoggerOutput/restoreLoggerMocks) is automatically handled by src/shared/testing/test-helpers.mock.spec.ts via jest.config.ts setupFilesAfterEnv
describe('dist-versioning', () => {
	beforeEach(() => {
		jest.clearAllMocks();

		// Setup default mock returns
		mockedLoadFilesFromFolder.mockResolvedValue(mockDistFolderFiles);
		mockedGetTokenPackageVersion.mockReturnValue(mockTokenPackageVersion);
		mockedInitDistHistoryObj.mockReturnValue(mockInitDistHistoryObjReturn);
		mockedCreateDistHash.mockResolvedValue(mockNewHash);
		mockedGetLastVersionEntryDetails.mockReturnValue(mockGetLastVersionEntryDetailsReturn);
		mockedPrepareVersionCheckData.mockReturnValue(mockPreparedVersionCheckData);
		mockedDetermineNewFileVersionFromUserPrompt.mockResolvedValue(mockDetermineNewFileVersionFromUserPromptReturn);
	});

	describe('runDistVersioning', () => {
		describe('when files have changed (new version bump scenario)', () => {
			beforeEach(() => {
				// Mock a different hash to simulate file changes
				mockedCreateDistHash.mockResolvedValue('different-hash');
				mockedGetLastVersionEntryDetails.mockReturnValue({
					storedHash: mockStoredHash,
					storedVersion: '1.2.0',
				});
			});

			it('should handle new version bump scenario correctly', async () => {
				await runDistVersioning();

				// Verify setup calls
				expect(mockedLogHorizontalDivider).toHaveBeenCalledTimes(1);
				expect(mockedLogger.start).toHaveBeenCalledWith('Scanning generated output files for changes and new files.');
				expect(mockedLoadFilesFromFolder).toHaveBeenCalledWith(artifactBuildPathNpm);
				expect(mockedInitDistHistoryObj).toHaveBeenCalledTimes(1);
				expect(mockedGetTokenPackageVersion).toHaveBeenCalledTimes(1);
				expect(mockedCreateDistHash).toHaveBeenCalledWith(mockDistFolderFiles);

				// Verify change detection
				expect(mockedGetLastVersionEntryDetails).toHaveBeenCalledWith(mockDistHistory.distFolderHistory);
				expect(mockedLogger.warn).toHaveBeenCalledWith('The dist has been changed!');
				expect(mockedLogger.warn).toHaveBeenCalledWith('Design token output file changes detected!');

				// Verify version bump process
				expect(mockedDetermineNewFileVersionFromUserPrompt).toHaveBeenCalledWith(mockTokenPackageVersion);
				expect(mockedSetDistHistoryInfo).toHaveBeenCalledWith(mockDistHistory, {
					version: mockNewVersion,
					comment: mockComment,
					hash: 'different-hash',
				});
				expect(mockedWriteDistHistoryFile).toHaveBeenCalledWith(mockDistHistory);
				expect(mockedSetNewVersionInPackageJson).toHaveBeenCalledWith(mockNewVersion);

				// Verify file comment updates
				expect(mockedAddMetaDataToFileHeaderComment).toHaveBeenCalledTimes(mockDistFolderFiles.length);
				expect(mockedPrepareVersionCheckData).toHaveBeenCalledTimes(mockDistFolderFiles.length);
				expect(mockedHandleCdnOutputFiles).toHaveBeenCalledTimes(mockDistFolderFiles.length);

				// Verify success message
				expect(mockedLogger.success).toHaveBeenCalledWith(
					'Updated dist-history.json file, added version to design token output files and updated version in package.json.',
				);
			});
		});

		describe('when dist is new (no existing history)', () => {
			beforeEach(() => {
				mockedInitDistHistoryObj.mockReturnValue(mockInitDistHistoryObjReturnEmpty);
				// Mock detectDistChanges to trigger new version bump when no history exists
				mockedCreateDistHash.mockResolvedValue(mockNewHash);
			});

			it('should handle new dist scenario correctly', async () => {
				await runDistVersioning();

				expect(mockedLogger.warn).toHaveBeenCalledWith('The dist is new!');
				expect(mockedAddInitialDistHistoryEntry).toHaveBeenCalledWith(
					null as unknown as Parameters<typeof mockedAddInitialDistHistoryEntry>[0],
					mockNewHash,
					initialDistVersion,
				);
				expect(mockedDetermineNewFileVersionFromUserPrompt).toHaveBeenCalledWith(mockTokenPackageVersion);
				expect(mockedLogger.warn).toHaveBeenCalledWith('Design token output file changes detected!');
			});
		});

		describe('when no file changes but manual package version bump detected', () => {
			beforeEach(() => {
				// Mock same hash to simulate no file changes
				mockedCreateDistHash.mockResolvedValue(mockStoredHash);
				mockedManualPackageVersionBumpDetected.mockReturnValue(true);
				mockedDistHistoryEqualToPackageVersion.mockReturnValue(false);
			});

			it('should handle manual version bump scenario correctly', async () => {
				await runDistVersioning();

				expect(mockedManualPackageVersionBumpDetected).toHaveBeenCalledWith(mockTokenPackageVersion, mockDistHistory);
				expect(mockedLogger.warn).toHaveBeenCalledWith(`Manual package version bump detected (v${mockTokenPackageVersion})!`);

				// Verify manual version bump process
				expect(mockedSetDistHistoryInfo).toHaveBeenCalledWith(mockDistHistory, {
					version: mockTokenPackageVersion,
					comment: 'Manual Package Version Bump',
					hash: mockStoredHash,
				});
				expect(mockedWriteDistHistoryFile).toHaveBeenCalledWith(mockDistHistory);
				expect(mockedLogger.success).toHaveBeenCalledWith(
					`Updated dist-history.json file and added version v${mockTokenPackageVersion} to package-lock.json and design token output files.`,
				);
			});
		});

		describe('when no changes and package version equals dist history version', () => {
			beforeEach(() => {
				// Mock same hash to simulate no file changes
				mockedCreateDistHash.mockResolvedValue(mockStoredHash);
				mockedManualPackageVersionBumpDetected.mockReturnValue(false);
				mockedDistHistoryEqualToPackageVersion.mockReturnValue(true);
			});

			it('should handle CI/CD scenario correctly', async () => {
				await runDistVersioning();

				expect(mockedDistHistoryEqualToPackageVersion).toHaveBeenCalledWith(mockTokenPackageVersion, mockDistHistory);
				expect(mockedLogger.warn).toHaveBeenCalledWith('No file changes and no manual package version bump detected!');

				// Verify CI/CD process
				expect(mockedCopyDistHistoryToCdnFolder).toHaveBeenCalledWith(mockDistHistory);
				expect(mockedLogger.success).toHaveBeenCalledWith(
					`Only added existing version v${mockTokenPackageVersion} to design token output files.`,
				);

				// Verify file comment updates with existing version
				expect(mockedAddMetaDataToFileHeaderComment).toHaveBeenCalledTimes(mockDistFolderFiles.length);
				mockDistFolderFiles.forEach(file => {
					expect(mockedAddMetaDataToFileHeaderComment).toHaveBeenCalledWith(file, mockTokenPackageVersion);
				});
			});
		});

		describe('when versioning error occurs', () => {
			beforeEach(() => {
				// Mock same hash to simulate no file changes
				mockedCreateDistHash.mockResolvedValue(mockStoredHash);
				mockedManualPackageVersionBumpDetected.mockReturnValue(false);
				mockedDistHistoryEqualToPackageVersion.mockReturnValue(false);
			});

			it('should throw error for versioning mismatch', async () => {
				await expect(runDistVersioning()).rejects.toThrow(mockErrorMessage);

				expect(mockedLogger.error).toHaveBeenCalledWith(mockErrorMessage);
			});
		});

		describe('edge cases', () => {
			it('should handle empty file list', async () => {
				mockedLoadFilesFromFolder.mockResolvedValue([]);
				mockedCreateDistHash.mockResolvedValue('empty-hash');
				mockedGetLastVersionEntryDetails.mockReturnValue({
					storedHash: 'different-hash',
					storedVersion: '1.2.0',
				});

				await runDistVersioning();

				expect(mockedCreateDistHash).toHaveBeenCalledWith([]);
				expect(mockedDetermineNewFileVersionFromUserPrompt).toHaveBeenCalled();
			});

			it('should handle undefined distHistory', async () => {
				mockedInitDistHistoryObj.mockReturnValue({
					distHistory: undefined as unknown as typeof mockDistHistory,
					distHistoryExists: false,
				});

				await runDistVersioning();

				expect(mockedLogger.warn).toHaveBeenCalledWith('The dist is new!');
				expect(mockedAddInitialDistHistoryEntry).toHaveBeenCalled();
			});
		});
	});

	describe('integration with helper functions', () => {
		it('should call all helper functions with correct parameters', async () => {
			// Mock different hash to trigger version bump
			mockedCreateDistHash.mockResolvedValue('new-hash');

			await runDistVersioning();

			// Verify all helper functions are called with correct parameters
			expect(mockedLoadFilesFromFolder).toHaveBeenCalledWith(artifactBuildPathNpm);
			expect(mockedCreateDistHash).toHaveBeenCalledWith(mockDistFolderFiles);
			expect(mockedGetLastVersionEntryDetails).toHaveBeenCalledWith(mockDistHistory.distFolderHistory);
			expect(mockedDetermineNewFileVersionFromUserPrompt).toHaveBeenCalledWith(mockTokenPackageVersion);

			// Verify file processing for each file
			mockDistFolderFiles.forEach(file => {
				expect(mockedAddMetaDataToFileHeaderComment).toHaveBeenCalledWith(file, mockNewVersion);
				expect(mockedPrepareVersionCheckData).toHaveBeenCalledWith(file);
				expect(mockedHandleCdnOutputFiles).toHaveBeenCalledWith(file, mockPreparedVersionCheckData, mockNewVersion);
			});
		});

		it('should handle async operations correctly', async () => {
			// Mock async functions with delays
			mockedLoadFilesFromFolder.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(mockDistFolderFiles), 10)));
			mockedCreateDistHash.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve('async-hash'), 10)));
			mockedDetermineNewFileVersionFromUserPrompt.mockImplementation(
				() => new Promise(resolve => setTimeout(() => resolve(mockDetermineNewFileVersionFromUserPromptReturn), 10)),
			);

			await runDistVersioning();

			expect(mockedLoadFilesFromFolder).toHaveBeenCalled();
			expect(mockedCreateDistHash).toHaveBeenCalled();
			expect(mockedDetermineNewFileVersionFromUserPrompt).toHaveBeenCalled();
		});
	});
});
