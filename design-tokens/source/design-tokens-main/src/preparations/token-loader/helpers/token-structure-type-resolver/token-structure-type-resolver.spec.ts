import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import {
	defaultTheme,
	logicalTokenSetError,
	PreprocessingTokenStructureTypes,
	ThemeModes,
	TokenLayers,
	tokenSsotFileFormat,
} from '../../../../shared/index.js';
import { resolvePreprocessingTokenStructureTypeFromFilePath } from './token-structure-type-resolver.js';
import {
	createComponentsScenario,
	createCoreScenario,
	createEmptyPathScenario,
	createInvalidLongPathScenario,
	createInvalidTokenLayerScenario,
	createPartialsScenario,
	createSemanticCompactScenario,
	createSemanticCompositesScenario,
	createSemanticDarkScenario,
	createSemanticDenseScenario,
	createSemanticLightScenario,
	createSemanticLivelyScenario,
	createSemanticMinimalScenario,
	createSemanticSpaciouscenario,
	createSingleElementPathScenario,
	resetAllMocks,
} from './token-structure-type-resolver.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock the shared utilities
jest.mock('../../../../shared/index.js', () => {
	const actual: object = jest.requireActual('../../../../shared/index.js');
	return {
		...actual,
		logicalTokenSetError: jest.fn(),
	};
});

// Type the mocked functions
const mockLogicalTokenSetError = logicalTokenSetError as jest.MockedFunction<typeof logicalTokenSetError>;

