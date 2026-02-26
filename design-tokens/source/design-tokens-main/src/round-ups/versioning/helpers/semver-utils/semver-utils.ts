import semver, { ReleaseType } from 'semver';
import { logger } from '../../../../shared/index.js';
import { DistHistory, UserPromptInput } from '../../types/index.js';
import { askForVersionBump } from '../user-prompt/user-prompt.js';

export const determineNewFileVersionFromUserPrompt = async (storedVersion: string): Promise<{ newVersion: string; comment: string }> => {
	logger.pending('User input needed for specifying version bump and dist-history comment.');
	const response: UserPromptInput = await askForVersionBump(); // ask the user what kind of version bump should be performed
	const versionBumpSemVerLevel: ReleaseType = response.promptSemLevel as ReleaseType;
	const newVersion: string | undefined = semver.parse(storedVersion)?.inc(versionBumpSemVerLevel).version;
	const comment = response.promptChangeMessage;

	if (newVersion == null) {
		const errorMessage = 'Error in resolving new semantic version for token-package!';
		logger.error(errorMessage);
		throw new Error(errorMessage);
	}

	logger.info(
		`Selected semantic version level ${versionBumpSemVerLevel.toUpperCase()} bumps version from v${storedVersion} to v${newVersion} with following comment: ${comment}`,
	);
	return { newVersion, comment };
};

export const distHistoryEqualToPackageVersion = (tokenPackageVersion: string, distHistory: DistHistory): boolean => {
	const distFolderHistory = distHistory?.distFolderHistory;
	const exemplaryPackageVersion: string = distFolderHistory[distFolderHistory.length - 1]?.version;
	const versionCompareResult: number | undefined = exemplaryPackageVersion
		? semver.parse(tokenPackageVersion)?.compare(exemplaryPackageVersion)
		: undefined;
	return versionCompareResult != null && versionCompareResult === 0 ? true : false;
};

export const manualPackageVersionBumpDetected = (tokenPackageVersion: string, distHistory: DistHistory): boolean => {
	const distFolderHistory = distHistory?.distFolderHistory;
	const exemplaryPackageVersion: string = distFolderHistory[distFolderHistory.length - 1]?.version;
	const versionCompareResult: number | undefined = exemplaryPackageVersion
		? semver.parse(tokenPackageVersion)?.compare(exemplaryPackageVersion)
		: undefined;
	return versionCompareResult && versionCompareResult > 0 ? true : false;
};
