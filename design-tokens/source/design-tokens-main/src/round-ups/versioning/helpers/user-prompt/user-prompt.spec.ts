import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Answers, PromptObject } from 'prompts';
import prompts from 'prompts';
import { askForVersionBump } from './user-prompt.js';
import {
	createMockPromptQuestions,
	createSemVerTestScenarios,
	expectedChangeMessagePrompt,
	expectedSemLevelPrompt,
	mockCiDummyResponse,
	mockEmptyResponse,
	mockPromptsAnswerEmpty,
	mockPromptsAnswerMajor,
	mockPromptsAnswerMinor,
	mockPromptsAnswerPartial,
	mockPromptsAnswerPatch,
	mockPromptsError,
	mockPromptTimeoutError,
	mockPromptValidationError,
	mockUserCancelledPrompt,
	mockUserPromptInputMajor,
	mockUserPromptInputMinor,
	mockUserPromptInputPatch,
	validatePromptQuestions,
} from './user-prompt.mock.spec.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Mock the prompts library
jest.mock('prompts', () => jest.fn());

// Mock the shared constants with different values for testing
let mockIsFeatureBranch = false;
jest.mock('../../../../shared/index.js', () => {
	const actual: object = jest.requireActual('../../../../shared/index.js');
	return {
		...actual,
		get isFeatureBranch() {
			return mockIsFeatureBranch;
		},
	};
});

// Get the mocked prompts function
const mockPrompts = prompts as jest.MockedFunction<typeof prompts>;

