const REGEX = /^lodash/;

module.exports = function lodashExternals( context, request, callback ) {
	if ( REGEX.test( request ) ) {
		return callback( null, request.replace( /\//g, '.' ) );
	}
	callback();
};

