module.exports = function( gulp, pkg ) {
	'use-strict';

	var eslint = require( 'gulp-eslint' );

	var task = function() {
		// Check if package.json has file path array for eslint.
		if (
			! pkg._filePath ||
			! pkg._filePath.eslint ||
			! Array.isArray( pkg._filePath.eslint )
		) {
			console.error( 'package.json must contain a file path array under _filePath.eslint' );
			process.exit(-1);
		}

		return gulp.src( pkg._filePath.eslint )
			.pipe( eslint( {
				resolvePluginsRelativeTo: 'node_modules/@the-events-calendar/product-taskmaster',
			} ) )
			.pipe( eslint.format() )
			.pipe( eslint.failAfterError() );
	};

	gulp.task( 'eslint', task );
}
