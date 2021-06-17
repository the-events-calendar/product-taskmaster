module.exports = function( gulp ) {
	var wrappedGulp = require( 'gulp-param' )( gulp, process.argv, 'cb' );
	var normalizedPath = require( 'path' ).join( __dirname, 'tasks' );

	require( 'fs' ).readdirSync( normalizedPath ).forEach( function( file ) {
		if ( 'default.js' === file || 'package.js' === file ) {
			return;
		}

		require( './tasks/' + file )( wrappedGulp );
	} );

	// Gulp v4 must have tasks that are used in series() or parallel() defined first.
	require( './tasks/default.js' )( wrappedGulp );
	require( './tasks/package.js' )( wrappedGulp );
};
