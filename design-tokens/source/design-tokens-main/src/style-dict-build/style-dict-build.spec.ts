import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { DesignSystemNames, getReadableTimeDuration, logger, logHorizontalDivider } from '../shared/index.js';
import { initialStyleDictionaryConfigRegistrations, initThemePermutations } from './configs/index.js';
import { runStyleDictionaryBuild } from './style-dict-build.js';
import {
	createBuildAllPlatformsErrorScenario,
	createCustomBrandStyleDictionaryBuildScenario,
	createEmptyThemesStyleDictionaryBuildScenario,
	createInitialRegistrationsErrorScenario,
	createMockStyleDictionary,
	createSingleThemeStyleDictionaryBuildScenario,
	createSuccessfulStyleDictionaryBuildScenario,
	createThemePermutationsErrorScenario,
} from './style-dict-build.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock all external dependencies - jest.mock calls are hoisted
jest.mock('../shared/index.js', () => {
	const actual: object = jest.requireActual('../shared/index.js');
	return {
		...actual,
		getReadableTimeDuration: jest.fn(),
		logger: {
			start: jest.fn(),
			info: jest.fn(),
			success: jest.fn(),
		},
		logHorizontalDivider: jest.fn(),
	};
});

jest.mock('./configs/index.js', () => {
	return {
		initialStyleDictionaryConfigRegistrations: jest.fn(),
		initThemePermutations: jest.fn(),
	};
});

jest.mock('style-dictionary', () => jest.fn());

// Cast mocks with proper typing
const mockGetReadableTimeDuration = getReadableTimeDuration as jest.MockedFunction<typeof getReadableTimeDuration>;
const mockLogger = logger as jest.Mocked<typeof logger>;
const mockLogHorizontalDivider = logHorizontalDivider as jest.MockedFunction<typeof logHorizontalDivider>;
const mockInitialStyleDictionaryConfigRegistrations = initialStyleDictionaryConfigRegistrations as jest.MockedFunction<
	typeof initialStyleDictionaryConfigRegistrations
>;
const mockInitThemePermutations = initThemePermutations as jest.MockedFunction<typeof initThemePermutations>;

// Get the mocked StyleDictionary
const mockStyleDictionary = jest.requireMock('style-dictionary') as jest.MockedFunction<(...args: unknown[]) => unknown>;

