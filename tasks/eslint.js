module.exports = function( originalGulp ) {
	'use-strict';

	var gulp = require( 'gulp-param' )( originalGulp, process.argv );
	var eslint = require( 'gulp-eslint' );

	var task = function( filePath ) {
		// --filePath flag is either string or array and must be provided.
		if (
			! Array.isArray( filePath ) &&
			( typeof filePath !== 'string' || ! filePath )
		) {
			console.error( 'At least one path using the `--filePath` flag must be provided' );
			process.exit(-1);
		}

		var config = {
			resolvePluginsRelativeTo: 'node_modules/@the-events-calendar/product-taskmaster',
		};

		return gulp.src( filePath )
			.pipe( eslint( config ) )
			.pipe( eslint.format() )
			.pipe( eslint.failAfterError() )
	};

	gulp.task( 'eslint', task );
}
