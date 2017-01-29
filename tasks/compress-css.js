module.exports = function( gulp ) {
	'use strict';

	var fs      = require( 'fs' );
	var cssnano = require( 'gulp-cssnano' );
	var rename  = require( 'gulp-rename' );

	var task = function() {
		var dir = 'src/resources/css';

		try {
			fs.statSync( dir );
		} catch( err ) {
			dir = 'resources';
		}

		return gulp.src( [
			dir + '/*.css',
			'!' + dir + '/*.min.css',
		] )
		.pipe( cssnano( {
			'zindex': false
		} ) )
		.pipe(
			rename( {
				extname: '.min.css'
			} )
		)
		.pipe( gulp.dest( dir ) );
	};

	gulp.task( 'compress-css', task );
};