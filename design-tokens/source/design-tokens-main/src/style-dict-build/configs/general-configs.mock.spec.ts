/* eslint-disable @typescript-eslint/naming-convention */

import { Config } from 'style-dictionary';
import { ThemeObject, TokenSetStatus } from '@tokens-studio/types';
import { DesignSystemNames, ThemeGroups } from '../../shared/index.js';
import { PermutatedThemeKeys, PermutatedThemes, SelectedTokenSets } from '../types/index.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock theme definitions based on real $themes.json structure
export const mockAllThemeDefinitions: ThemeObject[] = [
	{
		id: '9394e0a6d23d31d33d01765fcd4fd80394e2c124',
		name: 'Light',
		group: ThemeGroups.colorSchemes,
		selectedTokenSets: {
			'core/colors': TokenSetStatus.SOURCE,
			'semantic/color-schemes/light': TokenSetStatus.ENABLED,
		},
		$figmaStyleReferences: {},
		$figmaCollectionId: 'VariableCollectionId:16:97',
		$figmaModeId: '16:6',
	},
	{
		id: '8ba4f9a901ad826d5386e1312ebe9f192f9b5e2b',
		name: 'Dark',
		group: ThemeGroups.colorSchemes,
		selectedTokenSets: {
			'core/colors': TokenSetStatus.SOURCE,
			'semantic/color-schemes/light': TokenSetStatus.ENABLED,
			'semantic/color-schemes/dark': TokenSetStatus.ENABLED,
		},
		$figmaStyleReferences: {},
		$figmaCollectionId: 'VariableCollectionId:16:97',
		$figmaModeId: '16:7',
	},
	{
		id: '27f95e78a6bb729e1e258263cce9a25ef1f1e7ad',
		name: 'Core',
		group: ThemeGroups.core,
		selectedTokenSets: {
			'core/colors': TokenSetStatus.ENABLED,
			'core/dimensions': TokenSetStatus.ENABLED,
			'core/grid': TokenSetStatus.ENABLED,
			'core/motion': TokenSetStatus.ENABLED,
			'core/typography': TokenSetStatus.ENABLED,
		},
		$figmaStyleReferences: {},
		$figmaCollectionId: 'VariableCollectionId:16:95',
		$figmaModeId: '16:0',
	},
	{
		id: '38ec73bf7460b15402f8d782b408e0d041b2414b',
		name: 'Spacious XS-S',
		group: ThemeGroups.components,
		selectedTokenSets: {
			'core/colors': TokenSetStatus.SOURCE,
			'core/dimensions': TokenSetStatus.SOURCE,
			'components/default/button': TokenSetStatus.ENABLED,
		},
		$figmaStyleReferences: {},
		$figmaCollectionId: 'VariableCollectionId:7227:513',
		$figmaModeId: '7227:0',
	},
	{
		id: '5d3f4e2a1b8c9d0e6f7a8b9c0d1e2f3a4b5c6d7e',
		name: 'Composites',
		group: ThemeGroups.composites,
		selectedTokenSets: {
			'semantic/combined/composites': TokenSetStatus.ENABLED,
		},
		$figmaStyleReferences: {},
	},
	{
		id: '575747227e1d4cb418326936483afe35fb422341',
		name: 'Spacious XS-S',
		group: ThemeGroups.densities,
		selectedTokenSets: {
			'core/dimensions': TokenSetStatus.SOURCE,
			'semantic/densities/spacious': TokenSetStatus.ENABLED,
		},
		$figmaStyleReferences: {},
		$figmaCollectionId: 'VariableCollectionId:16:96',
		$figmaModeId: '16:1',
	},
	{
		id: '5aa4111b08dd7ddd86221bf06801214e90b6d9a8',
		name: 'Lively',
		group: ThemeGroups.motion,
		selectedTokenSets: {
			'core/motion': TokenSetStatus.SOURCE,
			'semantic/motion/lively': TokenSetStatus.ENABLED,
		},
		$figmaStyleReferences: {},
		$figmaCollectionId: 'VariableCollectionId:2075:2523',
		$figmaModeId: '2075:0',
	},
	{
		id: '6fce4474a60d7843cfe2002f28b124c422456d9b',
		name: 'Minimal',
		group: ThemeGroups.motion,
		selectedTokenSets: {
			'core/motion': TokenSetStatus.SOURCE,
			'semantic/motion/minimal': TokenSetStatus.ENABLED,
		},
		$figmaStyleReferences: {},
	},
	{
		id: 'theme-without-group-id',
		name: 'Theme Without Group',
		selectedTokenSets: {
			'core/colors': TokenSetStatus.ENABLED,
		},
		$figmaStyleReferences: {},
	},
];

