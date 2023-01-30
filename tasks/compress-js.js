const fs = require( 'fs' );
const terser = require('gulp-terser');
const rename = require( 'gulp-rename' );

const getResourcesDir = () => {
	let resourcesDir = 'src/resources/js';
	try {
		fs.statSync( resourcesDir );
	} catch( err ) {
		resourcesDir = 'resources';
	}
	return resourcesDir;
};

const defineTask = ( gulp, pkg ) => {
	const taskCallback = function() {
		const dir = getResourcesDir();
		const gulpSrc = gulp.src( [
			dir + '/**/*.js',
			'!' + dir + '/**/*.min.js'
		] );

		return minifyFile( gulpSrc );
	};

	gulp.task( 'compress-js', taskCallback );
};

const minifyFile = ( gulpSrc ) => {
	const dir = getResourcesDir();
	const banner = [
		'/**',
		' * This JS file was auto-generated via Terser.',
		' *',
		' * Contributors should avoid editing this file, but instead edit the associated',
		' * non minified file file. For more information, check out our engineering docs',
		' * on how we handle JS minification in our engineering docs.',
		' *',
		' * @see: https://evnt.is/dev-docs-minification',
		' */',
		'',
	].join( '\n' );

	return gulpSrc
		.pipe(
			terser( {
				keep_fnames: true,
				mangle: false,
				format: {
					preamble: banner,
				}
			} )
		)
		.pipe(
			rename( {
				extname: '.min.js'
			} )
		)
		.pipe( gulp.dest( dir ) );
}

module.exports.defineTask = defineTask;
module.exports.minifyFile = minifyFile;
