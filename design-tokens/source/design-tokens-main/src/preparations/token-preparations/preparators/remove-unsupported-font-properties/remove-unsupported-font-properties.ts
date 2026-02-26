import { DesignToken } from 'style-dictionary/types';
import {
	isObject,
	isTokenObject,
	isTypograhpyCompositionalToken,
	unsupportedFontPropertyLetterSpacing,
	unsupportedFontPropertyTextCase,
	unsupportedFontPropertyTextDecoration,
} from '../../../../shared/index.js';

const recursivelyRemoveUnsupportedFontPropertiesInComposite = (parentObject: Record<string, object>): Record<string, object> => {
	Object.entries(parentObject).map((childEntry: [string, object]) => {
		const childPropertyName: string = childEntry[0];
		const childPropertyValue: Record<string, object> = childEntry[1] as Record<string, object>;

		if (isTokenObject(childPropertyValue) && isTypograhpyCompositionalToken(childPropertyValue)) {
			const childPropertyToken: DesignToken = childPropertyValue as DesignToken;
			delete (childPropertyToken.$value as Record<string, object>)[unsupportedFontPropertyLetterSpacing];
			delete (childPropertyToken.$value as Record<string, object>)[unsupportedFontPropertyTextCase];
			delete (childPropertyToken.$value as Record<string, object>)[unsupportedFontPropertyTextDecoration];
		} else if (isObject(childPropertyValue) && !isTokenObject(childPropertyValue)) {
			recursivelyRemoveUnsupportedFontPropertiesInComposite(parentObject[childPropertyName] as Record<string, object>);
		}
	});

	return parentObject;
};

export const removeUnsupportedFontPropertiesInComposite = (tokenSet: Record<string, object>): Record<string, object> =>
	recursivelyRemoveUnsupportedFontPropertiesInComposite(tokenSet);
