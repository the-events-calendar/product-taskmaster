const UnminifiedWebpackPlugin = require( 'unminified-webpack-plugin' );

const js = require( '../module/rules/javascript' );
const styles = require( '../module/rules/styles' );
const images = require( '../module/rules/images' );
const svg = require( '../module/rules/svg' );
const externals = require( '../externals' );
const optimization = require( '../optimization' );

const isProduction = process.env.NODE_ENV === 'production';
const postfix = isProduction ? 'min.js' : 'js';
const plugins = isProduction ? [ new UnminifiedWebpackPlugin() ] : [];

module.exports = {
	devtool: (
		// We shouldn't ship source maps
		isProduction ? false : 'eval-source-map'
	),
	externals,
	output: {
		filename: `./src/resources/js/app/[name].${ postfix }`,
		libraryTarget: 'var',
	},
	module: {
		rules: [
			js,
			styles.rule,
			images,
			svg,
		],
		noParse: /node_modules\/lodash\/lodash\.js/,
	},
	plugins: [
		styles.plugin(),
		...plugins,
	],
	optimization,
};
