module.exports = function( originalGulp ) {
	'use-strict';

	var gulp = require( 'gulp-param' )( originalGulp, process.argv );
	var eslint = require( 'gulp-eslint' );

	var task = function( filePath, fix ) {
		// --filePath flag is either string or array and must be provided.
		if (
			! Array.isArray( filePath ) &&
			( typeof filePath !== 'string' || ! filePath )
		) {
			console.error( '`--filePath` flag must be provided' );
			process.exit(-1);
		}

		var config = {
			resolvePluginsRelativeTo: 'node_modules/@the-events-calendar/product-taskmaster',
		};

		if ( typeof fix === 'boolean' ) {
			config.fix = fix;
		}

		return gulp.src( filePath )
			.pipe( eslint( config ) )
			.pipe( eslint.format() )
			.pipe( eslint.failAfterError() )
	};

	gulp.task( 'eslint', task );
}
