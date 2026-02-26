import { describe, expect, it } from '@jest/globals';
import { TokenLayers } from '../../shared';
import { sortFigmaTokensFilePath } from './token-file-path-sorter';
import {
	getSelectedTokenSetIndexForLayer,
	getSsotTokenSetIndexForLayer,
	selectedTokenSetsSorted,
	selectedTokenSetsUnsorted,
	ssotTokenSetFilePathsSorted,
	ssotTokenSetFilePathsUnsorted,
} from './token-file-path-sorter.mock.spec';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Note: Logger mocking (suppressLoggerOutput/restoreLoggerMocks) is automatically handled by src/shared/testing/test-helpers.mock.spec.ts via jest.config.ts setupFilesAfterEnv
describe('sortFigmaTokensFilePath', () => {
	const figmaTokenFilePathsSorted = Object.keys(selectedTokenSetsSorted);
	const figmaTokenFilePathsUnsorted = Object.keys(selectedTokenSetsUnsorted);

	it('should order selectedTokenSet paths based on custom logic', () => {
		const sortedPaths = sortFigmaTokensFilePath(figmaTokenFilePathsUnsorted);
		const coreIndex = getSelectedTokenSetIndexForLayer(sortedPaths, TokenLayers.core);
		const semanticIndex = getSelectedTokenSetIndexForLayer(sortedPaths, TokenLayers.semantic);
		const partialsIndex = getSelectedTokenSetIndexForLayer(sortedPaths, TokenLayers.partials);
		const componentsIndex = getSelectedTokenSetIndexForLayer(sortedPaths, TokenLayers.components);
		expect(coreIndex).toBeLessThan(semanticIndex);
		expect(semanticIndex).toBeLessThan(partialsIndex);
		expect(partialsIndex).toBeLessThan(componentsIndex);
		expect(sortedPaths).toEqual(figmaTokenFilePathsSorted);
	});

	it('should order SSOT token set paths based on custom logic', () => {
		const sortedPaths = sortFigmaTokensFilePath(ssotTokenSetFilePathsUnsorted);
		const coreIndex = getSsotTokenSetIndexForLayer(sortedPaths, TokenLayers.core);
		const semanticIndex = getSsotTokenSetIndexForLayer(sortedPaths, TokenLayers.semantic);
		const partialsIndex = getSsotTokenSetIndexForLayer(sortedPaths, TokenLayers.partials);
		const componentsIndex = getSsotTokenSetIndexForLayer(sortedPaths, TokenLayers.components);
		expect(coreIndex).toBeLessThan(semanticIndex);
		expect(semanticIndex).toBeLessThan(partialsIndex);
		expect(partialsIndex).toBeLessThan(componentsIndex);
		expect(sortedPaths).toEqual(ssotTokenSetFilePathsSorted);
	});

	it('should throw an error for unexpected selectedTokenSet paths', () => {
		const unexpectedFilePath = 'unexpected/path';
		const invalidPaths = [...figmaTokenFilePathsUnsorted, unexpectedFilePath];
		const expectedErrorMessage = 'Detected unexpected token file in the token set: ' + unexpectedFilePath;
		expect(() => sortFigmaTokensFilePath(invalidPaths)).toThrow(expectedErrorMessage);
	});
});
