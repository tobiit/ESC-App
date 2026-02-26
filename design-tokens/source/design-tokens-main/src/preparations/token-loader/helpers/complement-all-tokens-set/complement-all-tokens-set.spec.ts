import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { complementTokensInObject, logicalTokenSetError, PreprocessingTokenStructureTypes, TokenLayers } from '../../../../shared/index.js';
import { resolvePreprocessingTokenStructureTypeFromFilePath } from '../token-structure-type-resolver/token-structure-type-resolver.js';
import { resolveTokenLayerBasePath } from '../token-layer-base-path-resolver/token-layer-base-path-resolver.js';
import { complementAllAdjustedTokenData, complementAllTokensPerModifier } from './complement-all-tokens-set.js';
import {
	createComponentsTestScenario,
	createCoreTestScenario,
	createErrorTestScenario,
	createPartialsTestScenario,
	createSemanticTestScenario,
	mockAdjustedTokenFileData,
	mockAllAdjustedTokenData,
	mockAllTokensPerModifier,
	mockComponentsFileName,
	mockComponentsFilePathParts,
	mockCoreFileName,
	mockCoreFilePathParts,
	mockInvalidFilePathParts,
	mockPartialsFileName,
	mockPartialsFilePathParts,
	mockSemanticFileName,
	mockSemanticFilePathParts,
	mockTokenJsonFileData,
} from './complement-all-tokens-set.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock the shared utilities
jest.mock('../../../../shared/index.js', () => {
	const actual: object = jest.requireActual('../../../../shared/index.js');
	return {
		...actual,
		complementTokensInObject: jest.fn(),
		logicalTokenSetError: jest.fn(),
	};
});

// Mock the token structure type resolver
jest.mock('../token-structure-type-resolver/token-structure-type-resolver.js', () => {
	return {
		resolvePreprocessingTokenStructureTypeFromFilePath: jest.fn(),
	};
});

// Mock the token layer base path resolver
jest.mock('../token-layer-base-path-resolver/token-layer-base-path-resolver.js', () => {
	return {
		resolveTokenLayerBasePath: jest.fn(),
	};
});

// Type the mocked functions
const mockComplementTokensInObject = complementTokensInObject as jest.MockedFunction<typeof complementTokensInObject>;
const mockLogicalTokenSetError = logicalTokenSetError as jest.MockedFunction<typeof logicalTokenSetError>;
const mockResolvePreprocessingTokenStructureTypeFromFilePath = resolvePreprocessingTokenStructureTypeFromFilePath as jest.MockedFunction<
	typeof resolvePreprocessingTokenStructureTypeFromFilePath
>;
const mockResolveTokenLayerBasePath = resolveTokenLayerBasePath as jest.MockedFunction<typeof resolveTokenLayerBasePath>;

