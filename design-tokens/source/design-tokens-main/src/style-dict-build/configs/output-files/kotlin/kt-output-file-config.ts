import { File } from 'style-dictionary';
import { formats } from 'style-dictionary/enums';
import { excludedTokensFilterName } from '../../../hooks/index.js';

// Used by the Allianz Android developers
export const ktOutputFileConfig = (fullOutputFilePath: string): Array<File> => {
	const files: Array<File> = [
		{
			destination: `${fullOutputFilePath}.kt`,
			format: formats.composeObject,
			filter: excludedTokensFilterName,
		},
		// {
		// 	destination: `${fullOutputFilePath}-refs.kt`,
		// 	format: formats.composeObject,
		// 	options: {
		// 		outputReferences: true,
		// 	},
		// },
	];
	return files;
};
