import { Stats } from 'fs';
import fs from 'fs-extra';
import { glob } from 'glob';
import {
	artifactBuildPathNpm,
	byProductBuildPath,
	preparedTokenFileFormat,
	tokenSsotFileFormat,
	tokensSsotFolder,
} from '../../constants/index.js';
import { logGeneralError } from '../../loggers/logger-misc.js';

export const getArtifactBuildPath = (brand: string, designSystemName: string, platform: string, buildArtifactFileSubPath: string): string =>
	`${artifactBuildPathNpm}/${brand}/${designSystemName}/${platform}/${buildArtifactFileSubPath}`;

export const getByProductFilePathByFilePathParts = (
	filePathParts: string[],
	fileName: string,
): { byProductFilePath: string; byProductFullFilePath: string } => {
	const copiedFilePathParts = [...filePathParts];
	copiedFilePathParts[0] = byProductBuildPath; // overriding "tokens" folder in path
	const byProductFilePath = copiedFilePathParts.join('/') + '/';
	const byProductFullFilePath = `${byProductFilePath}${fileName}`;
	return { byProductFilePath, byProductFullFilePath };
};

export const getFilePathByTokensetName = (tokensetName: string): string => `${tokensSsotFolder}/${tokensetName}${tokenSsotFileFormat}`;

export const getByProductFilePathByTokensetName = (tokensetName: string): string =>
	`${byProductBuildPath}/${tokensetName}${preparedTokenFileFormat}`;

export const readFile = (filePath: string): string => fs.readFileSync(filePath, 'utf-8');

export const writeFile = (filePath: string, data: string): void => fs.writeFileSync(filePath, data);

export const copyFile = (srcPath: string, destPath: string): void => fs.copyFileSync(srcPath, destPath);

export const appendToFile = (filePath: string, data: string): void => fs.appendFileSync(filePath, data);

export const readJsonFile = (filePath: string): object => fs.readJsonSync(filePath, { throws: false }) as object;

export const writeJsonFile = (filePath: string, jsonData: object): void =>
	fs.writeJSONSync(filePath, jsonData, { encoding: 'UTF-8', spaces: 2 });

export const renameFile = (oldFilePath: string, newFilePath: string): Promise<void> => fs.rename(oldFilePath, newFilePath);

export const statSync = (filePath: string): Stats => fs.statSync(filePath);

export const checkFolderExistence = (folderPath: string): boolean => fs.existsSync(folderPath);

export const prepareFolder = (folderPath: string): void => {
	if (!checkFolderExistence(folderPath)) {
		fs.mkdirSync(folderPath, { recursive: true });
	}
};

export const loadFilesFromFolder = (folderPath: string): Promise<string[]> => glob(`./${folderPath}/**/**/*.*`); // source: https://github.com/isaacs/node-glob

export const getFilePathParts = (filePath: string): { filePathParts: string[]; fileName: string } => {
	const filePathParts: string[] = filePath.split('/');
	const fileName: string | undefined = filePathParts.pop();

	if (fileName == null || (filePathParts.length === 0 && fileName === '') || (filePathParts.length >= 1 && fileName === '')) {
		logGeneralError('Could not resolve file name from file path.');
	}

	return { filePathParts, fileName: fileName as string };
};

export const readLinesFromFile = async (filePath: string): Promise<string[]> => {
	const fileContent = readFile(filePath);
	const lines = fileContent.split('\n');
	return lines;
};
