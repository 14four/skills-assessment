const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

const extractPlugin = new MiniCssExtractPlugin({
	filename: 'main.css',
})

module.exports = {
	mode: 'development',
	entry: './src/js/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	devServer: {
		watchContentBase: true,
	    compress: true,
	    stats: {
		    all: false,
		    colors: true,
		    errors: true,
		    warnings: true,
		    errorDetails: true
	    }
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				]
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
						  // you can specify a publicPath here
						  // by default it uses publicPath in webpackOptions.output
						},
					},
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: () => [
								postcssPresetEnv(/* pluginOptions */)
							]
						}
					},
					'sass-loader'
				],
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
				            attrs: ['img:src', 'link:href'],
				        }
					}
				]
			},
			{
				test: /\.(jpg|png)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name:'img/[name].[ext]',
							esModule: false,
						}
					}
				]
			}
		]
	},
	optimization: {
	    minimize: false
	},
	plugins: [
		extractPlugin,
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
		new CleanWebpackPlugin()
	]
};