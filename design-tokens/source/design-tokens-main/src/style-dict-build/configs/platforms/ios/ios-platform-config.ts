import { PlatformConfig } from 'style-dictionary';
import { swiftOutputFileConfig } from '../../output-files/index.js';
import { TsTransformGroups } from '../../../enums/ts-transform-groups.enum.js';
import { allianzFileHeaderName } from '../../../hooks/index.js';
import { Platforms } from '../../../../shared/index.js';

export const platformIosSwiftConfig = (outputFilePath: string, outputFileName: string): PlatformConfig => {
	const fullOutputFilePath = `${Platforms.ios}/${outputFileName}`;
	const platformConfig: PlatformConfig = {
		transformGroup: TsTransformGroups.tokensStudio,
		buildPath: outputFilePath,
		files: swiftOutputFileConfig(fullOutputFilePath),
		options: {
			fileHeader: allianzFileHeaderName,
		},
	};
	return platformConfig;
};
