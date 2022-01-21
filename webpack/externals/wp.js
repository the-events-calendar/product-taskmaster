const wp = [
	'blocks',
	'components',
	'date',
	'editor',
	'element',
	'hooks',
	'i18n',
	'utils',
	'data',
];

// Puts @wordpress/[dependency] on the window object as window.wp.[dependency]
const externals = wp.reduce(
	( result, dependency ) => {
		result[ `@wordpress/${ dependency }` ] = {
			var: `wp.${ dependency }`,
			root: [ 'wp', dependency ],
		};
		return result;
	},
	{}
);

module.exports = externals;
