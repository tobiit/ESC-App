import { ThemeObject, TokenSetStatus } from '@tokens-studio/types';
import { A1Breakpoints, fileNameDelimiter, ThemeGroups } from '../../../../shared/index.js';

const breakpointHierachy = `${A1Breakpoints.xs},${A1Breakpoints.s},${A1Breakpoints.m},${A1Breakpoints.l},${A1Breakpoints.xl},${A1Breakpoints.xxl},${A1Breakpoints.xxxl}`;

const resolveCombinedSelectedTokenSets = (
	densityThemeSelectedTokenSets: Record<string, TokenSetStatus>,
	componentThemeSelectedTokenSets: Record<string, TokenSetStatus>,
	densityThemeName: string,
): Record<string, TokenSetStatus> => {
	const uncleanedCombinedSelectedTokenSet: Record<string, TokenSetStatus> = {
		...densityThemeSelectedTokenSets,
		...componentThemeSelectedTokenSets,
	};
	const combinedSelectedTokenSet: Record<string, TokenSetStatus> = {};

	Object.entries(uncleanedCombinedSelectedTokenSet).forEach(([key, value]) => {
		const possibleTokenSetBreakpoint: string | null = key.indexOf(fileNameDelimiter) > 0 ? key.split(fileNameDelimiter)[1] : null;
		let possibleDensityThemeBreakpoint: string | null =
			densityThemeName.indexOf(' ') > 0 ? densityThemeName.split(' ')[1].toLowerCase() : null;
		possibleDensityThemeBreakpoint = possibleDensityThemeBreakpoint === 'xs-s' ? A1Breakpoints.xs : possibleDensityThemeBreakpoint;
		possibleDensityThemeBreakpoint = possibleDensityThemeBreakpoint === 'l-3xl' ? A1Breakpoints.l : possibleDensityThemeBreakpoint;

		if (
			possibleTokenSetBreakpoint != null &&
			possibleDensityThemeBreakpoint != null &&
			breakpointHierachy.indexOf(possibleTokenSetBreakpoint) > -1
		) {
			if (
				possibleTokenSetBreakpoint.length <= A1Breakpoints.xxxl.length &&
				breakpointHierachy.indexOf(possibleTokenSetBreakpoint) <= breakpointHierachy.indexOf(possibleDensityThemeBreakpoint)
			) {
				combinedSelectedTokenSet[key] = value;
			}
		} else {
			combinedSelectedTokenSet[key] = value;
		}
	});
	return combinedSelectedTokenSet;
};

export const combineDensitiesComponentThemes = (themeJsonData: ThemeObject[]): ThemeObject[] => {
	const combinedThemeJsonData: ThemeObject[] = themeJsonData;
	const componentGroupThemes: ThemeObject[] = themeJsonData.filter(
		(themeDefinition: ThemeObject) => themeDefinition.group === ThemeGroups.components,
	);
	const densitiesGroupThemes: ThemeObject[] = themeJsonData.filter(
		(themeDefinition: ThemeObject) => themeDefinition.group === ThemeGroups.densities,
	);

	componentGroupThemes.forEach((componentTheme: ThemeObject, i: number) => {
		densitiesGroupThemes.forEach((densityTheme: ThemeObject, j: number) => {
			if (densityTheme.name.includes(componentTheme.name)) {
				const combinedSelectedTokenSet: Record<string, TokenSetStatus> = resolveCombinedSelectedTokenSets(
					densityTheme.selectedTokenSets,
					componentTheme.selectedTokenSets,
					densityTheme.name,
				);
				const combinedThemeName = densityTheme.name.split(fileNameDelimiter)[0].replace(' ', '-');
				const combinedThemeId = `${combinedThemeName}${fileNameDelimiter}${i}${j}`;
				const combinedTheme: ThemeObject = {
					id: `${combinedThemeId}`,
					name: combinedThemeName,
					group: ThemeGroups.componentDensities,
					selectedTokenSets: combinedSelectedTokenSet,
				};
				combinedThemeJsonData.push(combinedTheme);
			}
		});
	});

	return combinedThemeJsonData;
};
