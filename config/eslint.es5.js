module.exports = {
	env: {
		browser: true
	},
	plugins: [
		'es5',
	],
	extends: [
		'eslint:recommended',
		'plugin:es5/no-es2015',
	],
	rules: {
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
		'no-var': 0,
		'space-before-function-paren': 0,
		strict: 0,
	},
};
