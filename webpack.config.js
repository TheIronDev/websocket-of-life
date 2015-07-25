var path = require('path');

module.exports = {
	context: path.resolve('public/javascripts'),
	entry: {
		client: './client.js',
		server: './server.js'
	},
	output: {
		path: 'public/javascripts/bundles/',
		filename: '[name].js'
	},
	module: {
		loaders: []
	}
};