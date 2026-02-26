import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import * as fs from 'fs-extra';
import { A1Breakpoints, copyFile, loadFilesFromFolder, logger, readLinesFromFile } from '../../../../shared/index.js';
import { compareBreakpointFiles } from './breakpoint-combinator.js';
import {
	mockAllCssFiles,
	mockBreakpointKeys,
	mockCssContentDifferentLineCount,
	mockCssContentIdentical,
	mockCssContentM,
	mockCssContentMismatched,
	mockCssContentXs,
	mockFolderPath,
	mockSsotBreakpoints,
	mockSsotBreakpointsMissingValue,
} from './breakpoint-combinator.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock dependencies
jest.mock('fs-extra');
jest.mock('../../../../shared/index.js', () => {
	const actual = jest.requireActual('../../../../shared/index.js') as object;
	return {
		...actual,
		loadFilesFromFolder: jest.fn(),
		readLinesFromFile: jest.fn(),
		copyFile: jest.fn(),
	};
});
jest.mock('../media-query-generator/media-query-generator.js', () => {
	return {
		createAndWriteMediaQuery: jest.fn(),
	};
});

// Note: Logger mocking (suppressLoggerOutput/restoreLoggerMocks) is automatically handled by src/shared/testing/test-helpers.mock.spec.ts via jest.config.ts setupFilesAfterEnv
describe('compareBreakpointFiles', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.mocked(loadFilesFromFolder).mockResolvedValue(mockAllCssFiles);
		jest.mocked(fs.existsSync).mockReturnValue(true);
		jest.mocked(copyFile).mockReturnValue(undefined);
	});

	it('should process files with differences and return next breakpoint', async () => {
		const { createAndWriteMediaQuery } = await import('../media-query-generator/media-query-generator.js');
		jest.mocked(createAndWriteMediaQuery).mockReturnValue(true);

		// Mock fs.existsSync to return false for target files to trigger copyFile
		jest.mocked(fs.existsSync).mockImplementation((path: unknown) => {
			const pathStr = String(path);
			// Return false for target files (without breakpoint suffix) to trigger copyFile
			return !pathStr.match(/\/[^/]+\.css$/) || pathStr.includes('-xs.css') || pathStr.includes('-m.css');
		});

		jest
			.mocked(readLinesFromFile)
			.mockResolvedValueOnce(mockCssContentXs)
			.mockResolvedValueOnce(mockCssContentM)
			.mockResolvedValueOnce(mockCssContentXs)
			.mockResolvedValueOnce(mockCssContentM)
			.mockResolvedValueOnce(mockCssContentXs)
			.mockResolvedValueOnce(mockCssContentM);

		const result = await compareBreakpointFiles(mockFolderPath, mockSsotBreakpoints, mockBreakpointKeys, A1Breakpoints.xs, A1Breakpoints.m);

		expect(result).toBe(A1Breakpoints.m);
		expect(logger.info).toHaveBeenCalledWith('Detected design token value diff between xs <--> m');
		expect(loadFilesFromFolder).toHaveBeenCalledWith(mockFolderPath);
		expect(copyFile).toHaveBeenCalled();
	});

	it('should process files with no differences and return current breakpoint', async () => {
		const { createAndWriteMediaQuery } = await import('../media-query-generator/media-query-generator.js');
		jest.mocked(createAndWriteMediaQuery).mockReturnValue(false);

		jest.mocked(readLinesFromFile).mockResolvedValue(mockCssContentIdentical);

		const result = await compareBreakpointFiles(mockFolderPath, mockSsotBreakpoints, mockBreakpointKeys, A1Breakpoints.xs, A1Breakpoints.m);

		expect(result).toBe(A1Breakpoints.xs);
		expect(logger.warn).toHaveBeenCalledWith('No design token value diff between xs <--> m');
	});

	it('should skip files when source file does not exist', async () => {
		jest.mocked(fs.existsSync).mockImplementation((path: unknown) => !String(path).includes('colors-xs.css'));

		const result = await compareBreakpointFiles(mockFolderPath, mockSsotBreakpoints, mockBreakpointKeys, A1Breakpoints.xs, A1Breakpoints.m);

		expect(result).toBe(A1Breakpoints.xs);
		expect(logger.warn).toHaveBeenCalledWith('No design token value diff between xs <--> m');
	});

	it('should throw error when breakpoint value is not defined', async () => {
		jest.mocked(readLinesFromFile).mockResolvedValue(mockCssContentXs);

		await expect(
			compareBreakpointFiles(mockFolderPath, mockSsotBreakpointsMissingValue, mockBreakpointKeys, A1Breakpoints.xs, A1Breakpoints.m),
		).rejects.toThrow('Breakpoint value for m is not defined.');
	});

	it('should throw error when CSS variable names mismatch', async () => {
		jest.mocked(readLinesFromFile).mockResolvedValueOnce(mockCssContentXs).mockResolvedValueOnce(mockCssContentMismatched);

		await expect(
			compareBreakpointFiles(mockFolderPath, mockSsotBreakpoints, mockBreakpointKeys, A1Breakpoints.xs, A1Breakpoints.m),
		).rejects.toThrow('Variable mismatch:');
	});

	it('should throw error when line counts differ', async () => {
		jest.mocked(readLinesFromFile).mockResolvedValueOnce(mockCssContentXs).mockResolvedValueOnce(mockCssContentDifferentLineCount);

		await expect(
			compareBreakpointFiles(mockFolderPath, mockSsotBreakpoints, mockBreakpointKeys, A1Breakpoints.xs, A1Breakpoints.m),
		).rejects.toThrow('Line count mismatch between');
	});

	it('should handle empty file list', async () => {
		jest.mocked(loadFilesFromFolder).mockResolvedValue([]);

		const result = await compareBreakpointFiles(mockFolderPath, mockSsotBreakpoints, mockBreakpointKeys, A1Breakpoints.xs, A1Breakpoints.m);

		expect(result).toBe(A1Breakpoints.xs);
		expect(logger.warn).toHaveBeenCalledWith('No design token value diff between xs <--> m');
	});

	it('should handle CSS with non-variable lines', async () => {
		const { createAndWriteMediaQuery } = await import('../media-query-generator/media-query-generator.js');
		jest.mocked(createAndWriteMediaQuery).mockReturnValue(false);

		const cssWithNonVariables = [':root {', '  /* comment */', '  --color-primary: #ff0000;', '}'];

		jest.mocked(readLinesFromFile).mockResolvedValueOnce(cssWithNonVariables).mockResolvedValueOnce(cssWithNonVariables);

		const result = await compareBreakpointFiles(mockFolderPath, mockSsotBreakpoints, mockBreakpointKeys, A1Breakpoints.xs, A1Breakpoints.m);

		expect(result).toBe(A1Breakpoints.xs);
		expect(logger.warn).toHaveBeenCalledWith('No design token value diff between xs <--> m');
	});

	it('should throw error when CSS variable and non-variable lines mismatch', async () => {
		const cssWithVariable = [':root {', '  --color-primary: #ff0000;', '}'];
		const cssWithNonVariable = [':root {', '  /* comment */', '}'];

		jest.mocked(readLinesFromFile).mockResolvedValueOnce(cssWithVariable).mockResolvedValueOnce(cssWithNonVariable);

		await expect(
			compareBreakpointFiles(mockFolderPath, mockSsotBreakpoints, mockBreakpointKeys, A1Breakpoints.xs, A1Breakpoints.m),
		).rejects.toThrow('Output file code line comparison mismatch:');
	});
});
