import { PlatformConfig } from 'style-dictionary';
import { transforms } from 'style-dictionary/enums';
import { cssOutputFileConfig, jsonWebOutputFileConfig, jsOutputFileConfig, scssOutputFileConfig } from '../../output-files/index.js';
import { TsTransformGroups } from '../../../enums/index.js';
import {
	escappFileHeaderName,
	cubicBezierWrapTransformName,
	insetShorthandCalcFixTransformName,
	lowerCaseLinearGradientTransformName,
	metaInfoEnrichTransformName,
	transformTo8DigitHexValuesTransformName,
} from '../../../hooks/index.js';
import { Platforms } from '../../../../shared/index.js';

// Take notice of https://github.com/amzn/style-dictionary/issues/1298 in order to understand, why JS output file configs are not part of the other web-style output file configs

export const platformWebJsConfig = (outputFilePath: string, outputFileName: string): PlatformConfig => {
	const fullOutputFilePath = `${Platforms.web}/${outputFileName}`;
	const platformConfig: PlatformConfig = {
		transformGroup: TsTransformGroups.tokensStudio,
		transforms: [
			transforms.nameCamel, // nameCamel needed only for javascript
			transformTo8DigitHexValuesTransformName,
			cubicBezierWrapTransformName,
			lowerCaseLinearGradientTransformName,
			insetShorthandCalcFixTransformName,
		],
		buildPath: outputFilePath,
		files: jsOutputFileConfig(fullOutputFilePath),
		options: {
			fileHeader: escappFileHeaderName,
		},
	};
	return platformConfig;
};

export const platformWebStyleConfig = (outputFilePath: string, outputFileName: string): PlatformConfig => {
	const fullOutputFilePath = `${Platforms.web}/${outputFileName}`;
	const platformConfig: PlatformConfig = {
		transformGroup: TsTransformGroups.tokensStudio,
		transforms: [
			transforms.nameKebab,
			transformTo8DigitHexValuesTransformName,
			cubicBezierWrapTransformName,
			lowerCaseLinearGradientTransformName,
			insetShorthandCalcFixTransformName,
			metaInfoEnrichTransformName,
		],
		buildPath: outputFilePath,
		files: [
			...cssOutputFileConfig(fullOutputFilePath),
			...scssOutputFileConfig(fullOutputFilePath),
			...jsonWebOutputFileConfig(fullOutputFilePath),
		],
		options: {
			fileHeader: escappFileHeaderName,
		},
	};
	return platformConfig;
};
