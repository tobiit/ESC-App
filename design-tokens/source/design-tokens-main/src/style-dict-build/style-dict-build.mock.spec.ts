import { jest } from '@jest/globals';
import type { Config, FileHeader, PlatformConfig, PreprocessedTokens, TransformedToken } from 'style-dictionary/types';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock theme names based on real data structure
export const mockPermutatedThemeNames: string[] = [
	'Light-Lively-Spacious-XS',
	'Light-Lively-Spacious-M',
	'Light-Lively-Spacious-L',
	'Light-Lively-Compact-XS',
	'Light-Lively-Compact-M',
	'Light-Lively-Compact-L',
	'Light-Lively-Dense-XS',
	'Light-Lively-Dense-M',
	'Light-Lively-Dense-L',
	'Light-Minimal-Spacious-XS',
	'Light-Minimal-Spacious-M',
	'Light-Minimal-Spacious-L',
	'Light-Minimal-Compact-XS',
	'Light-Minimal-Compact-M',
	'Light-Minimal-Compact-L',
	'Light-Minimal-Dense-XS',
	'Light-Minimal-Dense-M',
	'Light-Minimal-Dense-L',
	'Dark-Lively-Spacious-XS',
	'Dark-Lively-Spacious-M',
	'Dark-Lively-Spacious-L',
	'Dark-Lively-Compact-XS',
	'Dark-Lively-Compact-M',
	'Dark-Lively-Compact-L',
	'Dark-Lively-Dense-XS',
	'Dark-Lively-Dense-M',
	'Dark-Lively-Dense-L',
	'Dark-Minimal-Spacious-XS',
	'Dark-Minimal-Spacious-M',
	'Dark-Minimal-Spacious-L',
	'Dark-Minimal-Compact-XS',
	'Dark-Minimal-Compact-M',
	'Dark-Minimal-Compact-L',
	'Dark-Minimal-Dense-XS',
	'Dark-Minimal-Dense-M',
	'Dark-Minimal-Dense-L',
];

