import {
	A1Breakpoints,
	logicalTokenSetError,
	metaDataFileNameSymbol,
	PreprocessingTokenStructureTypes,
	ThemeDimensions,
	ThemeModes,
	tokenLayerOrder,
	TokenLayers,
} from '../../shared/index.js';

const filePathIsTokenLayer = (filePath: string, tokenLayer: string): boolean => filePath.includes(tokenLayer);

const getPartialOrderScore = (filePath: string, denseOrderOffset: number): number => {
	let orderScore;

	if (filePath.includes(ThemeModes.dense)) {
		orderScore = tokenLayerOrder.indexOf(TokenLayers.partials) + denseOrderOffset;
	} else {
		orderScore = tokenLayerOrder.indexOf(TokenLayers.partials);
	}

	return orderScore;
};

const getComponentOrderScore = (filePath: string, denseOrderOffset: number): number => {
	let orderScore: number;

	if (filePath.includes(ThemeModes.dense)) {
		orderScore = tokenLayerOrder.indexOf(TokenLayers.components) + denseOrderOffset;
	} else {
		orderScore = tokenLayerOrder.indexOf(TokenLayers.components);
	}

	return orderScore;
};

const getColorSchemeScore = (filePath: string, orderScore: number): number => {
	if (filePath.includes(ThemeModes.dark)) {
		orderScore += 0.05;
	}
	return orderScore;
};

const getDensityScore = (filePath: string, orderScore: number): number => {
	if (filePath.includes(ThemeModes.spacious)) {
		orderScore += 0.1;
	}
	if (filePath.includes(ThemeModes.compact)) {
		orderScore += 0.2;
	}
	if (filePath.includes(ThemeModes.dense)) {
		orderScore += 0.3;
	}
	return orderScore;
};

const getBreakpointScore = (filePath: string, orderScore: number): number => {
	if (filePath.includes(`-${A1Breakpoints.m}`)) {
		orderScore += 0.01;
	}
	if (filePath.includes(`-${A1Breakpoints.l}`)) {
		orderScore += 0.02;
	}
	return orderScore;
};

const getAnimationScore = (filePath: string, orderScore: number): number => {
	if (filePath.includes(ThemeDimensions.animations)) {
		orderScore += 0.4;
	}
	return orderScore;
};

const getCompositeScore = (filePath: string, orderScore: number): number => {
	if (filePath.includes(PreprocessingTokenStructureTypes.composites)) {
		orderScore += 0.6;
	}
	return orderScore;
};

const getFigmaTokenFileOrderScore = (filePath: string): number => {
	const randomInitialOrderValue = -2;
	let orderScore = randomInitialOrderValue;
	const denseOrderOffset = tokenLayerOrder.length - tokenLayerOrder.indexOf(TokenLayers.partials);
	const metaFileOrderScore = tokenLayerOrder.length + denseOrderOffset;

	if (filePathIsTokenLayer(filePath, TokenLayers.core)) {
		orderScore = tokenLayerOrder.indexOf(TokenLayers.core);
	} else if (filePathIsTokenLayer(filePath, TokenLayers.semantic)) {
		orderScore = tokenLayerOrder.indexOf(TokenLayers.semantic);
		orderScore = getColorSchemeScore(filePath, orderScore);
		orderScore = getDensityScore(filePath, orderScore);
		orderScore = getBreakpointScore(filePath, orderScore);
		orderScore = getAnimationScore(filePath, orderScore);
		orderScore = getCompositeScore(filePath, orderScore);
	} else if (filePathIsTokenLayer(filePath, TokenLayers.partials)) {
		orderScore = getPartialOrderScore(filePath, denseOrderOffset);
		orderScore = getDensityScore(filePath, orderScore);
		orderScore = getBreakpointScore(filePath, orderScore);
	} else if (filePathIsTokenLayer(filePath, TokenLayers.components)) {
		orderScore = getComponentOrderScore(filePath, denseOrderOffset);
		orderScore = getDensityScore(filePath, orderScore);
		orderScore = getBreakpointScore(filePath, orderScore);
	} else if (filePathIsTokenLayer(filePath, metaDataFileNameSymbol)) {
		orderScore = metaFileOrderScore;
	}

	if (orderScore === -2) {
		logicalTokenSetError('Detected unexpected token file in the token set: ' + filePath);
	}

	return orderScore;
};

export const sortFigmaTokensFilePath = (figmaTokenFilePaths: string[]): string[] => {
	const figmaTokenFilePathsSortedAsc: string[] = figmaTokenFilePaths.sort();
	const figmaTokenFilePathsOrdered: string[] = figmaTokenFilePathsSortedAsc.sort((filePathA, filePathB) => {
		const orderScoreA: number = getFigmaTokenFileOrderScore(filePathA);
		const orderScoreB: number = getFigmaTokenFileOrderScore(filePathB);
		const result = orderScoreA - orderScoreB;
		return result;
	});

	return figmaTokenFilePathsOrdered;
};
