import { DesignToken } from 'style-dictionary/types';

export interface GridBreakpointSsot {
	core: {
		size: {
			breakpoint: {
				xs: DesignToken;
				sm: DesignToken;
				md: DesignToken;
				lg: DesignToken;
				xl: DesignToken;
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'2xl': DesignToken;
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'3xl': DesignToken;
			};
		};
	};
}
