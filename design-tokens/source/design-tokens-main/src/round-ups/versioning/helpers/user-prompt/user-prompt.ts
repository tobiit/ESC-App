import prompts, { Answers, PromptObject } from 'prompts';
import { UserPromptInput } from '../../types/index.js';
import { isFeatureBranch } from '../../../../shared/index.js';

enum SemVerLevels {
	major = 0,
	minor = 1,
	patch = 2,
}

export const askForVersionBump = async (): Promise<UserPromptInput> => {
	if (isFeatureBranch) {
		const ciDummy: UserPromptInput = await Promise.resolve({ promptSemLevel: 'patch', promptChangeMessage: 'test ci build' });
		return ciDummy;
	} else {
		const promptObjSemLevel: PromptObject = {
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
			initial: SemVerLevels.patch,
		};
		const promptObjChangeMessage: PromptObject = {
			type: 'text',
			name: 'promptChangeMessage',
			message: `Please describe the change with a short sentence?`,
		};
		const promptQuestions: Array<PromptObject> = [promptObjSemLevel, promptObjChangeMessage];
		const userInput: Promise<Answers<string>> = prompts(promptQuestions);
		return userInput as Promise<UserPromptInput>;
	}
};
