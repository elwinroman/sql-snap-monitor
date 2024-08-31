import pluginJs from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
	{ ignores: ['dist/'] },
	{ files: ['**/*.{js,mjs,cjs,ts}'] },
	{ languageOptions: { globals: globals.node } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	eslintPluginPrettierRecommended,
	{
		rules: {
			'prettier/prettier': [
				'error',
				{
					printWidth: 140,
					tabWidth: 2,
					useTabs: true,
					semi: false,
					singleQuote: true,
					trailingComma: 'all',
					bracketSpacing: true,
					arrowParens: 'avoid',
					endOfLine: 'auto',
				},
			],
			'sort-imports': [
				'error',
				{
					ignoreCase: false,
					ignoreDeclarationSort: true,
					ignoreMemberSort: false,
					memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
					allowSeparatedGroups: false,
				},
			],
		},
	},
]
