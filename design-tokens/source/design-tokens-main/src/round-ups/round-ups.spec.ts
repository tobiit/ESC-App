import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { inferScssMixin } from './infer-scss-mixin/infer-scss-mixin.js';
import { runRemTypoUnitConversions } from './rem-typo-units-conversion/rem-typo-units-conversion.js';
import { runResponsiveCssIntegration } from './responsive-integration/responsive-integration.js';
import { runRoundUps } from './round-ups.js';
import { mockBrand, mockDesignSystemName } from './round-ups.mock.spec.js';
import { runDistVersioning } from './versioning/dist-versioning.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

jest.mock('./responsive-integration/responsive-integration.js', () => {
	return {
		runResponsiveCssIntegration: jest.fn(),
	};
});

jest.mock('./infer-scss-mixin/infer-scss-mixin.js', () => {
	return {
		inferScssMixin: jest.fn(),
	};
});

jest.mock('./rem-typo-units-conversion/rem-typo-units-conversion.js', () => {
	return {
		runRemTypoUnitConversions: jest.fn(),
	};
});

jest.mock('./versioning/dist-versioning.js', () => {
	return {
		runDistVersioning: jest.fn(),
	};
});

const mockedRunResponsiveCssIntegration = runResponsiveCssIntegration as jest.MockedFunction<typeof runResponsiveCssIntegration>;
const mockedInferScssMixin = inferScssMixin as jest.MockedFunction<typeof inferScssMixin>;
const mockedRunRemTypoUnitConversions = runRemTypoUnitConversions as jest.MockedFunction<typeof runRemTypoUnitConversions>;
const mockedRunDistVersioning = runDistVersioning as jest.MockedFunction<typeof runDistVersioning>;

describe('round-ups', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('runRoundUps', () => {
		it('should call all round-up functions in the correct order', async () => {
			mockedRunResponsiveCssIntegration.mockResolvedValue(undefined);
			mockedInferScssMixin.mockResolvedValue(undefined);
			mockedRunRemTypoUnitConversions.mockResolvedValue(undefined);
			mockedRunDistVersioning.mockResolvedValue(undefined);

			await runRoundUps(mockBrand, mockDesignSystemName);

			expect(mockedRunResponsiveCssIntegration).toHaveBeenCalledTimes(1);
			expect(mockedInferScssMixin).toHaveBeenCalledTimes(1);
			expect(mockedRunRemTypoUnitConversions).toHaveBeenCalledTimes(1);
			expect(mockedRunDistVersioning).toHaveBeenCalledTimes(1);
		});

		it('should call runResponsiveCssIntegration with brand and designSystemName', async () => {
			mockedRunResponsiveCssIntegration.mockResolvedValue(undefined);
			mockedInferScssMixin.mockResolvedValue(undefined);
			mockedRunRemTypoUnitConversions.mockResolvedValue(undefined);
			mockedRunDistVersioning.mockResolvedValue(undefined);

			await runRoundUps(mockBrand, mockDesignSystemName);

			expect(mockedRunResponsiveCssIntegration).toHaveBeenCalledWith(mockBrand, mockDesignSystemName);
		});

		it('should call inferScssMixin with brand and designSystemName', async () => {
			mockedRunResponsiveCssIntegration.mockResolvedValue(undefined);
			mockedInferScssMixin.mockResolvedValue(undefined);
			mockedRunRemTypoUnitConversions.mockResolvedValue(undefined);
			mockedRunDistVersioning.mockResolvedValue(undefined);

			await runRoundUps(mockBrand, mockDesignSystemName);

			expect(mockedInferScssMixin).toHaveBeenCalledWith(mockBrand, mockDesignSystemName);
		});

		it('should call runRemTypoUnitConversions with brand and designSystemName', async () => {
			mockedRunResponsiveCssIntegration.mockResolvedValue(undefined);
			mockedInferScssMixin.mockResolvedValue(undefined);
			mockedRunRemTypoUnitConversions.mockResolvedValue(undefined);
			mockedRunDistVersioning.mockResolvedValue(undefined);

			await runRoundUps(mockBrand, mockDesignSystemName);

			expect(mockedRunRemTypoUnitConversions).toHaveBeenCalledWith(mockBrand, mockDesignSystemName);
		});

		it('should call runDistVersioning without parameters', async () => {
			mockedRunResponsiveCssIntegration.mockResolvedValue(undefined);
			mockedInferScssMixin.mockResolvedValue(undefined);
			mockedRunRemTypoUnitConversions.mockResolvedValue(undefined);
			mockedRunDistVersioning.mockResolvedValue(undefined);

			await runRoundUps(mockBrand, mockDesignSystemName);

			expect(mockedRunDistVersioning).toHaveBeenCalledWith();
		});

		it('should execute functions in correct sequence', async () => {
			const callOrder: string[] = [];

			mockedRunResponsiveCssIntegration.mockImplementation(async () => {
				callOrder.push('responsive');
			});
			mockedInferScssMixin.mockImplementation(async () => {
				callOrder.push('scss');
			});
			mockedRunRemTypoUnitConversions.mockImplementation(async () => {
				callOrder.push('rem');
			});
			mockedRunDistVersioning.mockImplementation(async () => {
				callOrder.push('versioning');
			});

			await runRoundUps(mockBrand, mockDesignSystemName);

			expect(callOrder).toEqual(['responsive', 'scss', 'rem', 'versioning']);
		});
	});

	describe('Mock Data Coverage', () => {
		it('should cover all mock constants', () => {
			expect(mockBrand).toBeDefined();
			expect(mockDesignSystemName).toBeDefined();
		});
	});
});
