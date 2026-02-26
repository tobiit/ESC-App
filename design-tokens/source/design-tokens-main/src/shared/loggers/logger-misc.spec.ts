import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { mockDebugContext, mockError, mockErrorMessages, originalConsoleLog } from './logger-misc.mock.spec';
import { logGeneralError, logHorizontalDivider, logicalTokenSetError } from './logger-misc';
import { logger } from './signal';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock the logger to prevent actual logging during tests
jest.mock('./signal', () => {
	return {
		logger: {
			error: jest.fn(),
			warn: jest.fn(),
			info: jest.fn(),
			success: jest.fn(),
			start: jest.fn(),
			debug: jest.fn(),
		},
	};
});

// Note: Logger mocking (suppressLoggerOutput/restoreLoggerMocks) is automatically handled by src/shared/testing/test-helpers.mock.spec.ts via jest.config.ts setupFilesAfterEnv
describe('Logger Miscellaneous Functions', () => {
	beforeEach(() => {
		// Clear all mock calls before each test
		jest.clearAllMocks();
		console.log = jest.fn();
	});

	afterEach(() => {
		// Restore original console.log after tests
		console.log = originalConsoleLog;
	});

	describe('logGeneralError', () => {
		it('should log error message and throw error with message only', () => {
			// Arrange & Act
			const throwFunction = () => logGeneralError(mockErrorMessages.general);

			// Assert
			expect(throwFunction).toThrow(mockErrorMessages.general);
			expect(logger.error).toHaveBeenCalledWith(mockErrorMessages.general);
			expect(logger.error).toHaveBeenCalledTimes(1);
		});

		it('should log error message and throw provided error object', () => {
			// Arrange & Act
			const throwFunction = () => logGeneralError(mockErrorMessages.general, mockError);

			// Assert
			expect(throwFunction).toThrow(mockError);
			expect(logger.error).toHaveBeenCalledWith(mockErrorMessages.general);
			expect(logger.error).toHaveBeenCalledTimes(1);
		});
	});

	describe('logHorizontalDivider', () => {
		it('should log a horizontal divider with correct format', () => {
			// Act
			logHorizontalDivider();

			// Assert
			expect(console.log).toHaveBeenCalledWith('\n═════════════════════════════════════════════════════════════════════════════════\n');
			expect(console.log).toHaveBeenCalledTimes(1);
		});
	});

	describe('logicalTokenSetError', () => {
		it('should log error message and throw error without debug context', () => {
			// Arrange & Act
			const throwFunction = () => logicalTokenSetError(mockErrorMessages.withContext);

			// Assert
			expect(throwFunction).toThrow(mockErrorMessages.withContext);
			expect(logger.error).toHaveBeenCalledWith(mockErrorMessages.withContext);
			expect(logger.debug).not.toHaveBeenCalled();
			expect(logger.error).toHaveBeenCalledTimes(1);
		});

		it('should log error message with debug context and throw error', () => {
			// Arrange & Act
			const throwFunction = () => logicalTokenSetError(mockErrorMessages.withContext, mockDebugContext);

			// Assert
			expect(throwFunction).toThrow(mockErrorMessages.withContext);
			expect(logger.error).toHaveBeenCalledWith(mockErrorMessages.withContext);
			mockDebugContext.forEach(debugInfo => {
				expect(logger.debug).toHaveBeenCalledWith(debugInfo);
			});
			expect(logger.error).toHaveBeenCalledTimes(1);
			expect(logger.debug).toHaveBeenCalledTimes(mockDebugContext.length);
		});
	});
});
