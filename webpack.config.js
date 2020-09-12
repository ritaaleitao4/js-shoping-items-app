const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        bundle: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist',
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        open: true,
        port: 8080,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(s*)css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    regExp: /\/([a-z0-9]+)\/[a-z0-9]+\.png$/i,
                    name: '[name].[ext]',
                    outputPath: 'assets/',
                    publicPath: 'assets/',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: 'src/assets',
                to: 'assets'
            }, {
                from: 'src/mocks',
                to: 'mocks'
            }],
        }),
        new ExtractTextPlugin('style.css')
    ]
};
