import { DesignToken } from 'style-dictionary/types';
import {
	A1Breakpoints,
	artifactBuildPathNpm,
	DesignSystemNames,
	GridBreakpointSsot,
	logger,
	logHorizontalDivider,
	logicalTokenSetError,
	Platforms,
	readJsonFile,
	TokenLayers,
	tokenSsotFileFormat,
	tokensSsotFolder,
} from '../../shared/index.js';
import { compareBreakpointFiles } from './helpers/index.js';

/**
 * PSEUDO CODE ALGORITHM PROMPT
 * in the directory under token-package/dist/escapp/a1/web make a copy of all the files ending with "-xs.css" and remove the "-xs" from the file name. Use the loadFilesFromFolder function from src/shared/utils/file-helper.ts
 * Read all the files ending with "-xs.css" by using the NodeJS core library module "readline" and if necessary the fs-extra library, which is already installed as a dependency. If necessary create new helper functions in file src/shared/utils/file-helper.ts.
 * Compare each of them line by line with the corresponding file ending with "-m.css".
 * If the CSS variable name is not the same throw an error.
 * If the css variable name is the same but has a different value, place that CSS variable from the file ending with "-m.css" in a media query for that breakpoint into the newly copied file.
 * The breakpoints can be resolved to pixel values from the file under tokens/core/grid.json and the object path "core.breakpoint.m".
 * Similar to the xs to m comparison, read all the files ending with "-m.css" and compare each of them line by line with the corresponding file ending with "-l.css".
 * If the CSS variable name is not the same throw an error.
 * If the css variable name is the same but has a different value, place that CSS variable from the file ending with "-l.css" in a media query for that breakpoint into the newly copied file.
 * The breakpoints can be resolved to pixel values from the file under tokens/core/grid.json and the object path "core.breakpoint.l".
 */

const breakpointCssOutputFileComparison = async (brand: string, designSystemName: DesignSystemNames): Promise<void> => {
	const folderPath = `${artifactBuildPathNpm}/${brand}/${designSystemName}/${Platforms.web}`;
	const gridFilePath = `${tokensSsotFolder}/${designSystemName}/${TokenLayers.core}/grid${tokenSsotFileFormat}`;
	const gridCoreTokens = readJsonFile(gridFilePath) as GridBreakpointSsot;
	const ssotBreakpoints: Record<string, DesignToken> = gridCoreTokens.core.size.breakpoint as Record<string, DesignToken>;
	const breakpointKeys: A1Breakpoints[] = Object.keys(ssotBreakpoints) as A1Breakpoints[];
	const comparingBreakpointKeys: A1Breakpoints[] = [...breakpointKeys];
	let currentBaseBreakpoint: A1Breakpoints = comparingBreakpointKeys.shift() || A1Breakpoints.xs; // Default to xs if no breakpoints are available

	for (const largerBreakpoint of comparingBreakpointKeys) {
		currentBaseBreakpoint = await compareBreakpointFiles(
			folderPath,
			ssotBreakpoints,
			breakpointKeys,
			currentBaseBreakpoint,
			largerBreakpoint,
		);
	}

	logger.success('Responsive integration for CSS output file assets completed.');
};

export const runResponsiveCssIntegration = async (brand: string, designSystemName: DesignSystemNames): Promise<void> => {
	logHorizontalDivider();
	logger.start('Running responsive integration for CSS output file assets.');
	await breakpointCssOutputFileComparison(brand, designSystemName).catch((error: Error) => {
		logicalTokenSetError('Responsive integration failed', [error.message, error.stack ? error.stack : '']);
	});
};
