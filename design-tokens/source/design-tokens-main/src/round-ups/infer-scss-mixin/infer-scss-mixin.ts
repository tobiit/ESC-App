import {
	CssSelectors,
	DesignSystemNames,
	FileExtensions,
	fileNameDelimiter,
	loadFilesFromFolder,
	logger,
	prepareFolder,
	readLinesFromFile,
	scssMixinsFileNameKeyWord,
	writeFile,
} from '../../shared/index.js';
import { BraceType } from '../responsive-integration/enums/brace-type.enum.js';
import { ScssMixinFileProcessingData } from '../responsive-integration/types/scss-mixin-file-processing-data.type.js';
import { ScssMixinProcessingState } from '../responsive-integration/types/scss-mixin-processing-state.type.js';
import { scssThemeMixinsBarrelFile } from './helpers/index.js';

const mixinParameterName = '$selector';
const scssSelectorInterpolation = `#{${mixinParameterName}}`;

export const hasExactlyThreeDashes = (fileName: string): boolean => {
	if (typeof fileName !== 'string') {
		return false;
	}
	const dashCount = (fileName.match(/-/g) || []).length;
	return dashCount === 3;
};

export const isCssFile = (filePath: string): boolean => {
	if (typeof filePath !== 'string') {
		return false;
	}
	return filePath.endsWith(FileExtensions.css);
};

export const extractFileName = (filePath: string): string => {
	if (!filePath) {
		return '';
	}
	const pathParts = filePath.split('/');
	const fileName = pathParts[pathParts.length - 1];
	return fileName || '';
};

const createFileProcessingData = (cssFilePath: string): ScssMixinFileProcessingData => {
	const fileName = extractFileName(cssFilePath);
	const fileNameWithoutExtension = fileName.replace(FileExtensions.css, '');
	const scssFileEnding = `${fileNameDelimiter}${scssMixinsFileNameKeyWord}${FileExtensions.scss}`;
	const scssFilePath = cssFilePath.replace(FileExtensions.css, scssFileEnding);
	const mixinName = `design-${fileNameWithoutExtension}`;

	return {
		filePath: cssFilePath,
		fileName,
		fileNameWithoutExtension,
		scssFilePath,
		mixinName,
	};
};

const findHeaderCommentEndIndex = (cssLines: string[]): number => {
	for (let i = 0; i < cssLines.length; i++) {
		if (cssLines[i].includes('*/')) {
			return i;
		}
	}
	return -1;
};

const extractHeaderAndContentLines = (cssLines: string[]): { headerLines: string[]; contentLines: string[] } => {
	const headerEndIndex = findHeaderCommentEndIndex(cssLines);
	const headerLines = headerEndIndex >= 0 ? cssLines.slice(0, headerEndIndex + 1) : [];
	const contentLines = headerEndIndex >= 0 ? cssLines.slice(headerEndIndex + 1) : cssLines;

	return { headerLines, contentLines };
};

const shouldSkipEmptyLineAtStart = (trimmedLine: string, processedLines: string[]): boolean =>
	trimmedLine === '' && processedLines.length === 0;

const isMediaQueryStart = (trimmedLine: string): boolean => trimmedLine.startsWith('@media');

const isRootSelector = (trimmedLine: string): boolean => trimmedLine === `${CssSelectors.root}, ${CssSelectors.host} {`;

const isClosingBrace = (trimmedLine: string): boolean => trimmedLine === '}';

const addBlankLineBeforeFirstMediaQuery = (processedLines: string[], state: ScssMixinProcessingState): void => {
	if (!state.addedBlankLineBeforeMediaQuery) {
		processedLines.push('');
		state.addedBlankLineBeforeMediaQuery = true;
	}
};

const processMediaQueryStart = (trimmedLine: string, processedLines: string[], state: ScssMixinProcessingState): void => {
	addBlankLineBeforeFirstMediaQuery(processedLines, state);
	state.insideMediaQuery = true;
	state.braceStack.push(BraceType.media);
	processedLines.push(`\t${trimmedLine}`);
};

const processRootSelectorReplacement = (processedLines: string[], state: ScssMixinProcessingState): void => {
	if (state.insideMediaQuery) {
		state.braceStack.push(BraceType.selectorInMedia);
		processedLines.push(`\t\t${scssSelectorInterpolation} {`);
	} else {
		state.braceStack.push(BraceType.selector);
		processedLines.push(`\t${scssSelectorInterpolation} {`);
	}
};

