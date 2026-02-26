import { transformTypes } from 'style-dictionary/enums';
import { DesignToken, NameTransform } from 'style-dictionary/types';

export const pumlNameTransformName = 'name/puml/constant';

export const pumlNameTransform: NameTransform = {
	name: pumlNameTransformName,
	type: transformTypes.name,
	transform: (token: DesignToken) => {
		const pathSegments = token['path'] || [];
		return pathSegments
			.map((segment: string) => segment.replace(/[^a-zA-Z0-9]/g, '_'))
			.join('_')
			.toUpperCase();
	},
};
