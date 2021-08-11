module.exports = function( gulp, pkg ) {
	'use-strict';

	var stylelint = require( 'gulp-stylelint' );

	var task = function( filePath ) {
		// Check if package.json has file path array for stylelint.
		if (
			! pkg._filePath ||
			! pkg._filePath.stylelint ||
			! Array.isArray( pkg._filePath.stylelint )
		) {
			console.error( 'package.json must contain a file path array under _filePath.stylelint' );
			process.exit(-1);
		}

		return gulp.src( filePath )
			.pipe( stylelint( {
				fix: false,
				reporters: [
					{ formatter: 'string', console: true },
				],
			} ) );
	};

	gulp.task( 'stylelint', task );
};
