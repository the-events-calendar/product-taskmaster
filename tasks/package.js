module.exports = function( gulp ) {
	'use strict';

	var task;

	// Gulp is v3.
	if ( gulp.hasTask ) {
		var sequence = require( 'run-sequence' ).use( gulp );
		task = function( cb ) {
			sequence(
				'pull',
				'postcss',
				[
					'compress-js',
					'compress-css'
				],
				'webpack',
				'zip',
				cb
			);
		};

	// Gulp is v4.
	} else {
		task = gulp.series(
			'pull',
			'postcss',
			gulp.parallel(
				'compress-js',
				'compress-css',
			),
			'webpack',
			'zip',
		);
	}

	gulp.task( 'package', task );
};