describe('runStyleDictionaryBuild', () => {
	let mockStyleDictionaryInstance: ReturnType<typeof createMockStyleDictionary>;

	// Note: Logger mocking (suppressLoggerOutput/restoreLoggerMocks) is automatically handled by src/shared/testing/test-helpers.mock.spec.ts via jest.config.ts setupFilesAfterEnv
	beforeEach(() => {
		jest.clearAllMocks();
		mockStyleDictionaryInstance = createMockStyleDictionary();
		mockStyleDictionary.mockImplementation(() => mockStyleDictionaryInstance);
	});

	describe('successful build scenarios', () => {
		it('should run style dictionary build successfully with multiple themes', async () => {
			const scenario = createSuccessfulStyleDictionaryBuildScenario();

			// Mock Date to control timing
			const originalDate = global.Date;
			global.Date = jest.fn(() => scenario.timeStart) as unknown as DateConstructor;
			global.Date.now = jest.fn(() => scenario.timeStart.getTime());

			// Mock all dependencies to succeed
			mockInitialStyleDictionaryConfigRegistrations.mockResolvedValueOnce();
			mockInitThemePermutations.mockReturnValueOnce({
				permutatedThemeNames: scenario.expectedPermutatedThemeNames,
				configs: scenario.expectedConfigs,
			});
			mockGetReadableTimeDuration.mockReturnValueOnce(scenario.expectedDuration);

			// Execute
			await runStyleDictionaryBuild(scenario.brand, DesignSystemNames.a1);

			// Verify the flow
			expect(mockLogHorizontalDivider).toHaveBeenCalledTimes(1);
			expect(mockLogger.start).toHaveBeenCalledWith(scenario.expectedLogMessages.start);
			expect(mockInitialStyleDictionaryConfigRegistrations).toHaveBeenCalledTimes(1);
			expect(mockInitThemePermutations).toHaveBeenCalledWith(scenario.brand, DesignSystemNames.a1);

			// Verify StyleDictionary instances creation and build calls
			expect(mockStyleDictionary).toHaveBeenCalledTimes(scenario.expectedConfigs.length);
			expect(mockStyleDictionaryInstance.buildAllPlatforms).toHaveBeenCalledTimes(scenario.expectedConfigs.length);

			// Verify info logs for each theme
			scenario.expectedPermutatedThemeNames.forEach(themeName => {
				expect(mockLogger.info).toHaveBeenCalledWith(`Style Dictionary is building all platforms for theme: ${themeName}`);
			});

			expect(mockGetReadableTimeDuration).toHaveBeenCalledWith(scenario.timeStart);
			expect(mockLogger.success).toHaveBeenCalledWith(scenario.expectedLogMessages.success);

			// Restore Date
			global.Date = originalDate;
		});

		it('should run style dictionary build successfully with custom brand', async () => {
			const scenario = createCustomBrandStyleDictionaryBuildScenario();

			// Mock Date to control timing
			const originalDate = global.Date;
			global.Date = jest.fn(() => scenario.timeStart) as unknown as DateConstructor;
			global.Date.now = jest.fn(() => scenario.timeStart.getTime());

			// Mock all dependencies to succeed
			mockInitialStyleDictionaryConfigRegistrations.mockResolvedValueOnce();
			mockInitThemePermutations.mockReturnValueOnce({
				permutatedThemeNames: scenario.expectedPermutatedThemeNames,
				configs: scenario.expectedConfigs,
			});
			mockGetReadableTimeDuration.mockReturnValueOnce(scenario.expectedDuration);

			// Execute
			await runStyleDictionaryBuild(scenario.brand, DesignSystemNames.a1);

			// Verify custom brand is passed to initThemePermutations
			expect(mockInitThemePermutations).toHaveBeenCalledWith(scenario.brand, DesignSystemNames.a1);
			expect(mockLogger.success).toHaveBeenCalledWith(scenario.expectedLogMessages.success);

			// Restore Date
			global.Date = originalDate;
		});

		it('should handle empty themes gracefully', async () => {
			const scenario = createEmptyThemesStyleDictionaryBuildScenario();

			// Mock Date to control timing
			const originalDate = global.Date;
			global.Date = jest.fn(() => scenario.timeStart) as unknown as DateConstructor;
			global.Date.now = jest.fn(() => scenario.timeStart.getTime());

			// Mock all dependencies to succeed with empty arrays
			mockInitialStyleDictionaryConfigRegistrations.mockResolvedValueOnce();
			mockInitThemePermutations.mockReturnValueOnce({
				permutatedThemeNames: scenario.expectedPermutatedThemeNames,
				configs: scenario.expectedConfigs,
			});
			mockGetReadableTimeDuration.mockReturnValueOnce(scenario.expectedDuration);

			// Execute
			await runStyleDictionaryBuild(scenario.brand, DesignSystemNames.a1);

			// Verify no StyleDictionary instances are created for empty configs
			expect(mockStyleDictionary).toHaveBeenCalledTimes(0);
			expect(mockStyleDictionaryInstance.buildAllPlatforms).toHaveBeenCalledTimes(0);
			expect(mockLogger.info).not.toHaveBeenCalledWith(expect.stringMatching(/Style Dictionary is building all platforms for theme:/));
			expect(mockLogger.success).toHaveBeenCalledWith(scenario.expectedLogMessages.success);

			// Restore Date
			global.Date = originalDate;
		});

		it('should handle single theme build', async () => {
			const scenario = createSingleThemeStyleDictionaryBuildScenario();

			// Mock Date to control timing
			const originalDate = global.Date;
			global.Date = jest.fn(() => scenario.timeStart) as unknown as DateConstructor;
			global.Date.now = jest.fn(() => scenario.timeStart.getTime());

			// Mock all dependencies to succeed
			mockInitialStyleDictionaryConfigRegistrations.mockResolvedValueOnce();
			mockInitThemePermutations.mockReturnValueOnce({
				permutatedThemeNames: scenario.expectedPermutatedThemeNames,
				configs: scenario.expectedConfigs,
			});
			mockGetReadableTimeDuration.mockReturnValueOnce(scenario.expectedDuration);

			// Execute
			await runStyleDictionaryBuild(scenario.brand, DesignSystemNames.a1);

			// Verify single instance creation and build
			expect(mockStyleDictionary).toHaveBeenCalledTimes(1);
			expect(mockStyleDictionary).toHaveBeenCalledWith(scenario.expectedConfigs[0]);
			expect(mockStyleDictionaryInstance.buildAllPlatforms).toHaveBeenCalledTimes(1);
			expect(mockLogger.info).toHaveBeenCalledWith(
				`Style Dictionary is building all platforms for theme: ${scenario.expectedPermutatedThemeNames[0]}`,
			);

			// Restore Date
			global.Date = originalDate;
		});
	});

	describe('error handling', () => {
		it('should propagate error when initialStyleDictionaryConfigRegistrations fails', async () => {
			const scenario = createInitialRegistrationsErrorScenario();

			mockInitialStyleDictionaryConfigRegistrations.mockRejectedValueOnce(scenario.error);

			// Execute and expect error
			await expect(runStyleDictionaryBuild(scenario.brand, DesignSystemNames.a1)).rejects.toThrow(scenario.expectedErrorMessage);

			// Verify that the error occurs early and subsequent functions are not called
			expect(mockLogHorizontalDivider).toHaveBeenCalledTimes(1);
			expect(mockLogger.start).toHaveBeenCalledWith('Style Dictionary builds');
			expect(mockInitialStyleDictionaryConfigRegistrations).toHaveBeenCalledTimes(1);
			expect(mockInitThemePermutations).not.toHaveBeenCalled();
			expect(mockStyleDictionary).not.toHaveBeenCalled();
			expect(mockLogger.success).not.toHaveBeenCalled();
		});

		it('should propagate error when initThemePermutations fails', async () => {
			const scenario = createThemePermutationsErrorScenario();

			mockInitialStyleDictionaryConfigRegistrations.mockResolvedValueOnce();
			mockInitThemePermutations.mockImplementation(() => {
				throw scenario.error;
			});

			// Execute and expect error
			await expect(runStyleDictionaryBuild(scenario.brand, DesignSystemNames.a1)).rejects.toThrow(scenario.expectedErrorMessage);

			// Verify that the error occurs after initialStyleDictionaryConfigRegistrations
			expect(mockInitialStyleDictionaryConfigRegistrations).toHaveBeenCalledTimes(1);
			expect(mockInitThemePermutations).toHaveBeenCalledWith(scenario.brand, DesignSystemNames.a1);
			expect(mockStyleDictionary).not.toHaveBeenCalled();
			expect(mockLogger.success).not.toHaveBeenCalled();
		});

		it('should propagate error when buildAllPlatforms fails', async () => {
			const scenario = createBuildAllPlatformsErrorScenario();

			// Mock Date to control timing
			const originalDate = global.Date;
			const fixedDate = new Date('2023-01-01T10:00:00.000Z');
			global.Date = jest.fn(() => fixedDate) as unknown as DateConstructor;

			mockInitialStyleDictionaryConfigRegistrations.mockResolvedValueOnce();
			mockInitThemePermutations.mockReturnValueOnce({
				permutatedThemeNames: scenario.expectedPermutatedThemeNames,
				configs: scenario.expectedConfigs,
			});

			// Mock buildAllPlatforms to fail on specific theme
			mockStyleDictionaryInstance.buildAllPlatforms
				.mockResolvedValueOnce(undefined) // First theme succeeds
				.mockRejectedValueOnce(scenario.error); // Second theme fails

			// Execute and expect error
			await expect(runStyleDictionaryBuild(scenario.brand, DesignSystemNames.a1)).rejects.toThrow(scenario.expectedErrorMessage);

			// Verify that StyleDictionary instances are created and first one succeeds
			expect(mockStyleDictionary).toHaveBeenCalledTimes(2); // First and second theme
			expect(mockStyleDictionaryInstance.buildAllPlatforms).toHaveBeenCalledTimes(2);
			expect(mockLogger.info).toHaveBeenCalledWith(
				`Style Dictionary is building all platforms for theme: ${scenario.expectedPermutatedThemeNames[0]}`,
			);
			expect(mockLogger.info).toHaveBeenCalledWith(`Style Dictionary is building all platforms for theme: ${scenario.failingThemeName}`);
			expect(mockLogger.success).not.toHaveBeenCalled();

			// Restore Date
			global.Date = originalDate;
		});
	});

	describe('integration scenarios', () => {
		it('should handle execution flow in correct order', async () => {
			const scenario = createSuccessfulStyleDictionaryBuildScenario();
			const callOrder: string[] = [];

			// Mock Date to control timing
			const originalDate = global.Date;
			global.Date = jest.fn(() => scenario.timeStart) as unknown as DateConstructor;

			// Mock all dependencies to track call order
			mockLogHorizontalDivider.mockImplementation(() => {
				callOrder.push('logHorizontalDivider');
			});

			mockLogger.start.mockImplementation(() => {
				callOrder.push('logger.start');
			});

			mockInitialStyleDictionaryConfigRegistrations.mockImplementation(async () => {
				callOrder.push('initialStyleDictionaryConfigRegistrations');
			});

			mockInitThemePermutations.mockImplementation(() => {
				callOrder.push('initThemePermutations');
				return {
					permutatedThemeNames: scenario.expectedPermutatedThemeNames,
					configs: scenario.expectedConfigs,
				};
			});

			mockStyleDictionary.mockImplementation(() => {
				callOrder.push('StyleDictionary.constructor');
				return mockStyleDictionaryInstance;
			});

			mockStyleDictionaryInstance.buildAllPlatforms.mockImplementation(async () => {
				callOrder.push('buildAllPlatforms');
			});

			mockGetReadableTimeDuration.mockImplementation(() => {
				callOrder.push('getReadableTimeDuration');
				return scenario.expectedDuration;
			});

			mockLogger.success.mockImplementation(() => {
				callOrder.push('logger.success');
			});

			// Execute
			await runStyleDictionaryBuild(scenario.brand, DesignSystemNames.a1);

			// Verify execution order
			expect(callOrder).toEqual([
				'logHorizontalDivider',
				'logger.start',
				'initialStyleDictionaryConfigRegistrations',
				'initThemePermutations',
				...Array(scenario.expectedConfigs.length)
					.fill(null)
					.flatMap(() => ['StyleDictionary.constructor', 'buildAllPlatforms']),
				'getReadableTimeDuration',
				'logger.success',
			]);

			// Restore Date
			global.Date = originalDate;
		});

		it('should pass correct config to each StyleDictionary instance', async () => {
			const scenario = createSuccessfulStyleDictionaryBuildScenario();

			// Mock Date to control timing
			const originalDate = global.Date;
			global.Date = jest.fn(() => scenario.timeStart) as unknown as DateConstructor;

			mockInitialStyleDictionaryConfigRegistrations.mockResolvedValueOnce();
			mockInitThemePermutations.mockReturnValueOnce({
				permutatedThemeNames: scenario.expectedPermutatedThemeNames,
				configs: scenario.expectedConfigs,
			});
			mockGetReadableTimeDuration.mockReturnValueOnce(scenario.expectedDuration);

			// Execute
			await runStyleDictionaryBuild(scenario.brand, DesignSystemNames.a1);

			// Verify each config is passed correctly
			scenario.expectedConfigs.forEach((config, index) => {
				expect(mockStyleDictionary).toHaveBeenNthCalledWith(index + 1, config);
			});

			// Restore Date
			global.Date = originalDate;
		});

		it('should create new Date instance for timing', async () => {
			const scenario = createSuccessfulStyleDictionaryBuildScenario();

			// Spy on Date constructor
			const originalDate = global.Date;
			const mockDate = jest.fn(() => scenario.timeStart) as unknown as DateConstructor;
			global.Date = mockDate;

			mockInitialStyleDictionaryConfigRegistrations.mockResolvedValueOnce();
			mockInitThemePermutations.mockReturnValueOnce({
				permutatedThemeNames: scenario.expectedPermutatedThemeNames,
				configs: scenario.expectedConfigs,
			});
			mockGetReadableTimeDuration.mockReturnValueOnce(scenario.expectedDuration);

			// Execute
			await runStyleDictionaryBuild(scenario.brand, DesignSystemNames.a1);

			// Verify Date constructor was called
			expect(mockDate).toHaveBeenCalledTimes(1);
			expect(mockGetReadableTimeDuration).toHaveBeenCalledWith(scenario.timeStart);

			// Restore Date
			global.Date = originalDate;
		});

		it('should await all async operations correctly', async () => {
			const scenario = createSuccessfulStyleDictionaryBuildScenario();
			let registrationResolved = false;
			let buildsResolved = 0;

			// Mock Date to control timing
			const originalDate = global.Date;
			global.Date = jest.fn(() => scenario.timeStart) as unknown as DateConstructor;

			// Mock with delayed resolution to test async behavior
			mockInitialStyleDictionaryConfigRegistrations.mockImplementation(async () => {
				await new Promise(resolve => setTimeout(resolve, 10));
				registrationResolved = true;
			});

			mockInitThemePermutations.mockReturnValueOnce({
				permutatedThemeNames: scenario.expectedPermutatedThemeNames,
				configs: scenario.expectedConfigs,
			});

			mockStyleDictionaryInstance.buildAllPlatforms.mockImplementation(async () => {
				await new Promise(resolve => setTimeout(resolve, 5));
				buildsResolved++;
			});

			mockGetReadableTimeDuration.mockReturnValueOnce(scenario.expectedDuration);

			// Execute
			await runStyleDictionaryBuild(scenario.brand, DesignSystemNames.a1);

			// Verify all async operations completed
			expect(registrationResolved).toBe(true);
			expect(buildsResolved).toBe(scenario.expectedConfigs.length);
			expect(mockLogger.success).toHaveBeenCalledWith(scenario.expectedLogMessages.success);

			// Restore Date
			global.Date = originalDate;
		});
	});

	describe('edge cases', () => {
		it('should handle empty brand string', async () => {
			const scenario = createSuccessfulStyleDictionaryBuildScenario();
			const emptyBrand = '';

			// Mock Date to control timing
			const originalDate = global.Date;
			global.Date = jest.fn(() => scenario.timeStart) as unknown as DateConstructor;

			mockInitialStyleDictionaryConfigRegistrations.mockResolvedValueOnce();
			mockInitThemePermutations.mockReturnValueOnce({
				permutatedThemeNames: scenario.expectedPermutatedThemeNames,
				configs: scenario.expectedConfigs,
			});
			mockGetReadableTimeDuration.mockReturnValueOnce(scenario.expectedDuration);

			// Execute
			await runStyleDictionaryBuild(emptyBrand, DesignSystemNames.a1);

			// Verify empty brand is passed to initThemePermutations
			expect(mockInitThemePermutations).toHaveBeenCalledWith(emptyBrand, DesignSystemNames.a1);

			// Restore Date
			global.Date = originalDate;
		});

		it('should handle special characters in brand name', async () => {
			const scenario = createSuccessfulStyleDictionaryBuildScenario();
			const specialBrand = 'brand-with-special_chars@123';

			// Mock Date to control timing
			const originalDate = global.Date;
			global.Date = jest.fn(() => scenario.timeStart) as unknown as DateConstructor;

			mockInitialStyleDictionaryConfigRegistrations.mockResolvedValueOnce();
			mockInitThemePermutations.mockReturnValueOnce({
				permutatedThemeNames: scenario.expectedPermutatedThemeNames,
				configs: scenario.expectedConfigs,
			});
			mockGetReadableTimeDuration.mockReturnValueOnce(scenario.expectedDuration);

			// Execute
			await runStyleDictionaryBuild(specialBrand, DesignSystemNames.a1);

			// Verify special brand is passed to initThemePermutations
			expect(mockInitThemePermutations).toHaveBeenCalledWith(specialBrand, DesignSystemNames.a1);

			// Restore Date
			global.Date = originalDate;
		});

		it('should handle extremely large number of themes', async () => {
			const largeNumberOfThemes = 1000;
			const largeBrand = 'large-brand';
			const largeThemeNames = Array.from({ length: largeNumberOfThemes }, (_, i) => `Theme-${i}`);
			const successfulScenario = createSuccessfulStyleDictionaryBuildScenario();
			const largeConfigs = largeThemeNames.map(() => successfulScenario.expectedConfigs[0]);

			// Mock Date to control timing
			const originalDate = global.Date;
			const startTime = new Date('2023-01-01T10:00:00.000Z');
			global.Date = jest.fn(() => startTime) as unknown as DateConstructor;

			mockInitialStyleDictionaryConfigRegistrations.mockResolvedValueOnce();
			mockInitThemePermutations.mockReturnValueOnce({
				permutatedThemeNames: largeThemeNames,
				configs: largeConfigs,
			});
			mockGetReadableTimeDuration.mockReturnValueOnce('01:30:45');

			// Execute
			await runStyleDictionaryBuild(largeBrand, DesignSystemNames.a1);

			// Verify all themes are processed
			expect(mockStyleDictionary).toHaveBeenCalledTimes(largeNumberOfThemes);
			expect(mockStyleDictionaryInstance.buildAllPlatforms).toHaveBeenCalledTimes(largeNumberOfThemes);

			// Restore Date
			global.Date = originalDate;
		});
	});
});
