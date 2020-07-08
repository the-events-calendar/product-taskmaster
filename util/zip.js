var fs = require('fs');
var archiver = require('archiver');

const json          = JSON.parse( fs.readFileSync( 'package.json' ) );
let zipSafelist;

try {
	if ( fs.accessSync( 'package-safelist.json', fs.constants.F_OK ) ) {
		zipSafelist = JSON.parse( fs.readFileSync( 'package-safelist.json' ) );
	} else {
		zipSafelist = JSON.parse( fs.readFileSync( 'package-whitelist.json' ) );
	}
} catch ( e ) {
	console.log( e );
}

// create a file to stream archive data to.
var output = fs.createWriteStream( __dirname + '/../../' + json._zipname + '.' + json.version + '.zip' );
var archive = archiver( 'zip', {
	zlib: { level: 9 } // Sets the compression level.
} );

output.on( 'close', function () {
	console.log( archive.pointer() + ' total bytes' );
	console.log( 'archiver has been finalized and the output file descriptor has closed.' );
} );

archive.on( 'error', function(err) {
	throw err;
} );

archive.pipe(output);

zipSafelist.forEach( function( file ) {
	if ( '/' === file.slice( -1 ) ) {
		archive.directory( file, file );
		return;
	}

	archive.glob( file );
} );

archive.finalize();
