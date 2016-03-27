var path = require('path');

module.exports = {
	context: path.resolve('public/javascripts'),
	entry: {
		client: './client.js',
		server: './server.js'
	},
	output: {
		path: path.resolve('./public/javascripts/bundles/'),
		filename: '[name].js'
	},
	resolveLoaders: {
		root: path.join(__dirname, 'node_modules')
	},
	module: {
		loaders: []
	}
};