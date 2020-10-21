module.exports = function( gulp ) {
	'use strict';

	var task;

	// Gulp is v3.
	if ( gulp.hasTask ) {
		var sequence = require( 'run-sequence' ).use( gulp );
		task = function( callback ) {
			sequence(
				'pull',
				'postcss',
				[
					'compress-js',
					'compress-css'
				],
				'webpack',
				'zip',
				callback
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
