import { DesignToken, ValueTransform } from 'style-dictionary/types';
import { transformTypes } from 'style-dictionary/enums';
import { A1TokenTypes, extensionPropertyName, tokenStudioTokenExtensionPropertyName } from '../../../../shared/index.js';
import { resolveA1CustomTokenType } from './helpers/custom-token-type-resolver.js';

const metaInfoEnrichTransformMatcher = (token: DesignToken): boolean => token.name !== undefined;

const metaInfoEnrichTransformer = (token: DesignToken): DesignToken => {
	const a1CustomTokenType: A1TokenTypes | undefined = resolveA1CustomTokenType(token);
	const resolvedConventionalTokenType: A1TokenTypes =
		token[extensionPropertyName]?.[tokenStudioTokenExtensionPropertyName].originalType || (token.$type as A1TokenTypes);

	if (a1CustomTokenType != null && a1CustomTokenType !== resolvedConventionalTokenType) {
		token[extensionPropertyName] = {
			...token[extensionPropertyName],
			a1Customs: { a1CustomTokenType },
		};
	}

	return token.$value;
};

export const metaInfoEnrichTransformName = 'a1/meta-info-enrich';

export const metaInfoEnrichTransform: ValueTransform = {
	name: metaInfoEnrichTransformName,
	type: transformTypes.value,
	transitive: false,
	filter: (token: DesignToken) => metaInfoEnrichTransformMatcher(token),
	transform: (token: DesignToken) => metaInfoEnrichTransformer(token),
};
