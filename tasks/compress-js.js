module.exports = function( gulp ) {
	'use strict';

	const fs     = require( 'fs' );
	const uglify = require( 'gulp-uglify-es' ).default;
	const rename = require( 'gulp-rename' );

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
		.pipe( uglify().on( 'error', function( e ){
            console.log( e );
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