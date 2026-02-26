import { fileHeaderGenerator } from '../file-header/file-header.js';
import type { Format, FormatFnArguments, TransformedToken } from 'style-dictionary/types';

export const pumlFormatName = 'a1/format/puml';

const generatePumlConstants = (tokens: TransformedToken[]): string[] => {
	const tokenConstants: string[] = [];

	tokens.forEach(token => {
		const tokenValue: string | number = token.$value ?? token.value;
		if (tokenValue) {
			const constantName = `${token.name?.toUpperCase()}`;
			tokenConstants.push(`!$${constantName} = "${tokenValue}"`);
		}
	});

	return tokenConstants;
};

export const pumlFormat: Format = {
	name: pumlFormatName,
	format: ({ dictionary, file }: FormatFnArguments): string => {
		const constants: string[] = generatePumlConstants(dictionary.allTokens) as string[];

		// Generate file header using the allianz header generator
		// and format it as PlantUML comments (lines starting with ')
		const headerLines: string[] = fileHeaderGenerator() as string[];
		const pumlHeader: string = headerLines.map((line: string) => `' ${line}`).join('\n');

		// Add file path comment
		const filePathComment = `'\n' ${file.destination}\n'`;

		const pumlFileContent: string = [filePathComment, pumlHeader, '', ...constants].join('\n');
		return pumlFileContent;
	},
};
