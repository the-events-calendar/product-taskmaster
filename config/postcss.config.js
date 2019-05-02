module.exports = ( { file, options, env } ) => ( { // eslint-disable-line no-unused-vars
	plugins: [
		require( 'postcss-partial-import' )( { root: file.dirname, extension: '.pcss' } ),
		require( 'postcss-mixins' ),
		require( 'postcss-nested' ),
		require( 'postcss-preset-env' )( { stage: 0, preserve: false } ),
		require( 'postcss-inline-svg' ),
		require( 'postcss-calc' ),
		require( 'postcss-hexrgba' ),
		require( 'css-mqpacker' ),
	],
} );
