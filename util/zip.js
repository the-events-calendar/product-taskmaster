var fs = require('fs');
var archiver = require('archiver');

const json          = JSON.parse( fs.readFileSync( 'package.json' ) );
let zipSafelist;

try {
    // Check if 'package-safelist.json' exists.
    fs.accessSync('package-safelist.json', fs.constants.F_OK);
    zipSafelist = JSON.parse(fs.readFileSync('package-safelist.json'));
} catch (e) {
    try {
        // If 'package-safelist.json' does not exist, try 'package-whitelist.json'.
        fs.accessSync('package-whitelist.json', fs.constants.F_OK);
        zipSafelist = JSON.parse(fs.readFileSync('package-whitelist.json'));
    } catch (err) {
        console.log('Neither safelist nor whitelist file exists.');
        throw err;
    }
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