const processClosingBrace = (processedLines: string[], state: ScssMixinProcessingState): void => {
	const lastBraceType = state.braceStack.pop();

	if (lastBraceType === BraceType.media) {
		processedLines.push(`\t}`);
		state.insideMediaQuery = false;
	} else if (lastBraceType === BraceType.selectorInMedia) {
		processedLines.push(`\t\t}`);
	} else {
		processedLines.push(`\t}`);
	}
};

const processCssProperty = (trimmedLine: string, processedLines: string[], state: ScssMixinProcessingState): void => {
	if (trimmedLine !== '') {
		const indentation = state.insideMediaQuery ? `\t\t\t${trimmedLine}` : `\t\t${trimmedLine}`;
		processedLines.push(indentation);
	} else {
		processedLines.push('');
	}
};

const processContentLine = (line: string, processedLines: string[], state: ScssMixinProcessingState): boolean => {
	const trimmedLine = line.trim();

	if (shouldSkipEmptyLineAtStart(trimmedLine, processedLines)) {
		return false;
	}

	if (isMediaQueryStart(trimmedLine)) {
		processMediaQueryStart(trimmedLine, processedLines, state);
		return true;
	}

	if (isRootSelector(trimmedLine)) {
		processRootSelectorReplacement(processedLines, state);
		return true;
	}

	if (isClosingBrace(trimmedLine)) {
		processClosingBrace(processedLines, state);
		return true;
	}

	processCssProperty(trimmedLine, processedLines, state);
	return false;
};

const processContentLines = (contentLines: string[]): string[] => {
	const processedLines: string[] = [];
	const state: ScssMixinProcessingState = {
		insideMediaQuery: false,
		addedBlankLineBeforeMediaQuery: false,
		braceStack: [],
	};

	for (const line of contentLines) {
		processContentLine(line, processedLines, state);
	}

	return processedLines;
};

const convertCssBlockCommentToScssLineComments = (headerLines: string[]): string => {
	const relevantLines = headerLines.slice(1, -1);
	const scssCommentLines = relevantLines.map(line => line.replace(/^\s*\*/, '//'));
	return scssCommentLines.join('\n');
};

const createScssContent = (headerLines: string[], processedLines: string[], mixinName: string): string => {
	const headerComment = convertCssBlockCommentToScssLineComments(headerLines);
	const mixinContent = processedLines.join('\n');

	return `${headerComment}\n\n@mixin ${mixinName}(${mixinParameterName}) {\n${mixinContent}\n}`;
};

const ensureTargetDirectoryExists = (scssFilePath: string): void => {
	const targetDirectoryPath = scssFilePath.substring(0, scssFilePath.lastIndexOf('/'));
	prepareFolder(targetDirectoryPath);
};

const procesSingleFile = async (fileData: ScssMixinFileProcessingData): Promise<void> => {
	const cssLines = await readLinesFromFile(fileData.filePath);
	const { headerLines, contentLines } = extractHeaderAndContentLines(cssLines);
	const processedLines = processContentLines(contentLines);
	const scssContent = createScssContent(headerLines, processedLines, fileData.mixinName);

	ensureTargetDirectoryExists(fileData.scssFilePath);
	writeFile(fileData.scssFilePath, scssContent);

	// const outputFileName = fileData.fileName.replace(cssFileEnding, scssFileEnding);
	// logger.info(`Generated SCSS mixin ${fileData.mixinName} in file ${outputFileName}`);
};

const filterCssFilesWithThreeDashes = async (targetFolder: string): Promise<string[]> => {
	const allOutputFiles = await loadFilesFromFolder(targetFolder);
	const cssFiles = allOutputFiles.filter(isCssFile);

	return cssFiles.filter((filePath: string) => {
		const fileName = extractFileName(filePath);
		return hasExactlyThreeDashes(fileName);
	});
};

export const inferScssMixin = async (brand: string, designSystemName: DesignSystemNames): Promise<void> => {
	const targetFolder = `token-package/dist/${brand}/${designSystemName}/web`;
	const filteredCssFiles = await filterCssFilesWithThreeDashes(targetFolder);
	logger.start('Generate responsive SCSS mixins');

	for (const cssFilePath of filteredCssFiles) {
		const fileData = createFileProcessingData(cssFilePath);
		await procesSingleFile(fileData);
	}

	logger.success('Finished generating responsive SCSS mixins');

	await scssThemeMixinsBarrelFile(targetFolder);
};
