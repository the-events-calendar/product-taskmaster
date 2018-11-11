// NOTE: This must be kept in sync with `the-events-calendar` repo `/src/modules` directories
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
		result[ `@moderntribe/events/${ entry }` ] = {
			var: `tribe.events.${ entry }`,
			root: [ 'tribe', 'events', entry ],
		};
		return result;
	},
	{}
);
