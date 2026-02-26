import { ThemeObject, TokenSetStatus } from '@tokens-studio/types';
import { sortFigmaTokensFilePath } from '../../../token-file-path-sort/token-file-path-sorter.js';
import { filterOutBlacklistedTokenSets } from '../../../../shared/index.js';

export const rebuildSelectedTokenSetObject = (
	selectedTokenSetKeysOrdered: string[],
	selectedTokenSetsUnordered: Record<string, TokenSetStatus>,
): Record<string, TokenSetStatus> => {
	const orderKeepingMap = new Map();
	selectedTokenSetKeysOrdered.map((selectedTokenSetKey: string) => {
		orderKeepingMap.set(selectedTokenSetKey, selectedTokenSetsUnordered[selectedTokenSetKey]);
	});
	const selectedTokenSetsOrdered: Record<string, TokenSetStatus> = Object.fromEntries<TokenSetStatus>(orderKeepingMap);
	return selectedTokenSetsOrdered;
};

export const sortSelectedTokenSets = (themesJsonFileData: ThemeObject[]): ThemeObject[] => {
	const themesJsonFileDataSorted: ThemeObject[] = themesJsonFileData.map((theme: ThemeObject) => {
		const selectedTokenSetsUnordered: Record<string, TokenSetStatus> = theme.selectedTokenSets;
		const selectedTokenSetKeys: string[] = Object.keys(selectedTokenSetsUnordered);
		const relevantSelectedTokenSets: string[] = filterOutBlacklistedTokenSets(selectedTokenSetKeys);
		const selectedTokenSetKeysOrdered: string[] = sortFigmaTokensFilePath(relevantSelectedTokenSets);
		const selectedTokenSetsOrdered: Record<string, TokenSetStatus> = rebuildSelectedTokenSetObject(
			selectedTokenSetKeysOrdered,
			selectedTokenSetsUnordered,
		);
		theme.selectedTokenSets = selectedTokenSetsOrdered;
		return theme;
	});

	return themesJsonFileDataSorted;
};
