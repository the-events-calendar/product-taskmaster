module.exports = function( gulp, pkg ) {
	var normalizedPath = require( 'path' ).join( __dirname, 'tasks' );

	require( 'fs' ).readdirSync( normalizedPath ).forEach( function( file ) {
		if ( 'default.js' === file || 'package.js' === file ) {
			return;
		}

		require( './tasks/' + file )( gulp, pkg );
	} );

	// Gulp v4 must have tasks that are used in series() or parallel() defined first.
	require( './tasks/default.js' )( gulp, pkg );
	require( './tasks/package.js' )( gulp, pkg );
};
