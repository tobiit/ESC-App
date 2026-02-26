import { File } from 'style-dictionary';
import { formats } from 'style-dictionary/enums';
import { excludedTokensFilterName } from '../../../hooks/index.js';

export const swiftOutputFileConfig = (fullOutputFilePath: string): Array<File> => {
	const files: Array<File> = [
		{
			destination: `${fullOutputFilePath}.swift`,
			format: formats.iosSwiftEnumSwift,
			filter: excludedTokensFilterName,
		},
		// {
		// 	destination: `${fullOutputFilePath}-refs.swift`,
		// 	format: formats.iosSwiftEnumSwift,
		// 	options: {
		// 		outputReferences: true,
		// 	},
		// },
	];
	return files;
};
