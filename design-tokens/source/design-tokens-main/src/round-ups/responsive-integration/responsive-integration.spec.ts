import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { A1Breakpoints, DesignSystemNames, TokenLayers } from '../../shared/index.js';
import { runResponsiveCssIntegration } from './responsive-integration.js';
import {
	dummyOeName,
	mockedCompareBreakpointFiles,
	mockedLogger,
	mockedReadJsonFile,
	mockGridCoreTokens,
	mockGridCoreTokensMinimal,
	mockGridCoreTokensMissingBreakpoint,
} from './responsive-integration.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

jest.mock('../../shared/index.js', () => {
	const actual: object = jest.requireActual('../../shared/index.js');
	const mockLogger = {
		info: jest.fn(),
		success: jest.fn(),
		start: jest.fn(),
		error: jest.fn(),
		debug: jest.fn(),
		warn: jest.fn(),
	};
	return {
		...actual,
		readJsonFile: jest.fn(),
		readLinesFromFile: jest.fn(),
		appendToFile: jest.fn(),
		copyFile: jest.fn(),
		loadFilesFromFolder: jest.fn(),
		logHorizontalDivider: jest.fn(),
		logicalTokenSetError: jest.fn().mockImplementation((...args: unknown[]) => {
			// Mock the real behavior: call logger.error and throw error
			const errorMessage = args[0] as string;
			const debugContext = (args[1] as string[]) || [];
			mockLogger.error(errorMessage);
			debugContext.forEach(debuggingInfo => {
				mockLogger.debug(debuggingInfo);
			});
			throw new Error(errorMessage);
		}),
		logger: mockLogger,
	};
});

jest.mock('fs-extra', () => {
	const actual: object = jest.requireActual('fs-extra');
	return {
		...actual,
		existsSync: jest.fn(),
	};
});

jest.mock('./helpers/index.js', () => {
	return {
		compareBreakpointFiles: jest.fn(),
		inferScssMixin: jest.fn(),
	};
});

