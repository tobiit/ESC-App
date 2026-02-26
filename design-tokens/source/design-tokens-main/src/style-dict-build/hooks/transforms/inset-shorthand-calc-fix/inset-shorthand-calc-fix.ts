import { checkAndEvaluateMath } from '@tokens-studio/sd-transforms';
import { DesignToken, ValueTransform } from 'style-dictionary/types';
import { transformTypes } from 'style-dictionary/enums';
import { A1TokenTypes, logicalTokenSetError } from '../../../../shared/index.js';

const insetShorthandCalcFixTransformMatcher = (token: DesignToken): boolean =>
	token.name != null && (token.$type as A1TokenTypes) === A1TokenTypes.dimension && token.name?.indexOf('inset-all') > -1;

const insetShorthandCalcFixTransformer = (token: DesignToken): string => {
	const value: string = token.$value as string;

	if (typeof token.$value !== 'string') {
		logicalTokenSetError(
			`Invalid token value type: "${typeof token.$value}". Expected string, received ${typeof token.$value}: ${token.$value}`,
		);
	}

	if (value.indexOf('(') > -1 || value.indexOf('/') > -1) {
		const regex = new RegExp('(?!\\))\\s(?=\\()');
		const shorthandSplit = value.split(regex);
		let transformedValue: string = value;

		shorthandSplit.map((shorthandValue: string) => {
			const calcResult: string = checkAndEvaluateMath({ $value: `${shorthandValue}`, $type: 'spacing' } as DesignToken) as string;
			transformedValue = transformedValue.replace(shorthandValue, calcResult);
		});

		return transformedValue;
	} else {
		return value;
	}
};

export const insetShorthandCalcFixTransformName = 'a1/inset-shorthand-calc-fix';

export const insetShorthandCalcFixTransform: ValueTransform = {
	name: insetShorthandCalcFixTransformName,
	type: transformTypes.value,
	transitive: true,
	filter: (token: DesignToken) => insetShorthandCalcFixTransformMatcher(token),
	transform: (token: DesignToken) => insetShorthandCalcFixTransformer(token),
};
