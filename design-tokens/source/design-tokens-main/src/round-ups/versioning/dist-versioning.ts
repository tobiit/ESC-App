import {
	artifactBuildPathNpm,
	getTokenPackageVersion,
	initialDistVersion,
	loadFilesFromFolder,
	logger,
	logHorizontalDivider,
	setNewVersionInPackageJson,
} from '../../shared/index.js';
import {
	addInitialDistHistoryEntry,
	addMetaDataToFileHeaderComment,
	copyDistHistoryToCdnFolder,
	createDistHash,
	determineNewFileVersionFromUserPrompt,
	distHistoryEqualToPackageVersion,
	getLastVersionEntryDetails,
	handleCdnOutputFiles,
	initDistHistoryObj,
	manualPackageVersionBumpDetected,
	prepareVersionCheckData,
	setDistHistoryInfo,
	writeDistHistoryFile,
} from './helpers/index.js';
import { DistHistory, DistHistoryEntry, PreparedOutputFileVersionCheckData } from './types/index.js';

const detectDistChanges = async (
	files: string[],
	distHistory: DistHistory,
	distHistoryExists: boolean,
): Promise<{ isNewVersionBump: boolean; newHash: string }> => {
	let isNewVersionBump = false;
	const newHash = await createDistHash(files);

	if (!distHistory) {
		logger.warn(`The dist is new!`);
		addInitialDistHistoryEntry(distHistory, newHash, initialDistVersion);
		isNewVersionBump = true;
	} else {
		const { storedHash } = getLastVersionEntryDetails(distHistory.distFolderHistory);

		if (newHash && storedHash !== newHash && distHistoryExists) {
			logger.warn(`The dist has been changed!`);
			isNewVersionBump = true;
		}
	}

	return { isNewVersionBump, newHash };
};

const prepareOutputFiles = async (files: string[], newVersion: string): Promise<void> => {
	logger.start(`Updating version in output files and minifying CSS/JS/JSON CDN assets`);
	for (const tokenOutputFullFilePath of files) {
		addMetaDataToFileHeaderComment(tokenOutputFullFilePath, newVersion);
		const preparedOutputFileVersionCheckData: PreparedOutputFileVersionCheckData = prepareVersionCheckData(tokenOutputFullFilePath);
		await handleCdnOutputFiles(tokenOutputFullFilePath, preparedOutputFileVersionCheckData, newVersion);
		// handleCdnOutputFiles(tokenOutputFullFilePath, preparedOutputFileVersionCheckData, 'latest'); // currently disabled! For details see Jira ticket https://jmp.escapp.net/browse/A1-718
	}
	logger.success(`Finished minifying CDN assets.`);
};

const fileReleasePreparations = async (
	files: string[],
	distHistory: DistHistory,
	newVersion: string,
	comment: string,
	newHash: string,
): Promise<void> => {
	const newDistHistoryEntry: DistHistoryEntry = { version: newVersion, comment, hash: newHash };
	setDistHistoryInfo(distHistory, newDistHistoryEntry);
	await prepareOutputFiles(files, newVersion);
	setNewVersionInPackageJson(newVersion);
};

const manualVersionBump = async (
	distFolderFiles: string[],
	distHistory: DistHistory,
	tokenPackageVersion: string,
	newHash: string,
): Promise<void> => {
	logger.warn(`Manual package version bump detected (v${tokenPackageVersion})!`);
	const comment = 'Manual Package Version Bump'; // TODO how to have a more meaningful comment without an additional user prompt?
	await fileReleasePreparations(distFolderFiles, distHistory, tokenPackageVersion, comment, newHash);
	writeDistHistoryFile(distHistory);
	logger.success(
		`Updated dist-history.json file and added version v${tokenPackageVersion} to package-lock.json and design token output files.`,
	);
};

export const runDistVersioning = async (): Promise<void> => {
	logHorizontalDivider();
	logger.start('Scanning generated output files for changes and new files.');
	const distFolderFiles: string[] = await loadFilesFromFolder(artifactBuildPathNpm);
	const { distHistory, distHistoryExists } = initDistHistoryObj();
	const tokenPackageVersion: string = getTokenPackageVersion();
	const { isNewVersionBump, newHash } = await detectDistChanges(distFolderFiles, distHistory, distHistoryExists);

	if (isNewVersionBump && !manualPackageVersionBumpDetected(tokenPackageVersion, distHistory)) {
		// This case is usually ran by a developer locally
		logger.warn('Design token output file changes detected!');
		const { newVersion, comment } = await determineNewFileVersionFromUserPrompt(tokenPackageVersion);
		await fileReleasePreparations(distFolderFiles, distHistory, newVersion, comment, newHash);
		writeDistHistoryFile(distHistory);
		setNewVersionInPackageJson(newVersion);
		logger.success('Updated dist-history.json file, added version to design token output files and updated version in package.json.');
	} else {
		if (manualPackageVersionBumpDetected(tokenPackageVersion, distHistory)) {
			// This case is ran, when a developer only manually updated the package.json version without running the build and versioning script committing the resulting new distHistory
			await manualVersionBump(distFolderFiles, distHistory, tokenPackageVersion, newHash);
		} else if (distHistoryEqualToPackageVersion(tokenPackageVersion, distHistory)) {
			// This case is usually ran by CI/CD in Jenkins, Build without version changes
			logger.warn('No file changes and no manual package version bump detected!');
			await prepareOutputFiles(distFolderFiles, tokenPackageVersion);
			copyDistHistoryToCdnFolder(distHistory);
			logger.success(`Only added existing version v${tokenPackageVersion} to design token output files.`);
		} else {
			const errorMsg =
				'Something went wrong with the versioning! Possibly lower token-package/package.json version than in token-package/dist-history.json!?';
			logger.error(errorMsg);
			throw new Error(errorMsg);
		}
	}
};
