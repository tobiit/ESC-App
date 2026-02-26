import { tokenStudioTokenExtensionPropertyName } from '../../shared/index.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock file paths for different file types
export const mockCssFilePath = '/mock/path/tokens.css';
export const mockScssFilePath = '/mock/path/tokens.scss';
export const mockJsFilePath = '/mock/path/tokens.js';
export const mockJsonFilePath = '/mock/path/tokens.json';

// Mock CSS file content with typography properties
export const mockCssContentWithTypography = `.token {
  --font-size-body: 16px;
  --line-height-body: 24px;
  --letter-spacing-body: 0.5px;
  --text-decoration: underline;
  --color-primary: #007bff;
  --padding: 10px;
}

.heading {
  --font-size-heading: 32px;
  --line-height-heading: 40px;
  --letter-spacing-heading: -0.5px;
}`;

export const mockCssContentWithoutTypography = `.token {
  --color-primary: #007bff;
  --padding: 10px;
  --margin: 20px;
}`;

export const mockCssExpectedOutput = `.token {
  --font-size-body: 1rem;
  --line-height-body: 1.5rem;
  --letter-spacing-body: 0.03125rem;
  --text-decoration: underline;
  --color-primary: #007bff;
  --padding: 10px;
}

.heading {
  --font-size-heading: 2rem;
  --line-height-heading: 2.5rem;
  --letter-spacing-heading: -0.03125rem;
}`;

// Mock SCSS file content with typography properties
export const mockScssContentWithTypography = `$font-size-body: 16px;
$line-height-body: 24px;
$letter-spacing-heading: 0.5px;
$text-transform: uppercase;
$color-primary: #007bff;

.typography {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.25px;
}`;

export const mockScssExpectedOutput = `$font-size-body: 1rem;
$line-height-body: 1.5rem;
$letter-spacing-heading: 0.03125rem;
$text-transform: uppercase;
$color-primary: #007bff;

.typography {
  font-size: 0.875rem;
  line-height: 1.25rem;
  letter-spacing: 0.01563rem;
}`;

// Mock JS file content with typography properties
export const mockJsContentWithTypography = `export const tokens = {
  fontSize: "16px",
  lineHeight: "24px",
  letterSpacing: "0.5px",
  textDecoration: "underline",
  colorPrimary: "#007bff",
};

export const headingFontSize = "32px";
export const headingLineHeight = "40px";`;

export const mockJsExpectedOutput = `export const tokens = {
  fontSize: "1rem",
  lineHeight: "1.5rem",
  letterSpacing: "0.03125rem",
  textDecoration: "underline",
  colorPrimary: "#007bff",
};

export const headingFontSize = "2rem";
export const headingLineHeight = "2.5rem";`;

// Mock JSON data structures with typography properties
export const mockJsonDataSimple: Record<string, unknown> = {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'font-size': {
		name: 'font-size',
		$value: '16px',
		$type: 'dimension',
	},
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'line-height': {
		name: 'line-height',
		$value: '24px',
		$type: 'dimension',
	},
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'letter-spacing': {
		name: 'letter-spacing',
		$value: '0.5px',
		$type: 'dimension',
	},
	color: {
		name: 'color',
		$value: '#007bff',
		$type: 'color',
	},
};

export const mockJsonDataSimpleExpected: Record<string, unknown> = {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'font-size': {
		name: 'font-size',
		$value: '1rem',
		$type: 'dimension',
	},
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'line-height': {
		name: 'line-height',
		$value: '1.5rem',
		$type: 'dimension',
	},
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'letter-spacing': {
		name: 'letter-spacing',
		$value: '0.03125rem',
		$type: 'dimension',
	},
	color: {
		name: 'color',
		$value: '#007bff',
		$type: 'color',
	},
};

export const mockJsonDataNested: Record<string, unknown> = {
	typography: {
		body: {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'font-size': {
				name: 'typography.body.font-size',
				$value: '16px',
				$type: 'dimension',
			},
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'line-height': {
				name: 'typography.body.line-height',
				$value: '24px',
				$type: 'dimension',
			},
		},
		heading: {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'font-size': {
				name: 'typography.heading.font-size',
				$value: '32px',
				$type: 'dimension',
			},
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'letter-spacing': {
				name: 'typography.heading.letter-spacing',
				$value: '0.5px',
				$type: 'dimension',
			},
		},
	},
	colors: {
		primary: {
			name: 'colors.primary',
			$value: '#007bff',
			$type: 'color',
		},
	},
};

