module.exports = function( gulp ) {
	'use strict';

	let fs       = require( 'fs' );
	let zip      = require( 'gulp-vinyl-zip' ).zip;
	let sync     = require( 'fs-sync' );
	let sequence = require( 'run-sequence' ).use( gulp );

	// this task copies files we'll zip into a build directory
	gulp.task( 'zip-copy-files', function() {
		let packageContents = fs.readFileSync( './package.json' );
		let packageWhitelistContents = fs.readFileSync( './package-whitelist.json' )
		let json = null;
		let zipInclude = [];

		try {
			json = JSON.parse( packageContents );
		} catch( e ) {
			console.log( e, packageContents );

			// If we fail to read the package we Error and bail
			return;
		}

		try {
			let zipInclude = JSON.parse( packageWhitelistContents );
		} catch( e ) {
			console.log( e, packageContents );

			// If we fail to read the package-whitelist we Error and bail
			return;
		}

		let commonZipInclude = [];

		try {
			commonZipInclude = JSON.parse( fs.readFileSync( './common/package-whitelist.json' ) );
			// Remove the base file for the common plugin
			commonZipInclude = commonZipInclude.filter( fileName => 'tribe-common.php' !== fileName )
			commonZipInclude = commonZipInclude.map( fileName => 'common/' + fileName );
		} catch( e ) {
			// We didnt have common
		}

		sync.mkdir( json._zipfoldername );
		return gulp.src( [ ...zipInclude, ...commonZipInclude ], { base: '.' } )
			.pipe( gulp.dest( json._zipfoldername ) );
	} );

	// this does the zipping
	gulp.task( 'zip-do-zip', function() {
		let json = JSON.parse( fs.readFileSync( './package.json' ) );

		return gulp.src( json._zipfoldername + '/**/*', { base: '.' } )
			.pipe( zip( json._zipname + '.' + json.version + '.zip' ) )
			.pipe( gulp.dest( '../' ) );
	} );

	// this cleans up the trash
	gulp.task( 'zip-purge-build-dir', function( cb ) {
		let json = JSON.parse( fs.readFileSync( './package.json' ) );

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