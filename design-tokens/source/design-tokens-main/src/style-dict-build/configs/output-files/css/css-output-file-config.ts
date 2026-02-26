import { File } from 'style-dictionary';
import { formats } from 'style-dictionary/enums';
import { excludedTokensFilterName } from '../../../hooks/index.js';
import { CssSelectors } from '../../../../shared/index.js';

export const cssOutputFileConfig = (fullOutputFilePath: string): Array<File> => {
	const files: Array<File> = [
		{
			destination: `${fullOutputFilePath}.css`,
			format: formats.cssVariables,
			filter: excludedTokensFilterName,
			options: {
				selector: [`${CssSelectors.root}, ${CssSelectors.host}`],
			},
		},
		// {
		// 	destination: `${fullOutputFilePath}-ref.css`,
		// 	format: formats.cssVariables,
		// 	options: {
		// 		outputReferences: true,
		// 	},
		// },
	];
	return files;
};
