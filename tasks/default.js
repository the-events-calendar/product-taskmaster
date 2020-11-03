module.exports = function( gulp ) {
	'use strict';

	var task;

	// Gulp is v3.
	if ( gulp.hasTask ) {
		var sequence = require( 'run-sequence' ).use( gulp );
		task = function( cb ) {
			sequence(
				'postcss',
				[
					'compress-css',
					'compress-js'
				],
				cb
			);
		};

	// Gulp is v4.
	} else {
		task = gulp.series(
			'postcss',
			gulp.parallel(
				'compress-css',
				'compress-js',
			),
		);
	}

	gulp.task( 'default', task );
};
