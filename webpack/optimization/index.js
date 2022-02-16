module.exports = {
	moduleIds: 'hashed', // default is 'natural', using numeric ids, but this can clash across plugins, so we use 'hashed'.
	splitChunks: {
		minSize: 50,
		cacheGroups: {
			vendor: {
				test: /[\\/]node_modules[\\/]/,
				name: 'vendor',
				chunks: 'all',
			},
		},
	},
};
