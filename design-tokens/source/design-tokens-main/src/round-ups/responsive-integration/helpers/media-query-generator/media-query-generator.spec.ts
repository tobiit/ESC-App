import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { appendToFile } from '../../../../shared/index.js';
import { createAndWriteMediaQuery } from './media-query-generator';
import {
	emptyBreakpointVariables,
	multiBreakpointVariables,
	singleBreakpointVariables,
	targetFile,
} from './media-query-generator.mock.spec';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

jest.mock('../../../../shared/index.js', () => {
	const actual: object = jest.requireActual('../../../../shared/index.js');
	return {
		...actual,
		appendToFile: jest.fn(),
	};
});

describe('createAndWriteMediaQuery', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should write a media query block for a single breakpoint', () => {
		const result = createAndWriteMediaQuery(singleBreakpointVariables, targetFile);
		expect(result).toBe(true);
		expect(appendToFile).toHaveBeenCalledWith(targetFile, expect.stringContaining('@media screen and (min-width: 704px) {'));
		expect(appendToFile).toHaveBeenCalledWith(targetFile, expect.stringContaining('--font-size-lg: 20px;'));
	});

	it('should not write anything if there are no variables', () => {
		const result = createAndWriteMediaQuery(emptyBreakpointVariables, targetFile);
		expect(result).toBe(false);
		expect(appendToFile).not.toHaveBeenCalled();
	});

	it('should handle multiple breakpoints', () => {
		const result = createAndWriteMediaQuery(multiBreakpointVariables, targetFile);
		expect(result).toBe(true);
		expect(appendToFile).toHaveBeenCalledTimes(1);
		expect(appendToFile).toHaveBeenCalledWith(targetFile, expect.stringContaining('@media screen and (min-width: 704px) {'));
		expect(appendToFile).toHaveBeenCalledWith(targetFile, expect.stringContaining('@media screen and (min-width: 992px) {'));
	});
});
