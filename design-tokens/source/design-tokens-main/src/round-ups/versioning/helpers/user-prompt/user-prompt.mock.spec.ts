import { Answers, PromptObject } from 'prompts';
import { UserPromptInput } from '../../types/index.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Type definitions for mocked prompts
export type MockedPromptsFunction = (questions: PromptObject | PromptObject[]) => Promise<Answers<string>>;

// Mock UserPromptInput responses (only the ones actually used in tests)
export const mockUserPromptInputMajor: UserPromptInput = {
	promptSemLevel: 'major',
	promptChangeMessage: 'Breaking changes introduced',
};

export const mockUserPromptInputMinor: UserPromptInput = {
	promptSemLevel: 'minor',
	promptChangeMessage: 'New features added',
};

export const mockUserPromptInputPatch: UserPromptInput = {
	promptSemLevel: 'patch',
	promptChangeMessage: 'Bug fixes applied',
};

// Mock CI/Feature branch responses
export const mockCiDummyResponse: UserPromptInput = {
	promptSemLevel: 'patch',
	promptChangeMessage: 'test ci build',
};

// Mock empty responses
export const mockEmptyResponse: UserPromptInput = {
	promptSemLevel: '',
	promptChangeMessage: '',
};

// Mock prompts answers format (what prompts library returns)
export const mockPromptsAnswerMajor: Answers<string> = {
	promptSemLevel: 'major',
	promptChangeMessage: 'Breaking changes introduced',
};

export const mockPromptsAnswerMinor: Answers<string> = {
	promptSemLevel: 'minor',
	promptChangeMessage: 'New features added',
};

export const mockPromptsAnswerPatch: Answers<string> = {
	promptSemLevel: 'patch',
	promptChangeMessage: 'Bug fixes applied',
};

export const mockPromptsAnswerEmpty: Answers<string> = {};

export const mockPromptsAnswerPartial: Answers<string> = {
	promptSemLevel: 'minor',
};

// Mock rejection/cancellation responses
export const mockUserCancelledPrompt: Answers<string> = {};

// Mock error scenarios
export const mockPromptsError = new Error('Failed to get user input');
export const mockPromptTimeoutError = new Error('Prompt timeout');
export const mockPromptValidationError = new Error('Invalid input provided');

// Helper to create mock prompt questions for testing
export const createMockPromptQuestions = (): PromptObject[] => [
	{
		type: 'select',
		name: 'promptSemLevel',
		message: 'Pick a semantic version level for the update in the token-package',
		choices: [
			{
				title: 'major',
				value: 'major',
				description: 'Breaking changes must lead to a major version bump.',
			},
			{
				title: 'minor',
				value: 'minor',
				description: 'New features or new tokens lead to a minor version bump.',
			},
			{
				title: 'patch',
				value: 'patch',
				description: 'Fixes of token values etc. lead to a patch version bump.',
			},
		],
		initial: 2, // SemVerLevels.patch
	},
	{
		type: 'text',
		name: 'promptChangeMessage',
		message: 'Please describe the change with a short sentence?',
	},
];

// Expected prompt object for semantic version level
export const expectedSemLevelPrompt: PromptObject = {
	type: 'select',
	name: 'promptSemLevel',
	message: 'Pick a semantic version level for the update in the token-package',
	choices: [
		{
			title: 'major',
			value: 'major',
			description: 'Breaking changes must lead to a major version bump.',
		},
		{
			title: 'minor',
			value: 'minor',
			description: 'New features or new tokens lead to a minor version bump.',
		},
		{
			title: 'patch',
			value: 'patch',
			description: 'Fixes of token values etc. lead to a patch version bump.',
		},
	],
	initial: 2, // SemVerLevels.patch
};

// Expected prompt object for change message
export const expectedChangeMessagePrompt: PromptObject = {
	type: 'text',
	name: 'promptChangeMessage',
	message: 'Please describe the change with a short sentence?',
};

/**
 * Helper to create test scenarios for different semver levels
 */
export const createSemVerTestScenarios = () => [
	{
		name: 'major',
		userInput: mockUserPromptInputMajor,
		promptsAnswer: mockPromptsAnswerMajor,
		description: 'should handle major version selection',
	},
	{
		name: 'minor',
		userInput: mockUserPromptInputMinor,
		promptsAnswer: mockPromptsAnswerMinor,
		description: 'should handle minor version selection',
	},
	{
		name: 'patch',
		userInput: mockUserPromptInputPatch,
		promptsAnswer: mockPromptsAnswerPatch,
		description: 'should handle patch version selection',
	},
];

/**
 * Helper to validate prompt questions structure
 */
export const validatePromptQuestions = (questions: PromptObject[]): boolean => {
	if (!Array.isArray(questions) || questions.length !== 2) {
		return false;
	}

	return true;
};
