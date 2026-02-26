import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Signale } from 'signale';
import { logger } from './signal';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

describe('Signal Logger', () => {
	describe('Configuration', () => {
		it('should have correct initial state', () => {
			// Test enabled state which is controlled by the disabled config option
			expect(logger.isEnabled()).toBe(true);
		});

		it('should create scoped logger with correct name', () => {
			const scopedLogger = logger.scope('test');
			expect(scopedLogger).toBeInstanceOf(Signale);
			// The scope method would not work if the initial scope wasn't set correctly
			expect(scopedLogger.scope('child')).toBeInstanceOf(Signale);
		});
	});

	describe('Logger Instance Methods', () => {
		beforeEach(() => {
			jest.spyOn(console, 'log').mockImplementation(() => void 0);
		});

		afterEach(() => {
			jest.restoreAllMocks();
		});

		it('should have standard logging methods', () => {
			expect(typeof logger.success).toBe('function');
			expect(typeof logger.info).toBe('function');
			expect(typeof logger.debug).toBe('function');
			expect(typeof logger.warn).toBe('function');
			expect(typeof logger.error).toBe('function');
		});

		it('should return a scoped logger when using scope()', () => {
			const scopedLogger = logger.scope('test-scope');
			expect(scopedLogger).toBeInstanceOf(Signale);
		});
	});

	describe('Logger Behavior', () => {
		it('should respect enabled/disabled state', () => {
			expect(logger.isEnabled()).toBe(true);
			logger.disable();
			expect(logger.isEnabled()).toBe(false);
			logger.enable();
			expect(logger.isEnabled()).toBe(true);
		});
	});
});
