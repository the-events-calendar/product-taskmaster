/* eslint-disable no-console */
const prettier = require( 'prettier' );
const { writeFileSync, readFileSync } = require( 'fs' );
const { resolve } = require( 'path' );

// Resolve package.json from current working root
const currentPackageJSON = JSON.parse(
	readFileSync( resolve( process.env.PWD, 'package.json' ), 'utf8' )
);

function ignoreFSDependencies( dependencies ) {
	const keys = Object.keys( dependencies );

	return keys.reduce( ( acc, key ) => {
		const value = dependencies[ key ];

		if ( ! /^file:/.test( value ) ) {
			acc[ key ] = value;
		}

		return acc;
	}, {} );
}

// Fetch common repo package.json
require( './fetchPackageJSON' ).then( ( commonJSON ) => {
	currentPackageJSON.dependencies = Object.assign( {},
		currentPackageJSON.dependencies,
		ignoreFSDependencies( commonJSON.dependencies )
	);
	currentPackageJSON.devDependencies = Object.assign( {},
		currentPackageJSON.devDependencies,
		ignoreFSDependencies( commonJSON.devDependencies )
	);

	const json = prettier.format( JSON.stringify( currentPackageJSON ), {
		parser: 'json',
	} );
	writeFileSync( 'package.json', json );
	console.info( 'Successfully sync package.json' );
} );

