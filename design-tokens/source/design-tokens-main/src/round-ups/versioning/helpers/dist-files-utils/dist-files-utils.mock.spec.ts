import crypto from 'crypto';
import { jest } from '@jest/globals';
import { copyFile, prepareFolder, readFile, statSync, writeFile } from '../../../../shared/index.js';

/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

// Type the mocked functions
export const mockedStatSync = statSync as jest.MockedFunction<typeof statSync>;
export const mockedReadFile = readFile as jest.MockedFunction<typeof readFile>;
export const mockedWriteFile = writeFile as jest.MockedFunction<typeof writeFile>;
export const mockedCopyFile = copyFile as jest.MockedFunction<typeof copyFile>;
export const mockedPrepareFolder = prepareFolder as jest.MockedFunction<typeof prepareFolder>;
export const mockedCreateHash = crypto.createHash as jest.MockedFunction<typeof crypto.createHash>;

// Mock file paths for testing
export const mockTokenOutputFullFilePath = 'token-package/dist/allianz/a1/web/tokens-allianz.css';
export const mockTokenOutputFullFilePathCdn = 'token-package/cdn/tokens/1.0.0/allianz/a1/web/tokens-allianz.1.0.0.css';
export const mockTokenOutputFilePathParts = ['token-package', 'dist', 'allianz', 'a1', 'web', 'tokens-allianz.css'];
export const mockBrand = 'allianz';
export const mockDesignSystemName = 'a1';
export const mockPlatform = 'web';
export const mockFileName = 'tokens-allianz.css';
export const mockVersion = '1.0.0';

// Mock file content for testing
export const mockFileContent = `/**
 * THIS FILE WAS GENERATED AUTOMATICALLY AND SHOULD NOT BE EDITED MANUALLY!
 * 
 * Version §§{VERSION_PLACEHOLDER}§§
 * Generated on §§{DATE_PLACEHOLDER}§§
 * Copyright (c) Allianz Group
 */

:root {
  --color-primary: #ff0000;
  --color-secondary: #00ff00;
  --font-size-base: 16px;
}
`;

export const mockFileContentWithVersion = `/**
 * THIS FILE WAS GENERATED AUTOMATICALLY AND SHOULD NOT BE EDITED MANUALLY!
 * 
 * Version 1.0.0
 * Generated on §§{DATE_PLACEHOLDER}§§
 * Copyright (c) Allianz Group
 */

:root {
  --color-primary: #ff0000;
  --color-secondary: #00ff00;
  --font-size-base: 16px;
}
`;

export const mockFileContentWithVersionAndDate = `/**
 * THIS FILE WAS GENERATED AUTOMATICALLY AND SHOULD NOT BE EDITED MANUALLY!
 * 
 * Version 1.0.0
 * Generated on Thu Jul 04 2025 10:00:00 GMT+0200 (Central European Summer Time)
 * Copyright (c) Allianz Group
 */

:root {
  --color-primary: #ff0000;
  --color-secondary: #00ff00;
  --font-size-base: 16px;
}
`;

// Mock file list for hash testing
export const mockFileList = ['/path/to/file1.css', '/path/to/file2.css', '/path/to/file3.css'];

export const mockFileListSorted = ['/path/to/file1.css', '/path/to/file2.css', '/path/to/file3.css'];

// Mock file stats for testing
export const mockFileStats = {
	isFile: () => true,
	isDirectory: () => false,
	isBlockDevice: () => false,
	isCharacterDevice: () => false,
	isSymbolicLink: () => false,
	isFIFO: () => false,
	isSocket: () => false,
	dev: 123,
	ino: 456,
	mode: 33188,
	nlink: 1,
	uid: 501,
	gid: 20,
	rdev: 0,
	size: 1024,
	blksize: 4096,
	blocks: 8,
	atimeMs: 1625097600000,
	mtimeMs: 1625097600000,
	ctimeMs: 1625097600000,
	birthtimeMs: 1625097600000,
	atime: new Date('2021-07-01T00:00:00.000Z'),
	mtime: new Date('2021-07-01T00:00:00.000Z'),
	ctime: new Date('2021-07-01T00:00:00.000Z'),
	birthtime: new Date('2021-07-01T00:00:00.000Z'),
};

export const mockDirectoryStats = {
	isFile: () => false,
	isDirectory: () => true,
	isBlockDevice: () => false,
	isCharacterDevice: () => false,
	isSymbolicLink: () => false,
	isFIFO: () => false,
	isSocket: () => false,
	dev: 123,
	ino: 789,
	mode: 16877,
	nlink: 2,
	uid: 501,
	gid: 20,
	rdev: 0,
	size: 4096,
	blksize: 4096,
	blocks: 8,
	atimeMs: 1625097600000,
	mtimeMs: 1625097600000,
	ctimeMs: 1625097600000,
	birthtimeMs: 1625097600000,
	atime: new Date('2021-07-01T00:00:00.000Z'),
	mtime: new Date('2021-07-01T00:00:00.000Z'),
	ctime: new Date('2021-07-01T00:00:00.000Z'),
	birthtime: new Date('2021-07-01T00:00:00.000Z'),
};

// Mock version check data
export const mockPreparedVersionCheckData = {
	tokenOutputFullFilePath: mockTokenOutputFullFilePath,
	tokenOutputFilePathParts: mockTokenOutputFilePathParts,
	platform: mockPlatform,
	brand: mockBrand,
	file: mockFileName,
	initialDistVersion: '0.0.1',
};

// Mock file data for different file types
export const mockFileData1 = 'file1 content';
export const mockFileData2 = 'file2 content';
export const mockFileData3 = 'file3 content';

// Mock expected hash value for consistent testing
export const mockExpectedHash = 'abc123def456';

// Mock path variations for testing edge cases
export const mockComplexFilePath = 'token-package/dist/allianz/a1/web/components/tokens-allianz-components.v2.css';
export const mockComplexFilePathParts = ['token-package', 'dist', 'allianz', 'a1', 'web', 'components', 'tokens-allianz-components.v2.css'];
export const mockComplexFileName = 'tokens-allianz-components.v2.css';

// Mock empty file list for testing edge cases
export const mockEmptyFileList: string[] = [];

// Mock single file for testing
export const mockSingleFile = '/path/to/single-file.css';
export const mockSingleFileContent = ':root { --color: #000; }';
