import { DesignToken } from 'style-dictionary/types';
import {
	A1SpecialTokenNameKeyWords,
	BlacklistedTokenSetKeyWords,
	DtcgCompositeTokenTypes,
	TokenLayers,
	TokenStudioCompositionalTokenTypes,
} from '../../enums/index.js';
import { metaDataFileNameSymbol } from '../../constants/index.js';
import { isObject } from '../object-utils/object-utils.js';

const compositionalTypographyTokenNameIdentifier = `${TokenLayers.semantic}.${A1SpecialTokenNameKeyWords.text}.`;

export const allTokenReferencesInStringRegex = new RegExp('\\{(\\w|-|\\.)+\\}', 'g');

export const singleTokenReferencesInStringRegex = new RegExp('^' + allTokenReferencesInStringRegex.source + '$');

export const getTokenReferencePath = (tokenReferenceValue: string) => tokenReferenceValue.replace('{', '').replace('}', '');

// TODO Move this check into an integration test
// const hasInconsistentPrefixes = (obj: object): boolean => {
// 	const keys = Object.keys(obj);
// 	const hasDollarPrefix = keys.some(key => key.startsWith('$'));
// 	const hasNonDollarPrefix = keys.some(key => !key.startsWith('$'));
// 	return hasDollarPrefix && hasNonDollarPrefix;
// };

const isLegacyTokenObject = (obj: object): boolean => obj.hasOwnProperty('value') && obj.hasOwnProperty('type');

const isDtcgTokenObject = (obj: object): boolean => obj.hasOwnProperty('$value') && obj.hasOwnProperty('$type');

export const isTokenObject = (obj: object): boolean => isLegacyTokenObject(obj) || isDtcgTokenObject(obj);

const isCompositionalTokenReferenceForType = (
	token: DesignToken,
	tokenReferencePart: string,
	compositionalTokenType: DtcgCompositeTokenTypes | TokenStudioCompositionalTokenTypes,
): boolean => {
	const tokenUsesReference: boolean = (token.$value as string).includes(tokenReferencePart);
	const isSearchedCompositionalTokenType: boolean = token.$type === compositionalTokenType;
	return tokenUsesReference && isSearchedCompositionalTokenType;
};

export const isTokenSsotMetaDataFile = (fileName: string | undefined) => (fileName ? fileName.includes(metaDataFileNameSymbol) : false);

export const isTypograhpyCompositionalToken = (token: DesignToken): boolean =>
	token.$type !== undefined &&
	token.$type === (DtcgCompositeTokenTypes.typography as string) &&
	token.$value !== undefined &&
	isObject(token.$value) &&
	token.$value.hasOwnProperty('fontFamily') &&
	token.$value.hasOwnProperty('fontSize') &&
	token.$value.hasOwnProperty('fontWeight') &&
	token.$value.hasOwnProperty('lineHeight');

export const isTypograhpyReference = (token: DesignToken): boolean =>
	isCompositionalTokenReferenceForType(token, compositionalTypographyTokenNameIdentifier, DtcgCompositeTokenTypes.typography);

export const matchAllReferenceMathShorthands = (tokenValue: string): RegExpMatchArray | null => {
	const pattern = '\\{[^}]+\\}(?:\\s*[\\+\\-\\*\\/]\\s*\\{[^}]+\\})*';
	const matchAllReferenceMathShorthandsRegex = new RegExp(pattern, 'g');
	const matchResult: RegExpMatchArray | null = tokenValue.match(matchAllReferenceMathShorthandsRegex);
	return matchResult;
};

export const isSingleReferenceTokenValue = (referenceTokenValue: string | object): boolean => {
	if (isObject(referenceTokenValue)) {
		return false;
	} else {
		return singleTokenReferencesInStringRegex.test(referenceTokenValue);
	}
};

export const filterOutBlacklistedTokenSets = (allFigmaTokenFullFilePathsUnsorted: string[]): string[] => {
	const blacklistedTokenSetKeyWords: string[] = [BlacklistedTokenSetKeyWords.figmaSpecifics, BlacklistedTokenSetKeyWords.experimentals];
	return allFigmaTokenFullFilePathsUnsorted.filter(filePath => !blacklistedTokenSetKeyWords.some(keyword => filePath.includes(keyword)));
};
