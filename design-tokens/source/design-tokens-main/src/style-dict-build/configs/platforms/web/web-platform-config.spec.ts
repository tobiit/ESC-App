import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { cssOutputFileConfig, jsonWebOutputFileConfig, jsOutputFileConfig, scssOutputFileConfig } from '../../output-files/index.js';
import { platformWebJsConfig, platformWebStyleConfig } from './web-platform-config.js';
import {
	createDifferentPathWebJsPlatformConfigScenario,
	createDifferentPathWebStylePlatformConfigScenario,
	createEmptyPathWebPlatformConfigScenario,
	createExpectedWebJsPlatformConfig,
	createExpectedWebStylePlatformConfig,
	createLongPathWebPlatformConfigScenario,
	createNullInputWebPlatformConfigScenario,
	createSpacesInPathWebPlatformConfigScenario,
	createSpecialCharsWebPlatformConfigScenario,
	createStandardWebJsPlatformConfigScenario,
	createStandardWebStylePlatformConfigScenario,
	createUndefinedInputWebPlatformConfigScenario,
	createUnicodePathWebPlatformConfigScenario,
	mockMockedescappFileHeaderName,
	mockMockedCssOutputFileConfig,
	mockMockedCubicBezierWrapTransformName,
	mockMockedInsetShorthandCalcFixTransformName,
	mockMockedJsonWebOutputFileConfig,
	mockMockedJsOutputFileConfig,
	mockMockedLowerCaseLinearGradientTransformName,
	mockMockedMetaInfoEnrichTransformName,
	mockMockedPlatformsWeb,
	mockMockedScssOutputFileConfig,
	mockMockedTransformsNameCamel,
	mockMockedTransformsNameKebab,
	mockMockedTransformTo8DigitHexValuesTransformName,
	mockMockedTsTransformGroups,
} from './web-platform-config.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock all dependencies
jest.mock('style-dictionary/enums', () => {
	return {
		transforms: {
			nameCamel: 'name/camel',
			nameKebab: 'name/kebab',
		},
		transformTypes: {
			value: 'value',
			attribute: 'attribute',
		},
	};
});
jest.mock('../../output-files/index.js');
jest.mock('../../../enums/index.js', () => {
	return {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		TsTransformGroups: {
			tokensStudio: 'tokens-studio',
		},
	};
});
jest.mock('../../../hooks/index.js', () => {
	return {
		escappFileHeaderName: 'escappFileHeader',
		transformTo8DigitHexValuesTransformName: 'transformTo8DigitHexValues',
		cubicBezierWrapTransformName: 'cubicBezierWrap',
		lowerCaseLinearGradientTransformName: 'lowerCaseLinearGradient',
		insetShorthandCalcFixTransformName: 'insetShorthandCalcFix',
		metaInfoEnrichTransformName: 'a1/meta-info-enrich',
	};
});
jest.mock('../../../hooks/transforms/meta-info-enrich/meta-info-enrich.js', () => {
	return {
		metaInfoEnrichTransformName: 'a1/meta-info-enrich',
	};
});
jest.mock('../../../../shared/index.js', () => {
	return {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		Platforms: {
			web: 'web',
		},
	};
});

const mockedCssOutputFileConfig = cssOutputFileConfig as jest.MockedFunction<typeof cssOutputFileConfig>;
const mockedScssOutputFileConfig = scssOutputFileConfig as jest.MockedFunction<typeof scssOutputFileConfig>;
const mockedJsOutputFileConfig = jsOutputFileConfig as jest.MockedFunction<typeof jsOutputFileConfig>;
const mockedJsonWebOutputFileConfig = jsonWebOutputFileConfig as jest.MockedFunction<typeof jsonWebOutputFileConfig>;

