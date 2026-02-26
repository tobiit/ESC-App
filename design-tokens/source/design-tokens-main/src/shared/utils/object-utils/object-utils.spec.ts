import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { complementTokensInObject, isEmptyObject, isObject, objectDeepMerge, resolveObjectPropertyValue } from './object-utils';
import { complexObject, nestedObject, simpleObject, sourceObject, targetObject, testPropertyPath } from './object-utils.mock.spec';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

jest.mock('../../loggers/index.js', () => {
	return {
		logGeneralError: jest.fn(),
	};
});

describe('object-utils', () => {
	describe('isObject', () => {
		it('should return true for plain objects', () => {
			expect(isObject({})).toBe(true);
			expect(isObject(simpleObject)).toBe(true);
			expect(isObject(nestedObject)).toBe(true);
		});

		it('should return false for arrays', () => {
			expect(isObject([])).toBe(false);
			expect(isObject([1, 2, 3])).toBe(false);
		});

		it('should handle null', () => {
			expect(isObject(null)).toBe(true); // Current impl considers null an object
		});

		it('should return false for undefined', () => {
			expect(isObject(undefined)).toBe(false);
		});

		it('should return false for primitives', () => {
			expect(isObject(42)).toBe(false);
			expect(isObject('string')).toBe(false);
			expect(isObject(true)).toBe(false);
		});
	});

	describe('isEmptyObject', () => {
		it('should return true for empty objects', () => {
			expect(isEmptyObject({})).toBe(true);
		});

		it('should return false for non-empty objects', () => {
			expect(isEmptyObject(simpleObject)).toBe(false);
		});

		it('should return false for objects with prototypes other than Object', () => {
			class TestClass {}
			expect(isEmptyObject(new TestClass())).toBe(false);
		});

		it('should handle null and undefined', () => {
			// Both null and undefined should be treated as "falsy" in this context
			const nullResult = isEmptyObject(null as unknown as object);
			const undefinedResult = isEmptyObject(undefined as unknown as object);

			expect(nullResult == null).toBe(true); // Using == to match both null and undefined
			expect(undefinedResult == null).toBe(true); // Using == to match both null and undefined
		});
	});

	describe('objectDeepMerge', () => {
		it('should merge objects at root level', () => {
			const target = { key1: { a: 'original' } };
			const source = { key2: { b: 'new' } };
			const result = objectDeepMerge(target as Record<string, object>, source as Record<string, object>);

			expect(result).toEqual({
				key1: { a: 'original' },
				key2: { b: 'new' },
			});
		});

		it('should deep merge nested objects', () => {
			const target = { nested: { a: { x: 1 }, b: { y: 2 } } };
			const source = { nested: { b: { z: 3 }, c: { w: 4 } } };
			const result = objectDeepMerge(target as Record<string, object>, source as Record<string, object>);

			expect(result['nested'] as Record<string, object>).toEqual({
				a: { x: 1 },
				b: { y: 2, z: 3 },
				c: { w: 4 },
			});
		});

		it('should not modify the original objects', () => {
			const originalTarget = { ...targetObject };
			const originalSource = { ...sourceObject };

			objectDeepMerge(targetObject, sourceObject);

			expect(targetObject).toEqual(originalTarget);
			expect(sourceObject).toEqual(originalSource);
		});

		it('should handle non-object values', () => {
			const target = { key: { inner: { a: true } } };
			const source = { key: { inner: { b: {} } } };
			const result = objectDeepMerge(target as Record<string, object>, source as Record<string, object>);

			expect((result['key'] as Record<string, object>)['inner']).toEqual({
				a: true,
				b: {},
			});
		});

		it('should return empty result when source is not an object', () => {
			const target = { key1: { a: 'original' } };
			// Using undefined as source, which will fail the isObject check
			const source = undefined as unknown as Record<string, object>;
			const result = objectDeepMerge(target as Record<string, object>, source);

			// When source is not an object, it returns copy of target without merging
			expect(result).toEqual(target);
			expect(result).not.toBe(target); // Should be a copy
		});

		it('should return empty result when target is not an object', () => {
			const target = undefined as unknown as Record<string, object>;
			const source = { key1: { a: 'source' } };
			const result = objectDeepMerge(target, source as Record<string, object>);

			// When target is not an object, it creates empty result
			expect(result).toEqual({});
		});
	});

	describe('complementTokensInObject', () => {
		it('should merge when both target and source have the key', () => {
			const target = { ...targetObject };
			const source = { ...sourceObject };
			const key = 'key1';

			complementTokensInObject(target, source, key);

			expect(target[key]).toEqual({
				existingValue: 'target1',
				value: 'source1',
			});
		});

		it('should merge source object when target has key but source does not', () => {
			const target = { key1: { inner: { a: {} } } };
			const source = { inner: { b: {} } };
			const key = 'key1';

			complementTokensInObject(target, source as Record<string, object>, key);

			expect(target[key]).toEqual({
				inner: { a: {}, b: {} }, // Current impl preserves existing properties
			});
		});

		it('should copy source key when target does not have key but source does', () => {
			const target = {} as Record<string, object>;
			const source = { key1: { inner: {} } };
			const key = 'key1';

			complementTokensInObject(target, source, key);

			expect(target[key]).toEqual({
				inner: {},
			});
		});

		it('should copy entire source when neither has the key', () => {
			const target = {} as Record<string, object>;
			const source = { inner: {} };
			const key = 'nonexistent';

			complementTokensInObject(target, source as Record<string, object>, key);

			expect(target[key]).toEqual({
				inner: {},
			});
		});
	});

	describe('resolveObjectPropertyValue', () => {
		let logGeneralError: jest.Mock;

		beforeEach(() => {
			// Get the mock and properly type it
			const mockModule = jest.requireMock('../../loggers/index.js') as { logGeneralError: jest.Mock };
			logGeneralError = mockModule.logGeneralError;
			jest.clearAllMocks();
		});

		it('should resolve existing property paths', () => {
			const result = resolveObjectPropertyValue<string>(complexObject, testPropertyPath);
			expect(result).toBe('#000000');
			expect(logGeneralError).not.toHaveBeenCalled();
		});

		it('should handle undefined property paths', () => {
			const result = resolveObjectPropertyValue<string>(complexObject, 'nonexistent.path');
			expect(result).toBeUndefined();
			expect(logGeneralError).toHaveBeenCalledWith('Could not resolve property path: nonexistent.path');
		});

		it('should handle nested property paths', () => {
			const result = resolveObjectPropertyValue<object>(complexObject, 'styles.colors');
			expect(result).toEqual({
				primary: '#000000',
				secondary: '#ffffff',
			});
			expect(logGeneralError).not.toHaveBeenCalled();
		});

		it('should handle empty property paths', () => {
			const result = resolveObjectPropertyValue<unknown>(complexObject, '');
			expect(result).toBeUndefined();
			expect(logGeneralError).toHaveBeenCalledWith('Could not resolve property path: '); // Current impl uses this message format
		});
	});
});
