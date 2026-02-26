import { jest } from '@jest/globals';
import {
	getTokenPackageVersion,
	loadFilesFromFolder,
	logger,
	logHorizontalDivider,
	setNewVersionInPackageJson,
} from '../../shared/index.js';
import {
	addInitialDistHistoryEntry,
	addMetaDataToFileHeaderComment,
	copyDistHistoryToCdnFolder,
	createDistHash,
	determineNewFileVersionFromUserPrompt,
	distHistoryEqualToPackageVersion,
	getLastVersionEntryDetails,
	handleCdnOutputFiles,
	initDistHistoryObj,
	manualPackageVersionBumpDetected,
	prepareVersionCheckData,
	setDistHistoryInfo,
	writeDistHistoryFile,
} from './helpers/index.js';
import { DistHistory, DistHistoryEntry } from './types/index.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Type the mocked functions
export const mockedLoadFilesFromFolder = loadFilesFromFolder as jest.MockedFunction<typeof loadFilesFromFolder>;
export const mockedGetTokenPackageVersion = getTokenPackageVersion as jest.MockedFunction<typeof getTokenPackageVersion>;
export const mockedSetNewVersionInPackageJson = setNewVersionInPackageJson as jest.MockedFunction<typeof setNewVersionInPackageJson>;
export const mockedLogHorizontalDivider = logHorizontalDivider as jest.MockedFunction<typeof logHorizontalDivider>;
export const mockedLogger = logger as jest.Mocked<typeof logger>;
export const mockedInitDistHistoryObj = initDistHistoryObj as jest.MockedFunction<typeof initDistHistoryObj>;
export const mockedCreateDistHash = createDistHash as jest.MockedFunction<typeof createDistHash>;
export const mockedAddInitialDistHistoryEntry = addInitialDistHistoryEntry as jest.MockedFunction<typeof addInitialDistHistoryEntry>;
export const mockedGetLastVersionEntryDetails = getLastVersionEntryDetails as jest.MockedFunction<typeof getLastVersionEntryDetails>;
export const mockedDetermineNewFileVersionFromUserPrompt = determineNewFileVersionFromUserPrompt as jest.MockedFunction<
	typeof determineNewFileVersionFromUserPrompt
>;
export const mockedSetDistHistoryInfo = setDistHistoryInfo as jest.MockedFunction<typeof setDistHistoryInfo>;
export const mockedWriteDistHistoryFile = writeDistHistoryFile as jest.MockedFunction<typeof writeDistHistoryFile>;
export const mockedManualPackageVersionBumpDetected = manualPackageVersionBumpDetected as jest.MockedFunction<
	typeof manualPackageVersionBumpDetected
>;
export const mockedDistHistoryEqualToPackageVersion = distHistoryEqualToPackageVersion as jest.MockedFunction<
	typeof distHistoryEqualToPackageVersion
>;
export const mockedAddMetaDataToFileHeaderComment = addMetaDataToFileHeaderComment as jest.MockedFunction<
	typeof addMetaDataToFileHeaderComment
>;
export const mockedPrepareVersionCheckData = prepareVersionCheckData as jest.MockedFunction<typeof prepareVersionCheckData>;
export const mockedHandleCdnOutputFiles = handleCdnOutputFiles as jest.MockedFunction<typeof handleCdnOutputFiles>;
export const mockedCopyDistHistoryToCdnFolder = copyDistHistoryToCdnFolder as jest.MockedFunction<typeof copyDistHistoryToCdnFolder>;

// Mock file paths
export const mockDistFolderFiles = ['/path/to/dist/file1.css', '/path/to/dist/file2.css', '/path/to/dist/file3.css'];

export const mockTokenPackageVersion = '1.2.3';
export const mockNewVersion = '1.3.0';
export const mockComment = 'Added new features';
export const mockNewHash = 'abc123def456';
export const mockStoredHash = 'old456hash789';

// Mock DistHistory objects
export const mockDistHistoryEntry: DistHistoryEntry = {
	version: '1.2.0',
	comment: 'Previous version',
	hash: mockStoredHash,
	updated: '2025-01-01T00:00:00Z',
};

export const mockDistHistory: DistHistory = {
	distFolderHistory: [mockDistHistoryEntry],
};

export const mockEmptyDistHistory: DistHistory = {
	distFolderHistory: [],
};

// Mock return values for helper functions
export const mockInitDistHistoryObjReturn = {
	distHistory: mockDistHistory,
	distHistoryExists: true,
};

export const mockInitDistHistoryObjReturnEmpty = {
	distHistory: null as unknown as DistHistory,
	distHistoryExists: false,
};

export const mockGetLastVersionEntryDetailsReturn = {
	storedHash: mockStoredHash,
	storedVersion: '1.2.0',
};

export const mockPreparedVersionCheckData = {
	tokenOutputFullFilePath: '/path/to/dist/file1.css',
	tokenOutputFilePathParts: ['path', 'to', 'dist', 'file1.css'],
	platform: 'web',
	brand: 'allianz',
	file: 'file1.css',
	initialDistVersion: '0.0.1',
};

export const mockDetermineNewFileVersionFromUserPromptReturn = {
	newVersion: mockNewVersion,
	comment: mockComment,
};

// Mock error scenarios
export const mockErrorMessage =
	'Something went wrong with the versioning! Possibly lower token-package/package.json version than in token-package/dist-history.json!?';

// Mock constants
export const mockArtifactBuildPathNpm = '/path/to/build/npm';
export const mockInitialDistVersion = '0.0.1';