// Mock filtered theme definitions (after filtering out blacklisted themes)
export const mockFilteredThemeDefinitions: ThemeObject[] = [
	{
		id: '9394e0a6d23d31d33d01765fcd4fd80394e2c124',
		name: 'Light',
		group: ThemeGroups.colorSchemes,
		selectedTokenSets: {
			'core/colors': TokenSetStatus.SOURCE,
			'semantic/color-schemes/light': TokenSetStatus.ENABLED,
		},
		$figmaStyleReferences: {},
		$figmaCollectionId: 'VariableCollectionId:16:97',
		$figmaModeId: '16:6',
	},
	{
		id: '8ba4f9a901ad826d5386e1312ebe9f192f9b5e2b',
		name: 'Dark',
		group: ThemeGroups.colorSchemes,
		selectedTokenSets: {
			'core/colors': TokenSetStatus.SOURCE,
			'semantic/color-schemes/light': TokenSetStatus.ENABLED,
			'semantic/color-schemes/dark': TokenSetStatus.ENABLED,
		},
		$figmaStyleReferences: {},
		$figmaCollectionId: 'VariableCollectionId:16:97',
		$figmaModeId: '16:7',
	},
	{
		id: '5aa4111b08dd7ddd86221bf06801214e90b6d9a8',
		name: 'Lively',
		group: ThemeGroups.motion,
		selectedTokenSets: {
			'core/motion': TokenSetStatus.SOURCE,
			'semantic/motion/lively': TokenSetStatus.ENABLED,
		},
		$figmaStyleReferences: {},
		$figmaCollectionId: 'VariableCollectionId:2075:2523',
		$figmaModeId: '2075:0',
	},
	{
		id: '6fce4474a60d7843cfe2002f28b124c422456d9b',
		name: 'Minimal',
		group: ThemeGroups.motion,
		selectedTokenSets: {
			'core/motion': TokenSetStatus.SOURCE,
			'semantic/motion/minimal': TokenSetStatus.ENABLED,
		},
		$figmaStyleReferences: {},
	},
];

// Mock empty theme definitions array
export const mockEmptyThemeDefinitions: ThemeObject[] = [];

// Mock permutated themes - using a partial representation for testing
export const mockPermutatedThemes: Partial<PermutatedThemes> = {
	'Light-Spacious XS-Lively': ['core/colors', 'semantic/color-schemes/light'],
	'Light-Spacious XS-Minimal': ['core/colors', 'semantic/color-schemes/light'],
	'Dark-Compact M-Lively': ['core/colors', 'semantic/color-schemes/dark'],
};

// Mock selected token sets
export const mockSelectedTokenSets: SelectedTokenSets = [
	'core/colors',
	'core/dimensions',
	'semantic/color-schemes/light',
	'semantic/densities/spacious',
];

// Mock token set file paths
export const mockTokenSetFilePaths = [
	'build/by-product/prepared-tokens/core/colors.json',
	'build/by-product/prepared-tokens/core/dimensions.json',
	'build/by-product/prepared-tokens/semantic/color-schemes/light.json',
	'build/by-product/prepared-tokens/semantic/densities/spacious.json',
];

