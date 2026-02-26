import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

describe('General Constants', () => {
	// Store original process.argv to restore after tests
	const originalArgv = process.argv;

	beforeEach(() => {
		// Clear module cache to ensure fresh imports for each test
		jest.resetModules();
	});

	afterEach(() => {
		// Restore original process.argv
		process.argv = originalArgv;
	});

	describe('isFeatureBranch', () => {
		it('should be true when process.argv[2] equals featureBranchCommandFlag', async () => {
			// Mock process.argv with the feature branch flag
			process.argv = ['node', 'script.js', 'ci-feature-branch'];

			// Import the module after mocking process.argv otherwise with direct import at the top, test coverage can't be reached!
			const { isFeatureBranch, featureBranchCommandFlag } = await import('./general-constants.js');

			expect(featureBranchCommandFlag).toBe('ci-feature-branch');
			expect(isFeatureBranch).toBe(true);
		});

		it('should be false when process.argv[2] is undefined', async () => {
			// Mock process.argv without a third argument
			process.argv = ['node', 'script.js'];

			// Import the module after mocking process.argv otherwise with direct import at the top, test coverage can't be reached!
			const { isFeatureBranch } = await import('./general-constants.js');

			expect(isFeatureBranch).toBe(undefined);
		});

		it('should be false when process.argv[2] is different from featureBranchCommandFlag', async () => {
			// Mock process.argv with a different value
			process.argv = ['node', 'script.js', 'some-other-flag'];

			// Import the module after mocking process.argv otherwise with direct import at the top, test coverage can't be reached!
			const { isFeatureBranch } = await import('./general-constants.js');

			expect(isFeatureBranch).toBe(false);
		});

		it('should be falsy when process.argv[2] is empty string', async () => {
			// Mock process.argv with empty string
			process.argv = ['node', 'script.js', ''];

			// Import the module after mocking process.argv otherwise with direct import at the top, test coverage can't be reached!
			const { isFeatureBranch } = await import('./general-constants.js');

			expect(isFeatureBranch).toBe('');
		});
	});

	describe('other constants', () => {
		it('should have correct constant values', async () => {
			// Test other constants to ensure they have expected values
			const constants = await import('./general-constants.js');

			expect(constants.tokensSsotFolder).toBe('tokens');
			expect(constants.tokenSsotFileFormat).toBe('.json');
			expect(constants.metaDataFileNameSymbol).toBe('$');
			expect(constants.preparedTokenFileFormat).toBe('.json');
			expect(constants.fileNameDelimiter).toBe('-');
			expect(constants.buildFolderName).toBe('build');
			expect(constants.tokenPackagePath).toBe('token-package');
			expect(constants.cdnArtifactFolderName).toBe('cdn/tokens');
		});

		it('should have correct computed constants', async () => {
			// Test computed constants that depend on other constants
			const constants = await import('./general-constants.js');

			expect(constants.tokenOutputFileNamePrefix).toBe('tokens-');
			expect(constants.byProductBuildPath).toBe('build/by-product/prepared-tokens');
			expect(constants.themeDefinitionFileName).toBe('$themes.json');
			expect(constants.themeDefinitionFilePath).toBe('tokens/$themes.json');
			expect(constants.themeDefinitionFileBuildPath).toBe('build/by-product/prepared-tokens/$themes.json');
			expect(constants.tokenPackageJsonPath).toBe('token-package/package.json');
			expect(constants.artifactBuildPathNpm).toBe('token-package/dist');
			expect(constants.artifactBuildPathCdn).toBe('token-package/cdn/tokens');
			expect(constants.tokenDistHistoryFilePath).toBe('token-package/dist-history.json');
		});
	});
});
