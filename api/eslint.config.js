import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

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
				},
			],
		},
	},
]
