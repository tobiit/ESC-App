// import StyleDictionary from 'style-dictionary';
import { Config, FileHeader } from 'style-dictionary/types';
import { createDateFileHeaderPlaceholder, versionFileHeaderPlaceholder } from '../../../shared/index.js';

export const escappFileHeaderName = 'escappFileHeader';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fileHeaderGenerator: FileHeader = (defaultMessage?: string[], options?: Config): string[] | Promise<string[]> => [
	`THIS FILE WAS GENERATED AUTOMATICALLY AND SHOULD NOT BE EDITED MANUALLY!`,
	``,
	`Version ${versionFileHeaderPlaceholder}`,
	`Generated on ${createDateFileHeaderPlaceholder}`,
	`Copyright (c) escapp Group`,
	'',
	'DISCLAIMER: While this major version represents a significant milestone in stability and',
	'reliability, the escapp A1 Design Tokens will continue to evolve. We are committed to',
	'regularly expanding our A1 Design Token library to support additional components and use',
	'cases. Our versioning strategy follows semantic versioning principles, with major releases',
	'scheduled biannually to ensure predictability and minimize disruption to your projects.',
];

// const escappFileHeader: {
// 	name: string;
// 	fileHeader: FileHeader;
// } = {
// 	name: escappFileHeaderName,
// 	fileHeader: fileHeaderGenerator,
// };

// export const registerFileHeaderComment = (sd: StyleDictionary): void => {
// 	sd.registerFileHeader(escappFileHeader);
// };
