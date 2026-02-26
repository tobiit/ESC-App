import { PlatformConfig } from 'style-dictionary';
import { ktOutputFileConfig } from '../../output-files/index.js';
import { TsTransformGroups } from '../../../enums/index.js';
import { escappFileHeaderName } from '../../../hooks/index.js';
import { Platforms } from '../../../../shared/index.js';

export const platformAndroidConfig = (outputFilePath: string, outputFileName: string): PlatformConfig => {
	const fullOutputFilePath = `${Platforms.android}/${outputFileName}`;
	const platformConfig: PlatformConfig = {
		transformGroup: TsTransformGroups.tokensStudio,
		buildPath: outputFilePath,
		files: ktOutputFileConfig(fullOutputFilePath),
		options: {
			fileHeader: escappFileHeaderName,
		},
	};
	return platformConfig;
};