export const mockJsonDataNestedExpected: Record<string, unknown> = {
	typography: {
		body: {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'font-size': {
				name: 'typography.body.font-size',
				$value: '1rem',
				$type: 'dimension',
			},
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'line-height': {
				name: 'typography.body.line-height',
				$value: '1.5rem',
				$type: 'dimension',
			},
		},
		heading: {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'font-size': {
				name: 'typography.heading.font-size',
				$value: '2rem',
				$type: 'dimension',
			},
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'letter-spacing': {
				name: 'typography.heading.letter-spacing',
				$value: '0.03125rem',
				$type: 'dimension',
			},
		},
	},
	colors: {
		primary: {
			name: 'colors.primary',
			$value: '#007bff',
			$type: 'color',
		},
	},
};

export const mockJsonDataWithDollarValue: Record<string, unknown> = {
	component: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'body-font-size': {
			name: 'component.body-font-size',
			$value: '16px',

			$type: 'dimension',
		},
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'body-line-height': {
			name: 'component.body-line-height',
			$value: '24px',

			$type: 'dimension',
		},
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'heading-letter-spacing': {
			name: 'component.heading-letter-spacing',
			$value: '0.5px',

			$type: 'dimension',
		},
	},
};

export const mockJsonDataWithDollarValueExpected: Record<string, unknown> = {
	component: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'body-font-size': {
			name: 'component.body-font-size',
			$value: '1rem',

			$type: 'dimension',
		},
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'body-line-height': {
			name: 'component.body-line-height',
			$value: '1.5rem',

			$type: 'dimension',
		},
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'heading-letter-spacing': {
			name: 'component.heading-letter-spacing',
			$value: '0.03125rem',

			$type: 'dimension',
		},
	},
};

export const mockJsonDataCamelCase: Record<string, unknown> = {
	typography: {
		fontSize: {
			name: 'typography.fontSize',
			$value: '16px',
			$type: 'dimension',
		},
		lineHeight: {
			name: 'typography.lineHeight',
			$value: '24px',
			$type: 'dimension',
		},
		letterSpacing: {
			name: 'typography.letterSpacing',
			$value: '0.5px',
			$type: 'dimension',
		},
	},
};

export const mockJsonDataCamelCaseExpected: Record<string, unknown> = {
	typography: {
		fontSize: {
			name: 'typography.fontSize',
			$value: '1rem',
			$type: 'dimension',
		},
		lineHeight: {
			name: 'typography.lineHeight',
			$value: '1.5rem',
			$type: 'dimension',
		},
		letterSpacing: {
			name: 'typography.letterSpacing',
			$value: '0.03125rem',
			$type: 'dimension',
		},
	},
};

export const mockJsonDataUnderscoreCase: Record<string, unknown> = {
	typography: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		font_size: {
			name: 'typography.font-size',
			$value: '16px',
			$type: 'dimension',
		},
		// eslint-disable-next-line @typescript-eslint/naming-convention
		line_height: {
			name: 'typography.line-height',
			$value: '24px',
			$type: 'dimension',
		},
		// eslint-disable-next-line @typescript-eslint/naming-convention
		letter_spacing: {
			name: 'typography.letter-spacing',
			$value: '0.5px',
			$type: 'dimension',
		},
	},
};

export const mockJsonDataUnderscoreCaseExpected: Record<string, unknown> = {
	typography: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		font_size: {
			name: 'typography.font-size',
			$value: '1rem',
			$type: 'dimension',
		},
		// eslint-disable-next-line @typescript-eslint/naming-convention
		line_height: {
			name: 'typography.line-height',
			$value: '1.5rem',
			$type: 'dimension',
		},
		// eslint-disable-next-line @typescript-eslint/naming-convention
		letter_spacing: {
			name: 'typography.letter-spacing',
			$value: '0.03125rem',
			$type: 'dimension',
		},
	},
};

