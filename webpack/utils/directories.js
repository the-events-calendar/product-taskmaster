const { lstatSync, readdirSync } = require( 'fs' );
const { basename, join } = require( 'path' );

const isDirectory = source => lstatSync( source ).isDirectory();
const getDirectories = source => (
	readdirSync( source ).map( name => join( source, name ) ).filter( isDirectory )
);
const getDirectoryNames = source => (
	getDirectories( source ).map( file => basename( file ) )
);

module.exports = { getDirectories, getDirectoryNames };
