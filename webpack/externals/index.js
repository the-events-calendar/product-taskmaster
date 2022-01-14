const wpExternals = require( './wp' );
const vendor = require( './vendor' );
const lodash = require( './lodash' );
const tribeCommon = require( './tribe/common' );

module.exports = [
	wpExternals,
	vendor,
	lodash,
	tribeCommon,
];
