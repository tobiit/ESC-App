import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { DesignSystemNames, logger, logHorizontalDivider } from '../shared/index.js';
import { loadTokenData } from './token-loader/token-loader.js';
import { runTokenPreparations } from './token-preparations/token-preparations.js';
import { checkForTokenSetExtensionCaseAndPrepare } from './token-set-extension/token-set-extension.js';
import { runPreparations } from './preparations.js';
import {
	createCheckForTokenSetExtensionErrorScenario,
	createCustomPathRunPreparationsScenario,
	createLoadTokenDataErrorScenario,
	createRunTokenPreparationsErrorScenario,
	createSuccessfulRunPreparationsScenario,
} from './preparations.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock all external dependencies
jest.mock('../shared/index.js', () => {
	const actual: object = jest.requireActual('../shared/index.js');
	return {
		...actual,
		logHorizontalDivider: jest.fn(),
	};
});

jest.mock('./token-loader/token-loader.js', () => {
	return {
		loadTokenData: jest.fn(),
	};
});

jest.mock('./token-preparations/token-preparations.js', () => {
	return {
		runTokenPreparations: jest.fn(),
	};
});

jest.mock('./token-set-extension/token-set-extension.js', () => {
	return {
		checkForTokenSetExtensionCaseAndPrepare: jest.fn(),
	};
});

// Cast mocks with proper typing
const mockLogger = logger as jest.Mocked<typeof logger>;
const mockLogHorizontalDivider = logHorizontalDivider as jest.MockedFunction<typeof logHorizontalDivider>;
const mockLoadTokenData = loadTokenData as jest.MockedFunction<typeof loadTokenData>;
const mockRunTokenPreparations = runTokenPreparations as jest.MockedFunction<typeof runTokenPreparations>;
const mockCheckForTokenSetExtensionCaseAndPrepare = checkForTokenSetExtensionCaseAndPrepare as jest.MockedFunction<
	typeof checkForTokenSetExtensionCaseAndPrepare
>;

