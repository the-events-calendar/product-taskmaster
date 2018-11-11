// NOTE: This must be kept in sync with `tribe-common` repo `src/modules` directories
// any new directories will need to be added here as well.
const entries = [
	'data',
	'elements',
	'hoc',
	'icons',
	'store',
	'utils',
];

module.exports = entries.reduce(
	( result, entry ) => {
		result[ `@moderntribe/common/${ entry }` ] = {
			var: `tribe.common.${ entry }`,
			root: [ 'tribe', 'common', entry ],
		};
		return result;
	},
	{}
);
