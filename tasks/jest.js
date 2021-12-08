module.exports = function( gulp, pkg ) {
	'use-strict';

	var jest = require( 'gulp-jest' ).default;

	var task = function() {
		return gulp.src( './' ).pipe( jest() );
	};

	gulp.task( 'jest', task );
}
