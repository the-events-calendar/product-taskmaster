/* eslint-disable max-len, no-console */
const https = require( 'https' );

// TODO: Change to use master branch
const URL = 'https://raw.githubusercontent.com/moderntribe/tribe-common/task/gutenberg-merge/package.json';

module.exports = new Promise( ( resolve, reject ) => {
	https.get( URL, response => {
		let data = '';
		response.setEncoding( 'utf8' );
		response.on( 'data', ( chunk ) => data += chunk );
		response.on( 'abort', reject );
		response.on( 'end', () => {
			try {
				resolve( JSON.parse( data ) );
				console.info( 'Successfully fetched latest tribe-common package.json' );
			} catch ( e ) {
				reject( e );
				console.error( e );
			}
		} );
	} );
} );
