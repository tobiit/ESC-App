import { DesignSystemNames, logger, logHorizontalDivider, tokensSsotFolder } from '../shared/index.js';
import { loadTokenData } from './token-loader/token-loader.js';
import { runTokenPreparations } from './token-preparations/token-preparations.js';
import { checkForTokenSetExtensionCaseAndPrepare } from './token-set-extension/token-set-extension.js';

export const runPreparations = async (designSystemName: DesignSystemNames, tokenSsotExtensionFolderPath?: string): Promise<void> => {
	logHorizontalDivider();
	logger.start('Loading and tokens SSOT preparations started');
	await checkForTokenSetExtensionCaseAndPrepare(tokenSsotExtensionFolderPath);
	const resolvedTokensSsotFolder = tokenSsotExtensionFolderPath ?? `${tokensSsotFolder}/${designSystemName}`;
	const { figmaTokenFullFilePaths, allTokensPerModifier } = await loadTokenData(resolvedTokensSsotFolder);
	runTokenPreparations(figmaTokenFullFilePaths, allTokensPerModifier);
	await Promise.resolve(); // Dummy Placeholder Promise, cause Promises will come later on in here
	logger.success(`All Preparations finished`);
};
