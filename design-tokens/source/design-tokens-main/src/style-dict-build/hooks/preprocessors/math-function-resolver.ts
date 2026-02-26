import { Config, DesignToken, PlatformConfig, PreprocessedTokens } from 'style-dictionary/types';
import { checkAndEvaluateMath } from '@tokens-studio/sd-transforms';
import {
	A1TokenTypes,
	getTokenReferencePath,
	isTokenObject,
	// logger,
	resolveObjectPropertyValue,
	TokenLayers,
	// tokenStudioTokenExtensionPropertyName,
} from '../../../shared/index.js';

/**
 * This preprocessor resolves math functions in token values.
 * It replaces the math functions with their evaluated values.
 * It also resolves references to other tokens within the math functions.
 * The math functions that are resolved are: min, floor, roundTo, ceil.
 *
 * This preprocessor most likely can be deleted, as soon as the PR (https://github.com/tokens-studio/sd-transforms/pull/356) is solved and merged.
 * This PR fixes the performance issue sd-transform add-font-styles implementation, which made this preprocessor workaround necessary.
 */

export const mathFunctionResolvePreprocessorName = 'a1/math-function-resolve';

const checkTokenValueForMathFunction = (value: string) => {
	// Math functions to resolve: min, floor, roundTo, ceil
	if (
		typeof value === 'string' &&
		(value.includes('min(') || value.includes('floor(') || value.includes('roundTo(') || value.includes('ceil('))
	) {
		return true;
	} else {
		return false;
	}
};

// TODO https://jmp.allianz.net/browse/A1-1077
// const storeOriginalFormulaInTsExtensions = (token: DesignToken, originalFormula: string): void => {
// 	if (!token['$extensions']) {
// 		token['$extensions'] = {};
// 	}
// 	const extensions = token['$extensions'] as Record<string, unknown>;
// 	if (!extensions[tokenStudioTokenExtensionPropertyName]) {
// 		extensions[tokenStudioTokenExtensionPropertyName] = {};
// 	}
// 	const studioTokensExtensions = extensions[tokenStudioTokenExtensionPropertyName] as Record<string, unknown>;
// 	studioTokensExtensions['originalValue'] = originalFormula;
// };

const resolveMathFunctions = (tokenFileData: PreprocessedTokens, options: Config | PlatformConfig): PreprocessedTokens => {
	// logger.debug('Within resolveMathFunctions');
	const pastChildPropertyNames: string[] = [];
	const resolveMathFunctionsRecursivly = (parentObject: PreprocessedTokens, opts: Config | PlatformConfig) => {
		Object.entries(parentObject).map(
			([childPropertyName, childPropertyValue]: [string, PreprocessedTokens | DesignToken]): PreprocessedTokens => {
				if (isTokenObject(childPropertyValue)) {
					if (checkTokenValueForMathFunction(childPropertyValue.$value as string)) {
						const tokenReferenceRegex = new RegExp('{([^}]+)}', 'g');
						// const mathCalculationValue = `${value.$value}`;
						// const recreatedTokenNameHint: string = pastChildPropertyNames.join('.') + '.' + childPropertyName;
						// const originalValueWithFormula = childPropertyValue.$value as string;

						const resolveReferencesRecursively = (val: string): string => {
							if (tokenReferenceRegex.test(val)) {
								return val.replace(tokenReferenceRegex, (reference: string): string => {
									const referenceValueBracketsless: string = getTokenReferencePath(reference);
									const resolvedReferenceToken: DesignToken = resolveObjectPropertyValue(tokenFileData, referenceValueBracketsless);
									return resolveReferencesRecursively(resolvedReferenceToken.$value as string);
								});
							}
							return val;
						};

						const resolvedValue = resolveReferencesRecursively(childPropertyValue.$value as string);
						const resolvedValueUnitCorrected = childPropertyValue.$type === A1TokenTypes.lineHeights ? `${resolvedValue}px` : resolvedValue;
						const updatedDesignToken: DesignToken = { ...childPropertyValue, $value: `${resolvedValueUnitCorrected}` } as DesignToken;
						childPropertyValue.$value = checkAndEvaluateMath(updatedDesignToken) as string;
						// storeOriginalFormulaInTsExtensions(childPropertyValue, originalValueWithFormula);

						// // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
						// value.$value = (value.$value as string).indexOf('px') === -1 ? (value.$value as string) + 'px' : value.$value;
						// logger.debug(`PREPROCESSING: Token ${recreatedTokenNameHint} with value: ${mathCalculationValue} = ${value.$value}`);
						// logger.debug(`PREPROCESSING: Token ${recreatedTokenNameHint} = ${value.$value}`);
						return parentObject;
					} else {
						return parentObject;
					}
				} else {
					pastChildPropertyNames.push(childPropertyName);
					return resolveMathFunctionsRecursivly(parentObject[childPropertyName], opts);
				}
			},
		);
		pastChildPropertyNames.pop();
		return parentObject;
	};

	// TODO check if we could not use that for the whole token set!? Also always check what this might mean for the output files that should keeo outputReferences!?
	if (tokenFileData[TokenLayers.semantic]) {
		const resolvedSemanticTokens = resolveMathFunctionsRecursivly(tokenFileData[TokenLayers.semantic], options);
		tokenFileData[TokenLayers.semantic] = resolvedSemanticTokens;
		return tokenFileData;
	} else {
		return tokenFileData;
	}
};

export const mathFunctionResolvePreprocessor: (
	dictionary: PreprocessedTokens,
	options: Config | PlatformConfig,
) => PreprocessedTokens | Promise<PreprocessedTokens> = (
	tokenFileData: PreprocessedTokens,
	options: Config | PlatformConfig,
): PreprocessedTokens => resolveMathFunctions(tokenFileData, options);
