module.exports = ( { file, options, env } ) => ( { // eslint-disable-line no-unused-vars
	plugins: [
		require( 'postcss-import' )( { root: file.dirname } ),
		require( 'postcss-mixins' ),
		require( 'postcss-nested' ),
		require( 'postcss-inline-svg' ),
		require( 'postcss-preset-env' )( { stage: 0, preserve: false } ),
		require( 'postcss-calc' ),
		require( 'postcss-hexrgba' ),
		require( 'css-mqpacker' ),
	],
} );
