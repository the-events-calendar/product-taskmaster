module.exports = function( originalGulp ) {
	'use-strict';

	var gulp = require( 'gulp-param' )( originalGulp, process.argv );
	var eslint = require( 'gulp-eslint' );

	var task = function( basePath, fix ) {
		if ( typeof basePath !== 'string' || ! basePath ) {
			console.error( '`--basePath` flag must be provided' );
			process.exit(-1);
		}

		var config = {
			resolvePluginsRelativeTo: 'node_modules/product-taskmaster',
		};

		if ( typeof fix === 'boolean' ) {
			config.fix = fix;
		}

		var filePath = basePath + '/**/*.js';

		return gulp.src( filePath )
			.pipe( eslint( config ) )
			.pipe( eslint.format() )
			.pipe( eslint.failAfterError() )
			.pipe( gulp.dest( basePath ) );
	};

	gulp.task( 'eslint', task );
}
