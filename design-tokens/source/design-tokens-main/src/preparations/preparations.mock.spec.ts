/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable quote-props */

import { tokenStudioTokenExtensionPropertyName } from '../shared/index.js';

// Mock data for runPreparations tests
export const mockTokensSsotFolder = 'tokens/a1';
export const mockCustomTokenSsotExtensionFolderPath = '/custom/tokens';

// Error scenarios
export const mockCheckForTokenSetExtensionError = new Error('Token set extension check failed');
export const mockLoadTokenDataError = new Error('Failed to load token data');
export const mockRunTokenPreparationsError = new Error('Token preparations failed');

export const mockFigmaTokenFullFilePaths = [
	'tokens/core/colors.json',
	'tokens/core/dimensions.json',
	'tokens/core/grid.json',
	'tokens/core/motion.json',
	'tokens/core/typography.json',
	'tokens/semantic/color-schemes/light.json',
	'tokens/semantic/color-schemes/dark.json',
	'tokens/semantic/densities/spacious.json',
	'tokens/semantic/densities/spacious-m.json',
	'tokens/semantic/densities/spacious-l.json',
	'tokens/semantic/densities/compact.json',
	'tokens/semantic/densities/compact-m.json',
	'tokens/semantic/densities/compact-l.json',
	'tokens/semantic/densities/dense.json',
	'tokens/semantic/densities/dense-m.json',
	'tokens/semantic/densities/dense-l.json',
	'tokens/semantic/motion/lively.json',
	'tokens/semantic/motion/minimal.json',
	'tokens/semantic/combined/composites.json',
	'tokens/partials/default/icon.json',
	'tokens/partials/default/indicator.json',
	'tokens/partials/default/info.json',
	'tokens/partials/default/input-field.json',
	'tokens/components/default/accordion.json',
	'tokens/components/default/avatar.json',
	'tokens/components/default/badge.json',
	'tokens/components/default/button.json',
	'tokens/components/default/divider.json',
	'tokens/components/default/dropdown.json',
	'tokens/components/default/form-field.json',
	'tokens/components/default/list.json',
	'tokens/components/default/radio-button.json',
	'tokens/components/default/segmented-control.json',
	'tokens/components/default/switch.json',
	'tokens/components/default/tab.json',
	'tokens/components/default/tag.json',
	'tokens/components/default/tile.json',
	'tokens/components/default/toggle-button.json',
	'tokens/components/default/tab-m.json',
	'tokens/$metadata.json',
	'tokens/$themes.json',
];

