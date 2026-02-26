import { Config, Filter, TransformedToken } from 'style-dictionary/types';
import { A1SpecialTokenNameKeyWords, A1TokenTypes } from '../../../shared/index.js';

const noInternalToken = (token: TransformedToken): boolean => token.name?.toLowerCase().indexOf(A1SpecialTokenNameKeyWords.internal) === -1;
const noTextCaseToken = (token: TransformedToken): boolean => (token.$type as A1TokenTypes) !== A1TokenTypes.textCase;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const excludedTokensFilterMatcher = (token: TransformedToken, options: Config): boolean =>
	!(!noInternalToken(token) || !noTextCaseToken(token));

export const excludedTokensFilterName = 'a1/filter/excluded';

export const excludedTokensFilter: Filter = {
	name: excludedTokensFilterName,
	filter: (token: TransformedToken, options: Config): boolean => excludedTokensFilterMatcher(token, options),
};
