module.exports = function( gulp ) {
	'use strict';

	var header = require( 'gulp-header' );
	var postcss = require( 'gulp-postcss' );
	var postcssPresetEnv = require( 'postcss-preset-env' );
	var postcssImport = require( 'postcss-import' );
	var postcssMixins = require( 'postcss-mixins' );
	var postcssHexrgba = require( 'postcss-hexrgba' );
	var postcssNested = require( 'postcss-nested' );
	var postcssInlineSvg = require( 'postcss-inline-svg' );
	var postcssCalc = require( 'postcss-calc' );
	var cssMqpacker = require( 'css-mqpacker' );
	var rename = require( 'gulp-rename' );

	var task = function( preserve ) {
		var preserveFlag = 'false' !== preserve;

		var processors = [
			postcssImport,
			postcssMixins,
			postcssNested,
			postcssPresetEnv( {
				stage: 0,
				feature: {
					'custom-properties': {
						preserve: preserveFlag,
					},
				},
			} ),
			postcssInlineSvg,
			postcssCalc,
			postcssHexrgba,
			cssMqpacker,
		];

		var banner = [
			'/**',
			' * This CSS file was auto-generated via PostCSS',
			' *',
			' * Contributors should avoid editing this file, but instead edit the associated',
			' * src/resources/postcss/ file. For more information, check out our engineering',
			' * docs on how we handle CSS in our engineering docs.',
			' *',
			' * @see: https://the-events-calendar.github.io/products-engineering/docs/code-standards/css/',
			' */',
			'',
			'',
		].join( '\n' );

		return gulp.src( [
			'./src/resources/postcss/**/*.pcss',
			'!./src/resources/postcss/**/_*.pcss',
		] )
		.pipe( postcss( processors ) )
		.pipe( header( banner ) )
		.pipe(
			rename( {
				extname: '.css'
			} )
		)
		.pipe( gulp.dest( './src/resources/css' ) );
	};

	gulp.task( 'postcss', task );
};
