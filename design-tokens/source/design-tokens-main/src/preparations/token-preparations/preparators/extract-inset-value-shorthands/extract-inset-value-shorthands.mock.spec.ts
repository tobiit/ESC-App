import { jest } from '@jest/globals';
import { DesignToken } from 'style-dictionary/types';
import {
	A1SpecialTokenNameKeyWords,
	A1TokenTypes,
	isObject,
	isTokenObject,
	logger,
	logicalTokenSetError,
	matchAllReferenceMathShorthands,
	TokenLayers,
} from '../../../../shared/index.js';
import { SsotInsetTokenGroup } from '../../types/index.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock functions
export const mockedIsObject = isObject as jest.MockedFunction<typeof isObject>;
export const mockedIsTokenObject = isTokenObject as jest.MockedFunction<typeof isTokenObject>;
export const mockedLogger = logger as jest.Mocked<typeof logger>;
export const mockedLogicalTokenSetError = logicalTokenSetError as jest.MockedFunction<typeof logicalTokenSetError>;
export const mockedMatchAllReferenceMathShorthands = matchAllReferenceMathShorthands as jest.MockedFunction<
	typeof matchAllReferenceMathShorthands
>;

// Mock design tokens for testing
export const mockInsetTokenWithShorthand: DesignToken = {
	$value: '8px 16px',
	$type: A1TokenTypes.spacing,
};

export const mockInsetTokenWithSingleValue: DesignToken = {
	$value: '8px',
	$type: A1TokenTypes.spacing,
};

export const mockInsetTokenWithThreeValues: DesignToken = {
	$value: '8px 16px 12px',
	$type: A1TokenTypes.spacing,
};

export const mockInsetTokenWithFourValues: DesignToken = {
	$value: '8px 16px 12px 24px',
	$type: A1TokenTypes.spacing,
};

export const mockInsetTokenWithFiveValues: DesignToken = {
	$value: '8px 16px 12px 24px 32px',
	$type: A1TokenTypes.spacing,
};

export const mockInsetTokenWithoutType: DesignToken = {
	$value: '8px 16px',
	$type: undefined,
};

export const mockInsetTokenWithoutValue: DesignToken = {
	$value: undefined,
	$type: A1TokenTypes.spacing,
};

// Mock SSOT inset token groups for different combinations
export const mockSsotInsetTokenVerticalHorizontal: SsotInsetTokenGroup = {
	vertical: { $value: '8px', $type: A1TokenTypes.spacing },
	horizontal: { $value: '16px', $type: A1TokenTypes.spacing },
};

export const mockSsotInsetTokenVerticalEndStart: SsotInsetTokenGroup = {
	vertical: { $value: '8px', $type: A1TokenTypes.spacing },
	end: { $value: '16px', $type: A1TokenTypes.spacing },
	start: { $value: '24px', $type: A1TokenTypes.spacing },
};

export const mockSsotInsetTokenHorizontalTopBottom: SsotInsetTokenGroup = {
	horizontal: { $value: '16px', $type: A1TokenTypes.spacing },
	top: { $value: '8px', $type: A1TokenTypes.spacing },
	bottom: { $value: '12px', $type: A1TokenTypes.spacing },
};

export const mockSsotInsetTokenTopEndBottomStart: SsotInsetTokenGroup = {
	top: { $value: '8px', $type: A1TokenTypes.spacing },
	end: { $value: '16px', $type: A1TokenTypes.spacing },
	bottom: { $value: '12px', $type: A1TokenTypes.spacing },
	start: { $value: '24px', $type: A1TokenTypes.spacing },
};

export const mockSsotInsetTokenOnlyVertical: SsotInsetTokenGroup = {
	vertical: { $value: '8px', $type: A1TokenTypes.spacing },
};

export const mockSsotInsetTokenOnlyHorizontal: SsotInsetTokenGroup = {
	horizontal: { $value: '16px', $type: A1TokenTypes.spacing },
};

export const mockSsotInsetTokenOnlyTop: SsotInsetTokenGroup = {
	top: { $value: '8px', $type: A1TokenTypes.spacing },
};

export const mockSsotInsetTokenOnlyBottom: SsotInsetTokenGroup = {
	bottom: { $value: '12px', $type: A1TokenTypes.spacing },
};

