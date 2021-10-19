module.exports = function( gulp, pkg ) {
	'use strict';

	var fs = require( 'fs' );
	var zip = require( 'gulp-vinyl-zip' ).zip;
	var sync = require( 'fs-sync' );
	var parseJson = require( 'json-parse-better-errors' )

	// this task copies files we'll zip into a build directory
	gulp.task( 'zip-copy-files', function() {
		var packageContents = fs.readFileSync( './package.json', 'utf8' );
		var packageSafelistContents;

		if ( fs.existsSync( './package-safelist.json' ) ) {
			try {
				packageSafelistContents = fs.readFileSync( './package-safelist.json', 'utf8' )
			} catch( error ) {
				console.error( 'Failed on "./package-safelist.json": ', error );
			}
		} else if ( fs.existsSync( './package-whitelist.json' ) ) {
			try {
				packageSafelistContents = fs.readFileSync( './package-whitelist.json', 'utf8' )
			} catch( error ) {
				console.error( 'Failed on "./package-whitelist.json": ', error );
			}
		} else {
			console.error( 'No package safe list of files were found for the plugin.' );
		}

		var json = parseJson( packageContents );
		var zipInclude = parseJson( packageSafelistContents );
		var commonZipContents;

		if ( fs.existsSync( './common/package-safelist.json' ) ) {
			try {
				commonZipContents = fs.readFileSync( './common/package-safelist.json', 'utf8' )
			} catch( error ) {
				console.error( 'Failed on "./common/package-safelist.json": ', error );
			}
		} else if ( fs.existsSync( './common/package-whitelist.json' ) ) {
			try {
				commonZipContents = fs.readFileSync( './common/package-whitelist.json', 'utf8' )
			} catch( error ) {
				console.error( 'Failed on "./common/package-whitelist.json": ', error );
			}
		} else {
			// Common was not present so we bail.
		}

		var commonZipInclude = [];

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
		var packageContents = fs.readFileSync( './package.json', 'utf8' );
		var json = parseJson( packageContents );


		return gulp.src( json._zipfoldername + '/**/*', { base: '.' } )
			.pipe( zip( json._zipname + '.' + json.version + '.zip' ) )
			.pipe( gulp.dest( '../' ) );
	} );

	// this cleans up the trash
	gulp.task( 'zip-purge-build-dir', function( cb ) {
		var packageContents = fs.readFileSync( './package.json', 'utf8' );
		var json = parseJson( packageContents );

		sync.remove( json._zipfoldername );

		cb();
	} );

	var task = gulp.series(
		'zip-copy-files',
		'zip-do-zip',
		'zip-purge-build-dir',
	);

	gulp.task( 'zip', task );
};