describe('runPreparations', () => {
	// Note: Logger mocking (suppressLoggerOutput/restoreLoggerMocks) is automatically handled by src/shared/testing/test-helpers.mock.spec.ts via jest.config.ts setupFilesAfterEnv
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('successful preparation runs', () => {
		it('should run preparations successfully with default token folder', async () => {
			const scenario = createSuccessfulRunPreparationsScenario();

			// Mock all dependencies to succeed
			mockCheckForTokenSetExtensionCaseAndPrepare.mockResolvedValueOnce();
			mockLoadTokenData.mockResolvedValueOnce(scenario.expectedLoadTokenDataResult);
			mockRunTokenPreparations.mockImplementation(() => {
				// Mock implementation - no return value needed
			});

			// Execute
			await runPreparations(DesignSystemNames.a1, scenario.tokenSsotExtensionFolderPath);

			// Verify the flow
			expect(mockLogHorizontalDivider).toHaveBeenCalledTimes(1);
			expect(mockLogger.start).toHaveBeenCalledWith('Loading and tokens SSOT preparations started');
			expect(mockCheckForTokenSetExtensionCaseAndPrepare).toHaveBeenCalledWith(scenario.tokenSsotExtensionFolderPath);
			expect(mockLoadTokenData).toHaveBeenCalledWith(scenario.expectedResolvedFolder);
			expect(mockRunTokenPreparations).toHaveBeenCalledWith(
				scenario.expectedLoadTokenDataResult.figmaTokenFullFilePaths,
				scenario.expectedLoadTokenDataResult.allTokensPerModifier,
			);
			expect(mockLogger.success).toHaveBeenCalledWith('All Preparations finished');
		});

		it('should run preparations successfully with custom token folder path', async () => {
			const scenario = createCustomPathRunPreparationsScenario();

			// Mock all dependencies to succeed
			mockCheckForTokenSetExtensionCaseAndPrepare.mockResolvedValueOnce();
			mockLoadTokenData.mockResolvedValueOnce(scenario.expectedLoadTokenDataResult);
			mockRunTokenPreparations.mockImplementation(() => {
				// Mock implementation - no return value needed
			});

			// Execute
			await runPreparations(DesignSystemNames.a1, scenario.tokenSsotExtensionFolderPath);

			// Verify the flow with custom path
			expect(mockLogHorizontalDivider).toHaveBeenCalledTimes(1);
			expect(mockLogger.start).toHaveBeenCalledWith('Loading and tokens SSOT preparations started');
			expect(mockCheckForTokenSetExtensionCaseAndPrepare).toHaveBeenCalledWith(scenario.tokenSsotExtensionFolderPath);
			expect(mockLoadTokenData).toHaveBeenCalledWith(scenario.expectedResolvedFolder);
			expect(mockRunTokenPreparations).toHaveBeenCalledWith(
				scenario.expectedLoadTokenDataResult.figmaTokenFullFilePaths,
				scenario.expectedLoadTokenDataResult.allTokensPerModifier,
			);
			expect(mockLogger.success).toHaveBeenCalledWith('All Preparations finished');
		});

		it('should handle undefined tokenSsotExtensionFolderPath and use default', async () => {
			const scenario = createSuccessfulRunPreparationsScenario();

			// Mock all dependencies to succeed
			mockCheckForTokenSetExtensionCaseAndPrepare.mockResolvedValueOnce();
			mockLoadTokenData.mockResolvedValueOnce(scenario.expectedLoadTokenDataResult);
			mockRunTokenPreparations.mockImplementation(() => {
				// Mock implementation - no return value needed
			});

			// Execute with undefined (same as no parameter)
			await runPreparations(DesignSystemNames.a1);

			// Verify that tokens/a1 is used as fallback
			expect(mockLoadTokenData).toHaveBeenCalledWith('tokens/a1');
		});
	});

	describe('error handling', () => {
		it('should propagate error when checkForTokenSetExtensionCaseAndPrepare fails', async () => {
			const scenario = createCheckForTokenSetExtensionErrorScenario();

			mockCheckForTokenSetExtensionCaseAndPrepare.mockRejectedValueOnce(scenario.error);

			// Execute and expect error
			await expect(runPreparations(DesignSystemNames.a1, scenario.tokenSsotExtensionFolderPath)).rejects.toThrow(scenario.error.message);

			// Verify that the error occurs early and subsequent functions are not called
			expect(mockLogHorizontalDivider).toHaveBeenCalledTimes(1);
			expect(mockLogger.start).toHaveBeenCalledWith('Loading and tokens SSOT preparations started');
			expect(mockCheckForTokenSetExtensionCaseAndPrepare).toHaveBeenCalledWith(scenario.tokenSsotExtensionFolderPath);
			expect(mockLoadTokenData).not.toHaveBeenCalled();
			expect(mockRunTokenPreparations).not.toHaveBeenCalled();
			expect(mockLogger.success).not.toHaveBeenCalled();
		});

		it('should propagate error when loadTokenData fails', async () => {
			const scenario = createLoadTokenDataErrorScenario();

			mockCheckForTokenSetExtensionCaseAndPrepare.mockResolvedValueOnce();
			mockLoadTokenData.mockRejectedValueOnce(scenario.error);

			// Execute and expect error
			await expect(runPreparations(DesignSystemNames.a1, scenario.tokenSsotExtensionFolderPath)).rejects.toThrow(scenario.error.message);

			// Verify that the error occurs after checkForTokenSetExtensionCaseAndPrepare
			expect(mockCheckForTokenSetExtensionCaseAndPrepare).toHaveBeenCalledWith(scenario.tokenSsotExtensionFolderPath);
			expect(mockLoadTokenData).toHaveBeenCalledWith(scenario.expectedResolvedFolder);
			expect(mockRunTokenPreparations).not.toHaveBeenCalled();
			expect(mockLogger.success).not.toHaveBeenCalled();
		});

		it('should propagate error when runTokenPreparations fails', async () => {
			const scenario = createRunTokenPreparationsErrorScenario();

			mockCheckForTokenSetExtensionCaseAndPrepare.mockResolvedValueOnce();
			mockLoadTokenData.mockResolvedValueOnce(scenario.expectedLoadTokenDataResult);
			mockRunTokenPreparations.mockImplementation(() => {
				throw scenario.error;
			});

			// Execute and expect error
			await expect(runPreparations(DesignSystemNames.a1, scenario.tokenSsotExtensionFolderPath)).rejects.toThrow(scenario.error.message);

			// Verify that the error occurs after loadTokenData
			expect(mockCheckForTokenSetExtensionCaseAndPrepare).toHaveBeenCalledWith(scenario.tokenSsotExtensionFolderPath);
			expect(mockLoadTokenData).toHaveBeenCalledWith(scenario.expectedResolvedFolder);
			expect(mockRunTokenPreparations).toHaveBeenCalledWith(
				scenario.expectedLoadTokenDataResult.figmaTokenFullFilePaths,
				scenario.expectedLoadTokenDataResult.allTokensPerModifier,
			);
			expect(mockLogger.success).not.toHaveBeenCalled();
		});
	});

	describe('integration scenarios', () => {
		it('should handle execution flow in correct order', async () => {
			const scenario = createSuccessfulRunPreparationsScenario();

			// Mock all dependencies to succeed with specific implementation to track call order
			const callOrder: string[] = [];

			mockLogHorizontalDivider.mockImplementation(() => {
				callOrder.push('logHorizontalDivider');
			});

			mockLogger.start.mockImplementation(() => {
				callOrder.push('logger.start');
			});

			mockCheckForTokenSetExtensionCaseAndPrepare.mockImplementation(async () => {
				callOrder.push('checkForTokenSetExtensionCaseAndPrepare');
			});

			mockLoadTokenData.mockImplementation(async () => {
				callOrder.push('loadTokenData');
				return scenario.expectedLoadTokenDataResult;
			});

			mockRunTokenPreparations.mockImplementation(() => {
				callOrder.push('runTokenPreparations');
			});

			mockLogger.success.mockImplementation(() => {
				callOrder.push('logger.success');
			});

			// Execute
			await runPreparations(DesignSystemNames.a1, scenario.tokenSsotExtensionFolderPath);

			// Verify execution order
			expect(callOrder).toEqual([
				'logHorizontalDivider',
				'logger.start',
				'checkForTokenSetExtensionCaseAndPrepare',
				'loadTokenData',
				'runTokenPreparations',
				'logger.success',
			]);
		});

		it('should handle Promise.resolve correctly', async () => {
			const scenario = createSuccessfulRunPreparationsScenario();

			// Mock all dependencies to succeed
			mockCheckForTokenSetExtensionCaseAndPrepare.mockResolvedValueOnce();
			mockLoadTokenData.mockResolvedValueOnce(scenario.expectedLoadTokenDataResult);
			mockRunTokenPreparations.mockImplementation(() => {
				// Mock implementation - no return value needed
			});

			// Execute and verify it completes without hanging
			const startTime = Date.now();
			await runPreparations(DesignSystemNames.a1, scenario.tokenSsotExtensionFolderPath);
			const endTime = Date.now();

			// Should complete quickly (dummy Promise.resolve should not cause delay)
			expect(endTime - startTime).toBeLessThan(1000); // Less than 1 second
			expect(mockLogger.success).toHaveBeenCalledWith('All Preparations finished');
		});
	});
});
