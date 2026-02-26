import { tokenStudioTokenExtensionPropertyName } from '../constants/index.js';
import { A1CustomTokenExtension } from './a1-custom-token-extension.type';
import { TokensStudioTokenExtension } from './tokens-studio-token-extension.type';

export interface DesignTokenExtensions {
	a1Customs?: A1CustomTokenExtension;
	[tokenStudioTokenExtensionPropertyName]?: TokensStudioTokenExtension;
}
