import { appendToFile, CssSelectors } from '../../../../shared/index.js';

/**
 * Appends media query CSS blocks to a target file for given breakpoint variables.
 * Returns true if any media query was written, false otherwise.
 */
export const createAndWriteMediaQuery = (mediaQueryVariables: Record<string, string[]>, targetFile: string): boolean => {
	const appendedLines: string[] = [];
	Object.entries(mediaQueryVariables).forEach(([breakpoint, variables]: [string, string[]]) => {
		// Only create a media query block if there are variables to add
		if (variables && variables.length > 0) {
			appendedLines.push(`\n@media screen and (min-width: ${breakpoint}px) {`);
			appendedLines.push(`  ${CssSelectors.root}, ${CssSelectors.host} {`);
			appendedLines.push(...variables);
			appendedLines.push('  }');
			appendedLines.push('}');
		}
	});

	if (appendedLines.length > 0) {
		appendToFile(targetFile, appendedLines.join('\n'));
		return true;
	}
	return false;
};
