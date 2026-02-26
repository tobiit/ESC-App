import { jest } from '@jest/globals';
import { PreprocessingTokenStructureTypes, TokenLayers } from '../../../../shared/index.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock functions
export const mockedComplementTokensInObject = jest.fn();
export const mockedLogicalTokenSetError = jest.fn();
export const mockedResolvePreprocessingTokenStructureTypeFromFilePath = jest.fn();

// Mock file path parts for different token layers
export const mockCoreFilePathParts = ['tokens', TokenLayers.core];
export const mockSemanticFilePathParts = ['tokens', TokenLayers.semantic, 'color-schemes'];
export const mockPartialsFilePathParts = ['tokens', TokenLayers.partials, 'default'];
export const mockComponentsFilePathParts = ['tokens', TokenLayers.components, 'default'];

// Mock file names
export const mockCoreFileName = 'colors.json';
export const mockSemanticFileName = 'light.json';
export const mockPartialsFileName = 'indicator.json';
export const mockComponentsFileName = 'button.json';

// Mock token data structures
export const mockCoreTokenData = {
	color: {
		primary: { value: '#0066cc' },
		secondary: { value: '#00aaff' },
	},
};

export const mockSemanticTokenData = {
	semantic: {
		button: {
			color: { value: '{color.primary}' },
		},
	},
};

export const mockPartialsTokenData = {
	partial: {
		indicator: {
			size: { value: '16px' },
		},
	},
};

export const mockComponentsTokenData = {
	component: {
		button: {
			padding: { value: '8px' },
		},
	},
};

// Mock all tokens containers
export const mockAllTokensCore = {};
export const mockAllTokensSemantic = {};
export const mockAllTokensPartials = {
	[PreprocessingTokenStructureTypes.default]: {},
};
export const mockAllTokensComponents = {
	[PreprocessingTokenStructureTypes.default]: {},
};

// Mock all adjusted token data
export const mockAllAdjustedTokenData = {};

// Mock all tokens per modifier
export const mockAllTokensPerModifier = {};

// Mock token JSON file data
export const mockTokenJsonFileData = {
	tokens: {
		example: { value: 'test' },
	},
};

// Mock adjusted token file data
export const mockAdjustedTokenFileData = {
	adjusted: {
		token: { value: 'adjusted' },
	},
};

// Error case mock data
export const mockInvalidFilePathParts = ['tokens', 'invalid', 'extra', 'level'];
export const mockInvalidFileName = 'invalid.json';

// Expected preprocessing token structure types
export const mockExpectedCoreType = PreprocessingTokenStructureTypes.core;
export const mockExpectedSemanticType = PreprocessingTokenStructureTypes.default;
export const mockExpectedPartialsType = PreprocessingTokenStructureTypes.default;
export const mockExpectedComponentsType = PreprocessingTokenStructureTypes.default;

// Helper functions for test scenarios
export const createCoreTestScenario = () => {
	return {
		filePathParts: mockCoreFilePathParts,
		fileName: mockCoreFileName,
		allTokens: mockAllTokensCore,
		subTokenSet: mockCoreTokenData,
		expectedTokenLayer: TokenLayers.core,
		expectedType: mockExpectedCoreType,
	};
};

export const createSemanticTestScenario = () => {
	return {
		filePathParts: mockSemanticFilePathParts,
		fileName: mockSemanticFileName,
		allTokens: mockAllTokensSemantic,
		subTokenSet: mockSemanticTokenData,
		expectedTokenLayer: TokenLayers.semantic,
		expectedType: mockExpectedSemanticType,
	};
};

export const createPartialsTestScenario = () => {
	return {
		filePathParts: mockPartialsFilePathParts,
		fileName: mockPartialsFileName,
		allTokens: mockAllTokensPartials,
		subTokenSet: mockPartialsTokenData,
		expectedTokenLayer: TokenLayers.partials,
		expectedType: mockExpectedPartialsType,
	};
};

export const createComponentsTestScenario = () => {
	return {
		filePathParts: mockComponentsFilePathParts,
		fileName: mockComponentsFileName,
		allTokens: mockAllTokensComponents,
		subTokenSet: mockComponentsTokenData,
		expectedTokenLayer: TokenLayers.components,
		expectedType: mockExpectedComponentsType,
	};
};

export const createErrorTestScenario = () => {
	return {
		filePathParts: mockInvalidFilePathParts,
		fileName: mockInvalidFileName,
		allTokens: {},
		subTokenSet: {},
	};
};
