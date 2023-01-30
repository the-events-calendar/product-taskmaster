module.exports = ( gulp, pkg ) => {
	'use strict';

	var fs = require( 'fs' );
	const terser = require('gulp-terser');
	var rename = require( 'gulp-rename' );

	const banner = [
		'/**',
		' * This JS file was auto-generated via Terser',
		' *',
		' * Contributors should avoid editing this file, but instead edit the associated',
		' * non minified file file. For more information, check out our engineering',
		' * docs on how we handle JS minification in our engineering docs.',
		' *',
		' * @see: https://evnt.is/dev-docs',
		' */',
		'',
		'',
	].join( '\n' );

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
				mangle: false,
				format: {
					preamble: banner,
				}
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
