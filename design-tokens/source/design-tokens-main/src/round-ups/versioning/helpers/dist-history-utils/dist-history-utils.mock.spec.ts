import { jest } from '@jest/globals';
import { readJsonFile, writeJsonFile } from '../../../../shared/index.js';
import { DistHistory, DistHistoryEntry } from '../../types/index.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Type the mocked functions
export const mockedReadJsonFile = readJsonFile as jest.MockedFunction<typeof readJsonFile>;
export const mockedWriteJsonFile = writeJsonFile as jest.MockedFunction<typeof writeJsonFile>;

// Mock shared constants for testing
export const mockTokenDistHistoryFilePath = 'token-package/dist-history.json';
export const mockTokenPackagePath = 'token-package';
export const mockCdnArtifactFolderName = 'cdn/tokens';
export const mockTokenDistHistoryFilename = 'dist-history.json';
export const mockCdnDistHistoryFilePath = 'token-package/cdn/tokens/dist-history.json';

// Mock version and hash data
export const mockVersion = '1.2.3';
export const mockHash = 'abc123def456ghi789';
export const mockComment = 'Added new features and improvements';
export const mockInitComment = 'init';
export const mockUpdatedDate = '2025-07-07T12:00:00.000Z';

// Mock DistHistoryEntry objects
export const mockDistHistoryEntry1: DistHistoryEntry = {
	version: '1.0.0',
	hash: 'hash-1-0-0',
	comment: 'Initial release',
	updated: '2025-01-01T00:00:00.000Z',
};

export const mockDistHistoryEntry2: DistHistoryEntry = {
	version: '1.1.0',
	hash: 'hash-1-1-0',
	comment: 'Minor updates',
	updated: '2025-02-01T00:00:00.000Z',
};

export const mockDistHistoryEntry3: DistHistoryEntry = {
	version: '1.2.3',
	hash: 'hash-1-2-3',
	comment: 'Bug fixes and improvements',
	updated: '2025-03-01T00:00:00.000Z',
};

export const mockNewDistHistoryEntry: DistHistoryEntry = {
	version: mockVersion,
	hash: mockHash,
	comment: mockComment,
};

export const mockNewDistHistoryEntryWithUpdated: DistHistoryEntry = {
	version: mockVersion,
	hash: mockHash,
	comment: mockComment,
	updated: mockUpdatedDate,
};

// Mock incomplete DistHistoryEntry objects for validation testing
export const mockIncompleteEntryNoVersion: Partial<DistHistoryEntry> = {
	hash: mockHash,
	comment: mockComment,
};

export const mockIncompleteEntryNoHash: Partial<DistHistoryEntry> = {
	version: mockVersion,
	comment: mockComment,
};

export const mockIncompleteEntryNoComment: Partial<DistHistoryEntry> = {
	version: mockVersion,
	hash: mockHash,
};

export const mockEmptyEntry: Partial<DistHistoryEntry> = {};

// Mock DistHistory objects
export const mockDistHistoryEmpty: DistHistory = {
	distFolderHistory: [],
};

export const mockDistHistorySingleEntry: DistHistory = {
	distFolderHistory: [mockDistHistoryEntry1],
};

export const mockDistHistoryMultipleEntries: DistHistory = {
	distFolderHistory: [mockDistHistoryEntry1, mockDistHistoryEntry2, mockDistHistoryEntry3],
};

export const mockDistHistoryAfterAdd: DistHistory = {
	distFolderHistory: [mockDistHistoryEntry1, mockDistHistoryEntry2, mockDistHistoryEntry3, mockNewDistHistoryEntryWithUpdated],
};

// Mock arrays of DistHistoryEntry for testing getLastVersionEntryDetails
export const mockSingleEntryArray: Array<DistHistoryEntry> = [mockDistHistoryEntry1];
export const mockMultipleEntriesArray: Array<DistHistoryEntry> = [mockDistHistoryEntry1, mockDistHistoryEntry2, mockDistHistoryEntry3];

// Mock expected return values
export const mockLastVersionDetails = {
	storedHash: mockDistHistoryEntry3.hash,
	storedVersion: mockDistHistoryEntry3.version,
};

export const mockSingleVersionDetails = {
	storedHash: mockDistHistoryEntry1.hash,
	storedVersion: mockDistHistoryEntry1.version,
};

export const mockInitDistHistoryResult = {
	distHistory: mockDistHistoryEmpty,
	distHistoryExists: false,
};

export const mockInitDistHistoryResultExists = {
	distHistory: mockDistHistoryMultipleEntries,
	distHistoryExists: true,
};

// Mock Date for consistent testing
export const mockDateISOString = mockUpdatedDate;

// Factory functions for creating test data
export const createMockDistHistoryEntry = (version: string, hash: string, comment: string, updated?: string): DistHistoryEntry => {
	return {
		version,
		hash,
		comment,
		updated: updated || new Date().toISOString(),
	};
};

export const createMockDistHistory = (entries: DistHistoryEntry[]): DistHistory => {
	return { distFolderHistory: entries };
};

export const createMockDistHistoryEntryArray = (count: number): Array<DistHistoryEntry> => {
	const entries: Array<DistHistoryEntry> = [];
	for (let i = 1; i <= count; i++) {
		entries.push(createMockDistHistoryEntry(`1.${i}.0`, `hash-${i}`, `Comment ${i}`));
	}
	return entries;
};

// ========================================
// TYPED MOCK SETUP HELPER
// ========================================

/**
 * Type definitions for all mocked functions
 */
export interface MockedFunctions {
	// Shared functions
	mockedReadJsonFile: jest.MockedFunction<typeof readJsonFile>;
	mockedWriteJsonFile: jest.MockedFunction<typeof writeJsonFile>;
}

/**
 * Helper function to set up typed mock functions
 * Call this after jest.mock() calls to get properly typed mocks
 */
export const setupTypedMocks = (): MockedFunctions => {
	return {
		// Shared functions
		mockedReadJsonFile: readJsonFile as jest.MockedFunction<typeof readJsonFile>,
		mockedWriteJsonFile: writeJsonFile as jest.MockedFunction<typeof writeJsonFile>,
	};
};

/**
 * Helper function to set up default mock return values
 * Call this in beforeEach to configure common mock behaviors
 */
export const setupDefaultMockReturns = (mocks: MockedFunctions): void => {
	mocks.mockedReadJsonFile.mockReturnValue(mockDistHistoryMultipleEntries);
	mocks.mockedWriteJsonFile.mockImplementation(() => {
		// Empty implementation for mock
	});
};

/**
 * Helper function to mock Date.prototype.toISOString for consistent timestamps
 */
export const setupMockDate = (): ReturnType<typeof jest.spyOn> =>
	jest.spyOn(Date.prototype, 'toISOString').mockReturnValue(mockDateISOString);

/**
 * Helper function to restore Date mock
 */
export const restoreMockDate = (dateSpy: ReturnType<typeof jest.spyOn>): void => {
	dateSpy.mockRestore();
};
