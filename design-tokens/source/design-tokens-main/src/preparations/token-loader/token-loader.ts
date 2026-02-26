import {
	filterOutBlacklistedTokenSets,
	getFilePathParts,
	isTokenSsotMetaDataFile,
	loadFilesFromFolder,
	readJsonFile,
} from '../../shared/index.js';
import { sortFigmaTokensFilePath } from '../token-file-path-sort/token-file-path-sorter.js';
import { complementAllTokensPerModifier } from './helpers/index.js';

export const loadTokenData = async (
	tokenFolderPath: string,
): Promise<{
	figmaTokenFullFilePaths: string[];
	allTokensPerModifier: Record<string, object>;
}> => {
	const allFigmaTokenFullFilePathsUnsorted: string[] = await loadFilesFromFolder(tokenFolderPath);
	const figmaTokenFullFilePathsUnsorted: string[] = filterOutBlacklistedTokenSets(allFigmaTokenFullFilePathsUnsorted);
	const figmaTokenFullFilePaths: string[] = sortFigmaTokensFilePath(figmaTokenFullFilePathsUnsorted);
	const allTokensPerModifier = {};

	for (const tokenFullFilePath of figmaTokenFullFilePaths) {
		const { filePathParts, fileName } = getFilePathParts(tokenFullFilePath);

		if (isTokenSsotMetaDataFile(fileName)) {
			continue;
		}

		const tokenJsonFileData: Record<string, object> = readJsonFile(tokenFullFilePath) as Record<string, object>;
		complementAllTokensPerModifier(filePathParts, fileName, allTokensPerModifier, tokenJsonFileData);
	}

	return { figmaTokenFullFilePaths, allTokensPerModifier };
};