export const mockSsotInsetTokenOnlyEnd: SsotInsetTokenGroup = {
	end: { $value: '16px', $type: A1TokenTypes.spacing },
};

export const mockSsotInsetTokenOnlyStart: SsotInsetTokenGroup = {
	start: { $value: '24px', $type: A1TokenTypes.spacing },
};

export const mockSsotInsetTokenWithAll: SsotInsetTokenGroup = {
	all: { $value: '8px 16px', $type: A1TokenTypes.spacing },
	vertical: { $value: '8px', $type: A1TokenTypes.spacing },
	horizontal: { $value: '16px', $type: A1TokenTypes.spacing },
};

export const mockSsotInsetTokenWithBreakpoints = {
	xs: { $value: '4px', $type: A1TokenTypes.spacing },
	s: { $value: '8px', $type: A1TokenTypes.spacing },
	m: { $value: '16px', $type: A1TokenTypes.spacing },
} as Record<string, DesignToken>;

// Mock for grid-related inset tokens (should be skipped by the algorithm)
export const mockInsetTokenWithGridHorizontal = {
	horizontal: {
		grid: {
			xs: { $value: '24px', $type: A1TokenTypes.spacing },
			s: { $value: '24px', $type: A1TokenTypes.spacing },
			m: { $value: '48px', $type: A1TokenTypes.spacing },
		},
	},
};

export const mockInsetTokenWithGridVertical = {
	vertical: {
		grid: {
			xs: { $value: '16px', $type: A1TokenTypes.spacing },
			s: { $value: '16px', $type: A1TokenTypes.spacing },
			m: { $value: '32px', $type: A1TokenTypes.spacing },
		},
	},
};

// Mock for testing truly invalid combination that should throw error
export const mockSsotInsetTokenTrulyInvalid: SsotInsetTokenGroup = {
	// Add a property that doesn't match any valid pattern to force the error
	invalidProperty: { $value: '8px', $type: A1TokenTypes.spacing },
} as SsotInsetTokenGroup;

export const mockSsotInsetTokenInvalidCombination: SsotInsetTokenGroup = {
	// Use a truly invalid property that won't match any conditions
};

// Mock token sets for testing the main function
export const mockTokenSetWithDirectInset = {
	[A1SpecialTokenNameKeyWords.inset]: mockInsetTokenWithShorthand,
};

export const mockTokenSetWithInsetGroup = {
	[A1SpecialTokenNameKeyWords.inset]: mockSsotInsetTokenVerticalHorizontal,
};

export const mockTokenSetWithInsetGroupHavingAll = {
	[A1SpecialTokenNameKeyWords.inset]: mockSsotInsetTokenWithAll,
};

export const mockTokenSetWithNestedInset = {
	component: {
		button: {
			[A1SpecialTokenNameKeyWords.inset]: mockInsetTokenWithShorthand,
		},
	},
};

export const mockTokenSetWithCoreLayer = {
	[TokenLayers.core]: {
		[A1SpecialTokenNameKeyWords.inset]: mockInsetTokenWithShorthand,
	},
};

export const mockTokenSetWithNonInsetObjects = {
	colors: {
		primary: { $value: '#ff0000', $type: A1TokenTypes.color },
		secondary: { $value: '#00ff00', $type: A1TokenTypes.color },
	},
	spacing: {
		small: { $value: '8px', $type: A1TokenTypes.spacing },
	},
};

export const mockTokenSetWithMixedContent = {
	colors: {
		primary: { $value: '#ff0000', $type: A1TokenTypes.color },
	},
	spacing: {
		[A1SpecialTokenNameKeyWords.inset]: mockInsetTokenWithShorthand,
		small: { $value: '8px', $type: A1TokenTypes.spacing },
	},
};

// Mock return values for matchAllReferenceMathShorthands
export const mockMatchedSingleValue = ['8px'];
export const mockMatchedTwoValues = ['8px', '16px'];
export const mockMatchedThreeValues = ['8px', '16px', '12px'];
export const mockMatchedFourValues = ['8px', '16px', '12px', '24px'];
export const mockMatchedFiveValues = ['8px', '16px', '12px', '24px', '32px'];

