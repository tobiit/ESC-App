import { DesignToken } from 'style-dictionary/types';
import {
	A1TokenTypes,
	getTokenReferencePath,
	isObject,
	isSingleReferenceTokenValue,
	isTokenObject,
	isTypograhpyCompositionalToken,
	isTypograhpyReference,
	logicalTokenSetError,
	readJsonFile,
	resolveObjectPropertyValue,
	TokenLayers,
	unsupportedFontPropertyLetterSpacing,
	unsupportedFontPropertyTextCase,
	unsupportedFontPropertyTextDecoration,
} from '../../../../shared/index.js';

const extractUnsupportedFontProperty = (
	source: Record<string, object>,
	target: Record<string, object>,
	targetPropertyName: string,
	unsupportedProperty: string,
	unsupportedPropertyTokenType: A1TokenTypes,
) => {
	if (source.hasOwnProperty(unsupportedProperty)) {
		(target[targetPropertyName] as Record<string, object>)[unsupportedProperty] = {
			$type: unsupportedPropertyTokenType,
			$value: source[unsupportedProperty],
		};
	}
};

const assignUnsupportedFontProperties = (
	targetPropertyName: string,
	source: Record<string, object>,
	target: Record<string, object>,
): void => {
	const shorthandToken: DesignToken = { ...target[targetPropertyName] } as DesignToken;
	(target[targetPropertyName] as Record<string, object>) = {};
	(target[targetPropertyName] as Record<string, object>)['shorthand'] = shorthandToken;
	extractUnsupportedFontProperty(source, target, targetPropertyName, unsupportedFontPropertyLetterSpacing, A1TokenTypes.letterSpacing);
	extractUnsupportedFontProperty(source, target, targetPropertyName, unsupportedFontPropertyTextCase, A1TokenTypes.textCase);
	extractUnsupportedFontProperty(source, target, targetPropertyName, unsupportedFontPropertyTextDecoration, A1TokenTypes.textDecoration);
};

const handleReferenceToken = (
	childPropertyName: string,
	childPropertyTokenValue: string,
	filePathParts: string[],
	fileName: string,
	parentObject: Record<string, object>,
): void => {
	const resolvingTokenSet: Record<string, object> = readJsonFile('tokens/semantic/combined/composites.json') as Record<string, object>;
	const resolvedTokenReferencePath: string = getTokenReferencePath(childPropertyTokenValue);
	const resolvedTokenReferenceToken: DesignToken = resolveObjectPropertyValue(resolvingTokenSet, resolvedTokenReferencePath);

	if (!resolvedTokenReferenceToken) {
		logicalTokenSetError(
			`Compositional typography token resolution failed for reference: ${resolvedTokenReferencePath} in file ${filePathParts.join('/')}/${fileName}`,
		);
	}

	const resolvedTokenReferenceValue: Record<string, object> = resolvedTokenReferenceToken.$value as Record<string, object>;
	const tokenLayer: TokenLayers = filePathParts[1] as TokenLayers;

	if (tokenLayer === TokenLayers.partials || tokenLayer === TokenLayers.components) {
		assignUnsupportedFontProperties(childPropertyName, resolvedTokenReferenceValue, parentObject);
	}
};

const handleCompositionalToken = (
	childPropertyName: string,
	childPropertyTokenValue: object,
	parentObject: Record<string, object>,
): void => {
	assignUnsupportedFontProperties(childPropertyName, childPropertyTokenValue as Record<string, object>, parentObject);
};

const resolveCompositionalTypoTokenReference = (
	childEntry: [string, object],
	filePathParts: string[],
	fileName: string,
	parentObject: Record<string, object>,
) => {
	const childPropertyName: string = childEntry[0];
	const childPropertyValue: Record<string, object> = childEntry[1] as Record<string, object>;
	const childPropertyToken: DesignToken = childPropertyValue as DesignToken;
	const childPropertyTokenValue: string | object = childPropertyToken.$value as string | object;

	if (isSingleReferenceTokenValue(childPropertyTokenValue) && isTypograhpyReference(childPropertyToken)) {
		handleReferenceToken(childPropertyName, childPropertyTokenValue as string, filePathParts, fileName, parentObject);
	} else if (isTypograhpyCompositionalToken(childPropertyToken)) {
		handleCompositionalToken(childPropertyName, childPropertyTokenValue as object, parentObject);
	}
};

export const extractUnsupportedComponentFontProperties = (
	tokenFileData: Record<string, object>,
	filePathParts: string[],
	fileName: string,
): Record<string, object> => {
	const recursivelyExtractUnsupportedComponentFontProperties = (parentObject: Record<string, object>): Record<string, object> => {
		Object.entries(parentObject).map((childEntry: [string, object]) => {
			const childPropertyName: string = childEntry[0];
			const childPropertyValue: Record<string, object> = childEntry[1] as Record<string, object>;

			if (isTokenObject(childPropertyValue)) {
				resolveCompositionalTypoTokenReference(childEntry, filePathParts, fileName, parentObject);
			} else if (isObject(childPropertyValue) && !isTokenObject(childPropertyValue)) {
				recursivelyExtractUnsupportedComponentFontProperties(parentObject[childPropertyName] as Record<string, object>);
			}
		});

		return parentObject;
	};

	return recursivelyExtractUnsupportedComponentFontProperties(tokenFileData);
};
