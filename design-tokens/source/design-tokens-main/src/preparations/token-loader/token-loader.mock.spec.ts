// Mock data for token folder paths
export const mockTokenFolderPath = '/test/tokens';
export const mockEmptyTokenFolderPath = '/test/empty-tokens';
export const mockInvalidTokenFolderPath = '/test/invalid-tokens';

// Mock file paths (unsorted and sorted)
export const mockUnsortedFilePaths = [
	'/test/tokens/semantic/color-schemes/dark.json',
	'/test/tokens/core/colors.json',
	'/test/tokens/components/default/button.json',
	'/test/tokens/partials/default/indicator.json',
	'/test/tokens/core/typography.json',
	'/test/tokens/$metadata.json',
	'/test/tokens/$themes.json',
	'/test/tokens/semantic/color-schemes/light.json',
];

export const mockSortedFilePaths = [
	'/test/tokens/$metadata.json',
	'/test/tokens/$themes.json',
	'/test/tokens/core/colors.json',
	'/test/tokens/core/typography.json',
	'/test/tokens/semantic/color-schemes/dark.json',
	'/test/tokens/semantic/color-schemes/light.json',
	'/test/tokens/partials/default/indicator.json',
	'/test/tokens/components/default/button.json',
];

export const mockEmptyFilePaths: string[] = [];

// Mock file path parts map (path -> parts array)
export const mockFilePathPartsMap = new Map<string, string[]>([
	['/test/tokens/$metadata.json', ['tokens', '$metadata']],
	['/test/tokens/$themes.json', ['tokens', '$themes']],
	['/test/tokens/core/colors.json', ['tokens', 'core', 'colors']],
	['/test/tokens/core/typography.json', ['tokens', 'core', 'typography']],
	['/test/tokens/semantic/color-schemes/dark.json', ['tokens', 'semantic', 'color-schemes', 'dark']],
	['/test/tokens/semantic/color-schemes/light.json', ['tokens', 'semantic', 'color-schemes', 'light']],
	['/test/tokens/partials/default/indicator.json', ['tokens', 'partials', 'default', 'indicator']],
	['/test/tokens/components/default/button.json', ['tokens', 'components', 'default', 'button']],
]);

// Mock file data map (path -> token data)
export const mockFileDataMap = new Map<string, object>([
	[
		'/test/tokens/core/colors.json',
		{
			color: {
				primary: {
					value: '#007bff',
					type: 'color',
				},
				secondary: {
					value: '#6c757d',
					type: 'color',
				},
			},
		},
	],
	[
		'/test/tokens/core/typography.json',
		{
			font: {
				size: {
					sm: {
						value: '14px',
						type: 'fontSizes',
					},
					md: {
						value: '16px',
						type: 'fontSizes',
					},
				},
			},
		},
	],
	[
		'/test/tokens/semantic/color-schemes/dark.json',
		{
			color: {
				background: {
					value: '{color.primary}',
					type: 'color',
				},
			},
		},
	],
	[
		'/test/tokens/semantic/color-schemes/light.json',
		{
			color: {
				background: {
					value: '#ffffff',
					type: 'color',
				},
			},
		},
	],
	[
		'/test/tokens/partials/default/indicator.json',
		{
			indicator: {
				color: {
					value: '{color.secondary}',
					type: 'color',
				},
			},
		},
	],
	[
		'/test/tokens/components/default/button.json',
		{
			button: {
				background: {
					value: '{color.primary}',
					type: 'color',
				},
				text: {
					value: '{font.size.md}',
					type: 'fontSizes',
				},
			},
		},
	],
]);

