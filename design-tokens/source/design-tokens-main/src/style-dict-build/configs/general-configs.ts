import StyleDictionary, { Config } from 'style-dictionary';
import { permutateThemes, register } from '@tokens-studio/sd-transforms';
import { ThemeObject } from '@tokens-studio/types';
import { logBrokenReferenceLevels, logVerbosityLevels, logWarningLevels } from 'style-dictionary/enums';
import {
	artifactBuildPathNpm,
	DesignSystemNames,
	fileNameDelimiter,
	getByProductFilePathByTokensetName,
	readJsonFile,
	themeDefinitionFileBuildPath,
	ThemeGroups,
	TokenLayers,
	tokenOutputFileNamePrefix,
} from '../../shared/index.js';
import { TsTransformGroups } from '../enums/index.js';
import {
	allianzFileHeaderName,
	cubicBezierWrapTransform,
	cubicBezierWrapTransformName,
	excludedTokensFilter,
	excludedTokensFilterName,
	fileHeaderGenerator,
	insetShorthandCalcFixTransform,
	insetShorthandCalcFixTransformName,
	lowerCaseLinearGradientTransform,
	lowerCaseLinearGradientTransformName,
	mathFunctionResolvePreprocessor,
	mathFunctionResolvePreprocessorName,
	metaInfoEnrichTransform,
	metaInfoEnrichTransformName,
	pumlColorTransform,
	pumlColorTransformName,
	pumlFormat,
	pumlFormatName,
	pumlNameTransform,
	pumlNameTransformName,
	transformTo8DigitHexValues,
	transformTo8DigitHexValuesTransformName,
} from '../hooks/index.js';
import { PermutatedThemeKeys, PermutatedThemes, SelectedTokenSets } from '../types/index.js';
import { platformAndroidConfig, platformIosSwiftConfig, platformWebJsConfig, platformWebStyleConfig } from './platforms/index.js';
import { defaultTransformOptions } from './index.js';

export const filterOutBlacklistedThemes = (allThemeDefinitions: ThemeObject[], designSystemName: DesignSystemNames): ThemeObject[] => {
	const blacklistedThemeGroups: string[] = [
		ThemeGroups.core, // is excluded cause it is not it's own theming dimension
		ThemeGroups.composites, // Composites theme group only needed for Figma, as composite tokens are not their own theming dimension
		ThemeGroups.components, // theme groups "Components" and "Densities" are getting combined to "ComponentDensities" for the build under src/preparations/token-preparations/preparators/theme-combinator.ts
		ThemeGroups.densities, // theme groups "Components" and "Densities" are getting combined to "ComponentDensities" for the build under src/preparations/token-preparations/preparators/theme-combinator.ts
		ThemeGroups.accentColor, // Needed for Figma
	];
	const relevantThemeDefinitions: ThemeObject[] = allThemeDefinitions.filter((themeDefinition: ThemeObject) => {
		const groupName: string | undefined = themeDefinition.group;

		if (groupName) {
			const isBlacklistedThemeGroup = blacklistedThemeGroups.includes(groupName);
			const hasBlacklistedThemeNameKeyword =
				designSystemName !== DesignSystemNames.ndbx && themeDefinition.name.indexOf(DesignSystemNames.ndbx.toUpperCase()) > -1;
			return !isBlacklistedThemeGroup && !hasBlacklistedThemeNameKeyword;
		} else {
			return false;
		}
	});
	return relevantThemeDefinitions;

	// Debugging different token set combinations
	// return [
	// 	{
	// 		id: '9394e0a6d23d31d33d01765fcd4fd80394e2c124',
	// 		name: 'Debugging-Set',
	// 		group: 'Debugging-Set',
	// 		selectedTokenSets: {
	// 			// @ts-ignore
	// 			'core/colors': 'enabled',
	// 			// @ts-ignore
	// 			'semantic/color-schemes/light': 'enabled',
	// 		},
	// 		$figmaStyleReferences: {},
	// 	},
	// ];
};

