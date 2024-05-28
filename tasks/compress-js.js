module.exports = ( ( gulp, pkg ) => {
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

	const getSrc = () => {
		const dir = getResourcesDir();

		return [
			dir + '/**/*.js',
			'!' + dir + '/**/*.min.js'
		];
	};

	const run = () => {
		return minifyFile( gulp.src( getSrc() ) );
	};

	const register = () => {
		gulp.task( 'compress-js', run );
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
	};

	// Expose methods that make sense.
	return {
		minifyFile: minifyFile,
		register: register,
		getSrc: getSrc,
		getResourcesDir: getResourcesDir,
	};
} );
