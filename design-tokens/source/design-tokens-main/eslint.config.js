import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-plugin-prettier';
import _import from 'eslint-plugin-import';
import jsdoc from 'eslint-plugin-jsdoc';
import preferArrow from 'eslint-plugin-prefer-arrow';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import pluginJest from 'eslint-plugin-jest';
import stylistic from '@stylistic/eslint-plugin';
import perfectionist from 'eslint-plugin-perfectionist';

const ownGlobalIgnores = globalIgnores(['build/**/*', 'token-package/dist/**/*', 'token-package/cdn/**/*'], 'eslint/global-ignores');

export default defineConfig(ownGlobalIgnores, [
	{
		plugins: {
			prettier,
			import: _import,
			jsdoc,
			'prefer-arrow': preferArrow,
			perfectionist,
		},
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
		},
		rules: {
			'arrow-body-style': [
				'error',
				'as-needed',
				{
					requireReturnForObjectLiteral: true,
				},
			],
			'arrow-parens': ['off', 'always'],
			'brace-style': ['error', '1tbs'],
			'comma-dangle': 'off',
			complexity: 'off',
			'constructor-super': 'error',
			curly: 'error',
			'eol-last': 'error',
			eqeqeq: ['error', 'smart'],
			'guard-for-in': 'error',
			'id-blacklist': ['error', 'any', 'Number', 'number', 'String', 'string', 'Boolean', 'boolean', 'Undefined', 'undefined'],
			'id-match': 'error',
			'import/no-deprecated': 'warn',
			'import/order': [
				'error',
				{
					groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
					warnOnUnassignedImports: true,
					'newlines-between': 'never',
				},
			],
			'jsdoc/check-alignment': 'error',
			'jsdoc/check-indentation': 'error',
			'jsdoc/no-types': 'error',
			'linebreak-style': 'off',
			'max-classes-per-file': 'error',
			'new-parens': 'off',
			'newline-per-chained-call': 'off',
			'no-bitwise': 'error',
			'no-caller': 'error',
			'no-cond-assign': 'error',
			'no-console': [
				'error',
				{
					allow: [
						'log',
						'warn',
						'dir',
						'timeLog',
						'assert',
						'clear',
						'count',
						'countReset',
						'group',
						'groupEnd',
						'table',
						'dirxml',
						'error',
						'groupCollapsed',
						'Console',
						'profile',
						'profileEnd',
						'timeStamp',
						'context',
					],
				},
			],
			'no-debugger': 'error',
			'no-empty': 'off',
			'no-eval': 'error',
			'no-extra-semi': 'off',
			'no-fallthrough': 'error',
			'no-invalid-this': 'error',
			'no-irregular-whitespace': 'off',
			'no-multiple-empty-lines': 'error',
			'no-new-wrappers': 'error',
			'no-restricted-imports': ['error', 'rxjs/Rx'],
			'no-shadow': [
				'error',
				{
					hoist: 'all',
				},
			],
			'no-throw-literal': 'error',
			'no-trailing-spaces': 'error',
			'no-undef-init': 'error',
			'no-underscore-dangle': 'error',
			'no-unsafe-finally': 'error',
			'no-unused-labels': 'error',
			'no-unused-vars': 'off',
			'no-var': 'error',
			'object-shorthand': 'error',
			'one-var': ['error', 'never'],
			'perfectionist/sort-exports': [
				'error',
				{
					type: 'alphabetical',
					order: 'asc',
					fallbackSort: { type: 'unsorted' },
					ignoreCase: true,
					specialCharacters: 'keep',
				},
			],
			'prefer-arrow/prefer-arrow-functions': 'error',
			'prefer-const': 'error',
			'prettier/prettier': [
				'error',
				{
					singleQuote: true,
				},
			],
			quotes: 'off',
			'quote-props': ['error', 'as-needed'],
			radix: 'error',
			'space-before-function-paren': [
				'error',
				{
					anonymous: 'always',
					named: 'never',
					asyncArrow: 'always',
				},
			],
			'space-in-parens': ['off', 'never'],
			'spaced-comment': [
				'error',
				'always',
				{
					markers: ['/'],
				},
			],
			'sort-imports': [
				'error',
				{
					ignoreCase: true,
					ignoreDeclarationSort: true,
					ignoreMemberSort: false,
				},
			],
			'use-isnan': 'error',
			'valid-typeof': 'off',
		},
	},
	{
		files: ['**/*.ts'],
		plugins: {
			'@typescript-eslint': typescriptEslint,
			'@stylistic': stylistic,
			'@stylistic/ts': stylistic,
		},
		languageOptions: {
			parser: tsParser,
		},
		rules: {
			'@stylistic/member-delimiter-style': [
				'error',
				{
					multiline: {
						delimiter: 'semi',
						requireLast: true,
					},
					singleline: {
						delimiter: 'semi',
						requireLast: false,
					},
				},
			],
			'@stylistic/ts/quotes': [
				'error',
				'single',
				{
					allowTemplateLiterals: 'always',
				},
			],
			'@stylistic/ts/semi': ['error', 'always'],
			'@stylistic/type-annotation-spacing': 'error',
			'@typescript-eslint/adjacent-overload-signatures': 'error',
			'@typescript-eslint/array-type': 'off',
			// '@typescript-eslint/typedef': [ // deprecated and in conflict with @typescript-eslint/no-inferrable-types
			// 	'warn',
			// 	{
			// 		variableDeclaration: true,
			// 		variableDeclarationIgnoreFunction: true,
			// 	},
			// ],
			'@typescript-eslint/no-restricted-types': [
				// Keep this if you have *other* custom types you want to ban,
				'error',
				{
					types: {
						// // add a custom message to help explain why not to use it
						// OldType: "Don't use OldType because it is unsafe",
						// // add a custom message, and tell the plugin how to fix it
						// OldAPI: {
						// 	message: 'Use NewAPI instead',
						// 	fixWith: 'NewAPI',
						// },
						// // add a custom message, and tell the plugin how to suggest a fix
						// SoonToBeOldAPI: {
						// 	message: 'Use NewAPI instead',
						// 	suggest: ['NewAPIOne', 'NewAPITwo'],
						// },
					},
				},
			],
			'@typescript-eslint/no-empty-object-type': 'error',
			'@typescript-eslint/no-unsafe-function-type': 'error',
			'@typescript-eslint/no-wrapper-object-types': 'error',
			'@typescript-eslint/consistent-type-assertions': 'error',
			'@typescript-eslint/consistent-type-definitions': 'error',
			'@typescript-eslint/dot-notation': 'off',
			'@typescript-eslint/explicit-member-accessibility': [
				'off',
				{
					accessibility: 'explicit',
				},
			],
			'@typescript-eslint/member-ordering': 'error',
			'@typescript-eslint/naming-convention': 'error',
			'@typescript-eslint/no-empty-function': [
				'warn',
				{
					allow: ['constructors'],
				},
			],
			'@typescript-eslint/no-empty-interface': 'error',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-inferrable-types': [
				'error',
				{
					ignoreParameters: true,
				},
			],
			'@typescript-eslint/no-misused-new': 'error',
			'@typescript-eslint/no-namespace': 'error',
			'@typescript-eslint/no-non-null-assertion': 'error',
			'@typescript-eslint/no-parameter-properties': 'off',
			'@typescript-eslint/no-unused-expressions': 'error',
			'@typescript-eslint/no-unused-vars': 'error',
			'@typescript-eslint/no-shadow': [
				'error',
				{
					hoist: 'all',
				},
			],
			'@typescript-eslint/no-use-before-define': 'error',
			'@typescript-eslint/no-var-requires': 'error',
			'@typescript-eslint/prefer-for-of': 'error',
			'@typescript-eslint/prefer-function-type': 'error',
			'@typescript-eslint/prefer-namespace-keyword': 'error',
			'@typescript-eslint/triple-slash-reference': [
				'error',
				{
					path: 'always',
					types: 'prefer-import',
					lib: 'always',
				},
			],
			'@typescript-eslint/unified-signatures': 'error',
			'no-shadow': 'off',
		},
	},
	{
		files: ['**/*.spec.ts'],
		plugins: {
			jest: pluginJest,
		},
		languageOptions: {
			globals: pluginJest.environments.globals.globals,
		},
		rules: {
			'jest/no-disabled-tests': 'warn',
			'jest/no-focused-tests': 'error',
			'jest/no-identical-title': 'error',
			'jest/prefer-to-have-length': 'warn',
			'jest/valid-expect': 'error',
		},
	},
]);
