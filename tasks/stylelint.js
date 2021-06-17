module.exports = function( gulp ) {
	'use-strict';

	var stylelint = require( 'gulp-stylelint' );

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
