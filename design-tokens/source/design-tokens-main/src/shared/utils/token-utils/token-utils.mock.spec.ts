export const singleTokenReference = '{token.name}';
export const multipleTokenReferences = '{token.name} {token.name2} {token.name3} {token.name4}';
export const tokenReferencesWithMath = '{token.name} + {token.name2} - {token.name3} * {token.name4} / {token.name5}';
export const tokenReferencesWithMathAndSpaces = '({token.name} + {token.name2}) ({token.name3} * {token.name4} / {token.name5})';
export const validTokenObject = {
	value: 'validValue',
	type: 'dimension',
	description: 'A valid token object for testing purposes',
};

export const validTokenObjectDTCG = {
	$value: 'validValue',
	$type: 'dimension',
	$description: 'A valid token object for testing purposes',
};

export const unsupportedTokenObjectFormat1 = {
	value: 'validValue',
	$type: 'dimension',
};

export const unsupportedTokenObjectFormat2 = {
	$value: 'test',
	type: 'string',
	$description: 'mixed prefixes',
};

export const invalidTokenObject = {
	asfdewgergf: 'ljsahfkjh',
	xvcbxcvbxvc: 'mnbsmfdnb',
};

export const typographyTokenObject = {
	$type: 'typography',
	$value: {
		fontFamily: '{semantic.font-family.body}',
		fontWeight: '{semantic.font-weight.body}',
		lineHeight: '{semantic.line-height.body.s}',
		fontSize: '{semantic.font-size.body.s}',
		letterSpacing: '{semantic.letter-spacing.body.s}',
		textCase: '{semantic.text-case.body}',
	},
};

export const typographyReferenceTokenObject = {
	$type: 'typography',
	$value: '{semantic.text.body.s}',
};

export const metadataFileName1 = '$metadata.json';
export const metadataFileName2 = '$themes.json';
