import { DesignToken, ValueTransform } from 'style-dictionary/types';
import { transformTypes } from 'style-dictionary/enums';
import { A1SpecialTokenNameKeyWords, A1TokenTypes, logicalTokenSetError } from '../../../../shared/index.js';

const lowerCaseLinearGradientTransformMatcher = (token: DesignToken): boolean =>
	token.$type === A1TokenTypes.color && (token.name?.indexOf(A1SpecialTokenNameKeyWords.fade) ?? -1) > -1; // Evtl. einfach token value auf "linear-gradient" prüfen

const lowerCaseLinearGradientTransformer = (token: DesignToken): string => {
	const value: string = token.$value as string;
	const linearGradientCssFunctionName = 'linear-gradient';

	if (typeof token.$value !== 'string') {
		logicalTokenSetError(
			`Invalid token value type: "${typeof token.$value}". Expected string, received ${typeof token.$value}: ${token.$value}`,
		);
	}

	if (value.indexOf(linearGradientCssFunctionName.toUpperCase()) > -1) {
		const transformedValue = value.replaceAll(linearGradientCssFunctionName.toUpperCase(), linearGradientCssFunctionName);
		return transformedValue;
	} else {
		return value;
	}
};

export const lowerCaseLinearGradientTransformName = 'a1/lower-case-linear-gradient';

// also converts invalid rgba(#FFFFFF, 0.8) caused by token reference like rgba({core.color.white}, 0.8) to valid hex8 #FFFFFF4D
export const lowerCaseLinearGradientTransform: ValueTransform = {
	name: lowerCaseLinearGradientTransformName,
	type: transformTypes.value,
	transitive: true,
	filter: (token: DesignToken) => lowerCaseLinearGradientTransformMatcher(token),
	transform: (token: DesignToken) => lowerCaseLinearGradientTransformer(token),
};
