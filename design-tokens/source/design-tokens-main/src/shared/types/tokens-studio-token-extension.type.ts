import { ColorModifier, TokenTypes } from '@tokens-studio/types';

export interface TokensStudioTokenExtension {
	modify?: ColorModifier;
	originalType?: TokenTypes;
}
