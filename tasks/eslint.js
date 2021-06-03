module.exports = function( originalGulp ) {
	'use-strict';

	var gulp = require( 'gulp-param' )( originalGulp, process.argv );
	var eslint = require( 'gulp-eslint' );

	var task = function( path ) {
		if ( typeof path !== 'string' || ! path ) {
			process.exit(-1);
		}

		return gulp.src( path )
			.pipe( eslint( {
				resolvePluginsRelativeTo: 'node_modules/product-taskmaster',
			} ) )
			.pipe( eslint.format() )
			.pipe(eslint.failAfterError());
	};

	gulp.task( 'eslint', task );
}
