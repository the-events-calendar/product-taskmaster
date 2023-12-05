const wpExternals = require( './wp' );
const vendor = require( './vendor' );
const lodash = require( './lodash' );
const modules = require( './modules' );
const tribeCommon = require( './tribe/common' );

module.exports = [
	wpExternals,
	vendor,
	lodash,
	modules,
	tribeCommon,
];