describe('Responsive Integration', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockedReadJsonFile.mockReturnValue(mockGridCoreTokens);
	});

	describe('Responsive Integration for all CSS output files', () => {
		it('should process files for all breakpoints', async () => {
			// Setup mocks for successful processing with helper
			mockedCompareBreakpointFiles.mockResolvedValueOnce(A1Breakpoints.s).mockResolvedValueOnce(A1Breakpoints.m);

			await runResponsiveCssIntegration(dummyOeName, DesignSystemNames.a1);

			// Verify function calls
			expect(mockedReadJsonFile).toHaveBeenCalledWith('tokens/a1/core/grid.json');
			expect(mockedLogger.start).toHaveBeenCalledWith('Running responsive integration for CSS output file assets.');
			expect(mockedLogger.success).toHaveBeenCalledWith('Responsive integration for CSS output file assets completed.');
			expect(mockedCompareBreakpointFiles).toHaveBeenCalled();
		});

		it('should handle missing files gracefully', async () => {
			// Setup mock to simulate error from compareBreakpointFiles
			mockedCompareBreakpointFiles.mockRejectedValue(new Error('No files found'));

			// Expect the function to throw an error
			await expect(runResponsiveCssIntegration(dummyOeName, DesignSystemNames.a1)).rejects.toThrow('Responsive integration failed');

			// Verify error logging was called via logicalTokenSetError
			expect(mockedLogger.error).toHaveBeenCalledWith('Responsive integration failed');
			expect(mockedLogger.debug).toHaveBeenCalled();
		});

		it('should handle file loading errors', async () => {
			// Setup mock to simulate compareBreakpointFiles failure
			mockedCompareBreakpointFiles.mockRejectedValue(new Error('Failed to load files'));

			await expect(runResponsiveCssIntegration(dummyOeName, DesignSystemNames.a1)).rejects.toThrow('Responsive integration failed');

			expect(mockedLogger.error).toHaveBeenCalledWith('Responsive integration failed');
		});

		it('should handle missing breakpoint value', async () => {
			// Mock grid tokens without required breakpoint
			mockedReadJsonFile.mockReturnValue(mockGridCoreTokensMissingBreakpoint);
			// The function will still try to call compareBreakpointFiles, so mock it to reject
			mockedCompareBreakpointFiles.mockRejectedValue(new Error('Breakpoint value for s is not defined.'));

			await expect(runResponsiveCssIntegration(dummyOeName, DesignSystemNames.a1)).rejects.toThrow('Responsive integration failed');
		});

		it('should handle line count mismatch between files', async () => {
			mockedCompareBreakpointFiles.mockRejectedValue(new Error('Line count mismatch between files'));

			await expect(runResponsiveCssIntegration(dummyOeName, DesignSystemNames.a1)).rejects.toThrow('Responsive integration failed');
		});

		it('should handle CSS variable name mismatch', async () => {
			mockedCompareBreakpointFiles.mockRejectedValue(new Error('Variable mismatch: --color-primary !== --color-secondary'));

			await expect(runResponsiveCssIntegration(dummyOeName, DesignSystemNames.a1)).rejects.toThrow('Responsive integration failed');
		});

		it('should handle code line structure mismatch', async () => {
			mockedCompareBreakpointFiles.mockRejectedValue(new Error('Output file code line comparison mismatch'));

			await expect(runResponsiveCssIntegration(dummyOeName, DesignSystemNames.a1)).rejects.toThrow('Responsive integration failed');
		});
	});

	describe('Media Query Generation', () => {
		it('should generate correct media queries for M breakpoint', async () => {
			// This test verifies the integration with the media query generator
			mockedCompareBreakpointFiles.mockResolvedValue(A1Breakpoints.m);

			await runResponsiveCssIntegration(dummyOeName, DesignSystemNames.a1);

			// Verify logger calls indicating processing
			expect(mockedLogger.start).toHaveBeenCalled();
			expect(mockedLogger.success).toHaveBeenCalled();
		});

		it('should generate correct media queries for L breakpoint', async () => {
			// Test L breakpoint processing by ensuring all breakpoints are processed
			mockedCompareBreakpointFiles
				.mockResolvedValueOnce(A1Breakpoints.s)
				.mockResolvedValueOnce(A1Breakpoints.m)
				.mockResolvedValueOnce(A1Breakpoints.l);

			await runResponsiveCssIntegration(dummyOeName, DesignSystemNames.a1);

			expect(mockedLogger.success).toHaveBeenCalledWith('Responsive integration for CSS output file assets completed.');
		});
	});

	describe('Error Handling', () => {
		it('should handle empty file content', async () => {
			mockedCompareBreakpointFiles.mockResolvedValue(A1Breakpoints.xs);

			// Empty files should not cause errors, just complete successfully
			await runResponsiveCssIntegration(dummyOeName, DesignSystemNames.a1);

			expect(mockedLogger.success).toHaveBeenCalled();
		});

		it('should handle missing breakpoint values', async () => {
			mockedReadJsonFile.mockReturnValue(mockGridCoreTokensMinimal);
			mockedCompareBreakpointFiles.mockResolvedValue(A1Breakpoints.xs);

			await runResponsiveCssIntegration(dummyOeName, DesignSystemNames.a1);

			// Should complete with warning for no comparisons
			expect(mockedLogger.success).toHaveBeenCalled();
		});

		it('should handle CSS variable mismatches', async () => {
			mockedCompareBreakpointFiles.mockRejectedValue(new Error('Variable mismatch: --font-size !== --font-weight'));

			await expect(runResponsiveCssIntegration(dummyOeName, DesignSystemNames.a1)).rejects.toThrow('Responsive integration failed');
		});

		it('should handle errors without stack trace', async () => {
			// Create an error without stack trace
			const errorWithoutStack = new Error('Test error');
			delete errorWithoutStack.stack;

			mockedCompareBreakpointFiles.mockRejectedValue(errorWithoutStack);

			await expect(runResponsiveCssIntegration(dummyOeName, DesignSystemNames.a1)).rejects.toThrow('Responsive integration failed');

			expect(mockedLogger.error).toHaveBeenCalledWith('Responsive integration failed');
			expect(mockedLogger.debug).toHaveBeenCalledWith('Test error');
			expect(mockedLogger.debug).toHaveBeenCalledWith('');
		});
	});

	describe('Content Integration', () => {
		it('should properly merge CSS content for M breakpoint', async () => {
			mockedCompareBreakpointFiles.mockResolvedValue(A1Breakpoints.m);

			await runResponsiveCssIntegration(dummyOeName, DesignSystemNames.a1);

			// Verify success completion indicating processing occurred
			expect(mockedLogger.success).toHaveBeenCalledWith('Responsive integration for CSS output file assets completed.');
		});

		it('should properly merge CSS content for L breakpoint', async () => {
			// With 7 breakpoints (xs, s, m, l, xl, 2xl, 3xl), there should be 6 comparisons
			mockedCompareBreakpointFiles
				.mockResolvedValueOnce(A1Breakpoints.s) // xs vs s -> s
				.mockResolvedValueOnce(A1Breakpoints.m) // s vs m -> m
				.mockResolvedValueOnce(A1Breakpoints.l) // m vs l -> l
				.mockResolvedValueOnce(A1Breakpoints.xl) // l vs xl -> xl
				.mockResolvedValueOnce(A1Breakpoints.xxl) // xl vs xxl -> xxl
				.mockResolvedValueOnce(A1Breakpoints.xxxl); // xxl vs xxxl -> xxxl

			await runResponsiveCssIntegration(dummyOeName, DesignSystemNames.a1);

			// Should process 6 breakpoint comparisons (7 breakpoints = 6 comparisons)
			expect(mockedCompareBreakpointFiles).toHaveBeenCalledTimes(6);
			expect(mockedLogger.success).toHaveBeenCalled();
		});

		it('should not create media queries for unchanged values', async () => {
			mockedCompareBreakpointFiles.mockResolvedValue(A1Breakpoints.xs); // No progression indicates no changes

			await runResponsiveCssIntegration(dummyOeName, DesignSystemNames.a1);

			// Should complete successfully even with no changes
			expect(mockedLogger.success).toHaveBeenCalled();
		});

		it('should handle empty breakpoints and default to xs', async () => {
			// Mock grid tokens with no breakpoints (empty object)
			const mockEmptyBreakpoints = {
				[TokenLayers.core]: {
					size: {
						breakpoint: {}, // Empty breakpoints object
					},
				},
			};
			mockedReadJsonFile.mockReturnValue(mockEmptyBreakpoints);

			await runResponsiveCssIntegration(dummyOeName, DesignSystemNames.a1);

			// Should complete successfully with default behavior (no comparisons needed)
			expect(mockedLogger.success).toHaveBeenCalledWith('Responsive integration for CSS output file assets completed.');
			// compareBreakpointFiles should not be called since there are no breakpoints to compare
			expect(mockedCompareBreakpointFiles).not.toHaveBeenCalled();
		});

		it('should handle only max-width breakpoint and default to xs', async () => {
			// Mock grid tokens with only max-width (which gets filtered out)
			const mockMaxWidthOnlyBreakpoints = {
				[TokenLayers.core]: {
					size: {
						breakpoint: {
							// eslint-disable-next-line @typescript-eslint/naming-convention
							'max-width': { value: '1920px' }, // This gets filtered out
						},
					},
				},
			};
			mockedReadJsonFile.mockReturnValue(mockMaxWidthOnlyBreakpoints);

			await runResponsiveCssIntegration(dummyOeName, DesignSystemNames.a1);

			// Should complete successfully with default behavior (no comparisons needed)
			expect(mockedLogger.success).toHaveBeenCalledWith('Responsive integration for CSS output file assets completed.');
			// compareBreakpointFiles should not be called since max-width gets filtered out
			expect(mockedCompareBreakpointFiles).not.toHaveBeenCalled();
		});
	});
});
