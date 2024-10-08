module.exports = {
	verbose: true,
	setupFiles: [
		'<rootDir>/jest.setup.js',
	],
	moduleNameMapper: {
		'\\.(css|pcss)$': 'identity-obj-proxy',
		'\\.(svg)$': '<rootDir>/__mocks__/icons.js',
	},
	testEnvironment: 'jest-environment-jsdom',
};

