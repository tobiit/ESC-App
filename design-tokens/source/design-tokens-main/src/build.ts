import { Brands, DesignSystemNames, logger } from './shared/index.js';
import { runTokenBuild } from './index.js';

await runTokenBuild(Brands.allianz, DesignSystemNames.a1).catch((error: Error) => {
	logger.error('Error in main runTokenBuild function:');
	throw error;
});
