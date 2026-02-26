/**
 * DISCLAIMER: This file has been generated using AI assistance.
 * The generation process was guided by the prompt specified in `.github/prompts/unit-testing.prompt.md`.
 */

export const mockTargetFolder = 'token-package/dist/escapp/a1/web';

export const mockScssMixinFiles = [
	`${mockTargetFolder}/tokens-light-minimal-spacious-mixins.scss`,
	`${mockTargetFolder}/tokens-light-minimal-dense-mixins.scss`,
	`${mockTargetFolder}/tokens-dark-lively-compact-mixins.scss`,
];

export const mockAllOutputFiles = [
	...mockScssMixinFiles,
	`${mockTargetFolder}/tokens-light-minimal-spacious.css`,
	`${mockTargetFolder}/tokens-light-minimal-dense.css`,
	`${mockTargetFolder}/tokens-dark-lively-compact.css`,
	`${mockTargetFolder}/some-other-file.json`,
	`${mockTargetFolder}/readme.md`,
];

export const mockGeneralDesignTokenMixinContent = `@use 'sass:list';

@mixin apply-design-tokens($color-scheme, $density, $animation, $selector) {
	// Valid parameter values
	$valid-color-schemes: ('light', 'dark');
	$valid-densities: ('spacious', 'compact', 'dense');
	$valid-animations: ('minimal', 'lively');

	// Validate color-scheme parameter
	@if not list.index($valid-color-schemes, $color-scheme) {
		@error "Invalid color-scheme '#{$color-scheme}'. Must be one of: #{$valid-color-schemes}";
	}

	// Validate density parameter
	@if not list.index($valid-densities, $density) {
		@error "Invalid density '#{$density}'. Must be one of: #{$valid-densities}";
	}

	// Validate animation parameter
	@if not list.index($valid-animations, $animation) {
		@error "Invalid animation '#{$animation}'. Must be one of: #{$valid-animations}";
	}

	// Call the appropriate mixin based on the parameters
	@if $color-scheme == 'light' and $animation == 'minimal' and $density == 'spacious' {
		@include design-tokens-light-minimal-spacious($selector);
	}
}`;

export const mockExpectedBarrelFileContent = `@use './tokens-light-minimal-spacious-mixins' as *;
@use './tokens-light-minimal-dense-mixins' as *;
@use './tokens-dark-lively-compact-mixins' as *;

${mockGeneralDesignTokenMixinContent}`;

export const mockExpectedBarrelFilePath = `${mockTargetFolder}/tokens-theme-mixins-index.scss`;

export const mockEmptyFileList: string[] = [];

export const mockFilesWithoutMixins = [
	`${mockTargetFolder}/tokens-light-minimal-spacious.css`,
	`${mockTargetFolder}/tokens-light-minimal-dense.css`,
	`${mockTargetFolder}/some-other-file.json`,
];