// Mock brand name
export const mockBrandName = 'allianz';

// Mock design system name
export const mockDesignSystemName = DesignSystemNames.a1;

// Mock theme names based on real $themes.json data
export const mockThemeNames = {
	valid: 'Light-Spacious XS-S-Lively' as PermutatedThemeKeys,
	withSpace: 'Spacious XS-S' as PermutatedThemeKeys, // Real theme name with spaces
	withComponents: 'Components-Light-Spacious XS-S-Lively' as PermutatedThemeKeys,
	simple: 'Dark-Minimal' as PermutatedThemeKeys,
};

// Mock output file names
export const mockOutputFileNames = {
	standard: 'tokens-light-spacious-xs-s-lively',
	withoutSpaces: 'tokens-spacious-xs-s', // Only first space is replaced by the current implementation
	withoutComponentsPrefix: 'tokens-light-spacious-xs-s-lively',
	simple: 'tokens-dark-minimal',
};

// Mock file paths
export const mockFilePaths = {
	outputPath: './build/design-tokens-builder/allianz/a1',
	artifactBuildPath: 'build/design-tokens-builder',
	themeDefinitionFile: 'build/by-product/prepared-tokens/$themes.json',
};

// Mock platform configs (simplified for testing)
export const mockPlatformWebStyleConfig = {
	transformGroup: 'tokens-studio',
	transforms: ['name/kebab'],
	buildPath: './build/design-tokens-builder/allianz/',
	files: [],
	options: {
		fileHeader: 'allianz',
	},
};

export const mockPlatformWebJsConfig = {
	transformGroup: 'tokens-studio',
	transforms: ['name/camel'],
	buildPath: './build/design-tokens-builder/allianz/',
	files: [],
	options: {
		fileHeader: 'allianz',
	},
};

export const mockPlatformAndroidConfig = {
	transformGroup: 'tokens-studio',
	transforms: ['name/snake'],
	buildPath: './build/design-tokens-builder/allianz/',
	files: [],
};

export const mockPlatformIosSwiftConfig = {
	transformGroup: 'tokens-studio',
	transforms: ['name/pascal'],
	buildPath: './build/design-tokens-builder/allianz/',
	files: [],
};

// Mock style dictionary config (simplified for testing - will be checked in detail by the tests)
export const createMockStyleDictionaryConfig = (brand: string, selectedTokenSets: string[]): Partial<Config> => {
	return {
		include: selectedTokenSets,
		preprocessors: ['math-function-resolve', 'tokens-studio'],
		log: {
			warnings: 'warn' as const,
			verbosity: 'silent' as const,
			errors: {
				brokenReferences: 'throw' as const,
			},
		},
	};
};

// Mock complete config result
export const mockCompleteConfigResult = {
	permutatedThemeNames: ['Light-Spacious XS-Lively', 'Light-Spacious XS-Minimal', 'Dark-Compact M-Lively'],
	configs: [
		createMockStyleDictionaryConfig('allianz', mockTokenSetFilePaths),
		createMockStyleDictionaryConfig('allianz', mockTokenSetFilePaths),
		createMockStyleDictionaryConfig('allianz', mockTokenSetFilePaths),
	],
};

// Test scenarios
export const createFilterOutBlacklistedThemesScenario = () => {
	return {
		input: mockAllThemeDefinitions,
		expected: mockFilteredThemeDefinitions,
	};
};

export const createFilterOutBlacklistedThemesEmptyScenario = () => {
	return {
		input: mockEmptyThemeDefinitions,
		expected: mockEmptyThemeDefinitions,
	};
};

