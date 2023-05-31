module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier',
		"plugin:jest/recommended",
		"plugin:jest-dom/recommended",
		"plugin:testing-library/dom"
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', "jest", "jest-dom", "svelte", "testing-library"],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
		"jest/globals": true,
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	rules: {
		"testing-library/prefer-user-event": "error",
	}
};
