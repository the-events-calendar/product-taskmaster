// Object of globalDependency to dependency
const wp = {
	blocks: 'blocks',
	components: 'components',
	data: 'data',
	date: 'date',
	editor: 'editor',
	element: 'element',
	hooks: 'hooks',
	isShallowEqual: 'is-shallow-equal',
	i18n: 'i18n',
	utils: 'utils',
};

// Puts @wordpress/[dependency] on the window object as window.wp.[globalDependency]
const externals = Object.keys( wp ).reduce(
	( result, globalDependency ) => {
		const dependency = wp[ globalDependency ];
		result[ `@wordpress/${ dependency }` ] = `wp.${ globalDependency }`;

		return result;
	},
	{}
);

module.exports = externals;
