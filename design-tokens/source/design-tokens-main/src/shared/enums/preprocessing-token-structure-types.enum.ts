import { fileNameDelimiter } from '../constants/general-constants.js';
import { A1Breakpoints } from './a1-breakpoints.enum.js';
import { ThemeModes } from './theme-modes.enum.js';
import { TokenLayers } from './token-layers.enum.js';

export enum PreprocessingTokenStructureTypes {
	core = TokenLayers.core,
	default = 'default',
	spaciousM = `${ThemeModes.spacious}${fileNameDelimiter}${A1Breakpoints.m}`,
	spaciousL = `${ThemeModes.spacious}${fileNameDelimiter}${A1Breakpoints.l}`,
	compact = ThemeModes.compact,
	compactM = `${ThemeModes.compact}${fileNameDelimiter}${A1Breakpoints.m}`,
	compactL = `${ThemeModes.compact}${fileNameDelimiter}${A1Breakpoints.l}`,
	dense = ThemeModes.dense,
	denseM = `${ThemeModes.dense}${fileNameDelimiter}${A1Breakpoints.m}`,
	denseL = `${ThemeModes.dense}${fileNameDelimiter}${A1Breakpoints.l}`,
	dark = ThemeModes.dark,
	minimal = ThemeModes.minimal,
	composites = 'composites',
}
