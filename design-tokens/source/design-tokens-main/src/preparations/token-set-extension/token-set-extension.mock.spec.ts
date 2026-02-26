import { jest } from '@jest/globals';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock data for testing
export const mockTokensSsotFolder = 'tokens';
export const mockExtensionFolderPath = '/test/extension/path';
export const mockDestPath = '/test/dest/path';
export const mockSrcPath = `node_modules/@allianz/a1-design-tokens-builder/${mockTokensSsotFolder}`;

// Mock file paths
export const mockExtensionFilePaths = [
	'/test/extension/path/custom.json',
	'/test/extension/path/components/button.json',
	'/test/extension/path/semantic/colors/custom.json',
];

export const mockEmptyExtensionFilePaths: string[] = [];

export const mockOriginalA1TokenFilePaths = [
	`${mockSrcPath}/core/colors.json`,
	`${mockSrcPath}/core/typography.json`,
	`${mockSrcPath}/semantic/light.json`,
	`${mockSrcPath}/components/button.json`,
	`${mockSrcPath}/$metadata.json`,
	`${mockSrcPath}/$themes.json`,
];

export const mockNonMetadataFilePaths = [
	`${mockSrcPath}/core/colors.json`,
	`${mockSrcPath}/core/typography.json`,
	`${mockSrcPath}/semantic/light.json`,
	`${mockSrcPath}/components/button.json`,
];

export const mockMetadataFilePaths = [`${mockSrcPath}/$metadata.json`, `${mockSrcPath}/$themes.json`];

// Mock file path parts
export const mockFilePathParts = {
	filePathParts: ['/test', 'dest', 'path', 'core'],
	fileName: 'colors.json',
};

// Mock return values
export const mockFolderExists = true;
export const mockFolderDoesNotExist = false;

// Mock additional error message
export const mockAdditionalErrorMessage =
	'Stopped the build process, cause it would not be any difference to the original A1 design tokens. If this is intentional please just use the provided A1 design tokens. More infos under: https://github.developer.allianz.io/a1/design-tokens/blob/main/token-package/README.md';

// Mock error messages
export const mockFolderNotExistErrorMessage = `The token SSOT extension folder does not exist under path: ${mockExtensionFolderPath}. ${mockAdditionalErrorMessage}`;
export const mockNoFilesErrorMessage = `No token SSOT extension files exist. ${mockAdditionalErrorMessage}`;

// Mock log messages
export const mockFolderFoundMessage = `Token SSOT extension folder found: ${mockExtensionFolderPath}`;
export const mockFilesDetectedMessage = `Number of detected design token extension files: ${mockExtensionFilePaths.length}`;
export const mockNoExtensionPathMessage = `No token SSOT extension folder path provided. The build process will continue with the original A1 design tokens.`;

// Mock scenarios for testing different conditions
export const createFolderExistsScenario = () => {
	return {
		folderPath: mockExtensionFolderPath,
		folderExists: mockFolderExists,
		filePaths: mockExtensionFilePaths,
		expectedResult: true,
	};
};

export const createFolderDoesNotExistScenario = () => {
	return {
		folderPath: mockExtensionFolderPath,
		folderExists: mockFolderDoesNotExist,
		filePaths: [],
		expectedResult: false,
	};
};

export const createEmptyFolderScenario = () => {
	return {
		folderPath: mockExtensionFolderPath,
		folderExists: mockFolderExists,
		filePaths: mockEmptyExtensionFilePaths,
		expectedResult: false,
	};
};

export const createCopyOperationScenario = () => {
	return {
		destPath: mockDestPath,
		srcPath: mockSrcPath,
		originalFilePaths: mockOriginalA1TokenFilePaths,
		nonMetadataFiles: mockNonMetadataFilePaths,
		metadataFiles: mockMetadataFilePaths,
	};
};

export const createNoExtensionPathScenario = () => {
	return {
		extensionPath: undefined,
		shouldCopyFiles: false,
	};
};

export const createValidExtensionPathScenario = () => {
	return {
		extensionPath: mockExtensionFolderPath,
		shouldCopyFiles: true,
	};
};

// Reset function to clear all mocks
export const resetAllMocks = () => {
	jest.clearAllMocks();
};