// Mock Config based on real structure
export const createMockConfig = (themeName: string): Config => {
	return {
		include: [
			'build/by-product/prepared-tokens/core/colors.json',
			`build/by-product/prepared-tokens/semantic/color-schemes/${themeName.toLowerCase().includes('dark') ? 'dark' : 'light'}.json`,
			'build/by-product/prepared-tokens/core/motion.json',
			`build/by-product/prepared-tokens/semantic/motion/${themeName.toLowerCase().includes('minimal') ? 'minimal' : 'lively'}.json`,
			'build/by-product/prepared-tokens/core/dimensions.json',
			'build/by-product/prepared-tokens/core/grid.json',
			'build/by-product/prepared-tokens/core/typography.json',
			`build/by-product/prepared-tokens/semantic/densities/${themeName.toLowerCase().includes('dense') ? 'dense' : themeName.toLowerCase().includes('compact') ? 'compact' : 'spacious'}.json`,
			'build/by-product/prepared-tokens/semantic/combined/composites.json',
			'build/by-product/prepared-tokens/partials/default/icon.json',
			'build/by-product/prepared-tokens/partials/default/indicator.json',
			'build/by-product/prepared-tokens/partials/default/info.json',
			'build/by-product/prepared-tokens/partials/default/input-field.json',
			'build/by-product/prepared-tokens/components/default/accordion.json',
			'build/by-product/prepared-tokens/components/default/avatar.json',
			'build/by-product/prepared-tokens/components/default/badge.json',
			'build/by-product/prepared-tokens/components/default/button.json',
			'build/by-product/prepared-tokens/components/default/divider.json',
			'build/by-product/prepared-tokens/components/default/dropdown.json',
			'build/by-product/prepared-tokens/components/default/form-field.json',
			'build/by-product/prepared-tokens/components/default/list.json',
			'build/by-product/prepared-tokens/components/default/radio-button.json',
			'build/by-product/prepared-tokens/components/default/segmented-control.json',
			'build/by-product/prepared-tokens/components/default/switch.json',
			'build/by-product/prepared-tokens/components/default/tab.json',
			'build/by-product/prepared-tokens/components/default/tag.json',
			'build/by-product/prepared-tokens/components/default/tile.json',
			'build/by-product/prepared-tokens/components/default/toggle-button.json',
		],
		preprocessors: ['a1/math-function-resolve', 'tokens-studio'],
		hooks: {
			preprocessors: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'a1/math-function-resolve':
					jest.fn<(dictionary: PreprocessedTokens, options: Config | PlatformConfig) => PreprocessedTokens | Promise<PreprocessedTokens>>(),
			},
			fileHeaders: {
				escappFileHeader: jest
					.fn<FileHeader>()
					.mockReturnValue([
						'THIS FILE WAS GENERATED AUTOMATICALLY AND SHOULD NOT BE EDITED MANUALLY!',
						'',
						'Version test-version',
						'Generated on test-date',
						'Copyright (c) escapp Group',
						'',
						'ATTENTION: This is a very heavy work in progress version of the escapp design tokens.',
						'It is neither guaranteed that the completeness nor the naming, nor the values of this',
						'design token set will change in future versions until it is regarded and announced as',
						'stable.',
					]),
			},
			filters: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'a1/filter/excluded': jest.fn<(token: TransformedToken, options: Config) => boolean | Promise<boolean>>(),
			},
			transforms: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'a1/color/hex8': {
					type: 'value',
					transitive: true,
					filter: jest.fn<(token: TransformedToken, options: Config) => boolean | Promise<boolean>>(),
					transform: jest.fn<(token: TransformedToken, config: PlatformConfig, options: Config) => unknown | undefined>(),
				},
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'a1/cubic-bezier-wrap': {
					type: 'value',
					transitive: true,
					filter: jest.fn<(token: TransformedToken, options: Config) => boolean | Promise<boolean>>(),
					transform: jest.fn<(token: TransformedToken, config: PlatformConfig, options: Config) => unknown | undefined>(),
				},
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'a1/lower-case-linear-gradient': {
					type: 'value',
					transitive: true,
					filter: jest.fn<(token: TransformedToken, options: Config) => boolean | Promise<boolean>>(),
					transform: jest.fn<(token: TransformedToken, config: PlatformConfig, options: Config) => unknown | undefined>(),
				},
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'a1/inset-shorthand-calc-fix': {
					type: 'value',
					transitive: true,
					filter: jest.fn<(token: TransformedToken, options: Config) => boolean | Promise<boolean>>(),
					transform: jest.fn<(token: TransformedToken, config: PlatformConfig, options: Config) => unknown | undefined>(),
				},
			},
		},
		platforms: {
			web: {
				transformGroup: 'tokens-studio',
				transforms: ['name/kebab', 'a1/color/hex8', 'a1/cubic-bezier-wrap', 'a1/lower-case-linear-gradient', 'a1/inset-shorthand-calc-fix'],
				buildPath: './token-package/dist/escapp/',
				files: [
					{
						destination: `web/tokens-${themeName.toLowerCase().replace(/\s+/g, '-')}.css`,
						format: 'css/variables',
						filter: 'a1/filter/excluded',
					},
					{
						destination: `web/tokens-${themeName.toLowerCase().replace(/\s+/g, '-')}.scss`,
						format: 'scss/variables',
						filter: 'a1/filter/excluded',
					},
					{
						destination: `web/tokens-${themeName.toLowerCase().replace(/\s+/g, '-')}-map.scss`,
						format: 'scss/map-deep',
						filter: 'a1/filter/excluded',
					},
					{
						destination: `web/tokens-${themeName.toLowerCase().replace(/\s+/g, '-')}.json`,
						format: 'json',
						filter: 'a1/filter/excluded',
					},
				],
				options: {
					fileHeader: 'escappFileHeader',
				},
			},
			js: {
				transformGroup: 'tokens-studio',
				transforms: ['name/camel', 'a1/color/hex8', 'a1/cubic-bezier-wrap', 'a1/lower-case-linear-gradient', 'a1/inset-shorthand-calc-fix'],
				buildPath: './token-package/dist/escapp/',
				files: [
					{
						destination: `web/tokens-${themeName.toLowerCase().replace(/\s+/g, '-')}.js`,
						format: 'javascript/es6',
						filter: 'a1/filter/excluded',
					},
				],
				options: {
					fileHeader: 'escappFileHeader',
				},
			},
			android: {
				transformGroup: 'tokens-studio',
				buildPath: './token-package/dist/escapp/',
				files: [
					{
						destination: `android/tokens-${themeName.toLowerCase().replace(/\s+/g, '-')}.kt`,
						format: 'compose/object',
						filter: 'a1/filter/excluded',
					},
				],
				options: {
					fileHeader: 'escappFileHeader',
				},
			},
			iosSwift: {
				transformGroup: 'tokens-studio',
				buildPath: './token-package/dist/escapp/',
				files: [
					{
						destination: `ios/tokens-${themeName.toLowerCase().replace(/\s+/g, '-')}.swift`,
						format: 'ios-swift/enum.swift',
						filter: 'a1/filter/excluded',
					},
				],
				options: {
					fileHeader: 'escappFileHeader',
				},
			},
		},
		log: {
			warnings: 'warn',
			verbosity: 'silent',
			errors: {
				brokenReferences: 'throw',
			},
		},
	};
};