export const createFilterOutBlacklistedThemesAllBlacklistedScenario = () => {
	const allBlacklistedThemes: ThemeObject[] = [
		{
			id: 'theme-core',
			name: 'Core Theme',
			group: ThemeGroups.core,
			selectedTokenSets: { 'core/colors': TokenSetStatus.ENABLED },
			$figmaStyleReferences: {},
		},
		{
			id: 'theme-components',
			name: 'Components Theme',
			group: ThemeGroups.components,
			selectedTokenSets: { 'components/default/button': TokenSetStatus.ENABLED },
			$figmaStyleReferences: {},
		},
		{
			id: 'theme-composites',
			name: 'Composites Theme',
			group: ThemeGroups.composites,
			selectedTokenSets: { 'semantic/combined/composites': TokenSetStatus.ENABLED },
			$figmaStyleReferences: {},
		},
		{
			id: 'theme-densities',
			name: 'Densities Theme',
			group: ThemeGroups.densities,
			selectedTokenSets: { 'semantic/densities/spacious': TokenSetStatus.ENABLED },
			$figmaStyleReferences: {},
		},
	];

	return {
		input: allBlacklistedThemes,
		expected: [],
	};
};

export const createFilterOutBlacklistedThemesWithUndefinedGroupScenario = () => {
	const themesWithUndefinedGroup: ThemeObject[] = [
		{
			id: 'theme-1',
			name: 'Valid Theme',
			group: ThemeGroups.colorSchemes,
			selectedTokenSets: { 'core/colors': TokenSetStatus.ENABLED },
			$figmaStyleReferences: {},
		},
		{
			id: 'theme-2',
			name: 'Theme Without Group',
			selectedTokenSets: { 'core/colors': TokenSetStatus.ENABLED },
			$figmaStyleReferences: {},
		},
	];

	const expectedFilteredThemes: ThemeObject[] = [
		{
			id: 'theme-1',
			name: 'Valid Theme',
			group: ThemeGroups.colorSchemes,
			selectedTokenSets: { 'core/colors': TokenSetStatus.ENABLED },
			$figmaStyleReferences: {},
		},
	];

	return {
		input: themesWithUndefinedGroup,
		expected: expectedFilteredThemes,
	};
};

export const createGetStyleDictionaryConfigScenario = () => {
	return {
		brand: mockBrandName,
		designSystemName: mockDesignSystemName,
		selectedTokenSets: mockTokenSetFilePaths,
		themeName: mockThemeNames.valid,
		expectedOutputFileName: mockOutputFileNames.standard,
		expectedOutputFilePath: mockFilePaths.outputPath,
	};
};

export const createGetStyleDictionaryConfigWithSpaceScenario = () => {
	return {
		brand: mockBrandName,
		designSystemName: mockDesignSystemName,
		selectedTokenSets: mockTokenSetFilePaths,
		themeName: mockThemeNames.withSpace,
		expectedOutputFileName: mockOutputFileNames.withoutSpaces,
		expectedOutputFilePath: mockFilePaths.outputPath,
	};
};

export const createGetStyleDictionaryConfigWithComponentsPrefixScenario = () => {
	return {
		brand: mockBrandName,
		designSystemName: mockDesignSystemName,
		selectedTokenSets: mockTokenSetFilePaths,
		themeName: mockThemeNames.withComponents,
		expectedOutputFileName: mockOutputFileNames.withoutComponentsPrefix,
		expectedOutputFilePath: mockFilePaths.outputPath,
	};
};

export const createInitThemePermutationsSuccessScenario = () => {
	return {
		brand: mockBrandName,
		designSystemName: mockDesignSystemName,
		mockThemeDefinitions: mockFilteredThemeDefinitions,
		mockPermutatedThemes,
		expectedResult: mockCompleteConfigResult,
	};
};

export const createInitThemePermutationsEmptyThemesScenario = () => {
	return {
		brand: mockBrandName,
		designSystemName: mockDesignSystemName,
		mockThemeDefinitions: mockEmptyThemeDefinitions,
		mockPermutatedThemes: {},
		expectedResult: {
			permutatedThemeNames: [],
			configs: [],
		},
	};
};
