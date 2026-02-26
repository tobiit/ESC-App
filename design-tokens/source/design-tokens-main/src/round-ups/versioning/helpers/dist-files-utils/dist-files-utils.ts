import crypto from 'crypto';
import {
	cdnArtifactFolderName,
	copyFile,
	createDateFileHeaderPlaceholder,
	initialDistVersion,
	prepareFolder,
	readFile,
	statSync,
	versionFileHeaderPlaceholder,
	writeFile,
} from '../../../../shared/index.js';
import { OutputFilePathParts, PreparedOutputFileVersionCheckData } from '../../types/index.js';

export const createDistHash = async (files: string[]) => {
	const sortedFiles = files.sort();
	const hash = crypto.createHash('sha256');

	await Promise.all(
		sortedFiles.map((file: string) => {
			const stats = statSync(file);

			if (stats.isFile()) {
				const data = readFile(file);
				hash.update(data);
			}
		}),
	);

	return hash.digest('hex');
};

export const extractTokenOutputFilePathParts = (tokenOutputFullFilePath: string): OutputFilePathParts => {
	const tokenOutputFilePathParts: string[] = tokenOutputFullFilePath.split('/');
	const brand: string = tokenOutputFilePathParts[2];
	const designSystemName: string = tokenOutputFilePathParts[3];
	const platform: string = tokenOutputFilePathParts[4];
	const file: string = tokenOutputFilePathParts[tokenOutputFilePathParts.length - 1];
	return { tokenOutputFilePathParts, platform, brand, file, designSystemName };
};

export const prepareVersionCheckData = (tokenOutputFullFilePath: string): PreparedOutputFileVersionCheckData => {
	const { tokenOutputFilePathParts, platform, brand, file } = extractTokenOutputFilePathParts(tokenOutputFullFilePath);

	return {
		tokenOutputFullFilePath,
		tokenOutputFilePathParts,
		platform,
		brand,
		file,
		initialDistVersion,
	};
};

const addVersionToCdnFilePath = (preparedOutputFileVersionCheckData: PreparedOutputFileVersionCheckData, version: string): string => {
	const { tokenOutputFilePathParts } = preparedOutputFileVersionCheckData;
	const tokenCdnOutputFilePathParts = [...tokenOutputFilePathParts]; // Copy because of the subsequent changes on the values of this array
	const fileParts = tokenOutputFilePathParts[tokenCdnOutputFilePathParts.length - 1].split('.'); // Split at file format at the end
	fileParts.splice(-1, 0, version);
	const newCdnFileName = fileParts.join('.');
	tokenCdnOutputFilePathParts.pop(); // removing old filename
	tokenCdnOutputFilePathParts[1] = `${cdnArtifactFolderName}/${version}`; // replacing 'dist' with 'cdn/tokens/<version>'
	const cdnTokenFolderPath = tokenCdnOutputFilePathParts.join('/');
	prepareFolder(cdnTokenFolderPath);
	const newCdnFilePath = cdnTokenFolderPath + '/' + newCdnFileName;
	return newCdnFilePath;
};

export const handleCdnOutputFiles = async (
	tokenOutputFullFilePath: string,
	preparedOutputFileVersionCheckData: PreparedOutputFileVersionCheckData,
	version: string,
): Promise<void> => {
	const newCdnFilePath = addVersionToCdnFilePath(preparedOutputFileVersionCheckData, version);
	copyFile(tokenOutputFullFilePath, newCdnFilePath);
};

export const addMetaDataToFileHeaderComment = (filePath: string, version: string) => {
	// Version and Date are not part of the dist folder hash saved in the dist history!
	const fileContent = readFile(filePath);
	const fileContentWithVersion = fileContent.replace(versionFileHeaderPlaceholder, version);
	const now = new Date().toString();
	const fileContentWithVersionAndDate = fileContentWithVersion.replace(createDateFileHeaderPlaceholder, now);
	writeFile(filePath, fileContentWithVersionAndDate);
};
