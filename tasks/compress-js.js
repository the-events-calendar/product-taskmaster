module.exports = function( gulp ) {
	'use strict';

	var fs     = require( 'fs' );
	var uglify = require( 'gulp-uglify' );
	var rename = require( 'gulp-rename' );

	var task = function() {
		var dir = 'src/resources/js';

		try {
			fs.statSync( dir );
		} catch( err ) {
			dir = 'resources';
		}

		return gulp.src( [
			dir + '/*.js',
			'!' + dir + '/*.min.js'
		] )
		.pipe( uglify() )
		.pipe(
			rename( {
				extname: '.min.js'
			} )
		)
		.pipe( gulp.dest( dir ) );
	};

	gulp.task( 'compress-js', task );
};