/* eslint-diable no-console */
const prettier = require( 'prettier' );
const { writeFileSync, readFileSync } = require( 'fs' );
const { resolve } = require( 'path' );
const browserslistConfig = require( '../config/browserslist.config.js' );

// Resolve package.json from current working root
const currentPackageJSON = JSON.parse(
	readFileSync( resolve( process.env.PWD, 'package.json' ), 'utf8' )
);

currentPackageJSON.browserslist = [
	...browserslistConfig,
];

const json = prettier.format( JSON.stringify( currentPackageJSON ), {
	parser: 'json',
} );
writeFileSync( 'package.json', json );
console.info( 'Successfully sync browserslist config' );
