const REGEX = /^@moderntribe\/events-pro\//;

module.exports = function eventsProExternals( context, request, callback ) {
    if ( REGEX.test( request ) ) {
        const path = request
            .replace( /\//g, '.' ) // Convert `/` to `.`
            // Make sure tribe.events-pro is converted into an accessible property as tribe["events-pro"] instead
            .replace( /.(\w+-\w+)/, '["$1"]' )
            .replace( '@moderntribe', 'tribe' );

        return callback( null, `var ${ path }` );
    }
    callback();
}
