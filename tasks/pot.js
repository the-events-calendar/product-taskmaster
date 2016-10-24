var gulp    = require( 'gulp' );
var fs      = require( 'fs' );
var wppot   = require( 'gulp-wp-pot' );
var sort    = require( 'gulp-sort' );

var pot_task = function() {
  'use strict';

  var json = JSON.parse( fs.readFileSync( './package.json' ) );
  var readme = fs.readFileSync( './readme.txt' );
	var plugin_name = /=== (.*) ===/.exec( readme );
	plugin_name = plugin_name[1];
	var version = /Stable tag: (.*)/.exec( readme );
	version = version[1];

	return gulp.src( [
		'**/*.php',
		'!common/*',
		'!lang/*',
		'!tests/*',
		'!vendor/*'
	] )
		.pipe( sort() )
		.pipe(
			wppot( {
				package: plugin_name + ' ' + version,
				domain: json._textDomain,
				bugReport: 'http://m.tri.be/191x'
			} )
		)
		.pipe( gulp.dest( 'lang' ) );
};

gulp.task( 'pot', pot_task );
module.exports = pot_task;
