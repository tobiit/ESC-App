import { ThemeObject } from '@tokens-studio/types';
import {
	byProductBuildPath,
	copyFile,
	getByProductFilePathByFilePathParts,
	getFilePathParts,
	isTokenSsotMetaDataFile,
	metaDataFileName,
	prepareFolder,
	readJsonFile,
	themeDefinitionFileBuildPath,
	themeDefinitionFilePath,
	tokensSsotFolder,
	writeJsonFile,
} from '../../shared/index.js';
import { complementAllAdjustedTokenData } from '../token-loader/helpers/index.js';
import {
	combineDensitiesComponentThemes,
	extractInsetValueShorthands,
	// extractUnsupportedComponentFontProperties,
	// incorporateBreakpointTokens,
	removeUnsupportedFontPropertiesInComposite,
	sortSelectedTokenSets,
} from './preparators/index.js';

const collectAdjustedTokenFileData = (
	filePathParts: string[],
	fileName: string,
	adjustedTokenFileData: Record<string, object>,
	allAdjustedTokenData: Record<string, object>,
): void => {
	if (isTokenSsotMetaDataFile(fileName)) {
		return;
	}

	// possible duplicate implementation like in src/pre-processes/token-loader/token-loader.js:loadTokenData()
	complementAllAdjustedTokenData(filePathParts, fileName, allAdjustedTokenData, adjustedTokenFileData);
};

const writeToByProductFolder = (filePathParts: string[], fileName: string, adjustedTokenJsonData: object): void => {
	const { byProductFilePath, byProductFullFilePath } = getByProductFilePathByFilePathParts(filePathParts, fileName);
	prepareFolder(byProductFilePath);
	writeJsonFile(byProductFullFilePath, adjustedTokenJsonData);
};

const copyThemeDefinitionFile = (): void => {
	const themesJsonFileData: ThemeObject[] = readJsonFile(themeDefinitionFilePath) as ThemeObject[];
	const preparedBuildThemesJsonData = combineDensitiesComponentThemes(themesJsonFileData);
	const sortedThemeJsonData = sortSelectedTokenSets(preparedBuildThemesJsonData); // before copying $themes.json should get sorted selectedTokenSet arrays
	writeJsonFile(themeDefinitionFileBuildPath, sortedThemeJsonData);
};

const copyMetaDataFile = (): void => {
	const metaDataFilePath = `${tokensSsotFolder}/${metaDataFileName}`;
	const metaDataByProductFilePath = `${byProductBuildPath}/${metaDataFileName}`;
	copyFile(metaDataFilePath, metaDataByProductFilePath);
};

const copyMetaThemeFiles = (): void => {
	// meta data files like $themes.json should be copied over to byProductBuildPath
	copyThemeDefinitionFile();
	copyMetaDataFile();
};

const singleTokenSubsetPreparations = (
	tokenJsonFileData: Record<string, object>,
	// filePathParts: string[],
	// fileName: string,
): Record<string, object> => {
	// let adjustedTokenFileData: Record<string, object> = extractUnsupportedComponentFontProperties(tokenJsonFileData, filePathParts, fileName);
	// adjustedTokenFileData = removeUnsupportedFontPropertiesInComposite(adjustedTokenFileData);
	let adjustedTokenFileData = removeUnsupportedFontPropertiesInComposite(tokenJsonFileData);
	adjustedTokenFileData = extractInsetValueShorthands(adjustedTokenFileData);
	// adjustedTokenFileData = normalizeCompositionalTokens(adjustedTokenFileData, allTokensPerModifier);
	return adjustedTokenFileData;
};

const tokenFilePreparations = (
	tokenFullFilePath: string,
	allTokensPerModifier: Record<string, object>,
	filePathParts: string[],
	fileName: string,
	allAdjustedTokenData: Record<string, object>,
): void => {
	const tokenJsonFileData: Record<string, object> = readJsonFile(tokenFullFilePath) as Record<string, object>; // TODO Why am I loading the files here again, as I actually already have all data in the allTokensPerModifier object
	// const adjustedTokenFileData: Record<string, object> = singleTokenSubsetPreparations(tokenJsonFileData, filePathParts, fileName);
	const adjustedTokenFileData: Record<string, object> = singleTokenSubsetPreparations(tokenJsonFileData);
	collectAdjustedTokenFileData(filePathParts, fileName, adjustedTokenFileData, allAdjustedTokenData);
	writeToByProductFolder(filePathParts, fileName, adjustedTokenFileData);
};

const runFilePreparations = (
	figmaTokenFullFilePaths: string[],
	allTokensPerModifier: Record<string, object>,
	allAdjustedTokenData: Record<string, object>,
): string[] => {
	const byProductFullFilePaths: string[] = [];

	for (const tokenFullFilePath of figmaTokenFullFilePaths) {
		const { filePathParts, fileName } = getFilePathParts(tokenFullFilePath);
		const { byProductFullFilePath } = getByProductFilePathByFilePathParts(filePathParts, fileName);
		byProductFullFilePaths.push(byProductFullFilePath);
		tokenFilePreparations(tokenFullFilePath, allTokensPerModifier, filePathParts, fileName, allAdjustedTokenData);
		// logger.info(`Preparations finished in file ${byProductFullFilePath}`);
	}

	copyMetaThemeFiles();
	return byProductFullFilePaths;
};

export const runTokenPreparations = (figmaTokenFullFilePaths: string[], allTokensPerModifier: Record<string, object>): void => {
	const allAdjustedTokenData = {};
	runFilePreparations(figmaTokenFullFilePaths, allTokensPerModifier, allAdjustedTokenData);
	// const byProductFullFilePaths = runFilePreparations(figmaTokenFullFilePaths, allTokensPerModifier, allAdjustedTokenData);
	// multiTokenFilePreparations(byProductFullFilePaths, allAdjustedTokenData);
};
