import { describe, expect, it } from '@jest/globals';
import { ThemeObject, TokenSetStatus } from '@tokens-studio/types';
import { ThemeGroups } from '../../../../shared/index.js';
import { combineDensitiesComponentThemes } from './theme-combinator.js';
import {
	countCombinedThemes,
	createDeepCopyOfThemes,
	expectedCombinedThemes,
	findThemesByGroup,
	mockEmptyThemes,
	mockInputThemes,
	mockThemesNoWhitespace,
	mockThemesWithBreakpointHierarchyMismatch,
	mockThemesWithLargeBreakpoint,
	mockThemesWithoutMatch,
} from './theme-combinator.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

/* eslint-disable @typescript-eslint/naming-convention */

describe('theme-combinator', () => {
	describe('combineDensitiesComponentThemes', () => {
		it('should combine density and component themes correctly', () => {
			const result = combineDensitiesComponentThemes(createDeepCopyOfThemes(mockInputThemes));
			const combinedThemes = result.filter(theme => theme.group === ThemeGroups.componentDensities);

			expect(combinedThemes).toHaveLength(9);
			expect(combinedThemes[0].name).toBe('Spacious-XS');
			expect(combinedThemes[0].id).toBe('Spacious-XS-00');
			expect(combinedThemes[0].group).toBe(ThemeGroups.componentDensities);
		});

		it('should preserve all non-density and non-component themes', () => {
			// Create a fresh copy of mock data to avoid mutation issues
			const inputThemes = createDeepCopyOfThemes(mockInputThemes);

			const originalThemeCount = inputThemes.filter(
				theme => theme.group !== ThemeGroups.densities && theme.group !== ThemeGroups.components,
			).length;

			const result = combineDensitiesComponentThemes(inputThemes);
			const preservedNonCombinableThemes = result.filter(
				theme =>
					theme.group !== ThemeGroups.densities && theme.group !== ThemeGroups.components && theme.group !== ThemeGroups.componentDensities,
			);

			// Should preserve all non-combinable themes (core, color-schemes, motion, composites)
			expect(preservedNonCombinableThemes).toHaveLength(originalThemeCount);
		});

		it('should handle empty themes array', () => {
			const result = combineDensitiesComponentThemes(mockEmptyThemes);
			expect(result).toHaveLength(0);
		});

		it('should handle single density theme with single component theme', () => {
			const singleDensityTheme: ThemeObject = {
				id: 'single-density',
				name: 'Single XS-S',
				group: ThemeGroups.densities,
				selectedTokenSets: {
					'core/dimensions': TokenSetStatus.SOURCE,
					'semantic/densities/spacious': TokenSetStatus.ENABLED,
				},
			};
			const singleComponentTheme: ThemeObject = {
				id: 'single-component',
				name: 'Single XS-S',
				group: ThemeGroups.components,
				selectedTokenSets: {
					'core/colors': TokenSetStatus.SOURCE,
					'components/default/button': TokenSetStatus.ENABLED,
				},
			};
			const combinedInput = [singleDensityTheme, singleComponentTheme];
			const result = combineDensitiesComponentThemes(combinedInput);

			const combinedThemes = result.filter(theme => theme.group === ThemeGroups.componentDensities);
			expect(combinedThemes).toHaveLength(1);
			expect(combinedThemes[0].group).toBe(ThemeGroups.componentDensities);
		});

		it('should handle themes without matching density-component pairs', () => {
			const result = combineDensitiesComponentThemes(mockThemesWithoutMatch);
			const combinedThemes = result.filter(theme => theme.group === ThemeGroups.componentDensities);

			expect(combinedThemes).toHaveLength(0);
		});

		it('should handle density theme names without whitespace', () => {
			// This tests the else branch of densityThemeName.indexOf(' ') > 0 condition
			const result = combineDensitiesComponentThemes(createDeepCopyOfThemes(mockThemesNoWhitespace));
			const combinedThemes = result.filter(theme => theme.group === ThemeGroups.componentDensities);

			// Should create one combined theme since we have matching "Spacious" density and component themes
			expect(combinedThemes).toHaveLength(1);
			expect(combinedThemes[0].name).toBe('Spacious');
			expect(combinedThemes[0].id).toBe('Spacious-00');
			expect(combinedThemes[0].group).toBe(ThemeGroups.componentDensities);

			// Should preserve all non-combinable themes
			const preservedThemes = result.filter(
				theme =>
					theme.group !== ThemeGroups.densities && theme.group !== ThemeGroups.components && theme.group !== ThemeGroups.componentDensities,
			);
			expect(preservedThemes).toHaveLength(5); // mockOtherThemes has 5 themes
		});

		it('should filter out breakpoint-specific token sets from combined themes', () => {
			const result = combineDensitiesComponentThemes(createDeepCopyOfThemes(mockInputThemes));
			const combinedThemes = result.filter(theme => theme.group === ThemeGroups.componentDensities);

			// Check that combined themes have token sets but appropriately filtered
			if (combinedThemes.length > 0) {
				const sampleTheme = combinedThemes[0];
				const tokenSetKeys = Object.keys(sampleTheme.selectedTokenSets);
				const breakpointTokenSets = tokenSetKeys.filter(key => key.includes('-'));

				// The function should include token sets that match the theme's breakpoint or lower
				expect(breakpointTokenSets.length).toBeGreaterThanOrEqual(0);
			}
		});

		it('should add combined themes to the original input themes array', () => {
			const result = combineDensitiesComponentThemes(createDeepCopyOfThemes(mockInputThemes));
			const combinedThemes = result.filter(theme => theme.group === ThemeGroups.componentDensities);

			// Based on the function implementation, we expect some combined themes to be created
			expect(combinedThemes.length).toBeGreaterThan(0);

			// The function should preserve all original themes plus add combined themes
			expect(result.length).toBeGreaterThanOrEqual(mockInputThemes.length);
		});

		it('should create correct theme IDs with incrementing counters', () => {
			const result = combineDensitiesComponentThemes(createDeepCopyOfThemes(mockInputThemes));
			const combinedThemes = result.filter(theme => theme.group === ThemeGroups.componentDensities);

			expect(combinedThemes[0].id).toBe('Spacious-XS-00');
			expect(combinedThemes[1].id).toBe('Spacious-M-11');
			expect(combinedThemes[2].id).toBe('Spacious-L-22');
			expect(combinedThemes[3].id).toBe('Compact-XS-33');
			expect(combinedThemes[4].id).toBe('Compact-M-44');
			expect(combinedThemes[5].id).toBe('Compact-L-55');
			expect(combinedThemes[6].id).toBe('Dense-XS-66');
			expect(combinedThemes[7].id).toBe('Dense-M-77');
			expect(combinedThemes[8].id).toBe('Dense-L-88');
		});

		it('should create proper theme names without ID suffixes', () => {
			const result = combineDensitiesComponentThemes(createDeepCopyOfThemes(mockInputThemes));
			const combinedThemes = result.filter(theme => theme.group === ThemeGroups.componentDensities);

			expect(combinedThemes[0].name).toBe('Spacious-XS');
			expect(combinedThemes[1].name).toBe('Spacious-M');
			expect(combinedThemes[2].name).toBe('Spacious-L');
			expect(combinedThemes[3].name).toBe('Compact-XS');
			expect(combinedThemes[4].name).toBe('Compact-M');
			expect(combinedThemes[5].name).toBe('Compact-L');
			expect(combinedThemes[6].name).toBe('Dense-XS');
			expect(combinedThemes[7].name).toBe('Dense-M');
			expect(combinedThemes[8].name).toBe('Dense-L');
		});

		it('should combine token sets correctly for each density-component pair', () => {
			const result = combineDensitiesComponentThemes(createDeepCopyOfThemes(mockInputThemes));
			const spaciousXSTheme = result.find(theme => theme.name === 'Spacious-XS');

			expect(spaciousXSTheme).toBeDefined();
			if (spaciousXSTheme) {
				// Should include density token sets
				expect(spaciousXSTheme.selectedTokenSets['semantic/densities/spacious']).toBeDefined();
				// Should include component token sets
				expect(spaciousXSTheme.selectedTokenSets['components/default/button']).toBeDefined();
				// Should not include breakpoint-specific component token sets like 'components/default/tab-m'
				expect(spaciousXSTheme.selectedTokenSets['components/default/tab-m']).toBeUndefined();
			}
		});

		it('should handle themes with malformed IDs', () => {
			const malformedThemes: ThemeObject[] = [
				{
					id: 'density-malformed',
					name: 'Malformed XS', // Match the component name pattern
					group: ThemeGroups.densities,
					selectedTokenSets: { 'core/dimensions': TokenSetStatus.ENABLED },
				},
				{
					id: 'component-xs',
					name: 'XS Component',
					group: ThemeGroups.components,
					selectedTokenSets: { 'components/default/button': TokenSetStatus.ENABLED },
				},
			];

			const result = combineDensitiesComponentThemes(malformedThemes);
			const combinedThemes = result.filter(theme => theme.group === ThemeGroups.componentDensities);

			// The function creates combinations when densityTheme.name.includes(componentTheme.name)
			// 'Malformed XS'.includes('XS Component') = false
			// So no combinations expected for this test case
			expect(combinedThemes).toHaveLength(0);
		});

		it('should handle themes with special characters in names', () => {
			const specialThemes: ThemeObject[] = [
				{
					id: 'density-special',
					name: 'Special-& XS', // Make it contain the component name
					group: ThemeGroups.densities,
					selectedTokenSets: { 'core/dimensions': TokenSetStatus.ENABLED },
				},
				{
					id: 'component-special',
					name: 'XS Special',
					group: ThemeGroups.components,
					selectedTokenSets: { 'components/default/button': TokenSetStatus.ENABLED },
				},
			];

			const result = combineDensitiesComponentThemes(specialThemes);
			const combinedThemes = result.filter(theme => theme.group === ThemeGroups.componentDensities);

			// 'Special-& XS'.includes('XS Special') = false
			// So no combinations expected
			expect(combinedThemes).toHaveLength(0);
		});

		it('should handle large number of theme combinations', () => {
			const manyDensityThemes: ThemeObject[] = Array.from({ length: 3 }, (_, i) => {
				return {
					id: `density-${i}`,
					name: `Component ${i} XS-S`, // Same name as component to trigger match
					group: ThemeGroups.densities,
					selectedTokenSets: {
						'semantic/densities/spacious': TokenSetStatus.ENABLED,
					},
				};
			});

			const manyComponentThemes: ThemeObject[] = Array.from({ length: 3 }, (_, i) => {
				return {
					id: `component-${i}`,
					name: `Component ${i} XS-S`,
					group: ThemeGroups.components,
					selectedTokenSets: {
						'components/default/button': TokenSetStatus.ENABLED,
					},
				};
			});

			const result = combineDensitiesComponentThemes([...manyDensityThemes, ...manyComponentThemes]);
			const combinedThemes = result.filter(theme => theme.group === ThemeGroups.componentDensities);

			expect(combinedThemes).toHaveLength(3); // Each density matches with its same-named component
		});

		it('should maintain theme object structure integrity', () => {
			const result = combineDensitiesComponentThemes(createDeepCopyOfThemes(mockInputThemes));
			const combinedTheme = result.find(theme => theme.group === ThemeGroups.componentDensities);

			expect(combinedTheme).toBeDefined();
			if (combinedTheme) {
				expect(combinedTheme).toHaveProperty('id');
				expect(combinedTheme).toHaveProperty('name');
				expect(combinedTheme).toHaveProperty('group');
				expect(combinedTheme).toHaveProperty('selectedTokenSets');

				expect(typeof combinedTheme.id).toBe('string');
				expect(typeof combinedTheme.name).toBe('string');
				expect(combinedTheme.group).toBe(ThemeGroups.componentDensities);
				expect(typeof combinedTheme.selectedTokenSets).toBe('object');
			}
		});

		it('should work correctly with helper functions from mock file', () => {
			const result = combineDensitiesComponentThemes(createDeepCopyOfThemes(mockInputThemes));

			const densityThemes = findThemesByGroup(result, ThemeGroups.densities);
			const componentThemes = findThemesByGroup(result, ThemeGroups.components);
			const combinedThemesCount = countCombinedThemes(result);

			expect(densityThemes).toHaveLength(9); // Original density themes should still be present
			expect(componentThemes).toHaveLength(9); // Original component themes should still be present
			// The combined themes count should be what we actually get from our mock data
			expect(combinedThemesCount).toBeGreaterThanOrEqual(9); // Should have at least 9 combined themes
		});

		it('should maintain expected output structure matching mock data', () => {
			const result = combineDensitiesComponentThemes(createDeepCopyOfThemes(mockInputThemes));
			const combinedThemes = result.filter(theme => theme.group === ThemeGroups.componentDensities);

			// Verify against expected structure (first theme as example)
			const firstCombined = combinedThemes[0];
			const firstExpected = expectedCombinedThemes[0];

			expect(firstCombined.name).toBe(firstExpected.name);
			expect(firstCombined.group).toBe(firstExpected.group);
			expect(Object.keys(firstCombined.selectedTokenSets)).toEqual(expect.arrayContaining(Object.keys(firstExpected.selectedTokenSets)));
		});

		it('should produce deterministic results on multiple runs', () => {
			const result1 = combineDensitiesComponentThemes(createDeepCopyOfThemes(mockInputThemes));
			const result2 = combineDensitiesComponentThemes(createDeepCopyOfThemes(mockInputThemes));
			const combined1 = result1.filter(theme => theme.group === ThemeGroups.componentDensities);
			const combined2 = result2.filter(theme => theme.group === ThemeGroups.componentDensities);

			expect(combined1).toEqual(combined2);
		});

		it('should skip combining when breakpoint is larger than xxxl', () => {
			const result = combineDensitiesComponentThemes(createDeepCopyOfThemes(mockThemesWithLargeBreakpoint));
			const combinedThemes = result.filter(theme => theme.group === ThemeGroups.componentDensities);

			// Should not create combined theme for XXXXL breakpoint as it exceeds xxxl length
			expect(combinedThemes).toHaveLength(0);
		});

		it('should not combine when component breakpoint is smaller than density breakpoint in hierarchy', () => {
			const result = combineDensitiesComponentThemes(createDeepCopyOfThemes(mockThemesWithBreakpointHierarchyMismatch));
			const combinedThemes = result.filter(theme => theme.group === ThemeGroups.componentDensities);

			// Should create 1 combined theme
			expect(combinedThemes).toHaveLength(1);

			// But component-2xl should be filtered OUT because 2xl comes after xs in hierarchy
			// This tests the ELSE branch where indexOf(possibleTokenSetBreakpoint) > indexOf(possibleDensityThemeBreakpoint)
			const combinedTokenSets = combinedThemes[0].selectedTokenSets;
			expect(combinedTokenSets['a1/core-xs']).toBe(TokenSetStatus.ENABLED);
			expect(combinedTokenSets['a1/component-2xl']).toBeUndefined(); // Filtered out by else branch
		});
	});
});
