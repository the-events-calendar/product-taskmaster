module.exports = function( gulp ) {
	'use strict';

	var sequence = require( 'run-sequence' ).use( gulp );

	var task = function( cb ) {
		sequence(
			'postcss',
			[
				'compress-css',
				'compress-js'
			],
			cb
		);
	};
	gulp.task( 'default', task );
};