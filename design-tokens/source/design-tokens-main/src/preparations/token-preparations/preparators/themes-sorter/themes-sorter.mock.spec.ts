/* eslint-disable @typescript-eslint/naming-convention */
import { ThemeObject, TokenSetStatus } from '@tokens-studio/types';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock data for testing themes-sorter functions
export const mockSelectedTokenSetsUnordered: Record<string, TokenSetStatus> = {
	'components/dense/tab': TokenSetStatus.ENABLED,
	'components/default/button': TokenSetStatus.ENABLED,
	'partials/default/indicator': TokenSetStatus.ENABLED,
	'semantic/densities/compact': TokenSetStatus.ENABLED,
	'core/colors': TokenSetStatus.ENABLED,
	'semantic/color-schemes/dark': TokenSetStatus.ENABLED,
	'components/default/badge': TokenSetStatus.ENABLED,
	'semantic/motion/minimal': TokenSetStatus.DISABLED,
	'core/typography': TokenSetStatus.ENABLED,
	'partials/dense/indicator': TokenSetStatus.ENABLED,
};

export const mockSelectedTokenSetsOrdered: Record<string, TokenSetStatus> = {
	'core/colors': TokenSetStatus.ENABLED,
	'core/typography': TokenSetStatus.ENABLED,
	'semantic/color-schemes/dark': TokenSetStatus.ENABLED,
	'semantic/densities/compact': TokenSetStatus.ENABLED,
	'semantic/motion/minimal': TokenSetStatus.DISABLED,
	'partials/default/indicator': TokenSetStatus.ENABLED,
	'partials/dense/indicator': TokenSetStatus.ENABLED,
	'components/default/badge': TokenSetStatus.ENABLED,
	'components/default/button': TokenSetStatus.ENABLED,
	'components/dense/tab': TokenSetStatus.ENABLED,
};

export const mockSelectedTokenSetKeysOrdered: string[] = [
	'core/colors',
	'core/typography',
	'semantic/color-schemes/dark',
	'semantic/densities/compact',
	'semantic/motion/minimal',
	'partials/default/indicator',
	'partials/dense/indicator',
	'components/default/badge',
	'components/default/button',
	'components/dense/tab',
];

export const mockThemeObjectUnsorted: ThemeObject = {
	id: 'test-theme-1',
	name: 'Test Theme Unsorted',
	selectedTokenSets: mockSelectedTokenSetsUnordered,
	$figmaStyleReferences: {},
};

export const mockThemeObjectEmpty: ThemeObject = {
	id: 'empty-theme',
	name: 'Empty Theme',
	selectedTokenSets: {},
	$figmaStyleReferences: {},
};

export const mockThemeObjectSingleToken: ThemeObject = {
	id: 'single-token-theme',
	name: 'Single Token Theme',
	selectedTokenSets: {
		'core/colors': TokenSetStatus.ENABLED,
	},
	$figmaStyleReferences: {},
};

export const mockThemesArrayUnsorted: ThemeObject[] = [
	{
		id: 'theme-1',
		name: 'Dark Dense Theme',
		selectedTokenSets: {
			'components/default/button': TokenSetStatus.ENABLED,
			'semantic/color-schemes/dark': TokenSetStatus.ENABLED,
			'core/colors': TokenSetStatus.ENABLED,
			'semantic/densities/dense': TokenSetStatus.ENABLED,
		},
		$figmaStyleReferences: {},
	},
	{
		id: 'theme-2',
		name: 'Light Spacious Theme',
		selectedTokenSets: {
			'partials/default/info': TokenSetStatus.ENABLED,
			'semantic/color-schemes/light': TokenSetStatus.ENABLED,
			'core/typography': TokenSetStatus.ENABLED,
			'semantic/densities/spacious': TokenSetStatus.ENABLED,
			'components/default/badge': TokenSetStatus.DISABLED,
		},
		$figmaStyleReferences: {},
	},
];

