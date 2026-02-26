/* eslint-disable @typescript-eslint/naming-convention */
import { describe, expect, it } from '@jest/globals';
import { ThemeObject, TokenSetStatus } from '@tokens-studio/types';
import { rebuildSelectedTokenSetObject, sortSelectedTokenSets } from './themes-sorter';
import {
	createMockSelectedTokenSets,
	deepCopyThemeObject,
	deepCopyThemesArray,
	mockComplexThemesArray,
	mockComplexThemesSorted,
	mockSelectedTokenSetKeysOrdered,
	mockSelectedTokenSetsOrdered,
	mockSelectedTokenSetsUnordered,
	mockThemeObjectEmpty,
	mockThemeObjectSingleToken,
	mockThemeObjectUnsorted,
	mockThemesArraySorted,
	mockThemesArrayUnsorted,
	mockThemeWithMetadataFiles,
	mockThemeWithUnexpectedTokenPath,
} from './themes-sorter.mock.spec';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Note: Logger mocking (suppressLoggerOutput/restoreLoggerMocks) is automatically handled by src/shared/testing/test-helpers.mock.spec.ts via jest.config.ts setupFilesAfterEnv
describe('rebuildSelectedTokenSetObject', () => {
	it('should rebuild the selectedTokenSets object in the correct order', () => {
		const result = rebuildSelectedTokenSetObject([...mockSelectedTokenSetKeysOrdered], { ...mockSelectedTokenSetsUnordered });

		expect(result).toEqual(mockSelectedTokenSetsOrdered);
		expect(Object.keys(result)).toEqual(mockSelectedTokenSetKeysOrdered);
	});

	it('should handle empty arrays and objects', () => {
		const result = rebuildSelectedTokenSetObject([], {});

		expect(result).toEqual({});
		expect(Object.keys(result)).toHaveLength(0);
	});

	it('should handle single token set', () => {
		const singleKey = ['core/colors'];
		const singleTokenSet = { 'core/colors': TokenSetStatus.ENABLED };
		const result = rebuildSelectedTokenSetObject(singleKey, singleTokenSet);

		expect(result).toEqual(singleTokenSet);
		expect(Object.keys(result)).toEqual(singleKey);
	});

	it('should preserve TokenSetStatus values when reordering', () => {
		const keys = ['semantic/motion/minimal', 'core/colors', 'components/default/button'];
		const tokenSets = {
			'core/colors': TokenSetStatus.ENABLED,
			'semantic/motion/minimal': TokenSetStatus.DISABLED,
			'components/default/button': TokenSetStatus.ENABLED,
		};
		const result = rebuildSelectedTokenSetObject(keys, tokenSets);

		expect(result['semantic/motion/minimal']).toBe(TokenSetStatus.DISABLED);
		expect(result['core/colors']).toBe(TokenSetStatus.ENABLED);
		expect(result['components/default/button']).toBe(TokenSetStatus.ENABLED);
		expect(Object.keys(result)).toEqual(keys);
	});

	it('should handle keys that do not exist in the unordered object', () => {
		const keys = ['core/colors', 'nonexistent/token'];
		const tokenSets = { 'core/colors': TokenSetStatus.ENABLED };
		const result = rebuildSelectedTokenSetObject(keys, tokenSets);

		expect(result).toEqual({
			'core/colors': TokenSetStatus.ENABLED,
			'nonexistent/token': undefined,
		});
		expect(Object.keys(result)).toEqual(keys);
	});

	it('should maintain order with mixed TokenSetStatus values', () => {
		const keys = ['a', 'b', 'c', 'd'];
		const tokenSets = {
			d: TokenSetStatus.DISABLED,
			c: TokenSetStatus.ENABLED,
			b: TokenSetStatus.DISABLED,
			a: TokenSetStatus.ENABLED,
		};
		const result = rebuildSelectedTokenSetObject(keys, tokenSets);

		expect(Object.keys(result)).toEqual(keys);
		expect(result['a']).toBe(TokenSetStatus.ENABLED);
		expect(result['b']).toBe(TokenSetStatus.DISABLED);
		expect(result['c']).toBe(TokenSetStatus.ENABLED);
		expect(result['d']).toBe(TokenSetStatus.DISABLED);
	});

	it('should handle large token sets efficiently', () => {
		const tokenKeys = Array.from({ length: 100 }, (_, i) => `token/set/${i}`);
		const unorderedTokenSets = createMockSelectedTokenSets(tokenKeys);
		const shuffledKeys = [...tokenKeys].reverse(); // Reverse order

		const result = rebuildSelectedTokenSetObject(shuffledKeys, unorderedTokenSets);

		expect(Object.keys(result)).toEqual(shuffledKeys);
		expect(Object.keys(result)).toHaveLength(100);

		// Verify all values are preserved
		shuffledKeys.forEach(key => {
			expect(result[key]).toBe(unorderedTokenSets[key]);
		});
	});
});

