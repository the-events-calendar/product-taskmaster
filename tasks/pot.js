module.exports = function( gulp ) {
	'use strict';

	var fs      = require( 'fs' ),
		wppot   = require( 'gulp-wp-pot' ),
		sort    = require( 'gulp-sort' );

	var task = function() {
		var json   = JSON.parse( fs.readFileSync( './package.json' ) ),
			readme = './readme.txt',
			label  = json.name;

		if ( fs.existsSync( readme ) ) {
			readme = fs.readFileSync( readme ),
			label  = /=== (.*) ===/.exec( readme )[1];
		}

		return gulp.src( [
			'**/*.php',
			'!common/**',
			'!lang/**',
			'!tests/**',
			'!vendor/**'
		] )
		.pipe( sort() )
		.pipe(
			wppot( {
				package: label + ' ' + json.version,
				destFile: json._textDomain + '.pot',
				domain: json._textDomain,
				bugReport: 'http://m.tri.be/191x',
				headers: {
					'X-Generated-Time': ( new Date() ).toJSON(),
					'X-Poedit-Basepath': '..',
					'X-Poedit-SourceCharset': 'UTF-8',
					'X-Poedit-KeywordsList': '__;_e;_n:1,2;_x:1,2c;_ex:1,2c;_nx:4c,1,2;esc_attr__;esc_attr_e;esc_attr_x:1,2c;esc_html__;esc_html_e;esc_html_x:1,2c;_n_noop:1,2;_nx_noop:3c,1,2;__ngettext_noop:1,2',
					'X-Poedit-SearchPath-0': '.',
					'X-Poedit-SearchPathExcluded-0': '*.js',
					'X-Poedit-SearchPathExcluded-1': 'common',
					'X-Poedit-SearchPathExcluded-2': 'lang',
					'X-Poedit-SearchPathExcluded-3': 'tests',
					'X-Poedit-SearchPathExcluded-4': 'vendor',
				}
			} )
		)
		.pipe( gulp.dest( 'lang/' + json._textDomain + '.pot' ) );
	};

	gulp.task( 'pot', task );
};
