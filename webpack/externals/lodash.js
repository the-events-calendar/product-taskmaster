const REGEX = /^lodash/;

module.exports = function commonExternals( context, request, callback ) {
	if ( REGEX.test( request ) ) {
		return callback( null, request.replaceAll( '/', '.' ) );
	}
	callback();
};

