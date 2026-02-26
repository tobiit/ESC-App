import { File } from 'style-dictionary';
import { formats } from 'style-dictionary/enums';
import { excludedTokensFilterName } from '../../../hooks/index.js';

export const jsOutputFileConfig = (fullOutputFilePath: string): Array<File> => {
	const files: Array<File> = [
		{
			destination: `${fullOutputFilePath}.js`,
			format: formats.javascriptEs6,
			filter: excludedTokensFilterName,
		},
		// {
		// 	destination: `${fullOutputFilePath}-obj.js`,
		// 	format: formats.javascriptObject,
		// },
		// {
		// 	destination: `${fullOutputFilePath}-umd.js`,
		// 	format: formats.javascriptUmd,
		// },
		// References in output files not supported for Javascript files: https://amzn.github.io/style-dictionary/#/formats?id=references-in-output-files
	];
	return files;
};
