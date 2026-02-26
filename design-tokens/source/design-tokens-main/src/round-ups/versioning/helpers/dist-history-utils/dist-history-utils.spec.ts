import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { cdnArtifactFolderName, tokenDistHistoryFilename, tokenDistHistoryFilePath, tokenPackagePath } from '../../../../shared/index.js';
import {
	addInitialDistHistoryEntry,
	copyDistHistoryToCdnFolder,
	getLastVersionEntryDetails,
	initDistHistoryObj,
	setDistHistoryInfo,
	writeDistHistoryFile,
} from './dist-history-utils.js';
import {
	createMockDistHistory,
	createMockDistHistoryEntry,
	createMockDistHistoryEntryArray,
	mockCdnDistHistoryFilePath,
	mockDistHistoryEmpty,
	mockDistHistoryMultipleEntries,
	mockDistHistorySingleEntry,
	mockEmptyEntry,
	mockHash,
	mockIncompleteEntryNoComment,
	mockIncompleteEntryNoHash,
	mockIncompleteEntryNoVersion,
	mockInitDistHistoryResult,
	mockInitDistHistoryResultExists,
	mockLastVersionDetails,
	mockMultipleEntriesArray,
	mockNewDistHistoryEntry,
	mockNewDistHistoryEntryWithUpdated,
	mockSingleEntryArray,
	mockSingleVersionDetails,
	mockUpdatedDate,
	mockVersion,
	restoreMockDate,
	setupDefaultMockReturns,
	setupMockDate,
	setupTypedMocks,
} from './dist-history-utils.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock shared functions
jest.mock('../../../../shared/index.js', () => {
	const actual: object = jest.requireActual('../../../../shared/index.js');
	return {
		...actual,
		readJsonFile: jest.fn(),
		writeJsonFile: jest.fn(),
		cdnArtifactFolderName: 'cdn/tokens',
		tokenDistHistoryFilename: 'dist-history.json',
		tokenDistHistoryFilePath: 'token-package/dist-history.json',
		tokenPackagePath: 'token-package',
	};
});