export const mockJsonDataWithArray: Record<string, unknown> = {
	typography: [
		{
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'font-size': {
				name: 'typography[0].font-size',
				$value: '16px',
				$type: 'dimension',
			},
		},
		{
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'line-height': {
				name: 'typography[1].line-height',
				$value: '24px',
				$type: 'dimension',
			},
		},
	],
};

export const mockJsonDataWithArrayExpected: Record<string, unknown> = {
	typography: [
		{
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'font-size': {
				name: 'typography[0].font-size',
				$value: '16px',
				$type: 'dimension',
			},
		},
		{
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'line-height': {
				name: 'typography[1].line-height',
				$value: '24px',
				$type: 'dimension',
			},
		},
	],
};

export const mockJsonDataMixed: Record<string, unknown> = {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'font-size': {
		name: 'font-size',
		$value: '16px',
		$type: 'dimension',
	},
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'line-height': {
		name: 'line-height',
		$value: '24px',
		$type: 'dimension',
	},
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'letter-spacing': {
		name: 'letter-spacing',
		$value: '0.5px',
		$type: 'dimension',
	},
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'text-decoration': {
		name: 'text-decoration',
		$value: 'underline',
		$type: 'string',
	},
	padding: {
		name: 'padding',
		$value: '10px',
		$type: 'dimension',
	},
	margin: {
		name: 'margin',
		$value: '20px',
		$type: 'dimension',
	},
};

export const mockJsonDataMixedExpected: Record<string, unknown> = {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'font-size': {
		name: 'font-size',
		$value: '1rem',
		$type: 'dimension',
	},
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'line-height': {
		name: 'line-height',
		$value: '1.5rem',
		$type: 'dimension',
	},
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'letter-spacing': {
		name: 'letter-spacing',
		$value: '0.03125rem',
		$type: 'dimension',
	},
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'text-decoration': {
		name: 'text-decoration',
		$value: 'underline',
		$type: 'string',
	},
	padding: {
		name: 'padding',
		$value: '10px',
		$type: 'dimension',
	},
	margin: {
		name: 'margin',
		$value: '20px',
		$type: 'dimension',
	},
};

export const mockJsonDataNoTypography: Record<string, unknown> = {
	colors: {
		primary: '#007bff',
		secondary: '#6c757d',
	},
	spacing: {
		small: '8px',
		medium: '16px',
	},
};

export const mockJsonDataWithTextKeyword: Record<string, unknown> = {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'text-size': {
		name: 'text-size',
		$value: '16px',
		$type: 'dimension',
	},
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'text-line-height': {
		name: 'text-line-height',
		$value: '24px',
		$type: 'dimension',
	},
};

export const mockJsonDataWithTextKeywordExpected: Record<string, unknown> = {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'text-size': {
		name: 'text-size',
		$value: '1rem',
		$type: 'dimension',
	},
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'text-line-height': {
		name: 'text-line-height',
		$value: '1.5rem',
		$type: 'dimension',
	},
};

// Mock directory path
export const mockDirPath = '/mock/path/to/dist';

// Mock file list
export const mockFileList: string[] = [
	'/mock/path/to/dist/tokens.css',
	'/mock/path/to/dist/tokens.scss',
	'/mock/path/to/dist/tokens.js',
	'/mock/path/to/dist/tokens.json',
];

// Edge case: Decimal px values
export const mockJsonDataDecimal: Record<string, unknown> = {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'font-size': {
		name: 'font-size',
		$value: '16.5px',
		$type: 'dimension',
	},
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'line-height': {
		name: 'line-height',
		$value: '24.75px',
		$type: 'dimension',
	},
};

export const mockJsonDataDecimalExpected: Record<string, unknown> = {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'font-size': {
		name: 'font-size',
		$value: '1.03125rem',
		$type: 'dimension',
	},
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'line-height': {
		name: 'line-height',
		$value: '1.54688rem',
		$type: 'dimension',
	},
};

// Edge case: Zero values
export const mockJsonDataZero: Record<string, unknown> = {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'letter-spacing': {
		name: 'letter-spacing',
		$value: '0px',
		$type: 'dimension',
	},
};

export const mockJsonDataZeroExpected: Record<string, unknown> = {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'letter-spacing': {
		name: 'letter-spacing',
		$value: '0rem',
		$type: 'dimension',
	},
};

