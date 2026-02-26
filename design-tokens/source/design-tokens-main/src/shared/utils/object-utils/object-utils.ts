import get from 'lodash/get.js';
import { logGeneralError } from '../../loggers/index.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObject = (item: any): item is object => item !== undefined && typeof item === 'object' && !Array.isArray(item);

export const isEmptyObject = (obj: object): boolean =>
	obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype; // check for empty object, source: https://stackoverflow.com/a/32108184/3512280

export const objectDeepMerge = (target: Record<string, object>, source: Record<string, object>): Record<string, object> => {
	// source: https://stackoverflow.com/a/37164538/3512280
	const result: Record<string, object> = Object.assign({}, target);

	if (isObject(target) && isObject(source)) {
		Object.keys(source).forEach((key: string) => {
			if (isObject(source[key])) {
				if (!(key in target)) {
					Object.assign(result, { [key]: source[key] });
				} else {
					result[key] = objectDeepMerge(target[key] as Record<string, object>, source[key] as Record<string, object>);
				}
			} else {
				Object.assign(result, { [key]: source[key] });
			}
		});
	}
	return result;
};

export const complementTokensInObject = (target: Record<string, object>, source: Record<string, object>, key: string): void => {
	if (target[key]) {
		if (source[key]) {
			target[key] = objectDeepMerge(target[key] as Record<string, object>, source[key] as Record<string, object>);
		} else {
			target[key] = objectDeepMerge(target[key] as Record<string, object>, source);
		}
	} else {
		if (source[key]) {
			target[key] = { ...(target[key] as object), ...source[key] } as Record<string, object>;
		} else {
			target[key] = { ...(target[key] as object), ...source } as Record<string, object>;
		}
	}
};

export const resolveObjectPropertyValue = <T>(object: object, propertyPath: string): T => {
	const result: T | undefined = get(object, propertyPath) as T | undefined;

	if (result == null) {
		logGeneralError('Could not resolve property path: ' + propertyPath);
	}

	return result as T;
};
