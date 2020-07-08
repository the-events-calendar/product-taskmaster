module.exports = function( gulp ) {
	'use strict';

	const fs        = require( 'fs' );
	const zip       = require( 'gulp-vinyl-zip' ).zip;
	const sync      = require( 'fs-sync' );
	const sequence  = require( 'run-sequence' ).use( gulp );
	const parseJson = require( 'json-parse-better-errors' )

	// this task copies files we'll zip into a build directory
	gulp.task( 'zip-copy-files', function() {
		let packageContents = fs.readFileSync( './package.json', 'utf8' );
		let packageSafeListContents;

		try {
			if ( fs.accessSync( './package-safelist.json', fs.constants.F_OK ) ) {
				packageSafeListContents = fs.readFileSync( './package-safelist.json', 'utf8' )
			} else {
				packageSafeListContents = fs.readFileSync( './package-whitelist.json', 'utf8' )
			}

		} catch( e ) {
			console.log( e );
		}

		let json = parseJson( packageContents );
		let zipInclude = parseJson( packageSafelistContents );
		let commonZipContents;

		try {
			if ( fs.accessSync( './common/package-safelist.json', fs.constants.F_OK ) ) {
				commonZipContents = fs.readFileSync( './common/package-safelist.json', 'utf8' );
			} else if ( fs.existsSync( './common/package-whitelist.json' ) ) {{
				commonZipContents = fs.readFileSync( './common/package-whitelist.json', 'utf8' );
			}
		} catch( e ) {
			// We didnt have common we avoid failing
		}

		let commonZipInclude = [];

		// Make sure if we have common we pull that content in
		if ( commonZipContents ) {
			commonZipInclude = parseJson( commonZipContents );
			// Remove the base file for the common plugin
			commonZipInclude = commonZipInclude.filter( fileName => 'tribe-common.php' !== fileName )
			commonZipInclude = commonZipInclude.map( fileName => 'common/' + fileName );
		}

		sync.mkdir( json._zipfoldername );
		return gulp.src( [ ...zipInclude, ...commonZipInclude ], { base: '.' } )
			.pipe( gulp.dest( json._zipfoldername ) );
	} );

	// this does the zipping
	gulp.task( 'zip-do-zip', function() {
		let packageContents = fs.readFileSync( './package.json', 'utf8' );
		let json = parseJson( packageContents );


		return gulp.src( json._zipfoldername + '/**/*', { base: '.' } )
			.pipe( zip( json._zipname + '.' + json.version + '.zip' ) )
			.pipe( gulp.dest( '../' ) );
	} );

	// this cleans up the trash
	gulp.task( 'zip-purge-build-dir', function( cb ) {
		let packageContents = fs.readFileSync( './package.json', 'utf8' );
		let json = parseJson( packageContents );

		sync.remove( json._zipfoldername );

		cb();
	} );

	let task = function( cb ) {
		sequence(
			'zip-copy-files',
			'zip-do-zip',
			'zip-purge-build-dir',
			cb
		);
	};

	gulp.task( 'zip', task );
};