export const mockAllTokensPerModifier = {
	core: {
		color: {
			blue: {
				'100': {
					type: 'color',
					value: '#F0F7FC',
				},
				'200': {
					type: 'color',
					value: '#DBEAF5',
				},
				'300': {
					type: 'color',
					value: '#C3D7E9',
				},
				'400': {
					type: 'color',
					value: '#ADC6DC',
				},
				'500': {
					type: 'color',
					value: '#8DAFD1',
				},
				'600': {
					type: 'color',
					value: '#6590BD',
				},
				'700': {
					type: 'color',
					value: '#3F72B1',
				},
				'800': {
					type: 'color',
					value: '#1A5393',
				},
				'900': {
					type: 'color',
					value: '#003781',
				},
				'1000': {
					type: 'color',
					value: '#00266d',
				},
				'1100': {
					type: 'color',
					value: '#001955',
				},
				'1200': {
					type: 'color',
					value: '#000f39',
				},
			},
			aqua: {
				'100': {
					type: 'color',
					value: '#EEF6F6',
				},
				'200': {
					type: 'color',
					value: '#DFEFF2',
				},
				'300': {
					type: 'color',
					value: '#B2DCEA',
				},
				'400': {
					type: 'color',
					value: '#83CBE5',
				},
				'500': {
					type: 'color',
					value: '#51B6DD',
				},
				'600': {
					type: 'color',
					value: '#0E98CC',
				},
				'700': {
					type: 'color',
					value: '#0377A8',
				},
				'800': {
					type: 'color',
					value: '#005885',
				},
				'900': {
					type: 'color',
					value: '#003D63',
				},
				'1000': {
					type: 'color',
					value: '#002F4B',
				},
				'1100': {
					type: 'color',
					value: '#001E32',
				},
				'1200': {
					type: 'color',
					value: '#00111D',
				},
			},
			teal: {
				'100': {
					type: 'color',
					value: '#E3F8F8',
				},
				'200': {
					type: 'color',
					value: '#C2F0EF',
				},
				'300': {
					type: 'color',
					value: '#8DE3E2',
				},
				'400': {
					type: 'color',
					value: '#6DD2D0',
				},
				'500': {
					type: 'color',
					value: '#46BAB8',
				},
				'600': {
					type: 'color',
					value: '#1F9B9E',
				},
				'700': {
					type: 'color',
					value: '#057C85',
				},
				'800': {
					type: 'color',
					value: '#005C64',
				},
				'900': {
					type: 'color',
					value: '#014248',
				},
				'1000': {
					type: 'color',
					value: '#013134',
				},
				'1100': {
					type: 'color',
					value: '#012325',
				},
				'1200': {
					type: 'color',
					value: '#001213',
				},
			},
			green: {
				'100': {
					type: 'color',
					value: '#E7F9EB',
				},
				'200': {
					type: 'color',
					value: '#C0F3D1',
				},
				'300': {
					type: 'color',
					value: '#9AE5B4',
				},
				'400': {
					type: 'color',
					value: '#68D190',
				},
				'500': {
					type: 'color',
					value: '#34C270',
				},
				'600': {
					type: 'color',
					value: '#10A251',
				},
				'700': {
					type: 'color',
					value: '#05813C',
				},
				'800': {
					type: 'color',
					value: '#006028',
				},
				'900': {
					type: 'color',
					value: '#00450F',
				},
				'1000': {
					type: 'color',
					value: '#023409',
				},
				'1100': {
					type: 'color',
					value: '#052409',
				},
				'1200': {
					type: 'color',
					value: '#071108',
				},
			},
			yellow: {
				'100': {
					type: 'color',
					value: '#FEF5CD',
				},
				'200': {
					type: 'color',
					value: '#FBE6A7',
				},
				'300': {
					type: 'color',
					value: '#FAD066',
				},
				'400': {
					type: 'color',
					value: '#FAB600',
				},
				'500': {
					type: 'color',
					value: '#DBA103',
				},
				'600': {
					type: 'color',
					value: '#B48602',
				},
				'700': {
					type: 'color',
					value: '#8F6A00',
				},
				'800': {
					type: 'color',
					value: '#6A4E00',
				},
				'900': {
					type: 'color',
					value: '#4B3701',
				},
				'1000': {
					type: 'color',
					value: '#382A04',
				},
				'1100': {
					type: 'color',
					value: '#281D05',
				},
				'1200': {
					type: 'color',
					value: '#130E03',
				},
			},
			orange: {
				'100': {
					type: 'color',
					value: '#FBF3E9',
				},
				'200': {
					type: 'color',
					value: '#FCE2C8',
				},
				'300': {
					type: 'color',
					value: '#FECA91',
				},
				'400': {
					type: 'color',
					value: '#FFA456',
				},
				'500': {
					type: 'color',
					value: '#FF8939',
				},
				'600': {
					type: 'color',
					value: '#EA6308',
					description: 'Orange',
				},
				'700': {
					type: 'color',
					value: '#C34800',
					description: 'Orange',
				},
				'800': {
					type: 'color',
					value: '#933400',
					description: 'Orange',
				},
				'900': {
					type: 'color',
					value: '#682500',
				},
				'1000': {
					type: 'color',
					value: '#4E1D01',
				},
				'1100': {
					type: 'color',
					value: '#361503',
				},
				'1200': {
					type: 'color',
					value: '#1B0A03',
				},
			},
			red: {
				'100': {
					type: 'color',
					value: '#FBF1F1',
				},
				'200': {
					type: 'color',
					value: '#FAE2E3',
				},
				'300': {
					type: 'color',
					value: '#FACAC6',
				},
				'400': {
					type: 'color',
					value: '#FEA5AA',
				},
				'500': {
					type: 'color',
					value: '#FF808A',
				},
				'600': {
					type: 'color',
					value: '#FD4369',
				},
				'700': {
					type: 'color',
					value: '#DD0A42',
				},
				'800': {
					type: 'color',
					value: '#AA001B',
				},
				'900': {
					type: 'color',
					value: '#7C0007',
				},
				'1000': {
					type: 'color',
					value: '#5C0906',
				},
				'1100': {
					type: 'color',
					value: '#3F0C06',
				},
				'1200': {
					type: 'color',
					value: '#1F0804',
				},
			},
			purple: {
				'100': {
					type: 'color',
					value: '#FDF1F7',
					description: 'Purple',
				},
				'200': {
					type: 'color',
					value: '#F9E1ED',
					description: 'Purple',
				},
				'300': {
					type: 'color',
					value: '#F4C9DF',
					description: 'Purple',
				},
				'400': {
					type: 'color',
					value: '#EEAECB',
					description: 'Purple',
				},
				'500': {
					type: 'color',
					value: '#E78EB3',
					description: 'Purple',
				},
				'600': {
					type: 'color',
					value: '#DC6597',
					description: 'Purple',
				},
				'700': {
					type: 'color',
					value: '#BD417F',
					description: 'Purple',
				},
				'800': {
					type: 'color',
					value: '#962165',
					description: 'Purple',
				},
				'900': {
					type: 'color',
					value: '#720849',
				},
				'1000': {
					type: 'color',
					value: '#5B0037',
					description: 'Purple',
				},
				'1100': {
					type: 'color',
					value: '#430023',
					description: 'Purple',
				},
				'1200': {
					type: 'color',
					value: '#2A0010',
					description: 'Purple',
				},
			},
			gray: {
				'100': {
					type: 'color',
					value: '#f4f4f5',
				},
				'200': {
					type: 'color',
					value: '#e9eaeb',
				},
				'300': {
					type: 'color',
					value: '#d7d9db',
				},
				'400': {
					type: 'color',
					value: '#c0c4c7',
				},
				'500': {
					type: 'color',
					value: '#a7acb1',
				},
				'600': {
					type: 'color',
					value: '#888f96',
				},
				'700': {
					type: 'color',
					value: '#68727b',
				},
				'800': {
					type: 'color',
					value: '#495560',
				},
				'900': {
					type: 'color',
					value: '#2f3c49',
				},
				'1000': {
					type: 'color',
					value: '#202d3b',
				},
				'1100': {
					type: 'color',
					value: '#12202e',
				},
				'1200': {
					type: 'color',
					value: '#041321',
				},
			},
			darkblue: {
				'100': {
					value: '#f2f4f9',
					type: 'color',
				},
				'200': {
					value: '#e4eaf3',
					type: 'color',
				},
				'300': {
					value: '#cfd9ea',
					type: 'color',
				},
				'400': {
					value: '#b6c5de',
					type: 'color',
				},
				'500': {
					value: '#98accf',
					type: 'color',
				},
				'600': {
					value: '#758fbb',
					type: 'color',
				},
				'700': {
					value: '#5371a4',
					type: 'color',
				},
				'800': {
					value: '#335389',
					type: 'color',
				},
				'900': {
					value: '#1c3a6c',
					type: 'color',
				},
				'1000': {
					value: '#122b54',
					type: 'color',
				},
				'1100': {
					value: '#0F1F3A',
					type: 'color',
				},
				'1200': {
					value: '#091223',
					type: 'color',
				},
			},
			inverse: {
				'100': {
					value: '{core.color.white}',
					type: 'color',
					$extensions: {
						[tokenStudioTokenExtensionPropertyName]: {
							modify: {
								type: 'alpha',
								value: '1',
								space: 'srgb',
							},
						},
					},
				},
				'200': {
					value: '{core.color.white}',
					type: 'color',
					$extensions: {
						[tokenStudioTokenExtensionPropertyName]: {
							modify: {
								type: 'alpha',
								value: '0.76',
								space: 'srgb',
							},
						},
					},
				},
				'300': {
					value: '{core.color.white}',
					type: 'color',
					$extensions: {
						[tokenStudioTokenExtensionPropertyName]: {
							modify: {
								type: 'alpha',
								value: '0.56',
								space: 'srgb',
							},
						},
					},
				},
				'400': {
					value: '{core.color.white}',
					type: 'color',
					$extensions: {
						[tokenStudioTokenExtensionPropertyName]: {
							modify: {
								type: 'alpha',
								value: '0.40',
								space: 'srgb',
							},
						},
					},
				},
				'500': {
					value: '{core.color.white}',
					type: 'color',
					$extensions: {
						[tokenStudioTokenExtensionPropertyName]: {
							modify: {
								type: 'alpha',
								value: '0.27',
								space: 'srgb',
							},
						},
					},
				},
				'600': {
					value: '{core.color.white}',
					type: 'color',
					$extensions: {
						[tokenStudioTokenExtensionPropertyName]: {
							modify: {
								type: 'alpha',
								value: '0.17',
								space: 'srgb',
							},
						},
					},
				},
				'700': {
					value: '{core.color.white}',
					type: 'color',
					$extensions: {
						[tokenStudioTokenExtensionPropertyName]: {
							modify: {
								type: 'alpha',
								value: '0.10',
								space: 'srgb',
							},
						},
					},
				},
				'800': {
					value: '{core.color.white}',
					type: 'color',
					$extensions: {
						[tokenStudioTokenExtensionPropertyName]: {
							modify: {
								type: 'alpha',
								value: '0.04',
								space: 'srgb',
							},
						},
					},
				},
				'900': {
					value: '{core.color.white}',
					type: 'color',
					$extensions: {
						[tokenStudioTokenExtensionPropertyName]: {
							modify: {
								type: 'alpha',
								value: '0',
								space: 'srgb',
							},
						},
					},
				},
				'1000': {
					value: '{core.color.black}',
					type: 'color',
					$extensions: {
						[tokenStudioTokenExtensionPropertyName]: {
							modify: {
								type: 'alpha',
								value: '0.12',
								space: 'srgb',
							},
						},
					},
				},
				'1100': {
					value: '{core.color.black}',
					type: 'color',
					$extensions: {
						[tokenStudioTokenExtensionPropertyName]: {
							modify: {
								type: 'alpha',
								value: '0.31',
								space: 'srgb',
							},
						},
					},
				},
				'1200': {
					value: '{core.color.black}',
					type: 'color',
					$extensions: {
						[tokenStudioTokenExtensionPropertyName]: {
							modify: {
								type: 'alpha',
								value: '0.62',
								space: 'srgb',
							},
						},
					},
				},
			},
			black: {
				type: 'color',
				value: '#000000',
			},
			white: {
				type: 'color',
				value: '#FFFFFF',
			},
		},
		'border-position': {
			outside: {
				type: 'other',
				value: 'outside',
			},
			inside: {
				type: 'other',
				value: 'inside',
			},
		},
		dimension: {
			'0': {
				type: 'dimension',
				value: '({core.dimension.100} - {core.dimension.100})',
			},
			'25': {
				type: 'dimension',
				value: '({core.dimension.100} * 0.25)',
			},
			'50': {
				type: 'dimension',
				value: '({core.dimension.100} * 0.5)',
			},
			'75': {
				type: 'dimension',
				value: '({core.dimension.100} * 0.75)',
			},
			'100': {
				type: 'dimension',
				value: '({core.font-size.user-agent} * 0.25)',
			},
			'150': {
				type: 'dimension',
				value: '({core.dimension.100} * 1.5)',
			},
			'200': {
				type: 'dimension',
				value: '({core.dimension.100} * 2)',
			},
			'250': {
				type: 'dimension',
				value: '({core.dimension.100} * 2.5)',
			},
			'300': {
				type: 'dimension',
				value: '({core.dimension.100} * 3)',
			},
			'350': {
				type: 'dimension',
				value: '({core.dimension.100} * 3.5)',
			},
			'400': {
				type: 'dimension',
				value: '({core.dimension.100} * 4)',
			},
			'450': {
				type: 'dimension',
				value: '({core.dimension.100} * 4.5)',
			},
			'500': {
				type: 'dimension',
				value: '({core.dimension.100} * 5)',
			},
			'550': {
				type: 'dimension',
				value: '({core.dimension.100} * 5.5)',
			},
			'600': {
				type: 'dimension',
				value: '({core.dimension.100} * 6)',
			},
			'650': {
				type: 'dimension',
				value: '({core.dimension.100} * 6.5)',
			},
			'700': {
				type: 'dimension',
				value: '({core.dimension.100} * 7)',
			},
			'800': {
				type: 'dimension',
				value: '({core.dimension.100} * 8)',
			},
			'900': {
				type: 'dimension',
				value: '({core.dimension.100} * 9)',
			},
			'1000': {
				type: 'dimension',
				value: '({core.dimension.100} * 10)',
			},
			'1200': {
				type: 'dimension',
				value: '{core.dimension.100} * 12',
			},
			'1300': {
				type: 'dimension',
				value: '({core.dimension.100} * 13)',
			},
			'1400': {
				type: 'dimension',
				value: '({core.dimension.100} * 14)',
			},
			'1500': {
				type: 'dimension',
				value: '({core.dimension.100} * 15)',
			},
			'1600': {
				type: 'dimension',
				value: '({core.dimension.100} * 16)',
			},
			'2000': {
				type: 'dimension',
				value: '({core.dimension.100} * 20)',
			},
			'2400': {
				type: 'dimension',
				value: '({core.dimension.100} * 24)',
			},
			'4000': {
				type: 'dimension',
				value: '({core.dimension.100} * 40)',
			},
		},
		'border-width': {
			'100': {
				type: 'borderWidth',
				value: '{core.dimension.25}',
			},
			'200': {
				type: 'borderWidth',
				value: '{core.dimension.50}',
			},
			'300': {
				type: 'borderWidth',
				value: '{core.dimension.75}',
			},
			'400': {
				type: 'borderWidth',
				value: '{core.dimension.100}',
			},
		},
		'border-radius': {
			'0': {
				type: 'borderRadius',
				value: '{core.dimension.0}',
			},
			'50': {
				type: 'borderRadius',
				value: '{core.dimension.100}',
			},
			'100': {
				type: 'borderRadius',
				value: '{core.dimension.200}',
			},
			'150': {
				type: 'borderRadius',
				value: '{core.dimension.300}',
			},
			'200': {
				type: 'borderRadius',
				value: '{core.dimension.400}',
			},
		},
		scaling: {
			'25': {
				type: 'number',
				value: '0.95',
			},
			'50': {
				type: 'number',
				value: '0.975',
			},
			'75': {
				type: 'number',
				value: '0.99',
			},
			'100': {
				type: 'number',
				value: '1',
			},
		},
		breakpoint: {
			xs: {
				type: 'sizing',
				value: '0',
			},
			s: {
				type: 'sizing',
				value: '320',
			},
			m: {
				type: 'sizing',
				value: '704',
			},
			l: {
				type: 'sizing',
				value: '992',
			},
			xl: {
				type: 'sizing',
				value: '1280',
			},
			'2xl': {
				type: 'sizing',
				value: '1472',
			},
			'3xl': {
				type: 'sizing',
				value: '1760',
			},
			'max-width': {
				xs: {
					type: 'sizing',
					value: '319',
					description: 'Used for non-mobile first and other tool scenarios',
				},
				s: {
					type: 'sizing',
					value: '703',
					description: 'Used for non-mobile first and other tool scenarios',
				},
				m: {
					type: 'sizing',
					value: '991',
					description: 'Used for non-mobile first and other tool scenarios',
				},
				l: {
					type: 'sizing',
					value: '1279',
					description: 'Used for non-mobile first and other tool scenarios',
				},
				xl: {
					type: 'sizing',
					value: '1471',
					description: 'Used for non-mobile first and other tool scenarios',
				},
				'2xl': {
					type: 'sizing',
					value: '1759',
					description: 'Used for non-mobile first and other tool scenarios',
				},
			},
		},
		grid: {
			'column-gap': {
				xs: {
					type: 'spacing',
					value: '{core.dimension.400}',
					description: 'Space between vertical grid columns',
				},
				s: {
					type: 'spacing',
					value: '{core.dimension.400}',
					description: 'Space between vertical grid columns',
				},
				m: {
					type: 'spacing',
					value: '{core.dimension.800}',
					description: 'Space between vertical grid columns',
				},
				l: {
					type: 'spacing',
					value: '{core.dimension.800}',
					description: 'Space between vertical grid columns',
				},
				xl: {
					type: 'spacing',
					value: '{core.dimension.800}',
					description: 'Space between vertical grid columns',
				},
				'2xl': {
					type: 'spacing',
					value: '{core.dimension.800}',
					description: 'Space between vertical grid columns',
				},
				'3xl': {
					type: 'spacing',
					value: '{core.dimension.800}',
					description: 'Space between vertical grid columns',
				},
			},
			inset: {
				horizontal: {
					xs: {
						type: 'spacing',
						value: '{core.dimension.600}',
						description: 'Left and right spacing of the grid',
					},
					s: {
						type: 'spacing',
						value: '{core.dimension.600}',
						description: 'Left and right spacing of the grid',
					},
					m: {
						type: 'spacing',
						value: '{core.dimension.1200}',
						description: 'Left and right spacing of the grid',
					},
					l: {
						type: 'spacing',
						value: '{core.dimension.1600}',
						description: 'Left and right spacing of the grid',
					},
					xl: {
						type: 'spacing',
						value: '{core.dimension.1600}',
						description: 'Left and right spacing of the grid',
					},
					'2xl': {
						type: 'spacing',
						value: '{core.dimension.1600}',
						description: 'Left and right spacing of the grid',
					},
					'3xl': {
						type: 'spacing',
						value: '{core.dimension.1600}',
						description: 'Left and right spacing of the grid',
					},
				},
			},
			'max-width': {
				type: 'sizing',
				value: '1344',
				description:
					'Wraps the content area of a website into a max-width. Recommended usage is from core-breakpoint-2xl on (with margin: 0 auto), because: core-breakpoint-2xl = core-grid-max-width + 2 * core.grid.margin-2xl',
			},
			baseline: {
				value: '4',
				type: 'sizing',
				description:
					'Definition of the baseline grid size (horizontal grid rows). Main usage is to align the lineheight of typographic styles to a definined vertical rythm.',
			},
		},
		motion: {
			duration: {
				'0': {
					value: '0s',
					type: 'other',
				},
				'100': {
					value: '0.1s',
					type: 'other',
				},
				'250': {
					value: '0.25s',
					type: 'other',
				},
				'500': {
					value: '0.5s',
					type: 'other',
				},
			},
		},
		'font-family': {
			primary: {
				type: 'fontFamilies',
				value: 'Allianz Neo',
			},
		},
		'font-weight': {
			'100': {
				type: 'fontWeights',
				value: '400',
				description: 'Regular',
			},
			'150': {
				type: 'fontWeights',
				value: '600',
				description: 'Semi-Bold',
			},
			'200': {
				type: 'fontWeights',
				value: '700',
				description: 'Bold',
			},
		},
		'font-size': {
			'user-agent': {
				type: 'fontSizes',
				value: '16',
				description: `Value for 1rem based on user's browser settings`,
			},
		},
		'text-decoration': {
			none: {
				type: 'textDecoration',
				value: 'none',
			},
			underline: {
				type: 'textDecoration',
				value: 'underline',
			},
		},
		'text-case': {
			none: {
				value: 'none',
				type: 'textCase',
			},
			uppercase: {
				value: 'uppercase',
				type: 'textCase',
			},
		},
	},
	default: {
		semantic: {
			internal: {
				color: {
					elevation: {
						overlay: {
							value: '{core.color.white}',
							type: 'color',
						},
					},
					disabled: {
						base: {
							type: 'color',
							value: '{core.color.white}',
						},
						mix: {
							type: 'color',
							value: '{core.color.blue.1200}',
						},
						palette: {
							'100': {
								type: 'color',
								value: '{semantic.internal.color.disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.disabled.palette.treshhold} + {semantic.internal.color.disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.disabled.mix}',
										},
									},
								},
							},
							'200': {
								type: 'color',
								value: '{semantic.internal.color.disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.disabled.palette.treshhold} + 2 * {semantic.internal.color.disabled.palette.increment})',
											color: '{semantic.internal.color.disabled.mix}',
											space: 'srgb',
										},
									},
								},
							},
							'300': {
								type: 'color',
								value: '{semantic.internal.color.disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.disabled.palette.treshhold} + 3 * {semantic.internal.color.disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.disabled.mix}',
										},
									},
								},
							},
							'400': {
								type: 'color',
								value: '{semantic.internal.color.disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.disabled.palette.treshhold} + 4 * {semantic.internal.color.disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.disabled.mix}',
										},
									},
								},
							},
							'500': {
								type: 'color',
								value: '{semantic.internal.color.disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.disabled.palette.treshhold} + 5 * {semantic.internal.color.disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.disabled.mix}',
										},
									},
								},
							},
							'600': {
								type: 'color',
								value: '{semantic.internal.color.disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.disabled.palette.treshhold} + 6 * {semantic.internal.color.disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.disabled.mix}',
										},
									},
								},
							},
							'700': {
								type: 'color',
								value: '{semantic.internal.color.disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.disabled.palette.treshhold} + 7 * {semantic.internal.color.disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.disabled.mix}',
										},
									},
								},
							},
							'800': {
								type: 'color',
								value: '{semantic.internal.color.disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.disabled.palette.treshhold} + 8 * {semantic.internal.color.disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.disabled.mix}',
										},
									},
								},
							},
							'900': {
								type: 'color',
								value: '{semantic.internal.color.disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.disabled.palette.treshhold} + 9 * {semantic.internal.color.disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.disabled.mix}',
										},
									},
								},
							},
							'1000': {
								type: 'color',
								value: '{semantic.internal.color.disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.disabled.palette.treshhold} + 10 * {semantic.internal.color.disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.disabled.mix}',
										},
									},
								},
							},
							'1100': {
								type: 'color',
								value: '{semantic.internal.color.disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.disabled.palette.treshhold} + 11 * {semantic.internal.color.disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.disabled.mix}',
										},
									},
								},
							},
							'1200': {
								type: 'color',
								value: '{semantic.internal.color.disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.disabled.palette.treshhold} + 12 * {semantic.internal.color.disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.disabled.mix}',
										},
									},
								},
							},
							white: {
								type: 'color',
								value: '{semantic.internal.color.disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value: '{semantic.internal.color.disabled.palette.treshhold}',
											space: 'srgb',
											color: '{semantic.internal.color.disabled.mix}',
										},
									},
								},
							},
							treshhold: {
								value: '0.04',
								type: 'number',
							},
							increment: {
								value: '0.0225',
								type: 'number',
							},
						},
						'palette-inverse': {
							'100': {
								type: 'color',
								value: '{core.color.white}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'alpha',
											value: '0.3',
											a1CalcValue: '{semantic.internal.color.disabled.palette-inverse.treshhold}',
											space: 'srgb',
										},
									},
								},
							},
							'200': {
								type: 'color',
								value: '{core.color.white}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'alpha',
											value: '0.275',
											a1CalcValue:
												'({semantic.internal.color.disabled.palette-inverse.treshhold} - {semantic.internal.color.disabled.palette-inverse.increment})',
											space: 'srgb',
										},
									},
								},
							},
							'300': {
								type: 'color',
								value: '{core.color.white}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'alpha',
											value: '0.25',
											a1CalcValue:
												'({semantic.internal.color.disabled.palette-inverse.treshhold} - 2 * {semantic.internal.color.disabled.palette-inverse.increment})',
											space: 'srgb',
										},
									},
								},
							},
							'400': {
								type: 'color',
								value: '{core.color.white}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'alpha',
											value: '0.225',
											a1CalcValue:
												'({semantic.internal.color.disabled.palette-inverse.treshhold} - 3 * {semantic.internal.color.disabled.palette-inverse.increment})',
											space: 'srgb',
										},
									},
								},
							},
							'500': {
								type: 'color',
								value: '{core.color.white}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'alpha',
											value: '0.2',
											a1CalcValue:
												'({semantic.internal.color.disabled.palette-inverse.treshhold} - 4 * {semantic.internal.color.disabled.palette-inverse.increment})',
											space: 'srgb',
										},
									},
								},
							},
							'600': {
								type: 'color',
								value: '{core.color.white}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'alpha',
											value: '0.175',
											a1CalcValue:
												'({semantic.internal.color.disabled.palette-inverse.treshhold} - 5 * {semantic.internal.color.disabled.palette-inverse.increment})',
											space: 'srgb',
										},
									},
								},
							},
							'700': {
								type: 'color',
								value: '{core.color.white}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'alpha',
											value: '0.15',
											a1CalcValue:
												'({semantic.internal.color.disabled.palette-inverse.treshhold} - 6 * {semantic.internal.color.disabled.palette-inverse.increment})',
											space: 'srgb',
										},
									},
								},
							},
							'800': {
								type: 'color',
								value: '{core.color.white}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'alpha',
											value: '0.125',
											a1CalcValue:
												'({semantic.internal.color.disabled.palette-inverse.treshhold} - 7 * {semantic.internal.color.disabled.palette-inverse.increment})',
											space: 'srgb',
										},
									},
								},
							},
							'900': {
								type: 'color',
								value: '{core.color.white}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'alpha',
											value: '0.1',
											a1CalcValue:
												'({semantic.internal.color.disabled.palette-inverse.treshhold} - 8 * {semantic.internal.color.disabled.palette-inverse.increment})',
											space: 'srgb',
										},
									},
								},
							},
							'1000': {
								type: 'color',
								value: '{core.color.white}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'alpha',
											value: '0.075',
											a1CalcValue:
												'({semantic.internal.color.disabled.palette-inverse.treshhold} - 9 * {semantic.internal.color.disabled.palette-inverse.increment})',
											space: 'srgb',
										},
									},
								},
							},
							'1100': {
								type: 'color',
								value: '{core.color.white}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'alpha',
											value: '0.05',
											a1CalcValue:
												'({semantic.internal.color.disabled.palette-inverse.treshhold} - 10 * {semantic.internal.color.disabled.palette-inverse.increment})',
											space: 'srgb',
										},
									},
								},
							},
							'1200': {
								type: 'color',
								value: '{core.color.white}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'alpha',
											value: '0.025',
											a1CalcValue:
												'({semantic.internal.color.disabled.palette-inverse.treshhold} - 11 * {semantic.internal.color.disabled.palette-inverse.increment})',
											space: 'srgb',
										},
									},
								},
							},
							treshhold: {
								value: '0.3',
								type: 'number',
							},
							increment: {
								value: '0.025',
								type: 'number',
							},
						},
					},
					'on-disabled': {
						base: {
							value: '{core.color.white}',
							type: 'color',
						},
						mix: {
							value: '{core.color.blue.1200}',
							type: 'color',
						},
						palette: {
							'100': {
								type: 'color',
								value: '{semantic.internal.color.on-disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value: '{semantic.internal.color.on-disabled.palette.treshhold}',
											space: 'srgb',
											color: '{semantic.internal.color.on-disabled.mix}',
										},
									},
								},
							},
							'200': {
								type: 'color',
								value: '{semantic.internal.color.on-disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.on-disabled.palette.treshhold} - {semantic.internal.color.on-disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.on-disabled.mix}',
										},
									},
								},
							},
							'300': {
								type: 'color',
								value: '{semantic.internal.color.on-disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.on-disabled.palette.treshhold} - 2 * {semantic.internal.color.on-disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.on-disabled.mix}',
										},
									},
								},
							},
							'400': {
								type: 'color',
								value: '{semantic.internal.color.on-disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.on-disabled.palette.treshhold} - 3 * {semantic.internal.color.on-disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.on-disabled.mix}',
										},
									},
								},
							},
							'500': {
								type: 'color',
								value: '{semantic.internal.color.on-disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.on-disabled.palette.treshhold} - 4 * {semantic.internal.color.on-disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.on-disabled.mix}',
										},
									},
								},
							},
							'600': {
								type: 'color',
								value: '{semantic.internal.color.on-disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.on-disabled.palette.treshhold} - 5 * {semantic.internal.color.on-disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.on-disabled.mix}',
										},
									},
								},
							},
							'700': {
								type: 'color',
								value: '{semantic.internal.color.on-disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.on-disabled.palette.treshhold} - 6 * {semantic.internal.color.on-disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.on-disabled.mix}',
										},
									},
								},
							},
							'800': {
								type: 'color',
								value: '{semantic.internal.color.on-disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.on-disabled.palette.treshhold} - 7 * {semantic.internal.color.on-disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.on-disabled.mix}',
										},
									},
								},
							},
							'900': {
								type: 'color',
								value: '{semantic.internal.color.on-disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.on-disabled.palette.treshhold} - 8 * {semantic.internal.color.on-disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.on-disabled.mix}',
										},
									},
								},
							},
							'1000': {
								type: 'color',
								value: '{semantic.internal.color.on-disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.on-disabled.palette.treshhold} - 9 * {semantic.internal.color.on-disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.on-disabled.mix}',
										},
									},
								},
							},
							'1100': {
								type: 'color',
								value: '{semantic.internal.color.on-disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.on-disabled.palette.treshhold} - 10 * {semantic.internal.color.on-disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.on-disabled.mix}',
										},
									},
								},
							},
							'1200': {
								type: 'color',
								value: '{semantic.internal.color.on-disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.on-disabled.palette.treshhold} - 11 * {semantic.internal.color.on-disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.on-disabled.mix}',
										},
									},
								},
							},
							treshhold: {
								value: '0.4',
								type: 'number',
							},
							increment: {
								value: '0.02',
								type: 'number',
							},
						},
						'palette-inverse': {
							'100': {
								type: 'color',
								value: '{core.color.white}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'alpha',
											value: '0.15',
											a1CalcValue: '{semantic.internal.color.on-disabled.palette-inverse.treshhold}',
											space: 'srgb',
										},
									},
								},
							},
							'200': {
								type: 'color',
								value: '{core.color.white}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'alpha',
											value: '0.16',
											a1CalcValue:
												'({semantic.internal.color.on-disabled.palette-inverse.treshhold} + {semantic.internal.color.on-disabled.palette-inverse.increment})',
											space: 'srgb',
										},
									},
								},
							},
							'300': {
								type: 'color',
								value: '{core.color.white}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'alpha',
											value: '0.17',
											a1CalcValue:
												'({semantic.internal.color.on-disabled.palette-inverse.treshhold} + 2 * {semantic.internal.color.on-disabled.palette-inverse.increment})',
											space: 'srgb',
										},
									},
								},
							},
							'400': {
								type: 'color',
								value: '{core.color.white}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'alpha',
											value: '0.18',
											a1CalcValue:
												'({semantic.internal.color.on-disabled.palette-inverse.treshhold} + 3 * {semantic.internal.color.on-disabled.palette-inverse.increment})',
											space: 'srgb',
										},
									},
								},
							},
							'500': {
								type: 'color',
								value: '{core.color.white}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'alpha',
											value: '0.19',
											a1CalcValue:
												'({semantic.internal.color.on-disabled.palette-inverse.treshhold} + 4 * {semantic.internal.color.on-disabled.palette-inverse.increment})',
											space: 'srgb',
										},
									},
								},
							},
							'600': {
								type: 'color',
								value: '{core.color.white}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'alpha',
											value: '0.2',
											a1CalcValue:
												'({semantic.internal.color.on-disabled.palette-inverse.treshhold} + 5 * {semantic.internal.color.on-disabled.palette-inverse.increment})',
											space: 'srgb',
										},
									},
								},
							},
							'700': {
								type: 'color',
								value: '{core.color.white}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'alpha',
											value: '0.21',
											a1CalcValue:
												'({semantic.internal.color.on-disabled.palette-inverse.treshhold} + 6 * {semantic.internal.color.on-disabled.palette-inverse.increment})',
											space: 'srgb',
										},
									},
								},
							},
							'800': {
								type: 'color',
								value: '{core.color.white}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'alpha',
											value: '0.22',
											a1CalcValue:
												'({semantic.internal.color.on-disabled.palette-inverse.treshhold} + 7 * {semantic.internal.color.on-disabled.palette-inverse.increment})',
											space: 'srgb',
										},
									},
								},
							},
							'900': {
								type: 'color',
								value: '{core.color.white}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'alpha',
											value: '0.23',
											a1CalcValue:
												'({semantic.internal.color.on-disabled.palette-inverse.treshhold} + 8 * {semantic.internal.color.on-disabled.palette-inverse.increment})',
											space: 'srgb',
										},
									},
								},
							},
							'1000': {
								type: 'color',
								value: '{core.color.white}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'alpha',
											value: '0.24',
											a1CalcValue:
												'({semantic.internal.color.on-disabled.palette-inverse.treshhold} + 9 * {semantic.internal.color.on-disabled.palette-inverse.increment})',
											space: 'srgb',
										},
									},
								},
							},
							'1100': {
								type: 'color',
								value: '{core.color.white}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'alpha',
											value: '0.25',
											a1CalcValue:
												'({semantic.internal.color.on-disabled.palette-inverse.treshhold} + 10 * {semantic.internal.color.on-disabled.palette-inverse.increment})',
											space: 'srgb',
										},
									},
								},
							},
							'1200': {
								type: 'color',
								value: '{core.color.white}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'alpha',
											value: '0.26',
											a1CalcValue:
												'({semantic.internal.color.on-disabled.palette-inverse.treshhold} + 11 * {semantic.internal.color.on-disabled.palette-inverse.increment})',
											space: 'srgb',
										},
									},
								},
							},
							treshhold: {
								value: '0.15',
								type: 'number',
							},
							increment: {
								value: '0.01',
								type: 'number',
							},
						},
					},
					mask: {
						fade: {
							left: {
								value: 'linear-gradient(90deg, #bfff0000, #bfff00)',
								type: 'color',
							},
							right: {
								value: 'linear-gradient(-90deg, #bfff0000, #bfff00)',
								type: 'color',
							},
						},
						full: {
							value: '#bfff00',
							type: 'color',
						},
					},
				},
				opacity: {
					elevation: {
						overlay: {
							'100': {
								value: '0',
								type: 'opacity',
							},
							'200': {
								value: '0',
								type: 'opacity',
							},
							'300': {
								value: '0',
								type: 'opacity',
							},
							'400': {
								value: '0',
								type: 'opacity',
							},
							'500': {
								value: '0',
								type: 'opacity',
							},
						},
						shadow: {
							core: {
								value: '0.16',
								type: 'opacity',
							},
							cast: {
								value: '0.12',
								type: 'opacity',
							},
						},
					},
				},
				spacing: {
					modifier: {
						linear: {
							'25': {
								type: 'number',
								value: '({core.dimension.25} * {semantic.internal.spacing.modifier.linear.factor})',
							},
							'50': {
								type: 'number',
								value: '({core.dimension.50} * {semantic.internal.spacing.modifier.linear.factor})',
							},
							'100': {
								type: 'number',
								value: '({core.dimension.100} * {semantic.internal.spacing.modifier.linear.factor})',
							},
							'200': {
								type: 'number',
								value: '({core.dimension.200} * {semantic.internal.spacing.modifier.linear.factor})',
							},
							'300': {
								type: 'number',
								value: '({core.dimension.300} * {semantic.internal.spacing.modifier.linear.factor})',
							},
							factor: {
								value: '0',
								type: 'number',
							},
						},
						'clamp-larger': {
							'25': {
								type: 'number',
								value: '({core.dimension.25} * {semantic.internal.spacing.modifier.clamp-larger.factor})',
							},
							'50': {
								type: 'number',
								value: '({core.dimension.50} * {semantic.internal.spacing.modifier.clamp-larger.factor})',
							},
							'100': {
								type: 'number',
								value: '({core.dimension.100} * {semantic.internal.spacing.modifier.clamp-larger.factor})',
							},
							'200': {
								type: 'number',
								value: '({core.dimension.200} * {semantic.internal.spacing.modifier.clamp-larger.factor})',
							},
							'300': {
								type: 'number',
								value: '({core.dimension.300} * {semantic.internal.spacing.modifier.clamp-larger.factor})',
							},
							factor: {
								value: '0',
								type: 'number',
							},
						},
						'clamp-smaller': {
							'25': {
								type: 'number',
								value: '({core.dimension.25} * {semantic.internal.spacing.modifier.clamp-smaller.factor})',
							},
							'50': {
								type: 'number',
								value: '({core.dimension.50} * {semantic.internal.spacing.modifier.clamp-smaller.factor})',
							},
							'100': {
								type: 'number',
								value: '({core.dimension.100} * {semantic.internal.spacing.modifier.clamp-smaller.factor})',
							},
							'200': {
								type: 'number',
								value: '({core.dimension.200} * {semantic.internal.spacing.modifier.clamp-smaller.factor})',
							},
							'300': {
								type: 'number',
								value: '({core.dimension.300} * {semantic.internal.spacing.modifier.clamp-smaller.factor})',
							},
							factor: {
								value: '0',
								type: 'number',
							},
						},
					},
				},
				'font-size': {
					base: {
						value: '({core.font-size.user-agent} * 1.125)',
						type: 'fontSizes',
					},
					'shrink-ratio': {
						body: {
							value: '1.15',
							type: 'number',
							description: 'Factor for font size decrease based on the previous calculated font size',
						},
						utility: {
							value: '1.15',
							type: 'number',
							description: 'Factor for font size decrease based on the previous calculated font size',
						},
						headline: {
							value: '1.15',
							type: 'number',
							description: 'Factor for font size decrease based on the previous calculated font size',
						},
					},
					'growth-ratio': {
						body: {
							value: '1.2',
							type: 'number',
							description: 'Factor for font size increase based on the previous calculated font size',
						},
						utility: {
							value: '1.105',
							type: 'number',
							description: 'Factor for font size increase based on the previous calculated font size',
						},
						headline: {
							value: '1.2',
							type: 'number',
							description: 'Factor for font size increase based on the previous calculated font size',
						},
					},
				},
				'line-height': {
					cushion: {
						body: {
							value: '6',
							type: 'number',
							description:
								'"cushion" relates to the 2 * 2px (or any other value) concept from https://kittygiraudel.com/2020/05/18/using-calc-to-figure-out-optimal-line-height/',
						},
						utility: {
							value: '4',
							type: 'number',
							description:
								'"cushion" relates to the 2 * 2px (or any other value) concept from https://kittygiraudel.com/2020/05/18/using-calc-to-figure-out-optimal-line-height/',
						},
						headline: {
							value: '6',
							type: 'number',
							description:
								'"cushion" relates to the 2 * 2px (or any other value) concept from https://kittygiraudel.com/2020/05/18/using-calc-to-figure-out-optimal-line-height/',
						},
					},
					factor: {
						value: '0.92',
						type: 'number',
						description:
							'"factor" relates to the 2ex concept from https://kittygiraudel.com/2020/05/18/using-calc-to-figure-out-optimal-line-height/',
					},
				},
				'font-weight': {
					headline: {
						smaller: {
							value: '{core.font-weight.200}',
							type: 'fontWeights',
						},
						larger: {
							value: '{core.font-weight.150}',
							type: 'fontWeights',
						},
					},
					treshhold: {
						value: '28',
						type: 'number',
						description:
							'Treshhold describes the concept to move from bold to semibold headlines at a certrain treshhold (font size 28 and larger)',
					},
				},
				'letter-spacing': {
					base: {
						value: '0',
						type: 'letterSpacing',
					},
					increment: {
						value: '0.5',
						type: 'number',
						description: 'Increment is the value the letter spacing gets reduced every time a treshhold is reached',
					},
					treshhold: {
						value: '36',
						type: 'number',
						description: 'Letter spacing treshhold is a concept to decrease the letter spacing every 36 font sizes by an increment',
					},
				},
				grid: {
					baseline: {
						body: {
							value: '({core.grid.baseline} / 2)',
							type: 'sizing',
							description: 'Baseline grid parameters for body text style',
						},
						utility: {
							value: '{core.grid.baseline}',
							type: 'sizing',
							description: 'Baseline grid parameters for utility text style',
						},
						headline: {
							value: '({core.grid.baseline} / 2)',
							type: 'sizing',
							description: 'Baseline grid parameters for headline text style',
						},
					},
				},
				'border-radius': {
					focus: {
						s: {
							type: 'borderRadius',
							value: '({core.border-radius.50} + {semantic.spacing.focus.offset})',
						},
						m: {
							type: 'borderRadius',
							value: '({semantic.dimension.linear-25.200} + {semantic.spacing.focus.offset})',
						},
						l: {
							type: 'borderRadius',
							value: '({semantic.dimension.linear-50.300} + {semantic.spacing.focus.offset})',
						},
					},
				},
				contained: {
					ratio: {
						icon: {
							value: '0.55',
							type: 'number',
						},
						text: {
							value: '0.45',
							type: 'number',
						},
					},
				},
			},
			color: {
				background: {
					default: {
						value: '{core.color.white}',
						type: 'color',
					},
					'default-inverse': {
						value: '{core.color.darkblue.1000}',
						type: 'color',
					},
				},
				brand: {
					primary: {
						resting: {
							value: '{core.color.blue.900}',
							type: 'color',
						},
						hover: {
							value: '{core.color.blue.1000}',
							type: 'color',
						},
						active: {
							value: '{core.color.blue.1100}',
							type: 'color',
						},
						disabled: {
							value: '{semantic.internal.color.disabled.palette.900}',
							type: 'color',
						},
					},
					'primary-static': {
						resting: {
							value: '{core.color.blue.900}',
							type: 'color',
						},
						hover: {
							value: '{core.color.blue.1000}',
							type: 'color',
						},
						active: {
							value: '{core.color.blue.1100}',
							type: 'color',
						},
						disabled: {
							value: '{semantic.internal.color.disabled.palette.900}',
							type: 'color',
						},
					},
					'primary-inverse': {
						resting: {
							type: 'color',
							value: '{core.color.inverse.100}',
						},
						hover: {
							type: 'color',
							value: '{core.color.inverse.200}',
						},
						active: {
							type: 'color',
							value: '{core.color.inverse.300}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette-inverse.100}',
						},
					},
				},
				surface: {
					none: {
						type: 'color',
						value: '{core.color.white}',
						$extensions: {
							[tokenStudioTokenExtensionPropertyName]: {
								modify: {
									type: 'alpha',
									value: '0',
									space: 'srgb',
								},
							},
						},
					},
					default: {
						resting: {
							type: 'color',
							value: '{core.color.white}',
						},
						hover: {
							type: 'color',
							value: '{core.color.blue.100}',
						},
						active: {
							type: 'color',
							value: '{core.color.blue.200}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette.white}',
						},
					},
					emphasis: {
						resting: {
							type: 'color',
							value: '{core.color.aqua.100}',
						},
						hover: {
							type: 'color',
							value: '{core.color.aqua.200}',
						},
						active: {
							type: 'color',
							value: '{core.color.aqua.300}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette.100}',
						},
					},
					subtle: {
						resting: {
							type: 'color',
							value: '{semantic.color.surface.default.resting}',
							$extensions: {
								[tokenStudioTokenExtensionPropertyName]: {
									modify: {
										type: 'mix',
										value: '0.5',
										space: 'srgb',
										color: '{semantic.color.surface.emphasis.resting}',
									},
								},
							},
						},
						hover: {
							type: 'color',
							value: '{semantic.color.surface.emphasis.resting}',
							$extensions: {
								[tokenStudioTokenExtensionPropertyName]: {
									modify: {
										type: 'mix',
										value: '0.5',
										space: 'srgb',
										color: '{semantic.color.surface.emphasis.hover}',
									},
								},
							},
						},
						active: {
							type: 'color',
							value: '{semantic.color.surface.emphasis.hover}',
							$extensions: {
								[tokenStudioTokenExtensionPropertyName]: {
									modify: {
										type: 'mix',
										value: '0.5',
										space: 'srgb',
										color: '{semantic.color.surface.emphasis.active}',
									},
								},
							},
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette.white}',
							$extensions: {
								[tokenStudioTokenExtensionPropertyName]: {
									modify: {
										type: 'mix',
										value: '0.5',
										space: 'srgb',
										color: '{semantic.internal.color.disabled.palette.100}',
									},
								},
							},
						},
					},
					'default-inverse': {
						resting: {
							type: 'color',
							value: '{core.color.darkblue.1000}',
						},
						hover: {
							type: 'color',
							value: '{core.color.darkblue.1100}',
						},
						active: {
							type: 'color',
							value: '{core.color.darkblue.1200}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette-inverse.1000}',
						},
					},
					'emphasis-inverse': {
						resting: {
							type: 'color',
							value: '{core.color.darkblue.900}',
						},
						hover: {
							type: 'color',
							value: '{core.color.darkblue.1000}',
						},
						active: {
							type: 'color',
							value: '{core.color.darkblue.1100}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette-inverse.900}',
						},
					},
					'subtle-inverse': {
						resting: {
							type: 'color',
							value: '{semantic.color.surface.default-inverse.resting}',
							$extensions: {
								[tokenStudioTokenExtensionPropertyName]: {
									modify: {
										type: 'mix',
										value: '0.5',
										space: 'srgb',
										color: '{semantic.color.surface.emphasis-inverse.resting}',
									},
								},
							},
						},
						hover: {
							type: 'color',
							value: '{semantic.color.surface.emphasis-inverse.resting}',
							$extensions: {
								[tokenStudioTokenExtensionPropertyName]: {
									modify: {
										type: 'mix',
										value: '0.5',
										space: 'srgb',
										color: '{semantic.color.surface.emphasis-inverse.hover}',
									},
								},
							},
						},
						active: {
							type: 'color',
							value: '{semantic.color.surface.emphasis-inverse.hover}',
							$extensions: {
								[tokenStudioTokenExtensionPropertyName]: {
									modify: {
										type: 'mix',
										value: '0.5',
										space: 'srgb',
										color: '{semantic.color.surface.emphasis-inverse.active}',
									},
								},
							},
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette-inverse.900}',
							$extensions: {
								[tokenStudioTokenExtensionPropertyName]: {
									modify: {
										type: 'mix',
										value: '0.5',
										space: 'srgb',
										color: '{semantic.internal.color.disabled.palette-inverse.1100}',
									},
								},
							},
						},
					},
				},
				'on-surface': {
					primary: {
						resting: {
							type: 'color',
							value: '{core.color.blue.900}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette.900}',
						},
						readonly: {
							type: 'color',
							value: '{core.color.gray.900}',
						},
					},
					secondary: {
						resting: {
							type: 'color',
							value: '{core.color.blue.700}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette.700}',
						},
						readonly: {
							type: 'color',
							value: '{core.color.gray.700}',
						},
					},
					'primary-inverse': {
						resting: {
							type: 'color',
							value: '{core.color.inverse.100}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette-inverse.100}',
						},
						readonly: {
							type: 'color',
							value: '{core.color.inverse.200}',
						},
					},
					'secondary-inverse': {
						resting: {
							type: 'color',
							value: '{core.color.inverse.300}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette-inverse.300}',
						},
						readonly: {
							type: 'color',
							value: '{core.color.inverse.300}',
						},
					},
				},
				border: {
					primary: {
						resting: {
							type: 'color',
							value: '{core.color.blue.900}',
						},
						hover: {
							type: 'color',
							value: '{core.color.blue.1000}',
						},
						active: {
							type: 'color',
							value: '{core.color.blue.1100}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette.900}',
						},
					},
					secondary: {
						resting: {
							type: 'color',
							value: '{core.color.blue.600}',
						},
						hover: {
							type: 'color',
							value: '{core.color.blue.700}',
						},
						active: {
							type: 'color',
							value: '{core.color.blue.800}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette.600}',
						},
					},
					tertiary: {
						resting: {
							type: 'color',
							value: '{core.color.blue.300}',
						},
						hover: {
							type: 'color',
							value: '{core.color.blue.400}',
						},
						active: {
							type: 'color',
							value: '{core.color.blue.500}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette.300}',
						},
					},
					'primary-inverse': {
						resting: {
							type: 'color',
							value: '{core.color.inverse.100}',
						},
						hover: {
							type: 'color',
							value: '{core.color.inverse.200}',
						},
						active: {
							type: 'color',
							value: '{core.color.inverse.300}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette-inverse.100}',
						},
					},
					'secondary-inverse': {
						resting: {
							type: 'color',
							value: '{core.color.inverse.400}',
						},
						hover: {
							type: 'color',
							value: '{core.color.inverse.500}',
						},
						active: {
							type: 'color',
							value: '{core.color.inverse.600}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette-inverse.400}',
						},
					},
					'tertiary-inverse': {
						resting: {
							type: 'color',
							value: '{core.color.inverse.700}',
						},
						hover: {
							type: 'color',
							value: '{core.color.inverse.800}',
						},
						active: {
							type: 'color',
							value: '{core.color.inverse.900}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette-inverse.700}',
						},
					},
					focus: {
						type: 'color',
						value: '{core.color.aqua.600}',
					},
				},
				signal: {
					attention: {
						critical: {
							resting: {
								type: 'color',
								value: '{core.color.red.700}',
							},
							hover: {
								type: 'color',
								value: '{core.color.red.800}',
							},
							active: {
								type: 'color',
								value: '{core.color.red.900}',
							},
						},
						warning: {
							resting: {
								type: 'color',
								value: '{core.color.yellow.700}',
							},
							hover: {
								type: 'color',
								value: '{core.color.yellow.800}',
							},
							active: {
								type: 'color',
								value: '{core.color.yellow.900}',
							},
						},
						positive: {
							resting: {
								type: 'color',
								value: '{core.color.green.700}',
							},
							hover: {
								type: 'color',
								value: '{core.color.green.800}',
							},
							active: {
								type: 'color',
								value: '{core.color.green.900}',
							},
						},
						info: {
							resting: {
								type: 'color',
								value: '{core.color.blue.700}',
							},
							hover: {
								type: 'color',
								value: '{core.color.blue.800}',
							},
							active: {
								type: 'color',
								value: '{core.color.blue.900}',
							},
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette.700}',
						},
					},
					subtle: {
						critical: {
							resting: {
								type: 'color',
								value: '{core.color.red.200}',
							},
							hover: {
								type: 'color',
								value: '{core.color.red.300}',
							},
							active: {
								type: 'color',
								value: '{core.color.red.400}',
							},
						},
						warning: {
							resting: {
								type: 'color',
								value: '{core.color.yellow.200}',
							},
							hover: {
								type: 'color',
								value: '{core.color.yellow.300}',
							},
							active: {
								type: 'color',
								value: '{core.color.yellow.400}',
							},
						},
						positive: {
							resting: {
								type: 'color',
								value: '{core.color.green.200}',
							},
							hover: {
								type: 'color',
								value: '{core.color.green.300}',
							},
							active: {
								type: 'color',
								value: '{core.color.green.400}',
							},
						},
						info: {
							resting: {
								type: 'color',
								value: '{core.color.blue.200}',
							},
							hover: {
								type: 'color',
								value: '{core.color.blue.300}',
							},
							active: {
								type: 'color',
								value: '{core.color.blue.400}',
							},
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette.200}',
						},
					},
					'attention-inverse': {
						critical: {
							resting: {
								type: 'color',
								value: '{core.color.red.500}',
							},
							hover: {
								type: 'color',
								value: '{core.color.red.600}',
							},
							active: {
								type: 'color',
								value: '{core.color.red.700}',
							},
						},
						warning: {
							resting: {
								type: 'color',
								value: '{core.color.yellow.500}',
							},
							hover: {
								type: 'color',
								value: '{core.color.yellow.600}',
							},
							active: {
								type: 'color',
								value: '{core.color.yellow.700}',
							},
						},
						positive: {
							resting: {
								type: 'color',
								value: '{core.color.green.500}',
							},
							hover: {
								type: 'color',
								value: '{core.color.green.600}',
							},
							active: {
								type: 'color',
								value: '{core.color.green.700}',
							},
						},
						info: {
							resting: {
								type: 'color',
								value: '{core.color.blue.500}',
							},
							hover: {
								type: 'color',
								value: '{core.color.blue.600}',
							},
							active: {
								type: 'color',
								value: '{core.color.blue.700}',
							},
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette-inverse.500}',
						},
					},
					'subtle-inverse': {
						critical: {
							resting: {
								type: 'color',
								value: '{core.color.red.800}',
							},
							hover: {
								type: 'color',
								value: '{core.color.red.900}',
							},
							active: {
								type: 'color',
								value: '{core.color.red.1000}',
							},
						},
						warning: {
							resting: {
								type: 'color',
								value: '{core.color.yellow.800}',
							},
							hover: {
								type: 'color',
								value: '{core.color.yellow.900}',
							},
							active: {
								type: 'color',
								value: '{core.color.yellow.1000}',
							},
						},
						positive: {
							resting: {
								type: 'color',
								value: '{core.color.green.800}',
							},
							hover: {
								type: 'color',
								value: '{core.color.green.900}',
							},
							active: {
								type: 'color',
								value: '{core.color.green.1000}',
							},
						},
						info: {
							resting: {
								type: 'color',
								value: '{core.color.blue.800}',
							},
							hover: {
								type: 'color',
								value: '{core.color.blue.900}',
							},
							active: {
								type: 'color',
								value: '{core.color.blue.1000}',
							},
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette-inverse.800}',
						},
					},
				},
				'on-signal': {
					attention: {
						resting: {
							type: 'color',
							value: '{core.color.inverse.100}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.on-disabled.palette.100}',
						},
					},
					subtle: {
						critical: {
							resting: {
								type: 'color',
								value: '{core.color.red.800}',
							},
						},
						warning: {
							resting: {
								type: 'color',
								value: '{core.color.yellow.800}',
							},
						},
						positive: {
							resting: {
								type: 'color',
								value: '{core.color.green.800}',
							},
						},
						info: {
							resting: {
								type: 'color',
								value: '{core.color.blue.800}',
							},
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette.800}',
						},
					},
					'attention-inverse': {
						resting: {
							type: 'color',
							value: '{core.color.darkblue.1000}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.on-disabled.palette-inverse.1000}',
						},
					},
					'subtle-inverse': {
						critical: {
							resting: {
								type: 'color',
								value: '{core.color.red.300}',
							},
						},
						warning: {
							resting: {
								type: 'color',
								value: '{core.color.yellow.300}',
							},
						},
						positive: {
							resting: {
								type: 'color',
								value: '{core.color.green.300}',
							},
						},
						info: {
							resting: {
								type: 'color',
								value: '{core.color.blue.300}',
							},
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.on-disabled.palette-inverse.300}',
						},
					},
				},
				accent: {
					attention: {
						yellow: {
							resting: {
								type: 'color',
								value: '{core.color.yellow.700}',
							},
							hover: {
								type: 'color',
								value: '{core.color.yellow.800}',
							},
							active: {
								type: 'color',
								value: '{core.color.yellow.900}',
							},
						},
						orange: {
							resting: {
								type: 'color',
								value: '{core.color.orange.700}',
							},
							hover: {
								type: 'color',
								value: '{core.color.orange.800}',
							},
							active: {
								type: 'color',
								value: '{core.color.orange.900}',
							},
						},
						red: {
							resting: {
								type: 'color',
								value: '{core.color.red.700}',
							},
							hover: {
								type: 'color',
								value: '{core.color.red.800}',
							},
							active: {
								type: 'color',
								value: '{core.color.red.900}',
							},
						},
						purple: {
							resting: {
								type: 'color',
								value: '{core.color.purple.800}',
							},
							hover: {
								type: 'color',
								value: '{core.color.purple.900}',
							},
							active: {
								type: 'color',
								value: '{core.color.purple.1000}',
							},
						},
						aqua: {
							resting: {
								type: 'color',
								value: '{core.color.aqua.700}',
							},
							hover: {
								type: 'color',
								value: '{core.color.aqua.800}',
							},
							active: {
								type: 'color',
								value: '{core.color.aqua.900}',
							},
						},
						blue: {
							resting: {
								type: 'color',
								value: '{core.color.blue.700}',
							},
							hover: {
								type: 'color',
								value: '{core.color.blue.800}',
							},
							active: {
								type: 'color',
								value: '{core.color.blue.900}',
							},
						},
						teal: {
							resting: {
								type: 'color',
								value: '{core.color.teal.700}',
							},
							hover: {
								type: 'color',
								value: '{core.color.teal.800}',
							},
							active: {
								type: 'color',
								value: '{core.color.teal.900}',
							},
						},
						green: {
							resting: {
								type: 'color',
								value: '{core.color.green.700}',
							},
							hover: {
								type: 'color',
								value: '{core.color.green.800}',
							},
							active: {
								type: 'color',
								value: '{core.color.green.900}',
							},
						},
						gray: {
							resting: {
								type: 'color',
								value: '{core.color.gray.700}',
							},
							hover: {
								type: 'color',
								value: '{core.color.gray.800}',
							},
							active: {
								type: 'color',
								value: '{core.color.gray.900}',
							},
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette.700}',
						},
					},
					subtle: {
						yellow: {
							resting: {
								type: 'color',
								value: '{core.color.yellow.200}',
							},
							hover: {
								type: 'color',
								value: '{core.color.yellow.300}',
							},
							active: {
								type: 'color',
								value: '{core.color.yellow.400}',
							},
						},
						orange: {
							resting: {
								type: 'color',
								value: '{core.color.orange.200}',
							},
							hover: {
								type: 'color',
								value: '{core.color.orange.300}',
							},
							active: {
								type: 'color',
								value: '{core.color.orange.400}',
							},
						},
						red: {
							resting: {
								type: 'color',
								value: '{core.color.red.200}',
							},
							hover: {
								type: 'color',
								value: '{core.color.red.300}',
							},
							active: {
								type: 'color',
								value: '{core.color.red.400}',
							},
						},
						purple: {
							resting: {
								type: 'color',
								value: '{core.color.purple.200}',
							},
							hover: {
								type: 'color',
								value: '{core.color.purple.300}',
							},
							active: {
								type: 'color',
								value: '{core.color.purple.400}',
							},
						},
						blue: {
							resting: {
								type: 'color',
								value: '{core.color.blue.200}',
							},
							hover: {
								type: 'color',
								value: '{core.color.blue.300}',
							},
							active: {
								type: 'color',
								value: '{core.color.blue.400}',
							},
						},
						aqua: {
							resting: {
								type: 'color',
								value: '{core.color.aqua.200}',
							},
							hover: {
								type: 'color',
								value: '{core.color.aqua.300}',
							},
							active: {
								type: 'color',
								value: '{core.color.aqua.400}',
							},
						},
						teal: {
							resting: {
								type: 'color',
								value: '{core.color.teal.200}',
							},
							hover: {
								type: 'color',
								value: '{core.color.teal.300}',
							},
							active: {
								type: 'color',
								value: '{core.color.teal.400}',
							},
						},
						green: {
							resting: {
								type: 'color',
								value: '{core.color.green.200}',
							},
							hover: {
								type: 'color',
								value: '{core.color.green.300}',
							},
							active: {
								type: 'color',
								value: '{core.color.green.400}',
							},
						},
						gray: {
							resting: {
								type: 'color',
								value: '{core.color.gray.200}',
							},
							hover: {
								type: 'color',
								value: '{core.color.gray.300}',
							},
							active: {
								type: 'color',
								value: '{core.color.gray.400}',
							},
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette.200}',
						},
					},
					'attention-inverse': {
						yellow: {
							resting: {
								type: 'color',
								value: '{core.color.yellow.500}',
							},
							hover: {
								type: 'color',
								value: '{core.color.yellow.600}',
							},
							active: {
								type: 'color',
								value: '{core.color.yellow.700}',
							},
						},
						orange: {
							resting: {
								type: 'color',
								value: '{core.color.orange.500}',
							},
							hover: {
								type: 'color',
								value: '{core.color.orange.600}',
							},
							active: {
								type: 'color',
								value: '{core.color.orange.700}',
							},
						},
						red: {
							resting: {
								type: 'color',
								value: '{core.color.red.500}',
							},
							hover: {
								type: 'color',
								value: '{core.color.red.600}',
							},
							active: {
								type: 'color',
								value: '{core.color.red.700}',
							},
						},
						purple: {
							resting: {
								type: 'color',
								value: '{core.color.purple.500}',
							},
							hover: {
								type: 'color',
								value: '{core.color.purple.600}',
							},
							active: {
								type: 'color',
								value: '{core.color.purple.700}',
							},
						},
						aqua: {
							resting: {
								type: 'color',
								value: '{core.color.aqua.500}',
							},
							hover: {
								type: 'color',
								value: '{core.color.aqua.600}',
							},
							active: {
								type: 'color',
								value: '{core.color.aqua.700}',
							},
						},
						blue: {
							resting: {
								type: 'color',
								value: '{core.color.blue.500}',
							},
							hover: {
								type: 'color',
								value: '{core.color.blue.600}',
							},
							active: {
								type: 'color',
								value: '{core.color.blue.700}',
							},
						},
						teal: {
							resting: {
								type: 'color',
								value: '{core.color.teal.500}',
							},
							hover: {
								type: 'color',
								value: '{core.color.teal.600}',
							},
							active: {
								type: 'color',
								value: '{core.color.teal.700}',
							},
						},
						green: {
							resting: {
								type: 'color',
								value: '{core.color.green.500}',
							},
							hover: {
								type: 'color',
								value: '{core.color.green.600}',
							},
							active: {
								type: 'color',
								value: '{core.color.green.700}',
							},
						},
						gray: {
							resting: {
								type: 'color',
								value: '{core.color.gray.500}',
							},
							hover: {
								type: 'color',
								value: '{core.color.gray.600}',
							},
							active: {
								type: 'color',
								value: '{core.color.gray.700}',
							},
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette-inverse.500}',
						},
					},
					'subtle-inverse': {
						yellow: {
							resting: {
								type: 'color',
								value: '{core.color.yellow.800}',
							},
							hover: {
								type: 'color',
								value: '{core.color.yellow.900}',
							},
							active: {
								type: 'color',
								value: '{core.color.yellow.1000}',
							},
						},
						orange: {
							resting: {
								type: 'color',
								value: '{core.color.orange.800}',
							},
							hover: {
								type: 'color',
								value: '{core.color.orange.900}',
							},
							active: {
								type: 'color',
								value: '{core.color.orange.1000}',
							},
						},
						red: {
							resting: {
								type: 'color',
								value: '{core.color.red.800}',
							},
							hover: {
								type: 'color',
								value: '{core.color.red.900}',
							},
							active: {
								type: 'color',
								value: '{core.color.red.1000}',
							},
						},
						purple: {
							resting: {
								type: 'color',
								value: '{core.color.purple.800}',
							},
							hover: {
								type: 'color',
								value: '{core.color.purple.900}',
							},
							active: {
								type: 'color',
								value: '{core.color.purple.1000}',
							},
						},
						aqua: {
							resting: {
								type: 'color',
								value: '{core.color.aqua.800}',
							},
							hover: {
								type: 'color',
								value: '{core.color.aqua.900}',
							},
							active: {
								type: 'color',
								value: '{core.color.aqua.1000}',
							},
						},
						blue: {
							resting: {
								type: 'color',
								value: '{core.color.blue.800}',
							},
							hover: {
								type: 'color',
								value: '{core.color.blue.900}',
							},
							active: {
								type: 'color',
								value: '{core.color.blue.1000}',
							},
						},
						teal: {
							resting: {
								type: 'color',
								value: '{core.color.teal.800}',
							},
							hover: {
								type: 'color',
								value: '{core.color.teal.900}',
							},
							active: {
								type: 'color',
								value: '{core.color.teal.1000}',
							},
						},
						green: {
							resting: {
								type: 'color',
								value: '{core.color.green.800}',
							},
							hover: {
								type: 'color',
								value: '{core.color.green.900}',
							},
							active: {
								type: 'color',
								value: '{core.color.green.1000}',
							},
						},
						gray: {
							resting: {
								type: 'color',
								value: '{core.color.gray.800}',
							},
							hover: {
								type: 'color',
								value: '{core.color.gray.900}',
							},
							active: {
								type: 'color',
								value: '{core.color.gray.1000}',
							},
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette-inverse.800}',
						},
					},
				},
				'on-accent': {
					attention: {
						resting: {
							type: 'color',
							value: '{core.color.inverse.100}',
						},
						hover: {
							type: 'color',
							value: '{core.color.inverse.200}',
						},
						active: {
							type: 'color',
							value: '{core.color.inverse.300}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.on-disabled.palette.100}',
						},
					},
					subtle: {
						yellow: {
							resting: {
								type: 'color',
								value: '{core.color.yellow.800}',
							},
						},
						orange: {
							resting: {
								type: 'color',
								value: '{core.color.orange.800}',
							},
						},
						red: {
							resting: {
								type: 'color',
								value: '{core.color.red.800}',
							},
						},
						purple: {
							resting: {
								type: 'color',
								value: '{core.color.purple.800}',
							},
						},
						blue: {
							resting: {
								type: 'color',
								value: '{core.color.blue.800}',
							},
						},
						aqua: {
							resting: {
								type: 'color',
								value: '{core.color.aqua.800}',
							},
						},
						teal: {
							resting: {
								type: 'color',
								value: '{core.color.teal.800}',
							},
						},
						green: {
							resting: {
								type: 'color',
								value: '{core.color.green.800}',
							},
						},
						gray: {
							resting: {
								type: 'color',
								value: '{core.color.gray.800}',
							},
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette.800}',
						},
					},
					'attention-inverse': {
						resting: {
							type: 'color',
							value: '{core.color.darkblue.1000}',
						},
						hover: {
							type: 'color',
							value: '{core.color.darkblue.1100}',
						},
						active: {
							type: 'color',
							value: '{core.color.darkblue.1200}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.on-disabled.palette-inverse.1000}',
						},
					},
					'subtle-inverse': {
						yellow: {
							resting: {
								type: 'color',
								value: '{core.color.yellow.300}',
							},
						},
						orange: {
							resting: {
								type: 'color',
								value: '{core.color.orange.300}',
							},
						},
						red: {
							resting: {
								type: 'color',
								value: '{core.color.red.300}',
							},
						},
						purple: {
							resting: {
								type: 'color',
								value: '{core.color.purple.300}',
							},
						},
						blue: {
							resting: {
								type: 'color',
								value: '{core.color.blue.300}',
							},
						},
						aqua: {
							resting: {
								type: 'color',
								value: '{core.color.aqua.300}',
							},
						},
						teal: {
							resting: {
								type: 'color',
								value: '{core.color.teal.300}',
							},
						},
						green: {
							resting: {
								type: 'color',
								value: '{core.color.green.300}',
							},
						},
						gray: {
							resting: {
								type: 'color',
								value: '{core.color.gray.300}',
							},
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.on-disabled.palette-inverse.300}',
						},
					},
				},
				action: {
					primary: {
						resting: {
							type: 'color',
							value: '{core.color.blue.900}',
						},
						hover: {
							type: 'color',
							value: '{core.color.blue.1000}',
						},
						active: {
							type: 'color',
							value: '{core.color.blue.1100}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette.900}',
						},
						readonly: {
							type: 'color',
							value: '{core.color.gray.900}',
						},
					},
					secondary: {
						resting: {
							type: 'color',
							value: '{core.color.blue.700}',
						},
						hover: {
							type: 'color',
							value: '{core.color.blue.800}',
						},
						active: {
							type: 'color',
							value: '{core.color.blue.900}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette.700}',
						},
						readonly: {
							type: 'color',
							value: '{core.color.gray.800}',
						},
					},
					'primary-inverse': {
						resting: {
							type: 'color',
							value: '{core.color.inverse.100}',
						},
						hover: {
							type: 'color',
							value: '{core.color.inverse.200}',
						},
						active: {
							type: 'color',
							value: '{core.color.inverse.300}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette-inverse.100}',
						},
						readonly: {
							type: 'color',
							value: '{core.color.inverse.200}',
						},
					},
					'secondary-inverse': {
						resting: {
							type: 'color',
							value: '{core.color.inverse.300}',
						},
						hover: {
							type: 'color',
							value: '{core.color.inverse.400}',
						},
						active: {
							type: 'color',
							value: '{core.color.inverse.500}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.disabled.palette-inverse.300}',
						},
						readonly: {
							type: 'color',
							value: '{core.color.inverse.300}',
						},
					},
					surface: {
						attention: {
							resting: {
								type: 'color',
								value: '{core.color.blue.900}',
							},
							hover: {
								type: 'color',
								value: '{core.color.blue.1000}',
							},
							active: {
								type: 'color',
								value: '{core.color.blue.1100}',
							},
							disabled: {
								type: 'color',
								value: '{semantic.internal.color.disabled.palette.900}',
							},
						},
						'attention-inverse': {
							resting: {
								type: 'color',
								value: '{core.color.inverse.100}',
							},
							hover: {
								type: 'color',
								value: '{core.color.inverse.200}',
							},
							active: {
								type: 'color',
								value: '{core.color.inverse.300}',
							},
							disabled: {
								type: 'color',
								value: '{semantic.internal.color.disabled.palette-inverse.100}',
							},
						},
					},
				},
				'on-action': {
					primary: {
						resting: {
							type: 'color',
							value: '{core.color.inverse.100}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.on-disabled.palette.100}',
						},
						readonly: {
							type: 'color',
							value: '{core.color.gray.900}',
						},
					},
					secondary: {
						resting: {
							type: 'color',
							value: '{core.color.inverse.300}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.on-disabled.palette.300}',
						},
						readonly: {
							type: 'color',
							value: '{core.color.gray.800}',
						},
					},
					'primary-inverse': {
						resting: {
							type: 'color',
							value: '{core.color.blue.900}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.on-disabled.palette-inverse.900}',
						},
						readonly: {
							type: 'color',
							value: '{core.color.inverse.100}',
						},
					},
					'secondary-inverse': {
						resting: {
							type: 'color',
							value: '{core.color.blue.700}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.internal.color.on-disabled.palette-inverse.700}',
						},
						readonly: {
							type: 'color',
							value: '{core.color.inverse.200}',
						},
					},
				},
				selection: {
					surface: {
						attention: {
							resting: {
								type: 'color',
								value: '{semantic.color.action.surface.attention.resting}',
							},
							hover: {
								type: 'color',
								value: '{semantic.color.action.surface.attention.hover}',
							},
							active: {
								type: 'color',
								value: '{semantic.color.action.surface.attention.active}',
							},
							disabled: {
								type: 'color',
								value: '{semantic.color.action.surface.attention.disabled}',
							},
						},
						'attention-inverse': {
							resting: {
								type: 'color',
								value: '{semantic.color.action.surface.attention-inverse.resting}',
							},
							hover: {
								type: 'color',
								value: '{semantic.color.action.surface.attention-inverse.hover}',
							},
							active: {
								type: 'color',
								value: '{semantic.color.action.surface.attention-inverse.active}',
							},
							disabled: {
								type: 'color',
								value: '{semantic.color.action.surface.attention-inverse.disabled}',
							},
						},
					},
				},
				'on-selection': {
					primary: {
						resting: {
							type: 'color',
							value: '{semantic.color.on-action.primary.resting}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.color.on-action.primary.disabled}',
						},
						readonly: {
							type: 'color',
							value: '{semantic.color.on-action.primary.readonly}',
						},
					},
					secondary: {
						resting: {
							type: 'color',
							value: '{semantic.color.on-action.secondary.resting}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.color.on-action.secondary.disabled}',
						},
						readonly: {
							type: 'color',
							value: '{semantic.color.on-action.secondary.readonly}',
						},
					},
					'primary-inverse': {
						resting: {
							type: 'color',
							value: '{semantic.color.on-action.primary-inverse.resting}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.color.on-action.primary-inverse.disabled}',
						},
						readonly: {
							type: 'color',
							value: '{semantic.color.on-action.primary-inverse.readonly}',
						},
					},
					'secondary-inverse': {
						resting: {
							type: 'color',
							value: '{semantic.color.on-action.secondary-inverse.resting}',
						},
						disabled: {
							type: 'color',
							value: '{semantic.color.on-action.secondary-inverse.disabled}',
						},
						readonly: {
							type: 'color',
							value: '{semantic.color.on-action.secondary-inverse.readonly}',
						},
					},
				},
				elevation: {
					surface: {
						default: {
							'100': {
								resting: {
									type: 'color',
									value: '{semantic.color.surface.default.resting}',
									$extensions: {
										[tokenStudioTokenExtensionPropertyName]: {
											modify: {
												type: 'mix',
												value: '{semantic.internal.opacity.elevation.overlay.100}',
												space: 'srgb',
												color: '{semantic.internal.color.elevation.overlay}',
											},
										},
									},
								},
								hover: {
									type: 'color',
									value: '{semantic.color.surface.default.hover}',
									$extensions: {
										[tokenStudioTokenExtensionPropertyName]: {
											modify: {
												type: 'mix',
												value: '{semantic.internal.opacity.elevation.overlay.100}',
												space: 'srgb',
												color: '{semantic.internal.color.elevation.overlay}',
											},
										},
									},
								},
								active: {
									type: 'color',
									value: '{semantic.color.surface.default.active}',
									$extensions: {
										[tokenStudioTokenExtensionPropertyName]: {
											modify: {
												type: 'mix',
												value: '{semantic.internal.opacity.elevation.overlay.100}',
												space: 'srgb',
												color: '{semantic.internal.color.elevation.overlay}',
											},
										},
									},
								},
								disabled: {
									type: 'color',
									value: '{semantic.color.surface.default.disabled}',
									$extensions: {
										[tokenStudioTokenExtensionPropertyName]: {
											modify: {
												type: 'mix',
												value: '{semantic.internal.opacity.elevation.overlay.100}',
												space: 'srgb',
												color: '{semantic.internal.color.elevation.overlay}',
											},
										},
									},
								},
							},
							'200': {
								resting: {
									type: 'color',
									value: '{semantic.color.surface.default.resting}',
									$extensions: {
										[tokenStudioTokenExtensionPropertyName]: {
											modify: {
												type: 'mix',
												value: '{semantic.internal.opacity.elevation.overlay.200}',
												space: 'srgb',
												color: '{semantic.internal.color.elevation.overlay}',
											},
										},
									},
								},
								hover: {
									type: 'color',
									value: '{semantic.color.surface.default.hover}',
									$extensions: {
										[tokenStudioTokenExtensionPropertyName]: {
											modify: {
												type: 'mix',
												value: '{semantic.internal.opacity.elevation.overlay.200}',
												space: 'srgb',
												color: '{semantic.internal.color.elevation.overlay}',
											},
										},
									},
								},
								active: {
									type: 'color',
									value: '{semantic.color.surface.default.active}',
									$extensions: {
										[tokenStudioTokenExtensionPropertyName]: {
											modify: {
												type: 'mix',
												value: '{semantic.internal.opacity.elevation.overlay.200}',
												space: 'srgb',
												color: '{semantic.internal.color.elevation.overlay}',
											},
										},
									},
								},
								disabled: {
									type: 'color',
									value: '{semantic.color.surface.default.disabled}',
									$extensions: {
										[tokenStudioTokenExtensionPropertyName]: {
											modify: {
												type: 'mix',
												value: '{semantic.internal.opacity.elevation.overlay.200}',
												space: 'srgb',
												color: '{semantic.internal.color.elevation.overlay}',
											},
										},
									},
								},
							},
							'300': {
								resting: {
									type: 'color',
									value: '{semantic.color.surface.default.resting}',
									$extensions: {
										[tokenStudioTokenExtensionPropertyName]: {
											modify: {
												type: 'mix',
												value: '{semantic.internal.opacity.elevation.overlay.300}',
												space: 'srgb',
												color: '{semantic.internal.color.elevation.overlay}',
											},
										},
									},
								},
								hover: {
									type: 'color',
									value: '{semantic.color.surface.default.hover}',
									$extensions: {
										[tokenStudioTokenExtensionPropertyName]: {
											modify: {
												type: 'mix',
												value: '{semantic.internal.opacity.elevation.overlay.300}',
												space: 'srgb',
												color: '{semantic.internal.color.elevation.overlay}',
											},
										},
									},
								},
								active: {
									type: 'color',
									value: '{semantic.color.surface.default.active}',
									$extensions: {
										[tokenStudioTokenExtensionPropertyName]: {
											modify: {
												type: 'mix',
												value: '{semantic.internal.opacity.elevation.overlay.300}',
												space: 'srgb',
												color: '{semantic.internal.color.elevation.overlay}',
											},
										},
									},
								},
								disabled: {
									type: 'color',
									value: '{semantic.color.surface.default.disabled}',
									$extensions: {
										[tokenStudioTokenExtensionPropertyName]: {
											modify: {
												type: 'mix',
												value: '{semantic.internal.opacity.elevation.overlay.300}',
												space: 'srgb',
												color: '{semantic.internal.color.elevation.overlay}',
											},
										},
									},
								},
							},
							'400': {
								resting: {
									type: 'color',
									value: '{semantic.color.surface.default.resting}',
									$extensions: {
										[tokenStudioTokenExtensionPropertyName]: {
											modify: {
												type: 'mix',
												value: '{semantic.internal.opacity.elevation.overlay.400}',
												space: 'srgb',
												color: '{semantic.internal.color.elevation.overlay}',
											},
										},
									},
								},
								hover: {
									type: 'color',
									value: '{semantic.color.surface.default.hover}',
									$extensions: {
										[tokenStudioTokenExtensionPropertyName]: {
											modify: {
												type: 'mix',
												value: '{semantic.internal.opacity.elevation.overlay.400}',
												space: 'srgb',
												color: '{semantic.internal.color.elevation.overlay}',
											},
										},
									},
								},
								active: {
									type: 'color',
									value: '{semantic.color.surface.default.active}',
									$extensions: {
										[tokenStudioTokenExtensionPropertyName]: {
											modify: {
												type: 'mix',
												value: '{semantic.internal.opacity.elevation.overlay.400}',
												space: 'srgb',
												color: '{semantic.internal.color.elevation.overlay}',
											},
										},
									},
								},
								disabled: {
									type: 'color',
									value: '{semantic.color.surface.default.disabled}',
									$extensions: {
										[tokenStudioTokenExtensionPropertyName]: {
											modify: {
												type: 'mix',
												value: '{semantic.internal.opacity.elevation.overlay.400}',
												space: 'srgb',
												color: '{semantic.internal.color.elevation.overlay}',
											},
										},
									},
								},
							},
							'500': {
								resting: {
									type: 'color',
									value: '{semantic.color.surface.default.resting}',
									$extensions: {
										[tokenStudioTokenExtensionPropertyName]: {
											modify: {
												type: 'mix',
												value: '{semantic.internal.opacity.elevation.overlay.500}',
												space: 'srgb',
												color: '{semantic.internal.color.elevation.overlay}',
											},
										},
									},
								},
								hover: {
									type: 'color',
									value: '{semantic.color.surface.default.hover}',
									$extensions: {
										[tokenStudioTokenExtensionPropertyName]: {
											modify: {
												type: 'mix',
												value: '{semantic.internal.opacity.elevation.overlay.500}',
												space: 'srgb',
												color: '{semantic.internal.color.elevation.overlay}',
											},
										},
									},
								},
								active: {
									type: 'color',
									value: '{semantic.color.surface.default.active}',
									$extensions: {
										[tokenStudioTokenExtensionPropertyName]: {
											modify: {
												type: 'mix',
												value: '{semantic.internal.opacity.elevation.overlay.500}',
												space: 'srgb',
												color: '{semantic.internal.color.elevation.overlay}',
											},
										},
									},
								},
								disabled: {
									type: 'color',
									value: '{semantic.color.surface.default.disabled}',
									$extensions: {
										[tokenStudioTokenExtensionPropertyName]: {
											modify: {
												type: 'mix',
												value: '{semantic.internal.opacity.elevation.overlay.500}',
												space: 'srgb',
												color: '{semantic.internal.color.elevation.overlay}',
											},
										},
									},
								},
							},
						},
					},
					shadow: {
						core: {
							value: '{core.color.darkblue.1000}',
							type: 'color',
							$extensions: {
								[tokenStudioTokenExtensionPropertyName]: {
									modify: {
										type: 'alpha',
										value: '{semantic.internal.opacity.elevation.shadow.core}',
										space: 'srgb',
									},
								},
							},
						},
						cast: {
							value: '{core.color.darkblue.1000}',
							type: 'color',
							$extensions: {
								[tokenStudioTokenExtensionPropertyName]: {
									modify: {
										type: 'alpha',
										value: '{semantic.internal.opacity.elevation.shadow.cast}',
										space: 'srgb',
									},
								},
							},
						},
					},
				},
			},
			dimension: {
				static: {
					'0': {
						value: '{core.dimension.0}',
						type: 'dimension',
					},
					'25': {
						value: '{core.dimension.25}',
						type: 'dimension',
					},
					'50': {
						value: '{core.dimension.50}',
						type: 'dimension',
					},
					'100': {
						type: 'dimension',
						value: '{core.dimension.100}',
					},
					'150': {
						value: '{core.dimension.150}',
						type: 'dimension',
					},
					'200': {
						type: 'dimension',
						value: '{core.dimension.200}',
					},
					'250': {
						value: '{core.dimension.250}',
						type: 'dimension',
					},
					'300': {
						type: 'dimension',
						value: '{core.dimension.300}',
					},
					'350': {
						value: '{core.dimension.350}',
						type: 'dimension',
					},
					'400': {
						type: 'dimension',
						value: '{core.dimension.400}',
					},
					'450': {
						type: 'dimension',
						value: '{core.dimension.450}',
					},
					'500': {
						type: 'dimension',
						value: '{core.dimension.500}',
					},
					'600': {
						type: 'dimension',
						value: '{core.dimension.600}',
					},
					'700': {
						type: 'dimension',
						value: '{core.dimension.700}',
					},
					'800': {
						type: 'dimension',
						value: '{core.dimension.800}',
					},
					'900': {
						type: 'dimension',
						value: '{core.dimension.900}',
					},
					'1000': {
						type: 'dimension',
						value: '{core.dimension.1000}',
					},
					'1200': {
						type: 'dimension',
						value: '{core.dimension.1200}',
					},
					'1400': {
						type: 'dimension',
						value: '{core.dimension.1400}',
					},
					'1600': {
						type: 'dimension',
						value: '{core.dimension.1600}',
					},
					'2000': {
						type: 'dimension',
						value: '{core.dimension.2000}',
					},
					'2400': {
						type: 'dimension',
						value: '{core.dimension.2400}',
					},
				},
				'linear-25': {
					'50': {
						value: '({core.dimension.50} - {semantic.internal.spacing.modifier.linear.25})',
						type: 'dimension',
					},
					'100': {
						value: '({core.dimension.100} - {semantic.internal.spacing.modifier.linear.25})',
						type: 'dimension',
					},
					'150': {
						value: '({core.dimension.150} - {semantic.internal.spacing.modifier.linear.25})',
						type: 'dimension',
					},
					'200': {
						value: '({core.dimension.200} - {semantic.internal.spacing.modifier.linear.25})',
						type: 'dimension',
					},
				},
				'linear-50': {
					'100': {
						value: '({core.dimension.100} - {semantic.internal.spacing.modifier.linear.50})',
						type: 'dimension',
					},
					'150': {
						value: '({core.dimension.150} - {semantic.internal.spacing.modifier.linear.50})',
						type: 'dimension',
					},
					'200': {
						value: '({core.dimension.200} - {semantic.internal.spacing.modifier.linear.50})',
						type: 'dimension',
					},
					'250': {
						value: '({core.dimension.250} - {semantic.internal.spacing.modifier.linear.50})',
						type: 'dimension',
					},
					'300': {
						value: '({core.dimension.300} - {semantic.internal.spacing.modifier.linear.50})',
						type: 'dimension',
					},
					'350': {
						value: '({core.dimension.350} - {semantic.internal.spacing.modifier.linear.50})',
						type: 'dimension',
					},
					'400': {
						value: '({core.dimension.400} - {semantic.internal.spacing.modifier.linear.50})',
						type: 'dimension',
					},
					'450': {
						value: '({core.dimension.450} - {semantic.internal.spacing.modifier.linear.50})',
						type: 'dimension',
					},
					'500': {
						value: '({core.dimension.500} - {semantic.internal.spacing.modifier.linear.50})',
						type: 'dimension',
					},
				},
				'linear-100': {
					'200': {
						value: '({core.dimension.200} - {semantic.internal.spacing.modifier.linear.100})',
						type: 'dimension',
					},
					'250': {
						value: '({core.dimension.250} - {semantic.internal.spacing.modifier.linear.100})',
						type: 'dimension',
					},
					'300': {
						value: '({core.dimension.300} - {semantic.internal.spacing.modifier.linear.100})',
						type: 'dimension',
					},
					'350': {
						value: '({core.dimension.350} - {semantic.internal.spacing.modifier.linear.100})',
						type: 'dimension',
					},
					'400': {
						value: '({core.dimension.400} - {semantic.internal.spacing.modifier.linear.100})',
						type: 'dimension',
					},
					'500': {
						value: '({core.dimension.500} - {semantic.internal.spacing.modifier.linear.100})',
						type: 'dimension',
					},
					'600': {
						value: '({core.dimension.600} - {semantic.internal.spacing.modifier.linear.100})',
						type: 'dimension',
					},
					'700': {
						value: '({core.dimension.700} - {semantic.internal.spacing.modifier.linear.100})',
						type: 'dimension',
					},
					'800': {
						value: '({core.dimension.800} - {semantic.internal.spacing.modifier.linear.100})',
						type: 'dimension',
					},
					'900': {
						value: '({core.dimension.900} - {semantic.internal.spacing.modifier.linear.100})',
						type: 'dimension',
					},
					'1000': {
						value: '({core.dimension.1000} - {semantic.internal.spacing.modifier.linear.100})',
						type: 'dimension',
					},
				},
				'linear-200': {
					'400': {
						value: '({core.dimension.400} - {semantic.internal.spacing.modifier.linear.200})',
						type: 'dimension',
					},
					'600': {
						value: '({core.dimension.600} - {semantic.internal.spacing.modifier.linear.200})',
						type: 'dimension',
					},
					'800': {
						value: '({core.dimension.800} - {semantic.internal.spacing.modifier.linear.200})',
						type: 'dimension',
					},
					'1000': {
						value: '({core.dimension.1000} - {semantic.internal.spacing.modifier.linear.200})',
						type: 'dimension',
					},
					'1200': {
						value: '({core.dimension.1200} - {semantic.internal.spacing.modifier.linear.200})',
						type: 'dimension',
					},
					'1400': {
						value: '({core.dimension.1400} - {semantic.internal.spacing.modifier.linear.200})',
						type: 'dimension',
					},
					'1600': {
						value: '({core.dimension.1600} - {semantic.internal.spacing.modifier.linear.200})',
						type: 'dimension',
					},
				},
				'linear-300': {
					'1200': {
						value: '({core.dimension.1200} - {semantic.internal.spacing.modifier.linear.300})',
						type: 'dimension',
					},
					'1400': {
						value: '({core.dimension.1400} - {semantic.internal.spacing.modifier.linear.300})',
						type: 'dimension',
					},
					'1600': {
						value: '({core.dimension.1600} - {semantic.internal.spacing.modifier.linear.300})',
						type: 'dimension',
					},
					'2000': {
						value: '({core.dimension.2000} - {semantic.internal.spacing.modifier.linear.300})',
						type: 'dimension',
					},
					'2400': {
						value: '({core.dimension.2400} - {semantic.internal.spacing.modifier.linear.300})',
						type: 'dimension',
					},
				},
				'clamp-smaller-25': {
					'25': {
						value: '({core.dimension.25} - {semantic.internal.spacing.modifier.clamp-smaller.25})',
						type: 'dimension',
					},
					'50': {
						value: '({core.dimension.50} - {semantic.internal.spacing.modifier.clamp-smaller.25})',
						type: 'dimension',
					},
					'100': {
						value: '({core.dimension.100} - {semantic.internal.spacing.modifier.clamp-smaller.25})',
						type: 'dimension',
					},
					'150': {
						value: '({core.dimension.150} - {semantic.internal.spacing.modifier.clamp-smaller.25})',
						type: 'dimension',
					},
					'200': {
						value: '({core.dimension.200} - {semantic.internal.spacing.modifier.clamp-smaller.25})',
						type: 'dimension',
					},
				},
				'clamp-smaller-50': {
					'50': {
						value: '({core.dimension.50} - {semantic.internal.spacing.modifier.clamp-smaller.50})',
						type: 'dimension',
					},
					'100': {
						value: '({core.dimension.100} - {semantic.internal.spacing.modifier.clamp-smaller.50})',
						type: 'dimension',
					},
					'150': {
						value: '({core.dimension.150} - {semantic.internal.spacing.modifier.clamp-smaller.50})',
						type: 'dimension',
					},
					'200': {
						value: '({core.dimension.200} - {semantic.internal.spacing.modifier.clamp-smaller.50})',
						type: 'dimension',
					},
					'250': {
						value: '({core.dimension.250} - {semantic.internal.spacing.modifier.clamp-smaller.50})',
						type: 'dimension',
					},
					'300': {
						value: '({core.dimension.300} - {semantic.internal.spacing.modifier.clamp-smaller.50})',
						type: 'dimension',
					},
					'350': {
						value: '({core.dimension.350} - {semantic.internal.spacing.modifier.clamp-smaller.50})',
						type: 'dimension',
					},
					'400': {
						value: '({core.dimension.400} - {semantic.internal.spacing.modifier.clamp-smaller.50})',
						type: 'dimension',
					},
					'450': {
						value: '({core.dimension.450} - {semantic.internal.spacing.modifier.clamp-smaller.50})',
						type: 'dimension',
					},
					'500': {
						value: '({core.dimension.500} - {semantic.internal.spacing.modifier.clamp-smaller.50})',
						type: 'dimension',
					},
				},
				'clamp-smaller-100': {
					'100': {
						value: '({core.dimension.100} - {semantic.internal.spacing.modifier.clamp-smaller.100})',
						type: 'dimension',
					},
					'150': {
						value: '({core.dimension.150} - {semantic.internal.spacing.modifier.clamp-smaller.100})',
						type: 'dimension',
					},
					'200': {
						value: '({core.dimension.200} - {semantic.internal.spacing.modifier.clamp-smaller.100})',
						type: 'dimension',
					},
					'250': {
						value: '({core.dimension.250} - {semantic.internal.spacing.modifier.clamp-smaller.100})',
						type: 'dimension',
					},
					'300': {
						value: '({core.dimension.300} - {semantic.internal.spacing.modifier.clamp-smaller.100})',
						type: 'dimension',
					},
					'350': {
						value: '({core.dimension.350} - {semantic.internal.spacing.modifier.clamp-smaller.100})',
						type: 'dimension',
					},
					'400': {
						value: '({core.dimension.400} - {semantic.internal.spacing.modifier.clamp-smaller.100})',
						type: 'dimension',
					},
					'500': {
						value: '({core.dimension.500} - {semantic.internal.spacing.modifier.clamp-smaller.100})',
						type: 'dimension',
					},
					'600': {
						value: '({core.dimension.600} - {semantic.internal.spacing.modifier.clamp-smaller.100})',
						type: 'dimension',
					},
					'700': {
						value: '({core.dimension.700} - {semantic.internal.spacing.modifier.clamp-smaller.100})',
						type: 'dimension',
					},
					'800': {
						value: '({core.dimension.800} - {semantic.internal.spacing.modifier.clamp-smaller.100})',
						type: 'dimension',
					},
					'900': {
						value: '({core.dimension.900} - {semantic.internal.spacing.modifier.clamp-smaller.100})',
						type: 'dimension',
					},
					'1000': {
						value: '({core.dimension.1000} - {semantic.internal.spacing.modifier.clamp-smaller.100})',
						type: 'dimension',
					},
				},
				'clamp-smaller-200': {
					'200': {
						value: '({core.dimension.200} - {semantic.internal.spacing.modifier.clamp-smaller.200})',
						type: 'dimension',
					},
					'400': {
						value: '({core.dimension.400} - {semantic.internal.spacing.modifier.clamp-smaller.200})',
						type: 'dimension',
					},
					'600': {
						value: '({core.dimension.600} - {semantic.internal.spacing.modifier.clamp-smaller.200})',
						type: 'dimension',
					},
					'800': {
						value: '({core.dimension.800} - {semantic.internal.spacing.modifier.clamp-smaller.200})',
						type: 'dimension',
					},
					'1000': {
						value: '({core.dimension.1000} - {semantic.internal.spacing.modifier.clamp-smaller.200})',
						type: 'dimension',
					},
					'1200': {
						value: '({core.dimension.1200} - {semantic.internal.spacing.modifier.clamp-smaller.200})',
						type: 'dimension',
					},
					'1400': {
						value: '({core.dimension.1400} - {semantic.internal.spacing.modifier.clamp-smaller.200})',
						type: 'dimension',
					},
					'1600': {
						value: '({core.dimension.1600} - {semantic.internal.spacing.modifier.clamp-smaller.200})',
						type: 'dimension',
					},
				},
				'clamp-smaller-300': {
					'1200': {
						value: '({core.dimension.1200} - {semantic.internal.spacing.modifier.clamp-smaller.300})',
						type: 'dimension',
					},
					'1400': {
						value: '({core.dimension.1400} - {semantic.internal.spacing.modifier.clamp-smaller.300})',
						type: 'dimension',
					},
					'1600': {
						value: '({core.dimension.1600} - {semantic.internal.spacing.modifier.clamp-smaller.300})',
						type: 'dimension',
					},
					'2000': {
						value: '({core.dimension.2000} - {semantic.internal.spacing.modifier.clamp-smaller.300})',
						type: 'dimension',
					},
					'2400': {
						value: '({core.dimension.2400} - {semantic.internal.spacing.modifier.clamp-smaller.300})',
						type: 'dimension',
					},
				},
				elevation: {
					core: {
						'100': {
							x: {
								value: '{core.dimension.0}',
								type: 'dimension',
							},
							y: {
								value: '{core.dimension.25}',
								type: 'dimension',
							},
							blur: {
								value: '{core.dimension.100}',
								type: 'dimension',
							},
							spread: {
								value: '{core.dimension.0}',
								type: 'dimension',
							},
						},
						'200': {
							x: {
								value: '{core.dimension.0}',
								type: 'dimension',
							},
							y: {
								value: '{core.dimension.50}',
								type: 'dimension',
							},
							blur: {
								value: '{core.dimension.200}',
								type: 'dimension',
							},
							spread: {
								value: '{core.dimension.0}',
								type: 'dimension',
							},
						},
						'300': {
							x: {
								value: '{core.dimension.0}',
								type: 'dimension',
							},
							y: {
								value: '{core.dimension.100}',
								type: 'dimension',
							},
							blur: {
								value: '{core.dimension.400}',
								type: 'dimension',
							},
							spread: {
								value: '{core.dimension.0}',
								type: 'dimension',
							},
						},
						'400': {
							x: {
								value: '{core.dimension.0}',
								type: 'dimension',
							},
							y: {
								value: '{core.dimension.200}',
								type: 'dimension',
							},
							blur: {
								value: '{core.dimension.800}',
								type: 'dimension',
							},
							spread: {
								value: '{core.dimension.0}',
								type: 'dimension',
							},
						},
						'500': {
							x: {
								value: '{core.dimension.0}',
								type: 'dimension',
							},
							y: {
								value: '{core.dimension.400}',
								type: 'dimension',
							},
							blur: {
								value: '{core.dimension.1600}',
								type: 'dimension',
							},
							spread: {
								value: '{core.dimension.0}',
								type: 'dimension',
							},
						},
					},
					cast: {
						'100': {
							x: {
								value: '{core.dimension.0}',
								type: 'dimension',
							},
							y: {
								value: '{core.dimension.100}',
								type: 'dimension',
							},
							blur: {
								value: '{core.dimension.400}',
								type: 'dimension',
							},
							spread: {
								value: '{core.dimension.0}',
								type: 'dimension',
							},
						},
						'200': {
							x: {
								value: '{core.dimension.0}',
								type: 'dimension',
							},
							y: {
								value: '{core.dimension.200}',
								type: 'dimension',
							},
							blur: {
								value: '{core.dimension.600}',
								type: 'dimension',
							},
							spread: {
								value: '{core.dimension.0}',
								type: 'dimension',
							},
						},
						'300': {
							x: {
								value: '{core.dimension.0}',
								type: 'dimension',
							},
							y: {
								value: '{core.dimension.400}',
								type: 'dimension',
							},
							blur: {
								value: '{core.dimension.800}',
								type: 'dimension',
							},
							spread: {
								value: '{core.dimension.0}',
								type: 'dimension',
							},
						},
						'400': {
							x: {
								value: '{core.dimension.0}',
								type: 'dimension',
							},
							y: {
								value: '{core.dimension.500}',
								type: 'dimension',
							},
							blur: {
								value: '{core.dimension.1000}',
								type: 'dimension',
							},
							spread: {
								value: '{core.dimension.0}',
								type: 'dimension',
							},
						},
						'500': {
							x: {
								value: '{core.dimension.0}',
								type: 'dimension',
							},
							y: {
								value: '{core.dimension.600}',
								type: 'dimension',
							},
							blur: {
								value: '{core.dimension.1200}',
								type: 'dimension',
							},
							spread: {
								value: '{core.dimension.0}',
								type: 'dimension',
							},
						},
					},
				},
			},
			'border-radius': {
				s: {
					type: 'borderRadius',
					value: '{core.border-radius.50}',
				},
				m: {
					type: 'borderRadius',
					value: '{semantic.dimension.linear-25.200}',
				},
				l: {
					type: 'borderRadius',
					value: '{semantic.dimension.linear-50.300}',
				},
				round: {
					type: 'borderRadius',
					value: '999',
				},
			},
			'border-width': {
				static: {
					type: 'borderWidth',
					value: '{core.border-width.100}',
				},
				action: {
					type: 'borderWidth',
					value: '{core.border-width.100}',
				},
				focus: {
					type: 'borderWidth',
					value: '{core.border-width.300}',
				},
				selected: {
					type: 'borderWidth',
					value: '{core.border-width.200}',
				},
				bar: {
					type: 'borderWidth',
					value: '{core.border-width.400}',
				},
			},
			size: {
				content: {
					xs: {
						type: 'sizing',
						value: '{semantic.dimension.clamp-smaller-50.400}',
						description: 'Size mostly used for functional icons within smallest components like content S sized badges',
					},
					s: {
						type: 'sizing',
						value: '{semantic.line-height.utility.s}',
						description:
							'Size mostly used for functional icons. Content size S matches semantic utility line-height S and allows to align icon and component dimensions with the corresponding text line height, such as e.g. checkbox labels, to ensure consistent text-icon combinations.',
					},
					m: {
						type: 'sizing',
						value: '{semantic.line-height.utility.m}',
						description:
							'Size mostly used for functional icons. Content size M matches semantic utility line-height M and allows to align icon and component dimensions with the corresponding text line height, such as e.g. checkbox labels, to ensure consistent text-icon combinations.',
					},
					l: {
						type: 'sizing',
						value: '{semantic.dimension.linear-100.800}',
						description:
							'Size mostly used for illustrative icons. In contrast to S and M content sizes, size L does not align with the corresponding text headline size.',
					},
					xl: {
						type: 'sizing',
						value: '{semantic.dimension.linear-100.1000}',
						description:
							'Size mostly used for illustrative icons. In contrast to S and M content sizes, size L does not align with the corresponding text headline size.',
					},
					'2xl': {
						type: 'sizing',
						value: '{semantic.dimension.linear-200.1400}',
						description:
							'Size mostly used for illustrative icons. In contrast to S and M content sizes, size XL does not align with the corresponding text headline size.',
					},
				},
				component: {
					xs: {
						value: '({semantic.line-height.utility.s} + ({semantic.dimension.clamp-smaller-50.150} * 2))',
						type: 'sizing',
						description:
							'Component sizes define a uniform height system to achieve a more consistent layout structure. Size XS is e.g. used for the tags. The sizing is derived from line-height S and a padding top and bottom.',
					},
					s: {
						value: '({semantic.line-height.utility.s} + ({semantic.dimension.linear-50.200} * 2))',
						type: 'sizing',
						description:
							'Component sizes define a uniform height system to achieve a more consistent layout structure. Size S is e.g. used for the small button, tabs and small avatar. The sizing is derived from line-height S and a padding top and bottom.',
					},
					m: {
						value: '({semantic.line-height.utility.s} + ({semantic.dimension.linear-50.350} * 2))',
						type: 'sizing',
						description:
							'Component sizes define a uniform height system to achieve a more consistent layout structure. Size M is e.g. used for the medium button, input fields, segmented control and medium avatar. The sizing is derived from line-height S and a padding top and bottom.',
					},
					l: {
						value: '{semantic.dimension.linear-200.1600}',
						type: 'sizing',
						description:
							'Component sizes define a uniform height system to achieve a more consistent layout structure. Size L is e.g. used for the large avatar and contained icons.',
					},
					xl: {
						value: '{semantic.dimension.linear-300.2000}',
						type: 'sizing',
						description:
							'Component sizes define a uniform height system to achieve a more consistent layout structure. Size L is e.g. used for the extra large avatar and contained icons.',
					},
				},
			},
			spacing: {
				'dynamic-s': {
					'100': {
						type: 'spacing',
						value: '{core.dimension.100}',
					},
					'200': {
						type: 'spacing',
						value: '{core.dimension.200}',
					},
					'300': {
						type: 'spacing',
						value: '{core.dimension.300}',
					},
					'400': {
						type: 'spacing',
						value: '{core.dimension.400}',
					},
					'600': {
						type: 'spacing',
						value: '{core.dimension.600}',
					},
					'800': {
						type: 'spacing',
						value: '{core.dimension.800}',
					},
					'1200': {
						type: 'spacing',
						value: '{core.dimension.1200}',
					},
					'1400': {
						type: 'spacing',
						value: '{core.dimension.1400}',
					},
					'1600': {
						type: 'spacing',
						value: '{core.dimension.1600}',
					},
					'2400': {
						type: 'spacing',
						value: '{core.dimension.2400}',
					},
				},
				'dynamic-m': {
					'100': {
						type: 'spacing',
						value: '{core.dimension.100}',
					},
					'200': {
						type: 'spacing',
						value: '{core.dimension.200}',
					},
					'300': {
						type: 'spacing',
						value: '{core.dimension.300}',
					},
					'400': {
						type: 'spacing',
						value: '{core.dimension.400}',
					},
					'600': {
						type: 'spacing',
						value: '{core.dimension.600}',
					},
					'800': {
						type: 'spacing',
						value: '{core.dimension.800}',
					},
					'1200': {
						type: 'spacing',
						value: '{core.dimension.1200}',
					},
					'1400': {
						type: 'spacing',
						value: '{core.dimension.1400}',
					},
					'1600': {
						type: 'spacing',
						value: '{core.dimension.1600}',
					},
					'2400': {
						type: 'spacing',
						value: '{core.dimension.2400}',
					},
				},
				'dynamic-l': {
					'100': {
						type: 'spacing',
						value: '{core.dimension.100}',
					},
					'200': {
						type: 'spacing',
						value: '{core.dimension.200}',
					},
					'300': {
						type: 'spacing',
						value: '{core.dimension.300}',
					},
					'400': {
						type: 'spacing',
						value: '{core.dimension.400}',
					},
					'600': {
						type: 'spacing',
						value: '{core.dimension.600}',
					},
					'800': {
						type: 'spacing',
						value: '{core.dimension.800}',
					},
					'1200': {
						type: 'spacing',
						value: '{core.dimension.1200}',
					},
					'1400': {
						type: 'spacing',
						value: '{core.dimension.1400}',
					},
					'1600': {
						type: 'spacing',
						value: '{core.dimension.1600}',
					},
					'2400': {
						type: 'spacing',
						value: '{core.dimension.2400}',
					},
				},
				icon: {
					s: {
						adjustment: {
							value: '{core.dimension.100}',
							type: 'spacing',
							description:
								'Due to different renderings of text and icon combinations in components with insets, functional icons need a visual adjustment (reduction of inset).',
						},
					},
					m: {
						adjustment: {
							value: '{core.dimension.100}',
							type: 'spacing',
							description:
								'Due to different renderings of text and icon combinations in components with insets, functional icons need a visual adjustment (reduction of inset).',
						},
					},
				},
				content: {
					s: {
						gap: {
							plain: {
								value: '{core.dimension.100}',
								type: 'spacing',
								description: 'Gap between text (e.g. text and icon) for elements without surroundings (e.g. link)',
							},
							contained: {
								value: '{semantic.dimension.linear-50.200}',
								type: 'spacing',
								description: 'Gap between text (e.g. text and icon) for elements with surroundings (e.g. button)',
							},
						},
					},
					m: {
						gap: {
							plain: {
								value: '{core.dimension.100}',
								type: 'spacing',
								description: 'Gap between text (e.g. text and icon) for elements without surroundings (e.g. link)',
							},
							contained: {
								value: '{semantic.dimension.linear-50.200}',
								type: 'spacing',
								description: 'Gap between text (e.g. text and icon) for elements with surroundings (e.g. button)',
							},
						},
					},
				},
				focus: {
					offset: {
						type: 'spacing',
						value: '{core.dimension.50}',
					},
				},
				label: {
					m: {
						stack: {
							value: '{semantic.dimension.linear-50.100}',
							type: 'spacing',
							description: 'Used to space the label and its associated hint message',
						},
						gap: {
							value: '{semantic.dimension.clamp-smaller-100.300}',
							type: 'spacing',
							description: 'Used to space the label and its distance to e.g. control elements',
						},
					},
				},
				list: {
					xs: {
						value: '{semantic.dimension.linear-50.200}',
						type: 'spacing',
					},
					s: {
						value: '{semantic.dimension.linear-100.300}',
						type: 'spacing',
					},
					m: {
						value: '{semantic.dimension.linear-100.400}',
						type: 'spacing',
					},
					l: {
						value: '{semantic.dimension.linear-100.500}',
						type: 'spacing',
					},
					xl: {
						value: '{semantic.dimension.linear-100.600}',
						type: 'spacing',
					},
				},
			},
			'max-width': {
				text: {
					type: 'sizing',
					value: '1088',
				},
			},
			'font-size': {
				body: {
					s: {
						value: 'roundTo({semantic.font-size.body.m} / {semantic.internal.font-size.shrink-ratio.body})',
						type: 'fontSizes',
					},
					m: {
						value: '{semantic.internal.font-size.base}',
						type: 'fontSizes',
					},
					l: {
						value: 'roundTo({semantic.font-size.body.m} * {semantic.internal.font-size.growth-ratio.body})',
						type: 'fontSizes',
					},
				},
				utility: {
					s: {
						value: 'roundTo({semantic.font-size.utility.m} / {semantic.internal.font-size.shrink-ratio.utility})',
						type: 'fontSizes',
					},
					m: {
						value: '{semantic.internal.font-size.base}',
						type: 'fontSizes',
					},
					indication: {
						value: '{core.dimension.300}',
						type: 'fontSizes',
					},
				},
				headline: {
					s: {
						value: 'roundTo({semantic.font-size.headline.m} / {semantic.internal.font-size.shrink-ratio.headline})',
						type: 'fontSizes',
					},
					m: {
						value: '{semantic.internal.font-size.base}',
						type: 'fontSizes',
					},
					l: {
						value: 'roundTo({semantic.font-size.headline.m} * {semantic.internal.font-size.growth-ratio.headline})',
						type: 'fontSizes',
					},
					xl: {
						value: 'roundTo({semantic.font-size.headline.l} * {semantic.internal.font-size.growth-ratio.headline})',
						type: 'fontSizes',
					},
					'2xl': {
						value: 'roundTo({semantic.font-size.headline.xl} * {semantic.internal.font-size.growth-ratio.headline})',
						type: 'fontSizes',
					},
					'3xl': {
						value: 'roundTo({semantic.font-size.headline.2xl} * {semantic.internal.font-size.growth-ratio.headline})',
						type: 'fontSizes',
					},
					'4xl': {
						value: 'roundTo({semantic.font-size.headline.3xl} * {semantic.internal.font-size.growth-ratio.headline})',
						type: 'fontSizes',
					},
					'5xl': {
						value: 'roundTo({semantic.font-size.headline.4xl} * {semantic.internal.font-size.growth-ratio.headline})',
						type: 'fontSizes',
					},
					'6xl': {
						value: 'roundTo({semantic.font-size.headline.5xl} * {semantic.internal.font-size.growth-ratio.headline})',
						type: 'fontSizes',
					},
				},
			},
			'line-height': {
				body: {
					s: {
						value:
							'(ceil(({semantic.font-size.body.s} * {semantic.internal.line-height.factor} + {semantic.internal.line-height.cushion.body}) / {semantic.internal.grid.baseline.body}) * {semantic.internal.grid.baseline.body})',
						type: 'lineHeights',
					},
					m: {
						value:
							'(ceil(({semantic.font-size.body.m} * {semantic.internal.line-height.factor} + {semantic.internal.line-height.cushion.body}) / {semantic.internal.grid.baseline.body}) * {semantic.internal.grid.baseline.body})',
						type: 'lineHeights',
					},
					l: {
						value:
							'(ceil(({semantic.font-size.body.l} * {semantic.internal.line-height.factor} + {semantic.internal.line-height.cushion.body}) / {semantic.internal.grid.baseline.body}) * {semantic.internal.grid.baseline.body})',
						type: 'lineHeights',
					},
				},
				utility: {
					s: {
						value:
							'(ceil(({semantic.font-size.utility.s} * {semantic.internal.line-height.factor} + {semantic.internal.line-height.cushion.utility}) / {semantic.internal.grid.baseline.utility}) * {semantic.internal.grid.baseline.utility})',
						type: 'lineHeights',
					},
					m: {
						value:
							'(ceil(({semantic.font-size.utility.m} * {semantic.internal.line-height.factor} + {semantic.internal.line-height.cushion.utility}) / {semantic.internal.grid.baseline.utility}) * {semantic.internal.grid.baseline.utility})',
						type: 'lineHeights',
					},
					indication: {
						value: '{core.dimension.400}',
						type: 'lineHeights',
					},
				},
				headline: {
					s: {
						value:
							'(ceil(({semantic.font-size.headline.s} * {semantic.internal.line-height.factor} + {semantic.internal.line-height.cushion.headline}) / {semantic.internal.grid.baseline.headline}) * {semantic.internal.grid.baseline.headline})',
						type: 'lineHeights',
					},
					m: {
						value:
							'(ceil(({semantic.font-size.headline.m} * {semantic.internal.line-height.factor} + {semantic.internal.line-height.cushion.headline}) / {semantic.internal.grid.baseline.headline}) * {semantic.internal.grid.baseline.headline})',
						type: 'lineHeights',
					},
					l: {
						value:
							'(ceil(({semantic.font-size.headline.l} * {semantic.internal.line-height.factor} + {semantic.internal.line-height.cushion.headline}) / {semantic.internal.grid.baseline.headline}) * {semantic.internal.grid.baseline.headline})',
						type: 'lineHeights',
					},
					xl: {
						value:
							'(ceil(({semantic.font-size.headline.xl} * {semantic.internal.line-height.factor} + {semantic.internal.line-height.cushion.headline}) / {semantic.internal.grid.baseline.headline}) * {semantic.internal.grid.baseline.headline})',
						type: 'lineHeights',
					},
					'2xl': {
						value:
							'(ceil(({semantic.font-size.headline.2xl} * {semantic.internal.line-height.factor} + {semantic.internal.line-height.cushion.headline}) / {semantic.internal.grid.baseline.headline}) * {semantic.internal.grid.baseline.headline})',
						type: 'lineHeights',
					},
					'3xl': {
						value:
							'(ceil(({semantic.font-size.headline.3xl} * {semantic.internal.line-height.factor} + {semantic.internal.line-height.cushion.headline}) / {semantic.internal.grid.baseline.headline}) * {semantic.internal.grid.baseline.headline})',
						type: 'lineHeights',
					},
					'4xl': {
						value:
							'(ceil(({semantic.font-size.headline.4xl} * {semantic.internal.line-height.factor} + {semantic.internal.line-height.cushion.headline}) / {semantic.internal.grid.baseline.headline}) * {semantic.internal.grid.baseline.headline})',
						type: 'lineHeights',
					},
					'5xl': {
						value:
							'(ceil(({semantic.font-size.headline.5xl} * {semantic.internal.line-height.factor} + {semantic.internal.line-height.cushion.headline}) / {semantic.internal.grid.baseline.headline}) * {semantic.internal.grid.baseline.headline})',
						type: 'lineHeights',
					},
					'6xl': {
						value:
							'(ceil(({semantic.font-size.headline.6xl} * {semantic.internal.line-height.factor} + {semantic.internal.line-height.cushion.headline}) / {semantic.internal.grid.baseline.headline}) * {semantic.internal.grid.baseline.headline})',
						type: 'lineHeights',
					},
				},
			},
			'font-family': {
				body: {
					value: '{core.font-family.primary}',
					type: 'fontFamilies',
				},
				utility: {
					value: '{core.font-family.primary}',
					type: 'fontFamilies',
				},
				headline: {
					value: '{core.font-family.primary}',
					type: 'fontFamilies',
				},
			},
			'font-weight': {
				body: {
					value: '{core.font-weight.100}',
					type: 'fontWeights',
				},
				utility: {
					default: {
						value: '{core.font-weight.100}',
						type: 'fontWeights',
					},
					attention: {
						value: '{core.font-weight.200}',
						type: 'fontWeights',
					},
					indication: {
						value: '{core.font-weight.150}',
						type: 'fontWeights',
					},
				},
				headline: {
					s: {
						value:
							'({semantic.internal.font-weight.headline.smaller} - ({semantic.internal.font-weight.headline.smaller} - {semantic.internal.font-weight.headline.larger}) * min(floor({semantic.font-size.headline.s} / {semantic.internal.font-weight.treshhold}), 1))',
						type: 'fontWeights',
					},
					m: {
						value:
							'({semantic.internal.font-weight.headline.smaller} - ({semantic.internal.font-weight.headline.smaller} - {semantic.internal.font-weight.headline.larger}) * min(floor({semantic.font-size.headline.m} / {semantic.internal.font-weight.treshhold}), 1))',
						type: 'fontWeights',
					},
					l: {
						value:
							'({semantic.internal.font-weight.headline.smaller} - ({semantic.internal.font-weight.headline.smaller} - {semantic.internal.font-weight.headline.larger}) * min(floor({semantic.font-size.headline.l} / {semantic.internal.font-weight.treshhold}), 1))',
						type: 'fontWeights',
					},
					xl: {
						value:
							'({semantic.internal.font-weight.headline.smaller} - ({semantic.internal.font-weight.headline.smaller} - {semantic.internal.font-weight.headline.larger}) * min(floor({semantic.font-size.headline.xl} / {semantic.internal.font-weight.treshhold}), 1))',
						type: 'fontWeights',
					},
					'2xl': {
						value:
							'({semantic.internal.font-weight.headline.smaller} - ({semantic.internal.font-weight.headline.smaller} - {semantic.internal.font-weight.headline.larger}) * min(floor({semantic.font-size.headline.2xl} / {semantic.internal.font-weight.treshhold}), 1))',
						type: 'fontWeights',
					},
					'3xl': {
						value:
							'({semantic.internal.font-weight.headline.smaller} - ({semantic.internal.font-weight.headline.smaller} - {semantic.internal.font-weight.headline.larger}) * min(floor({semantic.font-size.headline.3xl} / {semantic.internal.font-weight.treshhold}), 1))',
						type: 'fontWeights',
					},
					'4xl': {
						value:
							'({semantic.internal.font-weight.headline.smaller} - ({semantic.internal.font-weight.headline.smaller} - {semantic.internal.font-weight.headline.larger}) * min(floor({semantic.font-size.headline.4xl} / {semantic.internal.font-weight.treshhold}), 1))',
						type: 'fontWeights',
					},
					'5xl': {
						value:
							'({semantic.internal.font-weight.headline.smaller} - ({semantic.internal.font-weight.headline.smaller} - {semantic.internal.font-weight.headline.larger}) * min(floor({semantic.font-size.headline.5xl} / {semantic.internal.font-weight.treshhold}), 1))',
						type: 'fontWeights',
					},
					'6xl': {
						value:
							'({semantic.internal.font-weight.headline.smaller} - ({semantic.internal.font-weight.headline.smaller} - {semantic.internal.font-weight.headline.larger}) * min(floor({semantic.font-size.headline.5xl} / {semantic.internal.font-weight.treshhold}), 1))',
						type: 'fontWeights',
					},
				},
			},
			'letter-spacing': {
				body: {
					s: {
						value:
							'({semantic.internal.letter-spacing.base} - {semantic.internal.letter-spacing.increment} * floor({semantic.font-size.body.s} / {semantic.internal.letter-spacing.treshhold}))',
						type: 'letterSpacing',
					},
					m: {
						value:
							'({semantic.internal.letter-spacing.base} - {semantic.internal.letter-spacing.increment} * floor({semantic.font-size.body.m} / {semantic.internal.letter-spacing.treshhold}))',
						type: 'letterSpacing',
					},
					l: {
						value:
							'({semantic.internal.letter-spacing.base} - {semantic.internal.letter-spacing.increment} * floor({semantic.font-size.body.l} / {semantic.internal.letter-spacing.treshhold}))',
						type: 'letterSpacing',
					},
				},
				utility: {
					s: {
						value:
							'({semantic.internal.letter-spacing.base} - {semantic.internal.letter-spacing.increment} * floor({semantic.font-size.utility.s} / {semantic.internal.letter-spacing.treshhold}))',
						type: 'letterSpacing',
					},
					m: {
						value:
							'({semantic.internal.letter-spacing.base} - {semantic.internal.letter-spacing.increment} * floor({semantic.font-size.utility.m} / {semantic.internal.letter-spacing.treshhold}))',
						type: 'letterSpacing',
					},
					indication: {
						value:
							'({semantic.internal.letter-spacing.base} - {semantic.internal.letter-spacing.increment} * floor({semantic.font-size.utility.indication} / {semantic.internal.letter-spacing.treshhold}))',
						type: 'letterSpacing',
					},
				},
				headline: {
					s: {
						value:
							'({semantic.internal.letter-spacing.base} - {semantic.internal.letter-spacing.increment} * floor({semantic.font-size.headline.s} / {semantic.internal.letter-spacing.treshhold}))',
						type: 'letterSpacing',
					},
					m: {
						value:
							'({semantic.internal.letter-spacing.base} - {semantic.internal.letter-spacing.increment} * floor({semantic.font-size.headline.m} / {semantic.internal.letter-spacing.treshhold}))',
						type: 'letterSpacing',
					},
					l: {
						value:
							'({semantic.internal.letter-spacing.base} - {semantic.internal.letter-spacing.increment} * floor({semantic.font-size.headline.l} / {semantic.internal.letter-spacing.treshhold}))',
						type: 'letterSpacing',
					},
					xl: {
						value:
							'({semantic.internal.letter-spacing.base} - {semantic.internal.letter-spacing.increment} * floor({semantic.font-size.headline.xl} / {semantic.internal.letter-spacing.treshhold}))',
						type: 'letterSpacing',
					},
					'2xl': {
						value:
							'({semantic.internal.letter-spacing.base} - {semantic.internal.letter-spacing.increment} * floor({semantic.font-size.headline.2xl} / {semantic.internal.letter-spacing.treshhold}))',
						type: 'letterSpacing',
					},
					'3xl': {
						value:
							'({semantic.internal.letter-spacing.base} - {semantic.internal.letter-spacing.increment} * floor({semantic.font-size.headline.3xl} / {semantic.internal.letter-spacing.treshhold}))',
						type: 'letterSpacing',
					},
					'4xl': {
						value:
							'({semantic.internal.letter-spacing.base} - {semantic.internal.letter-spacing.increment} * floor({semantic.font-size.headline.4xl} / {semantic.internal.letter-spacing.treshhold}))',
						type: 'letterSpacing',
					},
					'5xl': {
						value:
							'({semantic.internal.letter-spacing.base} - {semantic.internal.letter-spacing.increment} * floor({semantic.font-size.headline.5xl} / {semantic.internal.letter-spacing.treshhold}))',
						type: 'letterSpacing',
					},
					'6xl': {
						value:
							'({semantic.internal.letter-spacing.base} - {semantic.internal.letter-spacing.increment} * floor({semantic.font-size.headline.6xl} / {semantic.internal.letter-spacing.treshhold}))',
						type: 'letterSpacing',
					},
				},
			},
			'text-case': {
				body: {
					value: '{core.text-case.none}',
					type: 'textCase',
				},
				utility: {
					value: '{core.text-case.none}',
					type: 'textCase',
				},
				headline: {
					s: {
						value: '{core.text-case.none}',
						type: 'textCase',
					},
					m: {
						value: '{core.text-case.none}',
						type: 'textCase',
					},
					l: {
						value: '{core.text-case.none}',
						type: 'textCase',
					},
					xl: {
						value: '{core.text-case.none}',
						type: 'textCase',
					},
					'2xl': {
						value: '{core.text-case.none}',
						type: 'textCase',
					},
					'3xl': {
						value: '{core.text-case.none}',
						type: 'textCase',
					},
					'4xl': {
						value: '{core.text-case.none}',
						type: 'textCase',
					},
					'5xl': {
						value: '{core.text-case.none}',
						type: 'textCase',
					},
					'6xl': {
						value: '{core.text-case.none}',
						type: 'textCase',
					},
				},
			},
			'text-decoration': {
				action: {
					none: {
						value: '{core.text-decoration.none}',
						type: 'textDecoration',
					},
					emphasis: {
						value: '{core.text-decoration.underline}',
						type: 'textDecoration',
					},
				},
			},
			motion: {
				curves: {
					default: {
						change: {
							x1: {
								value: '0.25',
								type: 'number',
							},
							y1: {
								value: '0.1',
								type: 'number',
							},
							x2: {
								value: '0.25',
								type: 'number',
							},
							y2: {
								value: '1',
								type: 'number',
							},
						},
						enter: {
							x1: {
								value: '0',
								type: 'number',
							},
							y1: {
								value: '0',
								type: 'number',
							},
							x2: {
								value: '0.58',
								type: 'number',
							},
							y2: {
								value: '1',
								type: 'number',
							},
						},
						exit: {
							x1: {
								value: '0.42',
								type: 'number',
							},
							y1: {
								value: '0',
								type: 'number',
							},
							x2: {
								value: '1',
								type: 'number',
							},
							y2: {
								value: '1',
								type: 'number',
							},
						},
					},
				},
				duration: {
					static: {
						fast: {
							value: '{core.motion.duration.100}',
							type: 'other',
						},
						medium: {
							value: '{core.motion.duration.250}',
							type: 'other',
						},
						slow: {
							value: '{core.motion.duration.500}',
							type: 'other',
						},
						modifier: {
							'slow-to-fast': {
								value: '1',
								type: 'other',
								description:
									'Enables motion theming be changing (reducing) timings via calculations, similar to the spacing modification system',
							},
							'slow-to-medium': {
								value: '1',
								type: 'other',
								description:
									'Enables motion theming be changing (reducing) timings via calculations, similar to the spacing modification system',
							},
							'medium-to-fast': {
								value: '1',
								type: 'other',
								description:
									'Enables motion theming be changing (reducing) timings via calculations, similar to the spacing modification system',
							},
						},
					},
					dynamic: {
						'slow-to-fast': {
							value: '{core.motion.duration.500}',
							type: 'other',
						},
						'slow-to-medium': {
							value: '{core.motion.duration.500}',
							type: 'other',
						},
						'medium-to-fast': {
							value: '{core.motion.duration.250}',
							type: 'other',
						},
					},
				},
				transition: {
					focus: {
						duration: {
							value: '{semantic.motion.duration.static.fast}',
							type: 'other',
						},
						easing: {
							value: '{semantic.motion.easing.default.change}',
							type: 'other',
						},
					},
				},
				easing: {
					default: {
						change: {
							value:
								'{semantic.motion.curves.default.change.x1}, {semantic.motion.curves.default.change.y1}, {semantic.motion.curves.default.change.x2}, {semantic.motion.curves.default.change.y2}',
							type: 'other',
						},
						enter: {
							value:
								'{semantic.motion.curves.default.enter.x1}, {semantic.motion.curves.default.enter.y1}, {semantic.motion.curves.default.enter.x2}, {semantic.motion.curves.default.enter.y2}',
							type: 'other',
						},
						exit: {
							value:
								'{semantic.motion.curves.default.exit.x1}, {semantic.motion.curves.default.exit.y1}, {semantic.motion.curves.default.exit.x2}, {semantic.motion.curves.default.exit.y2}',
							type: 'other',
						},
					},
				},
			},
			scaling: {
				initial: {
					value: '{core.scaling.100}',
					type: 'number',
				},
				shrink: {
					s: {
						value: '{core.scaling.75}',
						type: 'number',
					},
					m: {
						value: '{core.scaling.50}',
						type: 'number',
					},
					l: {
						value: '{core.scaling.25}',
						type: 'number',
					},
				},
			},
		},
		partials: {
			icon: {
				contained: {
					s: {
						size: {
							type: 'sizing',
							value: '{semantic.size.content.xs}',
						},
						surface: {
							size: {
								value: '{semantic.size.content.m}',
								type: 'sizing',
							},
						},
					},
					m: {
						size: {
							type: 'sizing',
							value: '{semantic.size.content.s}',
						},
						surface: {
							size: {
								value: '{semantic.size.component.s}',
								type: 'sizing',
							},
						},
					},
					l: {
						size: {
							type: 'sizing',
							value: '( {semantic.size.component.m} * {semantic.internal.contained.ratio.icon})',
						},
						surface: {
							size: {
								type: 'sizing',
								value: '{semantic.size.component.m}',
							},
						},
					},
					xl: {
						size: {
							type: 'sizing',
							value: '({semantic.size.component.l} * {semantic.internal.contained.ratio.icon})',
						},
						surface: {
							size: {
								type: 'sizing',
								value: '{semantic.size.component.l}',
							},
						},
					},
					'2xl': {
						size: {
							type: 'sizing',
							value: '({semantic.size.component.xl} * {semantic.internal.contained.ratio.icon})',
						},
						surface: {
							size: {
								type: 'sizing',
								value: '{semantic.size.component.xl}',
							},
						},
					},
				},
				plain: {
					s: {
						size: {
							value: '{semantic.size.content.s}',
							type: 'sizing',
						},
					},
					m: {
						size: {
							value: '{semantic.size.content.m}',
							type: 'sizing',
						},
					},
					l: {
						size: {
							value: '{semantic.size.content.l}',
							type: 'sizing',
						},
					},
					xl: {
						size: {
							value: '{semantic.size.content.xl}',
							type: 'sizing',
						},
					},
					'2xl': {
						size: {
							value: '{semantic.size.content.2xl}',
							type: 'sizing',
						},
					},
				},
			},
			indicator: {
				count: {
					'min-width': {
						type: 'sizing',
						value: '{semantic.dimension.clamp-smaller-50.400}',
					},
					height: {
						type: 'sizing',
						value: '{semantic.dimension.clamp-smaller-50.400}',
					},
					inset: {
						horizontal: {
							type: 'spacing',
							value: '{semantic.dimension.clamp-smaller-25.100}',
						},
						vertical: {
							value: '{semantic.dimension.static.0}',
							type: 'spacing',
						},
					},
				},
				countless: {
					size: {
						type: 'sizing',
						value: '{semantic.dimension.clamp-smaller-50.250}',
					},
				},
				icon: {
					s: {
						size: {
							type: 'sizing',
							value: '{semantic.dimension.clamp-smaller-50.300}',
						},
					},
					m: {
						size: {
							type: 'sizing',
							value: '{semantic.dimension.clamp-smaller-50.350}',
						},
					},
					l: {
						size: {
							type: 'sizing',
							value: '{semantic.dimension.linear-50.450}',
						},
					},
					xl: {
						size: {
							type: 'sizing',
							value: '{semantic.dimension.linear-50.500}',
						},
					},
				},
			},
			info: {
				size: {
					value: '{semantic.dimension.static.400}',
					type: 'sizing',
				},
			},
			'input-field': {
				gap: {
					type: 'spacing',
					value: '{semantic.dimension.linear-50.200}',
				},
				inset: {
					horizontal: {
						type: 'spacing',
						value: '{semantic.dimension.linear-100.400}',
					},
					vertical: {
						type: 'spacing',
						value: '(({semantic.size.component.m} - {semantic.line-height.utility.m}) / 2)',
						description:
							'Derives the vertical inset from the standard component size (origin: button sizes) and the line-height of the applied text style',
					},
				},
				'min-height': {
					type: 'sizing',
					value: '{semantic.size.component.m}',
					description:
						'Prevents a zero height input field in an unfilled state. Allows multi-line capability for text areas set as min-height.',
				},
			},
		},
		components: {
			accordion: {
				l: {
					title: {
						text: {
							opened: {
								type: 'typography',
								value: {
									fontFamily: '{semantic.font-family.headline}',
									fontWeight: '{core.font-weight.200}',
									lineHeight: '{semantic.line-height.headline.l}',
									fontSize: '{semantic.font-size.headline.l}',
									letterSpacing: '{semantic.letter-spacing.headline.l}',
									textCase: '{semantic.text-case.headline.l}',
								},
							},
							closed: {
								type: 'typography',
								value: {
									fontFamily: '{semantic.font-family.headline}',
									fontWeight: '{core.font-weight.100}',
									lineHeight: '{semantic.line-height.headline.l}',
									fontSize: '{semantic.font-size.headline.l}',
									letterSpacing: '{semantic.letter-spacing.headline.l}',
									textCase: '{semantic.text-case.headline.l}',
								},
							},
						},
					},
					item: {
						inset: {
							vertical: {
								type: 'spacing',
								value: '{semantic.dimension.linear-100.600}',
							},
						},
						gap: {
							type: 'spacing',
							value: '{semantic.dimension.linear-200.1200}',
						},
						header: {
							gap: {
								type: 'spacing',
								value: '{semantic.dimension.static.800}',
							},
						},
					},
				},
				m: {
					item: {
						inset: {
							vertical: {
								type: 'spacing',
								value: '{semantic.dimension.linear-100.400}',
							},
						},
						gap: {
							type: 'spacing',
							value: '{semantic.dimension.linear-200.800}',
						},
						header: {
							gap: {
								type: 'spacing',
								value: '{semantic.dimension.static.600}',
							},
						},
					},
					title: {
						text: {
							opened: {
								type: 'typography',
								value: {
									fontFamily: '{semantic.font-family.headline}',
									fontWeight: '{core.font-weight.200}',
									lineHeight: '{semantic.line-height.headline.m}',
									fontSize: '{semantic.font-size.headline.m}',
									letterSpacing: '{semantic.letter-spacing.headline.m}',
									textCase: '{semantic.text-case.headline.m}',
								},
							},
							closed: {
								type: 'typography',
								value: {
									fontFamily: '{semantic.font-family.headline}',
									fontWeight: '{core.font-weight.100}',
									lineHeight: '{semantic.line-height.headline.m}',
									fontSize: '{semantic.font-size.headline.m}',
									letterSpacing: '{semantic.letter-spacing.headline.m}',
									textCase: '{semantic.text-case.headline.m}',
								},
							},
						},
					},
				},
			},
			avatar: {
				s: {
					icon: {
						size: {
							value: '({semantic.size.component.s} * {semantic.internal.contained.ratio.icon})',
							type: 'sizing',
						},
					},
					'font-size': {
						value: '({semantic.size.component.s} * {semantic.internal.contained.ratio.text})',
						type: 'fontSizes',
					},
					text: {
						value: {
							fontFamily: '{core.font-family.primary}',
							fontWeight: '{core.font-weight.150}',
							fontSize: '{avatar.s.font-size}',
							lineHeight: '{semantic.size.component.s}',
							textCase: '{core.text-case.uppercase}',
							letterSpacing: '0',
						},
						type: 'typography',
					},
				},
				m: {
					icon: {
						size: {
							value: '({semantic.size.component.m} * {semantic.internal.contained.ratio.icon})',
							type: 'sizing',
						},
					},
					'font-size': {
						value: '({semantic.size.component.m} * {semantic.internal.contained.ratio.text})',
						type: 'fontSizes',
					},
					text: {
						value: {
							fontFamily: '{core.font-family.primary}',
							fontWeight: '{core.font-weight.100}',
							fontSize: '{avatar.m.font-size}',
							lineHeight: '{semantic.size.component.m}',
							textCase: '{core.text-case.uppercase}',
							letterSpacing: '0',
						},
						type: 'typography',
					},
				},
				l: {
					icon: {
						size: {
							value: '({semantic.size.component.l} * {semantic.internal.contained.ratio.icon})',
							type: 'sizing',
						},
					},
					'font-size': {
						value: '({semantic.size.component.l} * {semantic.internal.contained.ratio.text})',
						type: 'fontSizes',
					},
					text: {
						value: {
							fontFamily: '{core.font-family.primary}',
							fontWeight: '{core.font-weight.100}',
							fontSize: '{avatar.l.font-size}',
							lineHeight: '{semantic.size.component.l}',
							textCase: '{core.text-case.uppercase}',
							letterSpacing: '0',
						},
						type: 'typography',
					},
				},
				xl: {
					icon: {
						size: {
							value: '({semantic.size.component.xl} * {semantic.internal.contained.ratio.icon})',
							type: 'sizing',
						},
					},
					'font-size': {
						value: '({semantic.size.component.xl} * {semantic.internal.contained.ratio.text})',
						type: 'fontSizes',
					},
					text: {
						value: {
							fontFamily: '{core.font-family.primary}',
							fontWeight: '{core.font-weight.100}',
							fontSize: '{avatar.xl.font-size}',
							lineHeight: '{semantic.size.component.xl}',
							textCase: '{core.text-case.uppercase}',
							letterSpacing: '0',
						},
						type: 'typography',
					},
				},
			},
			badge: {
				inset: {
					horizontal: {
						type: 'spacing',
						value: '{semantic.dimension.clamp-smaller-50.250}',
					},
					vertical: {
						type: 'spacing',
						value: '{semantic.dimension.static.50}',
					},
				},
			},
			button: {
				contained: {
					m: {
						inset: {
							horizontal: {
								type: 'spacing',
								value: '{semantic.dimension.linear-100.600}',
							},
							vertical: {
								type: 'spacing',
								value: '(({semantic.size.component.m} - {semantic.line-height.utility.s}) / 2)',
								description: 'Derives the vertical inset from the standard component sizes and the line-height of the applied text style',
							},
						},
						icon: {
							inset: {
								all: {
									type: 'spacing',
									value: '{button.contained.m.inset.vertical}',
									description: 'Derives the vertical inset from the standard component sizes and the line-height of the applied text style',
								},
							},
							'indicator-countless': {
								offset: {
									start: {
										type: 'spacing',
										value:
											'({button.contained.m.icon.inset.all} + ({semantic.size.content.s} / 2) + {button.indicator-countless.adjustment})',
									},
									bottom: {
										type: 'spacing',
										value:
											'({button.contained.m.icon.inset.all} + ({semantic.size.content.s} / 2) + {button.indicator-countless.adjustment})',
									},
								},
							},
							'indicator-count': {
								offset: {
									start: {
										type: 'spacing',
										value: '({button.contained.m.icon.inset.all} + ({semantic.size.content.s} / 2))',
									},
									bottom: {
										type: 'spacing',
										value: '({button.contained.m.icon.inset.all} + ({semantic.size.content.s} / 2))',
									},
								},
							},
						},
						'icon-before': {
							inset: {
								start: {
									type: 'spacing',
									value: '({button.contained.m.inset.horizontal} - {semantic.spacing.icon.s.adjustment})',
								},
								end: {
									type: 'spacing',
									value: '{button.contained.m.inset.horizontal}',
								},
								vertical: {
									value: '{button.contained.m.inset.vertical}',
									type: 'spacing',
									description: 'Derives the vertical inset from the standard component sizes and the line-height of the applied text style',
								},
							},
						},
						'icon-after': {
							inset: {
								start: {
									type: 'spacing',
									value: '{button.contained.m.inset.horizontal}',
								},
								end: {
									type: 'spacing',
									value: '({button.contained.m.inset.horizontal} - {semantic.spacing.icon.s.adjustment})',
								},
								vertical: {
									value: '{button.contained.m.inset.vertical}',
									type: 'spacing',
									description: 'Derives the vertical inset from the standard component sizes and the line-height of the applied text style',
								},
							},
						},
					},
					s: {
						inset: {
							horizontal: {
								type: 'spacing',
								value: '{semantic.dimension.linear-100.400}',
							},
							vertical: {
								type: 'spacing',
								value: '(({semantic.size.component.s} - {semantic.line-height.utility.s}) / 2)',
								description: 'Derives the vertical inset from the standard component sizes and the line-height of the applied text style',
							},
						},
						icon: {
							inset: {
								all: {
									type: 'spacing',
									value: '{button.contained.s.inset.vertical}',
									description: 'Derives the vertical inset from the standard component sizes and the line-height of the applied text style',
								},
							},
							'indicator-countless': {
								offset: {
									start: {
										type: 'spacing',
										value:
											'({button.contained.s.icon.inset.all} + ({semantic.size.content.s} / 2) + {button.indicator-countless.adjustment})',
									},
									bottom: {
										type: 'spacing',
										value:
											'({button.contained.s.icon.inset.all} + ({semantic.size.content.s} / 2) + {button.indicator-countless.adjustment})',
									},
								},
							},
							'indicator-count': {
								offset: {
									start: {
										type: 'spacing',
										value: '({button.contained.s.icon.inset.all} + ({semantic.size.content.s} / 2))',
									},
									bottom: {
										type: 'spacing',
										value: '({button.contained.s.icon.inset.all} + ({semantic.size.content.s} / 2))',
									},
								},
							},
						},
						'icon-before': {
							inset: {
								start: {
									type: 'spacing',
									value: '({button.contained.s.inset.horizontal} - {semantic.spacing.icon.s.adjustment})',
								},
								end: {
									type: 'spacing',
									value: '{button.contained.s.inset.horizontal}',
								},
								vertical: {
									value: '{button.contained.s.inset.vertical}',
									type: 'spacing',
									description: 'Derives the vertical inset from the standard component sizes and the line-height of the applied text style',
								},
							},
						},
						'icon-after': {
							inset: {
								start: {
									type: 'spacing',
									value: '{button.contained.s.inset.horizontal}',
								},
								end: {
									type: 'spacing',
									value: '({button.contained.s.inset.horizontal} - {semantic.spacing.icon.s.adjustment})',
								},
								vertical: {
									value: '{button.contained.s.inset.vertical}',
									type: 'spacing',
									description: 'Derives the vertical inset from the standard component sizes and the line-height of the applied text style',
								},
							},
						},
					},
					scaling: {
						resting: {
							type: 'number',
							value: '{semantic.scaling.initial}',
						},
						active: {
							type: 'number',
							value: '{semantic.scaling.shrink.s}',
						},
					},
					transition: {
						duration: {
							value: '{semantic.motion.duration.dynamic.medium-to-fast}',
							type: 'other',
						},
						easing: {
							value: '{semantic.motion.easing.default.change}',
							type: 'other',
						},
					},
				},
				'indicator-countless': {
					adjustment: {
						value: '{semantic.dimension.static.50}',
						type: 'spacing',
					},
				},
				plain: {
					s: {
						icon: {
							'indicator-countless': {
								offset: {
									start: {
										type: 'spacing',
										value: '(({semantic.size.content.s} / 2) + {button.indicator-countless.adjustment})',
									},
									bottom: {
										type: 'spacing',
										value: '(({semantic.size.content.s} / 2) + {button.indicator-countless.adjustment})',
									},
								},
							},
							'indicator-count': {
								offset: {
									start: {
										type: 'spacing',
										value: '{semantic.size.content.s} / 2',
									},
									bottom: {
										type: 'spacing',
										value: '{semantic.size.content.s} / 2',
									},
								},
							},
						},
					},
					m: {
						icon: {
							'indicator-countless': {
								offset: {
									start: {
										type: 'spacing',
										value: '(({semantic.size.content.m} / 2) + {button.indicator-countless.adjustment})',
									},
									bottom: {
										type: 'spacing',
										value: '(({semantic.size.content.m} / 2) + {button.indicator-countless.adjustment})',
									},
								},
							},
							'indicator-count': {
								offset: {
									start: {
										type: 'spacing',
										value: '({semantic.size.content.m} / 2)',
									},
									bottom: {
										type: 'spacing',
										value: '({semantic.size.content.m} / 2)',
									},
								},
							},
						},
					},
					scaling: {
						resting: {
							type: 'number',
							value: '{semantic.scaling.initial}',
						},
						active: {
							type: 'number',
							value: '{semantic.scaling.shrink.s}',
						},
					},
					transition: {
						duration: {
							value: '{semantic.motion.duration.dynamic.medium-to-fast}',
							type: 'other',
						},
						easing: {
							value: '{semantic.motion.easing.default.change}',
							type: 'other',
						},
					},
				},
			},
			divider: {
				height: {
					type: 'sizing',
					value: '{semantic.dimension.static.25}',
				},
			},
			dropdown: {
				item: {
					inset: {
						horizontal: {
							type: 'spacing',
							value: '{semantic.dimension.linear-100.400}',
						},
						vertical: {
							type: 'spacing',
							value: '{semantic.dimension.clamp-smaller-100.300}',
						},
					},
				},
				flyout: {
					inset: {
						vertical: {
							type: 'spacing',
							value: '({dropdown.item.inset.horizontal} / 2)',
						},
					},
				},
			},
			'form-field': {
				stack: {
					type: 'spacing',
					value: '{semantic.dimension.static.100}',
				},
				message: {
					inset: {
						vertical: {
							type: 'spacing',
							value: '{semantic.dimension.static.50}',
						},
					},
				},
				hint: {
					inset: {
						vertical: {
							type: 'spacing',
							value: '{semantic.dimension.static.50}',
						},
					},
				},
			},
			list: {
				m: {
					item: {
						gap: {
							value: '{semantic.dimension.clamp-smaller-100.300}',
							type: 'spacing',
						},
						bullet: {
							inset: {
								top: {
									value: '(({semantic.line-height.body.m} - {semantic.size.content.m}) / 2)',
									type: 'spacing',
								},
							},
						},
					},
					ordered: {
						item: {
							'min-width': {
								value: '{semantic.dimension.static.350}',
								type: 'sizing',
							},
						},
					},
					'level-2': {
						ordered: {
							inset: {
								start: {
									value: '({list.m.ordered.item.min-width} + {list.m.item.gap})',
									type: 'spacing',
								},
							},
						},
						'ordered-contained': {
							inset: {
								start: {
									value: '({semantic.size.content.m} + {list.m.item.gap})',
									type: 'spacing',
								},
							},
						},
						unordered: {
							inset: {
								start: {
									value: '({list.m.unordered.item.min-width} + {list.m.item.gap})',
									type: 'spacing',
								},
							},
						},
						icon: {
							inset: {
								start: {
									value: '({semantic.size.content.m} + {list.m.item.gap})',
									type: 'spacing',
								},
							},
						},
					},
					unordered: {
						item: {
							'min-width': {
								value: '{semantic.dimension.static.200}',
								type: 'sizing',
							},
						},
					},
				},
				s: {
					item: {
						gap: {
							value: '{semantic.dimension.clamp-smaller-100.300}',
							type: 'spacing',
						},
						bullet: {
							inset: {
								top: {
									value: '(({semantic.line-height.body.s} - {semantic.size.content.s}) / 2)',
									type: 'spacing',
								},
							},
						},
					},
					'level-2': {
						ordered: {
							inset: {
								start: {
									value: '({list.s.ordered.item.min-width} + {list.s.item.gap})',
									type: 'spacing',
								},
							},
						},
						'ordered-contained': {
							inset: {
								start: {
									value: '({semantic.size.content.s} + {list.s.item.gap})',
									type: 'spacing',
								},
							},
						},
						unordered: {
							inset: {
								start: {
									value: '({list.s.unordered.item.min-width} + {list.s.item.gap})',
									type: 'spacing',
								},
							},
						},
						icon: {
							inset: {
								start: {
									value: '({semantic.size.content.s} + {list.s.item.gap})',
									type: 'spacing',
								},
							},
						},
					},
					ordered: {
						item: {
							'min-width': {
								value: '{semantic.dimension.static.300}',
								type: 'sizing',
							},
						},
					},
					unordered: {
						item: {
							'min-width': {
								value: '{semantic.dimension.static.200}',
								type: 'sizing',
							},
						},
					},
				},
			},
			'radio-button': {
				selected: {
					'border-width': {
						value: '(({semantic.size.content.m} / 4) + {semantic.border-width.action})',
						type: 'borderWidth',
					},
				},
			},
			'segmented-control': {
				m: {
					button: {
						inset: {
							all: {
								type: 'spacing',
								value: '{semantic.dimension.linear-50.200}',
							},
						},
					},
					inset: {
						all: {
							value: '{semantic.dimension.static.100}',
							type: 'spacing',
						},
					},
					gap: {
						value: '{semantic.dimension.static.100}',
						type: 'spacing',
					},
				},
				s: {
					button: {
						inset: {
							all: {
								type: 'spacing',
								value: '{semantic.dimension.linear-25.100}',
							},
						},
					},
					inset: {
						all: {
							value: '{semantic.dimension.linear-25.100}',
							type: 'spacing',
						},
					},
					gap: {
						value: '{semantic.dimension.linear-25.100}',
						type: 'spacing',
					},
				},
			},
			switch: {
				width: {
					type: 'sizing',
					value: '({semantic.size.content.m} * 2)',
				},
				knob: {
					size: {
						type: 'sizing',
						value: '({semantic.size.content.m} - {semantic.dimension.static.200})',
					},
				},
				inset: {
					all: {
						type: 'spacing',
						value: '{semantic.dimension.static.100}',
					},
				},
			},
			tab: {
				gap: {
					value: '{semantic.dimension.linear-200.800}',
					type: 'spacing',
				},
				item: {
					inset: {
						bottom: {
							type: 'spacing',
							value: '{semantic.dimension.clamp-smaller-100.300}',
						},
					},
					label: {
						gap: {
							value: '{semantic.dimension.static.50}',
							type: 'spacing',
						},
					},
				},
				mask: {
					inset: {
						horizontal: {
							value: '{semantic.size.content.m}',
							type: 'spacing',
						},
					},
					fade: {
						width: {
							value: '{semantic.size.content.m}',
							type: 'sizing',
						},
					},
				},
			},
			tag: {
				height: {
					type: 'sizing',
					value: '({semantic.size.content.s} + (2 * {tag.inset.vertical}))',
				},
				inset: {
					horizontal: {
						type: 'spacing',
						value: '{semantic.dimension.clamp-smaller-50.300}',
					},
					vertical: {
						type: 'spacing',
						value: '{semantic.dimension.clamp-smaller-50.150}',
					},
				},
				selected: {
					inset: {
						start: {
							type: 'spacing',
							value: '({semantic.dimension.clamp-smaller-50.300} - {semantic.spacing.icon.s.adjustment})',
						},
						end: {
							type: 'spacing',
							value: '{semantic.dimension.clamp-smaller-50.300}',
						},
						vertical: {
							value: '{semantic.dimension.clamp-smaller-50.150}',
							type: 'spacing',
						},
					},
				},
				deletable: {
					inset: {
						start: {
							type: 'spacing',
							value: '{semantic.dimension.clamp-smaller-50.300}',
						},
						end: {
							type: 'spacing',
							value: '({semantic.dimension.clamp-smaller-50.300} - {semantic.spacing.icon.s.adjustment})',
						},
						vertical: {
							value: '{semantic.dimension.clamp-smaller-50.150}',
							type: 'spacing',
						},
					},
				},
			},
			tile: {
				stack: {
					type: 'spacing',
					value: '{semantic.dimension.static.200}',
				},
				gap: {
					type: 'spacing',
					value: '{semantic.dimension.linear-50.400}',
				},
				horizontal: {
					inset: {
						horizontal: {
							type: 'spacing',
							value: '{semantic.dimension.linear-50.400}',
						},
						vertical: {
							type: 'spacing',
							value: '{semantic.dimension.linear-50.350}',
						},
					},
					icon: {
						inset: {
							horizontal: {
								type: 'spacing',
								value: '{semantic.dimension.linear-50.400}',
							},
							top: {
								type: 'spacing',
								value: '{semantic.dimension.linear-100.600}',
							},
							bottom: {
								type: 'spacing',
								value: '{semantic.dimension.linear-50.350}',
							},
						},
						size: {
							type: 'sizing',
							value: '{semantic.dimension.clamp-smaller-200.1000}',
						},
					},
				},
				vertical: {
					inset: {
						horizontal: {
							type: 'spacing',
							value: '{semantic.dimension.linear-50.400}',
						},
						vertical: {
							type: 'spacing',
							value: '{semantic.dimension.linear-50.350}',
						},
					},
					icon: {
						size: {
							type: 'sizing',
							value: '{semantic.dimension.clamp-smaller-100.800}',
						},
					},
				},
				control: {
					offset: {
						top: {
							type: 'spacing',
							value: '{semantic.dimension.linear-50.300}',
						},
						end: {
							type: 'spacing',
							value: '{semantic.dimension.linear-50.300}',
						},
					},
				},
			},
			'toggle-button': {
				inset: {
					horizontal: {
						type: 'spacing',
						value: '{semantic.dimension.linear-100.600}',
					},
					vertical: {
						type: 'spacing',
						value: '{semantic.dimension.linear-50.350}',
					},
				},
			},
		},
	},
	dark: {
		semantic: {
			internal: {
				color: {
					disabled: {
						base: {
							value: '{core.color.gray.1200}',
							type: 'color',
						},
						mix: {
							value: '{core.color.white}',
							type: 'color',
						},
						palette: {
							'100': {
								type: 'color',
								value: '{semantic.internal.color.disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value: '0.07',
											space: 'srgb',
											color: '{semantic.internal.color.disabled.mix}',
										},
									},
								},
							},
							'200': {
								type: 'color',
								value: '{semantic.internal.color.disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value: '0.09',
											color: '{semantic.internal.color.disabled.mix}',
											space: 'srgb',
										},
									},
								},
							},
							'300': {
								type: 'color',
								value: '{semantic.internal.color.disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value: '0.11',
											space: 'srgb',
											color: '{semantic.internal.color.disabled.mix}',
										},
									},
								},
							},
							'400': {
								type: 'color',
								value: '{semantic.internal.color.disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value: '0.13',
											space: 'srgb',
											color: '{semantic.internal.color.disabled.mix}',
										},
									},
								},
							},
							'500': {
								type: 'color',
								value: '{semantic.internal.color.disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value: '0.15',
											space: 'srgb',
											color: '{semantic.internal.color.disabled.mix}',
										},
									},
								},
							},
							'600': {
								type: 'color',
								value: '{semantic.internal.color.disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value: '0.17',
											space: 'srgb',
											color: '{semantic.internal.color.disabled.mix}',
										},
									},
								},
							},
							'700': {
								type: 'color',
								value: '{semantic.internal.color.disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value: '0.19',
											space: 'srgb',
											color: '{semantic.internal.color.disabled.mix}',
										},
									},
								},
							},
							'800': {
								type: 'color',
								value: '{semantic.internal.color.disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value: '0.21',
											space: 'srgb',
											color: '{semantic.internal.color.disabled.mix}',
										},
									},
								},
							},
							'900': {
								type: 'color',
								value: '{semantic.internal.color.disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value: '0.23',
											space: 'srgb',
											color: '{semantic.internal.color.disabled.mix}',
										},
									},
								},
							},
							'1000': {
								type: 'color',
								value: '{semantic.internal.color.disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value: '0.25',
											space: 'srgb',
											color: '{semantic.internal.color.disabled.mix}',
										},
									},
								},
							},
							'1100': {
								type: 'color',
								value: '{semantic.internal.color.disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value: '0.27',
											space: 'srgb',
											color: '{semantic.internal.color.disabled.mix}',
										},
									},
								},
							},
							'1200': {
								type: 'color',
								value: '{semantic.internal.color.disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value: '0.29',
											space: 'srgb',
											color: '{semantic.internal.color.disabled.mix}',
										},
									},
								},
							},
							treshhold: {
								value: '0.05',
								type: 'number',
							},
							increment: {
								value: '0.02',
								type: 'number',
							},
						},
					},
					'on-disabled': {
						base: {
							value: '{core.color.gray.1200}',
							type: 'color',
						},
						mix: {
							value: '{core.color.white}',
							type: 'color',
						},
						palette: {
							'100': {
								type: 'color',
								value: '{semantic.internal.color.on-disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value: '{semantic.internal.color.on-disabled.palette.treshhold}',
											space: 'srgb',
											color: '{semantic.internal.color.on-disabled.mix}',
										},
									},
								},
							},
							'200': {
								type: 'color',
								value: '{semantic.internal.color.on-disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.on-disabled.palette.treshhold} - {semantic.internal.color.on-disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.on-disabled.mix}',
										},
									},
								},
							},
							'300': {
								type: 'color',
								value: '{semantic.internal.color.on-disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.on-disabled.palette.treshhold} - 2 * {semantic.internal.color.on-disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.on-disabled.mix}',
										},
									},
								},
							},
							'400': {
								type: 'color',
								value: '{semantic.internal.color.on-disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.on-disabled.palette.treshhold} - 3 * {semantic.internal.color.on-disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.on-disabled.mix}',
										},
									},
								},
							},
							'500': {
								type: 'color',
								value: '{semantic.internal.color.on-disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.on-disabled.palette.treshhold} - 4 * {semantic.internal.color.on-disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.on-disabled.mix}',
										},
									},
								},
							},
							'600': {
								type: 'color',
								value: '{semantic.internal.color.on-disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.on-disabled.palette.treshhold} - 5 * {semantic.internal.color.on-disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.on-disabled.mix}',
										},
									},
								},
							},
							'700': {
								type: 'color',
								value: '{semantic.internal.color.on-disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.on-disabled.palette.treshhold} - 6 * {semantic.internal.color.on-disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.on-disabled.mix}',
										},
									},
								},
							},
							'800': {
								type: 'color',
								value: '{semantic.internal.color.on-disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.on-disabled.palette.treshhold} - 7 * {semantic.internal.color.on-disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.on-disabled.mix}',
										},
									},
								},
							},
							'900': {
								type: 'color',
								value: '{semantic.internal.color.on-disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.on-disabled.palette.treshhold} - 8 * {semantic.internal.color.on-disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.on-disabled.mix}',
										},
									},
								},
							},
							'1000': {
								type: 'color',
								value: '{semantic.internal.color.on-disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.on-disabled.palette.treshhold} - 9 * {semantic.internal.color.on-disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.on-disabled.mix}',
										},
									},
								},
							},
							'1100': {
								type: 'color',
								value: '{semantic.internal.color.on-disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.on-disabled.palette.treshhold} - 10 * {semantic.internal.color.on-disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.on-disabled.mix}',
										},
									},
								},
							},
							'1200': {
								type: 'color',
								value: '{semantic.internal.color.on-disabled.base}',
								$extensions: {
									[tokenStudioTokenExtensionPropertyName]: {
										modify: {
											type: 'mix',
											value:
												'({semantic.internal.color.on-disabled.palette.treshhold} - 11 * {semantic.internal.color.on-disabled.palette.increment})',
											space: 'srgb',
											color: '{semantic.internal.color.on-disabled.mix}',
										},
									},
								},
							},
							treshhold: {
								value: '0.1',
								type: 'number',
							},
							increment: {
								value: '0.5',
								type: 'number',
							},
						},
					},
				},
				opacity: {
					elevation: {
						overlay: {
							'100': {
								value: '0.04',
								type: 'opacity',
							},
							'200': {
								value: '0.08',
								type: 'opacity',
							},
							'300': {
								value: '0.12',
								type: 'opacity',
							},
							'400': {
								value: '0.16',
								type: 'opacity',
							},
							'500': {
								value: '0.20',
								type: 'opacity',
							},
						},
					},
				},
			},
			color: {
				background: {
					default: {
						value: '{core.color.darkblue.1200}',
						type: 'color',
					},
				},
				brand: {
					primary: {
						resting: {
							value: '{core.color.inverse.200}',
							type: 'color',
						},
						hover: {
							value: '{core.color.inverse.300}',
							type: 'color',
						},
						active: {
							value: '{core.color.inverse.400}',
							type: 'color',
						},
						disabled: {
							value: '{semantic.internal.color.disabled.palette-inverse.200}',
							type: 'color',
						},
					},
					'primary-inverse': {
						resting: {
							value: '{core.color.inverse.200}',
							type: 'color',
						},
						hover: {
							value: '{core.color.inverse.300}',
							type: 'color',
						},
						active: {
							value: '{core.color.inverse.400}',
							type: 'color',
						},
						disabled: {
							value: '{semantic.internal.color.disabled.palette-inverse.200}',
							type: 'color',
						},
					},
				},
				surface: {
					default: {
						resting: {
							type: 'color',
							value: '{core.color.darkblue.1200}',
						},
						hover: {
							type: 'color',
							value: '{core.color.darkblue.1100}',
						},
						active: {
							type: 'color',
							value: '{core.color.darkblue.1000}',
						},
					},
					emphasis: {
						resting: {
							type: 'color',
							value: '{core.color.darkblue.1100}',
						},
						hover: {
							type: 'color',
							value: '{core.color.darkblue.1000}',
						},
						active: {
							type: 'color',
							value: '{core.color.darkblue.900}',
						},
					},
				},
				'on-surface': {
					primary: {
						resting: {
							type: 'color',
							value: '{core.color.blue.200}',
						},
						readonly: {
							type: 'color',
							value: '{core.color.gray.500}',
						},
					},
					secondary: {
						resting: {
							type: 'color',
							value: '{core.color.blue.500}',
						},
						readonly: {
							type: 'color',
							value: '{core.color.gray.700}',
						},
					},
					'primary-inverse': {
						resting: {
							type: 'color',
							value: '{core.color.inverse.200}',
						},
					},
				},
				border: {
					primary: {
						resting: {
							type: 'color',
							value: '{core.color.blue.600}',
						},
						hover: {
							type: 'color',
							value: '{core.color.blue.500}',
						},
						active: {
							type: 'color',
							value: '{core.color.blue.400}',
						},
					},
					secondary: {
						resting: {
							type: 'color',
							value: '{core.color.blue.700}',
						},
						hover: {
							type: 'color',
							value: '{core.color.blue.600}',
						},
						active: {
							type: 'color',
							value: '{core.color.blue.500}',
						},
					},
					tertiary: {
						resting: {
							type: 'color',
							value: '{core.color.blue.1000}',
						},
						hover: {
							type: 'color',
							value: '{core.color.blue.900}',
						},
						active: {
							type: 'color',
							value: '{core.color.blue.800}',
						},
					},
					'primary-inverse': {
						resting: {
							type: 'color',
							value: '{core.color.inverse.200}',
						},
					},
					focus: {
						type: 'color',
						value: '{core.color.aqua.700}',
					},
				},
				signal: {
					attention: {
						critical: {
							resting: {
								type: 'color',
								value: '{core.color.red.600}',
							},
							hover: {
								type: 'color',
								value: '{core.color.red.500}',
							},
							active: {
								type: 'color',
								value: '{core.color.red.400}',
							},
						},
						warning: {
							resting: {
								type: 'color',
								value: '{core.color.yellow.600}',
							},
							hover: {
								type: 'color',
								value: '{core.color.yellow.500}',
							},
							active: {
								type: 'color',
								value: '{core.color.yellow.400}',
							},
						},
						positive: {
							resting: {
								type: 'color',
								value: '{core.color.green.600}',
							},
							hover: {
								type: 'color',
								value: '{core.color.green.500}',
							},
							active: {
								type: 'color',
								value: '{core.color.green.400}',
							},
						},
						info: {
							resting: {
								type: 'color',
								value: '{core.color.blue.600}',
							},
							hover: {
								type: 'color',
								value: '{core.color.blue.500}',
							},
							active: {
								type: 'color',
								value: '{core.color.blue.400}',
							},
						},
					},
					subtle: {
						critical: {
							resting: {
								type: 'color',
								value: '{core.color.red.1000}',
							},
							hover: {
								type: 'color',
								value: '{core.color.red.900}',
							},
							active: {
								type: 'color',
								value: '{core.color.red.800}',
							},
						},
						warning: {
							resting: {
								type: 'color',
								value: '{core.color.yellow.1000}',
							},
							hover: {
								type: 'color',
								value: '{core.color.yellow.900}',
							},
							active: {
								type: 'color',
								value: '{core.color.yellow.800}',
							},
						},
						positive: {
							resting: {
								type: 'color',
								value: '{core.color.green.1000}',
							},
							hover: {
								type: 'color',
								value: '{core.color.green.900}',
							},
							active: {
								type: 'color',
								value: '{core.color.green.800}',
							},
						},
						info: {
							resting: {
								type: 'color',
								value: '{core.color.blue.1000}',
							},
							hover: {
								type: 'color',
								value: '{core.color.blue.900}',
							},
							active: {
								type: 'color',
								value: '{core.color.blue.800}',
							},
						},
					},
				},
				'on-signal': {
					attention: {
						resting: {
							type: 'color',
							value: '{core.color.darkblue.1200}',
						},
					},
					subtle: {
						critical: {
							resting: {
								type: 'color',
								value: '{core.color.red.500}',
							},
						},
						warning: {
							resting: {
								type: 'color',
								value: '{core.color.yellow.500}',
							},
						},
						positive: {
							resting: {
								type: 'color',
								value: '{core.color.green.500}',
							},
						},
						info: {
							resting: {
								type: 'color',
								value: '{core.color.blue.500}',
							},
						},
					},
				},
				accent: {
					attention: {
						yellow: {
							resting: {
								type: 'color',
								value: '{core.color.yellow.600}',
							},
							hover: {
								type: 'color',
								value: '{core.color.yellow.500}',
							},
							active: {
								type: 'color',
								value: '{core.color.yellow.400}',
							},
						},
						orange: {
							resting: {
								type: 'color',
								value: '{core.color.orange.600}',
							},
							hover: {
								type: 'color',
								value: '{core.color.orange.500}',
							},
							active: {
								type: 'color',
								value: '{core.color.orange.400}',
							},
						},
						red: {
							resting: {
								type: 'color',
								value: '{core.color.red.600}',
							},
							hover: {
								type: 'color',
								value: '{core.color.red.500}',
							},
							active: {
								type: 'color',
								value: '{core.color.red.400}',
							},
						},
						purple: {
							resting: {
								type: 'color',
								value: '{core.color.purple.600}',
							},
							hover: {
								type: 'color',
								value: '{core.color.purple.500}',
							},
							active: {
								type: 'color',
								value: '{core.color.purple.400}',
							},
						},
						blue: {
							resting: {
								type: 'color',
								value: '{core.color.blue.600}',
							},
							hover: {
								type: 'color',
								value: '{core.color.blue.500}',
							},
							active: {
								type: 'color',
								value: '{core.color.blue.400}',
							},
						},
						aqua: {
							resting: {
								type: 'color',
								value: '{core.color.aqua.600}',
							},
							hover: {
								type: 'color',
								value: '{core.color.aqua.500}',
							},
							active: {
								type: 'color',
								value: '{core.color.aqua.400}',
							},
						},
						teal: {
							resting: {
								type: 'color',
								value: '{core.color.teal.600}',
							},
							hover: {
								type: 'color',
								value: '{core.color.teal.500}',
							},
							active: {
								type: 'color',
								value: '{core.color.teal.400}',
							},
						},
						green: {
							resting: {
								type: 'color',
								value: '{core.color.green.600}',
							},
							hover: {
								type: 'color',
								value: '{core.color.green.500}',
							},
							active: {
								type: 'color',
								value: '{core.color.green.400}',
							},
						},
						gray: {
							resting: {
								type: 'color',
								value: '{core.color.gray.600}',
							},
							hover: {
								type: 'color',
								value: '{core.color.gray.500}',
							},
							active: {
								type: 'color',
								value: '{core.color.gray.400}',
							},
						},
					},
					subtle: {
						yellow: {
							resting: {
								type: 'color',
								value: '{core.color.yellow.1000}',
							},
							hover: {
								type: 'color',
								value: '{core.color.yellow.900}',
							},
							active: {
								type: 'color',
								value: '{core.color.yellow.800}',
							},
						},
						orange: {
							resting: {
								type: 'color',
								value: '{core.color.orange.1000}',
							},
							hover: {
								type: 'color',
								value: '{core.color.orange.900}',
							},
							active: {
								type: 'color',
								value: '{core.color.orange.800}',
							},
						},
						red: {
							resting: {
								type: 'color',
								value: '{core.color.red.1000}',
							},
							hover: {
								type: 'color',
								value: '{core.color.red.900}',
							},
							active: {
								type: 'color',
								value: '{core.color.red.800}',
							},
						},
						purple: {
							resting: {
								type: 'color',
								value: '{core.color.purple.1000}',
							},
							hover: {
								type: 'color',
								value: '{core.color.purple.900}',
							},
							active: {
								type: 'color',
								value: '{core.color.purple.800}',
							},
						},
						blue: {
							resting: {
								type: 'color',
								value: '{core.color.blue.1000}',
							},
							hover: {
								type: 'color',
								value: '{core.color.blue.900}',
							},
							active: {
								type: 'color',
								value: '{core.color.blue.800}',
							},
						},
						aqua: {
							resting: {
								type: 'color',
								value: '{core.color.aqua.1000}',
							},
							hover: {
								type: 'color',
								value: '{core.color.aqua.900}',
							},
							active: {
								type: 'color',
								value: '{core.color.aqua.800}',
							},
						},
						teal: {
							resting: {
								type: 'color',
								value: '{core.color.teal.1000}',
							},
							hover: {
								type: 'color',
								value: '{core.color.teal.900}',
							},
							active: {
								type: 'color',
								value: '{core.color.teal.800}',
							},
						},
						green: {
							resting: {
								type: 'color',
								value: '{core.color.green.1000}',
							},
							hover: {
								type: 'color',
								value: '{core.color.green.900}',
							},
							active: {
								type: 'color',
								value: '{core.color.green.800}',
							},
						},
						gray: {
							resting: {
								type: 'color',
								value: '{core.color.gray.1000}',
							},
							hover: {
								type: 'color',
								value: '{core.color.gray.900}',
							},
							active: {
								type: 'color',
								value: '{core.color.gray.800}',
							},
						},
					},
				},
				'on-accent': {
					attention: {
						resting: {
							type: 'color',
							value: '{core.color.darkblue.1200}',
						},
						hover: {
							type: 'color',
							value: '{core.color.darkblue.1100}',
						},
						active: {
							type: 'color',
							value: '{core.color.darkblue.1000}',
						},
					},
					subtle: {
						yellow: {
							resting: {
								type: 'color',
								value: '{core.color.yellow.500}',
							},
						},
						orange: {
							resting: {
								type: 'color',
								value: '{core.color.orange.500}',
							},
						},
						red: {
							resting: {
								type: 'color',
								value: '{core.color.red.500}',
							},
						},
						purple: {
							resting: {
								type: 'color',
								value: '{core.color.purple.500}',
							},
						},
						blue: {
							resting: {
								type: 'color',
								value: '{core.color.blue.500}',
							},
						},
						aqua: {
							resting: {
								type: 'color',
								value: '{core.color.aqua.500}',
							},
						},
						teal: {
							resting: {
								type: 'color',
								value: '{core.color.teal.500}',
							},
						},
						green: {
							resting: {
								type: 'color',
								value: '{core.color.green.500}',
							},
						},
						gray: {
							resting: {
								type: 'color',
								value: '{core.color.gray.500}',
							},
						},
					},
				},
				action: {
					primary: {
						resting: {
							type: 'color',
							value: '{core.color.blue.500}',
						},
						hover: {
							type: 'color',
							value: '{core.color.blue.400}',
						},
						active: {
							type: 'color',
							value: '{core.color.blue.300}',
						},
						readonly: {
							type: 'color',
							value: '{core.color.gray.500}',
						},
					},
					secondary: {
						resting: {
							type: 'color',
							value: '{core.color.blue.600}',
						},
						hover: {
							type: 'color',
							value: '{core.color.blue.500}',
						},
						active: {
							type: 'color',
							value: '{core.color.blue.400}',
						},
						readonly: {
							type: 'color',
							value: '{core.color.gray.600}',
						},
					},
					'primary-inverse': {
						resting: {
							type: 'color',
							value: '{core.color.inverse.200}',
						},
						hover: {
							type: 'color',
							value: '{core.color.inverse.300}',
						},
						active: {
							type: 'color',
							value: '{core.color.inverse.400}',
						},
					},
					surface: {
						attention: {
							resting: {
								type: 'color',
								value: '{core.color.blue.500}',
							},
							hover: {
								type: 'color',
								value: '{core.color.blue.400}',
							},
							active: {
								type: 'color',
								value: '{core.color.blue.300}',
							},
						},
					},
				},
				'on-action': {
					primary: {
						resting: {
							type: 'color',
							value: '{core.color.blue.1100}',
						},
						readonly: {
							type: 'color',
							value: '{core.color.gray.500}',
						},
					},
					secondary: {
						resting: {
							type: 'color',
							value: '{core.color.blue.1000}',
						},
						readonly: {
							type: 'color',
							value: '{core.color.gray.700}',
						},
					},
					'primary-inverse': {
						resting: {
							type: 'color',
							value: '{core.color.blue.1000}',
						},
					},
					'secondary-inverse': {
						resting: {
							type: 'color',
							value: '{core.color.blue.800}',
						},
					},
				},
				elevation: {
					shadow: {
						cast: {
							value: '{core.color.black}',
							type: 'color',
							$extensions: {
								[tokenStudioTokenExtensionPropertyName]: {
									modify: {
										type: 'alpha',
										value: '{semantic.internal.opacity.elevation.shadow.cast}',
										space: 'srgb',
									},
								},
							},
						},
						core: {
							value: '{core.color.black}',
							type: 'color',
							$extensions: {
								[tokenStudioTokenExtensionPropertyName]: {
									modify: {
										type: 'alpha',
										value: '{semantic.internal.opacity.elevation.shadow.core}',
										space: 'srgb',
									},
								},
							},
						},
					},
				},
			},
		},
	},
	'spacious-m': {
		semantic: {
			internal: {
				'font-size': {
					'growth-ratio': {
						headline: {
							value: '1.25',
							type: 'number',
						},
					},
				},
			},
		},
	},
	'spacious-l': {
		semantic: {
			internal: {
				'font-size': {
					'growth-ratio': {
						headline: {
							value: '1.3',
							type: 'number',
						},
					},
				},
			},
		},
	},
	compact: {
		semantic: {
			internal: {
				spacing: {
					modifier: {
						linear: {
							factor: {
								value: '1',
								type: 'number',
							},
						},
						'clamp-larger': {
							factor: {
								value: '0',
								type: 'number',
							},
						},
						'clamp-smaller': {
							factor: {
								value: '1',
								type: 'number',
							},
						},
					},
				},
				'font-size': {
					base: {
						value: '{core.font-size.user-agent}',
						type: 'fontSizes',
					},
					'growth-ratio': {
						headline: {
							value: '1.15',
							type: 'number',
						},
					},
				},
				'line-height': {
					cushion: {
						body: {
							value: '6',
							type: 'number',
						},
						utility: {
							value: '2',
							type: 'number',
						},
						headline: {
							value: '6',
							type: 'number',
						},
					},
				},
			},
			spacing: {
				'dynamic-s': {
					'100': {
						type: 'spacing',
						value: '{core.dimension.0}',
					},
					'200': {
						type: 'spacing',
						value: '{core.dimension.100}',
					},
					'300': {
						type: 'spacing',
						value: '{core.dimension.200}',
					},
					'400': {
						type: 'spacing',
						value: '{core.dimension.300}',
					},
					'600': {
						type: 'spacing',
						value: '{core.dimension.400}',
					},
					'800': {
						type: 'spacing',
						value: '{core.dimension.600}',
					},
					'1200': {
						type: 'spacing',
						value: '{core.dimension.800}',
					},
					'1400': {
						type: 'spacing',
						value: '{core.dimension.1200}',
					},
					'1600': {
						type: 'spacing',
						value: '{core.dimension.1400}',
					},
					'2400': {
						type: 'spacing',
						value: '{core.dimension.1600}',
					},
				},
				'dynamic-m': {
					'100': {
						type: 'spacing',
						value: '{core.dimension.0}',
					},
					'200': {
						type: 'spacing',
						value: '{core.dimension.0}',
					},
					'300': {
						type: 'spacing',
						value: '{core.dimension.100}',
					},
					'400': {
						type: 'spacing',
						value: '{core.dimension.200}',
					},
					'600': {
						type: 'spacing',
						value: '{core.dimension.300}',
					},
					'800': {
						type: 'spacing',
						value: '{core.dimension.400}',
					},
					'1200': {
						type: 'spacing',
						value: '{core.dimension.600}',
					},
					'1400': {
						type: 'spacing',
						value: '{core.dimension.800}',
					},
					'1600': {
						type: 'spacing',
						value: '{core.dimension.1200}',
					},
					'2400': {
						type: 'spacing',
						value: '{core.dimension.1400}',
					},
				},
				'dynamic-l': {
					'100': {
						type: 'spacing',
						value: '{core.dimension.0}',
					},
					'200': {
						type: 'spacing',
						value: '{core.dimension.0}',
					},
					'300': {
						type: 'spacing',
						value: '{core.dimension.0}',
					},
					'400': {
						type: 'spacing',
						value: '{core.dimension.100}',
					},
					'600': {
						type: 'spacing',
						value: '{core.dimension.200}',
					},
					'800': {
						type: 'spacing',
						value: '{core.dimension.300}',
					},
					'1200': {
						type: 'spacing',
						value: '{core.dimension.400}',
					},
					'1400': {
						type: 'spacing',
						value: '{core.dimension.600}',
					},
					'1600': {
						type: 'spacing',
						value: '{core.dimension.800}',
					},
					'2400': {
						type: 'spacing',
						value: '{core.dimension.1200}',
					},
				},
				icon: {
					s: {
						adjustment: {
							value: '{core.dimension.50}',
							type: 'spacing',
						},
					},
					m: {
						adjustment: {
							value: '{core.dimension.50}',
							type: 'spacing',
						},
					},
				},
			},
			'border-width': {
				focus: {
					type: 'borderWidth',
					value: '{core.border-width.200}',
				},
			},
			'font-size': {
				utility: {
					indication: {
						value: '{core.dimension.250}',
						type: 'fontSizes',
					},
				},
			},
			'line-height': {
				utility: {
					indication: {
						value: '{core.dimension.350}',
						type: 'lineHeights',
					},
				},
			},
		},
	},
	'compact-m': {
		semantic: {
			internal: {
				'font-size': {
					'growth-ratio': {
						headline: {
							value: '1.2',
							type: 'number',
						},
					},
				},
			},
		},
	},
	'compact-l': {
		semantic: {
			internal: {
				'font-size': {
					'growth-ratio': {
						headline: {
							value: '1.25',
							type: 'number',
						},
					},
				},
			},
		},
	},
	dense: {
		semantic: {
			internal: {
				spacing: {
					modifier: {
						linear: {
							factor: {
								value: '2',
								type: 'number',
							},
						},
						'clamp-larger': {
							factor: {
								value: '1',
								type: 'number',
							},
						},
						'clamp-smaller': {
							factor: {
								value: '1',
								type: 'number',
							},
						},
					},
				},
				'font-size': {
					'growth-ratio': {
						headline: {
							value: '1.105',
							type: 'number',
						},
					},
				},
			},
			spacing: {
				'dynamic-s': {
					'100': {
						type: 'spacing',
						value: '{core.dimension.0}',
					},
					'200': {
						type: 'spacing',
						value: '{core.dimension.0}',
					},
					'300': {
						type: 'spacing',
						value: '{core.dimension.100}',
					},
					'400': {
						type: 'spacing',
						value: '{core.dimension.200}',
					},
					'600': {
						type: 'spacing',
						value: '{core.dimension.300}',
					},
					'800': {
						type: 'spacing',
						value: '{core.dimension.400}',
					},
					'1200': {
						type: 'spacing',
						value: '{core.dimension.600}',
					},
					'1400': {
						type: 'spacing',
						value: '{core.dimension.800}',
					},
					'1600': {
						type: 'spacing',
						value: '{core.dimension.1200}',
					},
					'2400': {
						type: 'spacing',
						value: '{core.dimension.1400}',
					},
				},
				'dynamic-m': {
					'100': {
						type: 'spacing',
						value: '{core.dimension.0}',
					},
					'200': {
						type: 'spacing',
						value: '{core.dimension.0}',
					},
					'300': {
						type: 'spacing',
						value: '{core.dimension.0}',
					},
					'400': {
						type: 'spacing',
						value: '{core.dimension.100}',
					},
					'600': {
						type: 'spacing',
						value: '{core.dimension.200}',
					},
					'800': {
						type: 'spacing',
						value: '{core.dimension.300}',
					},
					'1200': {
						type: 'spacing',
						value: '{core.dimension.400}',
					},
					'1400': {
						type: 'spacing',
						value: '{core.dimension.600}',
					},
					'1600': {
						type: 'spacing',
						value: '{core.dimension.800}',
					},
					'2400': {
						type: 'spacing',
						value: '{core.dimension.1200}',
					},
				},
				'dynamic-l': {
					'100': {
						type: 'spacing',
						value: '{core.dimension.0}',
					},
					'200': {
						type: 'spacing',
						value: '{core.dimension.0}',
					},
					'300': {
						type: 'spacing',
						value: '{core.dimension.0}',
					},
					'400': {
						type: 'spacing',
						value: '{core.dimension.0}',
					},
					'600': {
						type: 'spacing',
						value: '{core.dimension.100}',
					},
					'800': {
						type: 'spacing',
						value: '{core.dimension.200}',
					},
					'1200': {
						type: 'spacing',
						value: '{core.dimension.300}',
					},
					'1400': {
						type: 'spacing',
						value: '{core.dimension.400}',
					},
					'1600': {
						type: 'spacing',
						value: '{core.dimension.600}',
					},
					'2400': {
						type: 'spacing',
						value: '{core.dimension.800}',
					},
				},
			},
		},
	},
	'dense-m': {
		semantic: {
			internal: {
				'font-size': {
					'growth-ratio': {
						headline: {
							value: '1.15',
							type: 'number',
						},
					},
				},
			},
		},
	},
	'dense-l': {
		semantic: {
			internal: {
				'font-size': {
					'growth-ratio': {
						headline: {
							value: '1.2',
							type: 'number',
						},
					},
				},
			},
		},
	},
	minimal: {
		semantic: {
			scaling: {
				shrink: {
					s: {
						value: '{core.scaling.100}',
						type: 'number',
					},
					m: {
						value: '{core.scaling.100}',
						type: 'number',
					},
					l: {
						value: '{core.scaling.100}',
						type: 'number',
					},
				},
			},
			motion: {
				duration: {
					dynamic: {
						'slow-to-fast': {
							value: '{core.motion.duration.100}',
							type: 'other',
						},
						'slow-to-medium': {
							value: '{core.motion.duration.250}',
							type: 'other',
						},
						'medium-to-fast': {
							value: '{core.motion.duration.100}',
							type: 'other',
						},
					},
				},
			},
		},
	},
	composites: {
		semantic: {
			text: {
				body: {
					s: {
						type: 'typography',
						value: {
							fontFamily: '{semantic.font-family.body}',
							fontWeight: '{semantic.font-weight.body}',
							lineHeight: '{semantic.line-height.body.s}',
							fontSize: '{semantic.font-size.body.s}',
							letterSpacing: '{semantic.letter-spacing.body.s}',
							textCase: '{semantic.text-case.body}',
						},
					},
					m: {
						type: 'typography',
						value: {
							fontFamily: '{semantic.font-family.body}',
							fontWeight: '{semantic.font-weight.body}',
							lineHeight: '{semantic.line-height.body.m}',
							fontSize: '{semantic.font-size.body.m}',
							letterSpacing: '{semantic.letter-spacing.body.m}',
							textCase: '{semantic.text-case.body}',
						},
					},
					l: {
						type: 'typography',
						value: {
							fontFamily: '{semantic.font-family.body}',
							fontWeight: '{semantic.font-weight.body}',
							lineHeight: '{semantic.line-height.body.l}',
							fontSize: '{semantic.font-size.body.l}',
							letterSpacing: '{semantic.letter-spacing.body.l}',
							textCase: '{semantic.text-case.body}',
						},
					},
				},
				utility: {
					indication: {
						type: 'typography',
						value: {
							fontFamily: '{semantic.font-family.utility}',
							fontWeight: '{semantic.font-weight.utility.indication}',
							lineHeight: '{semantic.line-height.utility.indication}',
							fontSize: '{semantic.font-size.utility.indication}',
							letterSpacing: '{semantic.letter-spacing.utility.indication}',
							textCase: '{semantic.text-case.utility}',
						},
					},
					default: {
						s: {
							type: 'typography',
							value: {
								fontFamily: '{semantic.font-family.utility}',
								fontWeight: '{semantic.font-weight.utility.default}',
								lineHeight: '{semantic.line-height.utility.s}',
								fontSize: '{semantic.font-size.utility.s}',
								letterSpacing: '{semantic.letter-spacing.utility.s}',
								textCase: '{semantic.text-case.utility}',
							},
						},
						m: {
							type: 'typography',
							value: {
								fontFamily: '{semantic.font-family.utility}',
								fontWeight: '{semantic.font-weight.utility.default}',
								lineHeight: '{semantic.line-height.utility.m}',
								fontSize: '{semantic.font-size.utility.m}',
								letterSpacing: '{semantic.letter-spacing.utility.m}',
								textCase: '{semantic.text-case.utility}',
							},
						},
					},
					attention: {
						s: {
							type: 'typography',
							value: {
								fontFamily: '{semantic.font-family.utility}',
								fontWeight: '{semantic.font-weight.utility.attention}',
								lineHeight: '{semantic.line-height.utility.s}',
								fontSize: '{semantic.font-size.utility.s}',
								letterSpacing: '{semantic.letter-spacing.utility.s}',
								textCase: '{semantic.text-case.utility}',
							},
						},
						m: {
							type: 'typography',
							value: {
								fontFamily: '{semantic.font-family.utility}',
								fontWeight: '{semantic.font-weight.utility.attention}',
								lineHeight: '{semantic.line-height.utility.m}',
								fontSize: '{semantic.font-size.utility.m}',
								letterSpacing: '{semantic.letter-spacing.utility.m}',
								textCase: '{semantic.text-case.utility}',
							},
						},
					},
				},
				action: {
					default: {
						s: {
							type: 'typography',
							value: {
								fontFamily: '{semantic.font-family.utility}',
								fontWeight: '{semantic.font-weight.utility.default}',
								lineHeight: '{semantic.line-height.utility.s}',
								fontSize: '{semantic.font-size.utility.s}',
								letterSpacing: '{semantic.letter-spacing.utility.s}',
								textCase: '{semantic.text-case.utility}',
								textDecoration: '{semantic.text-decoration.action.none}',
							},
						},
						m: {
							type: 'typography',
							value: {
								fontFamily: '{semantic.font-family.utility}',
								fontWeight: '{semantic.font-weight.utility.default}',
								lineHeight: '{semantic.line-height.utility.m}',
								fontSize: '{semantic.font-size.utility.m}',
								letterSpacing: '{semantic.letter-spacing.utility.m}',
								textCase: '{semantic.text-case.utility}',
								textDecoration: '{semantic.text-decoration.action.none}',
							},
						},
						emphasis: {
							s: {
								type: 'typography',
								value: {
									fontFamily: '{semantic.font-family.utility}',
									fontWeight: '{semantic.font-weight.utility.default}',
									lineHeight: '{semantic.line-height.utility.s}',
									fontSize: '{semantic.font-size.utility.s}',
									letterSpacing: '{semantic.letter-spacing.utility.s}',
									textCase: '{semantic.text-case.utility}',
									textDecoration: '{semantic.text-decoration.action.emphasis}',
								},
							},
							m: {
								type: 'typography',
								value: {
									fontFamily: '{semantic.font-family.utility}',
									fontWeight: '{semantic.font-weight.utility.default}',
									lineHeight: '{semantic.line-height.utility.m}',
									fontSize: '{semantic.font-size.utility.m}',
									letterSpacing: '{semantic.letter-spacing.utility.m}',
									textCase: '{semantic.text-case.utility}',
									textDecoration: '{semantic.text-decoration.action.emphasis}',
								},
							},
						},
					},
					attention: {
						s: {
							type: 'typography',
							value: {
								fontFamily: '{semantic.font-family.utility}',
								fontWeight: '{semantic.font-weight.utility.attention}',
								lineHeight: '{semantic.line-height.utility.s}',
								fontSize: '{semantic.font-size.utility.s}',
								letterSpacing: '{semantic.letter-spacing.utility.s}',
								textCase: '{semantic.text-case.utility}',
								textDecoration: '{semantic.text-decoration.action.none}',
							},
						},
						m: {
							type: 'typography',
							value: {
								fontFamily: '{semantic.font-family.utility}',
								fontWeight: '{semantic.font-weight.utility.attention}',
								lineHeight: '{semantic.line-height.utility.m}',
								fontSize: '{semantic.font-size.utility.m}',
								letterSpacing: '{semantic.letter-spacing.utility.m}',
								textCase: '{semantic.text-case.utility}',
								textDecoration: '{semantic.text-decoration.action.none}',
							},
						},
						emphasis: {
							s: {
								type: 'typography',
								value: {
									fontFamily: '{semantic.font-family.utility}',
									fontWeight: '{semantic.font-weight.utility.attention}',
									lineHeight: '{semantic.line-height.utility.s}',
									fontSize: '{semantic.font-size.utility.s}',
									letterSpacing: '{semantic.letter-spacing.utility.s}',
									textCase: '{semantic.text-case.utility}',
									textDecoration: '{semantic.text-decoration.action.emphasis}',
								},
							},
							m: {
								type: 'typography',
								value: {
									fontFamily: '{semantic.font-family.utility}',
									fontWeight: '{semantic.font-weight.utility.attention}',
									lineHeight: '{semantic.line-height.utility.m}',
									fontSize: '{semantic.font-size.utility.m}',
									letterSpacing: '{semantic.letter-spacing.utility.m}',
									textCase: '{semantic.text-case.utility}',
									textDecoration: '{semantic.text-decoration.action.emphasis}',
								},
							},
						},
					},
				},
				headline: {
					s: {
						type: 'typography',
						value: {
							fontFamily: '{semantic.font-family.headline}',
							fontWeight: '{semantic.font-weight.headline.s}',
							lineHeight: '{semantic.line-height.headline.s}',
							fontSize: '{semantic.font-size.headline.s}',
							letterSpacing: '{semantic.letter-spacing.headline.s}',
							textCase: '{semantic.text-case.headline.s}',
						},
					},
					m: {
						type: 'typography',
						value: {
							fontFamily: '{semantic.font-family.headline}',
							fontWeight: '{semantic.font-weight.headline.m}',
							lineHeight: '{semantic.line-height.headline.m}',
							fontSize: '{semantic.font-size.headline.m}',
							letterSpacing: '{semantic.letter-spacing.headline.m}',
							textCase: '{semantic.text-case.headline.m}',
						},
					},
					l: {
						type: 'typography',
						value: {
							fontFamily: '{semantic.font-family.headline}',
							fontWeight: '{semantic.font-weight.headline.l}',
							lineHeight: '{semantic.line-height.headline.l}',
							fontSize: '{semantic.font-size.headline.l}',
							letterSpacing: '{semantic.letter-spacing.headline.l}',
							textCase: '{semantic.text-case.headline.l}',
						},
					},
					xl: {
						type: 'typography',
						value: {
							fontFamily: '{semantic.font-family.headline}',
							fontWeight: '{semantic.font-weight.headline.xl}',
							lineHeight: '{semantic.line-height.headline.xl}',
							fontSize: '{semantic.font-size.headline.xl}',
							letterSpacing: '{semantic.letter-spacing.headline.2xl}',
							textCase: '{semantic.text-case.headline.xl}',
						},
					},
					'2xl': {
						type: 'typography',
						value: {
							fontFamily: '{semantic.font-family.headline}',
							fontWeight: '{semantic.font-weight.headline.2xl}',
							lineHeight: '{semantic.line-height.headline.2xl}',
							fontSize: '{semantic.font-size.headline.2xl}',
							letterSpacing: '{semantic.letter-spacing.headline.2xl}',
							textCase: '{semantic.text-case.headline.2xl}',
						},
					},
					'3xl': {
						type: 'typography',
						value: {
							fontFamily: '{semantic.font-family.headline}',
							fontWeight: '{semantic.font-weight.headline.3xl}',
							lineHeight: '{semantic.line-height.headline.3xl}',
							fontSize: '{semantic.font-size.headline.3xl}',
							letterSpacing: '{semantic.letter-spacing.headline.3xl}',
							textCase: '{semantic.text-case.headline.3xl}',
						},
					},
					'4xl': {
						type: 'typography',
						value: {
							fontFamily: '{semantic.font-family.headline}',
							fontWeight: '{semantic.font-weight.headline.4xl}',
							lineHeight: '{semantic.line-height.headline.4xl}',
							fontSize: '{semantic.font-size.headline.4xl}',
							letterSpacing: '{semantic.letter-spacing.headline.4xl}',
							textCase: '{semantic.text-case.headline.4xl}',
						},
					},
					'5xl': {
						type: 'typography',
						value: {
							fontFamily: '{semantic.font-family.headline}',
							fontWeight: '{semantic.font-weight.headline.5xl}',
							lineHeight: '{semantic.line-height.headline.5xl}',
							fontSize: '{semantic.font-size.headline.5xl}',
							letterSpacing: '{semantic.letter-spacing.headline.5xl}',
							textCase: '{semantic.text-case.headline.5xl}',
						},
					},
					'6xl': {
						type: 'typography',
						value: {
							fontFamily: '{semantic.font-family.headline}',
							fontWeight: '{semantic.font-weight.headline.6xl}',
							lineHeight: '{semantic.line-height.headline.6xl}',
							fontSize: '{semantic.font-size.headline.6xl}',
							letterSpacing: '{semantic.letter-spacing.headline.6xl}',
							textCase: '{semantic.text-case.headline.6xl}',
						},
					},
				},
			},
			elevation: {
				'100': {
					type: 'boxShadow',
					value: [
						{
							x: '{semantic.dimension.elevation.core.100.x}',
							y: '{semantic.dimension.elevation.core.100.y}',
							blur: '{semantic.dimension.elevation.core.100.blur}',
							spread: '{semantic.dimension.elevation.core.100.spread}',
							color: '{semantic.color.elevation.shadow.core}',
							type: 'dropShadow',
						},
						{
							x: '{semantic.dimension.elevation.cast.100.x}',
							y: '{semantic.dimension.elevation.cast.100.y}',
							blur: '{semantic.dimension.elevation.cast.100.blur}',
							spread: '{semantic.dimension.elevation.cast.100.spread}',
							color: '{semantic.color.elevation.shadow.cast}',
							type: 'dropShadow',
						},
					],
				},
				'200': {
					type: 'boxShadow',
					value: [
						{
							x: '{semantic.dimension.elevation.core.200.x}',
							y: '{semantic.dimension.elevation.core.200.y}',
							blur: '{semantic.dimension.elevation.core.200.blur}',
							spread: '{semantic.dimension.elevation.core.200.spread}',
							color: '{semantic.color.elevation.shadow.core}',
							type: 'dropShadow',
						},
						{
							x: '{semantic.dimension.elevation.cast.200.x}',
							y: '{semantic.dimension.elevation.cast.200.y}',
							blur: '{semantic.dimension.elevation.cast.200.blur}',
							spread: '{semantic.dimension.elevation.cast.200.spread}',
							color: '{semantic.color.elevation.shadow.cast}',
							type: 'dropShadow',
						},
					],
				},
				'300': {
					type: 'boxShadow',
					value: [
						{
							x: '{semantic.dimension.elevation.core.300.x}',
							y: '{semantic.dimension.elevation.core.300.y}',
							blur: '{semantic.dimension.elevation.core.300.blur}',
							spread: '{semantic.dimension.elevation.core.300.spread}',
							color: '{semantic.color.elevation.shadow.core}',
							type: 'dropShadow',
						},
						{
							x: '{semantic.dimension.elevation.cast.300.x}',
							y: '{semantic.dimension.elevation.cast.300.y}',
							blur: '{semantic.dimension.elevation.cast.300.blur}',
							spread: '{semantic.dimension.elevation.cast.300.spread}',
							color: '{semantic.color.elevation.shadow.cast}',
							type: 'dropShadow',
						},
					],
				},
				'400': {
					type: 'boxShadow',
					value: [
						{
							x: '{semantic.dimension.elevation.core.400.x}',
							y: '{semantic.dimension.elevation.core.400.y}',
							blur: '{semantic.dimension.elevation.core.400.blur}',
							spread: '{semantic.dimension.elevation.core.400.spread}',
							color: '{semantic.color.elevation.shadow.core}',
							type: 'dropShadow',
						},
						{
							x: '{semantic.dimension.elevation.cast.400.x}',
							y: '{semantic.dimension.elevation.cast.400.y}',
							blur: '{semantic.dimension.elevation.cast.400.blur}',
							spread: '{semantic.dimension.elevation.cast.400.spread}',
							color: '{semantic.color.elevation.shadow.cast}',
							type: 'dropShadow',
						},
					],
				},
				'500': {
					type: 'boxShadow',
					value: [
						{
							x: '{semantic.dimension.elevation.core.500.x}',
							y: '{semantic.dimension.elevation.core.500.y}',
							blur: '{semantic.dimension.elevation.core.500.blur}',
							spread: '{semantic.dimension.elevation.core.500.spread}',
							color: '{semantic.color.elevation.shadow.core}',
							type: 'dropShadow',
						},
						{
							x: '{semantic.dimension.elevation.cast.500.x}',
							y: '{semantic.dimension.elevation.cast.500.y}',
							blur: '{semantic.dimension.elevation.cast.500.blur}',
							spread: '{semantic.dimension.elevation.cast.500.spread}',
							color: '{semantic.color.elevation.shadow.cast}',
							type: 'dropShadow',
						},
					],
				},
			},
		},
	},
};