// Edge case: Values that are not strings
export const mockJsonDataNonString: Record<string, unknown> = {
	size: {
		name: 'size',
		$value: 16,
		$type: 'dimension',
	},
	height: {
		name: 'height',
		$value: 1.5,
		$type: 'dimension',
	},
	width: {
		name: 'width',
		$value: {
			value: '100px',
		},
		$type: 'dimension',
	},
};

// Edge case: Values with additional units (should not be converted)
export const mockJsonDataOtherUnits: Record<string, unknown> = {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'font-size': {
		name: 'font-size',
		$value: '1em',
		$type: 'dimension',
	},
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'line-height': {
		name: 'line-height',
		$value: '1.5',
		$type: 'dimension',
	},
};

// Edge case: Complex nested structure with mixed typography and non-typography
export const mockJsonDataComplexNested: Record<string, unknown> = {
	tokens: {
		typography: {
			body: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'font-size': {
					name: 'tokens.typography.body.font-size',
					$value: '16px',
					$type: 'dimension',
				},
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'line-height': {
					name: 'tokens.typography.body.line-height',
					$value: '24px',
					$type: 'dimension',
				},
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'font-family': {
					name: 'tokens.typography.body.font-family',
					$value: 'Arial',
					$type: 'fontFamily',
				},
			},
			heading: {
				h1: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'font-size': {
						name: 'tokens.typography.heading.h1.font-size',
						$value: '32px',
						$type: 'dimension',
					},
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'letter-spacing': {
						name: 'tokens.typography.heading.h1.letter-spacing',
						$value: '0.5px',
						$type: 'dimension',
					},
				},
				h2: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'font-size': {
						name: 'tokens.typography.heading.h2.font-size',
						$value: '24px',
						$type: 'dimension',
					},
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'line-height': {
						name: 'tokens.typography.heading.h2.line-height',
						$value: '32px',
						$type: 'dimension',
					},
				},
			},
		},
		colors: {
			primary: {
				name: 'tokens.colors.primary',
				$value: '#007bff',
				$type: 'color',
			},
			secondary: {
				name: 'tokens.colors.secondary',
				$value: '#6c757d',
				$type: 'color',
			},
		},
		spacing: {
			small: {
				name: 'tokens.spacing.small',
				$value: '8px',
				$type: 'dimension',
			},
			medium: {
				name: 'tokens.spacing.medium',
				$value: '16px',
				$type: 'dimension',
			},
		},
	},
};

export const mockJsonDataComplexNestedExpected: Record<string, unknown> = {
	tokens: {
		typography: {
			body: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'font-size': {
					name: 'tokens.typography.body.font-size',
					$value: '1rem',
					$type: 'dimension',
				},
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'line-height': {
					name: 'tokens.typography.body.line-height',
					$value: '1.5rem',
					$type: 'dimension',
				},
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'font-family': {
					name: 'tokens.typography.body.font-family',
					$value: 'Arial',
					$type: 'fontFamily',
				},
			},
			heading: {
				h1: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'font-size': {
						name: 'tokens.typography.heading.h1.font-size',
						$value: '2rem',
						$type: 'dimension',
					},
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'letter-spacing': {
						name: 'tokens.typography.heading.h1.letter-spacing',
						$value: '0.03125rem',
						$type: 'dimension',
					},
				},
				h2: {
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'font-size': {
						name: 'tokens.typography.heading.h2.font-size',
						$value: '1.5rem',
						$type: 'dimension',
					},
					// eslint-disable-next-line @typescript-eslint/naming-convention
					'line-height': {
						name: 'tokens.typography.heading.h2.line-height',
						$value: '2rem',
						$type: 'dimension',
					},
				},
			},
		},
		colors: {
			primary: {
				name: 'tokens.colors.primary',
				$value: '#007bff',
				$type: 'color',
			},
			secondary: {
				name: 'tokens.colors.secondary',
				$value: '#6c757d',
				$type: 'color',
			},
		},
		spacing: {
			small: {
				name: 'tokens.spacing.small',
				$value: '8px',
				$type: 'dimension',
			},
			medium: {
				name: 'tokens.spacing.medium',
				$value: '16px',
				$type: 'dimension',
			},
		},
	},
};

