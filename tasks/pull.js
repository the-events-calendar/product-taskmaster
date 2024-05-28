module.exports = function( gulp, pkg ) {
	'use strict';

	var git = require( 'gulp-git' );
	var argv = require( 'yargs' ).argv;
	var notify = require( 'gulp-error-notifier' ).notify;

	var task = function( cb ) {
		var branch;

		if ( 'undefined' === typeof argv.branch ) {
			notify( new Error( 'ERROR: When packaging, you must provide a branch via --branch' ) );
			process.exit( 1 );
		} else {
			branch = argv.branch;
		}

		git.checkout( branch, function( error ) {
			if ( error ) {
				notify( new Error( error ) );
				process.exit( 1 );
			}

			git.pull( 'origin', branch, {}, function( error ) {
				if ( error ) {
					notify( new Error( error ) );
					process.exit( 1 );
				}

				git.updateSubmodule( { args: '--init --recursive' } );
				cb();
			} );
		} );
	};

	gulp.task( 'pull', task );
};
