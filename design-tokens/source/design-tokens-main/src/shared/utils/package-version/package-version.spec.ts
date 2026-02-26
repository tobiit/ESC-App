import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { tokenPackageJsonPath } from '../../constants/index.js';
import { readJsonFile, writeJsonFile } from '../file-helper/file-helper.js';
import { getTokenPackageVersion, setNewVersionInPackageJson } from './package-version.js';
import { newTestVersion, packageJsonTestData, packageLockJsonTestData } from './package-version.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

jest.mock('../file-helper/file-helper.js', () => {
	return {
		readJsonFile: jest.fn(),
		writeJsonFile: jest.fn(),
	};
});

// Note: Logger mocking (suppressLoggerOutput/restoreLoggerMocks) is automatically handled by src/shared/testing/test-helpers.mock.spec.ts via jest.config.ts setupFilesAfterEnv
describe('package-version', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('getTokenPackageVersion', () => {
		it('should return the package version', () => {
			const mockReadJsonFile = jest.mocked(readJsonFile);
			mockReadJsonFile.mockReturnValue(packageJsonTestData);

			const result = getTokenPackageVersion();

			expect(result).toBe('0.3.5');
		});

		it('should throw error if version is not defined', () => {
			const mockReadJsonFile = jest.mocked(readJsonFile);
			mockReadJsonFile.mockReturnValue({ ...packageJsonTestData, version: undefined });

			expect(() => getTokenPackageVersion()).toThrow('Token Package version could not be resolved');
		});
	});

	describe('setNewVersionInPackageJson', () => {
		it('should update version in package.json and package-lock.json', () => {
			const mockReadJsonFile = jest.mocked(readJsonFile);
			const mockWriteJsonFile = jest.mocked(writeJsonFile);
			mockReadJsonFile.mockReturnValueOnce(packageJsonTestData).mockReturnValueOnce(packageLockJsonTestData);

			setNewVersionInPackageJson(newTestVersion);

			// Verify package.json update
			expect(mockWriteJsonFile).toHaveBeenCalledWith(tokenPackageJsonPath, {
				...packageJsonTestData,
				version: newTestVersion,
			});

			// Verify package-lock.json update
			const expectedLockPath = tokenPackageJsonPath.split('.')[0] + '-lock.json';
			const expectedLockData = {
				...packageLockJsonTestData,
				version: newTestVersion,
				packages: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'': {
						...packageLockJsonTestData.packages[''],
						version: newTestVersion,
					},
				},
			};
			expect(mockWriteJsonFile).toHaveBeenCalledWith(expectedLockPath, expectedLockData);
		});

		it('should maintain other package.json properties', () => {
			const mockReadJsonFile = jest.mocked(readJsonFile);
			mockReadJsonFile.mockReturnValueOnce(packageJsonTestData).mockReturnValueOnce(packageLockJsonTestData);

			setNewVersionInPackageJson(newTestVersion);

			const writeJsonCalls = jest.mocked(writeJsonFile).mock.calls;

			// Check package.json
			const packageJsonCall = writeJsonCalls.find(call => call[0] === tokenPackageJsonPath);
			if (!packageJsonCall) {
				throw new Error('No write call found for package.json');
			}
			expect(packageJsonCall[1]).toEqual({
				...packageJsonTestData,
				version: newTestVersion,
			});
		});

		it('should maintain other package-lock.json properties', () => {
			const mockReadJsonFile = jest.mocked(readJsonFile);
			mockReadJsonFile.mockReturnValueOnce(packageJsonTestData).mockReturnValueOnce(packageLockJsonTestData);

			setNewVersionInPackageJson(newTestVersion);

			const writeJsonCalls = jest.mocked(writeJsonFile).mock.calls;

			// Check package-lock.json
			const expectedLockPath = tokenPackageJsonPath.split('.')[0] + '-lock.json';
			const lockJsonCall = writeJsonCalls.find(call => call[0] === expectedLockPath);
			if (!lockJsonCall) {
				throw new Error('No write call found for package-lock.json');
			}
			expect(lockJsonCall[1]).toEqual({
				...packageLockJsonTestData,
				version: newTestVersion,
				packages: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'': {
						...packageLockJsonTestData.packages[''],
						version: newTestVersion,
					},
				},
			});
		});

		it('should handle malformed package-lock.json gracefully', () => {
			const mockReadJsonFile = jest.mocked(readJsonFile);
			mockReadJsonFile.mockReturnValueOnce(packageJsonTestData).mockReturnValueOnce({
				name: 'test-package',
				version: '0.3.5',
				lockfileVersion: 3,
				requires: true,
			});

			expect(() => setNewVersionInPackageJson(newTestVersion)).toThrow();
		});

		it('should call writeJsonFile with correct number of times and order', () => {
			const mockReadJsonFile = jest.mocked(readJsonFile);
			mockReadJsonFile.mockReturnValueOnce(packageJsonTestData).mockReturnValueOnce(packageLockJsonTestData);

			setNewVersionInPackageJson(newTestVersion);

			const mockWriteJsonFile = jest.mocked(writeJsonFile);
			expect(mockWriteJsonFile).toHaveBeenCalledTimes(2);

			// Verify order of writes
			const writes = mockWriteJsonFile.mock.calls;
			expect(writes[0][0]).toBe(tokenPackageJsonPath); // package.json should be written first
			expect(writes[1][0]).toContain('-lock.json'); // package-lock.json should be written second
		});
	});
});