// Mock data with $type: 'fontSize'
export const mockJsonDataWithFontSizeType: Record<string, unknown> = {
	semantic: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'font-size': {
			body: {
				s: {
					name: 'semantic.font-size.body.s',
					$value: '14px',
					$type: 'fontSize',
				},
			},
		},
	},
};

export const mockJsonDataWithFontSizeTypeExpected: Record<string, unknown> = {
	semantic: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'font-size': {
			body: {
				s: {
					name: 'semantic.font-size.body.s',
					$value: '0.875rem',
					$type: 'fontSize',
				},
			},
		},
	},
};

// Mock data with $type: 'lineHeight'
// Mock data with $type: 'lineHeight'
export const mockJsonDataWithLineHeightType: Record<string, unknown> = {
	semantic: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'line-height': {
			body: {
				s: {
					name: 'semantic.line-height.body.s',
					$value: '20px',
					$type: 'number',
					$extensions: {
						[tokenStudioTokenExtensionPropertyName]: {
							originalType: 'lineHeights',
						},
					},
				},
			},
		},
	},
};

export const mockJsonDataWithLineHeightTypeExpected: Record<string, unknown> = {
	semantic: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'line-height': {
			body: {
				s: {
					name: 'semantic.line-height.body.s',
					$value: '1.25rem',
					$type: 'number',
					$extensions: {
						[tokenStudioTokenExtensionPropertyName]: {
							originalType: 'lineHeights',
						},
					},
				},
			},
		},
	},
};

// Mock data with originalType: 'letterSpacing'
export const mockJsonDataWithLetterSpacingOriginalType: Record<string, unknown> = {
	semantic: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'letter-spacing': {
			headline: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'3xl': {
					name: 'semantic.letter-spacing.headline.3xl',
					$value: '-0.5px',
					$type: 'dimension',
					$extensions: {
						[tokenStudioTokenExtensionPropertyName]: {
							originalType: 'letterSpacing',
						},
					},
				},
			},
		},
	},
};

export const mockJsonDataWithLetterSpacingOriginalTypeExpected: Record<string, unknown> = {
	semantic: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'letter-spacing': {
			headline: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'3xl': {
					name: 'semantic.letter-spacing.headline.3xl',
					$value: '-0.03125rem',
					$type: 'dimension',
					$extensions: {
						[tokenStudioTokenExtensionPropertyName]: {
							originalType: 'letterSpacing',
						},
					},
				},
			},
		},
	},
};

// Mock data with negative px values
export const mockJsonDataNegative: Record<string, unknown> = {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'letter-spacing': {
		name: 'letter-spacing',
		$value: '-0.5px',
		$type: 'dimension',
	},
};

export const mockJsonDataNegativeExpected: Record<string, unknown> = {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'letter-spacing': {
		name: 'letter-spacing',
		$value: '-0.03125rem',
		$type: 'dimension',
	},
};

// Mock data with non-typography $type (should not convert)
export const mockJsonDataWithNonTypographyType: Record<string, unknown> = {
	colors: {
		primary: {
			$value: '16px',
			$type: 'dimension',
		},
	},
};

// Mock data to test nested object traversal in the else if branch
export const mockJsonDataNestedObjectWithoutType: Record<string, unknown> = {
	component: {
		spacing: {
			padding: {
				$value: '16px',
			},
		},
	},
};

// Mock data with multiple types in one structure to test all branches
export const mockJsonDataWithAllTypographyTypes: Record<string, unknown> = {
	semantic: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'font-size': {
			body: {
				s: {
					name: 'semantic.font-size.body.s',
					$value: '14px',
					$type: 'fontSize',
				},
			},
		},
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'line-height': {
			body: {
				s: {
					name: 'semantic.line-height.body.s',
					$value: '20px',
					$type: 'number',
					$extensions: {
						[tokenStudioTokenExtensionPropertyName]: {
							originalType: 'lineHeights',
						},
					},
				},
			},
		},
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'letter-spacing': {
			headline: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'3xl': {
					name: 'semantic.letter-spacing.headline.3xl',
					$value: '-0.5px',
					$type: 'dimension',
					$extensions: {
						[tokenStudioTokenExtensionPropertyName]: {
							originalType: 'letterSpacing',
						},
					},
				},
			},
		},
	},
};

