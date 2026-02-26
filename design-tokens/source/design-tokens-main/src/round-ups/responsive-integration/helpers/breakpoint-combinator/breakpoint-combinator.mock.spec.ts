import { A1Breakpoints } from '../../../../shared/index.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock folder path
export const mockFolderPath = 'test-tokens/brand/web';

// Mock breakpoint configuration
export const mockSsotBreakpoints = {
	xs: { $value: '0' },
	s: { $value: '320' },
	m: { $value: '704' },
	l: { $value: '992' },
	xl: { $value: '1280' },
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'2xl': { $value: '1472' },
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'3xl': { $value: '1760' },
};

// Mock breakpoint keys array
export const mockBreakpointKeys: A1Breakpoints[] = [
	A1Breakpoints.xs,
	A1Breakpoints.s,
	A1Breakpoints.m,
	A1Breakpoints.l,
	A1Breakpoints.xl,
	A1Breakpoints.xxl,
	A1Breakpoints.xxxl,
];

// Mock CSS files found in folder
export const mockAllCssFiles = [
	'colors-xs.css',
	'colors-m.css',
	'colors-l.css',
	'typography-xs.css',
	'typography-m.css',
	'typography-l.css',
	'spacing-xs.css',
	'spacing-m.css',
	'spacing-l.css',
];

// Mock CSS content for different breakpoints with differences
export const mockCssContentXs = [':root {', '  --color-primary: #ff0000;', '  --font-size-base: 16px;', '  --spacing-sm: 8px;', '}'];

export const mockCssContentM = [':root {', '  --color-primary: #ff0000;', '  --font-size-base: 18px;', '  --spacing-sm: 10px;', '}'];

export const mockCssContentL = [':root {', '  --color-primary: #ff0000;', '  --font-size-base: 20px;', '  --spacing-sm: 12px;', '}'];

// Mock CSS content with no differences
export const mockCssContentIdentical = [':root {', '  --color-primary: #ff0000;', '  --font-size-base: 16px;', '  --spacing-sm: 8px;', '}'];

// Mock CSS content with mismatched variables
export const mockCssContentMismatched = [
	':root {',
	'  --color-secondary: #00ff00;',
	'  --font-size-large: 18px;',
	'  --spacing-medium: 10px;',
	'}',
];

// Mock CSS content with different line counts
export const mockCssContentDifferentLineCount = [':root {', '  --color-primary: #ff0000;', '}'];

// Mock missing breakpoint configuration
export const mockSsotBreakpointsMissingValue: Record<string, { value?: string }> = {
	xs: { value: '0' },
	m: {}, // Missing value property
	l: { value: '992' },
};
