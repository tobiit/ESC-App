import { File } from 'style-dictionary';
import { excludedTokensFilterName, pumlFormatName } from '../../../hooks/index.js';

export const pumlOutputFileConfig = (fullOutputFilePath: string): Array<File> => {
	const files: Array<File> = [
		{
			destination: `${fullOutputFilePath}.puml`,
			format: pumlFormatName,
			filter: excludedTokensFilterName,
		},
	];
	return files;
};