export const mockJsonDataWithAllTypographyTypesExpected: Record<string, unknown> = {
	semantic: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'font-size': {
			body: {
				s: {
					name: 'semantic.font-size.body.s',
					$value: '0.875rem',
					$type: 'fontSize',
				},
			},
		},
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'line-height': {
			body: {
				s: {
					name: 'semantic.line-height.body.s',
					$value: '1.25rem',
					$type: 'number',
					$extensions: {
						[tokenStudioTokenExtensionPropertyName]: {
							originalType: 'lineHeights',
						},
					},
				},
			},
		},
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'letter-spacing': {
			headline: {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				'3xl': {
					name: 'semantic.letter-spacing.headline.3xl',
					$value: '-0.03125rem',
					$type: 'dimension',
					$extensions: {
						[tokenStudioTokenExtensionPropertyName]: {
							originalType: 'letterSpacing',
						},
					},
				},
			},
		},
	},
};

// Mock data with null values in arrays
export const mockJsonDataWithNullInArray: Record<string, unknown> = {
	typography: [
		null,
		{
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'font-size': {
				name: 'typography[1].font-size',
				$value: '16px',
				$type: 'dimension',
			},
		},
	],
};

export const mockJsonDataWithNullInArrayExpected: Record<string, unknown> = {
	typography: [
		null,
		{
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'font-size': {
				name: 'typography[1].font-size',
				$value: '16px',
				$type: 'dimension',
			},
		},
	],
};

// Mock data with invalid studio.tokens (not an object) - should not convert
export const mockJsonDataWithInvalidStudioTokens: Record<string, unknown> = {
	semantic: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'font-size': {
			body: {
				m: {
					name: 'semantic.font-size.body.m',
					$value: '16px',
					$type: 'fontSize',
					$extensions: {
						[tokenStudioTokenExtensionPropertyName]: 'invalid-string-value',
					},
				},
			},
		},
	},
};

export const mockJsonDataWithInvalidStudioTokensExpected: Record<string, unknown> = {
	semantic: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'font-size': {
			body: {
				m: {
					name: 'semantic.font-size.body.m',
					$value: '1rem',
					$type: 'fontSize',
					$extensions: {
						[tokenStudioTokenExtensionPropertyName]: 'invalid-string-value',
					},
				},
			},
		},
	},
};

// Mock data with null studio.tokens - should still convert based on $type
export const mockJsonDataWithNullStudioTokens: Record<string, unknown> = {
	semantic: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'font-size': {
			body: {
				s: {
					name: 'semantic.font-size.body.s',
					$value: '14px',
					$type: 'fontSize',
					$extensions: {
						[tokenStudioTokenExtensionPropertyName]: null,
					},
				},
			},
		},
	},
};

export const mockJsonDataWithNullStudioTokensExpected: Record<string, unknown> = {
	semantic: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'font-size': {
			body: {
				s: {
					name: 'semantic.font-size.body.s',
					$value: '0.875rem',
					$type: 'fontSize',
					$extensions: {
						[tokenStudioTokenExtensionPropertyName]: null,
					},
				},
			},
		},
	},
};

// Mock data with null studio.tokens and no fontSize $type - should NOT convert
export const mockJsonDataWithNullStudioTokensNoFontSizeType: Record<string, unknown> = {
	semantic: {
		spacing: {
			m: {
				$value: '16px',
				$type: 'dimension',
				$extensions: {
					[tokenStudioTokenExtensionPropertyName]: null,
				},
			},
		},
	},
};

// Mock data with nested null values
export const mockJsonDataWithNullValues: Record<string, unknown> = {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'font-size': {
		name: 'font-size',
		$value: '16px',
		$type: 'dimension',
	},
	nested: {
		color: {
			name: 'nested.color',
			$value: '#000',
			$type: 'color',
		},
	},
};

// Function to create an object with inherited properties
export const createObjectWithInheritedProps = (): Record<string, unknown> => {
	const proto = { inherited: 'value' };
	const obj = Object.create(proto) as Record<string, unknown>;
	obj['font-size'] = {
		name: 'font-size',
		$value: '16px',
		$type: 'dimension',
	};
	return obj;
};

export const mockJsonDataWithInheritedPropsExpected: Record<string, unknown> = {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	'font-size': {
		name: 'font-size',
		$value: '1rem',
		$type: 'dimension',
	},
};
