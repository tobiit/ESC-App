import { describe, expect, it, jest } from '@jest/globals';
import { metaDataFileNameSymbol } from '../../constants/index.js';
import { A1TokenTypes } from '../../enums/index.js';
import {
	allTokenReferencesInStringRegex,
	getTokenReferencePath,
	isSingleReferenceTokenValue,
	isTokenObject,
	isTokenSsotMetaDataFile,
	isTypograhpyCompositionalToken,
	isTypograhpyReference,
	matchAllReferenceMathShorthands,
	singleTokenReferencesInStringRegex,
} from './token-utils.js';
import {
	invalidTokenObject,
	metadataFileName1,
	metadataFileName2,
	multipleTokenReferences,
	singleTokenReference,
	tokenReferencesWithMath,
	tokenReferencesWithMathAndSpaces,
	typographyReferenceTokenObject,
	typographyTokenObject,
	unsupportedTokenObjectFormat1,
	unsupportedTokenObjectFormat2,
	validTokenObject,
	validTokenObjectDTCG,
} from './token-utils.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

jest.mock('../object-utils/object-utils.js', () => {
	return {
		isObject: jest.fn(val => val !== null && typeof val === 'object' && !Array.isArray(val)),
	};
});

// Note: Logger mocking (suppressLoggerOutput/restoreLoggerMocks) is automatically handled by src/shared/testing/test-helpers.mock.spec.ts via jest.config.ts setupFilesAfterEnv
describe('token-utils', () => {
	describe('allTokenReferencesInStringRegex', () => {
		it('should match single token references', () => {
			expect('{token.name}'.match(allTokenReferencesInStringRegex)).toEqual(['{token.name}']);
		});

		it('should match multiple token references', () => {
			const matches = multipleTokenReferences.match(allTokenReferencesInStringRegex);
			expect(matches).toEqual(['{token.name}', '{token.name2}', '{token.name3}', '{token.name4}']);
		});

		it('should match token references with hyphens and numbers', () => {
			expect('{token-1.name-2}'.match(allTokenReferencesInStringRegex)).toEqual(['{token-1.name-2}']);
		});

		it('should match token references in math expressions', () => {
			const matches = tokenReferencesWithMath.match(allTokenReferencesInStringRegex);
			expect(matches).toEqual(['{token.name}', '{token.name2}', '{token.name3}', '{token.name4}', '{token.name5}']);
		});

		it('should not match invalid token references', () => {
			expect('{ token.name }'.match(allTokenReferencesInStringRegex)).toBeNull();
			expect('{token space.name}'.match(allTokenReferencesInStringRegex)).toBeNull();
		});
	});

	describe('singleTokenReferencesInStringRegex', () => {
		it('should match a complete single token reference', () => {
			expect(singleTokenReference.match(singleTokenReferencesInStringRegex)).toBeTruthy();
		});

		it('should not match multiple token references', () => {
			expect(multipleTokenReferences.match(singleTokenReferencesInStringRegex)).toBeNull();
		});

		it('should not match token references with math operations', () => {
			expect(tokenReferencesWithMath.match(singleTokenReferencesInStringRegex)).toBeNull();
		});

		it('should not match invalid token references', () => {
			expect('{ token.name }'.match(singleTokenReferencesInStringRegex)).toBeNull();
			expect('{token space.name}'.match(singleTokenReferencesInStringRegex)).toBeNull();
		});
	});

	describe('getTokenReferencePath', () => {
		it('should extract token path from reference', () => {
			expect(getTokenReferencePath('{token.name}')).toBe('token.name');
		});

		it('should handle paths with hyphens and numbers', () => {
			expect(getTokenReferencePath('{token-1.name-2}')).toBe('token-1.name-2');
		});

		it('should handle deep paths', () => {
			expect(getTokenReferencePath('{semantic.color.primary.base}')).toBe('semantic.color.primary.base');
		});
	});

	describe('isTokenObject', () => {
		it('should validate legacy token objects', () => {
			// Using validTokenObject from mock
			expect(isTokenObject(validTokenObject)).toBe(true);
		});

		it('should validate DTCG token objects', () => {
			// Using validTokenObjectDTCG from mock
			expect(isTokenObject(validTokenObjectDTCG)).toBe(true);
		});

		it('should reject mixed format token objects (mixing $ prefix and non-$ properties)', () => {
			// Using unsupportedTokenObjectFormat1 from mock which mixes conventions
			expect(isTokenObject(unsupportedTokenObjectFormat1)).toBe(false);
		});

		it('should reject invalid token objects', () => {
			// Using invalidTokenObject from mock
			expect(isTokenObject(invalidTokenObject)).toBe(false);
		});

		it('should reject objects missing required properties', () => {
			expect(isTokenObject({ value: 'test' })).toBe(false);
			expect(isTokenObject({ $value: 'test' })).toBe(false);
			expect(isTokenObject({ type: 'string' })).toBe(false);
			expect(isTokenObject({ $type: 'string' })).toBe(false);
		});

		it('should reject objects with inconsistent property prefix usage', () => {
			// Mixed usage of $ prefix is not allowed
			expect(isTokenObject(unsupportedTokenObjectFormat1)).toBe(false);
			expect(isTokenObject(unsupportedTokenObjectFormat2)).toBe(false);
			expect(isTokenObject({ type: 'string' })).toBe(false);
			expect(isTokenObject({})).toBe(false);
		});
	});

	describe('isTokenSsotMetaDataFile', () => {
		it('should identify metadata files', () => {
			expect(isTokenSsotMetaDataFile(metadataFileName1)).toBe(true);
			expect(isTokenSsotMetaDataFile(metadataFileName2)).toBe(true);
		});

		it('should reject non-metadata files', () => {
			expect(isTokenSsotMetaDataFile('tokens.json')).toBe(false);
			expect(isTokenSsotMetaDataFile('colors.json')).toBe(false);
		});

		it('should handle undefined input', () => {
			expect(isTokenSsotMetaDataFile(undefined)).toBe(false);
		});

		it('should match based on metadata symbol', () => {
			expect(isTokenSsotMetaDataFile(`${metaDataFileNameSymbol}.json`)).toBe(true);
		});
	});

	describe('isTypograhpyCompositionalToken', () => {
		it('should identify valid typography tokens', () => {
			expect(isTypograhpyCompositionalToken(typographyTokenObject)).toBe(true);
		});

		it('should reject tokens with missing required properties', () => {
			const invalidToken = {
				type: 'typography',
				value: {
					fontFamily: '{semantic.font-family.body}',
					fontSize: '{semantic.font-size.body.s}',
					// Missing fontWeight and lineHeight
				},
			};
			expect(isTypograhpyCompositionalToken(invalidToken)).toBe(false);
		});

		it('should reject non-typography tokens', () => {
			expect(
				isTypograhpyCompositionalToken({
					type: 'dimension',
					value: { size: '16px' },
				}),
			).toBe(false);
		});

		it('should reject tokens with wrong type', () => {
			const wrongTypeToken = {
				...typographyTokenObject,
				$type: 'color',
			};
			expect(isTypograhpyCompositionalToken(wrongTypeToken)).toBe(false);
		});
	});

	describe('isTypograhpyReference', () => {
		it('should identify typography references', () => {
			expect(isTypograhpyReference(typographyReferenceTokenObject)).toBe(true);
		});

		it('should reject non-typography references', () => {
			expect(
				isTypograhpyReference({
					$type: 'dimension',
					$value: '{semantic.dimension.small}',
				}),
			).toBe(false);
		});

		it('should reject typography tokens without references', () => {
			expect(
				isTypograhpyReference({
					$type: 'typography',
					$value: 'no reference here',
				}),
			).toBe(false);
		});

		it('should verify reference includes correct path structure', () => {
			const token = {
				$type: A1TokenTypes.typography,
				$value: `{semantic.text.body.s}`,
			};
			expect(isTypograhpyReference(token)).toBe(true);
		});
	});

	describe('matchAllReferenceMathShorthands', () => {
		it('should match single reference without math', () => {
			expect(matchAllReferenceMathShorthands(singleTokenReference)).toEqual([singleTokenReference]);
		});

		it('should match references with math operators', () => {
			const result = matchAllReferenceMathShorthands(tokenReferencesWithMath);
			expect(result?.length).toBeGreaterThan(0);
			expect(result?.[0]).toContain('+');
			expect(result?.[0]).toContain('-');
			expect(result?.[0]).toContain('*');
			expect(result?.[0]).toContain('/');
		});

		it('should handle references with spaces and parentheses', () => {
			const result = matchAllReferenceMathShorthands(tokenReferencesWithMathAndSpaces);
			expect(result?.length).toBeGreaterThan(0);
			expect(result?.[0]).toContain('{token.name} + {token.name2}');
			expect(result?.[1]).toContain('{token.name3} * {token.name4} / {token.name5}');
		});

		it('should return null for non-matching strings', () => {
			expect(matchAllReferenceMathShorthands('no references here')).toBeNull();
		});
	});

	describe('isSingleReferenceTokenValue', () => {
		it('should identify single token references', () => {
			expect(isSingleReferenceTokenValue(singleTokenReference)).toBe(true);
		});

		it('should reject multiple token references', () => {
			expect(isSingleReferenceTokenValue(multipleTokenReferences)).toBe(false);
		});

		it('should reject object values', () => {
			expect(isSingleReferenceTokenValue({ key: 'value' })).toBe(false);
		});

		it('should reject token references with math', () => {
			expect(isSingleReferenceTokenValue(tokenReferencesWithMath)).toBe(false);
		});
	});
});
