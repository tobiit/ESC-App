import { runRoundUps } from './round-ups/round-ups.js';
import { runPreparations } from './preparations/preparations.js';
import { Brands, DesignSystemNames, logger, logHorizontalDivider } from './shared/index.js';
import { runStyleDictionaryBuild } from './style-dict-build/style-dict-build.js';

export const runTokenBuild = async (
	brand: Brands,
	designSystemName: DesignSystemNames,
	tokenSsotExtensionFolderPath?: string,
): Promise<void> => {
	logger.start('Build started...');
	await runPreparations(designSystemName, tokenSsotExtensionFolderPath);
	await runStyleDictionaryBuild(brand, designSystemName);
	await runRoundUps(brand, designSystemName);
	logHorizontalDivider();
	logger.success('SUCCESSFULLY BUILD A1 DESIGN TOKENS');
};