// Scenario factory functions
export const createSuccessfulLoadScenario = () => {
	return {
		tokenFolderPath: mockTokenFolderPath,
		unsortedFilePaths: mockUnsortedFilePaths,
		sortedFilePaths: mockSortedFilePaths,
		expectedResult: {
			figmaTokenFullFilePaths: mockSortedFilePaths,
			allTokensPerModifier: {
				core: {
					color: {
						primary: { value: '#007bff', type: 'color' },
						font: { size: { md: { value: '16px', type: 'fontSizes' } } },
					},
				},
				default: {
					button: {
						background: { value: '{color.primary}', type: 'color' },
					},
					indicator: { color: { value: '{color.secondary}', type: 'color' } },
				},
			},
		},
		expectedTokenData: {
			core: {
				color: {
					primary: { value: '#007bff', type: 'color' },
				},
				font: { size: { md: { value: '16px', type: 'fontSizes' } } },
			},
			default: {
				button: { background: { value: '{color.primary}', type: 'color' } },
				indicator: { color: { value: '{color.secondary}', type: 'color' } },
			},
		},
	};
};

export const createEmptyFolderScenario = () => {
	return {
		tokenFolderPath: mockEmptyTokenFolderPath,
		unsortedFilePaths: mockEmptyFilePaths,
		sortedFilePaths: mockEmptyFilePaths,
		expectedResult: {
			figmaTokenFullFilePaths: mockEmptyFilePaths,
			allTokensPerModifier: {},
		},
	};
};

export const createOnlyMetadataFilesScenario = () => {
	return {
		tokenFolderPath: mockTokenFolderPath,
		unsortedFilePaths: ['/test/tokens/$metadata.json', '/test/tokens/$themes.json'],
		sortedFilePaths: ['/test/tokens/$metadata.json', '/test/tokens/$themes.json'],
		expectedResult: {
			figmaTokenFullFilePaths: ['/test/tokens/$metadata.json', '/test/tokens/$themes.json'],
			allTokensPerModifier: {},
		},
	};
};

export const createSingleFileScenario = () => {
	return {
		tokenFolderPath: mockTokenFolderPath,
		unsortedFilePaths: ['/test/tokens/core/colors.json'],
		sortedFilePaths: ['/test/tokens/core/colors.json'],
		expectedResult: {
			figmaTokenFullFilePaths: ['/test/tokens/core/colors.json'],
			allTokensPerModifier: {
				core: {
					color: {
						primary: { value: '#007bff', type: 'color' },
						secondary: { value: '#6c757d', type: 'color' },
					},
				},
			},
		},
	};
};

export const createBlacklistedFilterScenario = () => {
	return {
		mockFolderPath: '/test/tokens',
		mockFilePaths: [
			'/tokens/core/colors.json',
			'/tokens/tools/figma/specifics/something.json',
			'/tokens/somthing/new-feature-EXPERIMENTAL.json',
			'/tokens/somthing/new-feature.json',
			'/tokens/components/button.json',
		],
		expectedFilteredPaths: ['/tokens/core/colors.json', '/tokens/somthing/new-feature.json', '/tokens/components/button.json'],
	};
};

// Error scenarios
export const createLoadFolderErrorScenario = () => {
	return {
		tokenFolderPath: mockInvalidTokenFolderPath,
		error: new Error('Failed to load files from folder'),
	};
};

export const createSortFilePathsErrorScenario = () => {
	return {
		tokenFolderPath: mockTokenFolderPath,
		unsortedFilePaths: mockUnsortedFilePaths,
		error: new Error('Failed to sort file paths'),
	};
};

export const createGetFilePathPartsErrorScenario = () => {
	return {
		tokenFolderPath: mockTokenFolderPath,
		filePath: '/test/tokens/core/colors.json',
		error: new Error('Failed to get file path parts'),
	};
};

export const createReadJsonFileErrorScenario = () => {
	return {
		tokenFolderPath: mockTokenFolderPath,
		filePath: '/test/tokens/core/colors.json',
		error: new Error('Failed to read JSON file'),
	};
};

export const createComplementTokensErrorScenario = () => {
	return {
		tokenFolderPath: mockTokenFolderPath,
		filePath: '/test/tokens/core/colors.json',
		error: new Error('Failed to complement tokens'),
	};
};

// Reset function to clear all mocks - implementation will be handled in test file
export const resetAllMocks = () => {
	// This will be implemented in the test file using jest.clearAllMocks()
};
