import { DesignToken } from 'style-dictionary/types';
import { A1SpecialTokenNameKeyWords, A1TokenTypes } from '../../../../../shared/index.js';

const iconNameParts = (itemName: string) => itemName.split('-');

const spacingType = (itemName: string) => {
	const splitIconName = iconNameParts(itemName);
	return splitIconName[splitIconName.length - 1];
};

const isStackToken = (itemName: string) => itemName.indexOf(A1SpecialTokenNameKeyWords.stack) >= 0;

const isStartPositionToken = (itemName: string) =>
	itemName.indexOf(A1SpecialTokenNameKeyWords.inset) === -1 && spacingType(itemName) === A1SpecialTokenNameKeyWords.start;

const isBottomPositionToken = (itemName: string) =>
	itemName.indexOf(A1SpecialTokenNameKeyWords.inset) === -1 && spacingType(itemName) === A1SpecialTokenNameKeyWords.bottom;

const isEndPositionToken = (itemName: string) =>
	itemName.indexOf(A1SpecialTokenNameKeyWords.inset) === -1 && spacingType(itemName) === A1SpecialTokenNameKeyWords.end;

const isTopPositionToken = (itemName: string) =>
	itemName.indexOf(A1SpecialTokenNameKeyWords.inset) === -1 && spacingType(itemName) === A1SpecialTokenNameKeyWords.top;

const isGridColumnGapToken = (itemName: string) => {
	const splitIconName = iconNameParts(itemName);
	const isGridMarginTokenOld = splitIconName[1] === A1SpecialTokenNameKeyWords.grid && splitIconName[2] === 'margin';
	const isGridGapTokenNew =
		splitIconName[1] === A1SpecialTokenNameKeyWords.grid &&
		splitIconName[2] + '-' + splitIconName[3] === A1SpecialTokenNameKeyWords.columnGap;
	return isGridMarginTokenOld || isGridGapTokenNew;
};

const isGapToken = (itemName: string) => itemName.indexOf(A1SpecialTokenNameKeyWords.gap) >= 0 && !isGridColumnGapToken(itemName);

const isInsetToken = (itemName: string) => itemName.indexOf(A1SpecialTokenNameKeyWords.inset) >= 0;

const isEasingToken = (itemName: string) => itemName.indexOf(A1SpecialTokenNameKeyWords.easing) >= 0;

const isScalingToken = (itemName: string) => itemName.indexOf(A1SpecialTokenNameKeyWords.scaling) >= 0;

const isCurveToken = (itemName: string) => itemName.indexOf(A1SpecialTokenNameKeyWords.curves) >= 0;

const isTimeToken = (itemName: string) =>
	itemName.indexOf(A1SpecialTokenNameKeyWords.duration) >= 0 || itemName.indexOf(A1SpecialTokenNameKeyWords.delay) >= 0;

const isBorderWidthToken = (itemName: string) => itemName.indexOf(A1SpecialTokenNameKeyWords.borderWidth) >= 0;

const isBorderRadiusToken = (itemName: string) => itemName.indexOf(A1SpecialTokenNameKeyWords.borderRadius) >= 0;

export const resolveA1CustomTokenType = (tokenObject: DesignToken): A1TokenTypes | undefined => {
	let resolvedTokenType: A1TokenTypes | undefined;

	if (tokenObject.name === undefined) {
		return undefined;
	}

	if ((tokenObject.$type === A1TokenTypes.spacing || tokenObject.$type === A1TokenTypes.dimension) && isInsetToken(tokenObject.name)) {
		resolvedTokenType = A1TokenTypes.inset;
	} else if (
		(tokenObject.$type === A1TokenTypes.borderRadius || tokenObject.$type === A1TokenTypes.dimension) &&
		isBorderRadiusToken(tokenObject.name)
	) {
		resolvedTokenType = A1TokenTypes.borderRadius;
	} else if (tokenObject.$type === A1TokenTypes.other && isEasingToken(tokenObject.name)) {
		resolvedTokenType = A1TokenTypes.easing;
	} else if (tokenObject.$type === A1TokenTypes.number && isScalingToken(tokenObject.name)) {
		resolvedTokenType = A1TokenTypes.scaling;
	} else if (tokenObject.$type === A1TokenTypes.number && isCurveToken(tokenObject.name)) {
		resolvedTokenType = A1TokenTypes.easing;
	} else if (tokenObject.$type === A1TokenTypes.other && isTimeToken(tokenObject.name)) {
		resolvedTokenType = A1TokenTypes.time;
	} else if (tokenObject.$type === A1TokenTypes.dimension && isBorderWidthToken(tokenObject.name)) {
		resolvedTokenType = A1TokenTypes.borderWidth;
	} else if (
		tokenObject.$type === A1TokenTypes.dimension &&
		(isGridColumnGapToken(tokenObject.name) ||
			isGapToken(tokenObject.name) ||
			isStackToken(tokenObject.name) ||
			isStartPositionToken(tokenObject.name) ||
			isBottomPositionToken(tokenObject.name) ||
			isEndPositionToken(tokenObject.name) ||
			isTopPositionToken(tokenObject.name))
	) {
		resolvedTokenType = A1TokenTypes.spacing;
	}

	return resolvedTokenType;
};
