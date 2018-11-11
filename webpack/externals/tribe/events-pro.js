// NOTE: This must be kept in sync with `events-pro` repo `/src/modules` directories
// any new directories will need to be added here as well.
const entries = [
	'blocks',
	'data',
	'editor',
	'elements',
	'hoc',
	'icons',
];

module.exports = entries.reduce(
	( result, entry ) => {
		result[ `@moderntribe/events-pro/${ entry }` ] = {
			var: `tribe.events-pro.${ entry }`,
			root: [ 'tribe', 'events-pro', entry ],
		};
		return result;
	},
	{}
);
