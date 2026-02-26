import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { getReadableTimeDuration } from './time-stamps';
import { expectedDurations, mockTimeStamps } from './time-stamps.mock.spec';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

describe('Time Stamps', () => {
	describe('getReadableTimeDuration', () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let mockDate: any;

		beforeEach(() => {
			// Reset programStartTime for each test
			jest.resetModules();
			jest.clearAllMocks();
		});

		it('should return correct duration when using program start time', () => {
			// Mock initial Date call for programStartTime
			jest
				.spyOn(global, 'Date')
				.mockImplementationOnce(() => mockTimeStamps.startTime) // for programStartTime
				.mockImplementation(() => mockTimeStamps.endTimeOneHour); // for subsequent calls

			const duration = getReadableTimeDuration();
			expect(duration).toBe(expectedDurations.oneHour);
		});

		it('should return correct duration with custom start time - 1 hour', () => {
			mockDate = jest.spyOn(global, 'Date').mockImplementation(() => mockTimeStamps.endTimeOneHour);
			const duration = getReadableTimeDuration(mockTimeStamps.startTime);
			expect(duration).toBe(expectedDurations.oneHour);

			mockDate.mockRestore();
		});

		it('should return correct duration with custom start time - 1 minute', () => {
			mockDate = jest.spyOn(global, 'Date').mockImplementation(() => mockTimeStamps.endTimeOneMinute);
			const duration = getReadableTimeDuration(mockTimeStamps.startTime);
			expect(duration).toBe(expectedDurations.oneMinute);

			mockDate.mockRestore();
		});

		it('should return correct duration with custom start time - 1 second', () => {
			mockDate = jest.spyOn(global, 'Date').mockImplementation(() => mockTimeStamps.endTimeOneSecond);
			const duration = getReadableTimeDuration(mockTimeStamps.startTime);
			expect(duration).toBe(expectedDurations.oneSecond);

			mockDate.mockRestore();
		});
	});
});
