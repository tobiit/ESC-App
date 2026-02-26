import { Stats } from 'fs';
import { glob } from 'glob';
import { jest } from '@jest/globals';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Get the mocked function for type-safe usage in tests
export const mockGlob = jest.mocked(glob);

export const mockBrand = 'allianz';
export const mockDesignSystemName = 'a1';
export const mockPlatform = 'web';
export const mockFileNameCss = 'tokens.css';
export const expectedArtifactPath = 'token-package/dist/allianz/a1/web/tokens.css';

export const mockFileNameJson = 'button.json';
export const mockFilePathParts = ['tokens', 'components', 'default'];
export const mockByProductExpectedPaths = {
	byProductFilePath: 'build/by-product/prepared-tokens/components/default/',
	byProductFullFilePath: 'build/by-product/prepared-tokens/components/default/button.json',
};

export const mockTokensetName = 'core/colors';
export const expectedTokensetPath = 'tokens/core/colors.json';
export const expectedByProductTokensetPath = 'build/by-product/prepared-tokens/core/colors.json';

export const mockReadFilePath = 'tokens/core/colors.json';
export const mockFileContent = `{
	"color": {
		"primary": { "value": "#0037ff" },
		"secondary": { "value": "#6c757d" }
	}
}`;

export const mockWriteFilePath = 'build/by-product/prepared-tokens/core/colors.json';
export const mockCopySourcePath = 'tokens/core/colors.json';
export const mockCopyDestPath = 'build/by-product/prepared-tokens/core/colors.backup.json';

export const mockAppendContent = ',\n	"tertiary": { "value": "#28a745" }\n}';

export const mockJsonContent = {
	color: {
		primary: { value: '#0037ff' },
		secondary: { value: '#6c757d' },
	},
};

export const mockOldFilePath = mockCopySourcePath;
export const mockNewFilePath = 'tokens/core/colors.renamed.json';
export const mockNonExistentFilePath = 'tokens/non-existent/file.json';
export const mockUnwritableFilePath = '/root/system/protected.json';

export const mockStats = {
	isFile: () => true,
	isDirectory: () => false,
	size: 1234,
	mtime: new Date('2025-05-26T10:00:00Z'),
	mode: 33188, // Regular file with 0644 permissions
} as Stats;

export const mockDirStats = {
	isFile: () => false,
	isDirectory: () => true,
	size: 4096,
	mtime: new Date('2025-05-26T10:00:00Z'),
	mode: 16877, // Directory with 0755 permissions
} as Stats;

// Using some existing paths for folders
export const mockExistingFolderPath = 'tokens/core';
export const mockNonExistentFolderPath = 'tokens/non-existent';
export const mockNewFolderPath = 'tokens/new-folder';
export const mockNestedFolderPath = 'tokens/nested/folder/structure';

// Mock data for loadFilesFromFolder tests
export const mockFolderPath = 'tokens/core';
export const mockGlobFiles = [
	'./tokens/core/colors.json',
	'./tokens/core/dimensions.json',
	'./tokens/core/grid.json',
	'./tokens/core/motion.json',
	'./tokens/core/typography.json',
];
export const mockEmptyFolderPath = 'tokens/empty';
export const mockInvalidFolderPath = '/invalid/path';

// Mock data for getFilePathParts tests
export const mockInvalidFilePath = '';
export const mockDirectoryPath = 'tokens/core/'; // Path ending with directory separator

// Mock data for getFilePathParts tests
export const mockFilePath = 'tokens/core/colors.json';
export const mockFileName = 'colors.json';

// Mock data for readLinesFromFile tests
export const mockTextFilePath = 'tokens/mock/text.txt';
export const mockTextFileContent = [
	'Line 1 with text',
	'  Line 2 with whitespace  ',
	'Line 3 with more text',
	'',
	'Line 5 after empty line',
];
export const mockTextFileContentTrimmed = [
	'Line 1 with text',
	'Line 2 with whitespace',
	'Line 3 with more text',
	'',
	'Line 5 after empty line',
];
