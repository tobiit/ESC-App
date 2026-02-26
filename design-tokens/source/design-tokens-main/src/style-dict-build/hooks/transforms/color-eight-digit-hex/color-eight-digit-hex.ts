import { DesignToken, ValueTransform } from 'style-dictionary/types';
import { transformTypes } from 'style-dictionary/enums';
import { A1TokenTypes, logicalTokenSetError } from '../../../../shared/index.js';

const colorEightDigitHexTokenMatcher = (token: DesignToken): boolean => token.$type === A1TokenTypes.color;

const convertDigitToHex = (digit: number): string => digit.toString(16).toUpperCase(); // upper case considerations: https://stackoverflow.com/a/55655624/3512280

const convertHexFourToHexEight = (hexColor: string): string => {
	// #fff9 will be #FFFFFF99
	if (hexColor.length === 5 || hexColor.length === 4) {
		const hexEight: string = hexColor
			.replace('#', '')
			.split('')
			.map(char => char + char)
			.join('');
		return '#' + hexEight.toUpperCase();
	} else {
		return hexColor.toUpperCase();
	}
};

const cleanUpRgbaValueString = (rgbaTokenValue: string): string[] =>
	rgbaTokenValue
		.replace('rgba(', '') // Clean up rgba token value string
		.replaceAll(' ', '') // Clean up rgba token value string
		.replace(')', '') // Clean up rgba token value string
		.split(','); // splits them at ","

const normalizeHexValue = (hexValue: string): string => (hexValue.length === 1 ? '0' + hexValue : hexValue);

const convertAlphaFloatToHex = (alphaValue: number): string => {
	if (alphaValue >= 1) {
		logicalTokenSetError(`Invalid alpha value: "${alphaValue}". Alpha must be between 0 and 1`);
	}
	const alphaHexRaw = convertDigitToHex(Math.round(alphaValue * 255));
	const alphaHex = normalizeHexValue(alphaHexRaw);
	return alphaHex;
};

const convertRgbToHex = (rgbaColorValues: string[]): string => {
	if (rgbaColorValues.length === 2) {
		// if it is an invalid rgba value i.e. rgba(#FFFFFF, 0.8)
		return rgbaColorValues[0].replace('#', '').toUpperCase();
	} else {
		// else for regular valid rgba values i.e. rgba(255, 255, 255, 0.8)
		const rgbValues: string[] = [...rgbaColorValues];
		rgbValues.pop();
		const rgbaValuesNumber: number[] = rgbValues.map(rgbValueString => {
			const rgbValueNumber: number = parseFloat(rgbValueString);
			if (rgbValueNumber >= 255) {
				logicalTokenSetError(`Invalid rgb color value: "${rgbValueNumber}". Color value must be between 0 and 255`);
			}
			return rgbValueNumber;
		});

		const convertedRgb = rgbaValuesNumber
			.map(rgbaValueNumber => convertDigitToHex(rgbaValueNumber)) // Converts numbers to hex
			.map(hexValueString => normalizeHexValue(hexValueString)) // Adds 0 when length of one number is 1
			.join('');

		return convertedRgb;
	}
};

const rgbaToHexa = (rgbaTokenValue: string): string => {
	// inspired by: https://stackoverflow.com/a/73401564/3512280

	// Handle malformed input
	if (!rgbaTokenValue || !rgbaTokenValue.includes('(') || !rgbaTokenValue.includes(')')) {
		logicalTokenSetError(`Invalid rgba format: "${rgbaTokenValue}". Expected format: rgba(r, g, b, a)`);
	}

	const splitUpRgbaColorValues: string[] = cleanUpRgbaValueString(rgbaTokenValue);

	// Handle empty or insufficient values
	if (splitUpRgbaColorValues.length < 2) {
		logicalTokenSetError(`Invalid rgba format: "${rgbaTokenValue}". Insufficient values provided`);
	}

	// Additional validation: if we have exactly 2 values, the first should look like a hex color
	if (splitUpRgbaColorValues.length === 2 && !splitUpRgbaColorValues[0].startsWith('#')) {
		logicalTokenSetError(`Invalid rgba format: "${rgbaTokenValue}". Two-value rgba must have hex color as first value`);
	}

	// Validate that we have either 2 values (hex color + alpha) or 4+ values (r,g,b,a)
	if (splitUpRgbaColorValues.length === 3) {
		logicalTokenSetError(`Invalid rgba format: "${rgbaTokenValue}". Expected 2 values (hex, alpha) or 4 values (r, g, b, a), got 3`);
	}

	const alphaString = splitUpRgbaColorValues[splitUpRgbaColorValues.length - 1];
	const alphaValue = parseFloat(alphaString);

	// Handle NaN alpha values
	if (isNaN(alphaValue)) {
		logicalTokenSetError(`Invalid alpha value: "${alphaString}". Expected a numeric value between 0 and 1`);
	}

	const convertedAlphaToHex: string = convertAlphaFloatToHex(alphaValue);
	const convertedRgbToHex: string = convertRgbToHex(splitUpRgbaColorValues);
	return '#' + convertedRgbToHex + convertedAlphaToHex;
};

const colorEightDigitHexValueTransformer = (token: DesignToken) => {
	const value = token.$value;

	// Handle non-string values
	if (typeof value !== 'string') {
		logicalTokenSetError(
			`Invalid token value type: "${typeof value}". Expected string, received ${typeof value}: ${JSON.stringify(value)}`,
		);
	}

	// Handle empty or falsy string values
	if (!value) {
		logicalTokenSetError(`Invalid token value: empty or falsy string. Expected a valid color value`);
	}

	if (value.startsWith('rgba(')) {
		const transformedValue = rgbaToHexa(value);
		return transformedValue;
	} else {
		const normalizedHexEightColorValue = convertHexFourToHexEight(value);
		return normalizedHexEightColorValue;
	}
};

export const transformTo8DigitHexValuesTransformName = 'a1/color/hex8';

// also converts invalid rgba(#FFFFFF, 0.8) caused by token reference like rgba({core.color.white}, 0.8) to valid hex8 #FFFFFF4D
export const transformTo8DigitHexValues: ValueTransform = {
	name: transformTo8DigitHexValuesTransformName,
	type: transformTypes.value,
	transitive: true,
	filter: (token: DesignToken) => colorEightDigitHexTokenMatcher(token),
	transform: (token: DesignToken) => colorEightDigitHexValueTransformer(token),
};
