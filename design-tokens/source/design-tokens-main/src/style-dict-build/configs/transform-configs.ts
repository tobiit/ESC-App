import { TransformOptions } from '@tokens-studio/sd-transforms';

export const defaultTransformOptions: TransformOptions = {
	excludeParentKeys: false, // default: false
	alwaysAddFontStyle: false, // default: false
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'ts/color/modifiers': {
		format: 'hex',
	},
};
