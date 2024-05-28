module.exports = {
	env: {
		browser: true,
		es6: true,
		jest: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:wpcalypso/recommended',
		'plugin:import/recommended',
	],
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		sourceType: 'module',
		babelOptions: {
			configFile: './babel.config.json',
		},
	},
	rules: {
		camelcase: [
			'error',
			{
				properties: 'never',
			},
		],
		eqeqeq: [
			'error',
			'smart',
		],
		'linebreak-style': [
			'error',
			'unix',
		],
		'max-len': [
			'error',
			{
				code: 100,
				tabWidth: 2,
				comments: 120,
			},
		],
		'no-console': [
			'error',
			{
				allow: [
					'warn',
					'warning',
					'error',
				],
			},
		],
		'import/no-unresolved': 2,
		'jsdoc/check-values': 0,
		'wpcalypso/jsx-classname-namespace': 0,
	},
};
