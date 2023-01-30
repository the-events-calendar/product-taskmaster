module.exports = ( gulp, pkg ) => {
	'use strict';

	var fs = require( 'fs' );
	const terser = require('gulp-terser');
	var rename = require( 'gulp-rename' );

	var task = function() {
		var dir = 'src/resources/js';

		try {
			fs.statSync( dir );
		} catch( err ) {
			dir = 'resources';
		}

		return gulp.src( [
				dir + '/**/*.js',
				'!' + dir + '/**/*.min.js'
			] )
			.pipe( terser( {
				keep_fnames: true,
				mangle: false
			} ) )
			.pipe(
				rename( {
					extname: '.min.js'
				} )
			)
			.pipe( gulp.dest( dir ) );
	};

	gulp.task( 'compress-js', task );
};
