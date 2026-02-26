import { DesignToken, DesignTokens } from 'style-dictionary/types';
import {
	A1Breakpoints,
	A1SpecialTokenNameKeyWords,
	A1TokenTypes,
	isObject,
	isTokenObject,
	logger,
	logicalTokenSetError,
	matchAllReferenceMathShorthands,
	TokenLayers,
} from '../../../../shared/index.js';
import { SsotInsetTokenGroup } from '../../types/index.js';
import { SsotInsetTokenProperties } from '../../enums/index.js';

const createInsetSubToken = ($value: string, $type: string): DesignToken => {
	return { $value, $type };
};

const createInsetSubTokens = (
	spacingValues: string[],
	$type: string,
	topIndex: number,
	endIndex: number,
	bottomIndex: number,
	startIndex: number,
): DesignTokens => {
	const top = createInsetSubToken(spacingValues[topIndex], $type);
	const end = createInsetSubToken(spacingValues[endIndex], $type);
	const bottom = createInsetSubToken(spacingValues[bottomIndex], $type);
	const start = createInsetSubToken(spacingValues[startIndex], $type);
	return { top, end, bottom, start };
};

const extractSubTokens = (insetValues: string[], $type: string) => {
	const numberOfShorthandValues = insetValues.length;

	if (numberOfShorthandValues === 1) {
		return createInsetSubTokens(insetValues, $type, 0, 0, 0, 0);
	} else if (numberOfShorthandValues === 2) {
		return createInsetSubTokens(insetValues, $type, 0, 1, 0, 1);
	} else if (numberOfShorthandValues === 4) {
		return createInsetSubTokens(insetValues, $type, 0, 1, 2, 3);
	} else if (numberOfShorthandValues === 3) {
		return createInsetSubTokens(insetValues, $type, 0, 1, 2, 1);
	} else {
		return {};
	}
};

