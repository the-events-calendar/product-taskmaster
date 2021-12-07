module.exports = function( gulp, pkg ) {
	'use-strict';

	var jest = require( 'gulp-jest' ).default;

	var task = function() {
		// Check if package.json has file path array for jest.
		if (
			! pkg._filePath ||
			! pkg._filePath.jest ||
			! Array.isArray( pkg._filePath.jest )
		) {
			console.error( 'package.json must contain a file path array under _filePath.jest' );
			process.exit(-1);
		}

		return gulp.src( pkg._filePath.jest )
			.pipe( jest() );
	};

	gulp.task( 'jest', task );
}
