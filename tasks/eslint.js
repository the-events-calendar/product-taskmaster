module.exports = function( gulp ) {
	'use-strict';

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

		return gulp.src( filePath )
			.pipe( eslint( {
				resolvePluginsRelativeTo: 'node_modules/@the-events-calendar/product-taskmaster',
			} ) )
			.pipe( eslint.format() )
			.pipe( eslint.failAfterError() )
	};

	gulp.task( 'eslint', task );
}