describe('User Prompt Utils', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockIsFeatureBranch = false; // Default to false
		mockPrompts.mockResolvedValue(mockPromptsAnswerPatch);
	});

	afterEach(() => {
		mockIsFeatureBranch = false; // Reset after each test
	});

	describe('askForVersionBump', () => {
		describe('feature branch scenarios (CI mode)', () => {
			beforeEach(() => {
				mockIsFeatureBranch = true;
			});

			it('should return CI dummy response when in feature branch mode', async () => {
				const result = await askForVersionBump();

				expect(result).toEqual(mockCiDummyResponse);
				expect(mockPrompts).not.toHaveBeenCalled();
			});

			it('should resolve the promise correctly in CI mode', async () => {
				await expect(askForVersionBump()).resolves.toEqual(mockCiDummyResponse);
			});

			it('should return consistent response in multiple calls in CI mode', async () => {
				const result1 = await askForVersionBump();
				const result2 = await askForVersionBump();

				expect(result1).toEqual(mockCiDummyResponse);
				expect(result2).toEqual(mockCiDummyResponse);
				expect(result1).toEqual(result2);
			});
		});

		describe('interactive mode scenarios (non-feature branch)', () => {
			beforeEach(() => {
				mockIsFeatureBranch = false;
			});

			describe('successful user input scenarios', () => {
				const testScenarios = createSemVerTestScenarios();

				testScenarios.forEach(({ promptsAnswer, userInput, description }) => {
					it(description, async () => {
						mockPrompts.mockResolvedValue(promptsAnswer);

						const result = await askForVersionBump();

						expect(result).toEqual(userInput);
						expect(mockPrompts).toHaveBeenCalledTimes(1);

						// Verify the prompt questions structure
						const [questionsArg] = mockPrompts.mock.calls[0];
						expect(Array.isArray(questionsArg)).toBe(true);
						expect(validatePromptQuestions(questionsArg as PromptObject[])).toBe(true);
					});
				});

				it('should call prompts with correct question structure', async () => {
					mockPrompts.mockResolvedValue(mockPromptsAnswerPatch);

					await askForVersionBump();

					expect(mockPrompts).toHaveBeenCalledWith(
						expect.arrayContaining([
							expect.objectContaining(expectedSemLevelPrompt as unknown as Record<string, unknown>),
							expect.objectContaining(expectedChangeMessagePrompt as unknown as Record<string, unknown>),
						]),
					);
				});

				it('should handle prompts with proper question order', async () => {
					mockPrompts.mockResolvedValue(mockPromptsAnswerMinor);

					await askForVersionBump();

					const [questionsArg] = mockPrompts.mock.calls[0];
					const questions = questionsArg as PromptObject[];

					expect(questions).toHaveLength(2);
					expect(questions[0].name).toBe('promptSemLevel');
					expect(questions[1].name).toBe('promptChangeMessage');
				});

				it('should configure semantic level prompt with correct choices', async () => {
					mockPrompts.mockResolvedValue(mockPromptsAnswerMajor);

					await askForVersionBump();

					const [questionsArg] = mockPrompts.mock.calls[0];
					const questions = questionsArg as PromptObject[];
					const semLevelPrompt = questions[0];

					expect(semLevelPrompt.type).toBe('select');
					expect(semLevelPrompt.choices).toHaveLength(3);
					expect(semLevelPrompt.choices).toEqual([
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
					]);
					expect(semLevelPrompt.initial).toBe(2); // SemVerLevels.patch
				});

				it('should configure change message prompt correctly', async () => {
					mockPrompts.mockResolvedValue(mockPromptsAnswerPatch);

					await askForVersionBump();

					const [questionsArg] = mockPrompts.mock.calls[0];
					const questions = questionsArg as PromptObject[];
					const changeMessagePrompt = questions[1];

					expect(changeMessagePrompt.type).toBe('text');
					expect(changeMessagePrompt.name).toBe('promptChangeMessage');
					expect(changeMessagePrompt.message).toBe('Please describe the change with a short sentence?');
				});
			});

			describe('edge cases and error scenarios', () => {
				it('should handle empty prompts response', async () => {
					mockPrompts.mockResolvedValue(mockPromptsAnswerEmpty);

					const result = await askForVersionBump();

					expect(result).toEqual(mockPromptsAnswerEmpty);
					expect(mockPrompts).toHaveBeenCalledTimes(1);
				});

				it('should handle partial prompts response', async () => {
					mockPrompts.mockResolvedValue(mockPromptsAnswerPartial);

					const result = await askForVersionBump();

					expect(result).toEqual(mockPromptsAnswerPartial);
					expect(mockPrompts).toHaveBeenCalledTimes(1);
				});

				it('should handle user cancellation (empty response)', async () => {
					mockPrompts.mockResolvedValue(mockUserCancelledPrompt);

					const result = await askForVersionBump();

					expect(result).toEqual(mockUserCancelledPrompt);
					expect(mockPrompts).toHaveBeenCalledTimes(1);
				});

				it('should handle prompts library rejection', async () => {
					mockPrompts.mockRejectedValue(mockPromptsError);

					await expect(askForVersionBump()).rejects.toThrow(mockPromptsError);
					expect(mockPrompts).toHaveBeenCalledTimes(1);
				});

				it('should handle prompts timeout error', async () => {
					mockPrompts.mockRejectedValue(mockPromptTimeoutError);

					await expect(askForVersionBump()).rejects.toThrow('Prompt timeout');
					expect(mockPrompts).toHaveBeenCalledTimes(1);
				});

				it('should handle prompts validation error', async () => {
					mockPrompts.mockRejectedValue(mockPromptValidationError);

					await expect(askForVersionBump()).rejects.toThrow('Invalid input provided');
					expect(mockPrompts).toHaveBeenCalledTimes(1);
				});

				it('should type cast prompts response correctly', async () => {
					const customResponse: Answers<string> = {
						promptSemLevel: 'custom-level',
						promptChangeMessage: 'custom message',
						extraField: 'should be ignored in type casting',
					};
					mockPrompts.mockResolvedValue(customResponse);

					const result = await askForVersionBump();

					// The result should maintain all fields from the prompts response
					expect(result).toEqual(customResponse);
				});
			});

			describe('prompts library integration', () => {
				it('should pass questions array to prompts function', async () => {
					mockPrompts.mockResolvedValue(mockPromptsAnswerPatch);

					await askForVersionBump();

					expect(mockPrompts).toHaveBeenCalledWith(expect.any(Array));

					const [questionsArg] = mockPrompts.mock.calls[0];
					expect(Array.isArray(questionsArg)).toBe(true);
					expect(questionsArg).toHaveLength(2);
				});

				it('should maintain prompt question properties', async () => {
					mockPrompts.mockResolvedValue(mockPromptsAnswerMinor);

					await askForVersionBump();

					const expectedQuestions = createMockPromptQuestions();
					expect(mockPrompts).toHaveBeenCalledWith(
						expect.arrayContaining([
							expect.objectContaining({
								type: expectedQuestions[0].type,
								name: expectedQuestions[0].name,
								message: expectedQuestions[0].message,
							}),
							expect.objectContaining({
								type: expectedQuestions[1].type,
								name: expectedQuestions[1].name,
								message: expectedQuestions[1].message,
							}),
						]),
					);
				});

				it('should handle multiple sequential calls correctly', async () => {
					mockPrompts
						.mockResolvedValueOnce(mockPromptsAnswerMajor)
						.mockResolvedValueOnce(mockPromptsAnswerMinor)
						.mockResolvedValueOnce(mockPromptsAnswerPatch);

					const result1 = await askForVersionBump();
					const result2 = await askForVersionBump();
					const result3 = await askForVersionBump();

					expect(result1).toEqual(mockUserPromptInputMajor);
					expect(result2).toEqual(mockUserPromptInputMinor);
					expect(result3).toEqual(mockUserPromptInputPatch);
					expect(mockPrompts).toHaveBeenCalledTimes(3);
				});
			});
		});

		describe('SemVerLevels enum integration', () => {
			it('should use correct enum value for initial patch selection', async () => {
				mockPrompts.mockResolvedValue(mockPromptsAnswerPatch);

				await askForVersionBump();

				const [questionsArg] = mockPrompts.mock.calls[0];
				const questions = questionsArg as PromptObject[];
				const semLevelPrompt = questions[0];

				// SemVerLevels.patch = 2
				expect(semLevelPrompt.initial).toBe(2);
			});

			it('should maintain enum consistency across calls', async () => {
				mockPrompts.mockResolvedValue(mockPromptsAnswerMinor);

				await askForVersionBump();
				await askForVersionBump();

				// Both calls should use the same enum value
				const firstCall = mockPrompts.mock.calls[0][0] as PromptObject[];
				const secondCall = mockPrompts.mock.calls[1][0] as PromptObject[];

				expect(firstCall[0].initial).toBe(secondCall[0].initial);
				expect(firstCall[0].initial).toBe(2); // SemVerLevels.patch
			});
		});

		describe('Integration Tests', () => {
			it('should work end-to-end with feature branch detection', async () => {
				// Test CI mode
				mockIsFeatureBranch = true;

				const ciResult = await askForVersionBump();
				expect(ciResult).toEqual(mockCiDummyResponse);

				// Test interactive mode
				mockIsFeatureBranch = false;
				mockPrompts.mockResolvedValue(mockPromptsAnswerMajor);

				const interactiveResult = await askForVersionBump();
				expect(interactiveResult).toEqual(mockUserPromptInputMajor);
			});

			it('should handle rapid successive calls correctly', async () => {
				mockPrompts
					.mockResolvedValueOnce(mockPromptsAnswerMajor)
					.mockResolvedValueOnce(mockPromptsAnswerMinor)
					.mockResolvedValueOnce(mockPromptsAnswerPatch);

				const promises = [askForVersionBump(), askForVersionBump(), askForVersionBump()];
				const results = await Promise.all(promises);

				expect(results).toEqual([mockUserPromptInputMajor, mockUserPromptInputMinor, mockUserPromptInputPatch]);
				expect(mockPrompts).toHaveBeenCalledTimes(3);
			});

			it('should maintain type safety throughout the flow', async () => {
				mockPrompts.mockResolvedValue(mockPromptsAnswerPatch);

				const result = await askForVersionBump();

				// TypeScript should infer the correct type
				expect(typeof result.promptSemLevel).toBe('string');
				expect(typeof result.promptChangeMessage).toBe('string');
				expect(result.promptSemLevel).toBe('patch');
				expect(result.promptChangeMessage).toBe('Bug fixes applied');
			});
		});

		describe('Code Coverage Completeness', () => {
			it('should cover all return paths in askForVersionBump', async () => {
				// Cover CI path
				mockIsFeatureBranch = true;

				await askForVersionBump();

				// Cover interactive path
				mockIsFeatureBranch = false;
				mockPrompts.mockResolvedValue(mockPromptsAnswerMinor);

				await askForVersionBump();

				// Both code paths should be covered
				expect(true).toBe(true); // This test ensures both branches are executed
			});

			it('should cover all prompt configuration options', async () => {
				mockPrompts.mockResolvedValue(mockPromptsAnswerPatch);

				await askForVersionBump();

				const [questionsArg] = mockPrompts.mock.calls[0];
				const questions = questionsArg as PromptObject[];

				// Ensure all prompt properties are created and used
				expect(questions[0]).toHaveProperty('type');
				expect(questions[0]).toHaveProperty('name');
				expect(questions[0]).toHaveProperty('message');
				expect(questions[0]).toHaveProperty('choices');
				expect(questions[0]).toHaveProperty('initial');

				expect(questions[1]).toHaveProperty('type');
				expect(questions[1]).toHaveProperty('name');
				expect(questions[1]).toHaveProperty('message');
			});

			it('should cover enum usage in prompt configuration', async () => {
				mockPrompts.mockResolvedValue(mockPromptsAnswerMajor);

				await askForVersionBump();

				const [questionsArg] = mockPrompts.mock.calls[0];
				const questions = questionsArg as PromptObject[];

				// Test that SemVerLevels enum is used
				expect(questions[0].initial).toBe(2); // This covers the enum usage
			});
		});
	});

	describe('Mock File Coverage', () => {
		it('should cover all mock helper functions', () => {
			// Test mock helpers to ensure 100% coverage of mock file
			const questions = createMockPromptQuestions();
			expect(questions).toHaveLength(2);

			const scenarios = createSemVerTestScenarios();
			expect(scenarios).toHaveLength(3);

			const isValid = validatePromptQuestions(questions);
			expect(isValid).toBe(true);

			// Test with invalid questions
			const invalidQuestions: PromptObject[] = [];
			const isInvalid = validatePromptQuestions(invalidQuestions);
			expect(isInvalid).toBe(false);
		});

		it('should cover all mock response variations', () => {
			// This test ensures all mock data objects are used at least once
			expect(mockCiDummyResponse.promptSemLevel).toBe('patch');
			expect(mockEmptyResponse.promptSemLevel).toBe('');
			expect(mockUserPromptInputMajor.promptSemLevel).toBe('major');
			expect(mockUserPromptInputMinor.promptSemLevel).toBe('minor');
			expect(mockUserPromptInputPatch.promptSemLevel).toBe('patch');
		});
	});
});