// Expected results for createInsetSubTokens
export const expectedSubTokensSingleValue = {
	top: { $value: '8px', $type: A1TokenTypes.spacing },
	end: { $value: '8px', $type: A1TokenTypes.spacing },
	bottom: { $value: '8px', $type: A1TokenTypes.spacing },
	start: { $value: '8px', $type: A1TokenTypes.spacing },
};

export const expectedSubTokensTwoValues = {
	top: { $value: '8px', $type: A1TokenTypes.spacing },
	end: { $value: '16px', $type: A1TokenTypes.spacing },
	bottom: { $value: '8px', $type: A1TokenTypes.spacing },
	start: { $value: '16px', $type: A1TokenTypes.spacing },
};

export const expectedSubTokensThreeValues = {
	top: { $value: '8px', $type: A1TokenTypes.spacing },
	end: { $value: '16px', $type: A1TokenTypes.spacing },
	bottom: { $value: '12px', $type: A1TokenTypes.spacing },
	start: { $value: '16px', $type: A1TokenTypes.spacing },
};

export const expectedSubTokensFourValues = {
	top: { $value: '8px', $type: A1TokenTypes.spacing },
	end: { $value: '16px', $type: A1TokenTypes.spacing },
	bottom: { $value: '12px', $type: A1TokenTypes.spacing },
	start: { $value: '24px', $type: A1TokenTypes.spacing },
};

// Helper functions for test scenarios
export const createTokenSetWithInset = (insetValue: DesignToken | SsotInsetTokenGroup) => {
	return {
		[A1SpecialTokenNameKeyWords.inset]: insetValue,
	};
};

export const mockTokenSetWithCoreInternalLayer: Record<string, object> = {
	core: {
		grid: {
			[`inset-${A1SpecialTokenNameKeyWords.internal}`]: {
				horizontal: {
					$value: '16px',
					$type: A1TokenTypes.spacing,
				},
			},
		},
	},
};

export const mockTokenSetWithCorePropertyNoInternal: Record<string, object> = {
	someParent: {
		core: {
			nested: {
				$value: '8px',
				$type: A1TokenTypes.spacing,
			},
		},
	},
};

// Mock to test the edge case where we want to SKIP recursion
// The condition checks: if childPropertyName !== 'core' OR !includes('internal')
// For ELSE (skip recursion): childPropertyName === 'core' AND includes('internal')
// Since a property name can't be exactly 'core' and contain 'internal' as substring,
// this tests that the condition is logically unreachable
export const mockTokenSetSkipCoreInternal: Record<string, object> = {
	parent: {
		// Property name 'core' - when checked, it equals TokenLayers.core but doesn't include 'internal'
		core: {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'nested-property': {
				$value: '8px',
				$type: A1TokenTypes.spacing,
			},
		},
	},
};

// Attempt to hit the else branch with a property name that contains both concepts
// This tests if somehow a composite key could trigger the skip logic
export const mockTokenSetCoreInternalKey: Record<string, object> = {
	parent: {
		// Try a property that when cast as TokenLayers might equal 'core' but also contains 'internal'
		// Note: This is likely impossible, testing defensive code
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'core-internal': {
			value: {
				$value: '8px',
				$type: A1TokenTypes.spacing,
			},
		},
	},
};

// Reset all mocks helper
export const resetAllMocks = (): void => {
	mockedIsObject.mockReset();
	mockedIsTokenObject.mockReset();
	mockedLogger.debug.mockReset();
	mockedLogicalTokenSetError.mockReset();
	mockedMatchAllReferenceMathShorthands.mockReset();
};

// Setup default mock implementations
export const setupDefaultMocks = (): void => {
	mockedIsObject.mockImplementation(
		(value: unknown): value is object => typeof value === 'object' && value !== null && !Array.isArray(value),
	);

	mockedIsTokenObject.mockImplementation(
		(value: unknown): value is DesignToken => typeof value === 'object' && value !== null && '$value' in value && '$type' in value,
	);

	mockedMatchAllReferenceMathShorthands.mockImplementation((value: string) => {
		// Simple mock implementation that splits by spaces and returns RegExpMatchArray
		if (typeof value === 'string' && value.trim()) {
			const result = value.trim().split(/\s+/) as RegExpMatchArray;
			result.index = 0;
			result.input = value;
			return result;
		}
		return null;
	});

	mockedLogicalTokenSetError.mockImplementation((message: string) => {
		throw new Error(message);
	});
};
