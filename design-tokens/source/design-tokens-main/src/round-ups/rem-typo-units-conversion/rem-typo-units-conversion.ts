import { extname } from 'path';
import { DesignToken } from 'style-dictionary/types';
import {
	A1SpecialTokenNameKeyWords,
	artifactBuildPathNpm,
	checkFolderExistence,
	DesignSystemNames,
	FileExtensions,
	isObject,
	isTokenObject,
	loadFilesFromFolder,
	logger,
	logicalTokenSetError,
	readJsonFile,
	readLinesFromFile,
	TokenLayers,
	tokenSsotFileFormat,
	tokensSsotFolder,
	TypographyUserAgentSsot,
	writeFile,
	writeJsonFile,
} from '../../shared/index.js';

const typographyKeywords = [
	A1SpecialTokenNameKeyWords.fontSize,
	A1SpecialTokenNameKeyWords.lineHeight,
	A1SpecialTokenNameKeyWords.letterSpacing,
	A1SpecialTokenNameKeyWords.text,
] as const;

const getDefaultUserAgentFontSize = (designSystemName: DesignSystemNames): DesignToken => {
	const typographyCoreSsotPath = `${tokensSsotFolder}/${designSystemName}/${TokenLayers.core}/typography${tokenSsotFileFormat}`; // TODO Might need brand parameter once full multi-branding is available in the complete build pipeline
	const typographyUserAgentSsot: TypographyUserAgentSsot = readJsonFile(typographyCoreSsotPath) as TypographyUserAgentSsot;
	const defaultUserAgentFontSize: DesignToken = typographyUserAgentSsot?.core?.internal?.['font-size']?.['user-agent'];
	return defaultUserAgentFontSize;
};

const convertPxToRem = (pxValue: string, defaultUserAgentFontSize: number): string => {
	const numericValue = parseFloat(pxValue);
	const remValue = numericValue / defaultUserAgentFontSize;
	const relativeValueFixed: number = remValue % 1 === 0 ? remValue : parseFloat(remValue.toFixed(5));
	return `${relativeValueFixed}rem`;
};

const containsTypographyKeyword = (tokenName: string): boolean => {
	const lowerLine = tokenName.toLowerCase();

	return typographyKeywords.some(keyword => {
		const kebabKeyword = keyword;
		const camelKeywordPattern = new RegExp('-([a-z])', 'g');
		const camelKeyword = keyword.replace(camelKeywordPattern, (_, letter) => letter.toLowerCase());
		const kebabPattern = new RegExp(`${kebabKeyword}`, 'i');
		const camelCasePattern = new RegExp(`${camelKeyword}`, 'i');
		return kebabPattern.test(lowerLine) || camelCasePattern.test(lowerLine);
	});
};

const replacePxWithRem = (tokenValue: string, defaultUserAgentFontSize: number): string => {
	const pixelValuePattern = new RegExp('(\\d+(?:\\.\\d+)?)px', 'g');
	const remValue: string = tokenValue.replace(pixelValuePattern, (_match, numericPart) =>
		convertPxToRem(numericPart, defaultUserAgentFontSize),
	);
	return remValue;
};

const processTextBasedDistFile = async (filePath: string, defaultUserAgentFontSize: number): Promise<void> => {
	const lines: string[] = await readLinesFromFile(filePath);
	const processedLines = lines.map(line => {
		const tokenNamePattern = new RegExp('^[^:=]+');
		const tokenNameMatch = line.match(tokenNamePattern);
		const tokenName = tokenNameMatch ? tokenNameMatch[0].trim() : '';
		if (containsTypographyKeyword(tokenName)) {
			return replacePxWithRem(line, defaultUserAgentFontSize);
		}
		return line;
	});
	const processedContent = processedLines.join('\n');
	writeFile(filePath, processedContent);
};

const processJsonBasedDistFile = (filePath: string, defaultUserAgentFontSize: number): void => {
	const jsonData: Record<string, object> = readJsonFile(filePath) as Record<string, object>;

	const recursivelyConvertToRemFontValues = (parentObject: Record<string, object>): Record<string, object> => {
		Object.entries(parentObject).map((childEntry: [string, object]) => {
			const childPropertyName: string = childEntry[0];
			const childPropertyValue: Record<string, object> = childEntry[1] as Record<string, object>;

			if (isTokenObject(childPropertyValue)) {
				const childPropertyToken: DesignToken = childPropertyValue as DesignToken;
				if (childPropertyToken.name && containsTypographyKeyword(childPropertyToken.name)) {
					const convertedValue = replacePxWithRem(childPropertyToken.$value, defaultUserAgentFontSize);
					childPropertyToken.$value = convertedValue;
				}
			} else if (isObject(childPropertyValue) && !isTokenObject(childPropertyValue)) {
				recursivelyConvertToRemFontValues(parentObject[childPropertyName] as Record<string, object>);
			}
		});

		return parentObject;
	};

	recursivelyConvertToRemFontValues(jsonData);
	writeJsonFile(filePath, jsonData);
};

// Necessary to react to browser user agent default font-size changes and meet these a11y requirements
export const runRemTypoUnitConversions = async (brand: string, designSystemName: DesignSystemNames): Promise<void> => {
	const brandDesignSystemSsotPath = artifactBuildPathNpm + '/' + brand + '/' + designSystemName;

	if (!checkFolderExistence(brandDesignSystemSsotPath)) {
		logicalTokenSetError(`REM unit conversion could not be done, because the path ${brandDesignSystemSsotPath} does not exist.`);
		return;
	}

	const defaultUserAgentFontSize: DesignToken = getDefaultUserAgentFontSize(designSystemName);
	const distFiles = await loadFilesFromFolder(brandDesignSystemSsotPath);
	logger.start(`Custom REM unit conversions for font-size, line-height and letter-spacing`);

	for (const filePath of distFiles) {
		const fileExtension = extname(filePath);
		if (fileExtension === FileExtensions.css || fileExtension === FileExtensions.scss || fileExtension === FileExtensions.js) {
			processTextBasedDistFile(filePath, defaultUserAgentFontSize.$value);
			// logger.info(`Changed px units to rem for font-size, line-height and letter-spacing in file ${filePath}`);
		} else if (fileExtension === FileExtensions.json) {
			processJsonBasedDistFile(filePath, defaultUserAgentFontSize.$value);
		}
	}
	logger.success(`Finished custom REM unit conversions for font-size, line-height and letter-spacing`);
};
