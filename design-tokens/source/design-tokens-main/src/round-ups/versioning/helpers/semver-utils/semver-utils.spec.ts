import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import semver, { SemVer } from 'semver';
import {
	determineNewFileVersionFromUserPrompt,
	distHistoryEqualToPackageVersion,
	manualPackageVersionBumpDetected,
} from './semver-utils.js';
import {
	createMockIncResult,
	createMockSemVerObject,
	createMockSemVerWithCompare,
	createMockSemVerWithNullInc,
	createMockSemVerWithUndefinedInc,
	createStandardMockSemVer,
	mockComment,
	mockDistHistoryEmpty,
	mockDistHistoryMultipleEntries,
	mockDistHistorySingleEntry,
	mockDistHistoryUndefined,
	mockDistHistoryWithHigherVersion,
	mockDistHistoryWithLowerVersion,
	mockDistHistoryWithNullHistory,
	mockDistHistoryWithSameVersion,
	type MockedFunctions,
	mockErrorMessage,
	mockInfoLogMessage,
	mockInvalidVersion,
	mockPendingLogMessage,
	mockStoredVersion,
	mockTokenPackageVersion,
	mockUserPromptInputMajor,
	mockUserPromptInputMinor,
	mockUserPromptInputPatch,
	mockUserPromptInputPremajor,
	mockUserPromptInputPreminor,
	mockUserPromptInputPrepatch,
	mockUserPromptInputPrerelease,
	mockVersionScenarios,
	setupDefaultMockReturns,
	setupTypedMocks,
} from './semver-utils.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock semver module
jest.mock('semver', () => {
	return {
		default: {
			parse: jest.fn(),
		},
		parse: jest.fn(),
	};
});

// Mock shared functions
jest.mock('../../../../shared/index.js', () => {
	const actual: object = jest.requireActual('../../../../shared/index.js');
	return {
		...actual,
		logger: {
			pending: jest.fn(),
			info: jest.fn(),
			error: jest.fn(),
			warn: jest.fn(),
			success: jest.fn(),
		},
	};
});

// Mock user-prompt functions
jest.mock('../user-prompt/user-prompt.js', () => {
	return {
		askForVersionBump: jest.fn(),
	};
});