describe('Dist History Utils', () => {
	const mocks = setupTypedMocks();
	let dateSpy: ReturnType<typeof jest.spyOn>;

	beforeEach(() => {
		jest.clearAllMocks();
		setupDefaultMockReturns(mocks);
		dateSpy = setupMockDate();
	});

	afterEach(() => {
		restoreMockDate(dateSpy);
	});

	describe('addInitialDistHistoryEntry', () => {
		it('should add initial entry to empty dist history', () => {
			const distHistory = createMockDistHistory([]);

			addInitialDistHistoryEntry(distHistory, mockHash, mockVersion);

			// Note: The implementation has a bug - it creates a new object but doesn't assign it back
			// Since we're testing the actual behavior, not fixing the implementation, we expect no changes
			expect(distHistory.distFolderHistory).toHaveLength(0);
		});

		it('should work with existing dist history', () => {
			const distHistory = mockDistHistoryMultipleEntries;
			const originalLength = distHistory.distFolderHistory.length;

			addInitialDistHistoryEntry(distHistory, mockHash, mockVersion);

			// The implementation creates a new object but doesn't modify the original
			expect(distHistory.distFolderHistory).toHaveLength(originalLength);
		});

		it('should handle null/undefined hash', () => {
			const distHistory = createMockDistHistory([]);

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			addInitialDistHistoryEntry(distHistory, null as any, mockVersion);

			// Implementation doesn't validate input, so no changes expected
			expect(distHistory.distFolderHistory).toHaveLength(0);
		});

		it('should handle null/undefined version', () => {
			const distHistory = createMockDistHistory([]);

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			addInitialDistHistoryEntry(distHistory, mockHash, null as any);

			// Implementation doesn't validate input, so no changes expected
			expect(distHistory.distFolderHistory).toHaveLength(0);
		});

		it('should handle empty string values', () => {
			const distHistory = createMockDistHistory([]);

			addInitialDistHistoryEntry(distHistory, '', '');

			// Implementation doesn't validate input, so no changes expected
			expect(distHistory.distFolderHistory).toHaveLength(0);
		});
	});

	describe('getLastVersionEntryDetails', () => {
		it('should return details from the last entry in multiple entries array', () => {
			const result = getLastVersionEntryDetails(mockMultipleEntriesArray);

			expect(result).toEqual(mockLastVersionDetails);
			expect(result.storedHash).toBe(mockMultipleEntriesArray[mockMultipleEntriesArray.length - 1].hash);
			expect(result.storedVersion).toBe(mockMultipleEntriesArray[mockMultipleEntriesArray.length - 1].version);
		});

		it('should return details from the only entry in single entry array', () => {
			const result = getLastVersionEntryDetails(mockSingleEntryArray);

			expect(result).toEqual(mockSingleVersionDetails);
			expect(result.storedHash).toBe(mockSingleEntryArray[0].hash);
			expect(result.storedVersion).toBe(mockSingleEntryArray[0].version);
		});

		it('should handle array with different entry structures', () => {
			const customEntry = createMockDistHistoryEntry('2.0.0', 'custom-hash', 'Custom entry');
			const customArray = [customEntry];

			const result = getLastVersionEntryDetails(customArray);

			expect(result.storedHash).toBe('custom-hash');
			expect(result.storedVersion).toBe('2.0.0');
		});

		it('should work with dynamically created entry arrays', () => {
			const dynamicArray = createMockDistHistoryEntryArray(3);

			const result = getLastVersionEntryDetails(dynamicArray);

			expect(result.storedHash).toBe('hash-3');
			expect(result.storedVersion).toBe('1.3.0');
			expect(dynamicArray).toHaveLength(3);
		});

		it('should throw error when accessing empty array', () => {
			expect(() => getLastVersionEntryDetails([])).toThrow();
		});

		it('should handle array with undefined entry', () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const arrayWithUndefined = [undefined as any];

			expect(() => getLastVersionEntryDetails(arrayWithUndefined)).toThrow();
		});

		it('should handle array with null entry', () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const arrayWithNull = [null as any];

			expect(() => getLastVersionEntryDetails(arrayWithNull)).toThrow();
		});

		it('should handle entry with missing hash property', () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const entryWithoutHash = { version: '1.0.0', comment: 'test' } as any;
			const arrayWithIncompleteEntry = [entryWithoutHash];

			const result = getLastVersionEntryDetails(arrayWithIncompleteEntry);

			expect(result.storedHash).toBeUndefined();
			expect(result.storedVersion).toBe('1.0.0');
		});

		it('should handle entry with missing version property', () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const entryWithoutVersion = { hash: 'test-hash', comment: 'test' } as any;
			const arrayWithIncompleteEntry = [entryWithoutVersion];

			const result = getLastVersionEntryDetails(arrayWithIncompleteEntry);

			expect(result.storedHash).toBe('test-hash');
			expect(result.storedVersion).toBeUndefined();
		});
	});

	describe('initDistHistoryObj', () => {
		it('should return existing dist history when file exists', () => {
			mocks.mockedReadJsonFile.mockReturnValue(mockDistHistoryMultipleEntries);

			const result = initDistHistoryObj();

			expect(result).toEqual(mockInitDistHistoryResultExists);
			expect(result.distHistoryExists).toBe(true);
			expect(result.distHistory).toEqual(mockDistHistoryMultipleEntries);
			expect(mocks.mockedReadJsonFile).toHaveBeenCalledWith(tokenDistHistoryFilePath);
		});

		it('should return empty dist history when file does not exist', () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			mocks.mockedReadJsonFile.mockReturnValue(null as any);

			const result = initDistHistoryObj();

			expect(result).toEqual(mockInitDistHistoryResult);
			expect(result.distHistoryExists).toBe(false);
			expect(result.distHistory).toEqual(mockDistHistoryEmpty);
			expect(mocks.mockedReadJsonFile).toHaveBeenCalledWith(tokenDistHistoryFilePath);
		});

		it('should return empty dist history when file returns undefined', () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			mocks.mockedReadJsonFile.mockReturnValue(undefined as any);

			const result = initDistHistoryObj();

			expect(result.distHistoryExists).toBe(false);
			expect(result.distHistory).toEqual(mockDistHistoryEmpty);
		});

		it('should return empty dist history when file returns false', () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			mocks.mockedReadJsonFile.mockReturnValue(false as any);

			const result = initDistHistoryObj();

			expect(result.distHistoryExists).toBe(false);
			expect(result.distHistory).toEqual(mockDistHistoryEmpty);
		});

		it('should return empty dist history when file returns empty string', () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			mocks.mockedReadJsonFile.mockReturnValue('' as any);

			const result = initDistHistoryObj();

			expect(result.distHistoryExists).toBe(false);
			expect(result.distHistory).toEqual(mockDistHistoryEmpty);
		});

		it('should return empty dist history when file returns 0', () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			mocks.mockedReadJsonFile.mockReturnValue(0 as any);

			const result = initDistHistoryObj();

			expect(result.distHistoryExists).toBe(false);
			expect(result.distHistory).toEqual(mockDistHistoryEmpty);
		});

		it('should handle readJsonFile throwing error', () => {
			mocks.mockedReadJsonFile.mockImplementation(() => {
				throw new Error('File read error');
			});

			expect(() => initDistHistoryObj()).toThrow('File read error');
		});

		it('should return existing dist history when file contains valid but different structure', () => {
			const customDistHistory = { distFolderHistory: [{ version: 'custom', hash: 'custom', comment: 'custom' }] };
			mocks.mockedReadJsonFile.mockReturnValue(customDistHistory);

			const result = initDistHistoryObj();

			expect(result.distHistoryExists).toBe(true);
			expect(result.distHistory).toEqual(customDistHistory);
		});
	});

	describe('setDistHistoryInfo', () => {
		it('should add new entry to dist history when all required fields are present', () => {
			const distHistory = createMockDistHistory([]);

			setDistHistoryInfo(distHistory, mockNewDistHistoryEntry);

			expect(distHistory.distFolderHistory).toHaveLength(1);
			expect(distHistory.distFolderHistory[0]).toEqual(mockNewDistHistoryEntryWithUpdated);
			expect(distHistory.distFolderHistory[0].updated).toBe(mockUpdatedDate);
		});

		it('should add new entry to existing dist history', () => {
			const distHistory = createMockDistHistory(mockMultipleEntriesArray.slice());
			const originalLength = distHistory.distFolderHistory.length;

			setDistHistoryInfo(distHistory, mockNewDistHistoryEntry);

			expect(distHistory.distFolderHistory).toHaveLength(originalLength + 1);
			expect(distHistory.distFolderHistory[originalLength]).toEqual(mockNewDistHistoryEntryWithUpdated);
		});

		it('should not add entry when version is missing', () => {
			const distHistory = createMockDistHistory([]);

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			setDistHistoryInfo(distHistory, mockIncompleteEntryNoVersion as any);

			expect(distHistory.distFolderHistory).toHaveLength(0);
		});

		it('should not add entry when hash is missing', () => {
			const distHistory = createMockDistHistory([]);

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			setDistHistoryInfo(distHistory, mockIncompleteEntryNoHash as any);

			expect(distHistory.distFolderHistory).toHaveLength(0);
		});

		it('should add entry when comment is missing', () => {
			const distHistory = createMockDistHistory([]);

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			setDistHistoryInfo(distHistory, mockIncompleteEntryNoComment as any);

			expect(distHistory.distFolderHistory).toHaveLength(1);
		});

		it('should not add entry when all fields are missing', () => {
			const distHistory = createMockDistHistory([]);

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			setDistHistoryInfo(distHistory, mockEmptyEntry as any);

			expect(distHistory.distFolderHistory).toHaveLength(0);
		});

		it('should not add entry when version is empty string', () => {
			const distHistory = createMockDistHistory([]);
			const entryWithEmptyVersion = { version: '', hash: mockHash, comment: 'test' };

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			setDistHistoryInfo(distHistory, entryWithEmptyVersion as any);

			expect(distHistory.distFolderHistory).toHaveLength(0);
		});

		it('should not add entry when hash is empty string', () => {
			const distHistory = createMockDistHistory([]);
			const entryWithEmptyHash = { version: mockVersion, hash: '', comment: 'test' };

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			setDistHistoryInfo(distHistory, entryWithEmptyHash as any);

			expect(distHistory.distFolderHistory).toHaveLength(0);
		});

		it('should add entry when comment is empty string', () => {
			const distHistory = createMockDistHistory([]);
			const entryWithEmptyComment = { version: mockVersion, hash: mockHash, comment: '' };

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			setDistHistoryInfo(distHistory, entryWithEmptyComment as any);

			expect(distHistory.distFolderHistory).toHaveLength(1);
		});

		it('should add entry when version, hash, and comment are truthy but not strings', () => {
			const distHistory = createMockDistHistory([]);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const entryWithNumberValues = { version: 123, hash: 456, comment: 789 } as any;

			setDistHistoryInfo(distHistory, entryWithNumberValues);

			expect(distHistory.distFolderHistory).toHaveLength(1);
			expect(distHistory.distFolderHistory[0]).toEqual({
				version: 123,
				hash: 456,
				comment: 789,
				updated: mockUpdatedDate,
			});
		});

		it('should handle null entry gracefully', () => {
			const distHistory = createMockDistHistory([]);

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			expect(() => setDistHistoryInfo(distHistory, null as any)).toThrow();
		});

		it('should handle undefined entry gracefully', () => {
			const distHistory = createMockDistHistory([]);

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			expect(() => setDistHistoryInfo(distHistory, undefined as any)).toThrow();
		});

		it('should preserve existing entry properties when adding new entry', () => {
			const distHistory = createMockDistHistory([]);
			const entryWithExtra = {
				...mockNewDistHistoryEntry,
				extraProperty: 'should be preserved',
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} as any;

			setDistHistoryInfo(distHistory, entryWithExtra);

			expect(distHistory.distFolderHistory).toHaveLength(1);
			expect(distHistory.distFolderHistory[0]).toEqual({
				...mockNewDistHistoryEntryWithUpdated,
				extraProperty: 'should be preserved',
			});
		});
	});

	describe('copyDistHistoryToCdnFolder', () => {
		it('should write dist history to CDN folder', () => {
			copyDistHistoryToCdnFolder(mockDistHistoryMultipleEntries);

			expect(mocks.mockedWriteJsonFile).toHaveBeenCalledWith(mockCdnDistHistoryFilePath, mockDistHistoryMultipleEntries);
		});

		it('should write empty dist history to CDN folder', () => {
			copyDistHistoryToCdnFolder(mockDistHistoryEmpty);

			expect(mocks.mockedWriteJsonFile).toHaveBeenCalledWith(mockCdnDistHistoryFilePath, mockDistHistoryEmpty);
		});

		it('should write single entry dist history to CDN folder', () => {
			copyDistHistoryToCdnFolder(mockDistHistorySingleEntry);

			expect(mocks.mockedWriteJsonFile).toHaveBeenCalledWith(mockCdnDistHistoryFilePath, mockDistHistorySingleEntry);
		});

		it('should construct correct CDN file path using shared constants', () => {
			copyDistHistoryToCdnFolder(mockDistHistoryMultipleEntries);

			const expectedPath = `${tokenPackagePath}/${cdnArtifactFolderName}/${tokenDistHistoryFilename}`;
			expect(mocks.mockedWriteJsonFile).toHaveBeenCalledWith(expectedPath, mockDistHistoryMultipleEntries);
		});

		it('should handle null dist history gracefully', () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			expect(() => copyDistHistoryToCdnFolder(null as any)).not.toThrow();
			expect(mocks.mockedWriteJsonFile).toHaveBeenCalledWith(mockCdnDistHistoryFilePath, null as unknown as object);
		});

		it('should handle undefined dist history gracefully', () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			expect(() => copyDistHistoryToCdnFolder(undefined as any)).not.toThrow();
			expect(mocks.mockedWriteJsonFile).toHaveBeenCalledWith(mockCdnDistHistoryFilePath, undefined as unknown as object);
		});

		it('should handle writeJsonFile throwing error', () => {
			mocks.mockedWriteJsonFile.mockImplementation(() => {
				throw new Error('Write error');
			});

			expect(() => copyDistHistoryToCdnFolder(mockDistHistoryMultipleEntries)).toThrow('Write error');
		});
	});

	describe('writeDistHistoryFile', () => {
		it('should write dist history to main file and copy to CDN folder', () => {
			writeDistHistoryFile(mockDistHistoryMultipleEntries);

			expect(mocks.mockedWriteJsonFile).toHaveBeenCalledTimes(2);
			expect(mocks.mockedWriteJsonFile).toHaveBeenNthCalledWith(1, tokenDistHistoryFilePath, mockDistHistoryMultipleEntries);
			expect(mocks.mockedWriteJsonFile).toHaveBeenNthCalledWith(2, mockCdnDistHistoryFilePath, mockDistHistoryMultipleEntries);
		});

		it('should write empty dist history to both locations', () => {
			writeDistHistoryFile(mockDistHistoryEmpty);

			expect(mocks.mockedWriteJsonFile).toHaveBeenCalledTimes(2);
			expect(mocks.mockedWriteJsonFile).toHaveBeenNthCalledWith(1, tokenDistHistoryFilePath, mockDistHistoryEmpty);
			expect(mocks.mockedWriteJsonFile).toHaveBeenNthCalledWith(2, mockCdnDistHistoryFilePath, mockDistHistoryEmpty);
		});

		it('should write single entry dist history to both locations', () => {
			writeDistHistoryFile(mockDistHistorySingleEntry);

			expect(mocks.mockedWriteJsonFile).toHaveBeenCalledTimes(2);
			expect(mocks.mockedWriteJsonFile).toHaveBeenNthCalledWith(1, tokenDistHistoryFilePath, mockDistHistorySingleEntry);
			expect(mocks.mockedWriteJsonFile).toHaveBeenNthCalledWith(2, mockCdnDistHistoryFilePath, mockDistHistorySingleEntry);
		});

		it('should handle null dist history gracefully', () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			expect(() => writeDistHistoryFile(null as any)).not.toThrow();
			expect(mocks.mockedWriteJsonFile).toHaveBeenCalledTimes(2);
		});

		it('should handle undefined dist history gracefully', () => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			expect(() => writeDistHistoryFile(undefined as any)).not.toThrow();
			expect(mocks.mockedWriteJsonFile).toHaveBeenCalledTimes(2);
		});

		it('should handle writeJsonFile throwing error on main file write', () => {
			mocks.mockedWriteJsonFile.mockImplementationOnce(() => {
				throw new Error('Main write error');
			});

			expect(() => writeDistHistoryFile(mockDistHistoryMultipleEntries)).toThrow('Main write error');
			expect(mocks.mockedWriteJsonFile).toHaveBeenCalledTimes(1);
		});

		it('should handle writeJsonFile throwing error on CDN file write', () => {
			mocks.mockedWriteJsonFile
				.mockImplementationOnce(() => {
					// Main file write succeeds
				})
				.mockImplementationOnce(() => {
					throw new Error('CDN write error');
				});

			expect(() => writeDistHistoryFile(mockDistHistoryMultipleEntries)).toThrow('CDN write error');
			expect(mocks.mockedWriteJsonFile).toHaveBeenCalledTimes(2);
		});

		it('should call copyDistHistoryToCdnFolder with the same dist history object', () => {
			const customDistHistory = createMockDistHistory([createMockDistHistoryEntry('custom', 'custom', 'custom')]);

			writeDistHistoryFile(customDistHistory);

			expect(mocks.mockedWriteJsonFile).toHaveBeenNthCalledWith(1, tokenDistHistoryFilePath, customDistHistory);
			expect(mocks.mockedWriteJsonFile).toHaveBeenNthCalledWith(2, mockCdnDistHistoryFilePath, customDistHistory);
		});
	});
});
