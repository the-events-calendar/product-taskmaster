module.exports = function( gulp ) {
	var normalizedPath = require( 'path' ).join( __dirname, 'tasks' );

	require( 'fs' ).readdirSync( normalizedPath ).forEach( function( file ) {
		require( './tasks/' + file )( gulp );
	} );
	// require( 'require-dir' )( './tasks', { recurse: true } );
};