describe('sortSelectedTokenSets', () => {
	it('should sort selectedTokenSets for all themes in the array', () => {
		const inputThemes = deepCopyThemesArray(mockThemesArrayUnsorted);
		const result = sortSelectedTokenSets(inputThemes);

		expect(result).toEqual(mockThemesArraySorted);

		// Verify each theme has properly ordered token sets
		result.forEach(theme => {
			const keys = Object.keys(theme.selectedTokenSets);
			const coreIndex = keys.findIndex(key => key.startsWith('core/'));
			const semanticIndex = keys.findIndex(key => key.startsWith('semantic/'));
			const componentsIndex = keys.findIndex(key => key.startsWith('components/'));

			if (coreIndex !== -1 && semanticIndex !== -1) {
				expect(coreIndex).toBeLessThan(semanticIndex);
			}
			if (semanticIndex !== -1 && componentsIndex !== -1) {
				expect(semanticIndex).toBeLessThan(componentsIndex);
			}
		});
	});

	it('should handle empty themes array', () => {
		const result = sortSelectedTokenSets([]);

		expect(result).toEqual([]);
		expect(result).toHaveLength(0);
	});

	it('should handle theme with empty selectedTokenSets', () => {
		const emptyTheme = deepCopyThemeObject(mockThemeObjectEmpty);
		const result = sortSelectedTokenSets([emptyTheme]);

		expect(result).toHaveLength(1);
		expect(result[0].selectedTokenSets).toEqual({});
		expect(result[0].id).toBe('empty-theme');
	});

	it('should handle theme with single token set', () => {
		const singleTokenTheme = deepCopyThemeObject(mockThemeObjectSingleToken);
		const result = sortSelectedTokenSets([singleTokenTheme]);

		expect(result).toHaveLength(1);
		expect(result[0].selectedTokenSets).toEqual({ 'core/colors': TokenSetStatus.ENABLED });
		expect(Object.keys(result[0].selectedTokenSets)).toHaveLength(1);
	});

	it('should not mutate the input themes array', () => {
		const originalThemes = deepCopyThemesArray(mockThemesArrayUnsorted);
		const inputThemes = deepCopyThemesArray(mockThemesArrayUnsorted);

		sortSelectedTokenSets(inputThemes);

		expect(inputThemes).toEqual(originalThemes);
	});

	it('should preserve all theme properties except selectedTokenSets order', () => {
		const inputTheme = deepCopyThemeObject(mockThemeObjectUnsorted);
		const result = sortSelectedTokenSets([inputTheme]);

		expect(result[0].id).toBe(inputTheme.id);
		expect(result[0].name).toBe(inputTheme.name);
		expect(result[0].$figmaStyleReferences).toEqual(inputTheme.$figmaStyleReferences);

		// Verify token sets content is the same, just reordered
		const originalKeys = Object.keys(inputTheme.selectedTokenSets).sort();
		const resultKeys = Object.keys(result[0].selectedTokenSets).sort();
		expect(resultKeys).toEqual(originalKeys);
	});

	it('should handle complex themes with all token layers', () => {
		const complexThemes = deepCopyThemesArray(mockComplexThemesArray);
		const result = sortSelectedTokenSets(complexThemes);

		expect(result).toEqual(mockComplexThemesSorted);

		// Verify proper ordering: core -> semantic -> partials -> components
		const tokenKeys = Object.keys(result[0].selectedTokenSets);
		const coreIndex = tokenKeys.findIndex(key => key.startsWith('core/'));
		const semanticIndex = tokenKeys.findIndex(key => key.startsWith('semantic/'));
		const partialsIndex = tokenKeys.findIndex(key => key.startsWith('partials/'));
		const componentsIndex = tokenKeys.findIndex(key => key.startsWith('components/'));

		expect(coreIndex).toBeLessThan(semanticIndex);
		expect(semanticIndex).toBeLessThan(partialsIndex);
		expect(partialsIndex).toBeLessThan(componentsIndex);
	});

	it('should handle themes with metadata token sets', () => {
		const metadataTheme = deepCopyThemeObject(mockThemeWithMetadataFiles);
		const result = sortSelectedTokenSets([metadataTheme]);

		expect(result).toHaveLength(1);
		expect(result[0].selectedTokenSets).toHaveProperty('core/colors');
		expect(result[0].selectedTokenSets).toHaveProperty('$metadata');
		expect(result[0].selectedTokenSets).toHaveProperty('$themes');

		// Metadata files should be sorted to the end
		const keys = Object.keys(result[0].selectedTokenSets);
		const metadataIndex = keys.indexOf('$metadata');
		const themesIndex = keys.indexOf('$themes');
		const coreIndex = keys.indexOf('core/colors');

		expect(coreIndex).toBeLessThan(metadataIndex);
		expect(coreIndex).toBeLessThan(themesIndex);
	});

	it('should throw error for themes with unexpected token paths', () => {
		const invalidTheme = deepCopyThemeObject(mockThemeWithUnexpectedTokenPath);

		expect(() => sortSelectedTokenSets([invalidTheme])).toThrow('Detected unexpected token file in the token set: unexpected/invalid/path');
	});

	it('should handle themes with mixed valid and dense token sets', () => {
		const mixedTheme: ThemeObject = {
			id: 'mixed-theme',
			name: 'Mixed Theme',
			selectedTokenSets: {
				'components/dense/button': TokenSetStatus.ENABLED,
				'components/default/badge': TokenSetStatus.ENABLED,
				'partials/dense/indicator': TokenSetStatus.ENABLED,
				'partials/default/info': TokenSetStatus.ENABLED,
				'semantic/densities/dense': TokenSetStatus.ENABLED,
				'core/colors': TokenSetStatus.ENABLED,
			},
			$figmaStyleReferences: {},
		};

		const result = sortSelectedTokenSets([deepCopyThemeObject(mixedTheme)]);

		expect(result).toHaveLength(1);
		const keys = Object.keys(result[0].selectedTokenSets);

		// Core should come first
		expect(keys[0]).toBe('core/colors');

		// Verify dense components are ordered after default
		const defaultPartialsIndex = keys.indexOf('partials/default/info');
		const densePartialsIndex = keys.indexOf('partials/dense/indicator');
		const defaultComponentsIndex = keys.indexOf('components/default/badge');
		const denseComponentsIndex = keys.indexOf('components/dense/button');

		expect(defaultPartialsIndex).toBeLessThan(densePartialsIndex);
		expect(defaultComponentsIndex).toBeLessThan(denseComponentsIndex);
	});

	it('should handle multiple themes with different token set combinations', () => {
		const multipleThemes: ThemeObject[] = [
			{
				id: 'theme-1',
				name: 'Theme 1',
				selectedTokenSets: {
					'components/default/button': TokenSetStatus.ENABLED,
					'core/colors': TokenSetStatus.ENABLED,
				},
				$figmaStyleReferences: {},
			},
			{
				id: 'theme-2',
				name: 'Theme 2',
				selectedTokenSets: {
					'semantic/motion/lively': TokenSetStatus.DISABLED,
					'partials/default/indicator': TokenSetStatus.ENABLED,
					'core/typography': TokenSetStatus.ENABLED,
				},
				$figmaStyleReferences: {},
			},
			{
				id: 'theme-3',
				name: 'Theme 3',
				selectedTokenSets: {
					'semantic/color-schemes/dark': TokenSetStatus.ENABLED,
				},
				$figmaStyleReferences: {},
			},
		];

		const result = sortSelectedTokenSets(deepCopyThemesArray(multipleThemes));

		expect(result).toHaveLength(3);

		// Verify each theme is individually sorted
		expect(Object.keys(result[0].selectedTokenSets)).toEqual(['core/colors', 'components/default/button']);
		expect(Object.keys(result[1].selectedTokenSets)).toEqual(['core/typography', 'semantic/motion/lively', 'partials/default/indicator']);
		expect(Object.keys(result[2].selectedTokenSets)).toEqual(['semantic/color-schemes/dark']);
	});

	it('should handle large themes array efficiently', () => {
		const largeThemesArray: ThemeObject[] = Array.from({ length: 50 }, (_, i) => {
			return {
				id: `theme-${i}`,
				name: `Theme ${i}`,
				selectedTokenSets: {
					'components/default/button': TokenSetStatus.ENABLED,
					'semantic/color-schemes/light': TokenSetStatus.ENABLED,
					'core/colors': TokenSetStatus.ENABLED,
					'partials/default/info': TokenSetStatus.DISABLED,
				},
				$figmaStyleReferences: {},
			};
		});

		const result = sortSelectedTokenSets(largeThemesArray);

		expect(result).toHaveLength(50);

		// Verify all themes are properly sorted
		result.forEach((theme, index) => {
			expect(theme.id).toBe(`theme-${index}`);
			expect(Object.keys(theme.selectedTokenSets)).toEqual([
				'core/colors',
				'semantic/color-schemes/light',
				'partials/default/info',
				'components/default/button',
			]);
		});
	});
});
