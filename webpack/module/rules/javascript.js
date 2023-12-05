module.exports = {
	test: /\.js$/,
	exclude: {
      and: [ /node_modules/ ], // Exclude libraries in node_modules ...
      not: [
        // Except for a few of them that needs to be transpiled because they use modern syntax
        /@the-events-calendar/,
        /@moderntribe/,
      ]
    },
	use: 'babel-loader',
};
