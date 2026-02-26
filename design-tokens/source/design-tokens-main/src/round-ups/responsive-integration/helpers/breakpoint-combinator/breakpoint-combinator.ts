import path from 'path';
import fs from 'fs-extra';
import { DesignToken } from 'style-dictionary/types';
import { A1Breakpoints, copyFile, fileNameDelimiter, loadFilesFromFolder, logger, readLinesFromFile } from '../../../../shared/index.js';
import { createAndWriteMediaQuery } from '../media-query-generator/media-query-generator.js';

const compareAndExtractBreakpointAdjustedCssVariables = (
	sourceLines: string[],
	compareLines: string[],
	breakpointValue: string,
): Record<string, string[]> => {
	const accumulatedMediaQueryVariables: Record<string, string[]> = {};

	// Deduping the design tokens CSS breakpoint files:
	// Line by line CSS Variable comparison is only possible, because the CSS Variable design tokens do have the exact same order in the files.
	// This is only the case, because the selectedTokenSets are sorted in the token preparation step,
	// respecteviely in the src/preparations/token-preparations/preparators/theme-combinator.ts and the src/preparations/token-preparations/preparators/themes-sorter.ts
	for (let i = 0; i < sourceLines.length; i++) {
		const sourceLine = sourceLines[i];
		const compareLine = compareLines[i];

		if (sourceLine.trim().startsWith('--') && compareLine.trim().startsWith('--')) {
			const [sourceVar, sourceValue] = sourceLine.split(':').map(s => s.trim());
			const [compareVar, compareValue] = compareLine.split(':').map(s => s.trim());

			if (sourceVar !== compareVar) {
				throw new Error(`Variable mismatch: ${sourceVar} !== ${compareVar}`);
			}

			if (sourceValue !== compareValue) {
				if (!accumulatedMediaQueryVariables[breakpointValue]) {
					accumulatedMediaQueryVariables[breakpointValue] = [];
				}
				accumulatedMediaQueryVariables[breakpointValue].push(`    ${compareVar}: ${compareValue}`);
			}
		} else {
			if (
				(sourceLine.trim().startsWith('--') && !compareLine.trim().startsWith('--')) ||
				(!sourceLine.trim().startsWith('--') && compareLine.trim().startsWith('--'))
			) {
				throw new Error(`Output file code line comparison mismatch: ${sourceLine} !== ${compareLine}`);
			}
		}
	}

	return accumulatedMediaQueryVariables;
};

const compareAndMergeFiles = async (
	sourceFile: string,
	compareFile: string,
	targetFile: string,
	breakpointValue: string,
): Promise<boolean> => {
	const sourceLines: string[] = await readLinesFromFile(sourceFile);
	const compareLines: string[] = await readLinesFromFile(compareFile);

	if (sourceLines.length !== compareLines.length) {
		throw new Error(`Line count mismatch between ${sourceFile} and ${compareFile}`);
	}

	const mediaQueryVariables: Record<string, string[]> = compareAndExtractBreakpointAdjustedCssVariables(
		sourceLines,
		compareLines,
		breakpointValue,
	);
	return createAndWriteMediaQuery(mediaQueryVariables, targetFile);
};

export const compareBreakpointFiles = async (
	folderPath: string,
	ssotBreakpoints: Record<string, DesignToken>,
	breakpointKeys: A1Breakpoints[],
	breakpointKey: A1Breakpoints,
	nextBreakpointKey: A1Breakpoints,
): Promise<A1Breakpoints> => {
	const allCssFiles = await loadFilesFromFolder(folderPath);
	// const filteredFiles: string[] = files.filter(file => file.endsWith(`${fileNameDelimiter}${breakpointKey}.css`));
	const xsFilePaths = allCssFiles.filter(file => file.endsWith(`${fileNameDelimiter}xs.css`));
	const uniqueBaseNames = xsFilePaths.map(file => path.basename(file, `${fileNameDelimiter}xs.css`));
	// logger.info(`Found ${uniqueBaseNames.length} unique file themes to process.`);
	let changesWereMade = false;
	let currentBaseBreakpoint = breakpointKey;

	for (const baseName of uniqueBaseNames) {
		const sourceFile = path.join(folderPath, `${baseName}${fileNameDelimiter}${breakpointKey}.css`);
		const compareFile = path.join(folderPath, `${baseName}${fileNameDelimiter}${nextBreakpointKey}.css`);
		const targetFile = path.join(folderPath, `${baseName}.css`);
		// logger.debug(
		// 	`Checking files for target file ${targetFile} and breakpoint comparison of ${currentBaseBreakpoint} <--> ${nextBreakpointKey}`,
		// );

		// Only proceed if both files in the pair exist
		if (fs.existsSync(sourceFile) && fs.existsSync(compareFile)) {
			// Create the base file if it doesn't exist yet
			if (!fs.existsSync(targetFile)) {
				copyFile(sourceFile, targetFile);
			}

			const breakpointValue = ssotBreakpoints[nextBreakpointKey]?.$value;
			if (!breakpointValue) {
				throw new Error(`Breakpoint value for ${nextBreakpointKey} is not defined.`);
			}

			changesWereMade = await compareAndMergeFiles(sourceFile, compareFile, targetFile, breakpointValue);
		}
	}

	// If changes were found, the larger breakpoint becomes the new base for the next comparison
	if (changesWereMade && breakpointKeys.indexOf(breakpointKey) < breakpointKeys.indexOf(nextBreakpointKey)) {
		logger.info(`Detected design token value diff between ${breakpointKey} <--> ${nextBreakpointKey}`);
		currentBaseBreakpoint = nextBreakpointKey;
	} else {
		logger.warn(`No design token value diff between ${breakpointKey} <--> ${nextBreakpointKey}`);
	}

	return currentBaseBreakpoint;
};
