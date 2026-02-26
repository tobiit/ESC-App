import { A1CustomTokenTypes } from './a1-custom-token-types.enum.js';
import { DtcgCompositeTokenTypes } from './dtcg-composite-token-types.enum.js';
import { DtcgTokenTypes } from './dtcg-token-types.enum';
import { TokenStudioCompositionalTokenTypes } from './token-studio-compositional-token-types.enum';
import { TokenStudioDefaultTokenTypes } from './token-studio-default-types.enum';

// If token type is existing in the DTCG standard spec, will use that one.
// If token type is existing in the Token Studio standard spec, will use that one.
// If token type is not existing in any of the official specifications, will use custom defined A1 token types.

export enum A1TokenTypes {
	border = DtcgCompositeTokenTypes.border,
	borderRadius = TokenStudioDefaultTokenTypes.borderRadius,
	borderWidth = TokenStudioDefaultTokenTypes.borderWidth,
	boxShadow = TokenStudioCompositionalTokenTypes.boxShadow,
	color = DtcgTokenTypes.color,
	composition = TokenStudioCompositionalTokenTypes.composition,
	cubicBezier = DtcgTokenTypes.cubicBezier,
	dimension = DtcgTokenTypes.dimension,
	duration = DtcgTokenTypes.duration,
	easing = A1CustomTokenTypes.easing,
	fontFamilies = TokenStudioDefaultTokenTypes.fontFamilies,
	fontFamily = DtcgTokenTypes.fontFamily,
	fontSize = TokenStudioDefaultTokenTypes.fontSize,
	fontSizes = TokenStudioDefaultTokenTypes.fontSizes,
	fontWeight = DtcgTokenTypes.fontWeight,
	fontWeights = TokenStudioDefaultTokenTypes.fontWeights,
	gradient = DtcgCompositeTokenTypes.gradient,
	inset = A1CustomTokenTypes.inset,
	letterSpacing = TokenStudioDefaultTokenTypes.letterSpacing,
	lineHeights = TokenStudioDefaultTokenTypes.lineHeights,
	// eslint-disable-next-line id-blacklist
	number = DtcgTokenTypes.number,
	other = TokenStudioDefaultTokenTypes.other,
	scaling = A1CustomTokenTypes.scaling,
	shadow = DtcgCompositeTokenTypes.shadow,
	sizing = TokenStudioDefaultTokenTypes.sizing,
	spacing = TokenStudioDefaultTokenTypes.spacing,
	textCase = TokenStudioDefaultTokenTypes.textCase,
	textDecoration = TokenStudioDefaultTokenTypes.textDecoration,
	time = A1CustomTokenTypes.time,
	transition = DtcgCompositeTokenTypes.transition,
	typography = DtcgCompositeTokenTypes.typography,
}
