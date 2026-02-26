import { jest } from '@jest/globals';
import { logger, readJsonFile, TokenLayers } from '../../shared/index.js';
import { compareBreakpointFiles } from './helpers/index.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Type the mocked functions
export const mockedReadJsonFile = readJsonFile as jest.MockedFunction<typeof readJsonFile>;
export const mockedLogger = logger as jest.Mocked<typeof logger>;
export const mockedCompareBreakpointFiles = compareBreakpointFiles as jest.MockedFunction<typeof compareBreakpointFiles>;

export const dummyOeName = 'pfefferminzia';
export const testTokensFolderPath = `token-package/dist/${dummyOeName}/web`;

// Mock CSS token outputs for different breakpoints
export const cssTokenOuputMockXs: string[] = [
	':root {',
	'  --color-primary: #ff0000;',
	'  --color-secondary: #00ff00;',
	'  --color-tertiary: #0000ff;',
	'  --font-size-base: 16px;',
	'  --font-size-lg: 18px;',
	'  --font-size-sm: 14px;',
	'  --spacing-xs: 4px;',
	'  --spacing-sm: 8px;',
	'  --spacing-md: 16px;',
	'  --spacing-lg: 32px;',
	'  --border-radius: 4px;',
	'  --box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);',
	'}',
];

export const cssTokenOuputMockM: string[] = [
	':root {',
	'  --color-primary: #ff0000;',
	'  --color-secondary: #00ff00;',
	'  --color-tertiary: #0000ff;',
	'  --font-size-base: 16px;',
	'  --font-size-lg: 20px;',
	'  --font-size-sm: 15px;',
	'  --spacing-xs: 6px;',
	'  --spacing-sm: 8px;',
	'  --spacing-md: 16px;',
	'  --spacing-lg: 32px;',
	'  --border-radius: 6px;',
	'  --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);',
	'}',
];

export const cssTokenOuputMockL: string[] = [
	':root {',
	'  --color-primary: #ff0000;',
	'  --color-secondary: #00ff00;',
	'  --color-tertiary: #0000ff;',
	'  --font-size-base: 16px;',
	'  --font-size-lg: 24px;',
	'  --font-size-sm: 16px;',
	'  --spacing-xs: 6px;',
	'  --spacing-sm: 8px;',
	'  --spacing-md: 16px;',
	'  --spacing-lg: 32px;',
	'  --border-radius: 8px;',
	'  --box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);',
	'}',
];

export const mockGridCoreTokens = {
	[TokenLayers.core]: {
		size: {
			breakpoint: {
				xs: { value: '0' },
				s: { value: '320' },
				m: { value: '704' },
				l: { value: '992' },
				xl: { value: '1280' },
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'2xl': { value: '1472' },
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'3xl': { value: '1760' },
			},
		},
	},
};

// export const loadFilesFromFolderMock = [
// 	'tokens-dark-lively-compact-l.css',
// 	'tokens-dark-lively-compact-m.css',
// 	'tokens-dark-lively-compact-xs.css',
// 	'tokens-dark-lively-dense-l.css',
// 	'tokens-dark-lively-dense-m.css',
// 	'tokens-dark-lively-dense-xs.css',
// 	'tokens-dark-lively-spacious-l.css',
// 	'tokens-dark-lively-spacious-m.css',
// 	'tokens-dark-lively-spacious-xs.css',
// 	'tokens-dark-minimal-compact-l.css',
// 	'tokens-dark-minimal-compact-m.css',
// 	'tokens-dark-minimal-compact-xs.css',
// 	'tokens-dark-minimal-dense-l.css',
// 	'tokens-dark-minimal-dense-m.css',
// 	'tokens-dark-minimal-dense-xs.css',
// 	'tokens-dark-minimal-spacious-l.css',
// 	'tokens-dark-minimal-spacious-m.css',
// 	'tokens-dark-minimal-spacious-xs.css',
// 	'tokens-light-lively-compact-l.css',
// 	'tokens-light-lively-compact-m.css',
// 	'tokens-light-lively-compact-xs.css',
// 	'tokens-light-lively-dense-l.css',
// 	'tokens-light-lively-dense-m.css',
// 	'tokens-light-lively-dense-xs.css',
// 	'tokens-light-lively-spacious-l.css',
// 	'tokens-light-lively-spacious-m.css',
// 	'tokens-light-lively-spacious-xs.css',
// 	'tokens-light-minimal-compact-l.css',
// 	'tokens-light-minimal-compact-m.css',
// 	'tokens-light-minimal-compact-xs.css',
// 	'tokens-light-minimal-dense-l.css',
// 	'tokens-light-minimal-dense-m.css',
// 	'tokens-light-minimal-dense-xs.css',
// 	'tokens-light-minimal-spacious-l.css',
// 	'tokens-light-minimal-spacious-m.css',
// 	'tokens-light-minimal-spacious-xs.css',
// ];

// Mock file paths
export const mockFilePaths = [
	'test-tokens/pfefferminzia/web/light-xs.css',
	'test-tokens/pfefferminzia/web/grid-xs.css',
	'test-tokens/pfefferminzia/web/typography-xs.css',
	'test-tokens/pfefferminzia/web/grid-m.css',
	'test-tokens/pfefferminzia/web/typography-m.css',
	'test-tokens/pfefferminzia/web/grid-l.css',
	'test-tokens/pfefferminzia/web/typography-l.css',
	'test-tokens/pfefferminzia/web/grid-xl.css',
	'test-tokens/pfefferminzia/web/typography-xl.css',
	'test-tokens/pfefferminzia/web/grid-2xl.css',
	'test-tokens/pfefferminzia/web/typography-2xl.css',
	'test-tokens/pfefferminzia/web/grid-3xl.css',
	'test-tokens/pfefferminzia/web/typography-3xl.css',
];

export const expectedResponsiveIntegratedCss = [...cssTokenOuputMockXs, ...cssTokenOuputMockM, ...cssTokenOuputMockL].join('\n');

// Mock expected media query outputs
export const expectedMediaQueryM = [
	'@media screen and (min-width: 704px) {',
	'  :root {',
	'    --font-size-lg: 20px;',
	'    --font-size-sm: 15px;',
	'    --spacing-xs: 6px;',
	'    --border-radius: 6px;',
	'    --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);',
	'  }',
	'}',
];

export const expectedMediaQueryL = [
	'@media screen and (min-width: 992px) {',
	'  :root {',
	'    --font-size-lg: 24px;',
	'    --font-size-sm: 16px;',
	'    --border-radius: 8px;',
	'    --box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);',
	'  }',
	'}',
];

// Mock for files that exist in the file system with proper breakpoint names
export const mockFilePathsProcessed = [
	'test-tokens/pfefferminzia/web/light-xs.css',
	'test-tokens/pfefferminzia/web/grid-xs.css',
	'test-tokens/pfefferminzia/web/typography-xs.css',
];

// Mock for testing no differences found
export const mockGridCoreTokensMinimal = {
	[TokenLayers.core]: {
		size: {
			breakpoint: {
				xs: { value: '0' },
				s: { value: '320' },
			},
		},
	},
};

// Mock for grid tokens with missing breakpoint value
export const mockGridCoreTokensMissingBreakpoint = {
	[TokenLayers.core]: {
		size: {
			breakpoint: {
				xs: { value: '0' },
				s: {}, // missing 'value' property to trigger error
			},
		},
	},
};