describe('Token Structure Type Resolver', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		resetAllMocks();
	});

	describe('resolvePreprocessingTokenStructureTypeFromFilePath', () => {
		describe('2-level file paths (filePathParts.length === 2)', () => {
			it('should return core type for core tokens', () => {
				const scenario = createCoreScenario();

				const result = resolvePreprocessingTokenStructureTypeFromFilePath(
					scenario.filePathParts,
					scenario.fileName,
					2,
					scenario.filePathParts[1] as TokenLayers,
				);

				expect(result).toBe(scenario.expectedType);
				expect(mockLogicalTokenSetError).not.toHaveBeenCalled();
			});

			it('should return default type for partials tokens with 2-level path', () => {
				const filePathParts = ['tokens', TokenLayers.partials];
				const fileName = 'indicator.json';

				const result = resolvePreprocessingTokenStructureTypeFromFilePath(filePathParts, fileName, 2, filePathParts[1] as TokenLayers);

				expect(result).toBe(PreprocessingTokenStructureTypes.default);
				expect(mockLogicalTokenSetError).not.toHaveBeenCalled();
			});

			it('should return default type for components tokens with 2-level path', () => {
				const filePathParts = ['tokens', TokenLayers.components];
				const fileName = 'button.json';

				const result = resolvePreprocessingTokenStructureTypeFromFilePath(filePathParts, fileName, 2, filePathParts[1] as TokenLayers);

				expect(result).toBe(PreprocessingTokenStructureTypes.default);
				expect(mockLogicalTokenSetError).not.toHaveBeenCalled();
			});

			it('should call logLogicalTokenSetError for invalid token layer in 2-level path', () => {
				const scenario = createInvalidTokenLayerScenario();
				mockLogicalTokenSetError.mockImplementation(() => {
					throw new Error('Logical token set error');
				});

				expect(() =>
					resolvePreprocessingTokenStructureTypeFromFilePath(
						scenario.filePathParts,
						scenario.fileName,
						2,
						scenario.filePathParts[1] as TokenLayers,
					),
				).toThrow('Logical token set error');

				expect(mockLogicalTokenSetError).toHaveBeenCalledWith(
					'Change of the folder structure under tokens/ detected! Adjust the correct modifier resolution to the new folder structure.',
					[
						`filePathParts: ${JSON.stringify(scenario.filePathParts)}`,
						'pathNestingLevels: 2',
						`fileName: ${scenario.fileName}`,
						'Detected tokenLayer: invalid',
					],
				);
			});
		});

		describe('3-level file paths (filePathParts.length === 3)', () => {
			describe('semantic tokens', () => {
				it('should return default type for light theme (in defaultTheme)', () => {
					const scenario = createSemanticLightScenario();

					const result = resolvePreprocessingTokenStructureTypeFromFilePath(
						scenario.filePathParts,
						scenario.fileName,
						2,
						scenario.filePathParts[1] as TokenLayers,
					);

					expect(result).toBe(scenario.expectedType);
					expect(mockLogicalTokenSetError).not.toHaveBeenCalled();
				});

				it('should return default type for spacious theme (in defaultTheme)', () => {
					const scenario = createSemanticSpaciouscenario();

					const result = resolvePreprocessingTokenStructureTypeFromFilePath(
						scenario.filePathParts,
						scenario.fileName,
						2,
						scenario.filePathParts[1] as TokenLayers,
					);

					expect(result).toBe(scenario.expectedType);
					expect(mockLogicalTokenSetError).not.toHaveBeenCalled();
				});

				it('should return default type for lively theme (in defaultTheme)', () => {
					const scenario = createSemanticLivelyScenario();

					const result = resolvePreprocessingTokenStructureTypeFromFilePath(
						scenario.filePathParts,
						scenario.fileName,
						2,
						scenario.filePathParts[1] as TokenLayers,
					);

					expect(result).toBe(scenario.expectedType);
					expect(mockLogicalTokenSetError).not.toHaveBeenCalled();
				});

				it('should return dark type for dark theme (not in defaultTheme)', () => {
					const scenario = createSemanticDarkScenario();

					const result = resolvePreprocessingTokenStructureTypeFromFilePath(
						scenario.filePathParts,
						scenario.fileName,
						2,
						scenario.filePathParts[1] as TokenLayers,
					);

					expect(result).toBe(scenario.expectedType);
					expect(mockLogicalTokenSetError).not.toHaveBeenCalled();
				});

				it('should return compact type for compact theme (not in defaultTheme)', () => {
					const scenario = createSemanticCompactScenario();

					const result = resolvePreprocessingTokenStructureTypeFromFilePath(
						scenario.filePathParts,
						scenario.fileName,
						2,
						scenario.filePathParts[1] as TokenLayers,
					);

					expect(result).toBe(scenario.expectedType);
					expect(mockLogicalTokenSetError).not.toHaveBeenCalled();
				});

				it('should return dense type for dense theme (not in defaultTheme)', () => {
					const scenario = createSemanticDenseScenario();

					const result = resolvePreprocessingTokenStructureTypeFromFilePath(
						scenario.filePathParts,
						scenario.fileName,
						2,
						scenario.filePathParts[1] as TokenLayers,
					);

					expect(result).toBe(scenario.expectedType);
					expect(mockLogicalTokenSetError).not.toHaveBeenCalled();
				});

				it('should return minimal type for minimal theme (not in defaultTheme)', () => {
					const scenario = createSemanticMinimalScenario();

					const result = resolvePreprocessingTokenStructureTypeFromFilePath(
						scenario.filePathParts,
						scenario.fileName,
						2,
						scenario.filePathParts[1] as TokenLayers,
					);

					expect(result).toBe(scenario.expectedType);
					expect(mockLogicalTokenSetError).not.toHaveBeenCalled();
				});

				it('should return composites type for composites theme (not in defaultTheme)', () => {
					const scenario = createSemanticCompositesScenario();

					const result = resolvePreprocessingTokenStructureTypeFromFilePath(
						scenario.filePathParts,
						scenario.fileName,
						2,
						scenario.filePathParts[1] as TokenLayers,
					);

					expect(result).toBe(scenario.expectedType);
					expect(mockLogicalTokenSetError).not.toHaveBeenCalled();
				});
			});

			describe('partials tokens with 3-level path', () => {
				it('should return folder name as preprocessing type for partials', () => {
					const scenario = createPartialsScenario();

					const result = resolvePreprocessingTokenStructureTypeFromFilePath(
						scenario.filePathParts,
						scenario.fileName,
						2,
						scenario.filePathParts[1] as TokenLayers,
					);

					expect(result).toBe(scenario.expectedType);
					expect(mockLogicalTokenSetError).not.toHaveBeenCalled();
				});

				it('should handle different partials folder names', () => {
					const filePathParts = ['tokens', TokenLayers.partials, 'dense'];
					const fileName = 'indicator.json';

					const result = resolvePreprocessingTokenStructureTypeFromFilePath(filePathParts, fileName, 2, filePathParts[1] as TokenLayers);

					expect(result).toBe('dense' as PreprocessingTokenStructureTypes);
					expect(mockLogicalTokenSetError).not.toHaveBeenCalled();
				});
			});

			describe('components tokens with 3-level path', () => {
				it('should return folder name as preprocessing type for components', () => {
					const scenario = createComponentsScenario();

					const result = resolvePreprocessingTokenStructureTypeFromFilePath(
						scenario.filePathParts,
						scenario.fileName,
						2,
						scenario.filePathParts[1] as TokenLayers,
					);

					expect(result).toBe(scenario.expectedType);
					expect(mockLogicalTokenSetError).not.toHaveBeenCalled();
				});

				it('should handle different components folder names', () => {
					const filePathParts = ['tokens', TokenLayers.components, 'dense'];
					const fileName = 'button.json';

					const result = resolvePreprocessingTokenStructureTypeFromFilePath(filePathParts, fileName, 2, filePathParts[1] as TokenLayers);

					expect(result).toBe('dense' as PreprocessingTokenStructureTypes);
					expect(mockLogicalTokenSetError).not.toHaveBeenCalled();
				});
			});

			it('should call logLogicalTokenSetError for invalid token layer in 3-level path', () => {
				const filePathParts = ['tokens', 'invalid', 'subfolder'];
				const fileName = 'test.json';
				mockLogicalTokenSetError.mockImplementation(() => {
					throw new Error('Logical token set error');
				});

				expect(() =>
					resolvePreprocessingTokenStructureTypeFromFilePath(filePathParts, fileName, 2, filePathParts[1] as TokenLayers),
				).toThrow('Logical token set error');

				expect(mockLogicalTokenSetError).toHaveBeenCalledWith(
					'Change of the folder structure under tokens/ detected! Adjust the correct modifier resolution to the new folder structure.',
					[
						`filePathParts: ${JSON.stringify(filePathParts)}`,
						'pathNestingLevels: 3',
						`fileName: ${fileName}`,
						'Detected tokenLayer: invalid',
					],
				);
			});
		});

		describe('error scenarios', () => {
			it('should call logLogicalTokenSetError for file paths with unknown length', () => {
				const scenario = createInvalidLongPathScenario();
				mockLogicalTokenSetError.mockImplementation(() => {
					throw new Error('Logical token set error');
				});

				expect(() =>
					resolvePreprocessingTokenStructureTypeFromFilePath(
						scenario.filePathParts,
						scenario.fileName,
						2,
						scenario.filePathParts[1] as TokenLayers,
					),
				).toThrow('Logical token set error');

				expect(mockLogicalTokenSetError).toHaveBeenCalledWith(
					'Change of the folder structure under tokens/ detected! Adjust the correct modifier resolution to the new folder structure.',
					[
						`filePathParts: ${JSON.stringify(scenario.filePathParts)}`,
						'pathNestingLevels: unknown',
						`fileName: ${scenario.fileName}`,
						'Detected tokenLayer: core',
					],
				);
			});

			it('should handle empty file path parts', () => {
				const scenario = createEmptyPathScenario();
				mockLogicalTokenSetError.mockImplementation(() => {
					throw new Error('Logical token set error');
				});

				expect(() =>
					resolvePreprocessingTokenStructureTypeFromFilePath(
						scenario.filePathParts,
						scenario.fileName,
						2,
						scenario.filePathParts[1] as TokenLayers,
					),
				).toThrow('Logical token set error');

				expect(mockLogicalTokenSetError).toHaveBeenCalledWith(
					'Change of the folder structure under tokens/ detected! Adjust the correct modifier resolution to the new folder structure.',
					[
						`filePathParts: ${JSON.stringify(scenario.filePathParts)}`,
						'pathNestingLevels: unknown',
						`fileName: ${scenario.fileName}`,
						'Detected tokenLayer: undefined',
					],
				);
			});

			it('should handle single element file path parts', () => {
				const scenario = createSingleElementPathScenario();
				mockLogicalTokenSetError.mockImplementation(() => {
					throw new Error('Logical token set error');
				});

				expect(() =>
					resolvePreprocessingTokenStructureTypeFromFilePath(
						scenario.filePathParts,
						scenario.fileName,
						2,
						scenario.filePathParts[1] as TokenLayers,
					),
				).toThrow('Logical token set error');

				expect(mockLogicalTokenSetError).toHaveBeenCalledWith(
					'Change of the folder structure under tokens/ detected! Adjust the correct modifier resolution to the new folder structure.',
					[
						`filePathParts: ${JSON.stringify(scenario.filePathParts)}`,
						'pathNestingLevels: unknown',
						`fileName: ${scenario.fileName}`,
						'Detected tokenLayer: undefined',
					],
				);
			});

			it('should throw error when all error cases are handled by logLogicalTokenSetError', () => {
				const filePathParts = ['tokens', 'invalid'];
				const fileName = 'test.json';

				// Mock logLogicalTokenSetError to NOT throw (which would be unusual, but tests the final throw)
				mockLogicalTokenSetError.mockImplementation((): never => undefined as never);

				expect(() =>
					resolvePreprocessingTokenStructureTypeFromFilePath(filePathParts, fileName, 2, filePathParts[1] as TokenLayers),
				).toThrow('Error in resolvePreprocessingTokenStructureTypeFromFilePath!');
			});
		});

		describe('edge cases', () => {
			it('should handle semantic token with file extension', () => {
				const filePathParts = ['tokens', TokenLayers.semantic, 'color-schemes'];
				const fileName = 'dark.json';

				const result = resolvePreprocessingTokenStructureTypeFromFilePath(filePathParts, fileName, 2, filePathParts[1] as TokenLayers);

				expect(result).toBe(PreprocessingTokenStructureTypes.dark);
			});

			it('should handle semantic token without file extension in processing', () => {
				// This tests the internal resolveSemanticPreprocessingTokenStructureType function
				const filePathParts = ['tokens', TokenLayers.semantic, 'motion'];
				const fileName = 'minimal.json';

				const result = resolvePreprocessingTokenStructureTypeFromFilePath(filePathParts, fileName, 2, filePathParts[1] as TokenLayers);

				expect(result).toBe(PreprocessingTokenStructureTypes.minimal);
			});
		});

		describe('integration with constants', () => {
			it('should work with actual defaultTheme constant', () => {
				// Verify our mock matches the actual values
				expect(defaultTheme).toContain(ThemeModes.light);
				expect(defaultTheme).toContain(ThemeModes.spacious);
				expect(defaultTheme).toContain(ThemeModes.lively);

				const filePathParts = ['tokens', TokenLayers.semantic, 'color-schemes'];

				// Test with light theme (should be default)
				let result = resolvePreprocessingTokenStructureTypeFromFilePath(filePathParts, 'light.json', 2, filePathParts[1] as TokenLayers);
				expect(result).toBe(PreprocessingTokenStructureTypes.default);

				// Test with dark theme (should be dark)
				result = resolvePreprocessingTokenStructureTypeFromFilePath(filePathParts, 'dark.json', 2, filePathParts[1] as TokenLayers);
				expect(result).toBe(PreprocessingTokenStructureTypes.dark);
			});

			it('should use actual tokenSsotFileFormat constant', () => {
				expect(tokenSsotFileFormat).toBe('.json');

				const filePathParts = ['tokens', TokenLayers.semantic, 'motion'];
				const fileName = 'lively.json';

				const result = resolvePreprocessingTokenStructureTypeFromFilePath(filePathParts, fileName, 2, filePathParts[1] as TokenLayers);

				expect(result).toBe(PreprocessingTokenStructureTypes.default);
			});
		});
	});
});
