// TODO Probably could be replaced by node_modules/@tokens-studio/types/dist/constants/Properties.d.ts
// TODO or by this one: node_modules/@tokens-studio/types/dist/constants/TokenTypes.d.ts

import { DtcgTokenTypes } from './dtcg-token-types.enum';

export enum TokenStudioDefaultTokenTypes {
	borderRadius = 'borderRadius',
	borderWidth = 'borderWidth',
	color = DtcgTokenTypes.color,
	dimension = DtcgTokenTypes.dimension,
	fontFamily = DtcgTokenTypes.fontFamily,
	fontFamilies = 'fontFamilies',
	fontSize = 'fontSize',
	fontSizes = 'fontSizes',
	fontWeight = DtcgTokenTypes.fontWeight,
	fontWeights = 'fontWeights',
	letterSpacing = 'letterSpacing',
	lineHeight = 'lineHeight',
	lineHeights = 'lineHeights',
	other = 'other',
	sizing = 'sizing',
	spacing = 'spacing',
	textCase = 'textCase',
	textDecoration = 'textDecoration',
}
