import {
	FileExtensions,
	loadFilesFromFolder,
	readFile,
	scssMixinsFileNameKeyWord,
	tokenOutputFileNamePrefix,
	tokenPackagePath,
	writeFile,
} from '../../../../shared/index.js';

export const scssThemeMixinsBarrelFile = async (targetFolder: string): Promise<void> => {
	const allOutputFiles = await loadFilesFromFolder(targetFolder);
	const scssMixinFiles = allOutputFiles.filter((fileName: string) =>
		fileName.endsWith(`${scssMixinsFileNameKeyWord}${FileExtensions.scss}`),
	);
	const a1ThemeMixinsContentSeparate: string[] = [];

	for (const scssMixinFilePath of scssMixinFiles) {
		const scssImportPath = scssMixinFilePath.replace(targetFolder, '').replace(FileExtensions.scss, '');
		a1ThemeMixinsContentSeparate.push(`@use '.${scssImportPath}' as *;`);
	}

	const scssThemeMixinsBarrelFileName = `${tokenOutputFileNamePrefix}theme-${scssMixinsFileNameKeyWord}-index${FileExtensions.scss}`;
	const generalDesignTokenMixin = readFile(`${tokenPackagePath}/src/${scssThemeMixinsBarrelFileName}`);
	a1ThemeMixinsContentSeparate.push(`\n${generalDesignTokenMixin}`);
	const a1ThemeMixinsContent: string = a1ThemeMixinsContentSeparate.join('\n');
	const a1ThemeMixinsTargetFilePath = `${targetFolder}/${scssThemeMixinsBarrelFileName}`;
	writeFile(a1ThemeMixinsTargetFilePath, a1ThemeMixinsContent);
};
