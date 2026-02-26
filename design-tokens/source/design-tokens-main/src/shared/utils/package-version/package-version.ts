import { PackageJson } from 'type-fest';
import { tokenPackageJsonPath } from '../../constants/index.js';
import { PackageLockJson } from '../../types/index.js';
import { logger } from '../../loggers/index.js';
import { readJsonFile, writeJsonFile } from '../file-helper/file-helper.js';

export const initialDistVersion = '0.0.1';

const getTokenPackageConfig = (): PackageJson => readJsonFile(tokenPackageJsonPath);

export const getTokenPackageVersion = (): string => {
	const tokenPackageConfig: PackageJson = getTokenPackageConfig();
	const resolvedTokenPackageVersion: string | undefined = tokenPackageConfig.version;

	if (resolvedTokenPackageVersion == null) {
		const errorMessage = 'Token Package version could not be resolved';
		logger.error(errorMessage);
		throw new Error(errorMessage);
	}

	return resolvedTokenPackageVersion;
};

const setNewVersionInPackageLockJson = (packageJsonPath: string, newVersion: string): void => {
	const packageLockJsonPath: string = packageJsonPath.split('.')[0] + '-lock.json';
	const packageLockConfig: PackageLockJson = readJsonFile(packageLockJsonPath) as PackageLockJson;
	packageLockConfig.version = newVersion;
	packageLockConfig.packages[''].version = newVersion;
	writeJsonFile(packageLockJsonPath, packageLockConfig);
};

export const setNewVersionInPackageJson = (newVersion: string): void => {
	const tokenPackageConfig: PackageJson = getTokenPackageConfig();
	tokenPackageConfig.version = newVersion;
	writeJsonFile(tokenPackageJsonPath, tokenPackageConfig);
	setNewVersionInPackageLockJson(tokenPackageJsonPath, newVersion);
};
