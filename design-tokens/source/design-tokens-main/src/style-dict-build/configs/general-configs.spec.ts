import { beforeEach, describe, expect, it, jest, xit } from '@jest/globals';
import StyleDictionary from 'style-dictionary';
import { permutateThemes, register } from '@tokens-studio/sd-transforms';
import { TokenSetStatus } from '@tokens-studio/types';
import {
	DesignSystemNames,
	fileNameDelimiter,
	getByProductFilePathByTokensetName,
	readJsonFile,
	themeDefinitionFileBuildPath,
	ThemeGroups,
} from '../../shared/index.js';
import { platformAndroidConfig, platformIosSwiftConfig, platformWebJsConfig, platformWebStyleConfig } from './platforms/index.js';
import {
	filterOutBlacklistedThemes,
	getStyleDictionaryConfig,
	initialStyleDictionaryConfigRegistrations,
	initThemePermutations,
} from './general-configs.js';
import {
	createFilterOutBlacklistedThemesAllBlacklistedScenario,
	createFilterOutBlacklistedThemesEmptyScenario,
	createFilterOutBlacklistedThemesScenario,
	createFilterOutBlacklistedThemesWithUndefinedGroupScenario,
	createGetStyleDictionaryConfigScenario,
	createGetStyleDictionaryConfigWithComponentsPrefixScenario,
	createGetStyleDictionaryConfigWithSpaceScenario,
	createInitThemePermutationsEmptyThemesScenario,
	createInitThemePermutationsSuccessScenario,
	mockBrandName,
} from './general-configs.mock.spec.js';
import { defaultTransformOptions } from './index.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock all external dependencies
jest.mock('style-dictionary', () => {
	return {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		__esModule: true,
		default: {
			register: jest.fn(),
		},
	};
});

jest.mock('style-dictionary/enums', () => {
	return {
		logBrokenReferenceLevels: {
			throw: 'throw',
		},
		logVerbosityLevels: {
			silent: 'silent',
		},
		logWarningLevels: {
			warn: 'warn',
		},
		transformTypes: {
			value: 'value',
			attribute: 'attribute',
		},
	};
});

jest.mock('@tokens-studio/sd-transforms', () => {
	return {
		permutateThemes: jest.fn(),
		register: jest.fn(),
	};
});

jest.mock('../../shared/index.js', () => {
	const actual: object = jest.requireActual('../../shared/index.js');
	return {
		...actual,
		artifactBuildPathNpm: 'build/design-tokens-builder',
		fileNameDelimiter: '-',
		getByProductFilePathByTokensetName: jest.fn(),
		readJsonFile: jest.fn(),
		themeDefinitionFileBuildPath: 'build/by-product/prepared-tokens/$themes.json',
		// eslint-disable-next-line @typescript-eslint/naming-convention
		ThemeGroups: {
			colorSchemes: 'Color-Schemes',
			componentDensities: 'ComponentDensities',
			components: 'Components',
			composites: 'Composites',
			core: 'Core',
			densities: 'Densities',
			motion: 'Motion',
		},
		// eslint-disable-next-line @typescript-eslint/naming-convention
		TokenLayers: {
			core: 'core',
			semantic: 'semantic',
			partials: 'partials',
			components: 'components',
		},
		tokenOutputFileNamePrefix: 'tokens-',
	};
});

jest.mock('../enums/index.js', () => {
	return {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		TsTransformGroups: {
			tokensStudio: 'tokens-studio',
		},
	};
});

