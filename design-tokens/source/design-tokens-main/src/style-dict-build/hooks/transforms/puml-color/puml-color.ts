import { transformTypes } from 'style-dictionary/enums';
import { DesignToken, ValueTransform } from 'style-dictionary/types';

export const pumlColorTransformName = 'color/puml';

export const pumlColorTransform: ValueTransform = {
	name: pumlColorTransformName,
	type: transformTypes.value,
	filter: (token: DesignToken) => token.$type === 'color',
	transform: (token: DesignToken) => {
		const colorValue = token.$value;

		const normalizeHexColor = (color: string): string => {
			if (color.startsWith('#')) {
				return color.toUpperCase();
			}
			return `#${color.toUpperCase()}`;
		};

		if (typeof colorValue === 'string') {
			return normalizeHexColor(colorValue);
		}

		return colorValue;
	},
};