describe('web-platform-config', () => {
	beforeEach(() => {
		jest.clearAllMocks();

		mockedCssOutputFileConfig.mockReturnValue(mockMockedCssOutputFileConfig);
		mockedScssOutputFileConfig.mockReturnValue(mockMockedScssOutputFileConfig);
		mockedJsOutputFileConfig.mockReturnValue(mockMockedJsOutputFileConfig);
		mockedJsonWebOutputFileConfig.mockReturnValue(mockMockedJsonWebOutputFileConfig);
	});

	describe('platformWebJsConfig', () => {
		it('should generate correct platform config for standard web JS scenario', () => {
			const scenario = createStandardWebJsPlatformConfigScenario();
			const expectedConfig = createExpectedWebJsPlatformConfig(scenario.outputFilePath);

			const result = platformWebJsConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toEqual(expectedConfig);
			expect(mockedJsOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
		});

		it('should generate correct platform config for different path web JS scenario', () => {
			const scenario = createDifferentPathWebJsPlatformConfigScenario();
			const expectedConfig = createExpectedWebJsPlatformConfig(scenario.outputFilePath);

			const result = platformWebJsConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toEqual(expectedConfig);
			expect(mockedJsOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
		});

		it('should handle empty path inputs for web JS config', () => {
			const scenario = createEmptyPathWebPlatformConfigScenario();
			const expectedConfig = createExpectedWebJsPlatformConfig(scenario.outputFilePath);

			const result = platformWebJsConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toEqual(expectedConfig);
			expect(mockedJsOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
		});

		it('should handle paths with spaces for web JS config', () => {
			const scenario = createSpacesInPathWebPlatformConfigScenario();
			const expectedConfig = createExpectedWebJsPlatformConfig(scenario.outputFilePath);

			const result = platformWebJsConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toEqual(expectedConfig);
			expect(mockedJsOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
		});

		it('should handle paths with special characters for web JS config', () => {
			const scenario = createSpecialCharsWebPlatformConfigScenario();
			const expectedConfig = createExpectedWebJsPlatformConfig(scenario.outputFilePath);

			const result = platformWebJsConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toEqual(expectedConfig);
			expect(mockedJsOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
		});

		it('should handle null inputs for web JS config', () => {
			const scenario = createNullInputWebPlatformConfigScenario();
			const expectedConfig = createExpectedWebJsPlatformConfig(scenario.outputFilePath);

			const result = platformWebJsConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toEqual(expectedConfig);
			expect(mockedJsOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
		});

		it('should handle undefined inputs for web JS config', () => {
			const scenario = createUndefinedInputWebPlatformConfigScenario();
			const expectedConfig = createExpectedWebJsPlatformConfig(scenario.outputFilePath);

			const result = platformWebJsConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toEqual(expectedConfig);
			expect(mockedJsOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
		});

		it('should handle very long paths for web JS config', () => {
			const scenario = createLongPathWebPlatformConfigScenario();
			const expectedConfig = createExpectedWebJsPlatformConfig(scenario.outputFilePath);

			const result = platformWebJsConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toEqual(expectedConfig);
			expect(mockedJsOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
		});

		it('should handle unicode characters in paths for web JS config', () => {
			const scenario = createUnicodePathWebPlatformConfigScenario();
			const expectedConfig = createExpectedWebJsPlatformConfig(scenario.outputFilePath);

			const result = platformWebJsConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toEqual(expectedConfig);
			expect(mockedJsOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
		});

		it('should have correct transform group and transforms for web JS config', () => {
			const scenario = createStandardWebJsPlatformConfigScenario();

			const result = platformWebJsConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result.transformGroup).toBe(mockMockedTsTransformGroups);
			expect(result.transforms).toEqual([
				mockMockedTransformsNameCamel,
				mockMockedTransformTo8DigitHexValuesTransformName,
				mockMockedCubicBezierWrapTransformName,
				mockMockedLowerCaseLinearGradientTransformName,
				mockMockedInsetShorthandCalcFixTransformName,
			]);
		});

		it('should have correct file header option for web JS config', () => {
			const scenario = createStandardWebJsPlatformConfigScenario();

			const result = platformWebJsConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result.options?.fileHeader).toBe(mockMockedescappFileHeaderName);
		});
	});

	describe('platformWebStyleConfig', () => {
		it('should generate correct platform config for standard web style scenario', () => {
			const scenario = createStandardWebStylePlatformConfigScenario();
			const expectedConfig = createExpectedWebStylePlatformConfig(scenario.outputFilePath);

			const result = platformWebStyleConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toEqual(expectedConfig);
			expect(mockedCssOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
			expect(mockedScssOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
			expect(mockedJsonWebOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
		});

		it('should generate correct platform config for different path web style scenario', () => {
			const scenario = createDifferentPathWebStylePlatformConfigScenario();
			const expectedConfig = createExpectedWebStylePlatformConfig(scenario.outputFilePath);

			const result = platformWebStyleConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toEqual(expectedConfig);
			expect(mockedCssOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
			expect(mockedScssOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
			expect(mockedJsonWebOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
		});

		it('should handle empty path inputs for web style config', () => {
			const scenario = createEmptyPathWebPlatformConfigScenario();
			const expectedConfig = createExpectedWebStylePlatformConfig(scenario.outputFilePath);

			const result = platformWebStyleConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toEqual(expectedConfig);
			expect(mockedCssOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
			expect(mockedScssOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
			expect(mockedJsonWebOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
		});

		it('should handle paths with spaces for web style config', () => {
			const scenario = createSpacesInPathWebPlatformConfigScenario();
			const expectedConfig = createExpectedWebStylePlatformConfig(scenario.outputFilePath);

			const result = platformWebStyleConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toEqual(expectedConfig);
			expect(mockedCssOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
			expect(mockedScssOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
			expect(mockedJsonWebOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
		});

		it('should handle paths with special characters for web style config', () => {
			const scenario = createSpecialCharsWebPlatformConfigScenario();
			const expectedConfig = createExpectedWebStylePlatformConfig(scenario.outputFilePath);

			const result = platformWebStyleConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toEqual(expectedConfig);
			expect(mockedCssOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
			expect(mockedScssOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
			expect(mockedJsonWebOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
		});

		it('should handle null inputs for web style config', () => {
			const scenario = createNullInputWebPlatformConfigScenario();
			const expectedConfig = createExpectedWebStylePlatformConfig(scenario.outputFilePath);

			const result = platformWebStyleConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toEqual(expectedConfig);
			expect(mockedCssOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
			expect(mockedScssOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
			expect(mockedJsonWebOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
		});

		it('should handle undefined inputs for web style config', () => {
			const scenario = createUndefinedInputWebPlatformConfigScenario();
			const expectedConfig = createExpectedWebStylePlatformConfig(scenario.outputFilePath);

			const result = platformWebStyleConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toEqual(expectedConfig);
			expect(mockedCssOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
			expect(mockedScssOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
			expect(mockedJsonWebOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
		});

		it('should handle very long paths for web style config', () => {
			const scenario = createLongPathWebPlatformConfigScenario();
			const expectedConfig = createExpectedWebStylePlatformConfig(scenario.outputFilePath);

			const result = platformWebStyleConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toEqual(expectedConfig);
			expect(mockedCssOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
			expect(mockedScssOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
			expect(mockedJsonWebOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
		});

		it('should handle unicode characters in paths for web style config', () => {
			const scenario = createUnicodePathWebPlatformConfigScenario();
			const expectedConfig = createExpectedWebStylePlatformConfig(scenario.outputFilePath);

			const result = platformWebStyleConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result).toEqual(expectedConfig);
			expect(mockedCssOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
			expect(mockedScssOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
			expect(mockedJsonWebOutputFileConfig).toHaveBeenCalledWith(`${mockMockedPlatformsWeb}/${scenario.outputFileName}`);
		});

		it('should have correct transform group and transforms for web style config', () => {
			const scenario = createStandardWebStylePlatformConfigScenario();

			const result = platformWebStyleConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result.transformGroup).toBe(mockMockedTsTransformGroups);
			expect(result.transforms).toEqual([
				mockMockedTransformsNameKebab,
				mockMockedTransformTo8DigitHexValuesTransformName,
				mockMockedCubicBezierWrapTransformName,
				mockMockedLowerCaseLinearGradientTransformName,
				mockMockedInsetShorthandCalcFixTransformName,
				mockMockedMetaInfoEnrichTransformName,
			]);
		});

		it('should have correct file header option for web style config', () => {
			const scenario = createStandardWebStylePlatformConfigScenario();

			const result = platformWebStyleConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result.options?.fileHeader).toBe(mockMockedescappFileHeaderName);
		});

		it('should spread all file configs correctly for web style config', () => {
			const scenario = createStandardWebStylePlatformConfigScenario();

			const result = platformWebStyleConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(result.files).toEqual([
				...mockMockedCssOutputFileConfig,
				...mockMockedScssOutputFileConfig,
				...mockMockedJsonWebOutputFileConfig,
			]);
		});
	});

	describe('function behavior differences', () => {
		it('should use nameCamel transform only in JS config and nameKebab only in style config', () => {
			const scenario = createStandardWebJsPlatformConfigScenario();

			const jsResult = platformWebJsConfig(scenario.outputFilePath, scenario.outputFileName);
			const styleResult = platformWebStyleConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(jsResult.transforms).toContain(mockMockedTransformsNameCamel);
			expect(jsResult.transforms).not.toContain(mockMockedTransformsNameKebab);

			expect(styleResult.transforms).toContain(mockMockedTransformsNameKebab);
			expect(styleResult.transforms).not.toContain(mockMockedTransformsNameCamel);
		});

		it('should call different output file configs for JS vs style configs', () => {
			const scenario = createStandardWebJsPlatformConfigScenario();

			platformWebJsConfig(scenario.outputFilePath, scenario.outputFileName);
			platformWebStyleConfig(scenario.outputFilePath, scenario.outputFileName);

			expect(mockedJsOutputFileConfig).toHaveBeenCalledTimes(1);
			expect(mockedCssOutputFileConfig).toHaveBeenCalledTimes(1);
			expect(mockedScssOutputFileConfig).toHaveBeenCalledTimes(1);
			expect(mockedJsonWebOutputFileConfig).toHaveBeenCalledTimes(1);
		});

		it('should have same common transforms for both JS and style configs', () => {
			const scenario = createStandardWebJsPlatformConfigScenario();

			const jsResult = platformWebJsConfig(scenario.outputFilePath, scenario.outputFileName);
			const styleResult = platformWebStyleConfig(scenario.outputFilePath, scenario.outputFileName);

			const commonTransforms = [
				mockMockedTransformTo8DigitHexValuesTransformName,
				mockMockedCubicBezierWrapTransformName,
				mockMockedLowerCaseLinearGradientTransformName,
				mockMockedInsetShorthandCalcFixTransformName,
			];

			commonTransforms.forEach(transform => {
				expect(jsResult.transforms).toContain(transform);
				expect(styleResult.transforms).toContain(transform);
			});
		});
	});
});