describe('Complement All Tokens Set', () => {
	beforeEach(() => {
		jest.clearAllMocks();

		// Setup default mock returns for resolveTokenLayerBasePath
		mockResolveTokenLayerBasePath.mockImplementation((filePathParts: string[]) => {
			// Based on the file path, determine the token layer and base path level
			if (filePathParts.length >= 2) {
				const tokenLayer = filePathParts[1] as TokenLayers;
				return {
					tokenLayerBasePathLevel: 2, // Always 2 based on the resolver implementation
					tokenLayer,
				};
			}
			return {
				tokenLayerBasePathLevel: 2,
				tokenLayer: TokenLayers.core,
			};
		});
	});

	describe('complementAllAdjustedTokenData', () => {
		describe('core tokens (filePathParts.length === 2)', () => {
			it('should complement core tokens directly with token layer', () => {
				const scenario = createCoreTestScenario();
				mockResolvePreprocessingTokenStructureTypeFromFilePath.mockReturnValue(PreprocessingTokenStructureTypes.core);

				complementAllAdjustedTokenData(scenario.filePathParts, scenario.fileName, mockAllAdjustedTokenData, mockAdjustedTokenFileData);

				expect(mockResolvePreprocessingTokenStructureTypeFromFilePath).toHaveBeenCalledWith(
					scenario.filePathParts,
					scenario.fileName,
					2,
					TokenLayers.core,
				);
				expect(mockComplementTokensInObject).toHaveBeenCalledWith(mockAllAdjustedTokenData, mockAdjustedTokenFileData, TokenLayers.core);
				expect(mockLogicalTokenSetError).not.toHaveBeenCalled();
			});
			it('should handle core tokens with different token layer values', () => {
				const coreFilePathParts = ['tokens', TokenLayers.core];
				const fileName = 'dimensions.json';
				mockResolvePreprocessingTokenStructureTypeFromFilePath.mockReturnValue(PreprocessingTokenStructureTypes.core);

				complementAllAdjustedTokenData(coreFilePathParts, fileName, mockAllAdjustedTokenData, mockAdjustedTokenFileData);

				expect(mockComplementTokensInObject).toHaveBeenCalledWith(mockAllAdjustedTokenData, mockAdjustedTokenFileData, TokenLayers.core);
			});

			it('should handle partials tokens with 2-level path structure', () => {
				const partialsFilePathParts = ['tokens', TokenLayers.partials];
				const fileName = 'indicator.json';
				mockResolvePreprocessingTokenStructureTypeFromFilePath.mockReturnValue(PreprocessingTokenStructureTypes.default);

				complementAllAdjustedTokenData(partialsFilePathParts, fileName, mockAllAdjustedTokenData, mockAdjustedTokenFileData);

				expect(mockComplementTokensInObject).toHaveBeenCalledWith(
					mockAllAdjustedTokenData,
					mockAdjustedTokenFileData,
					TokenLayers.partials,
				);
			});

			it('should handle components tokens with 2-level path structure', () => {
				const componentsFilePathParts = ['tokens', TokenLayers.components];
				const fileName = 'button.json';
				mockResolvePreprocessingTokenStructureTypeFromFilePath.mockReturnValue(PreprocessingTokenStructureTypes.default);

				complementAllAdjustedTokenData(componentsFilePathParts, fileName, mockAllAdjustedTokenData, mockAdjustedTokenFileData);

				expect(mockComplementTokensInObject).toHaveBeenCalledWith(
					mockAllAdjustedTokenData,
					mockAdjustedTokenFileData,
					TokenLayers.components,
				);
			});
		});

		describe('semantic tokens (filePathParts.length === 3 && includes semantic)', () => {
			it('should complement semantic tokens with preprocessing token structure type', () => {
				const scenario = createSemanticTestScenario();
				mockResolvePreprocessingTokenStructureTypeFromFilePath.mockReturnValue(PreprocessingTokenStructureTypes.default);

				complementAllAdjustedTokenData(scenario.filePathParts, scenario.fileName, mockAllAdjustedTokenData, mockAdjustedTokenFileData);

				expect(mockResolvePreprocessingTokenStructureTypeFromFilePath).toHaveBeenCalledWith(
					scenario.filePathParts,
					scenario.fileName,
					2,
					TokenLayers.semantic,
				);
				expect(mockComplementTokensInObject).toHaveBeenCalledWith(
					mockAllAdjustedTokenData,
					mockAdjustedTokenFileData,
					PreprocessingTokenStructureTypes.default,
				);
			});

			it('should handle semantic tokens with different preprocessing types', () => {
				const semanticFilePathParts = ['tokens', TokenLayers.semantic, 'densities'];
				const fileName = 'compact.json';
				mockResolvePreprocessingTokenStructureTypeFromFilePath.mockReturnValue(PreprocessingTokenStructureTypes.compact);

				complementAllAdjustedTokenData(semanticFilePathParts, fileName, mockAllAdjustedTokenData, mockAdjustedTokenFileData);

				expect(mockComplementTokensInObject).toHaveBeenCalledWith(
					mockAllAdjustedTokenData,
					mockAdjustedTokenFileData,
					PreprocessingTokenStructureTypes.compact,
				);
			});

			it('should handle semantic tokens with dark theme type', () => {
				const semanticFilePathParts = ['tokens', TokenLayers.semantic, 'color-schemes'];
				const fileName = 'dark.json';
				mockResolvePreprocessingTokenStructureTypeFromFilePath.mockReturnValue(PreprocessingTokenStructureTypes.dark);

				complementAllAdjustedTokenData(semanticFilePathParts, fileName, mockAllAdjustedTokenData, mockAdjustedTokenFileData);

				expect(mockComplementTokensInObject).toHaveBeenCalledWith(
					mockAllAdjustedTokenData,
					mockAdjustedTokenFileData,
					PreprocessingTokenStructureTypes.dark,
				);
			});
		});

		describe('components and partials tokens (filePathParts.length === 3 && !includes semantic)', () => {
			it('should complement partials tokens with nested structure', () => {
				const scenario = createPartialsTestScenario();
				const mockPartialsContainer = { [PreprocessingTokenStructureTypes.default]: {} };
				const allTokensWithPartials = { ...mockAllAdjustedTokenData, ...mockPartialsContainer };
				mockResolvePreprocessingTokenStructureTypeFromFilePath.mockReturnValue(PreprocessingTokenStructureTypes.default);

				complementAllAdjustedTokenData(scenario.filePathParts, scenario.fileName, allTokensWithPartials, mockAdjustedTokenFileData);

				expect(mockResolvePreprocessingTokenStructureTypeFromFilePath).toHaveBeenCalledWith(
					scenario.filePathParts,
					scenario.fileName,
					2,
					TokenLayers.partials,
				);
				expect(mockComplementTokensInObject).toHaveBeenCalledWith(
					mockPartialsContainer[PreprocessingTokenStructureTypes.default],
					mockAdjustedTokenFileData,
					TokenLayers.partials,
				);
			});

			it('should complement components tokens with nested structure', () => {
				const scenario = createComponentsTestScenario();
				const mockComponentsContainer = { [PreprocessingTokenStructureTypes.default]: {} };
				const allTokensWithComponents = { ...mockAllAdjustedTokenData, ...mockComponentsContainer };
				mockResolvePreprocessingTokenStructureTypeFromFilePath.mockReturnValue(PreprocessingTokenStructureTypes.default);

				complementAllAdjustedTokenData(scenario.filePathParts, scenario.fileName, allTokensWithComponents, mockAdjustedTokenFileData);

				expect(mockResolvePreprocessingTokenStructureTypeFromFilePath).toHaveBeenCalledWith(
					scenario.filePathParts,
					scenario.fileName,
					2,
					TokenLayers.components,
				);
				expect(mockComplementTokensInObject).toHaveBeenCalledWith(
					mockComponentsContainer[PreprocessingTokenStructureTypes.default],
					mockAdjustedTokenFileData,
					TokenLayers.components,
				);
			});

			it('should handle components tokens with different preprocessing types', () => {
				const componentsFilePathParts = ['tokens', TokenLayers.components, 'dense'];
				const fileName = 'button.json';
				const mockComponentsContainer = { dense: {} };
				const allTokensWithComponents = { ...mockAllAdjustedTokenData, ...mockComponentsContainer };
				mockResolvePreprocessingTokenStructureTypeFromFilePath.mockReturnValue('dense' as PreprocessingTokenStructureTypes);

				complementAllAdjustedTokenData(componentsFilePathParts, fileName, allTokensWithComponents, mockAdjustedTokenFileData);

				expect(mockComplementTokensInObject).toHaveBeenCalledWith(
					mockComponentsContainer.dense,
					mockAdjustedTokenFileData,
					TokenLayers.components,
				);
			});
		});

		describe('error scenarios', () => {
			it('should call logicalTokenSetError for invalid file path structure', () => {
				const scenario = createErrorTestScenario();
				mockLogicalTokenSetError.mockImplementation(() => {
					throw new Error('Unexpected token file detected');
				});

				expect(() => {
					complementAllAdjustedTokenData(scenario.filePathParts, scenario.fileName, mockAllAdjustedTokenData, mockAdjustedTokenFileData);
				}).toThrow('Unexpected token file detected');

				expect(mockLogicalTokenSetError).toHaveBeenCalledWith(
					`Unexpected token file detected: ${scenario.filePathParts.join('/')}/${scenario.fileName}`,
				);
				expect(mockComplementTokensInObject).not.toHaveBeenCalled();
			});

			it('should handle edge case with empty file path parts', () => {
				const emptyFilePathParts: string[] = [];
				const fileName = 'test.json';
				mockLogicalTokenSetError.mockImplementation(() => {
					throw new Error('Unexpected token file detected');
				});

				expect(() => {
					complementAllAdjustedTokenData(emptyFilePathParts, fileName, mockAllAdjustedTokenData, mockAdjustedTokenFileData);
				}).toThrow('Unexpected token file detected');

				expect(mockLogicalTokenSetError).toHaveBeenCalledWith(`Unexpected token file detected: /${fileName}`);
			});

			it('should handle edge case with single element in file path parts', () => {
				const singleElementFilePathParts = ['tokens'];
				const fileName = 'test.json';
				mockLogicalTokenSetError.mockImplementation(() => {
					throw new Error('Unexpected token file detected');
				});

				expect(() => {
					complementAllAdjustedTokenData(singleElementFilePathParts, fileName, mockAllAdjustedTokenData, mockAdjustedTokenFileData);
				}).toThrow('Unexpected token file detected');

				expect(mockLogicalTokenSetError).toHaveBeenCalledWith(`Unexpected token file detected: tokens/${fileName}`);
			});
		});
	});

	describe('complementAllTokensPerModifier', () => {
		describe('core tokens (filePathParts.length === 2)', () => {
			it('should complement core tokens directly with token layer', () => {
				const scenario = createCoreTestScenario();
				mockResolvePreprocessingTokenStructureTypeFromFilePath.mockReturnValue(PreprocessingTokenStructureTypes.core);

				complementAllTokensPerModifier(scenario.filePathParts, scenario.fileName, mockAllTokensPerModifier, mockTokenJsonFileData);

				expect(mockResolvePreprocessingTokenStructureTypeFromFilePath).toHaveBeenCalledWith(
					scenario.filePathParts,
					scenario.fileName,
					2,
					TokenLayers.core,
				);
				expect(mockComplementTokensInObject).toHaveBeenCalledWith(mockAllTokensPerModifier, mockTokenJsonFileData, TokenLayers.core);
			});

			it('should handle partials tokens with 2-level path structure', () => {
				const partialsFilePathParts = ['tokens', TokenLayers.partials];
				const fileName = 'info.json';
				mockResolvePreprocessingTokenStructureTypeFromFilePath.mockReturnValue(PreprocessingTokenStructureTypes.default);

				complementAllTokensPerModifier(partialsFilePathParts, fileName, mockAllTokensPerModifier, mockTokenJsonFileData);

				expect(mockComplementTokensInObject).toHaveBeenCalledWith(mockAllTokensPerModifier, mockTokenJsonFileData, TokenLayers.partials);
			});

			it('should handle components tokens with 2-level path structure', () => {
				const componentsFilePathParts = ['tokens', TokenLayers.components];
				const fileName = 'avatar.json';
				mockResolvePreprocessingTokenStructureTypeFromFilePath.mockReturnValue(PreprocessingTokenStructureTypes.default);

				complementAllTokensPerModifier(componentsFilePathParts, fileName, mockAllTokensPerModifier, mockTokenJsonFileData);

				expect(mockComplementTokensInObject).toHaveBeenCalledWith(mockAllTokensPerModifier, mockTokenJsonFileData, TokenLayers.components);
			});
		});

		describe('semantic tokens (filePathParts.length === 3 && includes semantic)', () => {
			it('should complement semantic tokens with preprocessing token structure type', () => {
				const scenario = createSemanticTestScenario();
				mockResolvePreprocessingTokenStructureTypeFromFilePath.mockReturnValue(PreprocessingTokenStructureTypes.dark);

				complementAllTokensPerModifier(scenario.filePathParts, scenario.fileName, mockAllTokensPerModifier, mockTokenJsonFileData);

				expect(mockComplementTokensInObject).toHaveBeenCalledWith(
					mockAllTokensPerModifier,
					mockTokenJsonFileData,
					PreprocessingTokenStructureTypes.dark,
				);
			});

			it('should handle semantic motion tokens', () => {
				const semanticFilePathParts = ['tokens', TokenLayers.semantic, 'motion'];
				const fileName = 'lively.json';
				mockResolvePreprocessingTokenStructureTypeFromFilePath.mockReturnValue(PreprocessingTokenStructureTypes.default);

				complementAllTokensPerModifier(semanticFilePathParts, fileName, mockAllTokensPerModifier, mockTokenJsonFileData);

				expect(mockComplementTokensInObject).toHaveBeenCalledWith(
					mockAllTokensPerModifier,
					mockTokenJsonFileData,
					PreprocessingTokenStructureTypes.default,
				);
			});
		});

		describe('components and partials tokens (filePathParts.length === 3 && !includes semantic)', () => {
			it('should complement partials tokens with nested structure', () => {
				const scenario = createPartialsTestScenario();
				const mockPartialsContainer = { [PreprocessingTokenStructureTypes.default]: {} };
				const allTokensWithPartials = { ...mockAllTokensPerModifier, ...mockPartialsContainer };
				mockResolvePreprocessingTokenStructureTypeFromFilePath.mockReturnValue(PreprocessingTokenStructureTypes.default);

				complementAllTokensPerModifier(scenario.filePathParts, scenario.fileName, allTokensWithPartials, mockTokenJsonFileData);

				expect(mockComplementTokensInObject).toHaveBeenCalledWith(
					mockPartialsContainer[PreprocessingTokenStructureTypes.default],
					mockTokenJsonFileData,
					TokenLayers.partials,
				);
			});

			it('should complement components tokens with nested structure', () => {
				const scenario = createComponentsTestScenario();
				const mockComponentsContainer = { [PreprocessingTokenStructureTypes.default]: {} };
				const allTokensWithComponents = { ...mockAllTokensPerModifier, ...mockComponentsContainer };
				mockResolvePreprocessingTokenStructureTypeFromFilePath.mockReturnValue(PreprocessingTokenStructureTypes.default);

				complementAllTokensPerModifier(scenario.filePathParts, scenario.fileName, allTokensWithComponents, mockTokenJsonFileData);

				expect(mockComplementTokensInObject).toHaveBeenCalledWith(
					mockComponentsContainer[PreprocessingTokenStructureTypes.default],
					mockTokenJsonFileData,
					TokenLayers.components,
				);
			});
		});

		describe('error scenarios', () => {
			it('should call logicalTokenSetError for invalid file path structure', () => {
				const scenario = createErrorTestScenario();
				mockLogicalTokenSetError.mockImplementation(() => {
					throw new Error('Unexpected token file detected');
				});

				expect(() => {
					complementAllTokensPerModifier(scenario.filePathParts, scenario.fileName, mockAllTokensPerModifier, mockTokenJsonFileData);
				}).toThrow('Unexpected token file detected');

				expect(mockLogicalTokenSetError).toHaveBeenCalledWith(
					`Unexpected token file detected: ${scenario.filePathParts.join('/')}/${scenario.fileName}`,
				);
			});

			it('should handle very long file path parts', () => {
				const longFilePathParts = ['tokens', 'layer1', 'layer2', 'layer3', 'layer4'];
				const fileName = 'test.json';
				mockLogicalTokenSetError.mockImplementation(() => {
					throw new Error('Unexpected token file detected');
				});

				expect(() => {
					complementAllTokensPerModifier(longFilePathParts, fileName, mockAllTokensPerModifier, mockTokenJsonFileData);
				}).toThrow('Unexpected token file detected');

				expect(mockLogicalTokenSetError).toHaveBeenCalledWith(`Unexpected token file detected: ${longFilePathParts.join('/')}/${fileName}`);
			});
		});
	});

	describe('Integration Tests', () => {
		it('should handle both functions with the same parameters', () => {
			const filePathParts = mockCoreFilePathParts;
			const fileName = mockCoreFileName;
			mockResolvePreprocessingTokenStructureTypeFromFilePath.mockReturnValue(PreprocessingTokenStructureTypes.core);

			// Test both functions with same inputs
			complementAllAdjustedTokenData(filePathParts, fileName, mockAllAdjustedTokenData, mockAdjustedTokenFileData);
			complementAllTokensPerModifier(filePathParts, fileName, mockAllTokensPerModifier, mockTokenJsonFileData);

			// Both should have called the resolver with same parameters
			expect(mockResolvePreprocessingTokenStructureTypeFromFilePath).toHaveBeenCalledTimes(2);
			expect(mockResolvePreprocessingTokenStructureTypeFromFilePath).toHaveBeenNthCalledWith(
				1,
				filePathParts,
				fileName,
				2,
				TokenLayers.core,
			);
			expect(mockResolvePreprocessingTokenStructureTypeFromFilePath).toHaveBeenNthCalledWith(
				2,
				filePathParts,
				fileName,
				2,
				TokenLayers.core,
			);

			// Both should have called complementTokensInObject with appropriate parameters
			expect(mockComplementTokensInObject).toHaveBeenCalledTimes(2);
		});

		it('should handle all token layer types consistently', () => {
			const testCases = [
				{ filePathParts: mockCoreFilePathParts, fileName: mockCoreFileName, expectedLayer: TokenLayers.core },
				{
					filePathParts: mockSemanticFilePathParts,
					fileName: mockSemanticFileName,
					expectedType: PreprocessingTokenStructureTypes.default,
				},
				{ filePathParts: mockPartialsFilePathParts, fileName: mockPartialsFileName, expectedLayer: TokenLayers.partials },
				{ filePathParts: mockComponentsFilePathParts, fileName: mockComponentsFileName, expectedLayer: TokenLayers.components },
			];

			// Setup mocks for all test cases
			mockResolvePreprocessingTokenStructureTypeFromFilePath
				.mockReturnValueOnce(PreprocessingTokenStructureTypes.core)
				.mockReturnValueOnce(PreprocessingTokenStructureTypes.default)
				.mockReturnValueOnce(PreprocessingTokenStructureTypes.default)
				.mockReturnValueOnce(PreprocessingTokenStructureTypes.default);

			testCases.forEach(testCase => {
				const allTokensWithStructure = testCase.expectedLayer
					? mockAllTokensPerModifier
					: { [PreprocessingTokenStructureTypes.default]: {} };

				complementAllTokensPerModifier(testCase.filePathParts, testCase.fileName, allTokensWithStructure, mockTokenJsonFileData);
			});

			// Verify all resolver calls were made
			expect(mockResolvePreprocessingTokenStructureTypeFromFilePath).toHaveBeenCalledTimes(4);
			// Verify all complement calls were made
			expect(mockComplementTokensInObject).toHaveBeenCalledTimes(4);
		});
	});

	describe('Mock Coverage', () => {
		it('should cover all mock helper functions', () => {
			// Test all scenario creators
			const coreScenario = createCoreTestScenario();
			const semanticScenario = createSemanticTestScenario();
			const partialsScenario = createPartialsTestScenario();
			const componentsScenario = createComponentsTestScenario();
			const errorScenario = createErrorTestScenario();

			// Verify scenarios are properly structured
			expect(coreScenario.filePathParts).toEqual(mockCoreFilePathParts);
			expect(semanticScenario.filePathParts).toEqual(mockSemanticFilePathParts);
			expect(partialsScenario.filePathParts).toEqual(mockPartialsFilePathParts);
			expect(componentsScenario.filePathParts).toEqual(mockComponentsFilePathParts);
			expect(errorScenario.filePathParts).toEqual(mockInvalidFilePathParts);

			// Test mock functions are defined
			expect(mockResolvePreprocessingTokenStructureTypeFromFilePath).toBeDefined();
			expect(mockComplementTokensInObject).toBeDefined();
			expect(mockLogicalTokenSetError).toBeDefined();
			expect(mockResolveTokenLayerBasePath).toBeDefined();
		});
	});
});