jest.mock('../hooks/index.js', () => {
	return {
		escappFileHeaderName: 'escapp',
		cubicBezierWrapTransform: { type: 'value', transform: jest.fn() },
		cubicBezierWrapTransformName: 'cubic-bezier-wrap',
		excludedTokensFilter: { filter: jest.fn() },
		excludedTokensFilterName: 'excluded-tokens',
		fileHeaderGenerator: jest.fn(),
		insetShorthandCalcFixTransform: { type: 'value', transform: jest.fn() },
		insetShorthandCalcFixTransformName: 'inset-shorthand-calc-fix',
		lowerCaseLinearGradientTransform: { type: 'value', transform: jest.fn() },
		lowerCaseLinearGradientTransformName: 'lower-case-linear-gradient',
		mathFunctionResolvePreprocessor: jest.fn(),
		mathFunctionResolvePreprocessorName: 'math-function-resolve',
		metaInfoEnrichTransform: { type: 'attribute', transform: jest.fn() },
		metaInfoEnrichTransformName: 'meta-info-enrich',
		pumlColorTransform: { type: 'value', transform: jest.fn() },
		pumlColorTransformName: 'name/puml/color',
		pumlFormat: { format: jest.fn() },
		pumlFormatName: 'puml/constants',
		pumlNameTransform: { type: 'name', transform: jest.fn() },
		pumlNameTransformName: 'name/puml/constant',
		transformTo8DigitHexValues: { type: 'value', transform: jest.fn() },
		transformTo8DigitHexValuesTransformName: 'transform-to-8-digit-hex-values',
	};
});

jest.mock('./platforms/index.js', () => {
	return {
		platformAndroidConfig: jest.fn(),
		platformIosSwiftConfig: jest.fn(),
		platformPumlConfig: jest.fn(),
		platformWebJsConfig: jest.fn(),
		platformWebStyleConfig: jest.fn(),
	};
});

jest.mock('./index.js', () => {
	return {
		defaultTransformOptions: {
			excludeParentKeys: false,
			alwaysAddFontStyle: false,
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'ts/color/modifiers': {
				format: 'hex',
			},
		},
	};
});

// Cast mocks with proper typing
const mockPermutateThemes = permutateThemes as jest.MockedFunction<typeof permutateThemes>;
const mockRegister = register as jest.MockedFunction<typeof register>;
const mockReadJsonFile = readJsonFile as jest.MockedFunction<typeof readJsonFile>;
const mockGetByProductFilePathByTokensetName = getByProductFilePathByTokensetName as jest.MockedFunction<
	typeof getByProductFilePathByTokensetName
>;
const mockPlatformWebStyleConfig = platformWebStyleConfig as jest.MockedFunction<typeof platformWebStyleConfig>;
const mockPlatformWebJsConfig = platformWebJsConfig as jest.MockedFunction<typeof platformWebJsConfig>;
const mockPlatformAndroidConfig = platformAndroidConfig as jest.MockedFunction<typeof platformAndroidConfig>;
const mockPlatformIosSwiftConfig = platformIosSwiftConfig as jest.MockedFunction<typeof platformIosSwiftConfig>;

