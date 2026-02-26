import { complementTokensInObject, logicalTokenSetError, TokenLayers } from '../../../../shared/index.js';
import { resolveTokenLayerBasePath } from '../token-layer-base-path-resolver/token-layer-base-path-resolver.js';
import { resolvePreprocessingTokenStructureTypeFromFilePath } from '../token-structure-type-resolver/token-structure-type-resolver.js';

const complementAllTokens = (
	filePathParts: string[],
	fileName: string,
	allTokens: Record<string, object>,
	subTokenSet: Record<string, object>,
) => {
	const { tokenLayerBasePathLevel, tokenLayer } = resolveTokenLayerBasePath(filePathParts);
	const preprocessingTokenStructureType = resolvePreprocessingTokenStructureTypeFromFilePath(
		filePathParts,
		fileName,
		tokenLayerBasePathLevel,
		tokenLayer,
	);

	if (filePathParts.length === tokenLayerBasePathLevel) {
		// core
		complementTokensInObject(allTokens, subTokenSet, tokenLayer);
	} else if (filePathParts.length === tokenLayerBasePathLevel + 1) {
		if (filePathParts.includes(TokenLayers.semantic)) {
			// semantic
			complementTokensInObject(allTokens, subTokenSet, preprocessingTokenStructureType);
		} else {
			// components & partials
			const componentsOrPartialsTokens: Record<string, object> = allTokens[preprocessingTokenStructureType] as Record<string, object>;
			complementTokensInObject(componentsOrPartialsTokens, subTokenSet, tokenLayer);
		}
	} else {
		logicalTokenSetError(`Unexpected token file detected: ${filePathParts.join('/')}/${fileName}`);
	}
};

export const complementAllAdjustedTokenData = (
	filePathParts: string[],
	fileName: string,
	allAdjustedTokenData: Record<string, object>,
	adjustedTokenFileData: Record<string, object>,
) => {
	complementAllTokens(filePathParts, fileName, allAdjustedTokenData, adjustedTokenFileData);
};

export const complementAllTokensPerModifier = (
	filePathParts: string[],
	fileName: string,
	allTokensPerModifier: Record<string, object>,
	tokenJsonFileData: Record<string, object>,
) => {
	complementAllTokens(filePathParts, fileName, allTokensPerModifier, tokenJsonFileData);
};
