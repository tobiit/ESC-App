import { File } from 'style-dictionary';
import { formats } from 'style-dictionary/enums';
import { excludedTokensFilterName } from '../../../hooks/index.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const jsonToolsOutputFileConfig = (fullOutputFilePath: string): Array<File> => {
	// TODO
	const files: Array<File> = [];
	return files;
};

export const jsonWebOutputFileConfig = (fullOutputFilePath: string): Array<File> => {
	const files: Array<File> = [
		{
			destination: `${fullOutputFilePath}.json`,
			format: formats.json,
			filter: excludedTokensFilterName,
		},
	];
	return files;
};
