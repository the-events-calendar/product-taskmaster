module.exports = function( gulp ) {
	'use strict';

	var sequence = require( 'run-sequence' ).use( gulp ),
		task = function( callback ) {
			sequence(
				'pull',
				'postcss',
				[
					'compress-js',
					'compress-css'
				],
				'zip',
				callback
			);
		};

	gulp.task( 'package', task );
};