export const mockThemesArraySorted: ThemeObject[] = [
	{
		id: 'theme-1',
		name: 'Dark Dense Theme',
		selectedTokenSets: {
			'core/colors': TokenSetStatus.ENABLED,
			'semantic/color-schemes/dark': TokenSetStatus.ENABLED,
			'semantic/densities/dense': TokenSetStatus.ENABLED,
			'components/default/button': TokenSetStatus.ENABLED,
		},
		$figmaStyleReferences: {},
	},
	{
		id: 'theme-2',
		name: 'Light Spacious Theme',
		selectedTokenSets: {
			'core/typography': TokenSetStatus.ENABLED,
			'semantic/color-schemes/light': TokenSetStatus.ENABLED,
			'semantic/densities/spacious': TokenSetStatus.ENABLED,
			'partials/default/info': TokenSetStatus.ENABLED,
			'components/default/badge': TokenSetStatus.DISABLED,
		},
		$figmaStyleReferences: {},
	},
];

export const mockComplexThemesArray: ThemeObject[] = [
	{
		id: 'complex-theme-1',
		name: 'Complex Dense Theme with All Layers',
		selectedTokenSets: {
			'components/dense/accordion': TokenSetStatus.ENABLED,
			'components/default/button': TokenSetStatus.ENABLED,
			'partials/dense/indicator': TokenSetStatus.ENABLED,
			'partials/default/info': TokenSetStatus.ENABLED,
			'semantic/motion/lively': TokenSetStatus.ENABLED,
			'semantic/densities/dense-l': TokenSetStatus.ENABLED,
			'semantic/densities/dense': TokenSetStatus.ENABLED,
			'semantic/color-schemes/dark': TokenSetStatus.ENABLED,
			'core/motion': TokenSetStatus.ENABLED,
			'core/grid': TokenSetStatus.ENABLED,
			'core/dimensions': TokenSetStatus.ENABLED,
			'core/colors': TokenSetStatus.ENABLED,
		},
		$figmaStyleReferences: {},
	},
];

export const mockComplexThemesSorted: ThemeObject[] = [
	{
		id: 'complex-theme-1',
		name: 'Complex Dense Theme with All Layers',
		selectedTokenSets: {
			'core/colors': TokenSetStatus.ENABLED,
			'core/dimensions': TokenSetStatus.ENABLED,
			'core/grid': TokenSetStatus.ENABLED,
			'core/motion': TokenSetStatus.ENABLED,
			'semantic/color-schemes/dark': TokenSetStatus.ENABLED,
			'semantic/densities/dense': TokenSetStatus.ENABLED,
			'semantic/densities/dense-l': TokenSetStatus.ENABLED,
			'semantic/motion/lively': TokenSetStatus.ENABLED,
			'partials/default/info': TokenSetStatus.ENABLED,
			'partials/dense/indicator': TokenSetStatus.ENABLED,
			'components/default/button': TokenSetStatus.ENABLED,
			'components/dense/accordion': TokenSetStatus.ENABLED,
		},
		$figmaStyleReferences: {},
	},
];

// Edge case data
export const mockThemeWithUnexpectedTokenPath: ThemeObject = {
	id: 'invalid-theme',
	name: 'Theme with Invalid Token Path',
	selectedTokenSets: {
		'core/colors': TokenSetStatus.ENABLED,
		'unexpected/invalid/path': TokenSetStatus.ENABLED,
	},
	$figmaStyleReferences: {},
};

export const mockThemeWithMetadataFiles: ThemeObject = {
	id: 'metadata-theme',
	name: 'Theme with Metadata Files',
	selectedTokenSets: {
		'core/colors': TokenSetStatus.ENABLED,
		$metadata: TokenSetStatus.ENABLED,
		$themes: TokenSetStatus.ENABLED,
	},
	$figmaStyleReferences: {},
};

// Helper functions for testing
export const deepCopyThemeObject = (theme: ThemeObject): ThemeObject => JSON.parse(JSON.stringify(theme));

export const deepCopyThemesArray = (themes: ThemeObject[]): ThemeObject[] => JSON.parse(JSON.stringify(themes));

export const createMockSelectedTokenSets = (tokenKeys: string[]): Record<string, TokenSetStatus> => {
	const result: Record<string, TokenSetStatus> = {};
	tokenKeys.forEach((key, index) => {
		result[key] = index % 3 === 0 ? TokenSetStatus.DISABLED : TokenSetStatus.ENABLED;
	});
	return result;
};
