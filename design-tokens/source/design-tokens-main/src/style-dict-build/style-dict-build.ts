import StyleDictionary from 'style-dictionary';
import { DesignSystemNames, getReadableTimeDuration, logger, logHorizontalDivider } from '../shared/index.js';
import { initialStyleDictionaryConfigRegistrations, initThemePermutations } from './configs/index.js';
import type { Config } from 'style-dictionary/types';

export const runStyleDictionaryBuild = async (brand: string, designSystemName: DesignSystemNames): Promise<void> => {
	logHorizontalDivider();
	logger.start('Style Dictionary builds');
	const styleDictionaryBuildStart: Date = new Date();
	await initialStyleDictionaryConfigRegistrations();
	const { permutatedThemeNames, configs } = initThemePermutations(brand, designSystemName);

	for (let index = 0; index < configs.length; index++) {
		const config: Config = configs[index];
		const sd: StyleDictionary = new StyleDictionary(config);
		// sd.cleanAllPlatforms(); // not necessary as the dist folder will be deleted before each new build
		logger.info(`Style Dictionary is building all platforms for theme: ${permutatedThemeNames[index]}`);
		await sd.buildAllPlatforms();
		// await sd.formatAllPlatforms();
	}

	logger.success(`Finished generating token output files in ${getReadableTimeDuration(styleDictionaryBuildStart)} hh:mm:ss`);
};
