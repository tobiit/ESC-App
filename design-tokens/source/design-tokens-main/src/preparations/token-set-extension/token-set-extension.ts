import {
	checkFolderExistence,
	copyFile,
	getFilePathParts,
	isTokenSsotMetaDataFile,
	loadFilesFromFolder,
	logGeneralError,
	logger,
	prepareFolder,
	tokensSsotFolder,
} from '../../shared/index.js';

const additionalErrorMessage =
	'Stopped the build process, cause it would not be any difference to the original A1 design tokens. If this is intentional please just use the provided A1 design tokens. More infos under: https://github.developer.escapp.io/a1/design-tokens/blob/main/token-package/README.md';

const checkForTokenExtensionPath = async (tokenSsotExtensionFolderPath: string): Promise<boolean> => {
	// Check if the folder exists
	if (!checkFolderExistence(tokenSsotExtensionFolderPath)) {
		logGeneralError(
			`The token SSOT extension folder does not exist under path: ${tokenSsotExtensionFolderPath}. ${additionalErrorMessage}`,
		);
	}

	logger.info(`Token SSOT extension folder found: ${tokenSsotExtensionFolderPath}`);
	const tokenSsotExtensionFilePaths: string[] = await loadFilesFromFolder(tokenSsotExtensionFolderPath);

	// Check if the folder is empty
	if (tokenSsotExtensionFilePaths.length === 0) {
		// logger.warn(`The token SSOT extension folder is empty: ${tokenSsotExtensionFolderPath}`);
		logGeneralError(`No token SSOT extension files exist. ${additionalErrorMessage}`);
		return false;
	} else {
		logger.info(`Number of detected design token extension files: ${tokenSsotExtensionFilePaths.length}`);
		return true;
	}
};

const copyOriginalA1TokenSsotFolderContent = async (destPath: string) => {
	const srcPath = `node_modules/@escapp/a1-design-tokens-builder/${tokensSsotFolder}`;
	const originalA1TokenSsotFilePaths: string[] = await loadFilesFromFolder(srcPath);

	originalA1TokenSsotFilePaths.forEach((originalA1TokenSsotFilePath: string) => {
		if (isTokenSsotMetaDataFile(originalA1TokenSsotFilePath)) {
			// TODO Merge $themes.json and $metadata.json files into new existing ones, if they exist
			// Otherwise copy them as is
		} else {
			const adjustedNewFileSubPath = originalA1TokenSsotFilePath.replace(srcPath, '');
			const adjustedNewFilePath = `${destPath}${adjustedNewFileSubPath}`;
			const { filePathParts } = getFilePathParts(adjustedNewFilePath);
			prepareFolder(`${filePathParts.join('/')}`);
			copyFile(originalA1TokenSsotFilePath, `${adjustedNewFilePath}`);
		}
	});
};

export const checkForTokenSetExtensionCaseAndPrepare = async (tokenSsotExtensionFolderPath?: string): Promise<void> => {
	if (tokenSsotExtensionFolderPath) {
		const tokenSsotExtensionFilesExist = await checkForTokenExtensionPath(tokenSsotExtensionFolderPath);

		if (tokenSsotExtensionFilesExist) {
			await copyOriginalA1TokenSsotFolderContent(tokenSsotExtensionFolderPath);
		}
	} else {
		logger.info(`No token SSOT extension folder path provided. The build process will continue with the original A1 design tokens.`);
	}
};
