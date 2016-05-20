var path = require('path');
var webpack = require('webpack');
var neat = require('node-neat');
var bourbon = require('node-bourbon');

module.exports = {
    entry: './javascripts/app.js',
    output: {
        filename: 'bundle.js'
    },
	include: [
		path.resolve(__dirname, "javascripts"),
		path.resolve(__dirname, "stylesheets")
	],
	resolve: {
		root: [
			path.resolve('./javascripts/'),
			path.resolve('./stylesheets/')
		],
		alias: {
			remark: path.resolve(__dirname, 'node_modules/remark/src/remark/'),
			'components/printing': 'remark/components/printing/printing',
			'components/styler': 'remark/components/styler/styler',
			'components/slide-number': 'remark/components/slide-number/slide-number',
			'components/timer': 'remark/components/timer/timer'
		}
	},
	devtool: 'cheap-module-source-map',
    plugins: [
		//new webpack.optimize.DedupePlugin(),
		new webpack.IgnorePlugin(/^fs$/)
    ],
    module: {
        loaders: [
            {
				test: /\.css$/, loader: 'style!css'
			},
			{
				test: /(\.md|\.markdown|\.mdown)$/,
				loaders: ['raw']
			},
			{
				test: /\.scss$/,
				loaders: ['style', 'raw', 'sass']
			},
			{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
			{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
	sassLoader: {
		includePaths: [
			'./node_modules/compass-mixins/lib/',
			'./stylesheets'
		].concat(
			bourbon.includePaths
		).concat(
			neat.includePaths
		)
	}
};