module.exports = function( originalGulp ) {
	'use-strict';

	var gulp = require( 'gulp-param' )( originalGulp, process.argv );
	var stylelint = require( 'gulp-stylelint' );
	// var postcss_dir = './src/resources/postcss';

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
			.pipe( stylelint( {
				fix: false,
				reporters: [
					{ formatter: 'string', console: true },
				],
			} ) );
	};

	gulp.task( 'stylelint', task );
};
