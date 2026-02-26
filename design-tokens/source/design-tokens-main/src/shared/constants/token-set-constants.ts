import { ThemeModes, TokenLayers } from '../enums/index.js';

export const tokenLayerOrder: TokenLayers[] = [TokenLayers.core, TokenLayers.semantic, TokenLayers.partials, TokenLayers.components];
export const defaultTheme: ThemeModes[] = [ThemeModes.light, ThemeModes.spacious, ThemeModes.lively];
export const unsupportedFontPropertyLetterSpacing = 'letterSpacing';
export const unsupportedFontPropertyTextCase = 'textCase';
export const unsupportedFontPropertyTextDecoration = 'textDecoration';
export const permutatedThemeKeys = [
	'Light-Spacious XS-Lively',
	'Light-Spacious XS-Minimal',
	'Light-Spacious M-Lively',
	'Light-Spacious M-Minimal',
	'Light-Spacious L-Lively',
	'Light-Spacious L-Minimal',
	'Light-Compact XS-Lively',
	'Light-Compact XS-Minimal',
	'Light-Compact M-Lively',
	'Light-Compact M-Minimal',
	'Light-Compact L-Lively',
	'Light-Compact L-Minimal',
	'Light-Dense XS-Lively',
	'Light-Dense XS-Minimal',
	'Light-Dense M-Lively',
	'Light-Dense M-Minimal',
	'Light-Dense L-Lively',
	'Light-Dense L-Minimal',
	'Dark-Spacious XS-Lively',
	'Dark-Spacious XS-Minimal',
	'Dark-Spacious M-Lively',
	'Dark-Spacious M-Minimal',
	'Dark-Spacious L-Lively',
	'Dark-Spacious L-Minimal',
	'Dark-Compact XS-Lively',
	'Dark-Compact XS-Minimal',
	'Dark-Compact M-Lively',
	'Dark-Compact M-Minimal',
	'Dark-Compact L-Lively',
	'Dark-Compact L-Minimal',
	'Dark-Dense XS-Lively',
	'Dark-Dense XS-Minimal',
	'Dark-Dense M-Lively',
	'Dark-Dense M-Minimal',
	'Dark-Dense L-Lively',
	'Dark-Dense L-Minimal',
] as const;
