module.exports = {
	extends: 'stylelint-config-standard',
	plugins: [
		'stylelint-order'
	],
	ignoreFiles: [
		'*.js',
		'*.jsx',
		'vendor/**',
		'node_modules/**',
		'src/resources/postcss/utilities/**',
	],
	rules: {
		'at-rule-name-space-after': 'always',
		'at-rule-no-unknown': [ true, {
			'ignoreAtRules': [
				'define-mixin',
				'import',
				'media',
				'mixin',
				'svg-load',
			]
		} ],
		'block-no-empty': true,
		'block-opening-brace-newline-after': 'always',
		'declaration-block-semicolon-newline-before': 'never-multi-line',
		"font-family-no-missing-generic-family-keyword": [ true, {
			"ignoreFontFamilies": [ "dashicons" ]
		} ],
		'function-comma-newline-before': 'never-multi-line',
		'function-parentheses-space-inside': 'never',
		'function-url-quotes': 'always',
		'indentation': 'tab',
		'max-nesting-depth': [ 5, {
			'ignore': [ 'blockless-at-rules' ]
		} ],
		'no-descending-specificity': null,
		'no-extra-semicolons': true,
		'no-invalid-double-slash-comments': null,
		'order/properties-alphabetical-order': true,
		'property-no-unknown': [ true, {
			'ignoreProperties': [ 'container-type' ]
		} ],
		'rule-empty-line-before': [ 'always-multi-line', {
			'ignore': [ 'after-comment', 'first-nested' ]
		} ],
		'selector-pseudo-element-colon-notation': 'single',
		'selector-pseudo-class-no-unknown': true,
		'value-no-vendor-prefix': true,
	}
};
