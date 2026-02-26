import { jest } from '@jest/globals';
import { ReleaseType, SemVer } from 'semver';
import { logger } from '../../../../shared/index.js';
import { DistHistory, DistHistoryEntry, UserPromptInput } from '../../types/index.js';
import { askForVersionBump } from '../user-prompt/user-prompt.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Type the mocked functions
export const mockedLogger = logger as jest.Mocked<typeof logger>;
export const mockedAskForVersionBump = askForVersionBump as jest.MockedFunction<typeof askForVersionBump>;

// Type definitions for mocked semver objects
export interface MockSemVerObject {
	version: string;
	inc: jest.MockedFunction<(...args: unknown[]) => unknown>;
	compare: jest.MockedFunction<(...args: unknown[]) => unknown>;
	// Add minimal SemVer properties to make it compatible
	raw?: string;
	loose?: boolean;
	options?: unknown;
	format?: () => string;
	major?: number;
	minor?: number;
	patch?: number;
	prerelease?: ReadonlyArray<string | number>;
	build?: ReadonlyArray<string>;
}

export interface MockIncResult {
	version: string;
}

// Helper functions to create properly typed mock objects
export const createMockSemVerObject = (
	version: string,
	incResult: MockIncResult | null,
	compareResult?: number | null,
): MockSemVerObject => {
	return {
		version,
		inc: jest.fn().mockReturnValue(incResult),
		compare: jest.fn().mockReturnValue(compareResult ?? 0),
	};
};

export const createMockIncResult = (version: string): MockIncResult => {
	return { version };
};

// Helper to create a standard mock semver object for parse return values
export const createStandardMockSemVer = (version: string): SemVer =>
	({
		version,
		inc: jest.fn().mockReturnValue({ version }),
		compare: jest.fn().mockReturnValue(0),
	}) as unknown as SemVer;

// Helper to create mock semver with null inc result
export const createMockSemVerWithNullInc = (version: string): SemVer =>
	({
		version,
		inc: jest.fn().mockReturnValue(null),
		compare: jest.fn().mockReturnValue(0),
	}) as unknown as SemVer;

// Helper to create mock semver with undefined inc result
export const createMockSemVerWithUndefinedInc = (version: string): SemVer =>
	({
		version,
		inc: jest.fn().mockReturnValue(undefined),
		compare: jest.fn().mockReturnValue(0),
	}) as unknown as SemVer;

// Helper to create mock semver with only compare function (for comparison tests)
export const createMockSemVerWithCompare = (compareResult: number | null): SemVer =>
	({
		compare: jest.fn().mockReturnValue(compareResult),
	}) as unknown as SemVer;

// Mock version data for testing - only used ones
export const mockStoredVersion = '1.2.3';
export const mockComment = 'Added new features and bug fixes';
export const mockTokenPackageVersion = '1.5.0';
export const mockInvalidVersion = 'invalid-version';

// Mock UserPromptInput responses - only used ones
export const mockUserPromptInputMinor: UserPromptInput = {
	promptSemLevel: 'minor' as ReleaseType,
	promptChangeMessage: mockComment,
};

export const mockUserPromptInputPatch: UserPromptInput = {
	promptSemLevel: 'patch' as ReleaseType,
	promptChangeMessage: 'Bug fixes only',
};

export const mockUserPromptInputMajor: UserPromptInput = {
	promptSemLevel: 'major' as ReleaseType,
	promptChangeMessage: 'Breaking changes introduced',
};

export const mockUserPromptInputPrerelease: UserPromptInput = {
	promptSemLevel: 'prerelease' as ReleaseType,
	promptChangeMessage: 'Alpha release for testing',
};

export const mockUserPromptInputPrepatch: UserPromptInput = {
	promptSemLevel: 'prepatch' as ReleaseType,
	promptChangeMessage: 'Pre-patch release',
};

export const mockUserPromptInputPreminor: UserPromptInput = {
	promptSemLevel: 'preminor' as ReleaseType,
	promptChangeMessage: 'Pre-minor release',
};

export const mockUserPromptInputPremajor: UserPromptInput = {
	promptSemLevel: 'premajor' as ReleaseType,
	promptChangeMessage: 'Pre-major release',
};

// Mock DistHistoryEntry objects
export const mockDistHistoryEntryV123: DistHistoryEntry = {
	version: '1.2.3',
	comment: 'Previous version',
	hash: 'abc123def456',
	updated: '2025-01-01T00:00:00Z',
};

export const mockDistHistoryEntryV150: DistHistoryEntry = {
	version: '1.5.0',
	comment: 'Current version',
	hash: 'def456ghi789',
	updated: '2025-01-02T00:00:00Z',
};