const getOutputFileName = (themeName: string): string => {
	const lowerCaseThemeName = themeName.toLowerCase();
	const replacedSpacesWithDelimiter = lowerCaseThemeName.replace(' ', fileNameDelimiter);
	const replaceComponentPrefixMatch = TokenLayers.components + fileNameDelimiter;
	const outputFileNameEndPart = replacedSpacesWithDelimiter.replace(replaceComponentPrefixMatch, '');
	return tokenOutputFileNamePrefix + outputFileNameEndPart;
};

// Details on the Style-Dictionary architecture and life cycle hooks: https://v4.styledictionary.com/info/architecture/
export const getStyleDictionaryConfig = (
	brand: string,
	designSystemName: DesignSystemNames,
	selectedTokenSets: string[],
	themeName: PermutatedThemeKeys,
): Config => {
	const outputFileName: string = getOutputFileName(themeName);
	const outputFilePath = `./${artifactBuildPathNpm}/${brand}/${designSystemName}`;
	const config: Config = {
		include: selectedTokenSets,
		preprocessors: [mathFunctionResolvePreprocessorName, TsTransformGroups.tokensStudio],
		hooks: {
			preprocessors: {
				[mathFunctionResolvePreprocessorName]: mathFunctionResolvePreprocessor,
			},
			fileHeaders: {
				[allianzFileHeaderName]: fileHeaderGenerator,
			},
			filters: {
				[excludedTokensFilterName]: excludedTokensFilter.filter,
			},
			formats: {
				[pumlFormatName]: pumlFormat.format,
			},
			transforms: {
				[transformTo8DigitHexValuesTransformName]: transformTo8DigitHexValues,
				[cubicBezierWrapTransformName]: cubicBezierWrapTransform,
				[lowerCaseLinearGradientTransformName]: lowerCaseLinearGradientTransform,
				[insetShorthandCalcFixTransformName]: insetShorthandCalcFixTransform,
				[metaInfoEnrichTransformName]: metaInfoEnrichTransform,
				[pumlColorTransformName]: pumlColorTransform,
				[pumlNameTransformName]: pumlNameTransform,
			},
		},
		platforms: {
			web: platformWebStyleConfig(outputFilePath, outputFileName),
			js: platformWebJsConfig(outputFilePath, outputFileName),
			android: platformAndroidConfig(outputFilePath, outputFileName),
			iosSwift: platformIosSwiftConfig(outputFilePath, outputFileName),
			// tools: platformPumlConfig(outputFilePath, outputFileName),
		},
		log: {
			warnings: logWarningLevels.warn,
			verbosity: logVerbosityLevels.silent,
			errors: {
				brokenReferences: logBrokenReferenceLevels.throw,
			},
		},
	};

	return config;
};

export const initialStyleDictionaryConfigRegistrations = async (): Promise<void> => {
	await register(StyleDictionary, defaultTransformOptions); // source: https://github.com/tokens-studio/sd-transforms
};

export const initThemePermutations = (
	brand: string,
	designSystemName: DesignSystemNames,
): { permutatedThemeNames: string[]; configs: Config[] } => {
	const allThemeDefinitions: ThemeObject[] = readJsonFile(themeDefinitionFileBuildPath) as ThemeObject[];
	const relevantThemeDefinitions: ThemeObject[] = filterOutBlacklistedThemes(allThemeDefinitions, designSystemName);
	const permutatedThemes: PermutatedThemes = permutateThemes(relevantThemeDefinitions, {
		separator: fileNameDelimiter,
	}) as PermutatedThemes;
	const permutatedThemeNames: string[] = [];
	const configs: Config[] = Object.entries(permutatedThemes).map(([permutatedThemeKey, tokensets]: [string, SelectedTokenSets]) => {
		permutatedThemeNames.push(permutatedThemeKey);
		const enabledTokenSetFiles = tokensets.map(tokenset => getByProductFilePathByTokensetName(tokenset));
		const config: Config = getStyleDictionaryConfig(
			brand,
			designSystemName,
			enabledTokenSetFiles,
			permutatedThemeKey as PermutatedThemeKeys,
		);
		return config;
	});

	return { permutatedThemeNames, configs };
};
