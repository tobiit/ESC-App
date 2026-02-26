import { PermutatedThemeKeys } from './permutated-theme-keys.type';
import { SelectedTokenSets } from './selected-token-sets.type';

export type PermutatedThemes = Record<PermutatedThemeKeys, SelectedTokenSets>; // more specific than just Record<string, string[]>