export const mockDistHistoryEntryV200: DistHistoryEntry = {
	version: '2.0.0',
	comment: 'Major version',
	hash: 'ghi789jkl012',
	updated: '2025-01-03T00:00:00Z',
};

export const mockDistHistoryEntryV090: DistHistoryEntry = {
	version: '0.9.0',
	comment: 'Older version',
	hash: 'old123version456',
	updated: '2024-12-31T00:00:00Z',
};

// Mock DistHistory objects
export const mockDistHistoryWithSameVersion: DistHistory = {
	distFolderHistory: [mockDistHistoryEntryV123, mockDistHistoryEntryV150],
};

export const mockDistHistoryWithLowerVersion: DistHistory = {
	distFolderHistory: [mockDistHistoryEntryV123, mockDistHistoryEntryV090],
};

export const mockDistHistoryWithHigherVersion: DistHistory = {
	distFolderHistory: [mockDistHistoryEntryV123, mockDistHistoryEntryV200],
};

export const mockDistHistoryEmpty: DistHistory = {
	distFolderHistory: [],
};

export const mockDistHistorySingleEntry: DistHistory = {
	distFolderHistory: [mockDistHistoryEntryV123],
};

export const mockDistHistoryMultipleEntries: DistHistory = {
	distFolderHistory: [mockDistHistoryEntryV090, mockDistHistoryEntryV123, mockDistHistoryEntryV150],
};

// Mock undefined/null scenarios
export const mockDistHistoryUndefined = undefined as unknown as DistHistory;
export const mockDistHistoryWithNullHistory: DistHistory = {
	distFolderHistory: null as unknown as DistHistoryEntry[],
};

// Mock invalid version strings
export const mockEmptyVersion = '';
export const mockNullVersion = null as unknown as string;

// Mock expected error messages
export const mockErrorMessage = 'Error in resolving new semantic version for token-package!';

// Mock expected log messages
export const mockPendingLogMessage = 'User input needed for specifying version bump and dist-history comment.';
export const mockInfoLogMessage = (semLevel: string, storedVersion: string, newVersion: string, comment: string) =>
	`Selected semantic version level ${semLevel.toUpperCase()} bumps version from v${storedVersion} to v${newVersion} with following comment: ${comment}`;

// Mock semver comparison results
export const mockVersionCompareEqual = 0;
export const mockVersionCompareLower = -1;
export const mockVersionCompareHigher = 1;

// Mock version scenarios for testing different release types
export const mockVersionScenarios = {
	patch: {
		input: '1.2.3',
		expected: '1.2.4',
		releaseType: 'patch' as ReleaseType,
	},
	minor: {
		input: '1.2.3',
		expected: '1.3.0',
		releaseType: 'minor' as ReleaseType,
	},
	major: {
		input: '1.2.3',
		expected: '2.0.0',
		releaseType: 'major' as ReleaseType,
	},
	prerelease: {
		input: '1.2.3',
		expected: '1.2.4-0',
		releaseType: 'prerelease' as ReleaseType,
	},
	prepatch: {
		input: '1.2.3',
		expected: '1.2.4-0',
		releaseType: 'prepatch' as ReleaseType,
	},
	preminor: {
		input: '1.2.3',
		expected: '1.3.0-0',
		releaseType: 'preminor' as ReleaseType,
	},
	premajor: {
		input: '1.2.3',
		expected: '2.0.0-0',
		releaseType: 'premajor' as ReleaseType,
	},
};

// ========================================
// TYPED MOCK SETUP HELPER
// ========================================

/**
 * Type definition for mocked semver objects
 */
export interface MockedSemVerObject {
	version?: string;
	inc?: jest.MockedFunction<(release: string) => MockedSemVerObject | null | undefined>;
	compare?: jest.MockedFunction<(version: string) => number | null | undefined>;
}

/**
 * Type definitions for all mocked functions
 */
export interface MockedFunctions {
	// Shared functions
	mockedLogger: jest.Mocked<typeof logger>;
	// Helper functions
	mockedAskForVersionBump: jest.MockedFunction<typeof askForVersionBump>;
}

/**
 * Helper function to set up typed mock functions
 * Call this after jest.mock() calls to get properly typed mocks
 */
export const setupTypedMocks = (): MockedFunctions => {
	return {
		// Shared functions
		mockedLogger: logger as jest.Mocked<typeof logger>,
		// Helper functions
		mockedAskForVersionBump: askForVersionBump as jest.MockedFunction<typeof askForVersionBump>,
	};
};

/**
 * Helper function to set up default mock return values
 * Call this in beforeEach to configure common mock behaviors
 */
export const setupDefaultMockReturns = (mocks: MockedFunctions): void => {
	mocks.mockedAskForVersionBump.mockResolvedValue(mockUserPromptInputMinor);
};
