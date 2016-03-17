var gulp   = require( 'gulp' );
var zip = require( 'gulp-vinyl-zip' ).zip;
var fs  = require( 'fs-sync' );

var zip_task = function() {
  'use strict';

  var json = JSON.parse( fs.readFileSync( './package.json' ) );
  var zip_include = JSON.parse( fs.readFileSync( './package-whitelist.json' ) );

	fs.mkdir( json._zipfoldername );
	for ( var i in zip_include ) {
		fs.copy( zip_include[ i ], json._zipfoldername + '/' + zip_include[ i ] );
	}

	return gulp.src( json._zipfoldername )
		.pipe( zip( json._zipname + '.' + json.version + '.zip' ) )
		.pipe( gulp.dest( '../' ) );
};

gulp.task( 'zip', zip_task );
module.exports = zip_task;