describe('Semver Utils', () => {
	// Setup typed mocks using the helper
	const mocks: MockedFunctions = setupTypedMocks();
	const mockedSemver = semver as jest.Mocked<typeof semver>;

	beforeEach(() => {
		jest.clearAllMocks();
		// Setup default mock returns using the helper
		setupDefaultMockReturns(mocks);
	});

	describe('determineNewFileVersionFromUserPrompt', () => {
		describe('successful version bumps', () => {
			it('should handle minor version bump', async () => {
				mocks.mockedAskForVersionBump.mockResolvedValue(mockUserPromptInputMinor);
				mockedSemver.parse.mockReturnValue(
					createMockSemVerObject(
						mockVersionScenarios.minor.expected,
						createMockIncResult(mockVersionScenarios.minor.expected),
					) as unknown as SemVer,
				);

				const result = await determineNewFileVersionFromUserPrompt(mockVersionScenarios.minor.input);

				expect(result).toEqual({
					newVersion: mockVersionScenarios.minor.expected,
					comment: mockComment,
				});
				expect(mocks.mockedLogger.pending).toHaveBeenCalledWith(mockPendingLogMessage);
				expect(mocks.mockedAskForVersionBump).toHaveBeenCalledTimes(1);
				expect(mockedSemver.parse).toHaveBeenCalledWith(mockVersionScenarios.minor.input);
				expect(mocks.mockedLogger.info).toHaveBeenCalledWith(
					mockInfoLogMessage('minor', mockVersionScenarios.minor.input, mockVersionScenarios.minor.expected, mockComment),
				);
			});
			it('should handle patch version bump', async () => {
				mocks.mockedAskForVersionBump.mockResolvedValue(mockUserPromptInputPatch);
				mockedSemver.parse.mockReturnValue(
					createMockSemVerObject(
						mockVersionScenarios.patch.expected,
						createMockIncResult(mockVersionScenarios.patch.expected),
					) as unknown as SemVer,
				);

				const result = await determineNewFileVersionFromUserPrompt(mockVersionScenarios.patch.input);

				expect(result).toEqual({
					newVersion: mockVersionScenarios.patch.expected,
					comment: 'Bug fixes only',
				});
				expect(mocks.mockedLogger.info).toHaveBeenCalledWith(
					mockInfoLogMessage('patch', mockVersionScenarios.patch.input, mockVersionScenarios.patch.expected, 'Bug fixes only'),
				);
			});

			it('should handle major version bump', async () => {
				mocks.mockedAskForVersionBump.mockResolvedValue(mockUserPromptInputMajor);
				mockedSemver.parse.mockReturnValue(
					createMockSemVerObject(
						mockVersionScenarios.major.expected,
						createMockIncResult(mockVersionScenarios.major.expected),
					) as unknown as SemVer,
				);

				const result = await determineNewFileVersionFromUserPrompt(mockVersionScenarios.major.input);

				expect(result).toEqual({
					newVersion: mockVersionScenarios.major.expected,
					comment: 'Breaking changes introduced',
				});
				expect(mocks.mockedLogger.info).toHaveBeenCalledWith(
					mockInfoLogMessage('major', mockVersionScenarios.major.input, mockVersionScenarios.major.expected, 'Breaking changes introduced'),
				);
			});

			it('should handle prerelease version bump', async () => {
				mocks.mockedAskForVersionBump.mockResolvedValue(mockUserPromptInputPrerelease);
				mockedSemver.parse.mockReturnValue({
					version: mockVersionScenarios.prerelease.expected,
					inc: jest.fn().mockReturnValue({ version: mockVersionScenarios.prerelease.expected }),
					compare: jest.fn().mockReturnValue(0),
				} as unknown as SemVer);

				const result = await determineNewFileVersionFromUserPrompt(mockVersionScenarios.prerelease.input);

				expect(result).toEqual({
					newVersion: mockVersionScenarios.prerelease.expected,
					comment: 'Alpha release for testing',
				});
				expect(mocks.mockedLogger.info).toHaveBeenCalledWith(
					mockInfoLogMessage(
						'prerelease',
						mockVersionScenarios.prerelease.input,
						mockVersionScenarios.prerelease.expected,
						'Alpha release for testing',
					),
				);
			});

			it('should handle prepatch version bump', async () => {
				mocks.mockedAskForVersionBump.mockResolvedValue(mockUserPromptInputPrepatch);
				mockedSemver.parse.mockReturnValue({
					version: mockVersionScenarios.prepatch.expected,
					inc: jest.fn().mockReturnValue({ version: mockVersionScenarios.prepatch.expected }),
					compare: jest.fn().mockReturnValue(0),
				} as unknown as SemVer);

				const result = await determineNewFileVersionFromUserPrompt(mockVersionScenarios.prepatch.input);

				expect(result).toEqual({
					newVersion: mockVersionScenarios.prepatch.expected,
					comment: 'Pre-patch release',
				});
			});

			it('should handle preminor version bump', async () => {
				mocks.mockedAskForVersionBump.mockResolvedValue(mockUserPromptInputPreminor);
				mockedSemver.parse.mockReturnValue(createStandardMockSemVer(mockVersionScenarios.preminor.expected));

				const result = await determineNewFileVersionFromUserPrompt(mockVersionScenarios.preminor.input);

				expect(result).toEqual({
					newVersion: mockVersionScenarios.preminor.expected,
					comment: 'Pre-minor release',
				});
			});

			it('should handle premajor version bump', async () => {
				mocks.mockedAskForVersionBump.mockResolvedValue(mockUserPromptInputPremajor);
				mockedSemver.parse.mockReturnValue(createStandardMockSemVer(mockVersionScenarios.premajor.expected));

				const result = await determineNewFileVersionFromUserPrompt(mockVersionScenarios.premajor.input);

				expect(result).toEqual({
					newVersion: mockVersionScenarios.premajor.expected,
					comment: 'Pre-major release',
				});
			});

			it('should handle edge case versions', async () => {
				mocks.mockedAskForVersionBump.mockResolvedValue(mockUserPromptInputMinor);
				mockedSemver.parse.mockReturnValue(createStandardMockSemVer('999.1000.0'));

				const result = await determineNewFileVersionFromUserPrompt('999.999.999');

				expect(result.newVersion).toBe('999.1000.0');
				expect(mockedSemver.parse).toHaveBeenCalledWith('999.999.999');
			});

			it('should handle complex versions with prerelease and build metadata', async () => {
				mocks.mockedAskForVersionBump.mockResolvedValue(mockUserPromptInputPatch);
				mockedSemver.parse.mockReturnValue(createStandardMockSemVer('1.0.1'));

				const result = await determineNewFileVersionFromUserPrompt('1.0.0-beta.2+build.123');

				expect(result.newVersion).toBe('1.0.1');
				expect(mockedSemver.parse).toHaveBeenCalledWith('1.0.0-beta.2+build.123');
			});
		});

		describe('error scenarios', () => {
			it('should throw error when semver.parse returns null', async () => {
				mocks.mockedAskForVersionBump.mockResolvedValue(mockUserPromptInputMinor);
				mockedSemver.parse.mockReturnValue(null);

				await expect(determineNewFileVersionFromUserPrompt(mockInvalidVersion)).rejects.toThrow(mockErrorMessage);

				expect(mocks.mockedLogger.error).toHaveBeenCalledWith(mockErrorMessage);
				expect(mockedSemver.parse).toHaveBeenCalledWith(mockInvalidVersion);
			});

			it('should throw error when semver.parse returns undefined', async () => {
				mocks.mockedAskForVersionBump.mockResolvedValue(mockUserPromptInputMinor);
				mockedSemver.parse.mockReturnValue(null);

				await expect(determineNewFileVersionFromUserPrompt(mockInvalidVersion)).rejects.toThrow(mockErrorMessage);

				expect(mocks.mockedLogger.error).toHaveBeenCalledWith(mockErrorMessage);
			});

			it('should throw error when inc() returns null', async () => {
				mocks.mockedAskForVersionBump.mockResolvedValue(mockUserPromptInputMinor);
				mockedSemver.parse.mockReturnValue(createMockSemVerWithNullInc(mockStoredVersion));

				await expect(determineNewFileVersionFromUserPrompt(mockStoredVersion)).rejects.toThrow(TypeError);
			});

			it('should throw error when inc() returns undefined', async () => {
				mocks.mockedAskForVersionBump.mockResolvedValue(mockUserPromptInputMinor);
				mockedSemver.parse.mockReturnValue(createMockSemVerWithUndefinedInc(mockStoredVersion));

				await expect(determineNewFileVersionFromUserPrompt(mockStoredVersion)).rejects.toThrow(TypeError);
			});

			it('should handle empty version string', async () => {
				mocks.mockedAskForVersionBump.mockResolvedValue(mockUserPromptInputMinor);
				mockedSemver.parse.mockReturnValue(null);

				await expect(determineNewFileVersionFromUserPrompt('')).rejects.toThrow(mockErrorMessage);

				expect(mockedSemver.parse).toHaveBeenCalledWith('');
			});

			it('should handle user prompt rejection', async () => {
				mocks.mockedAskForVersionBump.mockRejectedValue(new Error('User cancelled'));

				await expect(determineNewFileVersionFromUserPrompt(mockStoredVersion)).rejects.toThrow('User cancelled');

				expect(mocks.mockedLogger.pending).toHaveBeenCalledWith(mockPendingLogMessage);
				expect(mocks.mockedAskForVersionBump).toHaveBeenCalledTimes(1);
			});
		});
	});

	describe('distHistoryEqualToPackageVersion', () => {
		beforeEach(() => {
			// Reset semver mock for each test
			mockedSemver.parse.mockClear();
		});

		describe('version comparison scenarios', () => {
			it('should return true when package version equals dist history version', () => {
				mockedSemver.parse.mockReturnValue(createMockSemVerWithCompare(0));

				const result = distHistoryEqualToPackageVersion('1.5.0', mockDistHistoryWithSameVersion);

				expect(result).toBe(true);
				expect(mockedSemver.parse).toHaveBeenCalledWith('1.5.0');
			});

			it('should return false when package version is higher than dist history version', () => {
				mockedSemver.parse.mockReturnValue(createMockSemVerWithCompare(1));

				const result = distHistoryEqualToPackageVersion('2.0.0', mockDistHistoryWithSameVersion);

				expect(result).toBe(false);
				expect(mockedSemver.parse).toHaveBeenCalledWith('2.0.0');
			});

			it('should return false when package version is lower than dist history version', () => {
				mockedSemver.parse.mockReturnValue(createMockSemVerWithCompare(-1));

				const result = distHistoryEqualToPackageVersion('1.0.0', mockDistHistoryWithSameVersion);

				expect(result).toBe(false);
				expect(mockedSemver.parse).toHaveBeenCalledWith('1.0.0');
			});

			it('should handle multiple entries and use the last one', () => {
				mockedSemver.parse.mockReturnValue({
					compare: jest.fn().mockReturnValue(0),
				} as unknown as SemVer);

				const result = distHistoryEqualToPackageVersion('1.5.0', mockDistHistoryMultipleEntries);

				expect(result).toBe(true);
				// Should compare against the last entry (1.5.0)
				expect(mockedSemver.parse).toHaveBeenCalledWith('1.5.0');
			});

			it('should handle single entry in dist history', () => {
				mockedSemver.parse.mockReturnValue({
					compare: jest.fn().mockReturnValue(0),
				} as unknown as SemVer);

				const result = distHistoryEqualToPackageVersion('1.2.3', mockDistHistorySingleEntry);

				expect(result).toBe(true);
				expect(mockedSemver.parse).toHaveBeenCalledWith('1.2.3');
			});
		});

		describe('edge cases and error scenarios', () => {
			it('should return false when dist history is empty', () => {
				const result = distHistoryEqualToPackageVersion(mockTokenPackageVersion, mockDistHistoryEmpty);

				expect(result).toBe(false);
				// Should not call semver.parse when history is empty
				expect(mockedSemver.parse).not.toHaveBeenCalled();
			});

			it('should throw TypeError when dist history is undefined', () => {
				expect(() => distHistoryEqualToPackageVersion(mockTokenPackageVersion, mockDistHistoryUndefined)).toThrow(TypeError);
			});

			it('should throw TypeError when distFolderHistory is null', () => {
				expect(() => distHistoryEqualToPackageVersion(mockTokenPackageVersion, mockDistHistoryWithNullHistory)).toThrow(TypeError);
			});

			it('should return false when semver.parse returns null', () => {
				mockedSemver.parse.mockReturnValue(null);

				const result = distHistoryEqualToPackageVersion(mockInvalidVersion, mockDistHistoryWithSameVersion);

				expect(result).toBe(false);
				expect(mockedSemver.parse).toHaveBeenCalledWith(mockInvalidVersion);
			});

			it('should return false when semver.parse returns undefined', () => {
				mockedSemver.parse.mockReturnValue(null);

				const result = distHistoryEqualToPackageVersion(mockInvalidVersion, mockDistHistoryWithSameVersion);

				expect(result).toBe(false);
			});

			it('should return false when compare returns null', () => {
				mockedSemver.parse.mockReturnValue(createMockSemVerWithCompare(null));

				const result = distHistoryEqualToPackageVersion(mockTokenPackageVersion, mockDistHistoryWithSameVersion);

				expect(result).toBe(false);
			});

			it('should return false when compare returns undefined', () => {
				mockedSemver.parse.mockReturnValue({
					compare: jest.fn().mockReturnValue(undefined),
				} as unknown as SemVer);

				const result = distHistoryEqualToPackageVersion(mockTokenPackageVersion, mockDistHistoryWithSameVersion);

				expect(result).toBe(false);
			});

			it('should handle edge case versions', () => {
				mockedSemver.parse.mockReturnValue({
					compare: jest.fn().mockReturnValue(0),
				} as unknown as SemVer);

				const result = distHistoryEqualToPackageVersion('0.0.0', mockDistHistorySingleEntry);

				expect(result).toBe(true);
				expect(mockedSemver.parse).toHaveBeenCalledWith('0.0.0');
			});
		});
	});

	describe('manualPackageVersionBumpDetected', () => {
		beforeEach(() => {
			// Reset semver mock for each test
			mockedSemver.parse.mockClear();
		});

		describe('version comparison scenarios', () => {
			it('should return true when package version is higher than dist history version', () => {
				mockedSemver.parse.mockReturnValue({
					compare: jest.fn().mockReturnValue(1),
				} as unknown as SemVer);

				const result = manualPackageVersionBumpDetected('2.0.0', mockDistHistoryWithLowerVersion);

				expect(result).toBe(true);
				expect(mockedSemver.parse).toHaveBeenCalledWith('2.0.0');
			});

			it('should return false when package version equals dist history version', () => {
				mockedSemver.parse.mockReturnValue({
					compare: jest.fn().mockReturnValue(0),
				} as unknown as SemVer);

				const result = manualPackageVersionBumpDetected('1.5.0', mockDistHistoryWithSameVersion);

				expect(result).toBe(false);
				expect(mockedSemver.parse).toHaveBeenCalledWith('1.5.0');
			});

			it('should return false when package version is lower than dist history version', () => {
				mockedSemver.parse.mockReturnValue({
					compare: jest.fn().mockReturnValue(-1),
				} as unknown as SemVer);

				const result = manualPackageVersionBumpDetected('1.0.0', mockDistHistoryWithHigherVersion);

				expect(result).toBe(false);
				expect(mockedSemver.parse).toHaveBeenCalledWith('1.0.0');
			});

			it('should handle multiple entries and use the last one', () => {
				mockedSemver.parse.mockReturnValue({
					compare: jest.fn().mockReturnValue(1),
				} as unknown as SemVer);

				const result = manualPackageVersionBumpDetected('2.0.0', mockDistHistoryMultipleEntries);

				expect(result).toBe(true);
				// Should compare against the last entry (1.5.0)
				expect(mockedSemver.parse).toHaveBeenCalledWith('2.0.0');
			});

			it('should handle single entry in dist history', () => {
				mockedSemver.parse.mockReturnValue({
					compare: jest.fn().mockReturnValue(1),
				} as unknown as SemVer);

				const result = manualPackageVersionBumpDetected('2.0.0', mockDistHistorySingleEntry);

				expect(result).toBe(true);
				expect(mockedSemver.parse).toHaveBeenCalledWith('2.0.0');
			});

			it('should handle zero comparison result', () => {
				mockedSemver.parse.mockReturnValue({
					compare: jest.fn().mockReturnValue(0),
				} as unknown as SemVer);

				const result = manualPackageVersionBumpDetected('1.2.3', mockDistHistorySingleEntry);

				expect(result).toBe(false);
			});
		});

		describe('edge cases and error scenarios', () => {
			it('should return false when dist history is empty', () => {
				const result = manualPackageVersionBumpDetected(mockTokenPackageVersion, mockDistHistoryEmpty);

				expect(result).toBe(false);
				// Should not call semver.parse when history is empty
				expect(mockedSemver.parse).not.toHaveBeenCalled();
			});

			it('should throw TypeError when dist history is undefined', () => {
				expect(() => manualPackageVersionBumpDetected(mockTokenPackageVersion, mockDistHistoryUndefined)).toThrow(TypeError);
			});

			it('should throw TypeError when distFolderHistory is null', () => {
				expect(() => manualPackageVersionBumpDetected(mockTokenPackageVersion, mockDistHistoryWithNullHistory)).toThrow(TypeError);
			});

			it('should return false when semver.parse returns null', () => {
				mockedSemver.parse.mockReturnValue(null);

				const result = manualPackageVersionBumpDetected(mockInvalidVersion, mockDistHistoryWithSameVersion);

				expect(result).toBe(false);
				expect(mockedSemver.parse).toHaveBeenCalledWith(mockInvalidVersion);
			});

			it('should return false when semver.parse returns undefined', () => {
				mockedSemver.parse.mockReturnValue(null);

				const result = manualPackageVersionBumpDetected(mockInvalidVersion, mockDistHistoryWithSameVersion);

				expect(result).toBe(false);
			});

			it('should return false when compare returns null', () => {
				mockedSemver.parse.mockReturnValue({
					compare: jest.fn().mockReturnValue(null),
				} as unknown as SemVer);

				const result = manualPackageVersionBumpDetected(mockTokenPackageVersion, mockDistHistoryWithSameVersion);

				expect(result).toBe(false);
			});

			it('should return false when compare returns undefined', () => {
				mockedSemver.parse.mockReturnValue({
					compare: jest.fn().mockReturnValue(undefined),
				} as unknown as SemVer);

				const result = manualPackageVersionBumpDetected(mockTokenPackageVersion, mockDistHistoryWithSameVersion);

				expect(result).toBe(false);
			});

			it('should return false when compare returns 0 (equal versions)', () => {
				mockedSemver.parse.mockReturnValue({
					compare: jest.fn().mockReturnValue(0),
				} as unknown as SemVer);

				const result = manualPackageVersionBumpDetected('1.5.0', mockDistHistoryWithSameVersion);

				expect(result).toBe(false);
			});

			it('should return false when compare returns negative value', () => {
				mockedSemver.parse.mockReturnValue({
					compare: jest.fn().mockReturnValue(-5),
				} as unknown as SemVer);

				const result = manualPackageVersionBumpDetected('0.5.0', mockDistHistoryWithSameVersion);

				expect(result).toBe(false);
			});

			it('should handle edge case versions', () => {
				mockedSemver.parse.mockReturnValue({
					compare: jest.fn().mockReturnValue(1),
				} as unknown as SemVer);

				const result = manualPackageVersionBumpDetected('999.999.999', mockDistHistorySingleEntry);

				expect(result).toBe(true);
				expect(mockedSemver.parse).toHaveBeenCalledWith('999.999.999');
			});
		});
	});

	describe('Integration Tests', () => {
		it('should work with all three functions in sequence', async () => {
			// Setup for determineNewFileVersionFromUserPrompt
			mocks.mockedAskForVersionBump.mockResolvedValue(mockUserPromptInputMinor);
			mockedSemver.parse.mockReturnValue({
				version: '1.3.0',
				inc: jest.fn().mockReturnValue({ version: '1.3.0' }),
				compare: jest.fn().mockReturnValue(1),
			} as unknown as SemVer);

			// Test determineNewFileVersionFromUserPrompt
			const versionResult = await determineNewFileVersionFromUserPrompt('1.2.3');
			expect(versionResult.newVersion).toBe('1.3.0');

			// Test distHistoryEqualToPackageVersion with the new version
			const isEqual = distHistoryEqualToPackageVersion('1.3.0', mockDistHistoryWithSameVersion);
			expect(isEqual).toBe(false); // Should be false because compare returns 1

			// Test manualPackageVersionBumpDetected with the new version
			const isManualBump = manualPackageVersionBumpDetected('1.3.0', mockDistHistoryWithSameVersion);
			expect(isManualBump).toBe(true); // Should be true because compare returns 1
		});

		it('should handle consistent semver parsing across functions', () => {
			mockedSemver.parse.mockReturnValue({
				compare: jest.fn().mockReturnValue(0),
			} as unknown as SemVer);

			const version = '1.5.0';
			const distHistory = mockDistHistoryWithSameVersion;

			const isEqual = distHistoryEqualToPackageVersion(version, distHistory);
			const isManualBump = manualPackageVersionBumpDetected(version, distHistory);

			expect(isEqual).toBe(true);
			expect(isManualBump).toBe(false);
			expect(mockedSemver.parse).toHaveBeenCalledTimes(2);
			expect(mockedSemver.parse).toHaveBeenCalledWith(version);
		});

		it('should handle error propagation consistently', () => {
			mockedSemver.parse.mockReturnValue(null);

			const version = 'invalid-version';
			const distHistory = mockDistHistoryWithSameVersion;

			const isEqual = distHistoryEqualToPackageVersion(version, distHistory);
			const isManualBump = manualPackageVersionBumpDetected(version, distHistory);

			expect(isEqual).toBe(false);
			expect(isManualBump).toBe(false);
			expect(mockedSemver.parse).toHaveBeenCalledTimes(2);
		});
	});

	describe('Code Coverage Completeness', () => {
		it('should cover all code paths in determineNewFileVersionFromUserPrompt', async () => {
			// Test the null check branch - this will throw TypeError before reaching our error handling
			mocks.mockedAskForVersionBump.mockResolvedValue(mockUserPromptInputMinor);
			mockedSemver.parse.mockReturnValue({
				inc: jest.fn().mockReturnValue(null),
			} as unknown as SemVer);

			await expect(determineNewFileVersionFromUserPrompt(mockStoredVersion)).rejects.toThrow(TypeError);
		});

		it('should cover all return paths in distHistoryEqualToPackageVersion', () => {
			// Test the truthy path
			mockedSemver.parse.mockReturnValue({
				compare: jest.fn().mockReturnValue(0),
			} as unknown as SemVer);

			let result = distHistoryEqualToPackageVersion('1.5.0', mockDistHistoryWithSameVersion);
			expect(result).toBe(true);

			// Test the falsy path (non-zero comparison)
			mockedSemver.parse.mockReturnValue({
				compare: jest.fn().mockReturnValue(1),
			} as unknown as SemVer);

			result = distHistoryEqualToPackageVersion('2.0.0', mockDistHistoryWithSameVersion);
			expect(result).toBe(false);

			// Test the falsy path (null comparison)
			mockedSemver.parse.mockReturnValue({
				compare: jest.fn().mockReturnValue(null),
			} as unknown as SemVer);

			result = distHistoryEqualToPackageVersion('1.5.0', mockDistHistoryWithSameVersion);
			expect(result).toBe(false);
		});

		it('should cover all return paths in manualPackageVersionBumpDetected', () => {
			// Test the truthy path (positive comparison)
			mockedSemver.parse.mockReturnValue({
				compare: jest.fn().mockReturnValue(1),
			} as unknown as SemVer);

			let result = manualPackageVersionBumpDetected('2.0.0', mockDistHistoryWithSameVersion);
			expect(result).toBe(true);

			// Test the falsy path (zero comparison)
			mockedSemver.parse.mockReturnValue({
				compare: jest.fn().mockReturnValue(0),
			} as unknown as SemVer);

			result = manualPackageVersionBumpDetected('1.5.0', mockDistHistoryWithSameVersion);
			expect(result).toBe(false);

			// Test the falsy path (negative comparison)
			mockedSemver.parse.mockReturnValue({
				compare: jest.fn().mockReturnValue(-1),
			} as unknown as SemVer);

			result = manualPackageVersionBumpDetected('1.0.0', mockDistHistoryWithSameVersion);
			expect(result).toBe(false);

			// Test the falsy path (null comparison)
			mockedSemver.parse.mockReturnValue({
				compare: jest.fn().mockReturnValue(null),
			} as unknown as SemVer);

			result = manualPackageVersionBumpDetected('1.5.0', mockDistHistoryWithSameVersion);
			expect(result).toBe(false);
		});
	});
});
