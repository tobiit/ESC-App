import { File } from 'style-dictionary';
import { formats } from 'style-dictionary/enums';
import { excludedTokensFilterName } from '../../../hooks/index.js';

export const scssOutputFileConfig = (fullOutputFilePath: string): Array<File> => {
	const files: Array<File> = [
		{
			destination: `${fullOutputFilePath}.scss`,
			format: formats.scssVariables,
			filter: excludedTokensFilterName,
		},
		// {
		// 	destination: `${fullOutputFilePath}-map.scss`,
		// 	format: formats.scssMapDeep,
		// 	// format: formats.scssMapFlat,
		// 	filter: excludedTokensFilterName,
		// },
		// {
		// 	destination: `${fullOutputFilePath}-refs.scss`,
		// 	format: formats.scssVariables,
		// 	options: {
		// 		outputReferences: true,
		// 	},
		// },
	];
	return files;
};
