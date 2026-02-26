import { TokenLayers } from '../../../../shared';

export const resolveTokenLayerBasePath = (filePathParts: string[]): { tokenLayerBasePathLevel: number; tokenLayer: TokenLayers } => {
	const tokenLayerBasePathIndex = 2; // TODO How can we derive this value generically? Probably is the resolvedTokensSsotFolder.split('/') from the src/preparations/preparations.ts file
	const tokenLayer: TokenLayers = filePathParts[tokenLayerBasePathIndex] as TokenLayers;
	const tokenLayerBasePathLevel = tokenLayerBasePathIndex + 1;
	return { tokenLayerBasePathLevel, tokenLayer };
};