const recursivelyExtractInsetValueTokens = (parentObject: Record<string, object>): Record<string, object> => {
	// converts all inset token $values
	// const from = { $value: '14px 16px', $type: 'spacing' };
	// const to = {
	// 	all: { $value: '14px 16px', $type: 'spacing' },
	// 	top: { $value: '14px', $type: 'spacing' },
	// 	end: { $value: '16px', $type: 'spacing' },
	// 	bottom: { $value: '14px', $type: 'spacing' },
	// 	start: { $value: '16px', $type: 'spacing' },
	// };

	Object.entries(parentObject).map((childEntry: [string, object]) => {
		const childPropertyName: string = childEntry[0];
		const childPropertyValue: object = childEntry[1];

		// Cases to consider here
		// childPropertyName === 'inset-vertical' --> becomes inset-top and inset-bottom in inset-all
		// childPropertyName === 'inset-horizontal' --> becomes inset-start and inset-end in inset-all
		// childPropertyName === 'inset-top' --> stays the same, but has to be added to inset all
		// childPropertyName === 'inset-end' --> stays the same, but has to be added to inset all
		// childPropertyName === 'inset-bottom' --> stays the same, but has to be added to inset all
		// childPropertyName === 'inset-start' --> stays the same, but has to be added to inset all

		// inset-all token than can consist out of the following shorthand combinations:
		// all: inset-vertical inset-horizontal
		// all: inset-top inset-horizontal inset-bottom
		// all: inset-vertical inset-end inset-vertical inset-start
		// all: inset-top inset-end inset-bottom inset-start

		if ((childPropertyName as A1SpecialTokenNameKeyWords) === A1SpecialTokenNameKeyWords.inset) {
			// Skip grid-related inset tokens (e.g., core.inset.horizontal.grid or core.inset.vertical.grid)
			// Check if childPropertyValue contains horizontal.grid or vertical.grid structure
			if (
				typeof childPropertyValue === 'object' &&
				childPropertyValue !== null &&
				((SsotInsetTokenProperties.horizontal in childPropertyValue &&
					typeof childPropertyValue.horizontal === 'object' &&
					childPropertyValue.horizontal !== null &&
					'grid' in childPropertyValue.horizontal) ||
					(SsotInsetTokenProperties.vertical in childPropertyValue &&
						typeof childPropertyValue.vertical === 'object' &&
						childPropertyValue.vertical !== null &&
						'grid' in childPropertyValue.vertical))
			) {
				logger.warn(`Skipping grid-related inset token: ${childPropertyName} (contains grid breakpoints, not component insets)`);
				return;
			}

			if (isTokenObject(childPropertyValue)) {
				// TODO childPropertyValue['all'] should already exisit and can be used.
				const childPropertyToken: DesignToken = childPropertyValue as DesignToken;
				const insetValues: RegExpMatchArray | null = matchAllReferenceMathShorthands(childPropertyToken.$value as string);
				let subTokens: DesignTokens = {};

				if (insetValues && insetValues.length > 0 && childPropertyToken.$type) {
					subTokens = extractSubTokens(insetValues, childPropertyToken.$type);
				} else {
					logicalTokenSetError('Design Token needs to have a $type and $value property set!', [
						childPropertyName,
						'Design Token: ' + JSON.stringify(childPropertyToken),
					]);
				}

				// // does not change original token name if commented in
				// if (isEmptyObject(subTokens)) {
				// 	return;
				// }

				const extractedInsetTokens: DesignTokens = {
					all: childPropertyToken,
					...subTokens,
				};

				parentObject[childPropertyName] = extractedInsetTokens;
			} else if (childPropertyValue.hasOwnProperty(SsotInsetTokenProperties.all)) {
				// console.log('inset.all'); // nothing to do
			} else {
				const ssotInsetTokenGroup: SsotInsetTokenGroup = childPropertyValue as SsotInsetTokenGroup;
				const all: DesignToken = { $type: A1TokenTypes.spacing, $value: undefined };
				const defaultZeroInsetValue = '0';
				const verticalValue: string = ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.vertical)
					? (ssotInsetTokenGroup[SsotInsetTokenProperties.vertical]?.$value as string)
					: defaultZeroInsetValue;
				const horizontalValue: string = ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.horizontal)
					? (ssotInsetTokenGroup[SsotInsetTokenProperties.horizontal]?.$value as string)
					: defaultZeroInsetValue;
				const topValue: string = ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.top)
					? (ssotInsetTokenGroup[SsotInsetTokenProperties.top]?.$value as string)
					: defaultZeroInsetValue;
				const endValue: string = ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.end)
					? (ssotInsetTokenGroup[SsotInsetTokenProperties.end]?.$value as string)
					: defaultZeroInsetValue;
				const bottomValue: string = ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.bottom)
					? (ssotInsetTokenGroup[SsotInsetTokenProperties.bottom]?.$value as string)
					: defaultZeroInsetValue;
				const startValue: string = ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.start)
					? (ssotInsetTokenGroup[SsotInsetTokenProperties.start]?.$value as string)
					: defaultZeroInsetValue;

				if (
					ssotInsetTokenGroup &&
					ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.vertical) &&
					ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.horizontal)
				) {
					all.$value = `${verticalValue} ${horizontalValue}`;
				} else if (
					ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.vertical) &&
					ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.end) &&
					ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.start)
				) {
					all.$value = `${verticalValue} ${endValue} ${verticalValue} ${startValue}`;
				} else if (
					ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.horizontal) &&
					ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.top) &&
					ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.bottom)
				) {
					all.$value = `${topValue} ${horizontalValue} ${bottomValue}`;
				} else if (
					ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.top) &&
					ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.end) &&
					ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.bottom) &&
					ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.start)
				) {
					all.$value = `${topValue} ${endValue} ${bottomValue} ${startValue}`;
				} else {
					if (
						(ssotInsetTokenGroup && ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.vertical)) ||
						ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.horizontal)
					) {
						all.$value = `${verticalValue} ${horizontalValue}`;

						if (!ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.vertical)) {
							const vertical: DesignToken = createInsetSubToken(verticalValue, A1TokenTypes.spacing);
							ssotInsetTokenGroup[SsotInsetTokenProperties.vertical] = vertical;
						}

						if (!ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.horizontal)) {
							const horizontal: DesignToken = createInsetSubToken(horizontalValue, A1TokenTypes.spacing);
							ssotInsetTokenGroup[SsotInsetTokenProperties.horizontal] = horizontal;
						}
					} else if (
						(ssotInsetTokenGroup && ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.top)) ||
						ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.bottom)
					) {
						if (!ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.top)) {
							const top: DesignToken = createInsetSubToken(topValue, A1TokenTypes.spacing);
							const horizontal: DesignToken = createInsetSubToken(horizontalValue, A1TokenTypes.spacing);
							all.$value = `${topValue} ${horizontalValue} ${bottomValue}`;
							ssotInsetTokenGroup[SsotInsetTokenProperties.top] = top;
							ssotInsetTokenGroup[SsotInsetTokenProperties.horizontal] = horizontal;
						}
						if (!ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.bottom)) {
							const bottom: DesignToken = createInsetSubToken(bottomValue, A1TokenTypes.spacing);
							const horizontal: DesignToken = createInsetSubToken(horizontalValue, A1TokenTypes.spacing);
							all.$value = `${topValue} ${horizontalValue} ${bottomValue}`;
							ssotInsetTokenGroup[SsotInsetTokenProperties.bottom] = bottom;
							ssotInsetTokenGroup[SsotInsetTokenProperties.horizontal] = horizontal;
						}
					} else if (
						(ssotInsetTokenGroup && ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.end)) ||
						ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.start)
					) {
						if (!ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.end)) {
							const end: DesignToken = createInsetSubToken(endValue, A1TokenTypes.spacing);
							const vertical: DesignToken = createInsetSubToken(verticalValue, A1TokenTypes.spacing);
							all.$value = `${verticalValue} ${endValue} ${verticalValue} ${startValue}`;
							ssotInsetTokenGroup[SsotInsetTokenProperties.end] = end;
							ssotInsetTokenGroup[SsotInsetTokenProperties.vertical] = vertical;
						}
						if (!ssotInsetTokenGroup.hasOwnProperty(SsotInsetTokenProperties.start)) {
							const start: DesignToken = createInsetSubToken(startValue, A1TokenTypes.spacing);
							const vertical: DesignToken = createInsetSubToken(verticalValue, A1TokenTypes.spacing);
							all.$value = `${verticalValue} ${endValue} ${verticalValue} ${startValue}`;
							ssotInsetTokenGroup[SsotInsetTokenProperties.start] = start;
							ssotInsetTokenGroup[SsotInsetTokenProperties.vertical] = vertical;
						}
					} else {
						if (
							(ssotInsetTokenGroup && ssotInsetTokenGroup.hasOwnProperty(A1Breakpoints.xs)) ||
							ssotInsetTokenGroup.hasOwnProperty(A1Breakpoints.s) ||
							ssotInsetTokenGroup.hasOwnProperty(A1Breakpoints.m) ||
							ssotInsetTokenGroup.hasOwnProperty(A1Breakpoints.l) ||
							ssotInsetTokenGroup.hasOwnProperty(A1Breakpoints.xl) ||
							ssotInsetTokenGroup.hasOwnProperty(A1Breakpoints.xxl) ||
							ssotInsetTokenGroup.hasOwnProperty('factor')
						) {
							logger.warn('No inset token adjustments for core.inset.horizontal.grid design tokens were done!');
						} else {
							logicalTokenSetError(
								'Wrong combination of inset design tokens in the SSOT! Allowed are only all, vertical + horizontal, vertical + end + start, horizontal + top + bottom, top + end + bottom + start, or single one of these properties for which the missing get filled up accordingly',
								[childPropertyName, 'Design Token: ' + JSON.stringify(ssotInsetTokenGroup)],
							);
						}
					}
				}

				if (all.$value !== undefined) {
					ssotInsetTokenGroup[SsotInsetTokenProperties.all] = all;
				}
			}
		} else if (isObject(childPropertyValue) && !isTokenObject(childPropertyValue)) {
			// prevent shorthand inset value extraction for core.grid.inset.horizontal... tokens
			/* istanbul ignore else: The else branch is mathematically unreachable.
			   For else to execute: childPropertyName === 'core' AND childPropertyName.includes('internal') must both be true.
			   Since TokenLayers.core = 'core' (4 chars) and 'core' doesn't contain substring 'internal', this is impossible. */
			if ((childPropertyName as TokenLayers) !== TokenLayers.core || !childPropertyName.includes(A1SpecialTokenNameKeyWords.internal)) {
				recursivelyExtractInsetValueTokens(parentObject[childPropertyName] as Record<string, object>);
			}
		}
	});

	return parentObject;
};

export const extractInsetValueShorthands = (tokenSet: Record<string, object>): Record<string, object> =>
	recursivelyExtractInsetValueTokens(tokenSet);
