module.exports = {
	extends: [
		'eslint:recommended',
		'wpcalypso',
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
		'import/no-unresolved': 2,
		'wpcalypso/jsx-classname-namespace': 0,
	},
};
