module.exports = function( gulp ) {
	'use strict';

	const fs          = require( 'fs' );
	const zip         = require( 'gulp-vinyl-zip' ).zip;
	const sync        = require( 'fs-sync' );
	const sequence    = require( 'run-sequence' ).use( gulp );
	const parseJson   = require( 'json-parse-better-errors' )
	const syncRequest = require( 'sync-request' );
	const formData    = require( 'form-data' );

	// this task copies files we'll zip into a build directory
	gulp.task( 'zip-copy-files', function() {
		let packageContents = fs.readFileSync( './package.json', 'utf8' );
		let packageWhitelistContents = fs.readFileSync( './package-whitelist.json', 'utf8' )
		let json = parseJson( packageContents );
		let zipInclude = parseJson( packageWhitelistContents );
		let commonZipContents;
		let filesExcluded = [];

		try {
			commonZipContents = fs.readFileSync( './common/package-whitelist.json', 'utf8' );
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

		// Only for .org glotpress we do this check.
		if ( 'https://translate.wordpress.org' === json._glotPressUrl ) {
			let form = new formData();
			// form.append( 'wp_version', '5.3.2' );
			form.append( 'version', json.version );
			form.append( 'slug', json.name );

			let resTranslationAPI = syncRequest(
				'POST',
				'http://api.wordpress.org/translations/plugins/1.0/',
				{
					body: form.toString()
				}
			);
			if ( 200 === resTranslationAPI.statusCode ) {
				let translationsApiData = parseJson( resTranslationAPI.getBody( 'utf8' ) );

				translationsApiData.translations.forEach( function ( translation, index ) {
					filesExcluded.push( '!' + json._domainPath + '/' + json.name + '-' + translation.language + '.mo' );
				} );
			}
		}

		sync.mkdir( json._zipfoldername );
		return gulp.src( [ ...zipInclude, ...commonZipInclude, ...filesExcluded ], { base: '.' } )
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