import { DesignSystemNames } from '../shared/index.js';
import { inferScssMixin } from './infer-scss-mixin/infer-scss-mixin.js';
import { runRemTypoUnitConversions } from './rem-typo-units-conversion/rem-typo-units-conversion.js';
import { runResponsiveCssIntegration } from './responsive-integration/responsive-integration.js';
import { runDistVersioning } from './versioning/dist-versioning.js';

export const runRoundUps = async (brand: string, designSystemName: DesignSystemNames): Promise<void> => {
	await runResponsiveCssIntegration(brand, designSystemName);
	await inferScssMixin(brand, designSystemName);
	await runRemTypoUnitConversions(brand, designSystemName);
	await runDistVersioning();
};