// Mock return values for dependencies
export const mockLoadTokenDataResult = {
	figmaTokenFullFilePaths: mockFigmaTokenFullFilePaths,
	allTokensPerModifier: mockAllTokensPerModifier,
};

// Test scenarios factory functions
export const createSuccessfulRunPreparationsScenario = () => {
	return {
		tokenSsotExtensionFolderPath: undefined,
		expectedResolvedFolder: mockTokensSsotFolder,
		expectedLoadTokenDataResult: mockLoadTokenDataResult,
	};
};

export const createCustomPathRunPreparationsScenario = () => {
	return {
		tokenSsotExtensionFolderPath: mockCustomTokenSsotExtensionFolderPath,
		expectedResolvedFolder: mockCustomTokenSsotExtensionFolderPath,
		expectedLoadTokenDataResult: mockLoadTokenDataResult,
	};
};

export const createCheckForTokenSetExtensionErrorScenario = () => {
	return {
		tokenSsotExtensionFolderPath: undefined,
		error: mockCheckForTokenSetExtensionError,
	};
};

export const createLoadTokenDataErrorScenario = () => {
	return {
		tokenSsotExtensionFolderPath: undefined,
		expectedResolvedFolder: mockTokensSsotFolder,
		error: mockLoadTokenDataError,
	};
};

export const createRunTokenPreparationsErrorScenario = () => {
	return {
		tokenSsotExtensionFolderPath: undefined,
		expectedResolvedFolder: mockTokensSsotFolder,
		expectedLoadTokenDataResult: mockLoadTokenDataResult,
		error: mockRunTokenPreparationsError,
	};
};
