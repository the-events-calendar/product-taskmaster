const REGEX = /^@moderntribe\/events\//;

module.exports = function eventsExternals( context, request, callback ) {
	if ( REGEX.test( request ) ) {
		const path = request
			.replace( /\//g, '.' ) // Convert `/` to `.`
			.replace( '@moderntribe', 'tribe' );

		return callback( null, `var ${ path }` );
	}
	callback();
};
