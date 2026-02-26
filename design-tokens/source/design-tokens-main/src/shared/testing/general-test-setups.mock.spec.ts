import { afterEach, beforeEach, jest } from '@jest/globals';
import { logger } from '../loggers/signal.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Empty mock implementation used for all suppressed methods
const noOp = (): void => void 0;

/**
 * Suppresses all logger methods during tests.
 * Call this in beforeEach() to suppress logger output.
 * Must be paired with restoreLoggerMocks() in afterEach().
 *
 * @example
 * ```typescript
 * beforeEach(() => {
 *   suppressLoggerOutput();
 * });
 * ```
 */
export const suppressLoggerOutput = (): void => {
	// Spy on logger methods
	jest.spyOn(logger, 'error').mockImplementation(noOp);
	jest.spyOn(logger, 'warn').mockImplementation(noOp);
	jest.spyOn(logger, 'info').mockImplementation(noOp);
	jest.spyOn(logger, 'success').mockImplementation(noOp);
	jest.spyOn(logger, 'start').mockImplementation(noOp);
	jest.spyOn(logger, 'debug').mockImplementation(noOp);
	// Spy on console methods as fallback
	jest.spyOn(console, 'error').mockImplementation(noOp);
	jest.spyOn(console, 'warn').mockImplementation(noOp);
	jest.spyOn(console, 'log').mockImplementation(noOp);
};

/**
 * Restores all mocked functions including logger and console mocks.
 * Call this in afterEach() to restore original logger behavior.
 */
export const restoreLoggerMocks = (): void => {
	jest.restoreAllMocks();
};

/**
 * Jest setup file that runs before each test.
 * This file is configured via setupFilesAfterEnv in jest.config.ts.
 *
 * Suppresses all logger output during tests to prevent pollution of test result outputs.
 */
// Before each test run with Jest
beforeEach(() => {
	suppressLoggerOutput();
});

// After each test run with Jest
afterEach(() => {
	restoreLoggerMocks();
});
