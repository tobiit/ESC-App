import { DesignToken, ValueTransform } from 'style-dictionary/types';
import { transformTypes } from 'style-dictionary/enums';
import { A1SpecialTokenNameKeyWords, A1TokenTypes, logicalTokenSetError } from '../../../../shared/index.js';

const cubicBezierWrapTransformMatcher = (token: DesignToken): boolean =>
	token.$type === A1TokenTypes.other && (token.name?.indexOf(A1SpecialTokenNameKeyWords.easing) ?? -1) > -1;

const cubicBezierWrapTransformer = (token: DesignToken): string => {
	if (typeof token.$value !== 'string') {
		logicalTokenSetError(
			`Invalid token value type: "${typeof token.$value}". Expected string, received ${typeof token.$value}: ${token.$value}`,
		);
	}

	const value: string = token.$value as string;
	const cubicBezierCssFunctionName = 'cubic-bezier';
	if (value.indexOf(cubicBezierCssFunctionName) === -1 && value.split(',').length === 4) {
		const transformedValue = `${cubicBezierCssFunctionName}(${value})`;
		return transformedValue;
	} else {
		return value;
	}
};

export const cubicBezierWrapTransformName = 'a1/cubic-bezier-wrap';

// also converts invalid rgba(#FFFFFF, 0.8) caused by token reference like rgba({core.color.white}, 0.8) to valid hex8 #FFFFFF4D
export const cubicBezierWrapTransform: ValueTransform = {
	name: cubicBezierWrapTransformName,
	type: transformTypes.value,
	transitive: true,
	filter: (token: DesignToken) => cubicBezierWrapTransformMatcher(token),
	transform: (token: DesignToken) => cubicBezierWrapTransformer(token),
};