// Note: Logger mocking (suppressLoggerOutput/restoreLoggerMocks) is automatically handled by src/shared/testing/test-helpers.mock.spec.ts via jest.config.ts setupFilesAfterEnv
describe('general-configs', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('filterOutBlacklistedThemes', () => {
		it('should filter out blacklisted theme groups', () => {
			const scenario = createFilterOutBlacklistedThemesScenario();

			const result = filterOutBlacklistedThemes(scenario.input, DesignSystemNames.a1);

			expect(result).toEqual(scenario.expected);
			expect(result).toHaveLength(4); // Updated to match realistic mock data with 2 color-schemes + 2 motion themes
			expect(result.every(theme => theme.group !== ThemeGroups.core)).toBe(true);
			expect(result.every(theme => theme.group !== ThemeGroups.components)).toBe(true);
			expect(result.every(theme => theme.group !== ThemeGroups.composites)).toBe(true);
			expect(result.every(theme => theme.group !== ThemeGroups.densities)).toBe(true);
		});

		it('should return empty array when all themes are blacklisted', () => {
			const scenario = createFilterOutBlacklistedThemesAllBlacklistedScenario();

			const result = filterOutBlacklistedThemes(scenario.input, DesignSystemNames.a1);

			expect(result).toEqual(scenario.expected);
			expect(result).toHaveLength(0);
		});

		it('should filter out themes with undefined group', () => {
			const scenario = createFilterOutBlacklistedThemesWithUndefinedGroupScenario();

			const result = filterOutBlacklistedThemes(scenario.input, DesignSystemNames.a1);

			expect(result).toEqual(scenario.expected);
			expect(result).toHaveLength(1);
			expect(result[0].group).toBe(ThemeGroups.colorSchemes);
		});

		it('should handle empty theme definitions array', () => {
			const scenario = createFilterOutBlacklistedThemesEmptyScenario();

			const result = filterOutBlacklistedThemes(scenario.input, DesignSystemNames.a1);

			expect(result).toEqual(scenario.expected);
			expect(result).toHaveLength(0);
		});

		it('should preserve theme objects structure', () => {
			const scenario = createFilterOutBlacklistedThemesScenario();

			const result = filterOutBlacklistedThemes(scenario.input, DesignSystemNames.a1);

			result.forEach(theme => {
				expect(theme).toHaveProperty('id');
				expect(theme).toHaveProperty('name');
				expect(theme).toHaveProperty('group');
				expect(theme).toHaveProperty('selectedTokenSets');
				expect(theme).toHaveProperty('$figmaStyleReferences');
				expect(typeof theme.id).toBe('string');
				expect(typeof theme.name).toBe('string');
				expect(typeof theme.group).toBe('string');
				expect(typeof theme.selectedTokenSets).toBe('object');
				expect(typeof theme.$figmaStyleReferences).toBe('object');
			});
		});
	});

	describe('getStyleDictionaryConfig', () => {
		beforeEach(() => {
			// Setup platform config mocks
			mockPlatformWebStyleConfig.mockReturnValue({
				transformGroup: 'tokens-studio',
				transforms: ['name/kebab'],
				buildPath: './build/design-tokens-builder/escapp/',
				files: [],
				options: { fileHeader: 'escapp' },
			});

			mockPlatformWebJsConfig.mockReturnValue({
				transformGroup: 'tokens-studio',
				transforms: ['name/camel'],
				buildPath: './build/design-tokens-builder/escapp/',
				files: [],
				options: { fileHeader: 'escapp' },
			});

			mockPlatformAndroidConfig.mockReturnValue({
				transformGroup: 'tokens-studio',
				transforms: ['name/snake'],
				buildPath: './build/design-tokens-builder/escapp/',
				files: [],
			});

			mockPlatformIosSwiftConfig.mockReturnValue({
				transformGroup: 'tokens-studio',
				transforms: ['name/pascal'],
				buildPath: './build/design-tokens-builder/escapp/',
				files: [],
			});
		});

		it('should create style dictionary config with correct structure', () => {
			const scenario = createGetStyleDictionaryConfigScenario();

			const result = getStyleDictionaryConfig(scenario.brand, scenario.designSystemName, scenario.selectedTokenSets, scenario.themeName);

			// Verify basic structure
			expect(result).toHaveProperty('include', scenario.selectedTokenSets);
			expect(result).toHaveProperty('preprocessors', ['math-function-resolve', 'tokens-studio']);
			expect(result).toHaveProperty('hooks');
			expect(result).toHaveProperty('platforms');
			expect(result).toHaveProperty('log'); // Verify hooks structure
			expect(result.hooks).toHaveProperty('preprocessors');
			expect(result.hooks).toHaveProperty('fileHeaders');
			expect(result.hooks).toHaveProperty('filters');
			expect(result.hooks).toHaveProperty('transforms');

			// Verify log configuration
			expect(result.log).toEqual({
				warnings: 'warn',
				verbosity: 'silent',
				errors: {
					brokenReferences: 'throw',
				},
			});
		});

		it('should call platform configs with correct parameters', () => {
			const scenario = createGetStyleDictionaryConfigScenario();

			getStyleDictionaryConfig(scenario.brand, scenario.designSystemName, scenario.selectedTokenSets, scenario.themeName);

			expect(mockPlatformWebStyleConfig).toHaveBeenCalledWith(scenario.expectedOutputFilePath, scenario.expectedOutputFileName);
			expect(mockPlatformWebJsConfig).toHaveBeenCalledWith(scenario.expectedOutputFilePath, scenario.expectedOutputFileName);
			expect(mockPlatformAndroidConfig).toHaveBeenCalledWith(scenario.expectedOutputFilePath, scenario.expectedOutputFileName);
			expect(mockPlatformIosSwiftConfig).toHaveBeenCalledWith(scenario.expectedOutputFilePath, scenario.expectedOutputFileName);
		});

		it('should replace spaces in theme name with delimiters and convert to lowercase', () => {
			const scenario = createGetStyleDictionaryConfigWithSpaceScenario();

			getStyleDictionaryConfig(scenario.brand, scenario.designSystemName, scenario.selectedTokenSets, scenario.themeName);

			expect(mockPlatformWebStyleConfig).toHaveBeenCalledWith(scenario.expectedOutputFilePath, scenario.expectedOutputFileName);
		});

		it('should remove components prefix from output file name', () => {
			const scenario = createGetStyleDictionaryConfigWithComponentsPrefixScenario();

			getStyleDictionaryConfig(scenario.brand, scenario.designSystemName, scenario.selectedTokenSets, scenario.themeName);

			expect(mockPlatformWebStyleConfig).toHaveBeenCalledWith(scenario.expectedOutputFilePath, scenario.expectedOutputFileName);
		});

		it('should configure all platform types', () => {
			const scenario = createGetStyleDictionaryConfigScenario();

			const result = getStyleDictionaryConfig(scenario.brand, scenario.designSystemName, scenario.selectedTokenSets, scenario.themeName);

			expect(result.platforms).toHaveProperty('web');
			expect(result.platforms).toHaveProperty('js');
			expect(result.platforms).toHaveProperty('android');
			expect(result.platforms).toHaveProperty('iosSwift');
		});

		it('should include all required hooks', () => {
			const scenario = createGetStyleDictionaryConfigScenario();

			const result = getStyleDictionaryConfig(scenario.brand, scenario.designSystemName, scenario.selectedTokenSets, scenario.themeName);

			expect(result.hooks?.preprocessors).toHaveProperty('math-function-resolve');
			expect(result.hooks?.fileHeaders).toHaveProperty('escapp');
			expect(result.hooks?.filters).toHaveProperty('excluded-tokens');
			expect(result.hooks?.formats).toHaveProperty('puml/constants');
			expect(result.hooks?.transforms).toHaveProperty('transform-to-8-digit-hex-values');
			expect(result.hooks?.transforms).toHaveProperty('cubic-bezier-wrap');
			expect(result.hooks?.transforms).toHaveProperty('lower-case-linear-gradient');
			expect(result.hooks?.transforms).toHaveProperty('inset-shorthand-calc-fix');
			expect(result.hooks?.transforms).toHaveProperty('meta-info-enrich');
			expect(result.hooks?.transforms).toHaveProperty('name/puml/color');
			expect(result.hooks?.transforms).toHaveProperty('name/puml/constant');
		});

		// eslint-disable-next-line jest/no-disabled-tests
		xit('should include tools platform with puml config', () => {
			const scenario = createGetStyleDictionaryConfigScenario();

			const result = getStyleDictionaryConfig(scenario.brand, scenario.designSystemName, scenario.selectedTokenSets, scenario.themeName);

			expect(result.platforms).toHaveProperty('tools');
		});
	});

	describe('initialStyleDictionaryConfigRegistrations', () => {
		it('should register tokens-studio transforms with default options', async () => {
			await initialStyleDictionaryConfigRegistrations();

			expect(mockRegister).toHaveBeenCalledWith(StyleDictionary, defaultTransformOptions);
			expect(mockRegister).toHaveBeenCalledTimes(1);
		});

		it('should be an async function', () => {
			const result = initialStyleDictionaryConfigRegistrations();

			expect(result).toBeInstanceOf(Promise);
		});

		it('should handle registration errors', async () => {
			const mockError = new Error('Registration failed');
			mockRegister.mockRejectedValueOnce(mockError);

			await expect(initialStyleDictionaryConfigRegistrations()).rejects.toThrow('Registration failed');
		});
	});

	describe('initThemePermutations', () => {
		beforeEach(() => {
			// Setup default mocks for successful scenarios
			mockGetByProductFilePathByTokensetName.mockImplementation((tokenset: string) => `build/by-product/prepared-tokens/${tokenset}.json`);
		});

		it('should initialize theme permutations successfully', () => {
			const scenario = createInitThemePermutationsSuccessScenario();

			mockReadJsonFile.mockReturnValueOnce(scenario.mockThemeDefinitions);
			mockPermutateThemes.mockReturnValueOnce(scenario.mockPermutatedThemes);

			const result = initThemePermutations(scenario.brand, DesignSystemNames.a1);

			expect(mockReadJsonFile).toHaveBeenCalledWith(themeDefinitionFileBuildPath);
			expect(mockPermutateThemes).toHaveBeenCalledWith(scenario.mockThemeDefinitions, {
				separator: fileNameDelimiter,
			});

			expect(result).toHaveProperty('permutatedThemeNames');
			expect(result).toHaveProperty('configs');
			expect(result.permutatedThemeNames).toEqual(expect.arrayContaining(Object.keys(scenario.mockPermutatedThemes)));
			expect(result.configs).toHaveLength(Object.keys(scenario.mockPermutatedThemes).length);
		});

		it('should handle empty theme definitions', () => {
			const scenario = createInitThemePermutationsEmptyThemesScenario();

			mockReadJsonFile.mockReturnValueOnce(scenario.mockThemeDefinitions);
			mockPermutateThemes.mockReturnValueOnce(scenario.mockPermutatedThemes);

			const result = initThemePermutations(scenario.brand, DesignSystemNames.a1);

			expect(result.permutatedThemeNames).toEqual([]);
			expect(result.configs).toEqual([]);
		});

		it('should map token sets to file paths correctly', () => {
			const scenario = createInitThemePermutationsSuccessScenario();

			mockReadJsonFile.mockReturnValueOnce(scenario.mockThemeDefinitions);
			mockPermutateThemes.mockReturnValueOnce(scenario.mockPermutatedThemes);

			initThemePermutations(scenario.brand, DesignSystemNames.a1);

			// Verify that getByProductFilePathByTokensetName is called for each token set
			Object.values(scenario.mockPermutatedThemes).forEach(tokensets => {
				tokensets.forEach(tokenset => {
					expect(mockGetByProductFilePathByTokensetName).toHaveBeenCalledWith(tokenset);
				});
			});
		});

		it('should create configs for each permutated theme', () => {
			const scenario = createInitThemePermutationsSuccessScenario();

			mockReadJsonFile.mockReturnValueOnce(scenario.mockThemeDefinitions);
			mockPermutateThemes.mockReturnValueOnce(scenario.mockPermutatedThemes);

			const result = initThemePermutations(scenario.brand, DesignSystemNames.a1);

			expect(result.configs).toHaveLength(Object.keys(scenario.mockPermutatedThemes).length);

			result.configs.forEach(config => {
				expect(config).toHaveProperty('include');
				expect(config).toHaveProperty('preprocessors');
				expect(config).toHaveProperty('hooks');
				expect(config).toHaveProperty('platforms');
				expect(config).toHaveProperty('log');
			});
		});

		it('should use file name delimiter in permutation options', () => {
			const scenario = createInitThemePermutationsSuccessScenario();

			mockReadJsonFile.mockReturnValueOnce(scenario.mockThemeDefinitions);
			mockPermutateThemes.mockReturnValueOnce(scenario.mockPermutatedThemes);

			initThemePermutations(scenario.brand, DesignSystemNames.a1);

			expect(mockPermutateThemes).toHaveBeenCalledWith(
				expect.any(Array),
				expect.objectContaining({
					separator: fileNameDelimiter,
				}),
			);
		});

		it('should filter out blacklisted themes before permutation', () => {
			const scenario = createInitThemePermutationsSuccessScenario();

			// Mock with themes that include blacklisted ones
			const themesWithBlacklisted = [
				...scenario.mockThemeDefinitions,
				{
					id: 'blacklisted-theme',
					name: 'Blacklisted Theme',
					group: ThemeGroups.core, // This should be filtered out
					selectedTokenSets: {
						// eslint-disable-next-line @typescript-eslint/naming-convention
						'core/colors': TokenSetStatus.ENABLED,
					},
					$figmaStyleReferences: {},
				},
			];

			mockReadJsonFile.mockReturnValueOnce(themesWithBlacklisted);
			mockPermutateThemes.mockReturnValueOnce(scenario.mockPermutatedThemes);

			initThemePermutations(scenario.brand, DesignSystemNames.a1);

			// Verify that permutateThemes was called with filtered themes (not including the blacklisted one)
			expect(mockPermutateThemes).toHaveBeenCalledWith(
				expect.not.arrayContaining([
					expect.objectContaining({
						group: ThemeGroups.core,
					}),
				]),
				expect.any(Object),
			);
		});

		it('should handle file read errors', () => {
			const mockError = new Error('Failed to read theme definitions');
			mockReadJsonFile.mockImplementation(() => {
				throw mockError;
			});

			expect(() => initThemePermutations(mockBrandName, DesignSystemNames.a1)).toThrow('Failed to read theme definitions');
		});

		it('should handle permutation errors', () => {
			const scenario = createInitThemePermutationsSuccessScenario();
			const mockError = new Error('Permutation failed');

			mockReadJsonFile.mockReturnValueOnce(scenario.mockThemeDefinitions);
			mockPermutateThemes.mockImplementation(() => {
				throw mockError;
			});

			expect(() => initThemePermutations(scenario.brand, DesignSystemNames.a1)).toThrow('Permutation failed');
		});
	});

	describe('integration scenarios', () => {
		it('should handle complete workflow from theme definitions to configs', () => {
			const scenario = createInitThemePermutationsSuccessScenario();

			mockReadJsonFile.mockReturnValueOnce(scenario.mockThemeDefinitions);
			mockPermutateThemes.mockReturnValueOnce(scenario.mockPermutatedThemes);

			const result = initThemePermutations(scenario.brand, DesignSystemNames.a1);

			// Verify complete workflow
			expect(mockReadJsonFile).toHaveBeenCalledWith(themeDefinitionFileBuildPath);
			expect(mockPermutateThemes).toHaveBeenCalled();
			expect(mockGetByProductFilePathByTokensetName).toHaveBeenCalled();
			expect(result.permutatedThemeNames).toBeDefined();
			expect(result.configs).toBeDefined();
			expect(result.configs.length).toBeGreaterThan(0);
		});

		it('should maintain consistency between theme names and configs', () => {
			const scenario = createInitThemePermutationsSuccessScenario();

			mockReadJsonFile.mockReturnValueOnce(scenario.mockThemeDefinitions);
			mockPermutateThemes.mockReturnValueOnce(scenario.mockPermutatedThemes);

			const result = initThemePermutations(scenario.brand, DesignSystemNames.a1);

			expect(result.permutatedThemeNames).toHaveLength(result.configs.length);
		});
	});
});
