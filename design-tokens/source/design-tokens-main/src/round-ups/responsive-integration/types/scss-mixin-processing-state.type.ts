import { BraceType } from '../enums/index.js';

export interface ScssMixinProcessingState {
	insideMediaQuery: boolean;
	addedBlankLineBeforeMediaQuery: boolean;
	braceStack: BraceType[];
}