// Mock configs array based on theme names
export const mockConfigs: Config[] = mockPermutatedThemeNames.map(themeName => createMockConfig(themeName));

// Mock StyleDictionary instance
export const createMockStyleDictionary = () => {
	return {
		buildAllPlatforms: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
		cleanAllPlatforms: jest.fn<() => void>().mockReturnValue(undefined),
		formatAllPlatforms: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
	};
};

// Scenario for successful style dictionary build
export const createSuccessfulStyleDictionaryBuildScenario = () => {
	const brand = 'escapp';
	const timeStart = new Date('2023-01-01T10:00:00.000Z');
	const timeEnd = new Date('2023-01-01T10:05:30.000Z');

	return {
		brand,
		timeStart,
		timeEnd,
		expectedPermutatedThemeNames: mockPermutatedThemeNames,
		expectedConfigs: mockConfigs,
		expectedDuration: '00:05:30',
		expectedLogMessages: {
			start: 'Style Dictionary builds',
			success: 'Finished generating token output files in 00:05:30 hh:mm:ss',
		},
	};
};

// Scenario for style dictionary build with no themes
export const createEmptyThemesStyleDictionaryBuildScenario = () => {
	const brand = 'escapp';
	const timeStart = new Date('2023-01-01T10:00:00.000Z');
	const timeEnd = new Date('2023-01-01T10:00:01.000Z');

	return {
		brand,
		timeStart,
		timeEnd,
		expectedPermutatedThemeNames: [],
		expectedConfigs: [],
		expectedDuration: '00:00:01',
		expectedLogMessages: {
			start: 'Style Dictionary builds',
			success: 'Finished generating token output files in 00:00:01 hh:mm:ss',
		},
	};
};

// Scenario for initial registrations failure
export const createInitialRegistrationsErrorScenario = () => {
	const brand = 'escapp';
	const error = new Error('Registration failed');

	return {
		brand,
		error,
		expectedErrorMessage: 'Registration failed',
	};
};

// Scenario for theme permutations failure
export const createThemePermutationsErrorScenario = () => {
	const brand = 'escapp';
	const error = new Error('Theme permutation failed');

	return {
		brand,
		error,
		expectedErrorMessage: 'Theme permutation failed',
	};
};

// Scenario for buildAllPlatforms failure
export const createBuildAllPlatformsErrorScenario = () => {
	const brand = 'escapp';
	const error = new Error('Build failed for platform');
	const failingThemeIndex = 1;
	const failingThemeName = mockPermutatedThemeNames[failingThemeIndex];

	return {
		brand,
		error,
		failingThemeIndex,
		failingThemeName,
		expectedErrorMessage: 'Build failed for platform',
		expectedPermutatedThemeNames: mockPermutatedThemeNames,
		expectedConfigs: mockConfigs,
	};
};

// Scenario for custom brand
export const createCustomBrandStyleDictionaryBuildScenario = () => {
	const brand = 'custom-brand';
	const timeStart = new Date('2023-01-01T10:00:00.000Z');
	const timeEnd = new Date('2023-01-01T10:02:15.000Z');

	return {
		brand,
		timeStart,
		timeEnd,
		expectedPermutatedThemeNames: mockPermutatedThemeNames,
		expectedConfigs: mockConfigs,
		expectedDuration: '00:02:15',
		expectedLogMessages: {
			start: 'Style Dictionary builds',
			success: 'Finished generating token output files in 00:02:15 hh:mm:ss',
		},
	};
};

// Scenario for single theme processing
export const createSingleThemeStyleDictionaryBuildScenario = () => {
	const brand = 'escapp';
	const singleThemeName = mockPermutatedThemeNames[0];
	const singleConfig = mockConfigs[0];
	const timeStart = new Date('2023-01-01T10:00:00.000Z');
	const timeEnd = new Date('2023-01-01T10:00:10.000Z');

	return {
		brand,
		timeStart,
		timeEnd,
		expectedPermutatedThemeNames: [singleThemeName],
		expectedConfigs: [singleConfig],
		expectedDuration: '00:00:10',
		expectedLogMessages: {
			start: 'Style Dictionary builds',
			success: 'Finished generating token output files in 00:00:10 hh:mm:ss',
		},
	};
};
