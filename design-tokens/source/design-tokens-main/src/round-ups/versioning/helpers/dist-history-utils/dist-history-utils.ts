import {
	cdnArtifactFolderName,
	readJsonFile,
	tokenDistHistoryFilename,
	tokenDistHistoryFilePath,
	tokenPackagePath,
	writeJsonFile,
} from '../../../../shared/index.js';
import { DistHistory, DistHistoryEntry } from '../../types/index.js';

export const addInitialDistHistoryEntry = (distHistory: DistHistory, hash: string, version: string): void => {
	distHistory = {
		distFolderHistory: [
			{
				version,
				hash,
				comment: 'init',
				updated: new Date().toISOString(),
			},
		],
	};
};

export const getLastVersionEntryDetails = (
	distVersionHistoryEntries: Array<DistHistoryEntry>,
): { storedHash: string; storedVersion: string } => {
	const fileHistoryArraylength = distVersionHistoryEntries.length;
	const lastVersionHistoryEntryForFile: DistHistoryEntry = distVersionHistoryEntries[fileHistoryArraylength - 1];
	const storedHash: string = lastVersionHistoryEntryForFile.hash;
	const storedVersion: string = lastVersionHistoryEntryForFile.version;
	return { storedHash, storedVersion };
};

export const initDistHistoryObj = (): { distHistory: DistHistory; distHistoryExists: boolean } => {
	let distHistoryExists = true;
	let distHistory: DistHistory = readJsonFile(tokenDistHistoryFilePath) as DistHistory;

	if (!distHistory) {
		distHistoryExists = false;
		distHistory = { distFolderHistory: [] };
	}

	return { distHistory, distHistoryExists };
};

export const setDistHistoryInfo = (distHistory: DistHistory, newDistHistoryEntry: DistHistoryEntry): void => {
	if (newDistHistoryEntry.version && newDistHistoryEntry.hash) {
		distHistory.distFolderHistory.push({
			...newDistHistoryEntry,
			updated: new Date().toISOString(),
		});
	}
};

export const copyDistHistoryToCdnFolder = (distHistory: DistHistory) => {
	// token-package/cdn/tokens/dist-history.json will be used by the docs-app version select drop down for the versioned documentation
	const cdnDistHistoryFilePath = `${tokenPackagePath}/${cdnArtifactFolderName}/${tokenDistHistoryFilename}`;
	writeJsonFile(cdnDistHistoryFilePath, distHistory);
};

export const writeDistHistoryFile = (distHistory: DistHistory) => {
	writeJsonFile(tokenDistHistoryFilePath, distHistory);
	copyDistHistoryToCdnFolder(distHistory);
};
