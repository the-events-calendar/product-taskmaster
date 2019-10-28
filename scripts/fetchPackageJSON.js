/* eslint-disable max-len, no-console */
const https = require( 'https' );
const fs = require( 'fs' );
const { spawnSync } = require( 'child_process' );
let ref;

if ( fs.existsSync( process.cwd() + '/common' ) ) {
	ref = spawnSync( 'git', [ 'rev-parse', '--abbrev-ref', 'HEAD' ], { shell: true, cwd: process.cwd() + '/common' } );
	ref = ref.stdout.toString().trim();

	// If Common is not a branch, it will required a second command
	if ( 'HEAD' === ref ) {
		ref = spawnSync( 'git', [ 'rev-parse', '--verify', 'HEAD' ], { shell: true, cwd: process.cwd() + '/common' } );
		ref = ref.stdout.toString().trim();
	}
} else {
	ref = spawnSync( 'git', [ 'rev-parse', '--abbrev-ref', 'HEAD' ], { shell: true, cwd: process.cwd() } );
	ref = ref.stdout.toString().trim();
}

const URL = `https://raw.githubusercontent.com/moderntribe/tribe-common/${ref}/package.json`;

module.exports = new Promise( ( resolve, reject ) => {
	https.get( URL, response => {
		const { statusCode } = response;
		let data = '';
		
		if (statusCode === 404) {
			https.get( 'https://raw.githubusercontent.com/moderntribe/tribe-common/master/package.json', subResponse => {
				subResponse.setEncoding( 'utf8' );
				subResponse.on( 'data', ( chunk ) => data += chunk );
				subResponse.on( 'abort', reject );
				subResponse.on( 'end', () => {
					try {
						resolve( JSON.parse( data ) );
						console.info( 'Successfully fetched latest tribe-common package.json' );
					} catch ( e ) {
						reject( e );
					}
				} );
			} );
		} else {
			response.setEncoding( 'utf8' );
			response.on( 'data', ( chunk ) => data += chunk );
			response.on( 'abort', reject );
			response.on( 'end', () => {
				try {
					resolve( JSON.parse( data ) );
					console.info( 'Successfully fetched latest tribe-common package.json' );
				} catch ( e ) {
					reject( e );
				}
			} );
		}
		
	} );
} );
