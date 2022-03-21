module.exports = function( gulp, pkg ) {
	'use strict';

	var fs = require( 'fs' );
	var uglify = require( 'gulp-uglify-es' ).default;
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
			.pipe( uglify().on( 'error', function( e ) {
				console.log( {
					filename: e.filename,
					line: e.line,
					col: e.col,
					name: e.name,
					message: e.message,
				} );
				return this.end();
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
