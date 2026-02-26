// Annoying missing style-dictionary log levels issue: https://github.com/amzn/style-dictionary/issues/367

import { logger } from './signal.js';

export const logGeneralError = (errorMessage: string, error?: Error) => {
	logger.error(errorMessage);

	if (error) {
		throw error;
	} else {
		throw new Error(errorMessage);
	}
};

export const logHorizontalDivider = () =>
	console.log('\n═════════════════════════════════════════════════════════════════════════════════\n');

export const logicalTokenSetError = (errorMessage: string, debugContext: string[] = []) => {
	logger.error(errorMessage);
	debugContext.forEach(debuggingInfo => {
		logger.debug(debuggingInfo);
	});
	throw new Error(errorMessage);
};
