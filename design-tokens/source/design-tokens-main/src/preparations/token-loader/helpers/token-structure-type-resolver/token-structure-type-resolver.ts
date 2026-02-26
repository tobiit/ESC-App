import {
	defaultTheme,
	logicalTokenSetError,
	PreprocessingTokenStructureTypes,
	ThemeModes,
	TokenLayers,
	tokenSsotFileFormat,
} from '../../../../shared/index.js';

const logLogicalTokenSetError = (filePathParts: string[], pathNestingLevels: string, fileName: string, tokenLayer: string): void => {
	const errorMessage =
		'Change of the folder structure under tokens/ detected! Adjust the correct modifier resolution to the new folder structure.';
	logicalTokenSetError(errorMessage, [
		`filePathParts: ${JSON.stringify(filePathParts)}`,
		`pathNestingLevels: ${pathNestingLevels}`,
		`fileName: ${fileName}`,
		`Detected tokenLayer: ${tokenLayer}`,
	]);
};

const resolveSemanticPreprocessingTokenStructureType = (fileName: string): PreprocessingTokenStructureTypes => {
	let preprocessingTokenStructureType: PreprocessingTokenStructureTypes;
	const modifier: PreprocessingTokenStructureTypes = fileName.replace(tokenSsotFileFormat, '') as PreprocessingTokenStructureTypes;

	if (defaultTheme.includes(modifier as unknown as ThemeModes)) {
		preprocessingTokenStructureType = PreprocessingTokenStructureTypes.default;
	} else {
		preprocessingTokenStructureType = modifier;
	}

	return preprocessingTokenStructureType;
};

export const resolvePreprocessingTokenStructureTypeFromFilePath = (
	filePathParts: string[],
	fileName: string,
	tokenLayerBasePathLevel: number,
	tokenLayer: TokenLayers,
): PreprocessingTokenStructureTypes => {
	if (filePathParts.length === tokenLayerBasePathLevel) {
		if (tokenLayer === TokenLayers.core) {
			return PreprocessingTokenStructureTypes.core;
		} else if (tokenLayer === TokenLayers.partials || tokenLayer === TokenLayers.components) {
			return PreprocessingTokenStructureTypes.default;
		} else {
			logLogicalTokenSetError(filePathParts, `${tokenLayerBasePathLevel}`, fileName, tokenLayer);
		}
	} else if (filePathParts.length === tokenLayerBasePathLevel + 1) {
		if (tokenLayer === TokenLayers.semantic) {
			const preprocessingTokenStructureType: ThemeModes | PreprocessingTokenStructureTypes =
				resolveSemanticPreprocessingTokenStructureType(fileName);
			return preprocessingTokenStructureType;
		} else if (tokenLayer === TokenLayers.partials || tokenLayer === TokenLayers.components) {
			const preprocessingTokenStructureType: ThemeModes | PreprocessingTokenStructureTypes = filePathParts[
				filePathParts.length - 1
			] as PreprocessingTokenStructureTypes;
			return preprocessingTokenStructureType;
		} else {
			logLogicalTokenSetError(filePathParts, `${tokenLayerBasePathLevel + 1}`, fileName, tokenLayer);
		}
	} else {
		logLogicalTokenSetError(filePathParts, 'unknown', fileName, tokenLayer);
	}

	throw new Error('Error in resolvePreprocessingTokenStructureTypeFromFilePath!'); // Only needed to prevent type errors, because error is actually thrown before in helper function for all cases
};
