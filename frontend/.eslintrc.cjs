module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'standard',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'simple-import-sort'],
  rules: {
    'react/prop-types': 'off',
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': 'off',
    'prettier/prettier': ['error', {
      'printWidth': 80,
      'tabWidth': 2,
      'singleQuote': true,
      'trailingComma': 'all',
      'arrowParens': 'always',
      'semi': false,
      'endOfLine': 'auto',
    }],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error"
  },
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": "latest"
  }
}
