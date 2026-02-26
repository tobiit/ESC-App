import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { mockBrand, mockDesignSystemName, mockTokenSsotExtensionFolderPath } from './index.mock.spec.js';
import { runPreparations } from './preparations/preparations.js';
import { runRoundUps } from './round-ups/round-ups.js';
import { logger, logHorizontalDivider } from './shared/index.js';
import { runStyleDictionaryBuild } from './style-dict-build/style-dict-build.js';
import { runTokenBuild } from './index.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

jest.mock('./preparations/preparations.js', () => {
	return {
		runPreparations: jest.fn(),
	};
});

jest.mock('./style-dict-build/style-dict-build.js', () => {
	return {
		runStyleDictionaryBuild: jest.fn(),
	};
});

jest.mock('./round-ups/round-ups.js', () => {
	return {
		runRoundUps: jest.fn(),
	};
});

jest.mock('./shared/index.js', () => {
	const actual: object = jest.requireActual('./shared/index.js');
	return {
		...actual,
		logger: {
			start: jest.fn(),
			success: jest.fn(),
		},
		logHorizontalDivider: jest.fn(),
	};
});

const mockedRunPreparations = runPreparations as jest.MockedFunction<typeof runPreparations>;
const mockedRunStyleDictionaryBuild = runStyleDictionaryBuild as jest.MockedFunction<typeof runStyleDictionaryBuild>;
const mockedRunRoundUps = runRoundUps as jest.MockedFunction<typeof runRoundUps>;
const mockedLoggerStart = logger.start as jest.MockedFunction<typeof logger.start>;
const mockedLoggerSuccess = logger.success as jest.MockedFunction<typeof logger.success>;
const mockedLogHorizontalDivider = logHorizontalDivider as jest.MockedFunction<typeof logHorizontalDivider>;

describe('index', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('runTokenBuild', () => {
		it('should call all build steps in correct order', async () => {
			mockedRunPreparations.mockResolvedValue(undefined);
			mockedRunStyleDictionaryBuild.mockResolvedValue();
			mockedRunRoundUps.mockResolvedValue(undefined);

			await runTokenBuild(mockBrand, mockDesignSystemName);

			expect(mockedLoggerStart).toHaveBeenCalledWith('Build started...');
			expect(mockedRunPreparations).toHaveBeenCalledTimes(1);
			expect(mockedRunStyleDictionaryBuild).toHaveBeenCalledTimes(1);
			expect(mockedRunRoundUps).toHaveBeenCalledTimes(1);
			expect(mockedLogHorizontalDivider).toHaveBeenCalledTimes(1);
			expect(mockedLoggerSuccess).toHaveBeenCalledWith('SUCCESSFULLY BUILD A1 DESIGN TOKENS');
		});

		it('should call runPreparations with designSystemName and optional extension path', async () => {
			mockedRunPreparations.mockResolvedValue(undefined);
			mockedRunStyleDictionaryBuild.mockResolvedValue();
			mockedRunRoundUps.mockResolvedValue(undefined);

			await runTokenBuild(mockBrand, mockDesignSystemName, mockTokenSsotExtensionFolderPath);

			expect(mockedRunPreparations).toHaveBeenCalledWith(mockDesignSystemName, mockTokenSsotExtensionFolderPath);
		});

		it('should call runPreparations without extension path when not provided', async () => {
			mockedRunPreparations.mockResolvedValue(undefined);
			mockedRunStyleDictionaryBuild.mockResolvedValue();
			mockedRunRoundUps.mockResolvedValue(undefined);

			await runTokenBuild(mockBrand, mockDesignSystemName);

			expect(mockedRunPreparations).toHaveBeenCalledWith(mockDesignSystemName, undefined);
		});

		it('should call runStyleDictionaryBuild with brand and designSystemName', async () => {
			mockedRunPreparations.mockResolvedValue(undefined);
			mockedRunStyleDictionaryBuild.mockResolvedValue();
			mockedRunRoundUps.mockResolvedValue(undefined);

			await runTokenBuild(mockBrand, mockDesignSystemName);

			expect(mockedRunStyleDictionaryBuild).toHaveBeenCalledWith(mockBrand, mockDesignSystemName);
		});

		it('should call runRoundUps with brand and designSystemName', async () => {
			mockedRunPreparations.mockResolvedValue(undefined);
			mockedRunStyleDictionaryBuild.mockResolvedValue();
			mockedRunRoundUps.mockResolvedValue(undefined);

			await runTokenBuild(mockBrand, mockDesignSystemName);

			expect(mockedRunRoundUps).toHaveBeenCalledWith(mockBrand, mockDesignSystemName);
		});

		it('should execute build steps in correct sequence', async () => {
			const callOrder: string[] = [];

			mockedLoggerStart.mockImplementation(() => {
				callOrder.push('start');
			});
			mockedRunPreparations.mockImplementation(async () => {
				callOrder.push('preparations');
			});
			mockedRunStyleDictionaryBuild.mockImplementation(async () => {
				callOrder.push('styleDictionary');
			});
			mockedRunRoundUps.mockImplementation(async () => {
				callOrder.push('roundUps');
			});
			mockedLogHorizontalDivider.mockImplementation(() => {
				callOrder.push('divider');
			});
			mockedLoggerSuccess.mockImplementation(() => {
				callOrder.push('success');
			});

			await runTokenBuild(mockBrand, mockDesignSystemName);

			expect(callOrder).toEqual(['start', 'preparations', 'styleDictionary', 'roundUps', 'divider', 'success']);
		});
	});

	describe('Mock Data Coverage', () => {
		it('should cover all mock constants', () => {
			expect(mockBrand).toBeDefined();
			expect(mockDesignSystemName).toBeDefined();
			expect(mockTokenSsotExtensionFolderPath).toBeDefined();
		});
	});
});
