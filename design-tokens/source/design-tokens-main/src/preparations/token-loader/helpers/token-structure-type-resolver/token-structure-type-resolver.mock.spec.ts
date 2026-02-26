import { jest } from '@jest/globals';
import { PreprocessingTokenStructureTypes, ThemeModes, TokenLayers } from '../../../../shared/index.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock functions
export const mockedLogicalTokenSetError = jest.fn();

// Mock constants and dependencies
export const mockTokenSsotFileFormat = '.json';
export const mockDefaultTheme = [ThemeModes.light, ThemeModes.spacious, ThemeModes.lively];

// File path scenarios for different token layers
export const mockCoreFilePathParts = ['tokens', TokenLayers.core];
export const mockSemanticFilePathParts = ['tokens', TokenLayers.semantic, 'color-schemes'];
export const mockPartialsFilePathParts = ['tokens', TokenLayers.partials, 'default'];
export const mockComponentsFilePathParts = ['tokens', TokenLayers.components, 'default'];

// Invalid scenarios
export const mockInvalidTokenLayerFilePathParts = ['tokens', 'invalid'];
export const mockInvalidLongFilePathParts = ['tokens', TokenLayers.core, 'extra', 'level'];
export const mockEmptyFilePathParts: string[] = [];
export const mockSingleElementFilePathParts = ['tokens'];

// File names for different scenarios
export const mockCoreFileName = 'colors.json';
export const mockSemanticLightFileName = 'light.json';
export const mockSemanticDarkFileName = 'dark.json';
export const mockSemanticCompactFileName = 'compact.json';
export const mockSemanticDenseFileName = 'dense.json';
export const mockSemanticSpacious = 'spacious.json';
export const mockSemanticLivelyFileName = 'lively.json';
export const mockSemanticMinimalFileName = 'minimal.json';
export const mockSemanticCompositesFileName = 'composites.json';
export const mockPartialsFileName = 'indicator.json';
export const mockComponentsFileName = 'button.json';

// Helper functions for test scenarios
export const createCoreScenario = () => {
	return {
		filePathParts: mockCoreFilePathParts,
		fileName: mockCoreFileName,
		expectedType: PreprocessingTokenStructureTypes.core,
	};
};

export const createSemanticLightScenario = () => {
	return {
		filePathParts: mockSemanticFilePathParts,
		fileName: mockSemanticLightFileName,
		expectedType: PreprocessingTokenStructureTypes.default, // light is in defaultTheme
	};
};

export const createSemanticDarkScenario = () => {
	return {
		filePathParts: mockSemanticFilePathParts,
		fileName: mockSemanticDarkFileName,
		expectedType: PreprocessingTokenStructureTypes.dark, // dark is not in defaultTheme
	};
};

export const createSemanticCompactScenario = () => {
	return {
		filePathParts: mockSemanticFilePathParts,
		fileName: mockSemanticCompactFileName,
		expectedType: PreprocessingTokenStructureTypes.compact,
	};
};

export const createSemanticDenseScenario = () => {
	return {
		filePathParts: mockSemanticFilePathParts,
		fileName: mockSemanticDenseFileName,
		expectedType: PreprocessingTokenStructureTypes.dense,
	};
};

export const createSemanticSpaciouscenario = () => {
	return {
		filePathParts: mockSemanticFilePathParts,
		fileName: mockSemanticSpacious,
		expectedType: PreprocessingTokenStructureTypes.default, // spacious is in defaultTheme
	};
};

export const createSemanticLivelyScenario = () => {
	return {
		filePathParts: mockSemanticFilePathParts,
		fileName: mockSemanticLivelyFileName,
		expectedType: PreprocessingTokenStructureTypes.default, // lively is in defaultTheme
	};
};

export const createSemanticMinimalScenario = () => {
	return {
		filePathParts: mockSemanticFilePathParts,
		fileName: mockSemanticMinimalFileName,
		expectedType: PreprocessingTokenStructureTypes.minimal,
	};
};

export const createSemanticCompositesScenario = () => {
	return {
		filePathParts: mockSemanticFilePathParts,
		fileName: mockSemanticCompositesFileName,
		expectedType: PreprocessingTokenStructureTypes.composites,
	};
};

export const createPartialsScenario = () => {
	return {
		filePathParts: mockPartialsFilePathParts,
		fileName: mockPartialsFileName,
		expectedType: PreprocessingTokenStructureTypes.default,
	};
};

export const createComponentsScenario = () => {
	return {
		filePathParts: mockComponentsFilePathParts,
		fileName: mockComponentsFileName,
		expectedType: PreprocessingTokenStructureTypes.default,
	};
};

// Error scenarios
export const createInvalidTokenLayerScenario = () => {
	return {
		filePathParts: mockInvalidTokenLayerFilePathParts,
		fileName: mockCoreFileName,
	};
};

export const createInvalidLongPathScenario = () => {
	return {
		filePathParts: mockInvalidLongFilePathParts,
		fileName: mockCoreFileName,
	};
};

export const createEmptyPathScenario = () => {
	return {
		filePathParts: mockEmptyFilePathParts,
		fileName: mockCoreFileName,
	};
};

export const createSingleElementPathScenario = () => {
	return {
		filePathParts: mockSingleElementFilePathParts,
		fileName: mockCoreFileName,
	};
};

// Reset mocks helper
export const resetAllMocks = (): void => {
	mockedLogicalTokenSetError.mockReset();
};
