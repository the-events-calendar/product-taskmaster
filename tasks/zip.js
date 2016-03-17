var gulp     = require( 'gulp' );
var fs       = require( 'fs' );
var zip      = require( 'gulp-vinyl-zip' ).zip;
var sync     = require( 'fs-sync' );
var sequence = require( 'run-sequence' ).use( gulp );

// this task copies files we'll zip into a build directory
gulp.task( 'zip-copy-files', function() {
  'use strict';

  var json = JSON.parse( fs.readFileSync( './package.json' ) );
  var zip_include = JSON.parse( fs.readFileSync( './package-whitelist.json' ) );

	sync.mkdir( json._zipfoldername );
	return gulp.src( zip_include, { base: '.' } )
		.pipe( gulp.dest( json._zipfoldername ) );
} );

// this does the zipping
gulp.task( 'zip-do-zip', function() {
  'use strict';

  var json = JSON.parse( fs.readFileSync( './package.json' ) );

	return gulp.src( json._zipfoldername + '/**/*', { base: '.' } )
		.pipe( zip( json._zipname + '.' + json.version + '.zip' ) )
		.pipe( gulp.dest( '../' ) );
} );

// this cleans up the trash
gulp.task( 'zip-purge-build-dir', function( cb ) {
  'use strict';

  var json = JSON.parse( fs.readFileSync( './package.json' ) );

	sync.remove( json._zipfoldername );

	cb();
} );

var zip_task = function( cb ) {
  'use strict';

  sequence(
    'zip-copy-files',
    'zip-do-zip',
    'zip-purge-build-dir',
    cb
  );
};

gulp.task( 'zip', zip_task );
module.exports = zip_task;
