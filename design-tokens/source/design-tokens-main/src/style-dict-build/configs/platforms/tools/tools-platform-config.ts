import { PlatformConfig } from 'style-dictionary';
import { transforms } from 'style-dictionary/enums';
import { jsonToolsOutputFileConfig } from '../../output-files/index.js';
import { TsTransformGroups } from '../../../enums/index.js';
import { Platforms } from '../../../../shared/index.js';
import { pumlOutputFileConfig } from '../../output-files/index.js';
import { escappFileHeaderName, pumlColorTransformName, pumlNameTransformName } from '../../../hooks/index.js';

export const platformToolsConfig = (outputFilePath: string, outputFileName: string): PlatformConfig => {
	const fullOutputFilePath = `${Platforms.tools}/${outputFileName}`;
	const platformConfig: PlatformConfig = {
		transformGroup: TsTransformGroups.tokensStudio,
		buildPath: outputFilePath,
		files: [jsonToolsOutputFileConfig(fullOutputFilePath)],
		options: {
			fileHeader: escappFileHeaderName,
		},
	};
	return platformConfig;
};

export const platformPumlConfig = (outputFilePath: string, outputFileName: string): PlatformConfig => {
	const fullOutputFilePath = `${Platforms.tools}/${outputFileName}`;
	const platformConfig: PlatformConfig = {
		transformGroup: TsTransformGroups.tokensStudio,
		transforms: [transforms.attributeCti, pumlNameTransformName, pumlColorTransformName, transforms.sizePx],
		buildPath: outputFilePath,
		files: pumlOutputFileConfig(fullOutputFilePath),
		options: {
			fileHeader: escappFileHeaderName,
		},
	};
	return platformConfig;
};
